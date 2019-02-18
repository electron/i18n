# DevTools 拡張

Electron は、Web フレームワークをデバッグするために使われている Devtools の機能を拡張することができる、[Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools) をサポートしています。

## DevTools 拡張の読み込み方

このドキュメントは手動で拡張機能を読み込むためのプロセスを概説します。 Chrome ウェブストアから直接拡張機能をダウンロードするサードパーティ製のツール、[electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer) を試すこともできます。

Electron に拡張をロードするには、Chrome ブラウザでそれをダウンロードし、そのファイルシステムパスを見つけてから、`BrowserWindow.addDevToolsExtension(extension)` API を呼び出してそれを読み込む必要があります。

以下は [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) を使用する例です。

1. それを Chrome ブラウザでインストールします。
2. `chrome://extensions` に移動し、`fmkadmapgofadopljbjfkapdkoienihi` のようなハッシュ文字列であるそれの拡張 ID を探します。
3. 拡張機能を保存するために Chrome が使用するファイルシステムの場所を調べます。 
    * Windows では `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` です。
    * Linux では以下のいずれかになります。 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * macOS では `~/Library/Application Support/Google/Chrome/Default/Extensions` になります。

4. 拡張の場所を `BrowserWindow.addDevToolsExtension` API に渡します。React Developer Tools の場合は、以下のようになります。
    
    ```javascript
    const path = require('path')
    const os = require('os')
    
    BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0')
    )
    ```

**注:** `BrowserWindow.addDevToolsExtension` API は app モジュールの ready イベントが発生する前には呼び出すことはできません。

拡張機能の名前は `BrowserWindow.addDevToolsExtension` によって返され、拡張機能の名前を `BrowserWindow.removeDevToolsExtension` API に渡すことでアンロードすることができます。

## サポートされている DevTools 拡張

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### What should I do if a DevTools Extension is not working?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.