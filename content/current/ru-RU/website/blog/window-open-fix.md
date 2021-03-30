---
title: Исправление уязвимости window.open() BrowserView
author: ckerr
date: '2019-02-03'
---

Обнаружена уязвимость к коду, которая позволяет узлу повторно включаться в дочерние окна.

---

Открытие BrowserView с помощью `песочница: true` или `nativeWindowOpen: true` и `nodeIntegration: false` приводит к веб-содержимому, где `окно. можно вызвать pen` , а недавно открытое дочернее окно будет включать `nodeIntegration`. Эта уязвимость затрагивает все поддерживаемые версии Electron.

## Смягчение

Мы опубликовали новые версии Electron, которые включают исправления для этой уязвимости: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4), и [` 5.0.0-beta.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2). Мы рекомендуем всем разработчикам Electron немедленно обновить свои приложения до последней стабильной версии.

Если по каким-то причинам вы не можете обновить версию Electron, вы можете уменьшить эту проблему, отключив все дочерние веб-содержимое:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault());
```

## Дополнительная информация

Эта уязвимость была обнаружена и ответственно сообщена проекту Electron [PalmerAL](https://github.com/PalmerAL).

Чтобы узнать больше о лучших методах обеспечения безопасности приложений Electron, смотрите [наш учебник по безопасности](https://electronjs.org/docs/tutorial/security).

Если вы хотите сообщить об уязвимости в Electron, напишите на security@electronjs.org.
