## Sınıf: Hata ayıklayıcı

> Chrome'un uzaktan hata ayıklama protokolü içın alternatif bir geçiş noktası.

Süreç: [Ana](../glossary.md#main-process)

Chrome Geliştirici Araçları'nın Javascript çalışma anında sayfalarla etkileşime geçme ve yönetmek üzerine [özel bir kütüphanesi](https://chromedevtools.github.io/devtools-protocol/) var.

```javascript
const { BrowserWindow } = require('electron')
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

### Örnek Events

#### Etkinlik: 'ayırmak'

Dönüşler:

* `event` Event
* `reason` String - Hata ayıklayıcıyı ayırma nedeniniz.

Emitted when the debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### Etkinlik: 'mesaj'

Dönüşler:

* `event` Event
* `method` String - Yöntem adı.
* `params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever the debugging target issues an instrumentation event.

### Örnek yöntemleri

#### `debugger.attach([protocolVersion])`

* `protocolVersion` Dizi (İsteğe Bağlı) - Talep edilen ayıklama protokolü sürümü.

`webContents` Hata ayıklayıcı.

#### `debugger.isAttached()`

`Boolean` - `webContents` ' ne bir hata ayıklayıcı eklenik eklenmediğini gösterir.

#### `debugger.detach()`

Hata ayıklayıcıyı `web İçerikleri`nden ayırır.

#### `debugger.sendCommand(method[, commandParams])`

* `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
* `commandParams` any (optional) - JSON object with request parameters.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Verilen komutu hata ayıklama hedefine gönderin.
