---
title: Средства специальных возможностей
author: джлорд
date: '2016-08-23'
---

Создание доступных приложений важно, и мы рады представить новую функциональность [Devtron](https://electronjs.org/devtron) и [Spectron](https://electronjs.org/spectron) , что дает разработчикам возможность сделать их приложения лучше для всех.

---

Проблемы доступности в приложениях Electron похожи на веб-сайты, потому что они оба в конечном итоге HTML. Однако в приложениях Electron вы не можете использовать онлайн-ресурсы для аудита доступности, так как у вашего приложения нет URL-адреса, на который будет ссылаться аудитор.

These new features bring those auditing tools to your Electron app. Эти новые возможности приносят эти инструменты аудита в ваше приложение Electron. Читайте краткую информацию об инструментах или посмотрите нашу [документацию по доступности](https://electronjs.org/docs/tutorial/accessibility/) для получения дополнительной информации.

### Spectron

В тестируемом фреймворке Spectron теперь вы можете аудитировать каждое окно и `<webview>` тег в вашем приложении. Например:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Вы можете прочитать больше об этой функции в [Spectron документации](https://github.com/electron/spectron#accessibility-testing).

### Devtron

В Devtron есть новая вкладка специальных возможностей, которая позволит вам проверить страницу в вашем приложении, сортировать и фильтровать результаты.

![devtron скриншот](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Оба этих инструмента используют [Библиотеку Инструменты Разработчика Доступности](https://github.com/GoogleChrome/accessibility-developer-tools) , созданную Google для Chrome. Вы можете узнать больше о правилах аудита доступности, которые использует эта библиотека [хранилище](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Если вы знаете о других инструментах специальных возможностей для Electron, добавьте их в [документацию о специальных возможностях](https://electronjs.org/docs/tutorial/accessibility/) с запросом на слияние.

