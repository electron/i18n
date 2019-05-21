# ipcMain

> Ana süreçten işleyici süreçlerine zaman uyumsuz olarak iletişim kurun.

İşlem: [Ana](../glossary.md#main-process)

`ipcMain` modülü [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) sınıfının bir örneğini teşkil eder. Ana işlem tarafından kullanıldığında eş zamansız işlemleri gerçekleştirir ve işleme sürecinden (web sayfası) senkronizasyon bilgisi alır. Bir işleyiciden gönderilecek mesajlar bu modüle yayılacaktır.

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
* `listener` Function

`listener` ile yeni bir mesaj geldiğinde `listener(event, args...)` ile çağırabilir. `channel`' ı dinler.

### `ipcMain.once(kanal, dinleyici)`

* `channel` Dizesi
* `listener` fonksiyon

Olay için bir kerelik `listener` işlevi eklenir. Bu `listener` yalnızca bir mesajın `channel` adresine gönderilmesinden sonra kaldırılır.

### `ipcMain.removeListener(kanal, dinleyici)`

* `channel` Dizesi
* `listener` Function

Belirtilen `channel` öğesini belirtilen `listener` dizisinden kaldırır.

### `ipcMain.removeAllListeners([kanal])`

* `channel` Dizesi

Belirtilen `kanalın` dinleyicilerini kaldırır.

## Etkinlik objesi

`geri çağırma`'ya iletilen `olay` nesnesi aşağıdaki yöntemleri içerir:

### `event.frameId`

An `Integer` representing the ID of the renderer frame that sent this message.

### `event.returnValue`

Bunu, zaman uyumlu bir mesajda iade edilecek değere ayarlayınız.

### `event.sender`

İletiyi gönderen `webContents` değerini döndürür, eşzamansız iletiyi yanıtlamak için `event.sender.send`' i arayabilir, daha fazla bilgi için [webContents.send](web-contents.md#contentssendchannel-arg1-arg2-)' e bakabilirsiniz.

### `event.reply`

A function that will send an IPC message to the renderer frane that sent the original message that you are currently handling. You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.