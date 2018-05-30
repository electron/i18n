# 安全性、原生功能及你的責任

身為網頁開發人員，我們常常受惠於瀏覽器建立的強大安全網，我們的程式再怎麼搞，所能引起的風險都微乎其微。 我們的網站被限制在獨立的沙盒環境中運作，我們相信使用者都習慣於享受由龐大工程師團隊開發維護的瀏覽器，能在第一時間快速處理新發現的安全性威脅。

而在使用 Electron 時，千萬要記住一點: Electron 並不是網頁瀏覽器。 它讓你能用熟悉的網頁技術打造出功能完善的桌面應用程式，只不過你的程式碼具有更大的能力。 JavaScript 能存取檔案系統，使用者 Shell 等等。 你能做出高品質的原生應用程式，但是你的程式碼被賦與的能力越強，相對的安全性問題也會越重。

請謹記在心，顯示不能完全信任的來源產生的任意內容會有極大的安全風險，Electron 也沒打算處理。 事實上，流行的 Electron 應用程式 (Atom, Slack, Visual Studio Code 等) 幾乎都只顯示本機的內容 (或受信任、安全且沒跟 Node 整合的遠端內容) ，如果你的應用程式會執行網路上抓來的程式碼，你要負責確保那些程式碼中不會有惡意內容。

## 回報安全性問題

如何正確揭露 Electron 漏洞的相關資訊可參考 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium 安全性議題及升級

雖然 Electron 致力於盡快支援新版的 Chromium，但開發人員都應該知道，升級是件嚴肅的事，可能要手動修改數十，甚至上百個檔案。 以現有的資源及貢獻程度來看，Electron 通常沒辦法跟到最新版的 Chromium，可能會落後數日或數週。

我們認為現在的 Chromium 元件升級機制，已經在有限資源及多數桌面應用程式需求之間取得平衡。 我們真的很想聽到大家又把 Electron 應用在什麼特別的地方。 隨時歡迎各位提出 Pull Request 或是其他貢獻。

## 先不管上面那些建議

由遠端取得程式碼並在本機執行就會有安全議題。 假設在 [`BrowserWindow`](../api/browser-window.md) 中顯示一個遠端網站， 如果攻擊者有辦法改變網站內容 (可能是直接攻擊來源，或是藏在你的應用程式與伺服器中間)，他們就有機會在使用者的機器上執行原生程式。

> :warning: 無論如何，你都不該在啟用 Node.js 整合的情況下，由遠端載入並執行程式碼。 如果需要執行 Node.js 程式碼，請只用本機檔案 (跟你的應用程式打包在一起的那些)。 如果要顯示遠端內容，請用 [`webview`](../api/web-view.md) 標籤，並確定已經停掉 `nodeIntegration`。

## Electron 安全性警告

由 Electron 2.0 版開始，開發者會在開發主控台中看到警告訊息及建議事項。 They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

你也可以在 `process.env` 或 `window` 中設定 `ELECTRON_ENABLE_SECURITY_WARNINGS` 或 `ELECTRON_DISABLE_SECURITY_WARNINGS` 來強制開啟或關閉這些警告訊息。

## 檢查清單: 安全性建議事項

不是說這樣就能金槍不入，但至少你應該依照下列步驟來提升你應用程式的安全性。

