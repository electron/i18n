---
title: "Folosind GN pentru a construi Electron"
author: nornagon
date: '2018-09-05'
---

Electron folosește acum GN pentru a se construi. Iată o discuţie despre motivele acestei situaţii.

---

# GYP și GN

Când Electron a fost lansat pentru prima dată în 2013, configurația de construcție a Chromium a fost scrisă cu [GYP](https://gyp.gsrc.io/), prescurtare pentru "Generați proiectele dvs.".

În 2014, proiectul Chromium a introdus o nouă unealtă de configurare a construcției numită [GN](https://gn.googlesource.com/gn/) (prescurtare pentru "Generați [Ninja](https://ninja-build.org/)") Fișierele de construcție ale Chromium au fost migrate la GN și GYP a fost eliminat din codul sursă.

Electron a păstrat de-a lungul istoriei o separare între codul principal [Electron](https://github.com/electron/electron) şi [libchromiumcontent](https://github.com/electron/libchromiumcontent), partea din submodulul Electron al lui Chromium. Electron a continuat folosind GYP, în timp ce libchromiumcontent -- ca subset de Chromium -- a trecut la GN atunci când a făcut Chromium.

Ca uneltele care nu prea plesnesc, a existat fricţiune între folosirea celor două sisteme de construcţii. Menținerea compatibilității a fost predispusă la erori, de la compilator de steaguri și `#definește` care trebuia să fie păstrate meticulos sincronizat între Chromium, Node, V8 și Electron.

Pentru a rezolva această problemă, echipa Electron a lucrat la mutarea tuturor la VNB. Astăzi, [se angajează](https://github.com/electron/electron/pull/14097) să elimine ultimul cod GYP din Electron a fost debarcat în stăpân.

# Ce înseamnă asta pentru tine

Dacă contribuiți la Electron în sine, procesul de verificare și construire a Electron de la `master` sau 4. .0 este foarte diferit decât era în 3.0.0 și mai devreme. Vezi [instrucţiunile de construcţie GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) pentru detalii.

Dacă dezvoltați o aplicație cu Electron, există câteva modificări minore pe care le puteți observa în noul Electron 4. .0-noapte; dar mai mult decât probabil, schimbarea sistemului de construcții al Electron va fi complet transparentă pentru tine.

# Ce înseamnă asta pentru Electron

GN este [mai rapid](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) decât GYP şi fişierele sale sunt mai lizibile şi întreţinute. Mai mult decât atât, sperăm că utilizarea unui sistem unic de configurare va reduce munca necesară pentru a actualiza Electron la noi versiuni de Chromium.

 * Deja ajută la dezvoltarea Electron 4.0.0 substanţial pentru că Chromium 67 a eliminat suportul pentru MSVC şi a trecut la construirea cu Clang pe Windows. Cu GN construit, moștenim toate comenzile compilatorului direct din Chromium, așa că am obținut Clang construit pe Windows gratuit!

 * De asemenea, este mai ușor pentru Electron să folosească [BoringSSL](https://boringssl.googlesource.com/boringssl/) într-o construcție unificată prin Electron, Chromium și Node -- ceva care a fost [problematic înainte de](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
