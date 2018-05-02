## Sınıf: Hata ayıklayıcı

> Chrome'un uzaktan hata ayıklama protokolü içın alternatif bir geçiş noktası.

Süreç: [Ana](../glossary.md#main-process)

Chrome Geliştirici Araçları'nın Javascript çalışma anında sayfalarla etkileşime geçme ve yönetmek üzerine [özel bir kütüphanesi](https://developer.chrome.com/devtools/docs/debugger-protocol) var.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()

try {
  win.webContents.debugger.attach('1.1')
} catch (err) {
  console.log('Debugger attach failed : ', err)
}

win.webContents.debugger.on('detach', (event, reason) => {
  console.log('Debugger detached due to : ', reason)
})

win.webContents.debugger.on('message', (event, method, params) => {
  if (method === 'Network.requestWillBeSent') {
    if (params.request.url === 'https://www.github.com') {
      win.webContents.debugger.detach()
    }
  }
})

win.webContents.debugger.sendCommand('Network.enable')
```

### Örnek yöntemleri

#### `debugger.attach([protocolVersion])`

* `protocolVersion` Dizi (İsteğe Bağlı) - Talep edilen ayıklama protokolü sürümü.

`webContents` Hata ayıklayıcı.

#### `debugger.isAttached()`

`Boolean` - `webContents` ' ne bir hata ayıklayıcı eklenik eklenmediğini gösterir.

#### `debugger.detach()`

Hata ayıklayıcıyı `web İçerikleri`nden ayırır.

#### `debugger.sendCommand(method[, commandParams, callback])`

* `method` Dizi - Yöntem Adı, uzaktan hata ayıklama protokolü tarafından belirlenen yöntemlerden biri olmalıdır.
* `commandParams` nesne (isteğe bağlı) - İstenilen parametrelerle JSON nesnesi.
* `geri aramak` İşlev (opsiyonel) - Yanıt 
  * `error` Nesne - Komutun Başarısız olduğunu gösteren hata mesajı.
  * `result` Herhangi - Uzaktan Hata Ayıklama protokolünde komut açıklamasının "returns" özelliğiyle tanımlanan tepki.

Verilen komutu hata ayıklama hedefine gönderin.

### Örnek etkinlikler

#### Etkinlik: 'ayırmak'

* `event` Olay
* `reason` String - Hata ayıklayıcıyı ayırma nedeniniz.

Hata ayıklama oturumu sona erdiğinde yayan. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Etkinlik: 'mesaj'

* `event` Olay
* `method` String - Yöntem adı.
* `params` Object - Olay parametreleri 'parametreler' özniteliği uzaktan hata ayıklama protokolünde.

Hata ayıklama hedeflemesi enstrümantasyon olayında her zaman ortaya çıkar.