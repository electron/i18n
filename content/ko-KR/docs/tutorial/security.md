# 보안, Electron 보안 관련 기능, 개발자의 책임감

웹 개발자로서, 우리는 일반적으로 브라우저의 강력한 보안망의 덕을 보고 있습니다 - 덕분에 우리가 작성한 코드와 관련된 위험은 비교적 적습니다. 우리의 웹 사이트는 샌드 박스에 제한된 권한을 부여 받았으며, 새로 발견 된 보안 위협에 신속하게 대응할 수있는 대규모 엔지니어 팀이 만든 브라우저를 사용하는 덕분에 우리의 유저를 신뢰합니다.

Electron으로 작업할때, Electron이 웹 브라우저가 아니라는 점을 이해하는 것이 중요합니다. 익숙한 웹 기술로 풍부한 기능의 데스크톱 응용 프로그램을 만들 수 있는것 뿐만 아니라, 여러분의 코드는 더큰 권한을 갖습니다. 자바스크립트는 파일시스템, 유저 shell, 등 에 접근이 가능합니다. 이를 통해 고급 스러운 native 애플리케이션을 만들 수 있지만, 코드에 부여 된 추가 권한으로 인해 고유한 보안 위험이 커집니다.

이를 염두에 두고, 신뢰할 수 없는 출처의 임의의 콘텐츠를 표시하면 Electron이 처리할 수 없는 심각한 보안 위험을 야기합니다. 사실, 가장 인기있는 Electron 앱들 (Atom, Slack, Visual Studio Code 등) 은 주로 로컬 콘텐츠(또는 노드 통합이 없는 신뢰할 수 있는 안전한 원격 콘텐츠) 를 표시합니다. - 만약 애플리케이션에서 온라인 소스의 코드를 실행하는 경우, 코드가 악의적이지 않은지 확인하는 것은 사용자의 책임입니다.

## 보안 문제 제보

Electron의 보안 취약점을 공개하는 방법은 [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)를 참조하세요.

## Chromium 보안 문제와 업그레이드

Electron은 가능한 한 빨리 새로운 버전의 Chromium을 지원하기 위해 노력하지만, 개발자는 업그레이드가 수십 또는 수백 개의 파일을 수작업으로 편집하는 작업이 포함되는 중요한 사업임을 인지해야합니다. 현재 사용할 수 있는 자원과 기여를 고려할 때, Electron은 종종 최신 버전의 Chromiun 대신 몇 주 혹은 몇 달 전 버전을 사용할 것입니다.

우리의 현재 크로니움 컴포넌트 업그레이드 시스템이 우리가 사용할 수 있는 자원과 프레임 워크 위에 구축 된 대부분의 애플리케이션의 요구 사이에서 적절한 균형을 유지한다는 인상을 받고 있습니다. 우리는 Electron을 기반으로 무엇인가를 개발중인 사람들의 특별한 use case에 관해 더 듣고싶습니다. 이 노력을 지지하는 Pull 요청과 기여는 언제나 환영합니다.

## 위의 경고를 무시하면

원격 대상에서 코드를 수신하여 로컬에서 실행할 때는 항상 보안 문제가 존재합니다. 예를 들어, 원격 웹사이트가 [`BrowserWindow`](../api/browser-window.md)내부에 표시되는 경우를 고려합니다. 만약 공격자가 어떻게 든 콘텐츠를 변경하면(소스를 직접 공격하거나 앱과 실제 목적지 사이에 앉든), 사용자의 컴퓨터에서 native code를 실행할 수 있습니다.

> :warning: 어떤 상황에서도 Node.js 통합을 사용하는 원격 코드를 로드하고 실행하지 않아야 합니다. 대신, Node.js 코드를 실행하기 위해 로컬 파일 (애플리케이션과 함께 패키지된) 만 사용하십시오. 원격 컨텐츠를 표시할려면 [`<webview>`](../api/webview-tag.md)태그를 사용하고 `nodeIntegration`을 비활성화 하십시오.

## Electron 보안 경고

Electron 2.0부터, 개발자 콘솔에서 개발자는 경고와 제안을 볼 수 있습니다. 바이너리의 이름이 Electron이고, 개발자가 앱 콘솔을 보고 있을 때만 나타납니다.

`process.env`와 `window` 객체에서 `ELECTRON_ENABLE_SECURITY_WARNINGS` 혹은 `ELECTRON_DISABLE_SECURITY_WARNINGS`를 설정하면 강제 활성화하거나 강제 비활성화할 수 있습니다.

## 확인 목록: 보안 권장 사항

이것은 완벽한 보호책이 아니지만, 최소한 이 단계들을 따라서 여러분의 애플리케이션 보안을 향상해야 합니다.

