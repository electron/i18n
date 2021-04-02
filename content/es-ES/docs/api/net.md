# red

> Emitir solicitudes HTTP/HTTPS usando la biblioteca de red nativa de Chromium

Proceso: [Main](../glossary.md#main-process)

El módulo `net` es un lado del cliente API para tratar pedidos HTTP(S). Si es similar a los módulos [HTTP](https://nodejs.org/api/http.html) y [HTTPS](https://nodejs.org/api/https.html) de Node.js pero usa la biblioteca de la red nativa de Chromium en vez de las aplicaciones Node.js, ofreciendo un mejor soporte a los proxies de la web. También admite comprobar el estado de la red.

La siguiente es una lista no completa de por qué debería considerar usar el módulo `net` en vez de los módulos nativos Node.js:

* Gestión automática del sistema de configuración de proxy, soporte del protocolo wpad y el paquete de archivos de configuración del proxy.
* Túnel automático para peticiones HTTPS.
* Soportar los proxies de autentificación usando basic, digest, NTLM, Kerberos, o negociar esquemas de autentificación.
* Soporta proxies para monitoreo de tráfico: Fiddler como proxies usados para el acceso, el control y el monitoreo.

Los componentes API (incluyendo clases, métodos, propiedades y nombres de eventos) son similares a esos usados en Node.js.

Ejemlo de uso:

```javascript
const { app } = require (' Electron ')
app. whenReady (). luego (() => {
  const { net } = require (' Electron ')
  const request = net. Request (' https://github.com ')
  request. on (' Response ', (Response) => {
    Console. log (' estado: ${response.statusCode}')
    Console. log (' HEADERS: $ {JSON. stringify (Response. Headers)} ')
    respuesta. on (' Data ', (Chunk) => {
      Console. log (' BODY: ${chunk}')
    })
    Response. on (' End ', () => {
      Console. log (' no más datos en respuesta. ')
    })
  })
  request. end ()
})
```

La API `net` puede ser utilizada solo después que la aplicación emita el evento `ready`. Intentar usar el módulo antes del evento `ready` lanzará un error.

## Métodos

El módulo `net` tiene los siguientes métodos:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - Las opciones del constructor de `ClientRequest`.

Devuelve [`ClientRequest`](./client-request.md)

Crea una instancia [`ClientRequest`](./client-request.md) usando la `options` proveída la cual son directamente reenviadas al constructor `ClientRequest`. El método `net.request` será usado para emitir solicitudes HTTP tanto seguras como inseguras dependiendo de lo especificado en el esquema de protocolo en el objeto `options`.

### `net.isOnline()`

Devuelve `Boolean` -si hay conexión a Internet actualmente.

Un valor devuelto de `false` es un indicador bastante fuerte de que el usuario no podrá conectarse a sitios remotos. Sin embargo, un valor devuelto de `true` no es concluyente; incluso si algún enlace está actualizado, es incierto si un intento de conexión particular a un sitio remoto particular será exitoso.

## Propiedades

### `net.online` _Readonly_

Una propiedad `Boolean`. Si actualmente hay conexión a Internet.

Un valor devuelto de `false` es un indicador bastante fuerte de que el usuario no podrá conectarse a sitios remotos. Sin embargo, un valor devuelto de `true` no es concluyente; incluso si algún enlace está actualizado, es incierto si un intento de conexión particular a un sitio remoto particular será exitoso.
