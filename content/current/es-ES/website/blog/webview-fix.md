---
title: Arreglo de vulnerabilidad de Webview
author: ckerr
date: '21-03-2018'
---

Se ha descubierto una vulnerabilidad que permitía que la integración de Node.js volviera a estar habilitada en algunas aplicaciones Electron que la desactivaban. Esta vulnerabilidad ha sido asignada al identificador CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Aplicaciones Afectadas

Una aplicación se ve afectada si *todas* de las siguientes opciones son verdaderas:

 1. Ejecuta en Electron 1.7, 1.8 o 2.0.0-beta
 2. Permite la ejecución de código remoto arbitrario
 3. Deshabilita la integración de Node.js
 4. No declara explícitamente `webviewTag: false` en sus preferencias web
 5. No habilita la opción `nativeWindowOption`
 6. No intercepta `eventos` de nueva ventana y anula manualmente `event.newGuest` sin usar la etiqueta de opciones proporcionada

Aunque parece ser una minoría de aplicaciones de Electron, recomendamos que todas las solicitudes se actualicen como precaución.

## Modificación

Esta vulnerabilidad se ha corregido en las versiones de hoy [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)y [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Los desarrolladores que no pueden actualizar la versión Electron de su aplicación pueden mitigar la vulnerabilidad con el siguiente código:

```js
app.on('web-contents-created', (evento, ganador) => {
  ganar. n('nuevo-ventana', (evento, newURL, frameName, disposición,
                        opciones, additionalFeatures) => {
    if (! pciones. ebPreferences) options.webPreferences = {};
    options.webPreferencias. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    opciones. ebPreferences.webviewTag = false;
    delete options.webPreferences. recarga;
  })
})

// y *si* no usas WebViews en absoluto,
// puede que también quieras
aplicaciones. n('web-contents-created', (evento, ganador) => {
  gana. n('will-attach-webview', (evento, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Más información

Esta vulnerabilidad fue encontrada e informada responsablemente al proyecto Electron por Brendan Scarvell de [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Para obtener más información sobre las mejores prácticas para mantener sus aplicaciones Electron seguras, consulte nuestro [tutorial de seguridad](https://electronjs.org/docs/tutorial/security).

Para reportar una vulnerabilidad en Electron, por favor envíe un correo electrónico a security@electronjs.org.

Por favor, únete a nuestra [lista de correo electrónico](https://groups.google.com/forum/#!forum/electronjs) para recibir actualizaciones sobre versiones y actualizaciones de seguridad.

