# ipcMain

> Ana süreçten işleyici süreçlerine zaman uyumsuz olarak iletişim kurun.

İşlem: [Ana](../glossary.md#main-process)

The `ipcMain` module is an [Event Emitter](https://nodejs.org/api/events.html#events_class_eventemitter). Ana işlem tarafından kullanıldığında eş zamansız işlemleri gerçekleştirir ve işleme sürecinden (web sayfası) senkronizasyon bilgisi alır. Bir işleyiciden gönderilecek mesajlar bu modüle yayılacaktır.

## Mesaj gönderiliyor

Ana işlemden yan işleme mesaj göndermek mümkündür, daha fazla bilgi için [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-) komutuna bakınız.

* Bir mesaj gönderirken, etkinlik adı `channel`.
* Eşzamanlı bir mesaja cevap vermek için, `event.returnValue`yi ayarlamak gereklidir.
* To send an asynchronous message back to the sender, you can use `event.reply(...)`. This helper method will automatically handle messages coming from frames that aren't the main frame (e.g. iframes) whereas `event.sender.send(...)` will always send to the main frame.

İşleyici ve ana işlemler arasında mesaj gönderme ve işleme ilişkin bir örneği:

```javascript
// Ana süreç içinde.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
})
```

```javascript
// Oluşturucu işleminde (web sayfası).
const { ipcRenderer } = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

## Metodlar

`ipcMain` modülü olayları dinlemek için aşağıdaki yöntemi içerir:

### `ipcMain.on(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksyion 
  * `event` IpcMainEvent
  * `...args` herhangi[]

`listener` ile yeni bir mesaj geldiğinde `listener(event, args...)` ile çağırabilir. `channel`' ı dinler.

### `ipcMain.once(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Fonksiyon 
  * `event` IpcMainEvent
  * `...args` herhangi[]

Olay için bir kerelik `listener` işlevi eklenir. Bu `listener` yalnızca bir mesajın `channel` adresine gönderilmesinden sonra kaldırılır.

### `ipcMain.removeListener(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Function 
  * `...args` herhangi[]

Belirtilen `channel` öğesini belirtilen `listener` dizisinden kaldırır.

### `ipcMain.removeAllListeners([kanal])`

* `channel` dizi (isteğe bağlı)

Belirtilen `kanalın` dinleyicilerini kaldırır.

### `ipcMain.handle(channel, listener)`

* `channel` Dizesi
* `listener` Function<Promise<void> | any> 
  * `event` IpcMainInvokeEvent
  * `...args` herhangi[]

Adds a handler for an `invoke`able IPC. This handler will be called whenever a renderer calls `ipcRenderer.invoke(channel, ...args)`.

If `listener` returns a Promise, the eventual result of the promise will be returned as a reply to the remote caller. Otherwise, the return value of the listener will be used as the value of the reply.

```js
// Main process
ipcMain.handle('my-invokable-ipc', async (event, ...args) => {
  const result = await somePromise(...args)
  return result
})

// Renderer process
async () => {
  const result = await ipcRenderer.invoke('my-invokable-ipc', arg1, arg2)
  // ...
}
```

The `event` that is passed as the first argument to the handler is the same as that passed to a regular event listener. It includes information about which WebContents is the source of the invoke request.

### `ipcMain.handleOnce(channel, listener)`

* `channel` Dizesi
* `listener` Function<Promise<void> | any> 
  * `event` IpcMainInvokeEvent
  * `...args` herhangi[]

Handles a single `invoke`able IPC message, then removes the listener. See `ipcMain.handle(channel, listener)`.

### `ipcMain.removeHandler(channel)`

* `channel` Dizesi

Removes any handler for `channel`, if present.

## IpcMainEvent object

The documentation for the `event` object passed to the `callback` can be found in the [`ipc-main-event`](structures/ipc-main-event.md) structure docs.

## IpcMainInvokeEvent object

The documentation for the `event` object passed to `handle` callbacks can be found in the [`ipc-main-invoke-event`](structures/ipc-main-invoke-event.md) structure docs.