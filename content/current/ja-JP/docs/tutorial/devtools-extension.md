# デベロッパー ツール拡張

Electron は、ウェブフレームワークをデバッグするために使われているデベロッパー ツールの機能を拡張することができる、[Chrome デベロッパー ツール拡張](https://developer.chrome.com/extensions/devtools) をサポートしています。

## デベロッパー ツール拡張の読み込み方法

このドキュメントは手動で拡張機能を読み込むためのプロセスを概説します。 Chrome ウェブストアから直接拡張機能をダウンロードするサードパーティ製のツール、[electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer) を試すこともできます。

Electron に拡張をロードするには、Chrome ブラウザでそれをダウンロードし、そのファイルシステムパスを見つけてから、`BrowserWindow.addDevToolsExtension(extension)` API を呼び出してそれを読み込む必要があります。

以下は [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) を使用する例です。

1. それを Chrome ブラウザでインストールします。
1. `chrome://extensions` に移動し、`fmkadmapgofadopljbjfkapdkoienihi` のようなハッシュ文字列であるそれの拡張 ID を探します。
1. 拡張機能を保存するために Chrome が使用するファイルシステムの場所を調べます。
   * Windows では `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` です。
   * Linux では以下のいずれかになります。
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * macOS では `~/Library/Application Support/Google/Chrome/Default/Extensions` になります。
1. 拡張の場所を `BrowserWindow.addDevToolsExtension` API に渡します。React Developer Tools の場合は、以下のようになります。
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**注:** `BrowserWindow.addDevToolsExtension` API は、app モジュールの ready イベントが発生する前に呼び出すことはできません。

拡張機能は記憶されるため、この API は拡張に付き一度しか呼び出す必要はありません。 既にロードされている拡張機能を追加しようとした場合、このメソッドは何も返さず、代わりにコンソールに警告を出力します。

### デベロッパーツール拡張機能を削除する方法

それを削除するには `BrowserWindow.removeDevToolsExtension` API にその拡張機能の名前を渡すことでできます。 `BrowserWindow.addDevToolsExtension` で拡張機能の名前が返され、`BrowserWindow.getDevToolsExtension` API を用いてインストールされたデベロッパーツール拡張機能らの名前を取得できます。

## サポートされているデベロッパー ツール拡張

Electron は限られた `chrome.*` API しかサポートしていないため、Chrome 拡張機能のうちサポートされていない `chrome.*` API を使用している拡張は機能しないかもしれません。 以下のデベロッパー ツール拡張は Electron で動作することがテストされ保証されています。

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### デベロッパー ツール拡張が機能していない場合はどうすればいいですか?

まずは拡張機能がまだメンテナンスされていることを確認してください。最近のバージョンの Chrome ブラウザでも機能しない拡張機能もあります。それらの機能は実行できません。

それから、Electron の issue リストにバグを報告し、拡張のどの部分が期待通りに動作していないかを説明してください。
