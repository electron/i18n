---
title: Sughiț website
author: zeke
date: '2018-02-12'
---

Săptămâna trecută, site-ul [electronjs.org](https://electronjs.org) a avut la dispoziție câteva minute de downtime. Dacă ai fost afectat de aceste scurte depășiri, ne pare rău pentru neplăceri. După o mică investigație de astăzi, am diagnosticat cauza rădăcină și am implementat [remedierea](https://github.com/electron/electronjs.org/pull/1076).

---

Pentru a preveni acest tip de downtime în viitor, am activat [Alerte Eroku](https://devcenter.heroku.com/articles/metrics#threshold-alerting) pe aplicația noastră. De fiecare dată când serverul nostru web acumulează cereri eșuate sau răspunsuri lente peste un anumit prag, echipa noastră va fi notificată, astfel încât să putem rezolva problema rapid.

## Documente offline în fiecare limbă

Data viitoare când dezvolți o aplicație Electron pe un avion sau într-o cafenea subterană, poate doriți să aveți o copie a documentelor pentru referința offline. Din fericire, documentele Electron sunt disponibile ca fişiere Markdown în peste 20 de limbi .

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Documente offline cu un GUI

[devdocs. o/electron](https://devdocs.io/electron/) este un site util care stochează documente pentru utilizare offline, nu doar pentru Electron ci pentru multe alte proiecte, cum ar fi JavaScript, TypeScript, Node. React, Angular și multe altele. Şi desigur există şi o aplicaţie Electron pentru asta. Vezi [devdocs-app](https://electronjs.org/apps/devdocs-app) pe site-ul Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Dacă vrei să instalezi aplicații fără să folosești mouse-ul sau trackpad-ul tău, dă [Electron Forge](https://electronforge.io/) `instalează` comandă o încercare:

```sh
npx electron-forge install egoist/devdocs-app
```