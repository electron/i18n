# ağ

> Chromium'un yerel ağ kütüphanesini kullanarak HTTP/HTTPS isteklerini yayınla

Süreç: [Ana](../glossary.md#main-process)

`net` modülü HTTP(S) isteklerinin verilmesi için bir istemci tarafı olan API' dır. Node.js'nin [HTTP](https://nodejs.org/api/http.html) ve [HTTPS](https://nodejs.org/api/https.html) modüllerine benzer fakat web proxy'leri için daha iyi desteklenen Node.js uygulaması yerine Chromium'un yerel ağ kitaplığını kullanır.

Aşağıdaki neden yerel Node.js modülleri yerine `ağ` modülünü kullanmayı düşünebileceğinizin ayrıntılı olmayan bir listesidir:

* Sistem proxy yapılandırmasının otomatik yönetimi, wpad protokolü ve proxy pac yapılandırma dosyalarının desteği.
* HTTPS isteklerine otomatik tünel açılması.
* Temel, Özet, NTLM, Kerberos yada kimlik doğrulama düzenleri şeması kullanan kimlik doğrulama proxy sunucuları için destek.
* Trafik izleme Proxy' leri için destek: Fiddler - erişim kontrolü ve izleme için kullanılan proxylere benzer.

`net` API modulü Node.js API modülünü birebir taklit edebilmek için özel olarak tasarlanmıştır. Sınıflar, yöntemler, özellikler ve olay adlarını içeren API bileşenleri genellikle Node.Js' dekilerle benzer özelliklere sahiptir.

Mesela, sıradaki örnek `ağ` API kullanımı hakkında hızlıca bilgi verir:

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

Bu arada, [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) neredeyse Node.js modüllerinin kullanım şekli ile neredeyse aynı

`net` API uygulaması sadece `ready` yayınlandıktan sonra kullanılabilir. `ready` yayınlanmadan kullanmaya çalışmak hata verir.

## Metodlar

`ağ` modülü aşağıdaki yöntemleri içerir:

### `net.request(options)`

* `options` (Obje| Dizi) - `ClientRequest` Yapıcı seçenekleri.

Çevir [`ClientRequest`](./client-request.md)

Verilen `options` kullanarak direkt `ClientRequest` yapıcısına iletilen bir [`ClientRequest`](./client-request.md) örneği oluşturur. `net.request` yöntemi, `options` nesnesinde belirtilen kurallar güvenli ve güvensiz HTTP isteklerini vermek için kullanılır.