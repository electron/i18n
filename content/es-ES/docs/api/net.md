# red

> Emitir solicitudes HTTP/HTTPS usando la biblioteca de red nativa de Chromium

Proceso: [Main](../glossary.md#main-process)

El módulo `net` es un lado del cliente API para tratar pedidos HTTP(S). Si es similar a los módulos [HTTP](https://nodejs.org/api/http.html) y [HTTPS](https://nodejs.org/api/https.html) de Node.js pero usa la biblioteca de la red nativa de Chromium en vez de las aplicaciones Node.js, ofreciendo un mejor soporte a los proxies de la web. It also supports checking network status.

La siguiente es una lista no completa de por qué debería considerar usar el módulo `net` en vez de los módulos nativos Node.js:

* Gestión automática del sistema de configuración de proxy, soporte del protocolo wpad y el paquete de archivos de configuración del proxy.
* Túnel automático para peticiones HTTPS.
* Soportar los proxies de autentificación usando basic, digest, NTLM, Kerberos, o negociar esquemas de autentificación.
* Soporta proxies para monitoreo de tráfico: Fiddler como proxies usados para el acceso, el control y el monitoreo.

Los componentes API (incluyendo clases, métodos, propiedades y nombres de eventos) son similares a esos usados en Node.js.

Ejemplo de uso:

```javascript
const { app } = require('electron')
app.whenReady().then(() => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
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

Returns `Boolean` - Whether there is currently internet connection.

A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites. However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular connection attempt to a particular remote site will be successful.

## Propiedades

### `net.online` _Readonly_

Una propiedad `Boolean`. Whether there is currently internet connection.

A return value of `false` is a pretty strong indicator that the user won't be able to connect to remote sites. However, a return value of `true` is inconclusive; even if some link is up, it is uncertain whether a particular connection attempt to a particular remote site will be successful.
