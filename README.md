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

Use these exact iJam colors for logos, favicons, blocks, accents and related projects:

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

## TODO

- welke taal? NL? EN? multi? 
- content:
    - tekst bij 'About'
    - tekst bij 'Contact'
    - Hoeveel Slides? 
    - Mooie one-liners voor de slides
    - willen we die 'Features' op de frontpage? wat moet daar dan staan?
    - Vacature teksten
- artwork:
    - favicon.ico
    - logo
    - pagina vullende slides
    - plaatjes bij vacatures
    - icons bij 'Features'
