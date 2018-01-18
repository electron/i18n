# ipcRenderer

> Zaman uyumsuz bir biçimde bir işleyici işleminden ana işlemle iletişim kurun.

İşlem: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` modülü [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) sınıfının bir ürünüdür. İşleme sürecinden (web sayfası) senkron ve asenkron mesajlar gönderebilmeniz için birkaç yöntem sağlar. Ayrıca ana kesimden gelen cevapları alabilirsiniz.

Kod örnekleri için [ipcMain](ipc-main.md)' e bakın.

## Metodlar

`ipcRenderer` modülü olayları dinlemek ve mesaj göndermek için aşağıdaki yöntemi içerir:

### `ipcRenderer.on(channel, listener)`

* `channel` Dizesi
* `listener` fonksiyon

`listener` ile yeni bir mesaj geldiğinde `listener(event, args...)` ile çağırabilir. `channel`' ı dinler.

### `ipcRenderer.once(channel, listener)`

* `channel` Dizesi
* `listener` Fonksiyon

Olay için bir kerelik `listener` işlevi eklenir. Bu `listener` yalnızca bir mesajın `channel` adresine gönderilmesinden sonra kaldırılır.

### `ipcRenderer.removeListener(channel, listener)`

* `channel` Dizesi
* `listener` Fonksiyon

Belirtilen `channel` öğesini belirtilen `listener` dizisinden kaldırır.

### `ipcRenderer.removeAllListeners([channel])`

* `channel` dizi (isteğe bağlı)

Tüm dinleyicileri kaldırır veya `channel` dizesini kaldırır.

### `ipcRenderer.send(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

`channel` üzerinden ana işleme asenkron olarak mesaj ve keyfi argümanlar gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

Ana işlem `channel` ile `ipcMain` modülünü dinleyerek işleme koyar.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

`any` - [`ipcMain`](ipc-main.md) İşleyicisi tarafından geri gönderilen değeri gösterir.

Ana işleme `channel` içinden senkronlu mesaj gönder, ayrıca matematiksel kuram gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

Ana işlem `channel` öğesini `ipcMain` modülüyle birlikte ve `event.returnValue` ayarını yanıtlayarak işleme alır.

**Note:** Senkronize bir ileti göndermek, eğer ne yaptığınızı bilmiyorsanız kullanamayacağınız sürece tüm işleyici işlemini engeller.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` any[]

`ipcRenderer.send` gibi ancak olay ana işlem yerine ana sayfadaki `<webview>` öğesine gönderilecektir.