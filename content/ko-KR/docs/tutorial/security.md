# 보안, 기본 기능, 그리고 당신의 책임

웹 개발자로서, 우리는 일반적으로 브라우저의 강력한 보안망의 덕을 보고 있습니다 - 덕분에 우리가 작성한 코드와 관련된 위험은 비교적 적습니다. 우리의 웹 사이트는 샌드 박스에 제한된 권한을 부여 받았으며, 새로 발견 된 보안 위협에 신속하게 대응할 수있는 대규모 엔지니어 팀이 만든 브라우저를 사용하는 덕분에 우리의 유저를 신뢰합니다.

Electron으로 작업할때, Electron이 웹 브라우저가 아니라는 점을 이해하는 것이 중요합니다. 익숙한 웹 기술로 풍부한 기능의 데스크톱 응용 프로그램을 만들 수 있는것 뿐만 아니라, 여러분의 코드는 훨씬더 큰힘을 발휘합니다. 자바스크립트는 파일시스템, 유저 shell, 등 에 접근이 가능합니다. 이를 통해 고급 스러운 native 애플리케이션을 만들 수 있지만, 코드에 부여 된 추가 권한으로 인해 고유한 보안 위험이 커집니다.

이를 염두에두고, 신뢰할 수 없는 출처의 임의의 콘텐츠를 표시하면 Electron이 처리할 수 없는 심각한 보안 위험을 야기합니다. In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) – if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious. 사실, 가장 인기있는 Electron 앱들 (Atom, Slack, Visual Studio Code 등) 은 주로 로컬 콘텐츠(또는 노드 통합이 없는 신뢰할 수 있는 안전한 원격 콘텐츠) 를 표시합니다. - 만약 애플리케이션에서 온라인 소스의 코드를 실행하는 경우, 코드가 악의적이지 않은지 확인하는 것은 사용자의 책임입니다.

## 보안 문제 제보

Electron의 보안 취약점을 공개하는 방법은 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)를 참조하세요.

## Chromium 보안 문제와 업그레이드

Electron은 가능한 한 빨리 새로운 버전의 Chromium을 지원하기 위해 노력하지만, 개발자는 업그레이드가 수십 또는 수백 개의 파일을 수작업으로 편집하는 작업이 포함되는 중요한 사업임을 인지해야합니다. 현재 사용할 수있는 자원과 기여를 감안할 때, Electron은 종종 Chromium의 가장 최신 버전을 사용하지 않고, 며칠 또는 몇 주가 뒤에 지연된 버전을 사용합니다.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. We definitely are interested in hearing more about specific use cases from the people that build things on top of Electron. 이 노력을 지지하는 Pull 요청과 기여는 언제나 환영합니다.

## 위의 경고를 무시하면

A security issue exists whenever you receive code from a remote destination and execute it locally. As an example, consider a remote website being displayed inside a [`BrowserWindow`](../api/browser-window.md). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Under no circumstances should you load and execute remote code with Node.js integration enabled. Instead, use only local files (packaged together with your application) to execute Node.js code. To display remote content, use the [`webview`](../api/web-view.md) tag and make sure to disable the `nodeIntegration`.

## Electron 보안 경고

Electron 2.0부터, 개발자 콘솔에서 개발자는 경고와 제안을 볼 수 있습니다. 바이너리의 이름이 Electron이고, 개발자가 앱 콘솔을 보고 있을 때만 나타납니다.

`process.env`와 `window` 객체에서 `ELECTRON_ENABLE_SECURITY_WARNINGS` 혹은 `ELECTRON_DISABLE_SECURITY_WARNINGS`를 설정하면 강제 활성화하거나 강제 비활성화할 수 있습니다.

## 확인 목록: 보안 권장 사항

이것은 완벽한 보호책이 아니지만, 최소한 이 단계들을 따라서 여러분의 애플리케이션 보안을 향상해야 합니다.

