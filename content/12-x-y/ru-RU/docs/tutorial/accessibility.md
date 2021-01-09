# Доступность

Making accessible applications is important and we're happy to provide functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. Однако, в приложениях на Electron мы не можем использовать онлайн-ресурсы для аудита доступности, поскольку ваше приложение не имеет URL-адреса.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Читайте далее ознакомление с инструментами.

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

В Devtron есть вкладка специальных возможностей, которая позволит вам проверить страницу в вашем приложении, сортировать и фильтровать результаты.

![devtron скриншот][4]

Оба эти средства используют библиотеку [Accessibility Developer Tools][a11y-devtools], построенную Google для Chrome. Вы можете узнать больше о правилах для аудита доступности, которые эта библиотека использует, в этих [wiki репозиториях ][a11y-devtools-wiki].

Если вы знаете другие средства для поверки доступности в Electron, добавите их в документацию через pull request.

## Включение функций специальных возможностей вручную

Приложение Electron автоматически включит функции специальных возможностей в наличии вспомогательной технологии (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) на Windows или [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) на MacOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

Вы также можете вручную переключить эти функции в вашем приложении Electron или установив флаги в стороннем родном программном обеспечении.

### Использование Electron API

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. Обратите внимание, что системные вспомогательные утилиты пользователя имеют приоритет над этим параметром и переопределит его.

### Внутри стороннего программного обеспечения

#### macOS

В macOS, вспомогательная технология сторонних разработчиков может переключаться на специальные возможности внутри приложений Electron, установив программный атрибут `AXManualAccessibility` :

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
