---
title: Mac App Store и Windows Auto Updater на Electron
author: джлорд
date: '2015-11-05'
---

Недавно Electron добавил две захватывающие функции: совместимую с Mac App Store сборку и автоматическое обновление Windows.

---

## Поддержка Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Начиная с `v0.34.0` каждый релиз Electron включает сборку, совместимую с Mac App Store. Ранее приложение, основанное на Electron, не соответствовало требованиям Apple для Mac App Store. Большинство этих требований связаны с использованием частных API. Чтобы песочница Electron таким образом, чтобы она соответствовала требованиям, необходимо снять два модуля:

- `репортер`
- `автообновление`

Кроме того, некоторые модели поведения изменились в связи с обнаружением изменений DNS, захватом видео и функциями специальных возможностей. Вы можете прочитать больше об изменениях и [отправить ваше приложение в Mac App Store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) в документации. Дистрибутив можно найти на странице [релизов](https://github.com/electron/electron/releases), префиксе с `mas-`.

Соответствующие Pull Requests: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Автоматическое обновление Windows

In Electron `v0.34.1` the `auto-updater` module was improved in order to work with [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Это означает, что Electron поддерживает простые способы автоматического обновления вашего приложения на ОС X и Windows. Вы можете прочитать больше о [настройке вашего приложения для автоматического обновления на Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) в документации.

Связанный Pull Request: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

