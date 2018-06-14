# Accesibilidad

Hacer aplicaciones accesibles es importante y estamos felices de introducir nuevas funcionalidades a [Devtron](https://electronjs.org/devtron) y [Spectron](https://electronjs.org/spectron) que da a los desarrolladores la oportunidad de mejorar sus aplicaciones para todo el mundo.

* * *

Los problemas de accesibilidad en las aplicaciones Electron son similares a los de los sitios web debido a que ambos son básicamente HTML. Sin embargo, con las aplicaciones de Electron, no puedes usar los recursos online para las auditorías de accesibilidad, ya que la aplicación no posee una URL para apuntar al auditor.

Estas nuevas características traen esas herramientas de auditoría a su aplicación con Electron. Puede optar por agregar nuevas auditorías a las pruebas con Spectron o usarlas en DevTools con Devtron. Sigue leyendo para un resumen de las herramientas.

## Spectron

En la infraestructura de pruebas de Spectron, ahora puede auditar cada ventana y `<webview>` para hacer una etiqueta en su aplicación. Por ejemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puede leer más acerca de esta herramienta en la [documentación de Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

En Devtron, hay una nueva pestaña de accesibilidad la cual te permitirá auditar una página en su aplicación, ordenar y filtrar los resultados.

![capturas de devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas herramientas están utilizando la biblioteca [Herramientas de desarrollo de accesibilidad](https://github.com/GoogleChrome/accessibility-developer-tools) creada por Google para Chrome. Usted puede aprender más acerca de las reglas de auditoría de accesibilidad que esta biblioteca usa en la [wiki del repositorio](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si conoces de otras herramientas de gran accesibilidad para Electron, añádelas al documentado de accesibilidad con un pull request.

## Habilitar la accesibilidad

Las aplicaciones Electron mantienen la accesibilidad desactivada de manera estándar por razones de rendimiento, pero hay múltiples maneras de activarla.

### Aplicación interna

Usando [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), Puede exponer los cambios de accesibilidad a los usuarios en las preferencias de las aplicaciones. Las utilidades de asistencias del sistema del usuario tienen prioridad sobre esta configuración y la anularán.

### Tecnología de asistencia

La aplicación de Electron activará automáticamente la accesibilidad cuando detecta tecnología de asistencia (Windows) o VoiceOver (macOS). Consulte [Documentacion de accesibilidad](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) de Chrome para más detalles.

En macOS, la tecnología de asistencia de terceros puede cambiar la accesibilidad dentro de las aplicaciones Electron configurando el atributo `AXManualAccessibility` mediante programación:

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