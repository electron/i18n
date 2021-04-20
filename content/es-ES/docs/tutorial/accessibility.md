# Accesibilidad

Hacer que las aplicaciones sean accesibless es importante y estemos encantados de proporcionar funcionalidad en [Devtron][devtron] y [Spectron][spectron] que le brinda a los programadores la oportunidad de hacer que sus aplicaciones sean mejoren para todos.

---

Los problemas de accesibilidad en las aplicaciones Electron son similares a los de los sitios web ya que ambos son básicamente HTML. Sin embargo, con las aplicaciones de Electron, no se pueden usar auditorías de accesibilidad online ya que la aplicación no posee una URL que la herramienta de auditoria pueda acceder.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Sigue leyendo para un resumen de las herramientas.

## Spectron

En el framework de pruebas Spectron, ahora puede auditar cada ventana y la etiqueta `<webview>` en su aplicación. Por ejemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puede leer más acerca de esta herramienta en la [documentación de Spectron][spectron-a11y].

## Devtron

En Devtron, hay una pestaña de accesibilidad que le permitirá auditar una página en su aplicación, ordenar y filtrar los resultados.

![Capturas de devtron][4]

Ambas herramientas están utilizando la biblioteca [Herramientas de desarrollo de accesibilidad][a11y-devtools] creada por Google para Chrome. Usted puede aprender más acerca de las reglas de auditoría de accesibilidad que esta biblioteca usa en la [wiki del repositorio][a11y-devtools-wiki].

Si conoces de otras herramientas de gran accesibilidad para Electron, añádelas al documentado de accesibilidad con un pull request.

## Habilitar manualmente las funciones de accesibilidad

Las aplicaciones Electron habilitarán automáticamente las características de accesibilidad en la presencia de tecnología de asistencia (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) en Windows o [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) en macOS). Consulte la [documentación de accesibilidad de Chrome][a11y-docs] para obtener más detalles.

También puede cambiar manualmente estas características dentro de su aplicación Electron o configurando banderas en software nativo de terceros.

### Utilizando la API de Electron

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. Tenga en cuenta que las utilidades de asistencia al sistema del usuario tienen prioridad sobre esta configuración y la reemplazará.

### Usando software de terceros

#### macOS

En macOS, la tecnología de asistencia de terceros puede cambiar las características de accesibilidad dentro de aplicaciones Electron configurando el atributo `AXManualAccessibility` programáticamente:

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
