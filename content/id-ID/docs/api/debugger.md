## Kelas: Debugger

> Transport alternatif untuk protokol debugging jarak jauh Chrome.

Proses: [Main](../glossary.md#main-process)

Chrome Developer Tools has a [special binding](https://chromedevtools.github.io/devtools-protocol/) available at JavaScript runtime that allows interacting with pages and instrumenting them.

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

### Metode Instance

#### `debugger.melmpirkan ( [protocolVersion] )`

* ` protocolVersion </ 0>  String (opsional) - Versi protokol debug yang diminta</li>
</ul>

<p>Atasi debugger ke <code>isi web </ 0> .</p>

<h4><code>debugger.adalah terlampir()`</h4> 
  Mengembalikan ` Boolean </ 0> - Apakah debugger terpasang ke <code>isi web </ 0> .</p>

<h4><code>debugger.melepaskan ()`</h4> 
  
  Lepaskan debugger dari `isi web </ 0> .</p>

<h4><code>debugger.kirim perintah (metode [, perintah Params, panggil kembali])`</h4> 
  
  * `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
  * ` perintah Params </ 0> Objek (opsional) - Objek JSON dengan parameter permintaan.</li>
<li><code>callback` Fungsi (opsional) - Respon 
    * ` kesalahan</ 0> Objek - Pesan kesalahan yang menunjukkan kegagalan perintah.</li>
<li><code> mengulang </ 0> Setiap - Respon yang didefinisikan oleh atribut 'kembali' dari
  deskripsi perintah dalam protokol debugging jarak jauh.</li>
</ul></li>
</ul>

<p>Kirim perintah yang diberikan ke target debugging.</p>

<p><strong><a href="promisification.md">Deprecated Soon</a></strong></p>

<h4><code>debugger.sendCommand(method[, commandParams])`</h4> 
      * `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).
      * ` perintah Params </ 0> Objek (opsional) - Objek JSON dengan parameter permintaan.</li>
</ul>

<p>Returns <code>Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.</p> 
        Kirim perintah yang diberikan ke target debugging.
        
        ### Perihal contoh
        
        #### Event: 'detach'
        
        * `event</ 0> Acara</li>
<li><code>reason` String - Reason for detaching debugger.
        
        Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.
        
        #### Event: 'message'
        
        * `event` Sinyal
        * `method` String - Method name.
        * `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
        
        Emitted whenever debugging target issues instrumentation event.