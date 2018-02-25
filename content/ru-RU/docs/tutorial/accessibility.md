# Доступность

Создание доступных приложений важно и мы рады представить новые функции [Devtron](https://electronjs.org/devtron) и [Spectron](https://electronjs.org/spectron), которая дает разработчикам возможность делать свои приложения лучше для всех.

* * *

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. With Electron apps, however, you can't use the online resources for accessibility audits because your app doesn't have a URL to point the auditor to.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Read on for a summary of the tools.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. For example:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Вы можете прочитать больше об этой функции в [Spectron документации](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron скриншот](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## Enabling Accessibility

Electron приложения держат доступность отключенной по умолчанию для производительности, но есть несколько способов ее включения.

### Inside Application

С помощью [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), вы можете открыть переключатель доступности для пользователей в настройках приложения. User's system assistive utilities have priority over this setting and will override it.

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