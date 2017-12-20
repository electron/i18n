## Kelas: Debugger

> Transport alternatif untuk protokol debugging jarak jauh Chrome.

Proses:  Utama </ 0></p> 

Alat Pengembang Chrome memiliki  pengikatan khusus </ 0> yang tersedia pada runtime JavaScript yang memungkinkan berinteraksi dengan halaman dan menginstruksikannya.</p> 

```javascript
const {BrowserWindow} = require ('elektron') nyalakan = baru BrowserWindow () mencoba {win.webContents.debugger.attach ('1.1')} ha (err) {console.log ('Debugger melampirkan gagal:', err )} win.webContents.debugger.on ('hapus' (acara, alasan) = & gt; {console.log ('Debugger yang tertutup karena:', alasan)}) win.webContents.debugger.on ('pesan' acara, metode, params) = & gt; {jika (metode === 'Network.requestWillBeSent') {jika (params.request.url === 'https://www.github.com') {win.webContents. debugger.detach ()}}}) win.webContents.debugger.sendCommand ('Network.enable')
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

<h4><code>debugger.sendCommand(method[, commandParams, callback])`</h4> 
  
  * `method` String - Method name, should be one of the methods defined by the remote debugging protocol.
  * `commandParams` Object (optional) - JSON object with request parameters.
  * `callback` Function (optional) - Response 
    * `error` Object - Error message indicating the failure of the command.
    * `result` Any - Response defined by the 'returns' attribute of the command description in the remote debugging protocol.
  
  Send given command to the debugging target.
  
  ### Instance Events
  
  #### Event: 'detach'
  
  * ` event </ 0>  Acara</li>
<li><code>reason` String - Reason for detaching debugger.
  
  Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.
  
  #### Event: 'message'
  
  * ` event </ 0>  Acara</li>
<li><code>method` String - Method name.
  * `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.
  
  Emitted whenever debugging target issues instrumentation event.