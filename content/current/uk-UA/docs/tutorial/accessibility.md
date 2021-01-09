# Доступність

Створення доступу до доступних програм дуже важливе, і ми з радістю надаємо функціональність [Devtron](https://electronjs.org/devtron) і [Spectron](https://electronjs.org/spectron) , що дає розробникам можливість покращити їх програмам для всіх.

---

Проблеми з доступністю для Electron додатків схожі на сайти через те, що вони врешті HTML. Однак, із додатками Electron Ви не можете використовувати онлайн-ресурси для аудиту доступності тому що ваш додаток не має URL для вказівника.

Ці функції надають ці інструменти для контролю до вашого застосунку Electron. Ви можете додати аудити до своїх тестів за допомогою Spectron або використовувати їх в інструментах DevTools з Devtron. Читайте про резюме інструментів.

## Spectron

При тестуванні специфікації фреймворку ви можете тепер перевіряти кожне вікно і тег `<webview>` у вашому додатку. Наприклад:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Ви можете прочитати більше про цю функцію в документації [Spectron's](https://github.com/electron/spectron#accessibility-testing).

## Devtron

У Devtron присутня вкладка Спец. можливостей, що дозволить вам аутувати сторінку у вашому додатку, сортувати і фільтрувати результати.

![Скріншот розробника](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Обидві ці інструменти використовують [Інструменти розробника спеціальних можливостей](https://github.com/GoogleChrome/accessibility-developer-tools) бібліотеку, побудовану Google для Chrome. Ви можете дізнатися більше про доступність аудиту правил, які використовує ця бібліотека на [вікі](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Якщо ви знаєте про інші чудові інструменти для доступності для Electron, додайте їх до в документацію доступності за допомогою pull request.

## Вручну вмикає спеціальні можливості

Програми Electron автоматично увімкнуть функції доступності в присутність допоміжної технології (наприклад . [JAWS](https://www.freedomscientific.com/products/software/jaws/) на Windows або [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) на macOS). Дивіться [спеціальні можливості](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) для подробиць.

Ви також можете вручну ввімкнути ці функції в вашому додатку Electron або помістивши прапори в системному програмному забезпеченні.

### Використання API Electron

Використовуючи [`app.setAccessibilitySupportd(увімкнений)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, ви можете вручну відобразити дерево доступності Chrome до користувачів у налаштуваннях програми. Note that the user's system assistive utilities have priority over this setting and will override it.

### В межах сторонніх програм

#### macOS

На macOS, новітня технологія може ввімкнути спеціальні можливості в Electron applics, встановивши `AXManualAccess,` attribute programmatically:

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
