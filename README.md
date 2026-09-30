# website



## Getting started

```
$ hugo new site . --force
$ git submodule add https://github.com/opera7133/tella.git themes/tella
$ git submodule add https://github.com/martignoni/hugo-cloak-email.git themes/hugo-cloak-email
$ git submodule update --init --recursive
$ git submodule update --remote --merge
$ cp themes/tella/exampleSite/package.json .
$ npm install
$ npm run build:css

$ magick raw/logo.svg -resize 423x640 static/img/logo/logo.png
$ magick raw/logo-notekst.svg -define icon:auto-resize=256,64,48,32,16 static/favicon.ico
$ magick raw/logo-notekst.svg -resize 16x16 static/favicon-16x16.png
$ magick raw/logo-notekst.svg -resize 32x32 static/favicon-32x32.png
$ magick raw/logo-notekst.svg -resize 64x64 static/favicon-64x64.png
$ magick raw/logo-notekst.svg -resize 96x96 static/favicon-96x96.png
$ magick raw/logo-notekst.svg -resize 180x180 static/apple-touch-icon.png
$ magick raw/logo-notekst.svg -resize 192x192 static/web-app-manifest-192x192.png
$ magick raw/logo-notekst.svg -resize 512x512 static/web-app-manifest-512x512.png


$ hugo server
```

## Styling Guide

Use these exact iJam® colors for logos, favicons, blocks, accents and related projects:

- Black: `#0b0d10`
- Ink: `#171b22`
- Muted text: `#5d6573`
- Line: `#e5e8ed`
- Soft background: `#f6f7f9`
- Red: `#d9232e`
- Yellow: `#f4be23`
- Blue: `#1769d6`
- Background: `#ffffff`

## Theme Notes

The Tella blog and summary partials are not part of the current site design. If blog, recent-post or theme summary features are enabled later, review the inherited partials first: they may reference theme placeholder assets such as `/img/default.jpg`.

## Layout Overrides

The site overrides Tella layouts to keep Hugo content in `content/` and visual structure in `layouts/` and `static/css/custom.css`.

- `layouts/_default/baseof.html`: replaces the theme shell with a minimal iJam® page structure, project head/header/footer partials, a main content block and an optional scripts block. Presentation only.
- `layouts/partials/head.html`: defines project metadata, optional `meta_title`, fonts, favicons, manifest and stylesheet loading. It intentionally omits analytics and Open Graph/Twitter metadata for now. Presentation/site chrome only.
- `layouts/partials/header.html`: renders the logo, menu button, main menu from `hugo.toml` and the language switcher. UI labels come from `i18n/`; no page content lives here.
- `layouts/partials/lang-switch.html`: maps localized routes between Dutch and English and renders `NL`/`EN`. Routing/UI only.
- `layouts/partials/footer.html`: renders footer navigation from `hugo.toml`, branding/contact values from site params and small JavaScript behaviours for mobile navigation and reveal animations. Email output uses the local `cloakemail` partial. No page content lives here.
- `layouts/partials/cloakemail.html`: overrides the `hugo-cloak-email` theme partial with validation-friendly output. It keeps the same cloaking goal, but avoids the upstream partial's inline body `<style>` tag so `html-validate` can remain strict.
- `layouts/index.html`: replaces the Tella homepage/slider with an iJam® homepage assembled from front matter in `content/*/_index.md`: hero, impact cards, why block and label teaser. Layout only; text comes from content files.
- `layouts/_default/single.html`: renders generic pages and layout variants (`process`, `services`, `contact`) from front matter and page content. Includes service-card marker styling hooks and client-side services tile randomization. Layout only; page copy comes from content files.
- `layouts/_default/list.html`: renders section pages, including careers/werken-bij with static intro content on the left and vacancy cards from child pages on the right. Layout only; text comes from content files.
- `layouts/team/list.html`: renders the team page from team content files and randomizes team cards client-side. Layout only; member text and LinkedIn shortcodes come from content files.
- `layouts/labels/list.html`: renders label cards from label content files and front matter. Layout only; label text and external URLs come from content files.
- `layouts/shortcodes/linkedin.html`: renders a reusable LinkedIn link with Font Awesome icon. Content supplies the URL and optional label.
- `layouts/shortcodes/ghcode.html`: legacy GitHub link shortcode kept for possible future use. It is currently unused by content.

Content separation review: current layouts do not contain business/page body copy. Branding comes from `hugo.toml`, UI labels come from `i18n/`, and page text comes from `content/` or front matter. Remaining hardcoded strings are structural values or shortcode fallback labels.

## Content Notes

Team member cards can show a LinkedIn link by adding this shortcode as the last line of the team member content:

```go-html-template
{{</* linkedin url="https://www.linkedin.com/in/..." */>}}
```

## Way of Working

Before considering a change done, build the site and check local generated links:

```sh
make check
```

This runs Stylelint for `static/css/custom.css`, builds the site with `hugo --destination public`, normalizes generated HTML whitespace, validates generated HTML with `html-validate`, checks generated HTML for empty `div`/`span`/`i` elements, and checks local links with `lychee --offline --root-dir public "public/**/*.html"`. Use Lychee in offline mode for regular local checks. This verifies links and assets in the generated site without external network, TLS, redirect or rate-limit noise.

Intentional decorative empty elements must be explicit by using `aria-hidden="true"`, `hidden`, `role="presentation"`, `role="none"`, or a class allowlisted in `scripts/check-empty-elements.js`. Otherwise, remove the dead markup.

For a browser-based accessibility audit, run:

```sh
make audit-a11y
```

This starts a local Hugo server and runs Pa11y against the homepage, services, careers and team pages in Dutch and English.

## TODO

- Review whether analytics are needed.
