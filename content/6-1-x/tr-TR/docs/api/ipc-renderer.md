# ipcRenderer

> Zaman uyumsuz bir biçimde bir işleyici işleminden ana işlemle iletişim kurun.

İşlem: [Renderer](../glossary.md#renderer-process)

`ipcRenderer` modülü [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) sınıfının bir ürünüdür. İşleme sürecinden (web sayfası) senkron ve asenkron mesajlar gönderebilmeniz için birkaç yöntem sağlar. Ayrıca ana kesimden gelen cevapları alabilirsiniz.

Kod örnekleri için [ipcMain](ipc-main.md)' e bakın.

## Yöntemler

`ipcRenderer` modülü olayları dinlemek ve mesaj göndermek için aşağıdaki yöntemi içerir:

### `ipcRenderer.on(kanal, dinleyici)`

* `channel` Dizesi
* `listener` fonksiyon
  * `event` IpcRendererEvent
  * `...args` herhangi[]

`listener` ile yeni bir mesaj geldiğinde `listener(event, args...)` ile çağırabilir. `channel`' ı dinler.

### `ipcRenderer.once(kanal, dinleyici)`

* `channel` Dizesi
* `listener` fonksiyon
  * `event` IpcRendererEvent
  * `...args` herhangi[]

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### `ipcRenderer.removeListener(kanal, dinleyici)`

* `channel` Dizesi
* `listener` fonksiyon

Belirtilen `channel` öğesini belirtilen `listener` dizisinden kaldırır.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` Dizesi

Tüm dinleyicileri kaldırır veya `channel` dizesini kaldırır.

### `ipcRenderer.send(kanal[, arguman1][, arguman2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

`channel` üzerinden ana işleme asenkron olarak mesaj ve keyfi argümanlar gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.sendSync(channel[, arguman1][, arguman2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

`any` - [`ipcMain`](ipc-main.md) İşleyicisi tarafından geri gönderilen değeri gösterir.

Ana işleme `channel` içinden senkronlu mesaj gönder, ayrıca matematiksel kuram gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Note:** Senkronize bir ileti göndermek, eğer ne yaptığınızı bilmiyorsanız kullanamayacağınız sürece tüm işleyici işlemini engeller.

### `ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])`

* `webContentsId` Number
* `channel` Dizesi
* `...args` herhangi[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`

* `channel` Dizesi
* `...args` herhangi[]

`ipcRenderer.send` gibi ancak olay ana işlem yerine ana sayfadaki `<webview>` öğesine gönderilecektir.

## Etkinlik objesi

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.
