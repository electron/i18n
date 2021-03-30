---
title: Исправление уязвимости веб-настроек
author: ckerr
date: '2018-08-22'
---

Обнаружена уязвимость удаленного выполнения кода, затрагивающая приложения с возможностью открытия вложенных дочерних окон на версиях Electron (3. .0-beta.6, 2.0.7, 1.8.7 и 1.7.15). This vulnerability has been assigned the CVE identifier [CVE-2018-15685][].

---

## Затрагиваемые платформы

На вас влияют, если:

1. Вы встраиваете _любой_ удаленный контент пользователя, даже в песочницу
2. Вы принимаете ввод пользователей с любыми XSS уязвимостями

_Детали_

На вас влияют, если любой пользовательский код работает внутри `iframe` / может создать `iframe`. Учитывая возможность уязвимости XSS, можно предположить, что большинство приложений уязвимы к этому случаю.

На вас также влияют, если вы откроете любое из ваших окон с опцией `nativeWindowOpen: true` или `песочница: true`.  Хотя эта уязвимость также требует уязвимости XSS в вашем приложении, если вы используете один из этих вариантов, то вам следует применить один из смягчений ниже.

## Смягчение

Мы опубликовали новые версии Electron, которые включают исправления для этой уязвимости: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8), и [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Мы настоятельно призываем всех разработчиков Electron немедленно обновить свои приложения до последней стабильной версии.

Если по каким-то причинам вы не можете обновить версию Electron, вы можете защитить ваше приложение путем обьявления события `. reventDefault()` в событии `new-window` для всех  `webContents`'. Если вы не используете окно `. Откройте` или дочерние окна вообще, это также является правильным смягчением для вашего приложения.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Если вы полагаетесь на способность вашего детского окна создавать дети-окна, третья стратегия смягчения последствий заключается в том, чтобы использовать следующий код в окне верхнего уровня:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (event, url, frameName, disposition, options) => {
      if (!options. ebPreferences) { Опции
        ebPreferences = {}
      }
      Объект. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Этот код вручную подразумевает, что окна верхнего уровня `WebPreferences` вручную применяются ко всем дочерним окнам бесконечно глубины.

## Дополнительная информация

Эта уязвимость была обнаружена и ответственно сообщила проекту Electron [Matt Austin](https://twitter.com/mattaustin) из [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial][].

Если вы хотите сообщить об уязвимости в Electron, напишите на security@electronjs.org.

[security tutorial]: https://electronjs.org/docs/tutorial/security
[CVE-2018-15685]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685
