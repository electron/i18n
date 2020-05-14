# 보안, Electron 보안 관련 기능, 개발자의 책임감

웹 개발자로서, 우리는 일반적으로 브라우저의 강력한 보안망의 덕을 보고 있습니다 - 덕분에 우리가 작성한 코드와 관련된 위험은 비교적 적습니다. 우리의 웹 사이트는 샌드 박스에 제한된 권한을 부여 받았으며, 새로 발견 된 보안 위협에 신속하게 대응할 수있는 대규모 엔지니어 팀이 만든 브라우저를 사용하는 덕분에 우리의 유저를 신뢰합니다.

Electron으로 작업할때, Electron이 웹 브라우저가 아니라는 점을 이해하는 것이 중요합니다. 익숙한 웹 기술로 풍부한 기능의 데스크톱 응용 프로그램을 만들 수 있는것 뿐만 아니라, 여러분의 코드는 더큰 권한을 갖습니다. 자바스크립트는 파일시스템, 유저 shell, 등 에 접근이 가능합니다. 이를 통해 고급 스러운 native 애플리케이션을 만들 수 있지만, 코드에 부여 된 추가 권한으로 인해 고유한 보안 위험이 커집니다.

이를 염두에 두고, 신뢰할 수 없는 출처의 임의의 콘텐츠를 표시하면 Electron이 처리할 수 없는 심각한 보안 위험을 야기합니다. 사실, 가장 인기있는 Electron 앱들 (Atom, Slack, Visual Studio Code 등) 은 주로 로컬 콘텐츠(또는 노드 통합이 없는 신뢰할 수 있는 안전한 원격 콘텐츠) 를 표시합니다. - 만약 애플리케이션에서 온라인 소스의 코드를 실행하는 경우, 코드가 악의적이지 않은지 확인하는 것은 사용자의 책임입니다.

## 보안 문제 제보

Electron의 보안 취약점을 적절히 공개하는 방법은 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)를 참조하세요.

## Chromium 보안 문제와 업그레이드