1. [只載入安全的內容](#1-only-load-secure-content)
2. [Disable the Node.js integration in all renderers that display remote content](#2-disable-nodejs-integration-for-remote-content)
3. [Enable context isolation in all renderers that display remote content](#3-enable-context-isolation-for-remote-content)
4. [在所有會載入遠端內容的 Session 中使用 `ses.setPermissionRequestHandler()`](#4-handle-session-permission-requests-from-remote-content)
5. [不要停用 `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Override and disable `eval`](#7-override-and-disable-eval), which allows strings to be executed as code.
8. [不要將 `allowRunningInsecureContent` 設為 `true`](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Do not enable experimental features](#9-do-not-enable-experimental-features)
10. [Do not use `enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [WebViews: 不要用 `allowpopups`](#11-do-not-use-allowpopups)
12. [WebViews: Verify the options and params of all `<webview>` tags](#12-verify-webview-options-before-creation)

## 1) 只載入安全的內容

任何不是包在你應用程式中的資源，應該使用安全的通訊協定來載入，例如 `HTTPS`。 也就是說別用 `HTTP` 這類不安全的通訊協定。 基於相同理由，我們建議使用 `WSS` 而不是 `WS`、`FTPS` 而不是 `FTP`，其於類推。

### 為什麼?

使用 `HTTPS` 有三大好處:

1) 能驗證遠端伺服器，確保你的應用程式連到正確的網站，而不是連到假網站。 2) 能確保資料完整性，確定資料沒有在應用程式及主機溝通的過程中被修改。 3) 它加密你的使用者及目的地主機間傳送的資料，讓他人難以竊聽到傳送的資訊。

### 怎麼做?

```js
// 錯誤示範
browserWindow.loadURL('http://my-website.com')

// 正確寫法
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- 錯誤示範 -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- 正確寫法 -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) 針對遠端內容停用 Node.js 整合功能

停用所有會載入遠端內容的畫面轉譯器 ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md) 或 [`WebView`](../api/web-view.md)) 中的 Node.js 整合功能非常重要。 目的是在限縮遠端內容能做的事，就算攻擊者能在你的網站中執行 JavaScript，也很難真正傷害到使用者。

你可以再針對特定的網址提供額外權限。 例如，如果你開了一個指到 `https://my-website.com/" 的 BrowserWindow，可以額外指定該網頁需要有的最小權限，千萬不要多給用不到的權限。

### 為什麼?

如果攻擊者能跳出畫面轉譯處理序，直接在使用者的電腦上執行程式碼，那麼跨網站指令碼 (Cross-Site Scripting; 縮寫 XSS) 攻擊會變得非常危險。 XSS 攻擊很常見，通常發生時其破壞力只限於亂搞被執行的網站。 停用 Node.js 整合功能，能防止 XSS 攻擊擴大成「遠端程式碼執行」(Remote Code Execution; 縮寫 RCE) 攻擊

### 怎麼做?

```js
// 錯誤示範
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// 正確用法
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- 錯誤示範 -->
<webview nodeIntegration src="page.html"></webview>

<!-- 正確寫法 -->
<webview src="page.html"></webview>
```

就算停用了 Node.js 整合功能，你還是能將 Node.js 的模組或功能 API 提供給網站執行。 你可以在預載腳本中使用 `require` 及其他 Node.js 的功能，開發人員可以提供自訂 API 給遠端載入的內容使用。

下列這段預載腳本範例中，後續載入的網頁可以使用 `window.readConfig()` 方法，但無法直接存取 Node.js 功能。

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) 針對遠端內容啟用內容隔離功能

內容隔離是 Electron 提供的功能，讓開發者可以在預載腳本及 Electron API 中以專用的 JavaScript 環境執行程式碼。 In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### 為什麼?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### 怎麼做?

```js
// 主執行序
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// 預載腳本

// 在網頁載入前設定變數
webFrame.executeJavaScript('window.foo = "foo";')

// 載入的頁面將無法存取這個變數，只有在這個 context 下才能存取
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // 會印出 'undefined'，因為 window.foo 只能在主 context 中用
  console.log(window.foo)

  // 會印出 'bar'，因為 window.bar 可以在這個 context 中用
  console.log(window.bar)
})
```

## 3) 處理來自遠端內容的 Session 權限請求

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### 為什麼?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### 怎麼做?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // 准許權限請求
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // 拒絕權限請求
      return callback(false)
    }
  })
```

## 5) 不要停用 WebSecurity

*建議值就是 Electron 的預設值*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

不要在上線的應用程式中停用 `webSecurity`。

### 為什麼?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### 怎麼做?

```js
// 錯誤示範
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// 正確寫法
const mainWindow = new BrowserWindow()
```

```html
<!-- 錯誤示範 -->
<webview disablewebsecurity src="page.html"></webview>

<!-- 正確寫法 -->
<webview src="page.html"></webview>
```

## 6) 定義內容安全性原則

內容安全性原則 (Content Security Policy; 縮寫 CSP) 是用來防止跨網站指令碼 (Cross-Site Scripting; 縮寫 XSS) 攻擊及資料注入攻擊的機制。 我們建議你在所有會由 Electron 載入的網站都啟用這個機制。

### 為什麼?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### 怎麼做?

Electron 會遵照 [`Content-Security-Policy` HTTP 標頭](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) 及相應的 `<meta>` 標籤規範。

下面這組 CSP 允許 Electron 由目前的網站及 `apis.mydomain.com` 執行腳本。

```txt
// 錯誤示範
Content-Security-Policy: '*'

// 正確寫法
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) 覆寫並停用 `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### 為什麼?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### 怎麼做?

```js
// ESLint 會對任何用到 eval() 的地方提出警告，就算用了
// eslint-disable-next-line 也一樣
window.eval = global.eval = function () {
  throw new Error(`失禮了，本應用程式不支援 window.eval()。`)
}
```

## 8) 不要將 `allowRunningInsecureContent` 設為 `true`

*建議值就是 Electron 的預設值*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### 為什麼?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### 怎麼做?

```js
// 錯誤示範
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// 正確寫法
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Enable Experimental Features

*建議值就是 Electron 的預設值*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### 為什麼?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### 怎麼做?

```js
// 錯誤示範
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// 正確寫法
const mainWindow = new BrowserWindow({})
```

## 10) Do Not Use `enableBlinkFeatures`

*建議值就是 Electron 的預設值*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### 為什麼?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### 怎麼做?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// 正確寫法
const mainWindow = new BrowserWindow()
```

## 11) 不要用 `allowpopups`

*建議值就是 Electron 的預設值*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### 為什麼?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### 怎麼做?

```html
<!-- 錯誤示範 -->
<webview allowpopups src="page.html"></webview>

<!-- 正確寫法 -->
<webview src="page.html"></webview>
```

## 12) 建立 WebView 前先檢查選項

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### 為什麼?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### 怎麼做?

Before a [`<WebView>`](../api/web-view.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // 拿掉用不著的預載腳本，或是確認它們的位置是安全正確的
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // 停用 Node.js 整合
    webPreferences.nodeIntegration = false

    // 驗證將要載入的 URL
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

再次強調，這份清單只能幫你降低風險，並沒辦法完全將風險排除。如果你的目標只是要顯示網站，那麼瀏覽器會是比較安全的選項。