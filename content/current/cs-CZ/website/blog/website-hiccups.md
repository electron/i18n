---
title: Webové Hiccups
author: zeke
date: '2018-02-12'
---

Minulý týden [electronjs.org](https://electronjs.org) stránka měla několik minut výpadku. Pokud jste byli postiženi těmito krátkými výpadky, omlouváme se za nepříjemnosti. Po trošce vyšetřování dnes jsme diagnostikovali hlavní příčinu a použili [opravu](https://github.com/electron/electronjs.org/pull/1076).

---

To prevent this kind of downtime in the future, we've enabled [Heroku threshold alerts](https://devcenter.heroku.com/articles/metrics#threshold-alerting) on our app. Any time our web server accumulates failed requests or slow responses beyond a certain threshold, our team will be notified so we can address the problem quickly.

## Offline dokumentace v každém jazyce

Při příštím vývoji aplikace Electron v letadle nebo v podterranském kavárně, možná budete chtít mít kopii dokumentů pro offline odkaz. Fortunately, Electron's docs are available as Markdown files in over 20 languages.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Offline dokumentace s GUI

[devdocs. o/electron](https://devdocs.io/electron/) je šikovný web, který ukládá dokumentaci pro offline použití, nejen pro Electron, ale mnoho dalších projektů jako JavaScript, TypeScript, Node. , React, Angular and mnoho dalších. A samozřejmě pro to existuje i Electron aplikace. Podívejte se na [devdocs-app](https://electronjs.org/apps/devdocs-app) na webu Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Pokud chcete nainstalovat aplikace bez použití myši nebo trackpadu, dejte [Electron Forge](https://electronforge.io/) `nainstalovat` příkaz:

```sh
npx electron-forge install egoist/devdocs-app
```