---
title: Хикапы веб-сайта
author: zeke
date: '2018-02-12'
---

На прошлой неделе сайт [electronjs.org](https://electronjs.org) прошел несколько минут пропущенного времени. Если вы были затронуты этими краткими ошибками, мы сожалеем за неудобства. После некоторого исследования сегодня, мы обнаружили корневую причину и развернули [исправление](https://github.com/electron/electronjs.org/pull/1076).

---

Чтобы предотвратить такие задержки в будущем, мы включили [пороговые оповещения Heroku](https://devcenter.heroku.com/articles/metrics#threshold-alerting) в нашем приложении. Каждый раз, когда наш веб-сервер накапливает неудачные запросы или медленные отклики сверх определенного порога, наша команда будет уведомлена, чтобы мы могли решить проблему быстро.

## Автономная документация на каждом языке

В следующий раз, когда вы разрабатываете приложение Electron на самолёте или в подземном кафе, вы можете захотеть иметь копию документации для оффлайн ссылки. К счастью, документы Electron доступны как файлы Markdown более чем на 20 языках.

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Автономная документация с GUI

[devdocs. o/electron](https://devdocs.io/electron/) - это удобный веб-сайт, который хранит документацию для автономного использования, Не только для Electron, но и многие другие проекты, такие как JavaScript, TypeScript, Node. s, React, Angular, и многие другие. И, конечно, это тоже есть приложение Electron. Проверьте [devdocs-app](https://electronjs.org/apps/devdocs-app) на сайте Electron.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

Если вы хотите установить приложения без использования мыши или трекпада, дайте команду [Electron Forge](https://electronforge.io/) `установить` команду:

```sh
npx electron-forge install egoist/devdocs-app
```