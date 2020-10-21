---
title: Node.js Native Addons și Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Dacă aveţi probleme cu folosirea unui addon nativ Node.js cu Electron 5. , există o șansă ca aceasta să fie actualizată pentru a lucra cu cea mai recentă versiune de V8.

---

## La revedere `v8:Handle`, Bună `v8:Local`

În 2014, echipa V8 a fost învechită `v8::Handle` în favoarea `v8:Local` pentru manipulările locale. Electron 5.0 include o versiune de V8 care a eliminat în cele din urmă `v8:Handle` pentru nod bun, și nativ. s addon-uri care încă îl mai folosesc, va trebui să fie actualizat înainte de a putea fi folosite cu Electron 5.0.

Schimbarea codului obligatoriu este minimă, dar *la fiecare* modul nativ care încă folosește `v8::Handle` nu va reuși să construiască cu Electron 5. și va trebui să fie modificat. Vestea bună este că nodul. s v12 va include, de asemenea, această modificare V8, astfel încât orice module care folosesc `v8:Handle` va trebui să fie actualizate *oricum* pentru a lucra cu viitoarea versiune de Node.

## Îmi mențin un adaos nativ, cum pot să ajut?

Dacă mențineți un addon nativ pentru Node.js, asigurați-vă că înlocuiți toate aparițiile din `v8::Handle` cu `v8:Local`. Primul a fost doar un alias al acestuia din urmă, astfel încât nu sunt necesare alte modificări pentru a aborda această problemă specifică.

De asemenea, este posibil să fiți interesat în căutarea [N-API](https://nodejs.org/api/n-api.html), care este păstrat separat de V8 ca parte a nodului. s în sine, și vizează să izoleze addon-urile native de modificările din motorul JavaScript subiacent. Mai multe informaţii [în documentaţia N-API de pe site-ul Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## Ajutor! Folosesc un addon nativ în aplicația mea și nu va funcționa!

Dacă consumați un supliment nativ pentru Node. s în aplicația dvs. și addonul nativ nu se va construi din cauza acestei probleme, bifați cu autorul addonului pentru a vedea dacă au lansat o nouă versiune care rezolvă problema. Dacă nu, contactarea autorului (sau [deschiderea unei solicitări Pull](https://help.github.com/articles/about-pull-requests/)este probabil cel mai bun pariu.
