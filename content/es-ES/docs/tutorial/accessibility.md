# Accesibilidad

Hacer aplicaciones accesibles es importante y estamos felices de introducir nuevas funcionalidades a [Devtron](https://electronjs.org/devtron) y [Spectron](https://electronjs.org/spectron) que da a los desarrolladores la oportunidad de mejorar sus aplicaciones para todo el mundo.

* * *

Los problemas de accesibilidad en las aplicaciones Electron son similares a los de los sitios web debido a que ambos son básicamente HTML. Sin embargo, con las aplicaciones de Electron, no puedes los recursos online para las auditorias de accesibilidad ya que su aplicación no posee una URL para apuntar al auditor.

Estas nuevas características traen esas herramientas de auditoria a su aplicación Electron. Puede optar por agregar nuevas auditorias a sus pruebas con Spectron o usarlas en DevTools con Devtron. Sigue leyendo para un resumen de las herramientas.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. For example:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puede leer más acerca de esta herramienta en la [documentación de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![capturas de devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## Habilitar la accesibilidad

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Aplicación interna

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Tecnología de asistencia

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