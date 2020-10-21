---
title: Sito Web Hiccups
author: zeke
date: '2018-02-12'
---

La scorsa settimana il sito [electronjs.org](https://electronjs.org) ha avuto alcuni minuti di inattività. Se sei stato colpito da queste brevi interruzioni, ci dispiace per l'inconveniente. Dopo un po 'di indagine oggi, abbiamo diagnosticato la causa principale e abbiamo distribuito un [fix](https://github.com/electron/electronjs.org/pull/1076).

---

Per evitare questo tipo di fermi in futuro, abbiamo abilitato [Avvisi soglia Heroku](https://devcenter.heroku.com/articles/metrics#threshold-alerting) sulla nostra app. Ogni volta che il nostro web server accumula richieste fallite o risposte lente oltre una certa soglia, il nostro team sarà avvisato in modo da poter affrontare il problema rapidamente.

## Documenti offline in ogni lingua

La prossima volta che svilupperai un'app Electron su un aereo o in un negozio sotterraneo, si potrebbe voler avere una copia dei documenti per riferimento offline. Fortunatamente, i documenti di Electron's sono disponibili come file Markdown in oltre 20 lingue .

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Documenti offline con una GUI

[devdocs. o/electron](https://devdocs.io/electron/) è un comodo sito web che memorizza i documenti per l'uso offline, non solo per Electron ma molti altri progetti come JavaScript, TypeScript, Node. s, Reagire, Angulare, e molti altri. E naturalmente c'è anche un'app Electron per questo. Scopri [devdocs-app](https://electronjs.org/apps/devdocs-app) sul sito Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

If you like to install apps without using your mouse or trackpad, give [Electron Forge](https://electronforge.io/)'s `install` command a try:

```sh
npx electron-forge install egoist/devdocs-app
```