1. [안전한 콘텐츠만 로드하세요.](#1-only-load-secure-content)
2. [원격 콘텐츠를 표시하는 모든 렌더러에서 Node.js 통합을 비활성화 합니다.](#2-disable-nodejs-integration-for-remote-content)
3. [원격 콘텐츠를 표시하는 모든 렌더러에서 컨텍스트 격리(context isolation) 를 활성화합니다.](#3-enable-context-isolation-for-remote-content)
4. [원격 콘텐츠를 로드하는 모든 세션에서 `ses.setPermissionRequestHandler()`를 사용합니다.](#4-handle-session-permission-requests-from-remote-content)
5. [`webSecurity`를 비활성화 하지 마세요.](#5-do-not-disable-websecurity)
6. 콘텐츠 보안 정책(`Content-Security-Policy`)을 정의<0>하고 제한적 규칙을 사용합니다(i.e. `script-src 'self'`).</li> 
    
    - [`allowRunningInsecureContent`을 `true`로 설정하지 마세요.](#7-do-not-set-allowrunninginsecurecontent-to-true)
    - [실험적인 기능들을 활성화 하지 마세요.](#8-do-not-enable-experimental-features)
    - [`enableBlinkFeatures`을 사용하지 마세요.](#9-do-not-use-enableblinkfeatures)
    - [`<webview>`: `allowpopups`을 사용하지 마세요.](#10-do-not-use-allowpopups)
    - [`<webview>`: 옵션 및 매개변수 확인](#11-verify-webview-options-before-creation)
    - [Disable or limit navigation](#12-disable-or-limit-navigation)
    - [새로운 창 생성을 제한하거나 비활성화하세요.](#13-disable-or-limit-creation-of-new-windows)</ol> 
    
    ## 1) 안전한 콘텐츠만 로드하세요.
    
    애플리케이션에 포함되지 않은 리소스들은 `HTTPS`와 같은 안전한 프로토콜을 사용하여 로드되어야 합니다. 즉, `HTTP`와 같은 안전하지 않은 프로토콜을 사용하면 안 됩니다. 마찬가지로, `WS`는 `WSS`로, `FTP`는 `FTPS`로 사용할 것을 권장합니다.
    
    ### 왜냐구요?
    
    `HTTPS`는 세 가지 이점이 있습니다:
    
    1) 원격 서버를 인증하여, 앱이 위장서버가 아닌 올바른 호스트에 안전하게 연결 되도록합니다. 2) 애플리케이션과 호스트간에 전송되는 동안 데이터가 수정되지 않았다고 단언하여, 데이터 무결성을 보장합니다. 3) 사용자와 대상 호스트 사이의 트래픽을 암호화하여, 앱과 호스트간에 전송되는 정보를 도청하기 더 어렵게 만듭니다.
    
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
    
    원격 컨텐츠를 로드하는 모든 렌더러([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), 또는 [`<webview>`](../api/webview-tag.md))에서 Node.js 통합을 비활성화 하는 것이 가장 중요합니다. 목적은, 원격 콘텐츠에 부여하는 권한을 제한하여, 공격자가 웹 사이트에서 JavaScript를 실행할 수 있는 사용자를 해치는 것이 훨씬 더 어려워 지도록 합니다.
    
    그 후, 특별한 호스트를 위해 추가적인 권한을 부여할 수 있습니다. 예를 들면, 만약 `https://my-website.com/ '을 가르키는 BrowserWindow를 여는 경우, 해당 웹 사이트에 필요한 정확한 권한을 줄 수 있지만, 그 이상은 필요 없습니다.
    
    ### 왜냐구요?
    
    공격자가 렌더러 프로세스를 밖으로 점프가 가능하고 사용자 컴퓨터에서 코드 실행이 가능하다면, cross-site-scripting(XSS) 공격은 더 위험합니다. Cross-site-scripting 공격은 매우 일반적입니다 - 문제가 발생하는 동안, 대개 해당 웹 사이트에서 실행되는 웹 사이트를 난장판으로 만듭니다. Node.js 통합을 비활성화하면 XSS가 소위 "원격 코드 실행(Remote Code Execution)"(RCE) 공격으로 확대되는 것을 방지 할 수 있습니다.
    
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
    
    ### 왜냐구요?
    
    컨텍스트 격리를 사용하면 렌더러에서 실행중인 각 스크립트가 Electron API 또는 preload script의 스크립트들과 충돌없이 JavaScript 환경을 변경할 수 있습니다.
    
    실험적인 Electron 기능인, 컨텍스트 격리는 추가적인 보안 계층을 추가합니다. Electron API 및 preload scripts를 위한 새로운 JavaScript 세계을 만듭니다.
    
    동시에, preload scripts는 `document` 및 `window` 개체에 접근할 수 있습니다. 다시 말해서, 매우 작은 투자에 비해 적절한 결과를 얻고 있다고 볼 수 있습니다.
    
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
          // 권한 요청 승인
          callback(true)
        }
    
        if (!url.startsWith('https://my-website.com')) {
          // 권한 요청 거부
          return callback(false)
        }
      })
    ```
    
    ## 5) WebSecurity를 비활성화 하지 마세요.
    
    *추천 값은 Electron의 기본값입니다.*
    
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
    <!-- 나쁜 예 -->
    <webview disablewebsecurity src="page.html"></webview>
    
    <!-- 좋은 예 -->
    <webview src="page.html"></webview>
    ```
    
    ## 6) 콘텐츠 보안 정책을 정의하세요.
    
    콘텐츠 보안 정책(CSP) 은 교차-사이트-스크립트(cross-site-scripting) 공격과 데이터 삽입 공격에 대응하는 추가적인 보호 계층입니다. Electron 안에서 로드하는 어떤 웹사이트든지 활성화하는 것을 권장합니다.
    
    ### 왜냐구요?
    
    CSP는 서버가 콘텐츠를 제한적이고 웹페이지의 리소스를 제어하는 것을 허용하도록 합니다, 또한 Electron은 주어진 그 페이지를 로드 할 수 있습니다. `https://evil.attacker.com`에서는 실행되지 않아야 하고, `https://your-page.com`에서는 정의한 스크립트가 로드 되게 해야 합니다. Defining a CSP is an easy way to improve your application's security.
    
    다음 CSP는 Electron이 현재 웹사이트와 `apis.mydomain.com`에서만 스크립트를 실행하게 허용합니다.
    
    ```txt
    // 나쁜 예
    Content-Security-Policy: '*'
    
    // 좋은 예
    Content-Security-Policy: script-src 'self' https://apis.mydomain.com
    ```
    
    ### CSP HTTP Header
    
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
    
    ### CSP Meta Tag
    
    CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:
    
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'">
    ```
    
    #### `webRequest.onHeadersReceived([filter, ]listener)`
    
    ## 7) `allowRunningInsecureContent`를 `true`로 설정하지 마세요.
    
    *추천 값은 Electron의 기본값입니다.*
    
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
    
    *추천 값은 Electron의 기본값입니다.*
    
    Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.
    
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
    
    ## 9) `enableBlinkFeatures`을 사용하지 마세요
    
    *추천 값은 Electron의 기본값입니다.*
    
    Blink는 Chromium의 렌더링 엔진 이름입니다. `experimentalFeatures`와 마찬가지로, `enableBlinkFeatures` 속성을 사용하면, 개발자가 기본적으로 비활성화된 기능을 활성화 할 수 있도록 허용됩니다.
    
    ### 왜냐구요?
    
    일반적으로 말하자면, 어떤 기능이 비활성화 되어 있다면, 거기에는 그럴만한 이유가 있다는 것입니다. 특정 기능을 사용하기 위한 본격적인 use cases가 존재합니다. 개발자로서, 왜 기능을 활성화 해야하는지, 어떤 파급효과를 줄지, 애플리케이션의 보안에 어느정도의 영향을 미치는지의 정확한 이유를 알아야 합니다. 어떠한 상황에서도 추측을 통해 기능들을 활성화 하지 마십시오.
    
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
    
    ## 10) `allowpopups`을 사용하지 마세요.
    
    *추천 값은 Electron의 기본값입니다.*
    
    If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. `allowpopups` 속성을 사용하면 `window.open()`메서드를 사용하여 새 [`BrowserWindows`](../api/browser-window.md)를 생성할 수 있습니다. `<webview>` tags are otherwise not allowed to create new windows.
    
    ### 왜냐구요?
    
    팝업이 필요하지 않은 경우, 기본적으로 새로운 [`BrowserWindows`](../api/browser-window.md)를 생성하지 않는 편이 더 좋습니다. 이것은 최소한으로 요구되는 접근 원칙을 따릅니다: 웹 사이트가 새로운 기능을 필요로하지 않는다면 새로운 팝업을 만들지 않게하십시오.
    
    ### 어떻게 하나요?
    
    ```html
    <!-- 나쁜 예 -->
    <webview allowpopups src="page.html"></webview>
    
    <!-- 좋은 예 -->
    <webview src="page.html"></webview>
    ```
    
    ## 11) 생성 전 WebView 옵션 확인
    
    Node.js 통합이 활성화되지 않은 렌더러 프로세스에서 생성된 WebView는 통합 자체를 활성화 할 수 없습니다. 하지만, WebView는 항상 자체 `webPreferences`를 사용하여 독립적인 렌더러 프로세스를 생성합니다.
    
    It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.
    
    ### 왜냐구요?
    
    Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.
    
    Electron는 개발자가 렌더러 프로세스를 제어하는 다양한 보안 기능을 비활성화 할 수 있도록 합니다. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.
    
    ### 어떻게 하나요?
    
    Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.
    
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
    
    다시 말하지만, 이 목록은 위험을 최소화하고 제거하지는 않습니다. 만약 목표가 웹 사이트를 표시하는 것이라면 브라우저가 더 안전한 옵션이됩니다.
    
    ## 12) Disable or limit navigation
    
    If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.
    
    ### 왜냐구요?
    
    Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.
    
    A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.
    
    ### 어떻게 하나요?
    
    If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.
    
    We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://google.com')` test would let `https://google.com.attacker.com` through.
    
    ```js
    const URL = require('url').URL
    
    app.on('web-contents-created', (event, contents) => {
      contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
    
        if (parsedUrl.origin !== 'https://my-own-server.com') {
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
      contents.on('new-window', (event, navigationUrl) => {
        // In this example, we'll ask the operating system
        // to open this event's url in the default browser.
        event.preventDefault()
    
        shell.openExternalSync(navigationUrl)
      })
    })
    ```