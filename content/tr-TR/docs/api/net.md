# ağ

> Chromium'un yerel ağ kütüphanesini kullanarak HTTP/HTTPS isteklerini yayınla

Süreç: [Ana](../glossary.md#main-process)

The `net` module is a client-side API for issuing HTTP(S) requests. Node.js'nin [HTTP](https://nodejs.org/api/http.html) ve [HTTPS](https://nodejs.org/api/https.html) modüllerine benzer ancak web proxy'leri için daha iyi destek sunan Node.js uygulaması yerine Chromium'un yerel ağ kitaplığını kullanıyor.

The following is a non-exhaustive list of why you may consider using the `net` module instead of the native Node.js modules:

* Sistem proxy yapılandırmasının otomatik yönetimi, wpad protokolü ve proxy pac yapılandırma dosyalarının desteği.
* HTTPS isteklerine otomatik tünel açılması.
* Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
* Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

The `net` module API has been specifically designed to mimic, as closely as possible, the familiar Node.js API. The API components including classes, methods, properties and event names are similar to those commonly used in Node.js.

Glecek örnek `net` API kullanımı hakkında bilgi verir:

```javascript
const {app} = require('electron')
app.on('ready', () => {
  const {net} = require('electron')
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

Bu arada, [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) Node.js modüllerini kullanım şeklinizle neredeyse aynı

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Metodlar

`net` modülü aşağıdaki yöntemleri içerir:

### `net.request(options)`

* `options` (Object | String) - The `ClientRequest` constructor options.

Returns [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.