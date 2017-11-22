# 개발자 도구 확장 기능

Electron은 유명한 웹 프레임워크를 디버깅하기 위해 사용할 수 있는 개발자 도구 확장 기능을 사용할 수 있도록 [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools)(크롬 개발자 도구 확장 기능)을 지원합니다.

## 개발자 도구는 어떻게 로드하나요

이 문서는 확장 기능을 수동으로 로드하는 방법의 과정을 설명합니다. 또한 [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer)와 같은 Chrome WebStore에서 자동으로 확장 기능을 다운로드하는 서드-파티 도구를 사용할 수도 있습니다.

Electron에 확장 기능을 로드하려면, Chrome 브라우저에서 다운로드 해야 하며, 파일 시스템 경로를 지정해야 합니다. 그리고 `BrowserWindow.addDevToolsExtension(extension)`API를 호출함으로써 기능을 로드할 수 있습니다.

예시로 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)를 사용한다면:

1. Chrome 브라우저를 설치합니다.
2. `chrome://extensions`로 이동한 후 해시된 `fmkadmapgofadopljbjfkapdkoienihi` 같이 생긴 확장 기능의 ID를 찾습니다.
3. Chrome에서 사용하는 확장 기능을 저장해둔 파일 시스템 경로를 찾습니다: 
    * Windows에선 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions<0>;</li>
<li>Linux에선:

<ul>
<li><code>~/.config/google-chrome/Default/Extensions/`
    * `~/.config/google-chrome-beta/Default/Extensions/`
    * `~/.config/google-chrome-canary/Default/Extensions/`
    * `~/.config/chromium/Default/Extensions/`
4. macOS에선 `~/Library/Application Support/Google/Chrome/Default/Extensions.`</ul></li> 

5. 확장 기능의 경로를 `BrowserWindow.addDevToolsExtension` API로 전달합니다. React Developer Tools의 경우 다음과 비슷해야 합니다: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**참고:** `BrowserWindow.addDevToolsExtension` API는 app 모듈의 ready 이벤트가 발생하기 전까지 사용할 수 없습니다.

확장 기능의 이름은 `BrowserWindow.addDevToolsExtension`에서 반환되며, 이 이름을 `BrowserWindow.removeDevToolsExtension` API로 전달함으로써 해당하는 확장 기능을 언로드할 수 있습니다.

## 지원하는 개발자 도구 확장 기능

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](http://www.cerebraljs.com/documentation/the_debugger)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### What should I do if a DevTools Extension is not working?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.