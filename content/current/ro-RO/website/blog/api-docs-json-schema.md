---
title: Documente API Electron ca Date Structurate
author: zeke
date: '2016-09-27'
---

Astăzi anunțăm unele îmbunătățiri ale documentației lui Electron. Fiecare nouă versiune include acum un fișier [JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) care descrie în detaliu toate API-urile publice ale Electron. Am creat acest fișier pentru a activa dezvoltatorii să folosească documentația API Electron în moduri noi interesante.

---

## Prezentare schema

Fiecare API este un obiect cu proprietăți precum numele, descrierea, tipul, etc. Clase cum ar fi `BrowserWindow` și `Meniu` au proprietăți adiționale descriind metodele lor de instanță, proprietățile instanței, evenimentele instanței, etc.

Aici este un extras din schema care descrie clasa `BrowserWindow`:

```js
{
  name: 'BrowserWindow',
  descriere: 'Creați și controlați ferestrele browser-ului. ,
  proces: {
    main: true,
    renderer: false
  },
  tip: 'Clasă',
  instanceName: 'win',
  slug: 'browser-window',
  , siteUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  metode staticMetode: [...],
  instanțMetode: [...],
  instanţProprietăţi: [...],
  instanţEvents: [...]
}
```

Și iată un exemplu de descriere a metodei, în acest caz metoda `apis.BrowserWindow.instanceMethods.setMaximumSize` de instanță:

```js
{
  nume: 'setMaximumSize',
  semnătură: '(lățime, înălțime)',
  Descriere: 'Setează dimensiunea maximă a ferestrei la lățime și înălțime. ,
  parametri: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Utilizarea noilor date

Pentru a facilita utilizarea de către dezvoltatori a acestor date structurate în proiectele lor, am creat [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), un pachet mic npm care este publicat automat de fiecare dată când există o nouă versiune Electron .

```sh
npm instalare electron-api-docs --save
```

Pentru satisfacție instantă, încercați modulul în Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Cum sunt colectate datele

Documentația API a Electron aderă la [Stil de Codare Electron](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) și [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), conţinutul său poate fi analizat programatic.

[electronon-docs-linter](https://github.com/electron/electron-docs-linter) este o nouă dependență de dezvoltare a depozitului `electron/electron`. Este o unealtă de linie de comandă care lintează toate fișierele markdown și implementează regulile stiluidei. Dacă sunt găsite erori, acestea sunt listate și procesul de lansare este oprit. Dacă documentele API sunt valabile, `electronon-json. fișierul pi` este creat și [încărcat în GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) ca parte a lansării Electron.

## Javascript standard și Markdown Standard

La începutul acestui an, codul Electron a fost actualizat pentru a utiliza standardul [``](http://standardjs.com/) pentru toate JavaScript. Standardul README rezumă raționamentul care stă la baza acestei alegeri:

> Adoptarea stilului standard înseamnă o ierarhizare a importanţei codurilor şi a convenţiilor comunitare superioară stilului personal. Acest lucru ar putea să nu aibă sens pentru 100 % din proiecte și din culturile de dezvoltare, însă o sursă deschisă poate fi un loc ostil pentru nou-veniți. Crearea unor așteptări clare, automatizate pentru contribuabili face ca un proiect să fie mai sănătos.

De asemenea, am creat [recent](https://github.com/zeke/standard-markdown) standard pentru a verifica că toate fragmentele de cod JavaScript din documentația noastră sunt valide și consistente cu stilul din însuși codebasul.

Împreună, aceste instrumente ne ajută să folosim integrarea continuă (IC) pentru a găsi automat erori în cererile pull requests. Acest lucru reduce povara pe care oamenii o fac pentru a revizui codul și ne oferă mai multă încredere în acuratețea documentației noastre.

### Un efort al comunității

Documentația Electron se îmbunătățește constant, și avem minunata noastră comunitate open-source care să o mulțumească. La începutul acestui scris, aproape 300 de oameni au contribuit la documente.

Suntem încântați să vedem ce fac oamenii cu aceste date structurate. Posibilele utilizări includ:

- Îmbunătățiri la [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Un [fișier de definiție TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) pentru dezvoltare Electron mai raționalizată în proiecte folosind TypeScript.
- Documentație căutabilă offline pentru instrumente precum [Dash.app](https://kapeli.com/dash) și [devdocs.io](http://devdocs.io/)

