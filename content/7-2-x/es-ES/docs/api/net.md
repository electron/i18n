# net

> Emitir solicitudes HTTP/HTTPS usando la biblioteca de red nativa de Chromium

Proceso: [principal](../glossary.md#main-process)</0>

El módulo `net` es un lado del cliente API para tratar pedidos HTTP(S). Si es similar a los módulos [HTTP](https://nodejs.org/api/http.html) y [HTTPS](https://nodejs.org/api/https.html) de Node.js pero usa la biblioteca de la red nativa de Chromium en vez de las aplicaciones Node.js, ofreciendo un mejor soporte a los proxies de la web.

La siguiente es una lista no completa de por qué debería considerar usar el módulo `net` en vez de los módulos nativos Node.js:

* Gestión automática del sistema de configuración de proxy, soporte del protocolo wpad y el paquete de archivos de configuración del proxy.
* Túnel automático para peticiones HTTPS.
* Soportar los proxies de autentificación usando basic, digest, NTLM, Kerberos, o negociar esquemas de autentificación.
* Soporta proxies para monitoreo de tráfico: Fiddler como proxies usados para el acceso, el control y el monitoreo.

Los componentes API (incluyendo clases, métodos, propiedades y nombres de eventos) son similares a esos usados en Node.js.

Ejemlo de uso:

```javascript
const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('Sin datos en la respuesta.')
    })
  })
  request.end()
})
```

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Métodos

El módulo `net` tiene los siguientes métodos:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - The `ClientRequest` constructor options.

Devuelve [`ClientRequest`](./client-request.md)

Crea una instancia [`ClientRequest`](./client-request.md) usando la `options` proveída la cual son directamente reenviadas al constructor `ClientRequest`. El método `net.request` será usado para emitir solicitudes HTTP tanto seguras como inseguras dependiendo de lo especificado en el esquema de protocolo en el objeto `options`.
