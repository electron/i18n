---
title: Website-Hiccups
author: zeke
date: '2018-02-12'
---

Letzte Woche hatte die [electronjs.org](https://electronjs.org) Seite ein paar Minuten Ausfallzeit. Wenn Sie von diesen kurzen Ausfällen betroffen waren, entschuldigen wir für die Unannehmlichkeiten. Nach ein bisschen Untersuchung heute haben wir die Wurzel diagnostiziert und eine [Korrektur](https://github.com/electron/electronjs.org/pull/1076) implementiert.

---

Um diese Art von Ausfallzeit in Zukunft zu verhindern, haben wir [Heroku Schwellenwarnungen](https://devcenter.heroku.com/articles/metrics#threshold-alerting) in unserer App aktiviert. Jederzeit sammelt unser Webserver fehlgeschlagene Anfragen oder langsame Antworten über einen bestimmten Schwellenwert, unser Team wird benachrichtigt, damit wir das Problem schnell lösen können.

## Offline-Dokumente in jeder Sprache

Wenn Sie das nächste Mal eine Electron-App auf einem Flugzeug oder in einem unterirdischen Coffee Shop entwickeln Sie möchten vielleicht eine Kopie der Dokumentation für Offline-Referenzen haben. Glücklicherweise sind die Dokumente von Electronic als Markdown-Dateien in über 20 Sprachen verfügbar.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Offline-Dokumente mit einer GUI

[devdocs. o/electron](https://devdocs.io/electron/) ist eine praktische Website, die Dokumente für Offline-Nutzung speichert nicht nur für Electron, sondern viele andere Projekte wie JavaScript, TypeScript, Knoten. s, React, Angular, and many others. Und natürlich gibt es dafür auch eine Electron-App. Schau dir [devdocs-app](https://electronjs.org/apps/devdocs-app) auf der Electron-Seite an.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Wenn du Apps ohne Maus oder Trackpad installieren möchtest, gib [Electron Forge](https://electronforge.io/)'s `install` Befehl aus:

```sh
npx electron-forge install egoist/devdocs-app
```