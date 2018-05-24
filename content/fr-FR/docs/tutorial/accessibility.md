# Accessibilité

Développer des applications de manière accessible est importante, nous sommes heureux de vous introduire [Devtron](https://electronjs.org/devtron) et [Spectron](https://electronjs.org/spectron) qui donnent aux développeur l'opportunité de faire de meilleurs applications pour tous le monde.

* * *

L'accessibilité de développement avec l'application Electron est similaire à la création d'un site web, car les deux fonctionne avec de L'HTML . Avec les applications Electron, cependant, vous ne pouvez pas utilisez de ressources en ligne afin de mesurer l'accessibilité de votre application, parce qu'elle ne possède pas d'URL sur laquelle ces outils pourraient pointer.

De nouvelles fonctionnalités apportent des outils d’audit à votre application Electron. Vous pouvez choisir d’ajouter des audits à vos tests avec Spectron ou de les utiliser à l'intérieur des DevTools avec Devtron. Continuez pour lire une brève introduction de ces outils.

## Spectron

Dans le framework de test Spectron, vous pouvez désormais auditer chaque fenêtre et `<webview>`balise dans votre application. Par exemple :

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Vous pouvez en savoir plus sur cette fonctionnalité dans la [documentation de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![capture d’écran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## Activer l'accessibilité

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Dans l'application

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Technologies d’assistance

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