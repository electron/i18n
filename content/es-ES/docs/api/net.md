# net

> Emitir solicitudes HTTP/HTTPS usando la biblioteca de red nativa de Chromium

Process: [Main](../glossary.md#main-process)

El módulo `net` es un lado del cliente API para tratar pedidos HTTP(S). Si es similar a los módulos [HTTP](https://nodejs.org/api/http.html) y [HTTPS](https://nodejs.org/api/https.html) de Node.js pero usa la biblioteca de la red nativa de Chromium en vez de las aplicaciones Node.js, ofreciendo un mejor soporte a los proxies de la web.

La siguiente es una lista no completa de por qué debería considerar usar el módulo `net` en vez de los módulos nativos Node.js:

* Gestión automática del sistema de configuración de proxy, soporte del protocolo wpad y el paquete de archivos de configuración del proxy.
* Túnel automático para peticiones HTTPS.
* Soportar los proxies de autentificación usando basic, digest, NTLM, Kerberos, o negociar esquemas de autentificación.
* Soporta proxies para monitoreo de tráfico: Fiddler como proxies usados para el acceso, el control y el monitoreo.

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

Example usage:

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

La API `net` puede ser usada solo después de que la aplicación emite el evento `ready`. Tratar de usar el módulo antes del evento `ready` arrojará un error.

## Métodos

El módulo `net` tiene los siguientes métodos:

### `net.request(options)`

* `opciones` (Objecto | cadena) - Las opiniones de constructor `ClientRequest`.

Devuelve [`ClientRequest`](./client-request.md)

Crea una instancia [`ClientRequest`](./client-request.md) usando la `options` proveída la cual son directamente reenviadas al constructor `ClientRequest`. El método `net.request` será usado para emitir solicitudes HTTP tanto seguras como inseguras dependiendo de lo especificado en el esquema de protocolo en el objeto `options`.