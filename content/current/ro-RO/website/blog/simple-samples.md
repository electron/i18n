---
title: Mostre Electron Simple
author: zeke
date: '2017-01-19'
---

Am găzduit recent un hackaton Electron la GitHub HQ pentru membrii [Academiei Hackbright](https://hackbrightacademy.com), o școală de programare pentru femei înființată în San Francisco. Pentru a ajuta participanţii să înceapă cu capul pe proiectele lor, propriul nostru [Kevin Sawicki](https://github.com/kevinsawicki) a creat câteva exemple de aplicaţii Electron.

---

Dacă sunteți nou la dezvoltarea Electron sau nu l-ați încercat încă, aceste aplicații eșantion sunt un loc minunat pentru a începe. Acestea sunt mici, ușor de citit, și codul este foarte comentat pentru a explica cum funcționează totul.

Pentru a începe, clonează acest repo:

```sh
git clona https://github.com/electron/simple-samples
```

Pentru a rula oricare dintre aplicațiile de mai jos, schimbați în directorul aplicației, instalați dependențe, apoi începeți:

```sh
cd monitor activitati
npm install
npm start
```

## Monitorizare activitate

Afișează o diagramă cu gogoașe a sistemului CPU, a utilizatorului și a timpului de activitate inactivă.

[![Captură](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Hash

Afișează valorile hash ale textului introdus folosind algoritmi diferiți.

[![captură](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Oglindă

Redă un videoclip cu aparatul foto al computerului la o dimensiune maximă, cum ar fi să te uiți la o oglindă. Include un efect de filtrare a curcubeului opțional care folosește animații CSS.

## Prețuri

Arată preţul curent al petrolului, aurului şi argintului folosind Yahoo Finance API.

[![captură](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Încarcă o adresă URL transmisă pe linia de comandă într-o fereastră.

## Alte resurse

Sperăm ca aceste aplicații să vă ajute să începeți să utilizați Electron. Iată câteva alte resurse pentru a învăța mai mult:

- [electron-quick-start](https://github.com/electron/electron-quick-start): Un boilerplat de aplicare Electron minim.
- [Electron API Demos](https://github.com/electron/electron-api-demos): O aplicație interactivă care demonstrează funcțiile de bază ale API Electron
- [electronjs.org/documente/all](https://electronjs.org/docs/all/): toată documentația Electron împreună pe o singură pagină care poate fi căutată.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Altă colecție de eșantioane pentru Electron, compilată de întreținătorul Electron [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - Un depozit GitHub care colectează cele mai noi și mai mari tutoriale, cărți, videoclipuri etc.