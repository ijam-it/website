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

$ magick raw/logo-notekst.svg -define icon:auto-resize=256,64,48,32,16 static/favicon.ico
$ magick raw/logo-notekst.svg -resize 16x16 static/favicon-16x16.png
$ magick raw/logo-notekst.svg -resize 32x32 static/favicon-32x32.png
$ magick raw/logo-notekst.svg -resize 96x96 static/favicon-96x96.png
$ magick raw/logo-notekst.svg -resize 180x180 static/apple-touch-icon.png
$ magick raw/logo-notekst.svg -resize 192x192 static/web-app-manifest-192x192.png
$ magick raw/logo-notekst.svg -resize 512x512 static/web-app-manifest-512x512.png


$ hugo --config config.toml
```

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
