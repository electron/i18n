# Доступність

Making accessible applications is important and we're happy to introduce new functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

Проблеми з доступністю для Electron додатків схожі на сайти через те, що вони врешті HTML. Однак, із додатками Electron Ви не можете використовувати онлайн-ресурси для аудиту доступності тому що ваш додаток не має URL для вказівника.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Читайте про резюме інструментів.

## Spectron

При тестуванні специфікації фреймворку ви можете тепер перевіряти кожне вікно і тег `<webview>` у вашому додатку. Наприклад:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

You can read more about this feature in [Spectron's documentation][spectron-a11y].

## Devtron

У Devtron є нова вкладка спеціальних можливостей, яка дозволить перевіряти сторінку у вашому додатку, сортувати і фільтрувати результати.

![Скріншот розробника][4]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

Якщо ви знаєте про інші чудові інструменти для доступності для Electron, додайте їх до в документацію доступності за допомогою pull request.

## Увімкнення Спеціальних Можливостей

Програми Electron зберігають доступність вимкнуто за замовчуванням для швидкодії причин, але є кілька способів це увімкнути.

### Всередині застосунку

By using [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Допомога

Програма Electron увімкне спеціальні можливості автоматично, коли він виявляє допоміжну технологію (Windows) або VoiceOver (macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

На macOS, стороння допоміжна технологія може перемикати доступність всередині Electron applics, встановивши атрибут `AXManualAccess,` программатично:

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

```

[4]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
