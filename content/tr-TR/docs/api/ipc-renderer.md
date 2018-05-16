# ipcRenderer

> Zaman uyumsuz bir biçimde bir işleyici işleminden ana işlemle iletişim kurun.

İşlem: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` modülü [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) sınıfının bir ürünüdür. İşleme sürecinden (web sayfası) senkron ve asenkron mesajlar gönderebilmeniz için birkaç yöntem sağlar. Ayrıca ana kesimden gelen cevapları alabilirsiniz.

Kod örnekleri için [ipcMain](ipc-main.md)' e bakın.

## Yöntemler

`ipcRenderer` modülü olayları dinlemek ve mesaj göndermek için aşağıdaki yöntemi içerir:

### `ipcRenderer.on(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksiyon

`listener` ile yeni bir mesaj geldiğinde `listener(event, args...)` ile çağırabilir. `channel`' ı dinler.

### `ipcRenderer.once(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksiyon

Olay için bir kerelik `listener` işlevi eklenir. Bu `listener` yalnızca bir mesajın `channel` adresine gönderilmesinden sonra kaldırılır.

### `ipcRenderer.removeListener(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksiyon

Belirtilen `listener` öğesini `channel` öğesi için kaldırır.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` Dizesi

Tüm dinleyicileri kaldırır veya `channel` dizesini kaldırır.

### `ipcRenderer.send(channel[, arguman1][, arguman2][, ...])`

* `channel` Dizesi
* `...args` any[]

`channel` üzerinden ana işleme asenkron olarak mesaj ve keyfi argümanlar gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

`any` - [`ipcMain`](ipc-main.md) İşleyicisi tarafından geri gönderilen değeri gösterir.

Ana işleme `channel` içinden senkronlu mesaj gönder, ayrıca matematiksel kuram gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Note:** Senkronize bir ileti göndermek, eğer ne yaptığınızı bilmiyorsanız kullanamayacağınız sürece tüm işleyici işlemini engeller.

### `ipcRenderer.sendTo(windowId, channel, [, arg1][, arg2][, ...])`

* `windowId` Number
* `channel` Dizesi
* `...args` any[]

Sends a message to a window with `windowid` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` any[]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.