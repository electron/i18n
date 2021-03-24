---
title: Hiccups du site web
author: zeke
date: '2018-02-12'
---

La semaine dernière, le site [electronjs.org](https://electronjs.org) a eu quelques minutes d'arrêt. Si vous avez été affecté par ces brèves pannes, nous sommes désolés pour le désagrément. Après un peu d'investigation aujourd'hui, nous avons diagnostiqué la cause de la racine et avons déployé une correction [](https://github.com/electron/electronjs.org/pull/1076).

---

Pour éviter ce type de temps d'arrêt à l'avenir, nous avons activé [les alertes de seuil Heroku](https://devcenter.heroku.com/articles/metrics#threshold-alerting) sur notre application. Chaque fois que notre serveur web accumule des requêtes échouées ou des réponses lentes au-delà d'un certain seuil, notre équipe sera informée afin que nous puissions résoudre le problème rapidement.

## Documents hors-ligne dans chaque langue

La prochaine fois que vous développez une application Electron sur un avion ou dans un café sous-terrain vous pouvez avoir une copie de la documentation pour référence hors ligne. Heureusement, les docs d'Electron sont disponibles en tant que fichiers Markdown dans plus de 20 langues .

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Docs hors ligne avec une interface graphique

[devdocs. o/electron](https://devdocs.io/electron/) est un site web pratique qui stocke des docs pour une utilisation hors ligne, pas seulement pour Electron mais beaucoup d'autres projets comme JavaScript, TypeScript, Node. s, React, Angular, et beaucoup d'autres. Et bien sûr il y a également une application Electron pour cela. Consultez [devdocs-app](https://electronjs.org/apps/devdocs-app) sur le site d'Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Si vous souhaitez installer des applications sans utiliser votre souris ou trackpad, donnez à la commande [Electron Forge](https://electronforge.io/) `de <code> installer` un essai :

```sh
npx electron-forge install egoist/devdocs-app
```