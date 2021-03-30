---
title: Уязвимость обработчика протокола
author: zeke
date: '2018-01-22'
---

Обнаружена уязвимость удаленного выполнения кода, затрагивающая приложения Electron, использующие обработчики пользовательских протоколов. This vulnerability has been assigned the CVE identifier [CVE-2018-1000006][].

---

## Затрагиваемые платформы

Electron приложения, предназначенные для запуска на Windows, которые зарегистрированы как обработчик по умолчанию для протокола, например `myapp://`, уязвимы.

Такие приложения могут быть затронуты независимо от того, как зарегистрирован протокол, это может быть родной код, реестр Windows или API Electron [app.setAsDefaultProtocolClient][].

macOS и Linux **не уязвимы** к этой проблеме.

## Смягчение

Мы опубликовали новые версии Electron, которые включают исправления этой уязвимости: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), и [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Мы настоятельно призываем всех разработчиков Electron немедленно обновить свои приложения до последней стабильной версии .

If for some reason you are unable to upgrade your Electron version, you can append `--` as the last argument when calling [app.setAsDefaultProtocolClient][], which prevents Chromium from parsing further options. Двойной тире `--` обозначает параметры конца команды, после которых принимаются только позиционные параметры.

```js
app.setAsDefaultProtocolClient(протокол, process.execPath, [
  '--your-switches-здесь',
  '--'
])
```

See the [app.setAsDefaultProtocolClient][] API for more details.

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Если вы хотите сообщить об уязвимости в Electron, напишите security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
[app.setAsDefaultProtocolClient]: https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows
[CVE-2018-1000006]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006
