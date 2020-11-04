---
title: Уязвимость обработчика протокола
author: zeke
date: '2018-01-22'
---

Обнаружена уязвимость удаленного выполнения кода, затрагивающая приложения Electron, использующие обработчики пользовательских протоколов. Эта уязвимость была назначена идентификатором CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Затрагиваемые платформы

Electron приложения, предназначенные для запуска на Windows, которые зарегистрированы как обработчик по умолчанию для протокола, например `myapp://`, уязвимы.

Such apps can be affected regardless of how the protocol is registered, e.g. using native code, the Windows registry, or Electron's [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS и Linux **не уязвимы** к этой проблеме.

## Смягчение

Мы опубликовали новые версии Electron, которые включают исправления этой уязвимости: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), и [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Мы настоятельно призываем всех разработчиков Electron немедленно обновить свои приложения до последней стабильной версии .

Если по какой-то причине вы не можете обновить версию Electron, вы можете добавить `--` в качестве последнего аргумента при вызове приложения [. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), , который не позволяет Chromium анализировать дальнейшие параметры. Двойной тире `--` обозначает параметры конца команды, после которых принимаются только позиционные параметры.

```js
app.setAsDefaultProtocolClient(протокол, process.execPath, [
  '--your-switches-здесь',
  '--'
])
```

Смотрите [app.setAsfaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API для получения более подробной информации.

Чтобы узнать больше о лучших методах обеспечения безопасности приложений Electron, смотрите наш [учебник по безопасности](https://electronjs.org/docs/tutorial/security).

Если вы хотите сообщить об уязвимости в Electron, напишите security@electronjs.org.
