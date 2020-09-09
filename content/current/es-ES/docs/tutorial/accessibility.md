# Accesibilidad

Making accessible applications is important and we're happy to provide functionality to [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) that gives developers the opportunity to make their apps better for everyone.

---

Los problemas de accesibilidad en las aplicaciones Electron son similares a los de los sitios web debido a que ambos son básicamente HTML. Sin embargo, con las aplicaciones de Electron, no puedes usar los recursos online para las auditorías de accesibilidad, ya que la aplicación no posee una URL para apuntar al auditor.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Sigue leyendo para un resumen de las herramientas.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Por ejemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puede leer más acerca de esta herramienta en la [documentación de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is an accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![Capturas de devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas herramientas están utilizando la biblioteca [Herramientas de desarrollo de accesibilidad](https://github.com/GoogleChrome/accessibility-developer-tools) creada por Google para Chrome. Usted puede aprender más acerca de las reglas de auditoría de accesibilidad que esta biblioteca usa en la [wiki del repositorio](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si conoces de otras herramientas de gran accesibilidad para Electron, añádelas al documentado de accesibilidad con un pull request.

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. [JAWS](https://www.freedomscientific.com/products/software/jaws/) on Windows or [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) on macOS). Consulte la [documentación de accesibilidad de Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) para obtener más detalles.

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
