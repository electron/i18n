---
title: "Site-ul nou Internaționalizat al Electron"
author: zeke
date: '2017-11-13'
---

Electron are un nou site la [electronjs.org](https://electronjs.org)! Am înlocuit site-ul nostru static Jekyll cu un nod. s webserver, oferindu-ne flexibilitate internaționalizează site-ul și pregătind calea pentru funcții noi mai interesante.

---

## 🌍 Traduceri

Am început procesul de internaționalizare a website-ului cu scopul de a face dezvoltarea aplicației Electron accesibilă unui public global de dezvoltatori. Folosim o platformă de localizare numită [Crowdin](https://crowdin.com/project/electron) care integrează cu GitHub, deschiderea şi actualizarea automată a solicitărilor ca conţinut este tradus în limbi diferite.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav în chineza simplificată">
    <figcaption>Nav al Electron în chineză simplificată</figcaption>
  </a>
</figure>

Deşi am lucrat în tăcere la acest efort până acum, peste 75 de membri ai comunității Electron au descoperit deja proiectul în mod organic și s-au alăturat efortului de a internaționaliza site-ul și traduce documentele Electron în peste 20 de limbi. We are seeing [daily contributions](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) from people all over the world, with translations for languages like French, Vietnamese, Indonesian, and Chinese leading the way.

Pentru a alege limba ta și a vedea progresul de traducere, vizitează [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Limbi țintă actuale pe Crowdin">
    <figcaption>Traduceri in curs pe Crowdin</figcaption>
  </a>
</figure>

Dacă sunteți multilingv și sunteți interesat să ajutați la traducerea documentelor Electron și a site-ului, vizitați repo-ul [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) ; sau săriți direct în traducând pe [Crowdin](https://crowdin.com/project/electron), unde vă puteți conecta folosind contul dvs GitHub.

În prezent există 21 de limbi activate pentru proiectul Electron pe Crowdin. Este ușor să adaugi suport pentru mai multe limbi, așa că dacă ești interesat să ajuți traducerea, dar nu vezi limba afișată, [anunță-ne](https://github.com/electron/electronjs.org/issues/new) și vom activa.

## Documente traduse crude

Dacă preferați să citiți documentația în fișiere brute markdown, acum puteți face asta în orice limbă:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Pagini Aplicații

Începând de astăzi, orice aplicație Electron poate avea cu ușurință propria pagină pe site-ul Electron . Pentru câteva exemple, vedeți [Etcher](https://electronjs.org/apps/etcher), [1Clipboard](https://electronjs.org/apps/1clipboard), sau [GraphQL Playground](https://electronjs.org/apps/graphql-playground), imagine aici pe versiunea japoneză a site-ului:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="Playground GraphQL">
  </a>
</figure>

Există câteva aplicații Electron incredibile acolo, dar nu sunt întotdeauna ușor de găsit, și nu fiecare dezvoltator are timpul sau resursele pentru a construi un site web adecvat pentru a comercializa și distribui aplicația lor.

Folosind doar un [fișier de pictogramă PNG și o cantitate mică de metadate ale aplicației](https://github.com/electron/electron-apps/blob/master/contributing.md), putem colecta o mulțime de informații despre o aplicație dată. Folosind datele colectate din GitHub, paginile aplicațiilor pot afișa capturi de ecran, link-uri de descărcare, versiuni, note de lansare și README-uri pentru fiecare aplicație care are un depozit public. Folosind o paletă de culori extrasă din pictograma fiecărei aplicații, putem produce [culori curajoase și accesibile](https://github.com/zeke/pick-a-good-color) pentru a oferi fiecărei pagini a aplicației o distincție vizuală.

Pagina de indexare a aplicațiilor [](https://electronjs.org/apps) are acum categorii și un filtru de cuvinte cheie pentru a găsi aplicații interesante cum ar fi [GraphQL GUIs](https://electronjs.org/apps?q=graphql) și [p2p unelte](https://electronjs.org/apps?q=graphql).

Dacă ai o aplicație Electron pe care ți-ar plăcea să o promovezi pe site, deschide o cerere pull in [depozitul](https://github.com/electron/electron-apps) pentru aplicații electron/electron.

## Instalare unică cu Homebrew

Managerul de pachete [Homebrew](https://brew.sh) pentru macOS are o sub-comandă numită [cask](https://caskroom.github.io) care facilitează instalarea aplicațiilor desktop folosind o singură comandă în terminalul , ca `brew cask install atom`.

Am început să colectăm numele casetelor de Homebrew pentru aplicații Electron populare și acum afișăm comanda de instalare (pentru vizitatorii macOS) pe fiecare pagină a aplicației care are un cask:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Opțiuni de instalare adaptate pentru platformă: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Pentru a vedea toate aplicațiile care au nume de casete de homebrew, accesați [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Dacă cunoașteți alte aplicații cu butoaie pe care nu le-am indexat încă, [vă rugăm să le adăugați!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Un domeniu nou

Am mutat site-ul de la electron.atom.io într-un domeniu nou: [electronjs.org](https://electronjs.org).

Proiectul Electron s-a născut în [Atom](https://atom.io), editorul de text open-source GitHub construit pe tehnologii web. Electron s-a numit inițial `atom-shell`. Atom a fost prima aplicație care l-a folosit, dar nu a durat mult pentru ca oamenii să realizeze că acest Chromium + Node runtime magic ar putea fi folosit pentru tot felul de aplicaţii diferite. Când companii precum Microsoft și Slack au început să folosească `atom-shell`, a devenit clar că proiectul avea nevoie de un nou nume.

Aşa că "Electron" s-a născut. La începutul anului 2016, GitHub a reunit o nouă echipă pentru a se concentra în mod specific pe dezvoltarea și întreținerea Electron, în afară de Atom. În de atunci, Electron a fost adoptat de mii de dezvoltatori de aplicații, și acum depindea de multe companii mari, multe dintre acestea având echipe Electron de proprii.

Sprijinirea proiectelor Electron GitHub precum Atom și [GitHub Desktop](https://desktop.github.com) este încă o prioritate pentru echipa noastră, dar trecând la un domeniu nou, sperăm să ajutăm să clarifice distincţia tehnică dintre Atom şi Electron.

## 🐢🚀 Node.js Peste tot

Fostul site Electron a fost construit cu [Jekyll](https://jekyllrb.com), popularul generator Ruby-bazat pe static. Jekyll este o unealtă grozavă pentru construirea de site-uri statice, dar site-ul a început să îl depăşească. Am dorit capacități mai dinamice cum ar fi redirecționări adecvate și dinamici de redare a conținutului, astfel încât un server [Node.js](https://nodejs.org) a fost alegerea evidentă.

Ecosistemul Electron include proiecte cu componente scrise în mai multe limbi de programare diferite, de la Python la C++ la Bash. Dar JavaScript este fundamental pentru Electron, și este limbajul cel mai folosit în comunitatea noastră.

Prin migrarea site-ului web de la Ruby la Node.js, dorim să reducem bariera intrării persoanelor care doresc să contribuie la site-ul web.

## ⚡ Participare asier Open-Source

Dacă ai [Nodul. s](https://nodejs.org) (8 sau mai mult) și [git](https://git-scm.org) instalate pe sistemul dvs., poți obține cu ușurință dacă site-ul rulează local:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Noul site este găzduit pe Heroku. Folosim conducte de implementare și [Funcția de Revizuire Aplicații](https://devcenter.heroku.com/articles/github-integration-review-apps) , care creează automat o copie în rulare a aplicației pentru fiecare solicitare de tip pull . Acest lucru facilitează vizualizarea efectelor reale ale unei cereri de tragere pe o copie live a site-ului.

## 🙏 Mulțumesc colaboratorilor

Am dori să le mulțumim în mod special tuturor oamenilor din lume care au contribuit cu timpul și energia lor proprie pentru a ajuta la îmbunătățirea Electron. Pasiunea comunității open-source a ajutat nemăsurabil să facă din Electron un succes. Vă mulţumesc!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>