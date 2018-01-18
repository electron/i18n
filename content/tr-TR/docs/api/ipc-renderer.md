# ipcRenderer

> Communicate asynchronously from a renderer process to the main process.

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

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with `ipcMain` module.

### `ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

Returns `any` - The value sent back by the [`ipcMain`](ipc-main.md) handler.

Ana işleme `channel` içinden senkronlu mesaj gönder, ayrıca matematiksel kuram gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with `ipcMain` module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` any[]

`ipcRenderer.send` gibi ancak olay ana işlem yerine ana sayfadaki `<webview>` öğesine gönderilecektir.