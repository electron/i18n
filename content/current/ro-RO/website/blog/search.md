---
title: Caută
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Site-ul Electron are un nou motor de căutare care oferă rezultate instant pentru documente API, tutoriale, pachete npm legate de Electron și multe altele.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Screenshot căutare Electron">
  </a>
</figure>

---

Învățarea unei noi tehnologii sau a unui cadru ca Electron poate fi intimidantă. Odată ce ai trecut de etapa [de pornire rapidă](https://github.com/electron/electron-quick-start) , poate fi dificil să înveți cele mai bune practici, găsește API-urile corecte sau descoperă uneltele care te vor ajuta să construiești aplicația viselor tale. Vrem ca site-ul Electron să fie un instrument mai bun pentru a găsi resursele de care ai nevoie pentru a construi aplicații mai repede și mai ușor.

Vizitați orice pagină de pe [electronjs.org](https://electronjs.org) și veți găsi noile intrări de căutare în partea de sus a paginii.

## Motorul de Căutare

Când am setat prima dată să adăugăm căutare pe site, ne-am rostogolit propriul nostru motor de căutare folosind GraphQL ca backend. GraphQL a fost distractiv să lucreze cu și motorul de căutare a fost performant, dar ne-am dat seama rapid că motorul de căutare nu este o sarcină banală. Lucruri precum căutarea de cuvinte multiple și detectarea taximetriștilor necesită multă muncă pentru a fi corecte. În loc să reinventăm roata, am decis să folosim o soluție de căutare existentă: [Algolia](https://algolia.com).

Algolia este un serviciu de căutare găzduit care a devenit rapid motorul de căutare ales dintre proiectele cu sursă deschisă populară precum React, Vue, Bootstrap, Yarn și [multe alții](https://community.algolia.com/docsearch/).

Iată câteva dintre caracteristicile care au făcut din Algolia o potrivire bună pentru proiectul Electron:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) oferă rezultate pe măsură ce tastați, de obicei în aproximativ 1 ms.
- [Toleranța Typo](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) înseamnă că vei obține în continuare rezultate chiar și atunci când tastezi [`widnow`].
- [Sintaxa avansată de interogare](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) activează `"meciuri citate exact"` și `-excludere`.
- [Clienții API](https://www.algolia.com/doc/api-client/javascript/getting-started/) sunt cu sursă deschisă și bine documentați.
- [Analizele](https://www.algolia.com/doc/guides/analytics/analytics-overview/) ne spun ce caută oamenii pentru cei mai mulți, precum și ce caută ei dar nu descoperă. Acest lucru ne va oferi o imagine valoroasă asupra modului în care documentaţia Electron poate fi îmbunătăţită.
- Algolia este [gratuit pentru proiecte open source](https://www.algolia.com/for-open-source).

## API Docs

Câteodată știți *ce* doriți să realizați, dar nu știți exact *cum* să faceți acest lucru. Electron are peste 750 de metode, evenimente și proprietăți API. Nimeni nu îşi poate aminti cu uşurinţă de toate acestea, dar computerele sunt bune la aceste lucruri. Folosind [documentele API-ului JSON al Electron,](https://electronjs.org/blog/api-docs-json-schema), am indexat toate aceste date în Algolia, și acum puteți găsi cu ușurință API-ul exact pe care îl căutați.

Încercați să redimensionați o fereastră? Căutați [`redimensionați`] și săriți direct la metoda de care aveți nevoie.

## Tutoriale

Electron are o colecție din ce în ce mai mare de tutoriale pentru a completa documentația API . Acum puteți găsi mai ușor tutoriale pe un subiect dat, împreună cu documentația API conexă.

Căutați cele mai bune practici în materie de securitate? Căutare pentru [`securitate`].

## pachete npm

Acum sunt peste 700.000 de pachete în registrul npm şi nu este întotdeauna uşor să le găseşti pe cele de care ai nevoie. Pentru a facilita descoperirea acestor module, am creat [`pachete electronon-npm-`], o colecție a modulelor 3400 + în registrul care sunt construite special pentru a fi utilizat cu Electron.

Cei de la [Biblioteci. o](https://libraries.io) au creat [SourceRank](https://docs.libraries.io/overview.html#sourcerank), un sistem de notare a proiectelor software bazat pe o combinație de măsurători ca , cod, comunitate, documentație și utilizare. Am creat un modul [`sourceranks`] care include scorul fiecărui modul în registrul npm, și folosim aceste scoruri pentru a sorta rezultatele pachetului.

Vrei alternative la modulele IPC integrate ale Electronului? Căutare pentru [`este:package ipc`].

## Aplicații Electron

Este [ușor să indexezi date cu Algolia](https://github.com/electron/algolia-indices), așa că am adăugat lista de aplicații existente din [electron/apps](https://github.com/electron/apps).

Încercați să căutați [`muzică`] sau [`homebrew`].

## Filtrare rezultate

Dacă ați folosit căutarea de cod [GitHub](https://github.com/search) înainte, Probabil că sunteți conștient de filtrele-cheie separate prin colon, cum ar fi `extensia:js` sau `utilizator:defunkt`. Credem că această tehnică de filtrare este destul de puternică, așa că am adăugat o `este:` cuvânt cheie pentru căutarea lui Electron, care îți permite să filtrezi rezultate pentru a afișa doar un singur tip:

- [`este:api thumbnail`]
- [`este:tutorial security`]
- [`este:package ipc`]
- [`este:app graphql`]

## Navigare tastatură

Oamenilor le plac scurtăturile pentru tastaturi! Noua căutare poate fi folosită fără a scoate degetele de pe tastatură:

- <kbd>/</kbd> focalizează intrarea în căutare
- <kbd>o</kbd> focalizează pe intrarea de căutare și o șterge
- <kbd>în jos</kbd> se mută la rezultatul următor
- <kbd>în sus</kbd> se mută la rezultatul anterior, sau la intrarea în căutare
- <kbd>introduceți</kbd> deschide un rezultat

De asemenea, am deschis [modulul](https://github.com/electron/search-with-your-keyboard/) care activează această interacțiune a tastaturii. Este proiectat pentru utilizare cu Algolia InstantSearch, dar este generalizat pentru a activa compatibilitatea cu diferite implementări de căutare.

## Dorim feedback-ul dvs.

Dacă întâmpinați probleme cu noul instrument de căutare, vrem să auzim despre el!

Cea mai bună modalitate de a trimite feedback-ul dumneavoastră este prin depunerea unei probleme pe GitHub în depozitul corespunzător:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) este site-ul Electron. Dacă nu știi unde să trimiți o problemă, acesta este cel mai bun pariu.
- [electron/algolia-indici](https://github.com/electron/algolia-indices) este locul unde sunt compilate toate datele Electron care pot fi căutate.
- [electron/search-cu-tastatura](https://github.com/electron/search-with-your-keyboard) face interfața de căutare navigabilă cu tastatura.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) este clientul de pe partea de browser care permite căutarea de tip găd-as-tine.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) este clientul Node.js pentru încărcarea datelor pe serverele Algoliei.

## Mulțumim

Mulțumiri speciale [Emily Iordan](https://github.com/echjordan) și [Vanessa Yuen](https://github.com/vanessayuenn) pentru construirea acestor noi capabilități de căutare, pentru [Biblioteci. o](https://libraries.io) pentru furnizarea de scoruri [SourceRank](https://docs.libraries.io/overview.html#sourcerank) și echipei de la Algolia pentru a ne ajuta să începem. 🍹