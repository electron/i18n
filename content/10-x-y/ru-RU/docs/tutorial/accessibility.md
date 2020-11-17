# Доступность

Создание доступных приложений важно и мы рады представить новые функции [Devtron][devtron] и [Spectron][spectron], которые дают разработчикам возможность делать свои приложения лучше для всех.

---

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. Однако, в приложениях на Electron мы не можем использовать онлайн-ресурсы для аудита доступности, поскольку ваше приложение не имеет URL-адреса.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Читайте далее ознакомление с инструментами.

## Spectron

В тестируемом фреймворке Spectron теперь вы можете проверить каждое окно и `<webview>` тег в вашем приложении. Например:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Вы можете прочитать больше об этой функции в [Spectron документации][spectron-a11y].

## Devtron

В Devtron есть новая вкладка доступности, которая позволит вам совершить аудит страницы в вашем приложении, сортировать и фильтровать результаты.

![devtron скриншот][4]

Оба эти средства используют библиотеку [Accessibility Developer Tools][a11y-devtools], построенную Google для Chrome. Вы можете узнать больше о правилах для аудита доступности, которые эта библиотека использует, в этих [wiki репозиториях ][a11y-devtools-wiki].

Если вы знаете другие средства для поверки доступности в Electron, добавите их в документацию через pull request.

## Включение доступности

Electron приложения держат доступность отключенной по умолчанию для производительности, но есть несколько способов ее включения.

### Внутри приложения

С помощью [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], вы можете открыть переключатель доступности для пользователей в настройках приложения. Вспомогательные утилиты системы пользователя имеют приоритет перед этим параметром и будут переопределять его.

### Assistive Technology

В приложениях на Electron можно включить проверку доспупности автоматически, когда обнаруживается Assistive Technology (Windows) or VoiceOver (macOS). Смотрите [документацию по доступности][a11y-docs] Chrome для дополнительных сведений.

Сторонние вспомогательные утилиты на macOS могут включать средства доступности программным способом, изменяя параметр `AXManualAccessibility`:

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```

[4]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
