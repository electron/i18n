# Accessibilité

Rendre des applications accessibles est important et nous sommes heureux de fournir une fonctionnalité à [](https://electronjs.org/devtron) Devtron et [](https://electronjs.org/spectron) Spectron qui donne aux développeurs la possibilité de rendre leurs applications meilleures pour tout le monde.

---

L'accessibilité de développement avec l'application Electron est similaire à la création d'un site web, car les deux fonctionnent avec de L'HTML . Avec les applications Electron, cependant, vous ne pouvez pas utiliser de ressources en ligne afin de mesurer l'accessibilité de votre application, parce qu'elle ne possède pas d'URL sur laquelle ces outils pourraient pointer.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Continuez pour lire une brève introduction de ces outils.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is an accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ces deux outils utilisent la bibliothèque [Outils d'accessibilité pour les développeurs](https://github.com/GoogleChrome/accessibility-developer-tools) faite par Google pour Chrome. Vous pouvez en apprendre d'avantage sur les règles sur l’audit de l'accessibilité que cette bibliothèque utilise sur ce [wiki du répertoire git](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si vous connaissez d'autres outils d'accessibilité pour Electron, ajoutez les à cette documentation avec une pull request.

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. [JAWS](https://www.freedomscientific.com/products/software/jaws/) on Windows or [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) on macOS). Consultez la [documentation d’accessibilité](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) de Chrome pour plus de détails.

You can also manually toggle these features either within your Electron application or by setting flags in third-party native software.

### Using Electron's API

By using the [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, you can manually expose Chrome's accessibility tree to users in the application preferences. Note that the user's system assistive utilities have priority over this setting and will override it.

### Within third-party software

#### macOS

On macOS, third-party assistive technology can toggle accessibility features inside Electron applications by setting the `AXManualAccessibility` attribute programmatically:

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
