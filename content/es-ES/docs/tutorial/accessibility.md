# Accesibilidad

Hacer aplicaciones accesibles es importante y estamos encantados de presentar nuevas funcionalidades a [Devtron](https://electron.atom.io/devtron) y Spectron</ 1> que brindan a los desarrolladores la oportunidad de mejorar sus aplicaciones para todo el mundo.</p> 

* * *

Los problemas de accesibilidad en las aplicaciones de Electrón son similares a los de los sitios web porque, en última instancia, son HTML. Sin embargo, con las aplicaciones de Electron, no puede usar los recursos en línea para las auditorías de accesibilidad ya que su aplicación no tiene una URL para apuntar al auditor.

Estas nuevas características traen esas herramientas de auditoría a su aplicación Electron. Puede optar por agregar auditorías a sus pruebas con Spectron o usarlas en DevTools con Devtron. Siga leyendo para obtener un resumen de las herramientas o revise nuestra documentación de accesibilidad< 0> para obtener más información.</p> 

## Spectron

En el marco de pruebas Spectron, ahora puede auditar cada ventana y `<webview>`la etiqueta en su aplicación. Por ejemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

You can read more about this feature in [Spectron's documentation](https://github.com/electron/spectron#accessibility-testing).

## Devtron

En Devtron, hay una nueva pestaña de accesibilidad que le permitirá auditar una página en su aplicación, ordenar y filtrar los resultados.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas herramientas están utilizando la biblioteca [Herramientas de desarrollo de accesibilidad](https://github.com/GoogleChrome/accessibility-developer-tools) creada por Google para Chrome. Usted puede obtener más información sobre las reglas de auditoría de accesibilidad que esta biblioteca utiliza en la [wiki del repositorio](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si usted sabe de otras herramientas de gran accesibilidad para Electron, agregar a la documentation</a> de accessibility con una solicitud de extracción.</p> 

## Habilitar la accesibilidad

Las aplicaciones electrónicas mantienen la accesibilidad desactivada de forma predeterminada por razones de rendimiento, pero existen múltiples formas de habilitarla.

### Aplicación interna

Al usar [`app.setAccessibilitySupportEnabled (enabled)`](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), puede exponer el interruptor de accesibilidad a los usuarios en las preferencias de la aplicación. Las utilidades de asistencia del sistema del usuario tienen prioridad sobre esta configuración y la anularán.

### Tecnología de asistencia

La aplicación de electrón permitirá la accesibilidad automáticamente cuando detecta tecnología de asistencia (Windows) o narración (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

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