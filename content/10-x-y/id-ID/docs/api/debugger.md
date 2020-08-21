## Kelas: Debugger

> Transport alternatif untuk protokol debugging jarak jauh Chrome.

Proses: [Main](../glossary.md#main-process)

Alat Pengembang Chrome memiliki

 pengikatan khusus </ 0> yang tersedia pada runtime JavaScript yang memungkinkan berinteraksi dengan halaman dan menginstruksikannya.</p> 



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




### Contoh peristiwa



#### Acara : 'melepaskan'

Pengembalian:

* `event` Event
* ` alasan </ 0>  String - Alasan untuk memisahkan debugger.</li>
</ul>

<p spaces-before="0">Emitted when the debugging session is terminated. This happens either when
<code>webContents` is closed or devtools is invoked for the attached `webContents`.</p> 

#### Acara : 'pesan'

Pengembalian:

* `event` Sinyal
* ` metode </ 0> String - nama metode.</li>
<li><p spaces-before="0"><code>params` any - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.</p>
* `sessionId` String - Unique identifier of attached debugging session, will match the value sent from `debugger.sendCommand`.

Emitted whenever the debugging target issues an instrumentation event.



### Metode Instance



#### `debugger.melmpirkan ( [protocolVersion] )`

* ` protocolVersion </ 0>  String (opsional) - Versi protokol debug yang diminta</li>
</ul>

<p spaces-before="0">Atasi debugger ke <code>isi web </ 0> .</p>

<h4 spaces-before="0"><code>debugger.adalah terlampir()`</h4> 
  Mengembalikan ` Boolean </ 0> - Apakah debugger terpasang ke <code>isi web </ 0> .</p>

<h4 spaces-before="0"><code>debugger.melepaskan ()`</h4> 
  
  Lepaskan debugger dari `isi web </ 0> .</p>

<h4 spaces-before="0"><code>debugger.sendCommand(method[, commandParams, sessionId])`</h4> 
  
  * `method` String - Method name, should be one of the methods defined by the [remote debugging protocol][rdp].

* `commandParams` any (optional) - JSON object with request parameters.

* `sessionId` String (optional) - send command to the target with associated debugging session id. The initial value can be obtained by sending [Target.attachToTarget][attachToTarget] message.

Returns `Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.

Kirim perintah yang diberikan ke target debugging.

[rdp]: https://chromedevtools.github.io/devtools-protocol/

[attachToTarget]: https://chromedevtools.github.io/devtools-protocol/tot/Target/#method-attachToTarget
