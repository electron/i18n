# `sandbox` Seçeneği

> Create a browser window with a sandboxed renderer. Bu seçenek etkinleştirmesi ile, oluşturucunun API nodullerine erişim için IPC yoluyla ana yöntemle iletişim kurması gerekir.

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
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behavior (by default Electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) can be used to force `sandbox: true` for all `BrowserWindow` instances.

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Önyükleme

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

ve preload.js:

```js
Bu dosya, bir javascript içeriği oluşturulduğunda yüklenir. It runs in a
// private scope that can access a subset of Electron renderer APIs. Küresel çapta herhangi bir nesnenin sızmamasına dikkat etmeliyiz!
const { ipcRenderer, remote } = require('electron')
const fs = remote.require('fs')

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

- Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate`, `clearImmediate` and `require` are available.
- Önyükleme dosyası ana süreçteki tüm API'lere `remote` ve `ipcRenderer` modüllerinden dolaylı olarak erişebilir.
- The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like webpack or browserify. An example of using browserify is below.

Bir tarayıcı paketini oluşturmak ve bir ön yükleme komut dosyası olarak kullanmak için aşağıdakine benzer bir şey kullanılmalıdır:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

`-X` bayrağı, halihazırda önyükleme alanında bulunan gerekli tüm modüllerle birlikte kullanılmalıdır, ve bunun için browserify 'a kapsayıcı `require` fonksiyonunu kullanmasını söyler. `--insert-global-vars`; `process`, `Buffer` ve `setImmediate` 'nin kapsamlı alandan alındıklarından da emin olur ( normalde browserify bunun için kod yerleştirir).

Şu anda, önyükleme aşamasından sağlanan `require` fonksiyonu aşağıdaki modülleri göstermektedir:

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `olaylar`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

## Rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. Beaker Browser). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. There is only one Chromium, whereas there are many thousands of apps built on Electron, all of which behave slightly differently. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

Here are some things to consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code, unless [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) is also enabled.
- Some bug in the V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module. Therefore, it is highly recommended to [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module). If disabling is not feasible, you should selectively [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).
- While we make our best effort to backport Chromium security fixes to older versions of Electron, we do not make a guarantee that every fix will be backported. Your best chance at staying secure is to be on the latest stable version of Electron.
