# ang net

> Mag-isyu ng mga kahilingan ng HTTP/HTTPS gamit ang natural na networking library ng Chromium

Ang proseso: [Main](../glossary.md#main-process)

Ang modyul ng `net` ay isang client-side API para sa pag-i-isyu ng mga kahilingan ng HTTP(S). Ito ay katulad sa [HTTP](https://nodejs.org/api/http.html) at [HTTPS](https://nodejs.org/api/https.html) na mga modyul ng Node.js ngunit gumagamit ng sinaunang networking library ng Chromium sa halip na ang implementasyon ng Node.js, na nagbibigay ng magandang suporta para sa mga proksi ng web.

Ang mga sumusunod ay isang hindi kompletong listahan ng kung bakit mo isinaalang-alang na gamitin ang modyul ng `net` sa halip na ang mga sinaunang modyul ng Node.js:

* Awtomatikong pamamahala ng pagsasaayos ng mga proksi ng sistema, suporta ng protocol ng wpad at pagsasaayos ng mga file ng proxy pac.
* Awtomatikong pag ta-tunnel ng mga kahilingan ng HTTPS.
* Suporta para sa pagpapatunay sa mga proksi gamit ang basic, digest, NTLM, Kerberos o makipag-ayos sa mga pamamaraan ng pagpapatunay.
* Suporta para sa mga proksi na nagmo-monitor ng trapik: Ang mga proksi na katulad ng fiddler ang ginamit para ma-access ang pagkontrol at pagmo-monitor.

Ang modyul ng API ng `net` ay partikular na dinisenyo para gayahin, ng mas malapit hangga,t maaari, sa API ng pamilyar na Node.js. Ang mga bahagi ng API kabilang ang mga uri, mga pamamaraan, mga katangian at mga pangalan ng event ay kapareho sa mga laging ginagamit sa Node.js.

Halimbawa, ang mga sumusunod nahalimbawa ay mabilis na nagpapakita kung papaano na ang API ng `net` ay maaaring gamitin:

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

Siyanga pala, ito ay halos magkakatulad kung papaanong normal mong gagamitin ang mga modyul ng [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) ng Node.js

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Pamamaraan

The `net` module has the following methods:

### `net.request(options)`

* `options` (Object | String) - The `ClientRequest` constructor options.

Returns [`ClientRequest`](./client-request.md)

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.