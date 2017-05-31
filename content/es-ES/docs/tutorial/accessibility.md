# Accesibilidad

Aplicaciones accesibles es importante y estamos encantados de introducir nuevas funciones [Devtron](https://electron.atom.io/devtron) y [Spectron](https://electron.atom.io/spectron) que da a los desarrolladores la oportunidad de mejorar sus aplicaciones para todo el mundo.

* * *

Problemas de accesibilidad en aplicaciones de electrónica son similares a los de sitios web porque ambos son, en definitiva, HTML. Con aplicaciones de la electrónica, sin embargo, se pueden utilizar los recursos en línea para las auditorías de accesibilidad ya que su aplicación no tiene una dirección URL para el auditor.

Estas nuevas características traen esas herramientas de auditoría para su aplicación electrónica. Usted puede elegir agregar auditorías a sus pruebas con Spectron o utilizarlos en DevTools con Devtron. Sigue leyendo para un resumen de las herramientas o retirada nuestra documentation</a> de accessibility para obtener más información.</p> 

### Spectron

En el marco de pruebas Spectron, ahora puede auditar cada etiqueta de la ventana y `<webview>` en su aplicación. Por ejemplo:

```javascript
app.client.auditAccessibility () .then(function (audit) {si (audit.failed) {console.error(audit.message)}})
```

Usted puede leer más acerca de esta característica en documentation</a> de Spectron.</p> 

### Devtron

En Devtron, hay una nueva pestaña de accesibilidad que le permitirá auditar una página en su aplicación, ordenar y filtrar los resultados.

![captura de pantalla de devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Estas dos herramientas están utilizando la biblioteca de Tools</a> de desarrollador de [Accessibility construida por Google para Chrome. Usted puede aprender más acerca de las normas de auditoría de accesibilidad que esta biblioteca se utiliza en wiki](https://github.com/GoogleChrome/accessibility-developer-tools) de repository.</p> 

Si usted sabe de otras herramientas de gran accesibilidad para electrón, agregar a la documentation</a> de accessibility con una solicitud de extracción.</p>