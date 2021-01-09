---
title: Utilizator Electron
author: zeke
date: '2016-12-20'
---

Am adăugat o nouă secțiune [userland](https://electronjs.org/userland) la site-ul Electron pentru a ajuta utilizatorii să descopere oamenii, pachete și aplicații care alcătuiesc ecosistemul nostru înfloritor cu sursă deschisă.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Originile Utilizatorului

Utilizatorii sunt locurile în care oamenii din comunitățile de software se întâlnesc pentru a face schimb de instrumente și idei. Termenul provine din comunitatea Unix, unde se referea la orice program care a fugit în afara chernelului, dar astăzi înseamnă ceva mai mult. Când oamenii din comunitatea Javascript din ziua de azi se referă la utilizatori, ei de obicei vorbesc despre registrul de pachete [npm](http://npm.im). Aici are loc majoritatea experimentelor și inovațiile, în timp ce Node și limbajul JavaScript (cum ar fi Unix kernel) reține un set relativ mic și stabil de funcții de bază.

## Nod și Electron

Ca Node, Electron are un set mic de API de bază. Acestea oferă caracteristicile de bază necesare pentru dezvoltarea aplicațiilor desktop multi-platformă. Această filozofie de design permite Electron să rămână un instrument flexibil, fără a fi prea prescriptiv cu privire la modul în care ar trebui utilizat.

Utilizatorul este omolog cu "core", permițând utilizatorilor să creeze și să partajeze unelte care extind funcționalitatea Electron.

## Colectarea datelor

Pentru a înțelege mai bine tendințele ecosistemului nostru, am analizat metadatele de la 15, 00 depozite GitHub publice care depind de `electron` sau `electron-preconstruit`

Am folosit [GitHub API](https://developer.github.com/v3/), librăriile [. o API](https://libraries.io/api), și npm registru pentru a colecta informații despre dependențe, dependențe de dezvoltare, dependenți, autori de pachete, repo contributori, descărcare numărătoare, furcă contează, etc.

Apoi am folosit aceste date pentru a genera următoarele rapoarte:

- [App Development Dependencies](https://electronjs.org/userland/dev_dependencies): Pachete listate cel mai des ca `devendencies` în aplicațiile Electron.
- [GitHub Contributors](https://electronjs.org/userland/github_contributors): Utilizatori GitHub care au contribuit la numeroase depozite GitHub legate de Electron.
- [Pachete Dependențe](https://electronjs.org/userland/package_dependencies): Pachete npm legate de Electron, care sunt frecvent dependente de alte pachete npm.
- [Aplicații cu stea](https://electronjs.org/userland/starred_apps): Aplicații Electron (care nu sunt pachete npm) cu numeroase gazde stele.
- [Cele mai descărcate Pachete](https://electronjs.org/userland/most_downloaded_packages): Pachete npm legate de Electron, care sunt descărcate în lot.
- [App Dependencies](https://electronjs.org/userland/dependencies): Pachete listate cel mai des ca `dependențe` în aplicațiile Electron.
- [Autori Pachet](https://electronjs.org/userland/package_authors): Cei mai prolifici autori ai pachetelor npm legate de Electron.

## Filtrare rezultate

Raportează ca [dependențe ale aplicațiilor](https://electronjs.org/userland/dependencies) și [aplicații cu stele](https://electronjs.org/userland/starred_apps) care listă pachetele, aplicațiile și repo-urile au un text introdus care poate fi folosit pentru filtrarea rezultatelor.

Cum tastezi în această introducere, URL-ul paginii este actualizat dinamic. Acest lucru vă permite să copiați un URL reprezentând o anumită felie de date ale utilizatorului, apoi să îl partajați cu alții.

[![Babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Mai multe de venit

Acest prim set de rapoarte este doar începutul. Vom continua să colectăm date despre modul în care comunitatea construiește Electron și vom adăuga rapoarte noi pe site.

Toate instrumentele folosite pentru a colecta și afișa aceste date sunt open-source:

- [electron/electronjs.org](https://github.com/electron/electron.atom): Site-ul Electron
- [rapoarte electron/electronon-userland-](https://github.com/electron/electron-userland-reports): felii de date despre pachete, repo-uri și utilizatori din utilizatorii Electron.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Toate depozitele publice pe GitHub depind de `electron` sau `electronon-preconstruit`
- [Pachete electron/electronon-npm-](https://github.com/zeke/electron-npm-packages): Toate pachetele npm care menționează `electron` în fișierul lor `pachete.json`.

Dacă aveți idei despre cum să îmbunătățiți aceste rapoarte, Te rugăm să ne spui [deschizând o problemă în depozitul website-ului](https://github.com/electron/electronjs.org/issues/new) sau oricare dintre repo-urile menționate mai sus.

Mulțumită dvs., comunitatea Electron, pentru că a făcut un utilizator ce este astăzi!

