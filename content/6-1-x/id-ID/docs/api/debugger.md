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




### Методы экземпляра



#### `debugger.melmpirkan ( [protocolVersion] )`

* ` protocolVersion </ 0>  String (opsional) - Versi protokol debug yang diminta</li>
</ul>

<p spaces-before="0">Atasi debugger ke <code>isi web </ 0> .</p>

<h4 spaces-before="0"><code>debugger.adalah terlampir()`</h4> 
  Mengembalikan ` Boolean </ 0> - Apakah debugger terpasang ke <code>isi web </ 0> .</p>

<h4 spaces-before="0"><code>debugger.melepaskan ()`</h4> 
  
  Lepaskan debugger dari `isi web </ 0> .</p>

<h4 spaces-before="0"><code>debugger.kirim perintah (metode [, perintah Params, panggil kembali])`</h4> 
  
  * `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).

* ` perintah Params </ 0> Objek (opsional) - Objek JSON dengan parameter permintaan.</p></li>
<li><code>callback` Function (optional) - Response 
  
    * ` kesalahan</ 0> Objek - Pesan kesalahan yang menunjukkan kegagalan perintah.</li>
<li><code> mengulang </ 0> Setiap - Respon yang didefinisikan oleh atribut 'kembali' dari
  deskripsi perintah dalam protokol debugging jarak jauh.</li>
</ul></li>
</ul>

<p spaces-before="0">Kirim perintah yang diberikan ke target debugging.</p>

<p spaces-before="0"><strong x-id="1"><a href="modernization/promisification.md">Deprecated Soon</a></strong></p>

<h4 spaces-before="0"><code>debugger.sendCommand(method[, commandParams])`</h4> 
    * `method` String - Method name, should be one of the methods defined by the [remote debugging protocol](https://chromedevtools.github.io/devtools-protocol/).

* ` perintah Params </ 0> Objek (opsional) - Objek JSON dengan parameter permintaan.</p></li>
</ul>

<p spaces-before="0">Returns <code>Promise<any>` - A promise that resolves with the response defined by the 'returns' attribute of the command description in the remote debugging protocol or is rejected indicating the failure of the command.
  
  Kirim perintah yang diberikan ke target debugging.
  
  

### Contoh peristiwa



#### Acara : 'melepaskan'

* `event</ 0> Acara</li>
<li><code> alasan </ 0>  String - Alasan untuk memisahkan debugger.</li>
</ul>

<p spaces-before="0">Emitted when debugging session is terminated. This happens either when
<code>webContents` is closed or devtools is invoked for the attached `webContents`.</p> 

#### Acara : 'pesan'

* `acara` Acara
*  metode </ 0> String - nama metode.</li>
<li><code> params </ 0> Objek - Parameter acara ditentukan oleh  atribut 'parameter'
 dalam protokol debugging jarak jauh.</li>
</ul>

<p spaces-before="0">Emitted kapanpun terjadi debugging sasaran soal acara instrumentasi .</p>
