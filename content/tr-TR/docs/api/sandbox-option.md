# `sandbox` Seçeneği

> Chromium OS sanal alanında çalışabilen oluşturucuya sahip bir tarayıcı penceresi oluşturun. Bu seçenek etkinleştirmesi ile, oluşturucunun API nodullerine erişim için IPC yoluyla ana yöntemle iletişim kurması gerekir. However, in order to enable the Chromium OS sandbox, Electron must be run with the `--enable-sandbox` command line argument.

Chromium'un en önemli güvenlik özelliklerinden biri, parlayan tüm JavaScript kod/oluşturmanın bir sanal alan içerisinde gerçekleşmesidir. Bu sanal alan, oluşturma işlemi sırasındaki kullanmaların sisteme zarar vermediklerinden emin olmak için OS'e özgü özellikler kullanır.

Başka bir deyişle, sanal alan etkin olduğunda, oluşturucular yalnızca değişiklik yapabilir görevlere IPC vasıtasıyla ana süreci devrederek sisteme bildirir. Sandbox hakkında daha fazla bilgi [burada](https://www.chromium.org/developers/design-documents/sandbox).

Since a major feature in Electron is the ability to run Node.js in the renderer process (making it easier to develop desktop applications using web technologies), the sandbox is disabled by electron. This is because most Node.js APIs require system access. Örneğin `require()`, bir Sandbox 'lanmış ortamda mevcut olmamakla beraber dosya sistem izinleri olmadan mümkün değil.

Usually this is not a problem for desktop applications since the code is always trusted, but it makes Electron less secure than Chromium for displaying untrusted web content. For applications that require more security, the `sandbox` flag will force Electron to spawn a classic Chromium renderer that is compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't expose Node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the Electron renderer API.

Diğer bir fark da sanal alandaki oluşturucuların, varsayılan herhangi bir JavaScript API'sini değiştirmemesidir. Consequently, some APIs such as `window.open` will work as they do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Örnek

To create a sandboxed window, pass `sandbox: true` to `webPreferences`:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

Bu seçeneğin tek başına OS'ın zorladığı sandbox'a izin vermeyeceğini akılda tutmak önemlidir. Bu özelliğe izin vermek için, tüm `BrowserWindow` örnekleri için `sandbox: true` 'yu zorlayan `--enable-sandbox` komuta dizisi argümanı electron'a aktarılmalıdır.

`BrowserWindow`'da OS tarafından uygulanan sandbox'ı veya `sandbox:true` ile `webview` süreci etkinleştirmek için, tüm uygulamanın sanbox da olmasına neden olmadan, `--enable-mixed-sandbox` komut dizisi argümanı electron'a aktarılmalıdır. Bu seçenek şu an yalnızca macOS ve Windows'ta desteklenmektedir.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

```sh
electron --enable-sandbox app.js
```

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Önyükleme

Bir uygulama sandbox 'lanmış oluşturucuları, önyükleme komut dosyası kullanarak özelleştirme yapabilir. Örnek olarak:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

ve preload.js:

```js
Bu dosya, bir javascript içeriği oluşturulduğunda yüklenir. It runs in a
// private scope that can access a subset of Electron renderer APIs. Küresel çapta herhangi bir nesnenin sızmamasına dikkat etmeliyiz!
const fs = require('fs')
const { ipcRenderer } = require('electron')

// read a configuration file using the `fs` module
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Önceden yüklenen komut dosyasında dikkat edilmesi gereken önemli şeyler:

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- Önyükleme dosyası ana süreçteki tüm API'lere `remote` ve `ipcRenderer` modüllerinden dolaylı olarak erişebilir. Diğer modüller ve `fs` (yukarıda kullanıldı) bu şekilde uygulanır: Bunlar ana süreç içerisinde ki benzerler için proxy'lerdir.
- Önceden yüklenen komut dosyası tek bir komut dosyası içine yüklenmelidir, ancak aşağıdaki açıklamada tarayıcı gibi bir araç kullanarak birden çok modül ile derlenmiş karmaşık bir önyükleme kodunun olması mümkündür. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

Bir tarayıcı paketini oluşturmak ve bir ön yükleme komut dosyası olarak kullanmak için aşağıdakine benzer bir şey kullanılmalıdır:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

`-X` bayrağı, halihazırda önyükleme alanında bulunan gerekli tüm modüllerle birlikte kullanılmalıdır, ve bunun için browserify 'a kapsayıcı `require` fonksiyonunu kullanmasını söyler. `--insert-global-vars`; `process`, `Buffer` ve `setImmediate` 'nin kapsamlı alandan alındıklarından da emin olur ( normalde browserify bunun için kod yerleştirir).

Şu anda, önyükleme aşamasından sağlanan `require` fonksiyonu aşağıdaki modülleri göstermektedir:

- `child_process`
- `electron` 
  - `crashReporter`
  - `remote`
  - `ipcRenderer`
  - `webFrame`
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Durum

Hala deneme aşamasında bir özellik olduğu için, lütfen `sandbox` seçeneğini dikkatli kullanın. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code.
- V8 makinesindeki bazı yazılım hataları kötü amaçlı kodların oluşturucu önyükleme API 'lerine erişimlerine izin verebilir, etkili bir şekilde `remote` modülünden sisteme tam erişimi onaylayabilir.

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

Güvenliği büyük ölçüde arttırması planlanan bir geliştirme, ana işlemin işleyiciye gönderilmesine izin verilen bir dizi iletiyi açıkça tanımasına izin vermek üzere, sanal göndericilere ait IPC iletilerini varsayılan olarak engellemektedir.