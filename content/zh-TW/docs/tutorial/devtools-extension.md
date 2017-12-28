# DevTools 擴充功能

Electron 支援 [Chrome DevTools 擴展功能](https://developer.chrome.com/extensions/devtools)，可擴充 DevTools debug 流行 Web 框架的能力。

## 如何載入 DevTools 擴充功能

This document outlines the process for manually loading an extension. You may also try [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), a third-party tool that downloads extensions directly from the Chrome WebStore.

To load an extension in Electron, you need to download it in Chrome browser, locate its filesystem path, and then load it by calling the `BrowserWindow.addDevToolsExtension(extension)` API.

以 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 為例:

1. 在 Chrome 瀏覽器中安裝。
2. 連到 `chrome://extensions`，找到擴充功能的 ID，它是一串類似 `fmkadmapgofadopljbjfkapdkoienihi` 的雜湊字串。
3. 找出 Chrome 儲存擴充功能的檔案系統路徑: 
    * Windows 中是 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * Linux 中可能是: 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * macOS 中是 `~/Library/Application Support/Google/Chrome/Default/Extensions`。
4. 將擴充功能的路徑傳給 `BrowserWindow.addDevToolsExtension` API，以 React Developer Tools 為例，大概會是: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The name of the extension is returned by `BrowserWindow.addDevToolsExtension`, and you can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to unload it.

## 支援的 DevTools 擴充功能

Electron 只支援有限的 `chrome.*` API，某些用到不支援 `chrome.*` API 的擴充功能可能無法正常運作。 下列 Devtools 擴展功能經過測試可以在 Electron 中運作:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](http://www.cerebraljs.com/documentation/the_debugger)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### DevTools 擴充功能沒反應時該怎麼辦?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.