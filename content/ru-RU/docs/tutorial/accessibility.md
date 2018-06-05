# Доступность

Создание доступных приложений важно и мы рады представить новые функции [Devtron](https://electronjs.org/devtron) и [Spectron](https://electronjs.org/spectron), которые дают разработчикам возможность делать свои приложения лучше для всех.

* * *

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. Однако, в приложениях на Electron мы не можем использовать онлайн-ресурсы для аудита доступности, поскольку ваше приложение не имеет URL-адреса.

Эти новые возможности приносят средства аудита для приложения на Electron. Вы можете добавить их в тесты с Spectron или использовать в рамках DevTools с Devtron. Читайте далее ознакомление с инструментами.

## Spectron

В тестированиях на Spectron, вы можете добавить проверку к каждому окну и `<webview>`-тегу в приложении. Например:

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

Оба эти средства используют библиотеку [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools), построенную Google для Chrome. Вы можете узнать больше о правилах для аудита доступности, которые эта библиотека использует, в этих [wiki репозиториях ](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Если вы знаете другие средства для поверки доступности в Electron, добавите их в документацию через pull request.

## Включение доступности

Electron приложения держат доступность отключенной по умолчанию для производительности, но есть несколько способов ее включения.

### Внутри приложения

С помощью [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), вы можете открыть переключатель доступности для пользователей в настройках приложения. Вспомогательные утилиты пользователя системы имеют приоритет перед этим параметром и будут переопределять его.

### Assistive Technology

В приложениях на Electron можно включить проверку доспупности автоматически, когда обнаруживается Assistive Technology (Windows) or VoiceOver (macOS). Смотрите [документацию по доступности](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) Chrome для дополнительных сведений.

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