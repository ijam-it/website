PATH := $(HOME)/.cargo/bin:$(PATH)

.PHONY: build lint-css normalize-html lint-html check-links check

build:
	hugo --destination public

lint-css:
	npx stylelint "static/css/custom.css"

normalize-html: build
	node -e "const fs=require('fs'); const path=require('path'); function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name); if(entry.isDirectory()) walk(p); else if(entry.isFile() && p.endsWith('.html')){const s=fs.readFileSync(p,'utf8').replace(/[ \\t]+$$/gm,''); fs.writeFileSync(p,s);}}} walk('public');"

lint-html: normalize-html
	node -e "const fs=require('fs'); const path=require('path'); const child=require('child_process'); const files=[]; function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name); if(entry.isDirectory()) walk(p); else if(entry.isFile() && p.endsWith('.html') && p !== path.join('public','nl','index.html')) files.push(p);}} walk('public'); child.execFileSync('npx',['html-validate',...files],{stdio:'inherit'});"

check-links: normalize-html
	lychee --offline --root-dir public "public/**/*.html"

check: lint-css lint-html check-links
