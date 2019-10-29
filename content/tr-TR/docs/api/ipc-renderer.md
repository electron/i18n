# ipcRenderer

> Zaman uyumsuz bir biçimde bir işleyici işleminden ana işlemle iletişim kurun.

İşlem: [Renderer](../glossary.md#renderer-process)

The `ipcRenderer` module is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). İşleme sürecinden (web sayfası) senkron ve asenkron mesajlar gönderebilmeniz için birkaç yöntem sağlar. Ayrıca ana kesimden gelen cevapları alabilirsiniz.

Kod örnekleri için [ipcMain](ipc-main.md)' e bakın.

## Yöntemler

`ipcRenderer` modülü olayları dinlemek ve mesaj göndermek için aşağıdaki yöntemi içerir:

### `ipcRenderer.on(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Function 
  * `event` IpcRendererEvent
  * `...args` herhangi[]

`listener` ile yeni bir mesaj geldiğinde `listener(event, args...)` ile çağırabilir. `channel`' ı dinler.

### `ipcRenderer.once(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksyion 
  * `event` IpcRendererEvent
  * `...args` herhangi[]

Olay için bir kerelik `listener` işlevi eklenir. Bu `listener` yalnızca bir mesajın `channel` adresine gönderilmesinden sonra kaldırılır.

### `ipcRenderer.removeListener(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksiyon 
  * `...args` herhangi[]

Belirtilen `listener` öğesini `channel` öğesi için kaldırır.

### `ipcRenderer.removeAllListeners(channel)`

* `channel` Dizesi

Tüm dinleyicileri kaldırır veya `channel` dizesini kaldırır.

### `ipcRenderer.send(channel, ...args)`

* `channel` Dizesi
* `...args` any[]

`channel` üzerinden ana işleme asenkron olarak mesaj ve keyfi argümanlar gönderebilirsiniz. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with the [`ipcMain`](ipc-main.md) module.

### `ipcRenderer.invoke(channel, ...args)`

* `channel` Dizesi
* `...args` herhangi[]

Returns `Promise<any>` - Resolves with the response from the main process.

Send a message to the main process asynchronously via `channel` and expect an asynchronous result. Arguments will be serialized as JSON internally and hence no functions or prototype chain will be included.

The main process should listen for `channel` with [`ipcMain.handle()`](ipc-main.md#ipcmainhandlechannel-listener).

Örneğin:

```javascript
// Renderer process
ipcRenderer.invoke('some-name', someArgument).then((result) => {
  // ...
})

// Main process
ipcMain.handle('some-name', async (event, someArgument) => {
  const result = await doSomeWork(someArgument)
  return result
})
```

### `ipcRenderer.sendSync(channel, ...args)`

* `channel` Dizesi
* `...args` any[]

`any` - [`ipcMain`](ipc-main.md) İşleyicisi tarafından geri gönderilen değeri gösterir.

Ana işleme `channel` içinden senkronlu mesaj gönder, ayrıca matematiksel kuram gönderebilirsiniz. Bağımsız değişkenler dahili olarak JSON'da seri hale getirilecek ve dolayısıyla hiçbir işlev veya prototip zinciri dahil edilmeyecektir.

The main process handles it by listening for `channel` with [`ipcMain`](ipc-main.md) module, and replies by setting `event.returnValue`.

**Note:** Senkronize bir ileti göndermek, eğer ne yaptığınızı bilmiyorsanız kullanamayacağınız sürece tüm işleyici işlemini engeller.

### `ipcRenderer.sendTo(webContentsId, channel, ...args)`

* `webContentsId` Number
* `channel` Dizesi
* `...args` herhangi[]

Sends a message to a window with `webContentsId` via `channel`.

### `ipcRenderer.sendToHost(channel, ...args)`

* `channel` Dizesi
* `...args` herhangi[]

`ipcRenderer.send` gibi ancak olay ana işlem yerine ana sayfadaki `<webview>` öğesine gönderilecektir.

## Etkinlik objesi

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-renderer-event`](structures/ipc-renderer-event.md) structure docs.