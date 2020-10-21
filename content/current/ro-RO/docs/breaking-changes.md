# Ruperea modificărilor

Ruperea modificărilor va fi documentată aici, iar notificările dezaprobatoare adăugate în codul JavaScript unde e posibil, [cel puțin o versiune majoră](tutorial/electron-versioning.md#semver) înainte de a fi făcută modificarea.

### Tipuri de modificări de rupere

Acest document folosește următoarea convenție pentru a clasifica modificările de rupere:

- **API modificat:** Un API a fost modificat în așa fel încât codul care nu a fost actualizat este garantat pentru a arunca o excepție.
- **Comportament modificat:** Comportamentul Electron s-a schimbat, dar nu în așa fel încât o excepție va fi în mod necesar aruncată.
- **Modificat implicit:** Codul în funcție de vechea valoare implicită se poate rupe, nu în mod necesar aruncând o excepție. Comportamentul vechi poate fi restaurat prin specificarea explicită a valorii.
- **Dezaprobate:** Un API a fost marcat ca învechit. API-ul va continua să funcționeze, dar va emite un avertisment de descurajare și va fi eliminat într-o versiune viitoare.
- **Eliminat:** Un API sau o caracteristică a fost eliminată, și nu mai este suportată de Electron.

## Modificări Plănuite ale API(13.0)

### Eliminat: `shell.moveItemToTrash()`

API-ul deprecat sincronizat `shell.moveItemToTrash()` a fost eliminat. Utilizaţi în schimb `shell.trashItem()` asincron ` shell.trashItem(.</p>

<pre><code class="js">// Eliminat în Electron 13
shell.moveItemToTrash(path)
// Înlocuiește cu
shell.trashItem(path).then(/* ... */)
`</pre>

## Modificări Plănuite ale API(12.0)

### Eliminat: Suport Flash Piper

Cromul a eliminat suportul pentru Flash, așa că trebuie să îl urmăm. Vezi Foaia de parcurs Flash</a> a Chromium

pentru mai multe detalii .</p> 



### Implicit modificat: `contextIzolare` este implicit la `adevărat`

In Electron 12, `contextIsolation` will be enabled by default.  Pentru a restaura comportamentul anterior, `context Izolare: false` trebuie specificat în WebPreferences.

[recomandăm activarea contextIsolării](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) pentru securitatea aplicației tale.

Pentru mai multe detalii: https://github.com/electron/electron/issues/23506



### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

- `crashReporter.start`
- `crashReporter.getLastCrashRaport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.



### Implicit modificat: `crashReporter.start({ compress: true })`

Valoarea implicită a opțiunii `comprima` la `crashReporter.start` a schimbat de la `false` la `adevărat`. Asta înseamnă că crash dumps va fi încărcat pe serverul crash ingestion cu `Content-Encoding: gzip` header, iar corpul va fi comprimat.

Dacă serverul dvs. de ingestie a erorilor nu acceptă încărcături comprimate, poți dezactiva compresia prin specificarea opțiunilor `{ compress: false }` în reporterul de erori 



### Dezaprobate: `modul la distanță`

Modulul `remote` este învechit în Electron 12 și va fi eliminat în Electron 14. Acesta este înlocuit cu modulul [`@electron/remote`](https://github.com/electron/remote).



```js
// Dezaprobată în Electron 12:
const { BrowserWindow } = require('electron').remote
```




```js
// Înlocuiește cu:
const { BrowserWindow } = require('@electron/remote')

// În procesul principal:
require('@electron/remote/main').initialize()
```




### Dezaprobate: `shell.moveItemToTrash()`

Sincronul `shell.moveItemToTrash()` a fost înlocuit cu noul asincron `shell.trashItem()`.



```js
// Dezaprobată în Electron 12
shell.moveItemToTrash(path)
// Înlocuiește cu
shell.trashItem(path).then(/* ... */)
```




## Modificări Plănuite ale API(11.0)

Nu sunt schimbări de rupere planificate pentru 11.0.



## Modificări Plănuite ale API(10.0)



### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.



```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```




### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.



```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```




### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

- `crashReporter.start`
- `crashReporter.getLastCrashRaport`
- `crashReporter.getUploadedReports`
- `crashReporter.getUploadToServer`
- `crashReporter.setUploadToServer`
- `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.



### Dezaprobate: `crashReporter.start({ compress: false })`

Setarea `{ compress: false }` în `crashReporter.start` este învechită. Aproape toate serverele de ingestie crash suportă compresia gzip. Această opțiune va fi eliminată într-o versiune viitoare a Electron.



### Eliminat: Afinitate fereastră browser

Opțiunea `afinity` atunci când se construiește un nou `BrowserWindow` va fi eliminată ca parte a planului nostru pentru a se alinia mai îndeaproape cu modelul de proces Chromium pentru securitate, performanța și mentenabilitatea.

Pentru informații mai detaliate, a se vedea [#18397](https://github.com/electron/electron/issues/18397).



### Implicit modificat: `activeRemoeModulul` este implicit la `false`

În Electron 9, folosind modulul de la distanţă fără să îl activaţi în mod explicit prin intermediul `ActiveRemoteModule` opţiunea WebPreferences a început să emită un avertisment. În Electron 10, modulul la distanță este acum dezactivat în mod implicit. Pentru a utiliza modulul de la distanță, `activeRemoteModule: adevărat` trebuie specificat în WebPreferens:



```js
const w = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```


[Vă recomandăm să vă mutați departe de modulul la distanță ](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).



### `protocol.unregisterProtocol`


### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.



```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
protocol.unregisterProtocol(scheme)
```




### `protocol.registerFileProtocol`


### `protocol.registerBufferProtocol`


### `protocol.registerStringProtocol`


### `protocol.registerHttpProtocol`


### `protocol.registerStreamProtocol`


### `protocol.interceptFileProtocol`


### `protocol.interceptStringProtocol`


### `protocol.interceptBufferProtocol`


### `protocol.interceptHttpProtocol`


### `protocol.interceptStreamProtocol`

The APIs are now synchronous and the optional callback is no longer needed.



```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```


The registered or intercepted protocol does not have effect on current page until navigation happens.



### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.



```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```




## Modificări Plănuite ale API(9.0)



### Modificare implicită: Încărcarea modulelor native neasociate contextului în procesul de redare este dezactivată în mod implicit

Începând cu Electron 9 nu permitem încărcarea modulelor native nepotrivite contextului în procesul de redare.  Aceasta este pentru a îmbunătăți securitatea, performanța și întreținerea a Electron ca proiect.

Dacă acest lucru vă afectează, puteți seta temporar `app.allowRendererProcessReutilizați` la `false` pentru a reveni la vechiul comportament.  Acest steag va fi doar o opțiune până la Electron 11, deci ar trebui să plănuiți să vă actualizați modulele native pentru a fi conștient de context.

Pentru informații mai detaliate, a se vedea [#18397](https://github.com/electron/electron/issues/18397).



### Eliminat: `<webview>.getWebContents()`

Acest API, care a fost învechit în Electron 8.0, este acum eliminat.



```js
// Eliminat în Electron 9.0
webview.getWebContents()
// Înlocuiește cu
const { remote } = Necesar ('electron')
remote.webContents.fromId(webview.getWebContentsId())
```




### Eliminat: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. Funcția a fost învechită în Electron 8.x și a fost eliminată în Electron 9.x. Limitele nivelului de zoom pentru layout sunt acum fixate la un minim de 0. 5 și un maxim de 5.0, așa cum a fost definit [aici](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).



### Comportament modificat: Trimiterea obiectelor non-JS prin IPC aruncă acum o excepție

În Electron 8.0, IPC a fost schimbat pentru a utiliza Algoritmul Clonului Structurat, aducând îmbunătățiri semnificative ale performanței. Pentru a facilita tranziția, vechiul algoritm de serializare IPC a fost păstrat și utilizat pentru unele obiecte care nu sunt serializabile cu Clona Structurată. In particular, DOM objects (e.g. `Element`, `Location` and `DOMMatrix`), Node.js objects backed by C++ classes (e.g. `process.env`, some members of `Stream`), and Electron objects backed by C++ classes (e.g. `WebContents`, `BrowserWindow` and `WebFrame`) are not serializable with Structured Clone. Ori de câte ori vechiul algoritm a fost invocat, a fost imprimat un avertisment de dezincriminare.

In Electron 9.0, the old serialization algorithm has been removed, and sending such non-serializable objects will now throw an "object could not be cloned" error.



### API modificat: `shell.openItem` este acum `shell.openPath`

API `shell.openItem` a fost înlocuit cu un `shell.openPath` API. Puteți vedea propunerea API originală și raționamentul [aici](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).



## Modificări Plănuite ale API(8.0)



### Comportament modificat: Valorile trimise prin IPC sunt acum serializate cu Algoritm Clone Structurate

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

- Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.


```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```


- `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.

- Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.

- `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.

- `BigInt` values will be correctly serialized, instead of being converted to `null`.

- Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.

- `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.

- Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.

- Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:


```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```


Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.



### Dezaprobate: `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.



```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```


However, it is recommended to avoid using the `remote` module altogether.



```js
// Const principal
const { ipcMain, webContents } = require('electron')

const getGuestForWebContent = (webContentsId, Conținut) => {
  contur vizitator = webContents. romId(webContentsId)
  dacă (! uest) {
    aruncați o nouă Error(`Invalid webContentsId: ${webContentsId}`)
  }
  dacă (vizitator. conţinut gazdă! = conținuturi) {
    aruncați o nouă Error('Acces refuzat la webContents')
  }
  return guest
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const guest = getGuestForWebContents(webContentsId, event.sender)
  vizitator. penDevTools()
})

// Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```




### Dezaprobate: `webFrame.setLayoutZoomLevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).



## Modificări Plănuite ale API(7.0)



### Dezaprobată: URL-ul nodului Atom.io

Acest URL poate fi specificat ca `disturl` într-un fișier `.npmrc` sau ca și o comandă principală `--dist-url` când e vorba de construirea unor module de tip Node- nod.  Both will be supported for the foreseeable future but it is recommended that you switch.

Dezaprobată: https://atom.io/download/electron

Înlocuiește cu: https://electronjs.org/headers



### API modificat: `session.clearAuthCache()` nu mai acceptă opțiuni

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.



```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```




### API modificat: `powerMonitor.querySystemIdleState` este acum `powerMonitor.getSystemIdleState`



```js
// Eliminat în Electron 7.0
powerMonitor.querySystemIdleState(threshold, callback)
// Înlocuiește cu synchronous API
const idleState = powerMonitor.getSystemIdleState(threshold)
```




### API modificat: `powerMonitor.querySystemIdleTime` este acum `powerMonitor.getSystemIdleTime`



```js
// Eliminat în Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// Înlocuiește cu synchronous API
const idleTime = powerMonitor.getSystemIdleTime()
```




### API modificat: `webFrame.setIsolatedWorldInfo` înlocuiește metodele separate



```js
// Removed in Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```




### Eliminat: `marcat` proprietate pe `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.



### Comportament modificat: `atributul webkitdirectory` pentru `<input type="file"/>` acum listează conținutul directorului

Proprietatea `webkitdirectory` în intrările de fișiere HTML le permite să selecteze dosare. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

Începând cu Electron 7, că `Lista de fişiere` este acum lista cu toate fişierele conţinute în folderul, similar cu Chrome, Firefox şi Edge ([link către documentele MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

Ca o ilustrare, faceți un dosar cu această structură:


```console
folder
├── file1
├── file2
└── file3
```


În Electron <=6, aceasta va returna `FileList` cu un `Fișier` pentru:


```console
path/to/folder
```


În Electron 7, acum returnează un `FileList` cu un `Fișier` pentru:


```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```


Țineți cont că `directorul webkit` nu mai expune calea către directorul selectat. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).



## Modificări Plănuite ale API (6.0)



### API modificat: `win.setMenu(null)` este acum `win.removeMenu()`



```js
// Dezaprobată
win.setMenu(null)
// Înlocuită cu 
win.removeMenu()
```




### API Changed: `contentTracing.getTraceBufferUsage()` is now a promise



```js
// Dezaprobată
contentTracing.getTTraceBufferUsage((percentage,value) => {
// Fă ceva 
})
// Înlocuiește cu 
contentTracing.getTraceBufferUsage().then(infoObject = > {
    //infoObject deține procente și valori 
})
```




### API modificat: `electron.screen` în procesul de redare ar trebui să fie accesat prin `remote`



```js
// Dezaprobată
require(`electron`).screen
// Înlocuiește cu 
require(`electron`).remote.screen
```




### API modificat: `require()`ing node builtins in sandboxed renderers nu mai încarcă implicit `versiunea la distanță`



```js
// Dezaprobată
require('child_process')
// Înlocuiește cu 
require('electron').remote.require('child.process')
// Dezaprobată
require('fs')
// Înlocuiește cu 
require('electron').remote.require('fs')
// Dezaprobată
require('os')
// Înlocuiește cu 
require('electron').remote.require('os')
// Dezaprobată
require('path')
// Înlocuiește cu 
require('electron').remote.require('path')
```




### Dezaprobate: `powerMonitor.querySystemIdleState` înlocuit cu `powerMonitor.getSystemIdleState`



```js
// Dezaprobată
powerMonitor.querySystemIdleState(threshold, callback)
// Înlocuiește cu API sincronizat
const idleState = powerMonitor.getSystemIdleState(threshold)
```




### Dezaprobate: `powerMonitor.querySystemIdleTime` înlocuit cu `powerMonitor.getSystemIdleTime`



```js
// Dezaprobată
powerMonitor.querySystemIdleTime(callback)
// Înlocuiește cu API sincron
const idleTime = powerMonitor.getSystemIdleTime()
```




### Dezaprobate: `app.enableMixedSandbox()` nu mai este necesară



```js
// Deprecated
app.enableMixedSandbox()
```


Mixed-sandbox mode is now enabled by default.



### Dezaprobate: `Tray.setHighlightMode`

Sub îndrumarea formatoruilui nostru macOS Cătălina, implementarea se rupe. Substitutul nativ Apple nu suportă schimbarea în evidențierea comportamentului.



```js
//Dezaprobată
tray.setHighlightMode(mode)
// API v-a fi indepărtat în v7.0 fără posibilitate de înlocuire.
```




## Plănuirea modificărilor ruperilor API(5.0)



### Implicit modificat: `nodeIntegration` şi `webviewTag` implicit la false, `contextIsolation` default to true

Următoarea opțiune `webPreferences` este dezaprobată în favoarea unor noi valori prestabilite afișate în continuare.

| Propietate         | Valoare dezaprobată                  | Noua valoare |
| ------------------ | ------------------------------------ | ------------ |
| `contextIsolation` | `false`                              | `true`       |
| `nodeIntegration`  | `true`                               | `false`      |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`      |


Ex. Reactivarea webviewTag



```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```




### Comportament modificat: `nodeIntegration` în ferestrele copil deschise prin `nativeWindowOpen`

Ferestrele copil deschise cu opțiunea `nativeWindowOpen` vor avea întotdeauna integrarea Node.js dezactivată, cu excepția cazului în care `nodeIntegrationSubcadre` este `adevărat`.



### API modificat: Înregistrarea schemelor privilegiate trebuie să se facă acum înainte ca aplicația să fie gata

Renderer process API-uri `webFrame.registerURLSchemeAsPrivileged` și `webFrame.registerURLSchemeAsBypassingCSP` precum și procesul de browser API `protocol.registerStandardSchemes` au fost eliminate. Un nou API, `protocol.registerSchemesAsPrivileged` a fost adăugat și ar trebui să fie utilizat la înregistrarea unor scheme personalizate ce conțin cereri privilegiate. Schemele personalizate trebuie să fie înregistrate înainte de terminarea aplicației.



### Dezaprobate: `webFrame.setIsolatedWorld*` înlocuit cu `webFrame.setIsolatedWorldInfo`



```js
// Dezaprobate
 webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Înlocuite cu 
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```




### API modificat: `webFrame.setSpellCheckProvider` acum ia un callback asincron

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.


```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```




## Plănuirea modificărilor ruperilor API(4.0)

Următoarea listă include schimbările ruperilor API făcute în Electron 4.0.



### `app.makeSingleInstance`



```js
// Dezaprobată 
app.makeSingleInstance((argv, cwd) => {
  /* ... */... */
})
// Înlocuiește cu 
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```




### `app.releaseSingleInstance`



```js
// Dezaprobată 
app.releaseSingleInstance()
// Înlocuiește cu 
app.releaseSingleInstanceLock()
```




### `app.getGPUInfo`



```js
app.getGPUInfo('complete')
// Acum se comportă la fel ca `basic`in macOs
app.getGPUInfo('basic')
```




### `win_delay_load_hook`

La construirea unui model autohton window, variabila `win_delay_load_hook` în modulul `binding.gyp` trebuie să fie adevărată (true, vine implicit). Dacă acest cârlig nu este prezent, atunci modelul autohton nu se va încărca în Windows și va aparea următorul mesaj `Cannot find module`. Pentru mai multe detalii, vezi [native module guide](/docs/tutorial/using-native-node-modules.md).



## Modificarea Ruperilor API(3.0)

Următoarea listă include modificarea ruperilor API în Electron 3.0.



### `app`



```js
// Dezaprobată 
app.getAppMemoryInfo()
// Înlocuiește cu
app.getAppMetrics()

// Dezaprobate
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Proprietăți dezaprobate
```




### `BrowserWindow - FereastraBrowser-ului`



```js
// Dezaprobată
const optionsA = { webPreferences: { blinkFeatures: '' } }
const windowA = new BrowserWindow(optionsA)
// Înlocuiește cu
const optionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = new BrowserWindow(optionsB)

// Dezactivată
. n('app-command', (e, cmd) => {
  if (cmd == 'media-play_pause') {
    // do something
  }
})
// Înlocuiește cu fereastra
. n('app-command', (e, cmd) => {
  if (cmd == 'media-play-pause') {
    // do something
  }
})
```




### `clipboard`



```js
// Dezaprobată 
clipboard.readRtf()
// Înlocuiește cu
clipboard.readRTF()

// Dezaprobată 
clipboard.writeRtf()
// Înlocuiește cu
clipboard.writeRTF()

// Dezaprobată 
clipboard.readHtml()
// Înlocuiește cu
clipboard.readHTML()

// Dezaprobată 
clipboard.writeHtml()
// Înlocuiește cu
clipboard.writeHTML()
```




### `crashReporter`



```js
// Dezaprobată 
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Înlocuiește cu
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```




### `nativeImage`



```js
// Dezaprobată 
nativeImage.createFromBuffer(buffer, 1.0)
// Înlocuiește cu
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```




### `process-proces`



```js
// Dezaprobată 
const info = process.getProcessMemoryInfo()
```




### `screen`



```js
// Dezaprobată 
screen.getMenuBarHeight()
// Înlocuiește cu
screen.getPrimaryDisplay().workArea
```




### `session`



```js
// Dezaprobată 
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Înlocuiește cu
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```




### `Tray`



```js
// Dezaprobată 
tray.setHighlightMode(true)
// Înlocuiește cu
tray.setHighlightMode('on')

// Dezaprobată 
tray.setHighlightMode(false)
// Înlocuiește cu
tray.setHighlightMode('off')
```




### `webContents`



```js
// Dezaprobată 
webContents.openDevTools({ detach: true })
// Înlocuiește cu
webContents.openDevTools({ mode: 'detach' })

// Eliminată 
webContents.setSize(options)
// Acest API nu a fost înlocuit
```




### `webFrame`



```js
// Dezaprobată 
webFrame.registerURLSchemeAsSecure('app')
// Înlocuiește cu
protocol.registerStandardSchemes(['app'], { secure: true })

// Dezaprobată 
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Înlocuiește cu
protocol.registerStandardSchemes(['app'], { secure: true })
```




### `<webview>vizualizareWeb`



```js
//  Eliminată 
webview.setAttribute('disableguestresize', '')
// Acest API nu a fost înlocuit

// Eliminată 
webview.setAttribute('guestinstance', instanceId)
// Acest API nu a fost înlocuit

// Keyboard listeners - ascultătorii de tastatură, nu mai funcționează  în eticheta webview
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```




### Node Headers URL - Anteturile nodurilor URL

Acest URL poate fi specificat ca `disturl` într-un fișier `.npmrc` sau ca și o comandă principală `--dist-url` când e vorba de construirea unor module de tip Node- nod.

Dezaprobată: https://atom.io/download/atom-shell

Înlocuiește cu: https://atom.io/download/electron



## Modificarea Ruperilor API(2.0)

Următoarea listă include modificarea ruperilor API făcute în Electron 2.0.



### `BrowserWindow - FereastraBrowser-ului`



```js
// Dezaprobată
opțiuni de constA = { titleBarStyle: 'hidden-inset' }
const windowA = new BrowserWindow(optionsA)
// Înlocuiește cu
opțiuni de const B = { titleBarStyle: 'hiddenInset' }
const windowB = new BrowserWindow(optionsB)
```




### `menu-meniu`



```js
// Eliminată 
menu.popup(browserWindow, 100, 200, 2)
// Înlocuiește cu
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```




### `nativeImage`



```js
// Eliminată 
nativeImage.toPng()
// Înlocuiește cu
nativeImage.toPNG()

// Eliminată 
nativeImage.toJpeg()
// Înlocuiește cu
nativeImage.toJPEG()
```




### `process-proces`

* `process.versions.electron` și `process.version.chrome` vor fi făcute propietăți read-only - doarcitit, pentru a avea consistență cu celelalte propietăți setate de Node `process.versions`.



### `webContents`



```js
// Eliminată 
webContents.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webContents.setVisualZoomLevelLimits(1, 2)
```




### `webFrame`



```js
// Eliminată 
webFrame.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webFrame.setVisualZoomLevelLimits(1, 2)
```




### `<webview>vizualizareWeb`



```js
// Eliminată 
webview.setZoomLevelLimits(1, 2)
// Înlocuiește cu
webview.setVisualZoomLevelLimits(1, 2)
```




### Duplicarea bunurilor ARM

Fiecare eliberare Electron include 2 ARM identice, construite cu diferențe mici în numirea fișierelor, ca `electron-v1.7.3-linux-arm.zip` și `electron-v1.7.3-linux-armv7l.zip`. Bunurile cu prefixul `v7l` au fost adăugate pentru a ajuta la clarificarea versiunilor pe care le suporta șii la dezambiguarea viitoarelor armv6l si arm64, bunuri care se pot produce.

Fișierul _without the prefix_ încă funcționează pentru a ajuta la evitarea ruperilor unor setări care îl pot consuma. Starting at 2.0, the unprefixed file will no longer be published.

Pentru detalii, vezi [6986](https://github.com/electron/electron/pull/6986) și [7189](https://github.com/electron/electron/pull/7189).
