# Доступность

Создание доступных приложений важно и мы рады представить новые функции [Devtron](https://electronjs.org/devtron) и [Spectron](https://electronjs.org/spectron), которые дают разработчикам возможность делать свои приложения лучше для всех.

---

Проблемы с доступностью в приложениях Electron аналогичны веб-сайтам, поскольку они оба в конечном итоге являются HTML. Однако, в приложениях на Electron мы не можем использовать онлайн-ресурсы для аудита доступности, поскольку ваше приложение не имеет URL-адреса.

Эти функции приносят эти инструменты аудита в ваше приложение Electron. Вы можете добавить аудит к вашим тестам со Spectron или использовать их в DevTools с Devtron. Читайте далее ознакомление с инструментами.

## Spectron

В тестируемом фреймворке Spectron теперь вы можете проверить каждое окно и `<webview>` тег в вашем приложении. Например:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Вы можете прочитать больше об этой функции в [Spectron документации](https://github.com/electron/spectron#accessibility-testing).

## Devtron

В Devtron есть вкладка специальных возможностей, которая позволит вам проверить страницу в вашем приложении, сортировать и фильтровать результаты.

![devtron скриншот](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Оба эти средства используют библиотеку [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools), построенную Google для Chrome. Вы можете узнать больше о правилах для аудита доступности, которые эта библиотека использует, в этих [wiki репозиториях ](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Если вы знаете другие средства для поверки доступности в Electron, добавите их в документацию через pull request.

## Включение функций специальных возможностей вручную

Приложение Electron автоматически включит функции специальных возможностей в наличии вспомогательной технологии (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) на Windows или [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) на MacOS). Смотрите [документацию о специальных возможностях Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) для получения более подробной информации.

Вы также можете вручную переключить эти функции в вашем приложении Electron или установив флаги в стороннем родном программном обеспечении.

### Использование Electron API

Используя [`app.setcessibilitySupportEnabled(включено)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, вы можете вручную раскрыть дерево специальных возможностей Chrome пользователям в настройках приложения. Обратите внимание, что системные вспомогательные утилиты пользователя имеют приоритет над этим параметром и переопределит его.

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
