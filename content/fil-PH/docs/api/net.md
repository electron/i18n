# ang net

> Mag-isyu ng mga kahilingan ng HTTP/HTTPS gamit ang natural na networking library ng Chromium

Ang proseso: [Main](../glossary.md#main-process)

Ang modyul ng `net` ay isang client-side API para sa pag-i-isyu ng mga kahilingan ng HTTP(S). Ito ay katulad sa [HTTP](https://nodejs.org/api/http.html) at [HTTPS](https://nodejs.org/api/https.html) na mga modyul ng Node.js ngunit gumagamit ng sinaunang networking library ng Chromium sa halip na ang implementasyon ng Node.js, na nagbibigay ng magandang suporta para sa mga proksi ng web.

Ang mga sumusunod ay isang hindi kompletong listahan ng kung bakit mo isinaalang-alang na gamitin ang modyul ng `net` sa halip na ang mga sinaunang modyul ng Node.js:

* Automatic management of system proxy configuration, support of the wpad protocol and proxy pac configuration files.
* Automatic tunneling of HTTPS requests.
* Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
* Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

The `net` module API has been specifically designed to mimic, as closely as possible, the familiar Node.js API. The API components including classes, methods, properties and event names are similar to those commonly used in Node.js.

For instance, the following example quickly shows how the `net` API might be used:

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

By the way, it is almost identical to how you would normally use the [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) modules of Node.js

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Pamamaraan

The `net` module has the following methods:

### `net.request(options)`

* `options` (Object | String) - The `ClientRequest` constructor options.

Returns [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.