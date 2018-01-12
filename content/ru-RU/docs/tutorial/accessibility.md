# Доступность

Создание доступных приложений важно и мы рады представить новые функции [Devtron](https://electronjs.org/devtron) и [Spectron](https://electronjs.org/spectron), что дает разработчикам возможность делать свои приложения лучше для всех.

* * *

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. Однако в приложениях Electron вы не можете использовать онлайн-ресурсы для аудита доступности, потому что ваше приложение не имеет URL-адреса, чтобы указать аудитору.

Эти новые возможности принесли эти средства аудита в приложение Electron. Вы можете добавить аудит тесты Spectron или использовать их в рамках DevTools с Devtron. Прочитайте сводки инструментов или проверки нашей [доступной документации](https://electronjs.org/docs/tutorial/accessibility) для получения дополнительной информации.

## Spectron

В рамках тестирования фреймворка Spectron, вы можете совершить аудит каждого окна и `<webview>` тегов в вашем приложении. Например:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Вы можете прочитать больше об этой функции в [Spectron документации](https://github.com/electron/spectron#accessibility-testing).

## Devtron

В Devtron есть новая вкладка доступности, которая позволит вам совершить аудит страницы в вашем приложении, сортировать и фильтровать результаты.

![devtron скриншот](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Оба эти средства используют [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) библиотеки, построенных для Google Chrome. Вы можете узнать больше о доступности правила аудита, которые эта библиотека использует в этих [репозиториях wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Если вы знаете другие инструменты доступности для Electron, добавьте их к [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) pull request'том.

## Enabling Accessibility

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Inside Application

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Assistive Technology

Electron application will enable accessibility automatically when it detects assistive technology (Windows) or VoiceOver (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

On macOS, third-party assistive technology can switch accessibility inside Electron applications by setting the attribute `AXManualAccessibility` programmatically:

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