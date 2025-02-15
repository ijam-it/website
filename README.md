# website



## Getting started

```
$ hugo new site . --force
$ git submodule add https://github.com/opera7133/tella.git themes/tella
$ git submodule add https://github.com/martignoni/hugo-cloak-email.git themes/hugo-cloak-email
$ git submodule update --remote --merge
$ npm install

$ convert acoustic.svg -define icon:auto-resize=256,64,48,32,16 favicon.ico
$ convert acoustic.svg -resize 16x16 favicon-16x16.png
$ convert acoustic.svg -resize 32x32 favicon-32x32.png
$ convert acoustic.svg -resize 180x180 apple-touch-icon.png
$ convert acoustic.svg -resize 192x192 android-chrome-192x192.png
$ convert acoustic.svg -resize 512x512 android-chrome-512x512.png

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
