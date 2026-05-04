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

$ convert logo-notekst.svg -define icon:auto-resize=256,64,48,32,16 favicon.ico
$ convert logo-notekst.svg -resize 16x16 favicon-16x16.png
$ convert logo-notekst.svg -resize 32x32 favicon-32x32.png
$ convert logo-notekst.svg -resize 96x96 favicon-96x96.png
$ convert logo-notekst.svg -resize 180x180 apple-touch-icon.png
$ convert logo-notekst.svg -resize 192x192 web-app-manifest-192x192.png
$ convert logo-notekst.svg -resize 512x512 web-app-manifest-512x512.png


$ hugo
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
