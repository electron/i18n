# net

> Дати HTTP/HTTPS запит, використовуючи власну мережеву бібліотеку Chromium

Процес: [Main](../glossary.md#main-process)

Модуль `net` це API для запитів клієнта через HTTP(S). Це подібно модулям [HTTP](https://nodejs.org/api/http.html) та [HTTPS](https://nodejs.org/api/https.html) в Node.js, але використовує власну мережеву бібліотеку Chromium в противагу власним реалізаціям від Node.js, обіцяючи кращу підтримку для веб проксі.

The following is a non-exhaustive list of why you may consider using the `net` module instead of the native Node.js modules:

* Automatic management of system proxy configuration, support of the wpad protocol and proxy pac configuration files.
* Automatic tunneling of HTTPS requests.
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

## Методиa

Модуль `net` має наступні методи:

### `net.request(options)`

* `options` (Object | String) - The `ClientRequest` constructor options.

Повертає [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.
