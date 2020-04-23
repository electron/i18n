# ang net

> Mag-isyu ng mga kahilingan ng HTTP/HTTPS gamit ang natural na networking library ng Chromium

Proseso:[Pangunahi](../glossary.md#main-process)

Ang modyul ng `net` ay isang client-side API para sa pag-i-isyu ng mga kahilingan ng HTTP(S). Ito ay katulad sa [HTTP](https://nodejs.org/api/http.html) at [HTTPS](https://nodejs.org/api/https.html) na mga modyul ng Node.js ngunit gumagamit ng sinaunang networking library ng Chromium sa halip na ang implementasyon ng Node.js, na nagbibigay ng magandang suporta para sa mga proksi ng web.

Ang mga sumusunod ay isang hindi kompletong listahan ng kung bakit mo isinaalang-alang na gamitin ang modyul ng `net` sa halip na ang mga sinaunang modyul ng Node.js:

* Awtomatikong pamamahala ng pagsasaayos ng mga proksi ng sistema, suporta ng protocol ng wpad at pagsasaayos ng mga file ng proxy pac.
* Awtomatikong pag ta-tunnel ng mga kahilingan ng HTTPS.
* Suporta para sa pagpapatunay sa mga proksi gamit ang basic, digest, NTLM, Kerberos o makipag-ayos sa mga pamamaraan ng pagpapatunay.
* Suporta para sa mga proksi na nagmo-monitor ng trapik: Ang mga proksi na katulad ng fiddler ang ginamit para ma-access ang pagkontrol at pagmo-monitor.

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

## Mga Paraan

Ang modyul ng `net` ay mayroong mga sumusunod na mga pamamaraan:

### `ang net.request(mga opsyon)`

* `options` (Object | String) - Ang mga opsyon ng tagapagbuo ng `ClientRequest`.

Ang nagbabalik na [`ClientRequest`](./client-request.md)

Lumilikha ng isang instansya sa [`ClientRequest`](./client-request.md) na ginagamit ang ibinigay na `options` kung saan ay direktang ipapasa sa tagapagbuo ng `ClientRequest`. Ang pamamaraan ng `net.request` ay maaaring gamitin para mag-isyu ng kapwa ligtas at hindi ligtas na mga kahilingan ng HTTP ayon sa tinukoy na pamamaraan ng protocol sa mga bagay ng `options`.
