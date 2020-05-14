# DevTools 擴充功能

Electron 支援 [Chrome DevTools 擴展功能](https://developer.chrome.com/extensions/devtools)，可擴充 DevTools debug 流行 Web 框架的能力。

## 如何載入 DevTools 擴充功能

本文件將略述手動載入擴充功能的過程。 你也可以試看看 [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer) 這個直接由 Chrome 線上應用程式商店下載擴充功能的第三方工具。

要 Electron 中載入擴充功能，你需要將其下載到 Chrome 瀏覽器中，找出檔案路徑，再呼叫 `BrowserWindow.addDevToolsExtension(extension)` API 將其載入。

以 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 為例:

1. 在 Chrome 瀏覽器中安裝。
1. 連到 `chrome://extensions`，找到擴充功能的 ID，它是一串類似 `fmkadmapgofadopljbjfkapdkoienihi` 的雜湊字串。
1. 找出 Chrome 儲存擴充功能的檔案系統路徑:
   * Windows 中是 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * Linux 中可能是:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * macOS 中是 `~/Library/Application Support/Google/Chrome/Default/Extensions`。
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**注意:** `BrowserWindow.addDevToolsExtension` API 無法在應用程式模組的 ready 事件發生前叫用。

The extension will be remembered so you only need to call this API once per extension. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

### How to remove a DevTools Extension

You can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to remove it. The name of the extension is returned by `BrowserWindow.addDevToolsExtension` and you can get the names of all installed DevTools Extensions using the `BrowserWindow.getDevToolsExtensions` API.

## 支援的 DevTools 擴充功能

Electron 只支援有限的 `chrome.*` API，某些用到不支援 `chrome.*` API 的擴充功能可能無法正常運作。 下列 Devtools 擴展功能經過測試可以在 Electron 中運作:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### DevTools 擴充功能沒反應時該怎麼辦?

首先請確定擴充功能還有人維護，有些擴充功能甚至不能在最近的 Chrome 瀏覽器上執行，我們對這種情形也無能為力。

接著請到 Electron 的議題清單中開一張 bug 單，描述擴充功能是怎樣無法如期運作。
