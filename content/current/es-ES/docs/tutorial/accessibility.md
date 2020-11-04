# Accesibilidad

Hacer aplicaciones accesibles es importante y estamos encantados de proporcionar funcionalidad a [Devtron](https://electronjs.org/devtron) y [Spectron](https://electronjs.org/spectron) que le da a desarrolladores la oportunidad de hacer sus aplicaciones mejores para todos.

---

Los problemas de accesibilidad en las aplicaciones Electron son similares a los de los sitios web debido a que ambos son básicamente HTML. Sin embargo, con las aplicaciones de Electron, no puedes usar los recursos online para las auditorías de accesibilidad, ya que la aplicación no posee una URL para apuntar al auditor.

Estas características traen esas herramientas de auditoría a su aplicación Electron. Puede elegir añadir auditorías a sus pruebas con Spectron o usarlas dentro de DevTools con Devtron. Sigue leyendo para un resumen de las herramientas.

## Spectron

En el framework de pruebas Spectron, ahora puede auditar cada ventana y la etiqueta `<webview>` en su aplicación. Por ejemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puede leer más acerca de esta herramienta en la [documentación de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

En Devtron, hay una pestaña de accesibilidad que le permitirá auditar una página en su aplicación, ordenar y filtrar los resultados.

![Capturas de devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas herramientas están utilizando la biblioteca [Herramientas de desarrollo de accesibilidad](https://github.com/GoogleChrome/accessibility-developer-tools) creada por Google para Chrome. Usted puede aprender más acerca de las reglas de auditoría de accesibilidad que esta biblioteca usa en la [wiki del repositorio](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si conoces de otras herramientas de gran accesibilidad para Electron, añádelas al documentado de accesibilidad con un pull request.

## Habilitar manualmente las funciones de accesibilidad

Las aplicaciones Electron habilitarán automáticamente las características de accesibilidad en la presencia de tecnología de asistencia (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) en Windows o [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) en macOS). Consulte la [documentación de accesibilidad de Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) para obtener más detalles.

También puede cambiar manualmente estas características dentro de su aplicación Electron o configurando banderas en software nativo de terceros.

### Utilizando la API de Electron

Utilizando la API [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) , puede exponer manualmente el árbol de accesibilidad de Chrome a los usuarios en las preferencias de la aplicación. Tenga en cuenta que las utilidades de asistencia al sistema del usuario tienen prioridad sobre esta configuración y la reemplazará.

### Dentro de software de terceros

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
