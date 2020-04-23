# ağ

> Chromium'un yerel ağ kütüphanesini kullanarak HTTP/HTTPS isteklerini yayınla

İşlem: [Ana](../glossary.md#main-process)

`net` modülü HTTP(S) isteklerinin verilmesi için bir istemci tarafı olan API' dır. Node.js'nin [HTTP](https://nodejs.org/api/http.html) ve [HTTPS](https://nodejs.org/api/https.html) modüllerine benzer fakat web proxy'leri için daha iyi desteklenen Node.js uygulaması yerine Chromium'un yerel ağ kitaplığını kullanır.

Aşağıdaki neden yerel Node.js modülleri yerine `ağ` modülünü kullanmayı düşünebileceğinizin ayrıntılı olmayan bir listesidir:

* Sistem proxy yapılandırmasının otomatik yönetimi, wpad protokolü ve proxy pac yapılandırma dosyalarının desteği.
* HTTPS isteklerine otomatik tünel açılması.
* Temel, Özet, NTLM, Kerberos yada kimlik doğrulama düzenleri şeması kullanan kimlik doğrulama proxy sunucuları için destek.
* Trafik izleme Proxy' leri için destek: Fiddler - erişim kontrolü ve izleme için kullanılan proxylere benzer.

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

## Yöntemler

`ağ` modülü aşağıdaki yöntemleri içerir:

### `net.request(options)`

* `options` (Obje| Dizi) - `ClientRequest` Yapıcı seçenekleri.

Çevir [`ClientRequest`](./client-request.md)

Verilen `options` kullanarak direkt `ClientRequest` yapıcısına iletilen bir [`ClientRequest`](./client-request.md) örneği oluşturur. `net.request` yöntemi, `options` nesnesinde belirtilen kurallar güvenli ve güvensiz HTTP isteklerini vermek için kullanılır.
