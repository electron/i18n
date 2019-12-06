# net

> Выполнение HTTP/HTTPS запросов с использованием родной сетевой библиотеки Chromium

Process: [Main](../glossary.md#main-process)

Модуль `net` представляет собой клиентский API для выдачи HTTP(S) запросов. Он похож на модули [HTTP](https://nodejs.org/api/http.html) и [HTTPS](https://nodejs.org/api/https.html) в Node.js, но использует собственную сетевую библиотеку Chromium вместо реализации Node.js, обеспечивая лучшую поддержку веб-прокси.

Ниже приведен неполный список причин, по которым вы можете рассмотреть использование модуля `net` вместо собственных модулей Node.js:

* Автоматическое управление конфигурацией прокси системы, поддержка протокола wpad и файлов pac конфигурации прокси.
* Автоматическое туннелирование HTTPS запросов.
* Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
* Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

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
      console.log('No more data in response.')
    })
  })
  request.end()
})
```

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Методы

Модуль `net` имеет следующие методы:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - The `ClientRequest` constructor options.

Возвращает [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.