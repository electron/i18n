---
title: Hiccups веб-сайтів
author: zeke
date: '2018-02-12'
---

Минулого тижня на сайті [electronjs.org](https://electronjs.org) залишилось декілька хвилин недотримання. Якщо ці неспокійні результати впливають, ми вибачаємося на і незручності. Після сьогоднішнього розслідування, ми діагностували причину і застосували [виправлення](https://github.com/electron/electronjs.org/pull/1076).

---

To prevent this kind of downtime in the future, we've enabled [Heroku threshold alerts](https://devcenter.heroku.com/articles/metrics#threshold-alerting) on our app. Any time our web server accumulates failed requests or slow responses beyond a certain threshold, our team will be notified so we can address the problem quickly.

## Офлайн документи для кожної мови

Наступного разу ви розробляєте Electron app з площини або в підземному кафе, у вас може бути копія документації для оффлайн еталону. Fortunately, Electron's docs are available as Markdown files in over 20 languages.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Офлайн документи з графічним інтерфейсом

[devdocs. o/electron](https://devdocs.io/electron/) - це зручний веб-сайт, який зберігає документи для використання в автономному режимі, не тільки для Electron, але й для багатьох інших проектів, таких як JavaScript, TypeScript, Node. , React, Angular та багато інших. І, звичайно, для цього також є Electron додаток. Дивіться [devdocs-app](https://electronjs.org/apps/devdocs-app) на сайті Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Якщо ви бажаєте встановити застосунки, не використовуючи мишу чи трекпет, дайте [Electron Forge](https://electronforge.io/)встановити `команду` спробу:

```sh
npx electron-forge install egoist/devdocs-app
```