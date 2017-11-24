# Доступность

Создание доступных приложений важно и мы рады представить новые функции [Devtron](https://electron.atom.io/devtron) и [Spectron](https://electron.atom.io/spectron), что дает разработчикам возможность делать свои приложения лучше для всех.

* * *

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. Однако в приложениях Electron вы не можете использовать онлайн-ресурсы для аудита доступности, потому что ваше приложение не имеет URL-адреса, чтобы указать аудитору.

Эти новые возможности принесли эти средства аудита в приложение Electron. Вы можете добавить аудит тесты Spectron или использовать их в рамках DevTools с Devtron. Прочитайте сводки инструментов или проверки нашей [доступной документации](https://electron.atom.io/docs/tutorial/accessibility) для получения дополнительной информации.

### Spectron

В рамках тестирования фреймворка Spectron, вы можете совершить аудит каждого окна и `<webview>` тегов в вашем приложении. Например:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Вы можете прочитать больше об этой функции в [Spectron документации](https://github.com/electron/spectron#accessibility-testing).

### Devtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron скриншот](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electron.atom.io/docs/tutorial/accessibility) with a pull request.