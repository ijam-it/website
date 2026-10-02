PATH := $(HOME)/.cargo/bin:$(PATH)

.PHONY: build lint-css normalize-html lint-html quality-html check-links audit-a11y check

build:
	hugo --destination public

lint-css:
	npx stylelint "static/css/custom.css" "static/css/vulnio.css"

normalize-html: build
	node -e "const fs=require('fs'); const path=require('path'); function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name); if(entry.isDirectory()) walk(p); else if(entry.isFile() && p.endsWith('.html')){const s=fs.readFileSync(p,'utf8').replace(/[ \\t]+$$/gm,''); fs.writeFileSync(p,s);}}} walk('public');"

lint-html: normalize-html
	node -e "const fs=require('fs'); const path=require('path'); const child=require('child_process'); const files=[]; function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name); if(entry.isDirectory()) walk(p); else if(entry.isFile() && p.endsWith('.html') && p !== path.join('public','nl','index.html')) files.push(p);}} walk('public'); child.execFileSync('npx',['html-validate',...files],{stdio:'inherit'});"

quality-html: normalize-html
	node scripts/check-empty-elements.js

check-links: normalize-html
	lychee --offline --root-dir public "public/**/*.html"

audit-a11y:
	@hugo server --disableFastRender --bind 127.0.0.1 --port 1313 --baseURL http://127.0.0.1:1313/ >/tmp/ijam-hugo-server.log 2>&1 & pid=$$!; \
	trap 'kill $$pid 2>/dev/null || true' EXIT; \
	for attempt in $$(seq 1 30); do \
		curl -fsS http://127.0.0.1:1313/ >/dev/null 2>&1 && break; \
		sleep 1; \
	done; \
	if ! curl -fsS http://127.0.0.1:1313/ >/dev/null 2>&1; then \
		cat /tmp/ijam-hugo-server.log; \
		exit 1; \
	fi; \
	for url in \
		http://127.0.0.1:1313/ \
		http://127.0.0.1:1313/en/ \
		http://127.0.0.1:1313/diensten/ \
		http://127.0.0.1:1313/en/services/ \
		http://127.0.0.1:1313/werken-bij/ \
		http://127.0.0.1:1313/en/careers/ \
		http://127.0.0.1:1313/werken-bij/frontend-designer-ux-engineer/ \
		http://127.0.0.1:1313/en/careers/frontend-designer-ux-engineer/ \
		http://127.0.0.1:1313/team/ \
		http://127.0.0.1:1313/en/team/; do \
		npx pa11y $$url || exit $$?; \
	done

check: lint-css lint-html quality-html check-links
