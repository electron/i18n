# `sandbox` Seçeneği

> Chromium OS sanal alanında çalışabilen oluşturucuya sahip bir tarayıcı penceresi oluşturun. Bu seçenek etkinleştirmesi ile, oluşturucunun API nodullerine erişim için IPC yoluyla ana yöntemle iletişim kurması gerekir. Ayrıca, Chromium OS sanal alanını etkinleştirmek için, elektronun `--enable-sandbox` komuta satır argümanıyla çalıştırılması gerekir.

Chromium'un en önemli güvenlik özelliklerinden biri, parlayan tüm JavaScript kod/oluşturmanın bir sanal alan içerisinde gerçekleşmesidir. Bu sanal alan, oluşturma işlemi sırasındaki kullanmaların sisteme zarar vermediklerinden emin olmak için OS'e özgü özellikler kullanır.

Başka bir deyişle, sanal alan etkin olduğunda, oluşturucular yalnızca değişiklik yapabilir görevlere IPC vasıtasıyla ana süreci devrederek sisteme bildirir. Sandbox hakkında daha fazla bilgi [burada](https://www.chromium.org/developers/design-documents/sandbox).

Electron'da önemli bir özellik, oluşturma sürecinde node.js 'i çalıştırma yeterliliği olduğundan (web teknolojileri kullanarak masaüstü uygulamaları geliştirmeyi kolaylaştırır), sandbox electron tarafından engellenir. Bunun nedeni, çoğu node.js API'sinin sistem erişimi gerektirmesidir. `require()` for example, is not possible without file system permissions, which are not available in a sandboxed environment.

Genellikle masaüstü uygulamaları için sorun teşkil etmez, çünkü kod her zaman güvenilir, ancak güvenilmeyen web içeriğini görüntülemek için elektronları kromdan daha az güvenli hale getirir. Daha fazla güvenliğe ihtiyaç duyan uygulamalar için `sandbox` bayrağı electron'u, sanal alanla uyumlu klasik bir Chromium oluşturucu meydana getirmeye zorlar.

Sanal alana yerleştirilmiş bir oluşturucunun,çalışan bir node.js ortamı yoktur ve alıcı koduna node.js API'larını göstermez. Tek istisna, electron API oluşturucularının alt kümesine erişimi olan, önceden yüklenmiş komut dosyasıdır.

Diğer bir fark da sanal alandaki oluşturucuların, varsayılan herhangi bir JavaScript API'sini değiştirmemesidir. Sonuç olarak `window.open` gibi bazı API'lar chromium'da olduğu gibi çalışır ( ör. bir `BrowserWindowProxy` göndermezler).

## Örnek

Sandbox' lanmış bir pencere oluşturmak için, basitçe `sandbox: true` 'dan `webPreferences` 'a geçin:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  w.loadURL('http://google.com')
})
```

Yukarıdaki kodda oluşturulmuş `BrowserWindow` 'da node.js devre dışı bırakılmış ve sadece IPC yoluyla iletişim kurabilir. Bu seçeneğin kullanılması, elektronun renderer' da bir node.js çalışma zamanı oluşturmasını durdurur. Also, within this new window `window.open` follows the native behaviour (by default electron creates a `BrowserWindow` and returns a proxy to this via `window.open`).

It is important to note that this option alone won't enable the OS-enforced sandbox. To enable this feature, the `--enable-sandbox` command-line argument must be passed to electron, which will force `sandbox: true` for all `BrowserWindow` instances.

To enable OS-enforced sandbox on `BrowserWindow` or `webview` process with `sandbox:true` without causing entire app to be in sandbox, `--enable-mixed-sandbox` command-line argument must be passed to electron. Bu seçenek şu an yalnızca macOS ve Windows'ta desteklenmektedir.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  w.loadURL('http://google.com')
})
```

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to chromium sandbox settings. The switch must be passed to electron on the command-line:

    electron --enable-sandbox app.js
    

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, simply omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

## Preload

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  w.loadURL('http://google.com')
})
```

and preload.js:

```js
// This file is loaded whenever a javascript context is created. It runs in a
// private scope that can access a subset of electron renderer APIs. We must be
// careful to not leak any objects into the global scope!
const fs = require('fs')
const {ipcRenderer} = require('electron')

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

- Even though the sandboxed renderer doesn't have node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules. This is how `fs` (used above) and other modules are implemented: They are proxies to remote counterparts in the main process.
- Önceden yüklenen komut dosyası tek bir komut dosyası içine yüklenmelidir, ancak aşağıdaki açıklamada tarayıcı gibi bir araç kullanarak birden çok modül ile derlenmiş karmaşık bir önyükleme kodunun olması mümkündür. In fact, browserify is already used by electron to provide a node-like environment to the preload script.

Bir tarayıcı paketini oluşturmak ve bir ön yükleme komut dosyası olarak kullanmak için aşağıdakine benzer bir şey kullanılmalıdır:

    browserify preload/index.js \
      -x electron \
      -x fs \
      --insert-global-vars=__filename,__dirname -o preload.js
    

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

- `child_process`
- `electron` (crashReporter, remote and ipcRenderer)
- `fs`
- `os`
- `timers`
- `url`

More may be added as needed to expose more electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Status

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

- Önceden yüklenmiş bir komut dosyası, yanlışlıkla ayrıcalıklı API'ları, güvenilmeyen kodlara filtreleyebilir.
- Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Elektronda güvenilmeyen içeriğin görüntülenmesi hâlâ bilinmeyen bir alan olduğu için, sanal ön koşul komut dosyasına maruz kalan API'lerin diğer elektron API' lerinden daha dengesiz olduğu düşünülmelidir ve düzeltmek için güvenlik sorunları gibiönemli değişiklikler olabilir.

Güvenliği büyük ölçüde arttırması planlanan bir geliştirme, ana işlemin işleyiciye gönderilmesine izin verilen bir dizi iletiyi açıkça tanımasına izin vermek üzere, sanal göndericilere ait IPC iletilerini varsayılan olarak engellemektedir.