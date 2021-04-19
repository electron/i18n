---
title: Herramientas de accesibilidad
author: señor
date: '2016-08-23'
---

Hacer aplicaciones accesibles es importante y estamos encantados de introducir nuevas funcionalidades en [Devtron](https://electronjs.org/devtron) y [Espectron](https://electronjs.org/spectron) que dan a los desarrolladores la oportunidad de hacer sus aplicaciones mejores para todos.

---

Los problemas de accesibilidad en las aplicaciones de Electron son similares a los de los sitios web porque ambos son en última instancia HTML. Sin embargo, con las aplicaciones Electron no puede utilizar los recursos en línea para las auditorías de accesibilidad porque su aplicación no tiene una URL a la que apuntar el auditor.

Estas nuevas funciones traen esas herramientas de auditoría a tu App Electron. Estas nuevas características traen esas herramientas de auditoría a su aplicación Electron. Lea para obtener un resumen de las herramientas o revise nuestra [documentación de accesibilidad](https://electronjs.org/docs/tutorial/accessibility/) para más información.

### Spectron

En el framework de pruebas Spectron, ahora puedes auditar cada ventana y la etiqueta `<webview>` en tu aplicación. Por ejemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puede leer más acerca de esta herramienta en la [documentación de Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

En Devtron hay una nueva pestaña de accesibilidad que le permitirá auditar una página en su aplicación, ordenar y filtrar los resultados.

![Capturas de devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas herramientas utilizan la librería de [Herramientas para desarrolladores de accesibilidad](https://github.com/GoogleChrome/accessibility-developer-tools) construida por Google para Chrome. Puedes aprender más sobre las reglas de auditoría de accesibilidad que esta biblioteca usa en la wiki de ese [repositorio](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Si conoce otras grandes herramientas de accesibilidad para Electron, añádelas a la [documentación de accesibilidad](https://electronjs.org/docs/tutorial/accessibility/) con una solicitud de extracción.