1. [안전한 콘텐츠만 로드하세요.](#1-only-load-secure-content)
2. [Disable the Node.js integration in all renderers that display remote content](#2-disable-nodejs-integration-for-remote-content)
3. [Enable context isolation in all renderers that display remote content](#3-enable-context-isolation-for-remote-content)
4. [Use `ses.setPermissionRequestHandler()` in all sessions that load remote content](#4-handle-session-permission-requests-from-remote-content)
5. [Do not disable `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Override and disable `eval`](#7-override-and-disable-eval), which allows strings to be executed as code.
8. [Do not set `allowRunningInsecureContent` to `true`](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Do not enable experimental features](#9-do-not-enable-experimental-features)
10. [Do not use `enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [WebViews: `allowpopups`를 사용하지 마세요.](#11-do-not-use-allowpopups)
12. [WebViews: 옵션과 모든 `<webview>` 태그의 매개 변수 확인](#12-verify-webview-options-before-creation)

## 1) 안전한 콘텐츠만 로드하세요.

애플리케이션에 포함되지 않은 리소스들은 `HTTPS`와 같은 안전한 프로토콜을 사용하여 로드되어야 합니다. 즉, `HTTP`와 같은 안전하지 않은 프로토콜을 사용하면 안 됩니다. 마찬가지로, `WS`는 `WSS`로, `FTP`는 `FTPS`로 사용할 것을 권장합니다.

### 왜냐구요?

`HTTPS`는 세 가지 이점이 있습니다:

1) It authenticates the remote server, ensuring your app connects to the correct host instead of an impersonator. 2) It ensures data integrity, asserting that the data was not modified while in transit between your application and the host. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### 어떻게 하나요?

```js
// 나쁜 예
browserWindow.loadURL('http://my-website.com')

// 좋은 예
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- 나쁜 예 -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- 좋은 예 -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) 원격 콘텐츠에 대한 Node.js 통합 비활성화

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at `https://my-website.com/", you can give that website exactly the abilities it needs, but no more.

### 왜냐구요?

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### 어떻게 하나요?

```js
// 나쁜 예
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// 좋은 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- 나쁜 예 -->
<webview nodeIntegration src="page.html"></webview>

<!-- 좋은 예 -->
<webview src="page.html"></webview>
```

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) 원격 콘텐츠에 대한 콘텍스트 격리 활성화

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### 왜냐구요?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### 어떻게 하나요?

```js
// 주 프로세스
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// 프리로드 스크립트

// 로드되기 전에 페이지 변수를 설정합니다.
webFrame.executeJavaScript('window.foo = "foo";')

// 로드된 페이지에서는 이것에 접근할 수 없습니다, 이 컨텍스트에서만
// 접근이 가능합니다.
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // window.foo는 메인 콘텍스트에서만 접근할 수 있기 때문에 'undefined' 가
  // 출력됩니다.
  console.log(window.foo)

  // window.bar는 이 콘텍스트에서 사용할 수 있기 때문에 'bar'가 출력됩니다.
  console.log(window.bar)
})
```

## 4) Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### 왜냐구요?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### 어떻게 하나요?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) WebSecurity를 비활성화 하지 마세요.

*추천 값은 Electron의 기본값입니다.*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### 왜냐구요?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### 어떻게 하나요?

```js
// 나쁜 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// 좋은 예
const mainWindow = new BrowserWindow()
```

```html
<!-- 나쁜 예 -->
<webview disablewebsecurity src="page.html"></webview>

<!-- 좋은 예 -->
<webview src="page.html"></webview>
```

## 6) 콘텐츠 보안 정책을 정의하세요.

콘텐츠 보안 정책(CSP)은 교차-사이트-스크립트 공격과 데이터 삽입 공격에 대응하는 추가적인 보호 계층입니다. Electron 안에서 로드하는 어떤 웹사이트든지 활성화하는 것을 권장합니다.

### 왜냐구요?

CSP는 서버가 콘텐츠를 제한적이고 웹페이지의 리소스를 제어하는 것을 허용하도록 합니다, 또한 Electron은 주어진 그 페이지를 로드 할 수 있습니다. `https://evil.attacker.com`에서는 실행되지 않아야 하고, `https://your-page.com`에서는 정의한 스크립트가 로드 되게 해야 합니다. CSP를 정의하는 것이 애플리케이션 보안을 향상하는 쉬운 방법입니다.

### 어떻게 하나요?

Electron은 [`Content-Security-Policy` HTTP 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)와 `<meta>` 태그를 지킵니다.

다음 CSP는 Electron이 현재 웹사이트와 `apis.mydomain.com`에서만 스크립트를 실행하게 허용합니다.

```txt
// 나쁜 예
Content-Security-Policy: '*'

// 좋은 예
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) `eval`을 재정의하고 비활성화하세요.

`eval()`은 문자열로 되어있는 JavaScript를 실행하도록 허용하는 핵심 JavaScript 매서드입니다. 이것을 비활성화하면 앱이 알려지지 않은 JavaScript 스크립트를 실행하지 못하도록 기능을 비활성화합니다.

### 왜냐구요?

`eval()`은 문자열로 되어 있는 자바스크립트를 실행하는 것 딱 한 가지에 목표를 두고 있습니다. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### 어떻게 하나요?

```js
// ESLint는 어느 eval() 사용에 경고문을 띄웁니다. 심지어 이것도요.
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`이 앱은 window.eval()을 지원하지 않습니다.`)
}
```

## 8) `allowRunningInsecureContent`를 `true`로 설정하지 마세요.

*추천 값은 Electron의 기본값입니다.*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### 왜냐구요?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### 어떻게 하나요?

```js
// 나쁜 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// 좋은 예
const mainWindow = new BrowserWindow({})
```

## 9) 실험적인 기능을 활성화하지 마세요.

*추천 값은 Electron의 기본값입니다.*

Electron의 고급 사용자는 `experimentalFeatures` 와 `experimentalCanvasFeatures`를 사용해서 Chromium의 실험적인 기능을 활성화할 수 있습니다.

### 왜냐구요?

실험적인 기능은 이름에서 말하듯이, 실험적이고, 모든 Chromium 사용자에게 활성화되지 않습니다. 또한, Electron에 미치는 전체적인 영향이 실험되지 않았습니다.

합법적인 사례도 존재하지만, 당신이 뭘 하는지 모른다면, 이 속성을 활성화하면 안 됩니다.

### 어떻게 하나요?

```js
// 나쁜 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// 좋은 예
const mainWindow = new BrowserWindow({})
```

## 10) Do Not Use `enableBlinkFeatures`

*추천 값은 Electron의 기본값입니다.*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### 왜냐구요?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### 어떻게 하나요?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// 좋은 예
const mainWindow = new BrowserWindow()
```

## 11) `allowpopups`을 사용하지 마세요.

*추천 값은 Electron의 기본값입니다.*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### 왜냐구요?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](../api/browser-window.md) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### 어떻게 하나요?

```html
<!-- 나쁜 예 -->
<webview allowpopups src="page.html"></webview>

<!-- 좋은 예 -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](../api/web-view.md) from the main process and to verify that their webPreferences do not disable security features.

### 왜냐구요?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](../api/web-view.md) tags.

### 어떻게 하나요?

Before a [`<WebView>`](../api/web-view.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.