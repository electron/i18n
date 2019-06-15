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

The extension will be remembered so you only need to call this API once per extension. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

### How to remove a DevTools Extension

You can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to remove it. The name of the extension is returned by `BrowserWindow.addDevToolsExtension` and you can get the names of all installed DevTools Extensions using the `BrowserWindow.getDevToolsExtensions` API.

## サポートされている DevTools 拡張

Electron は限られた `chrome.*` API しかサポートしていないため、Chrome 拡張機能のうちサポートされていない `chrome.*` API を使用している拡張は機能しないかもしれません。 以下の Devtools 拡張は Electron で動作することがテストされ保証されています。

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### DevTools 拡張が機能していない場合はどうすればいいですか?

まずは拡張機能がまだメンテナンスされていることを確認してください。最近のバージョンの Chrome ブラウザでも機能しない拡張機能もあります。それらの機能は実行できません。

それから、Electron の issue リストにバグを報告し、拡張のどの部分が期待通りに動作していないかを説明してください。