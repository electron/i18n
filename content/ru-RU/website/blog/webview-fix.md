---
title: Уязвимость веб-просмотра
author: ckerr
date: '2018-03-21'
---

Обнаружена уязвимость, позволяющая включить интеграцию Node.js в некоторых приложениях Electron, которые отключают ее. Эта уязвимость была назначена идентификатором CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Затрагиваемые приложения

Приложение затронуто, если *всех* из следующих прав:

 1. Выполняется на Electron 1.7, 1.8 или 2.0.0-beta
 2. Разрешить выполнение произвольного удаленного кода
 3. Отключает интеграцию с Node.js
 4. Не объявляет `webviewTag: false` в своих предпочтениях
 5. Не включает опцию `nativeWindowOption`
 6. Перехватывает `новое окно` событий и вручную переопределяет `события.newGuest` без использования предоставленного тэга параметров

Несмотря на то, что это небольшая часть приложений Electron, мы рекомендуем обновить все приложения как меры предосторожности.

## Смягчение

Эта уязвимость исправлена в релизах [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)и [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Разработчики, которые не могут обновить Electron свою версию приложения, могут уменьшить уязвимость следующим кодом:

```js
app.on('web-contents-created', (event, win) => {
  победа. n('new-window' (событие, newURL, frameName, disposition,
                        параметров, additionalFeatures) => {
    if (! ptions. ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    options. ebPreferences.webviewTag = false;
    удалить options.webPreferences. перезагрузить;
  })
})

// и *IF* вы не используете WebViews вообще,
// вы также можете захотеть
приложение. n('web-contents-created', (event, win) => {
  победа. n('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Дополнительная информация

Эта уязвимость была обнаружена и ответственно сообщена проекту Electron Бренданом Скарвеллом из [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Чтобы узнать больше о лучших методах обеспечения безопасности приложений Electron, смотрите [наш учебник по безопасности](https://electronjs.org/docs/tutorial/security).

Чтобы сообщить о уязвимости в Electron, напишите на security@electronjs.org.

Присоединяйтесь к нашему [почтовому списку](https://groups.google.com/forum/#!forum/electronjs) , чтобы получать обновления о выпусках и обновлениях безопасности.