Electron keeps up to date with alternating Chromium releases. For more information, see the [Electron Release Cadence blog post](https://electronjs.org/blog/12-week-cadence).

## 보안은 모두의 책무

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (*Chromium*, *Node.js*), Electron itself, all NPM dependencies and your code. 그에 있어 다음 몇 가지 중요한 사항들을 따르는 것이 여러분의 책무입니다.

* **최신 Electron 프레임워크로 애플리케이션을 최신 버전으로 유지하기.** 제품을 공개하는 것은 Electron, Chromium 공유 라이브러리, 그리고 Node.js로 구성된 묶음도 포함합니다. 이러한 구성요소들의 취약점은 애플리케이션의 보안에도 영향을 미칠 수 있습니다. Electron을 최신 버전으로 업데이트하는 것으로, 심각한 취약점 (*nodeIntegration 건너뛰기* 등) 들이 이미 패치되어 여러분의 애플리케이션에서 실행될 수 없는 것을 보장할 수 있습니다. For more information, see "[Use a current version of Electron](#17-use-a-current-version-of-electron)".

* **의존성 평가하기.** NPM이 50만 가지의 재사용 가능한 패키지를 제공하는 반면, 신뢰 가능한 제3자 라이브러리를 고르는 것은 여러분의 책임입니다. 알려진 취약점이나 엉망으로 관리되는 코드에 의존하는 오래된 버전의 라이브러리를 사용하면, 애플리케이션 보안이 취약할 수 있습니다.

* **안전한 코딩 사례 채택하기.** 애플리케이션 방어의 첫 줄은 여러분의 코드입니다. 교차 사이트 스크립팅 (XSS) 같은 흔한 웹 취약점은 Electron 애플리케이션에 높은 보안 영향을 미칩니다. 그러므로, 안전한 소프트웨어 개발 사례를 채택하고 보안 테스트를 수행하기를 매우 권장합니다.


## 신뢰할 수 없는 콘텐츠의 격리

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default [`BrowserWindow`](../api/browser-window.md). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: 어떤 상황에서도 Node.js 통합을 사용하는 원격 코드를 로드하고 실행하지 않아야 합니다. 대신, Node.js 코드를 실행하기 위해 로컬 파일 (애플리케이션과 함께 패키지된) 만 사용하십시오. To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Electron 보안 경고

Electron 2.0부터, 개발자 콘솔에서 개발자는 경고와 제안을 볼 수 있습니다. 바이너리의 이름이 Electron이고, 개발자가 앱 콘솔을 보고 있을 때만 나타납니다.

`process.env`와 `window` 객체에서 `ELECTRON_ENABLE_SECURITY_WARNINGS` 혹은 `ELECTRON_DISABLE_SECURITY_WARNINGS`를 설정하면 강제 활성화하거나 강제 비활성화할 수 있습니다.

## 확인 목록: 보안 권장 사항

애플리케이션의 보안을 향상하기 위해서는 최소한 다음 단계들을 따라야 합니다.

1. [안전한 콘텐츠만 로드하세요.](#1-only-load-secure-content)
2. [원격 콘텐츠를 표시하는 모든 렌더러에서 Node.js 통합을 비활성화 합니다.](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [원격 콘텐츠를 표시하는 모든 렌더러에서 컨텍스트 격리(context isolation) 를 활성화합니다.](#3-enable-context-isolation-for-remote-content)
4. [원격 콘텐츠를 로드하는 모든 세션에서 `ses.setPermissionRequestHandler()`를 사용합니다.](#4-handle-session-permission-requests-from-remote-content)
5. [`webSecurity`를 비활성화 하지 마세요.](#5-do-not-disable-websecurity)
6. 콘텐츠 보안 정책(`Content-Security-Policy`)을 정의<0>하고 제한적 규칙을 사용합니다(i.e. `script-src 'self'`).</li> 
   
   7 [`allowRunningInsecureContent`을 `true`로 설정하지 마세요.](#7-do-not-set-allowrunninginsecurecontent-to-true)
8 [실험적인 기능들을 활성화 하지 마세요.](#8-do-not-enable-experimental-features)
9 [`enableBlinkFeatures`을 사용하지 마세요.](#9-do-not-use-enableblinkfeatures)
10 [`<webview>`: `allowpopups`을 사용하지 마세요.](#10-do-not-use-allowpopups)
11 [`<webview>`: 옵션 및 매개변수 확인](#11-verify-webview-options-before-creation)
12 [탐색을 제한하거나 비활성화](#12-disable-or-limit-navigation)
13 [새로운 창 생성을 제한하거나 비활성화하세요.](#13-disable-or-limit-creation-of-new-windows)
14 [신뢰되지 않은 내용으로 `openExternal` 사용하지 않기](#14-do-not-use-openexternal-with-untrusted-content)
15 [`remote` 모듈 비활성화](#15-disable-the-remote-module)
16 [Filter the `remote` module](#16-filter-the-remote-module)
17 [현재 버전의 Electron 사용](#17-use-a-current-version-of-electron)</ol> 

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)



## 1) 안전한 콘텐츠만 로드하세요.

애플리케이션에 포함되지 않은 리소스들은 `HTTPS`와 같은 안전한 프로토콜을 사용하여 로드되어야 합니다. 즉, `HTTP`와 같은 안전하지 않은 프로토콜을 사용하면 안 됩니다. 마찬가지로, `WS`는 `WSS`로, `FTP`는 `FTPS`로 사용할 것을 권장합니다.



### 왜냐구요?

`HTTPS`는 세 가지 이점이 있습니다:

1) 원격 서버를 인증하여, 앱이 위장서버가 아닌 올바른 호스트에 안전하게 연결 되도록합니다. 2) 애플리케이션과 호스트간에 전송되는 동안 데이터가 수정되지 않았다고 단언하여, 데이터 무결성을 보장합니다. 3) 사용자와 대상 호스트 사이의 트래픽을 암호화하여, 앱과 호스트간에 전송되는 정보를 도청하기 더 어렵게 만듭니다.



### 어떻게 하나요?



```js
// 나쁜 예
browserWindow.loadURL('http://example.com')

// 좋은 예
browserWindow.loadURL('https://example.com')
```




```html
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```





## 2) 원격 콘텐츠에 Node.js 통합을 활성화하지 않기

_This recommendation is the default behavior in Electron since 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. 목적은, 원격 콘텐츠에 부여하는 권한을 제한하여, 공격자가 웹 사이트에서 JavaScript를 실행할 수 있는 사용자를 해치는 것이 훨씬 더 어려워 지도록 합니다.

그 후, 특별한 호스트를 위해 추가적인 권한을 부여할 수 있습니다. For example, if you are opening a BrowserWindow pointed at `https://example.com/`, you can give that website exactly the abilities it needs, but no more.



### 왜냐구요?

공격자가 렌더러 프로세스를 밖으로 점프가 가능하고 사용자 컴퓨터에서 코드 실행이 가능하다면, cross-site-scripting(XSS) 공격은 더 위험합니다. Cross-site-scripting 공격은 매우 일반적입니다 - 문제가 발생하는 동안, 대개 해당 웹 사이트에서 실행되는 웹 사이트를 난장판으로 만듭니다. Node.js 통합을 비활성화하면 XSS가 소위 "원격 코드 실행(Remote Code Execution)"(RCE) 공격으로 확대되는 것을 방지 할 수 있습니다.



### 어떻게 하나요?



```js
// 나쁜 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```




```js
// 좋은 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```




```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```


Node.js 통합을 비활성화해도, Node.js 모듈 또는 기능을 사용하는 웹 사이트에 API를 계속 노출할 수 있습니다. 사전 로드 스크립트는 계속해서 `require` 및 다른 Node.js 기능에 액세스할 수 있으며, 개발자는 원격에서 로드된 콘텐츠에 사용자 API의 노출을 허용할 수 있습니다.

다음 예제의 preload 스크립트에서, 나중에 로드된 웹 사이트는 `window.readConfig()` 메소드에 액세스할 수 있지만, Node.js 기능은 사용할 수 없습니다.



```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```





## 3) 원격 콘텐츠에 대한 콘텍스트 격리 활성화

컨텍스트 격리는 개발자가 전용 JavaScript 컨텍스트에서 사전로드 스크립트 및 Electron API에서 코드를 실행할 수있게 해주는 Electron 기능입니다. 실제로, `Array.prototype.push` 또는 `JSON.parse`와 같은 전역 객체는 렌더러 프로세스에서 실행되는 스크립트로 수정할 수 없습니다.

Electron은 크로니움의 [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment)와 같은 기술을 사용하여 이러한 동작을 가능하게 합니다.

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.



### Why & How?

For more information on what `contextIsolation` is and how to enable it please see our dedicated [Context Isolation](context-isolation.md) document.




## 4) 원격 콘텐츠에서 세션 권한 요청 처리

Chrome을 사용하는 동안 권한 요청의 경험이 있을것입니다: 웹 사이트에서 사용자가 수동으로 승인해야하는 기능(notifications과 같이) 을 사용하려고 시도 할 때마다 팝업이 표시됩니다.

API는 [Chromium permissions API](https://developer.chrome.com/extensions/permissions)를 기반으로하며 동일한 유형의 권한을 구현합니다.



### 왜냐구요?

기본적으로, Electron은 개발자가 custom handler를 수동으로 구성하지 않은한, 모든 권한 요청을 자동으로 승인합니다. 기본적으로 견고하지만, 보안 의식이있는 개발자라면 견고하지 않다고 가정하고 싶을 것입니다.



### 어떻게 하나요?



```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // 권한 요청 수락
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // 권한 요청 거절
      return callback(false)
    }
  })
```





## 5) WebSecurity를 비활성화 하지 마세요.

_추천 값은 Electron의 기본값입니다._

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) disables crucial security features.

애플리케이션 제품에서 `webSecurity`을 비활성화 하지 마세요.



### 왜냐구요?

`webSecurity`를 비활성화하면 same-origin policy가 비활성화되고 `allowRunningInsecureContent` 속성이 `true`로 설정됩니다. 다시 말해서, 다른 도메인의 안전하지 않은 코드를 실행할 수 있습니다.



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
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```





## 6) 콘텐츠 보안 정책을 정의하세요.

콘텐츠 보안 정책(CSP) 은 교차-사이트-스크립트(cross-site-scripting) 공격과 데이터 삽입 공격에 대응하는 추가적인 보호 계층입니다. Electron 안에서 로드하는 어떤 웹사이트든지 활성화하는 것을 권장합니다.



### 왜냐구요?

CSP는 서버가 콘텐츠를 제한적이고 웹페이지의 리소스를 제어하는 것을 허용하도록 합니다, 또한 Electron은 주어진 그 페이지를 로드 할 수 있습니다. `https://evil.attacker.com`에서는 실행되지 않아야 하고, `https://example.com`에서는 정의한 스크립트가 로드 되게 해야 합니다. CSP를 정의하면 쉽게 애플리케이션 보안을 향상할 수 있습니다.

다음 CSP는 Electron이 현재 웹사이트와 `apis.example.com`에서만 스크립트를 실행하게 허용합니다.



```plaintext
// 나쁜 예
Content-Security-Policy: '*'

// 좋은 예
Content-Security-Policy: script-src 'self' https://apis.example.com
```




### CSP HTTP 헤더

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:



```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```




### CSP 메타 태그

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:



```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```





## 7) `allowRunningInsecureContent`를 `true`로 설정하지 마세요.

_추천 값은 Electron의 기본값입니다._

기본적으로, Electron는 `HTTPS`를 통해 로드된 웹사이트를 허용하지 않습니다, 또한 불안전한 출처(`HTTP`) 의 스크립트, CSS 또는 플러그인을 로드하고 실행할 수 없도록합니다. `allowRunningInsecureContent` 속성을 `true`로 설정하면 해당 보호가 비활성화 됩니다.

"mixed content"라고도 알려져 있듯이, `HTTPS`를 통해 웹사이트의 초기 HTML을 로드하고, `HTTP`를 통해 후속 리소스를 로드하려고 시도하려고 합니다.



### 왜냐구요?

`HTTPS`를 통해 컨텐츠를 로드하면 트래픽 자체를 암호화하면서 로드된 리소스의 출처과 무결성을 보장합니다. 좀더 자세한 정보는 [only displaying secure content](#1-only-load-secure-content) 섹션을 참조하세요.



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





## 8) 실험적인 기능을 활성화하지 마세요.

_추천 값은 Electron의 기본값입니다._

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.



### 왜냐구요?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

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





## 9) `enableBlinkFeatures`을 사용하지 마세요

_추천 값은 Electron의 기본값입니다._

Blink는 Chromium의 렌더링 엔진 이름입니다. `experimentalFeatures`와 마찬가지로, `enableBlinkFeatures` 속성을 사용하면, 개발자가 기본적으로 비활성화된 기능을 활성화 할 수 있도록 허용됩니다.



### 왜냐구요?

일반적으로 말하자면, 어떤 기능이 비활성화 되어 있다면, 거기에는 그럴만한 이유가 있다는 것입니다. 특정 기능을 사용하기 위한 본격적인 use cases가 존재합니다. 개발자로서, 왜 기능을 활성화 해야하는지, 어떤 파급효과를 줄지, 애플리케이션의 보안에 어느정도의 영향을 미치는지의 정확한 이유를 알아야 합니다. 어떠한 상황에서도 추측을 통해 기능들을 활성화 하지 마십시오.



### 어떻게 하나요?


```js
// 나쁜 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```




```js
// 좋은 예
const mainWindow = new BrowserWindow()
```





## 10) `allowpopups`을 사용하지 마세요.

_추천 값은 Electron의 기본값입니다._

If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. `allowpopups` 속성을 사용하면 `window.open()`메서드를 사용하여 새 [`BrowserWindows`](../api/browser-window.md)를 생성할 수 있습니다. `<webview>` tags are otherwise not allowed to create new windows.



### 왜냐구요?

팝업이 필요하지 않은 경우, 기본적으로 새로운 [`BrowserWindows`](../api/browser-window.md)를 생성하지 않는 편이 더 좋습니다. 이것은 최소한으로 요구되는 접근 원칙을 따릅니다: 웹 사이트가 새로운 기능을 필요로하지 않는다면 새로운 팝업을 만들지 않게하십시오.



### 어떻게 하나요?



```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```





## 11) 생성 전 WebView 옵션 확인

Node.js 통합이 활성화되지 않은 렌더러 프로세스에서 생성된 WebView는 통합 자체를 활성화 할 수 없습니다. 하지만, WebView는 항상 자체 `webPreferences`를 사용하여 독립적인 렌더러 프로세스를 생성합니다.

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.



### 왜냐구요?

`<webview>`가 DOM에 종속되어 있기 때문에, Node.js 통합이 비활성화된 경우에도 웹 사이트에서 실행할 수 있는 스크립트로 만들 수 있습니다.

Electron는 개발자가 렌더러 프로세스를 제어하는 다양한 보안 기능을 비활성화 할 수 있도록 합니다. 대부분의 경우, 개발자는 이러한 기능을 비활성화 할 필요가 없으므로 - 새롭게 만든 [`<webview>`](../api/webview-tag.md) 태그에 대해 별도의 구성을 허용해서는 안됩니다.



### 어떻게 하나요?

Electron은 [`<webview>`](../api/webview-tag.md) 태그가 붙기 전에 호스팅중인 `webContents`에서 `will-attach-webview`이벤트를 시작합니다. Use the event to prevent the creation of `webViews` with possibly insecure options.



```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```


Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.



## 12) Disable or limit navigation

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.



### 왜냐구요?

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.



### 어떻게 하나요?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.



```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```




## 13) Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.



### 왜냐구요?

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.



### 어떻게 하나요?

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.



```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    // 이 예제에서는 운영 체제에게 기본 브라우저에서
    // 이벤트의 url을 열어달라고 요청합니다.
    event.preventDefault()

    await shell.openExternal(navigationUrl)
  })
})
```




## 14) 신뢰되지 않은 내용으로 `openExternal` 사용하지 않기

Shell's [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.



### 왜냐구요?

Improper use of [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.



### 어떻게 하나요?



```js
//  나쁜 예
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```



```js
//  좋은 예
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```




## 15) `remote` 모듈 비활성화

The `remote` module provides a way for the renderer processes to access APIs normally only available in the main process. Using it, a renderer can invoke methods of a main process object without explicitly sending inter-process messages. If your desktop application does not run untrusted content, this can be a useful way to have your renderer processes access and work with modules that are only available to the main process, such as GUI-related modules (dialogs, menus, etc.).

However, if your app can run untrusted content and even if you [sandbox](../api/sandbox-option.md) your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. 따라서, 해당 상황에서는 비활성화해야 합니다.



### 왜냐구요?

`remote`는 메인 프로세스와 통신하기 위해 내부 IPC 채널을 사용합니다. "프로토타입 오염" 공격은 `remote` IPC 메시지로 위장해 샌드박스를 탈출하고 더 높은 권한의 메인 프로세스 모듈에 접근하는 데 사용할 수 있는 내부 IPC 채널에서 악성 코드를 실행할 수 있게 합니다.

또한, 샌드박스 안의 렌더러에서 모듈을 유출하는 스크립트를 preload 하는 일도 가능합니다. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.



### 어떻게 하나요?



```js
// 렌더러가 신뢰되지 않은 내용을 실행할 수 있으면 나쁜 예입니다.
const mainWindow = new BrowserWindow({})
```




```js
// 좋은 예
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```




```html
<!-- Bad if the renderer can run untrusted content  -->
<webview src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```




## 16) `remote` 모듈 필터링

If you cannot disable the `remote` module, you should filter the globals, Node, and Electron modules (so-called built-ins) accessible via `remote` that your application does not require. This can be done by blocking certain modules entirely and by replacing others with proxies that expose only the functionality that your app needs.



### 왜냐구요?

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.



### 어떻게 하나요?



```js
const readOnlyFsProxy = require(/* ... */) // 파일 읽기 기능만 드러냄

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```




## 17) 현재 버전의 Electron 사용

You should strive for always using the latest available version of Electron. Whenever a new major version is released, you should attempt to update your app as quickly as possible.



### 왜냐구요?

An application built with an older version of Electron, Chromium, and Node.js is an easier target than an application that is using more recent versions of those components. Generally speaking, security issues and exploits for older versions of Chromium and Node.js are more widely available.

Both Chromium and Node.js are impressive feats of engineering built by thousands of talented developers. Given their popularity, their security is carefully tested and analyzed by equally skilled security researchers. Many of those researchers [disclose vulnerabilities responsibly](https://en.wikipedia.org/wiki/Responsible_disclosure), which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Your application will be more secure if it is running a recent version of Electron (and thus, Chromium and Node.js) for which potential security issues are not as widely known.
