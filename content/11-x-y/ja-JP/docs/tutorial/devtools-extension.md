# デベロッパー ツール拡張

Electron は [Chrome デベロッパー ツール拡張][devtools-extension] をサポートしています。これは人気ウェブフレームワークのデバッグ向けに Chrome デベロッパー ツールを拡張できます。

## ツールを使ったデベロッパー ツール拡張の読み込み

デベロッパー ツール拡張を読み込む最も簡単な方法は、サードパーティ製ツールで手順を自動化することです。 [electron-devtools-installer][electron-devtools-installer] はこれを行うにあたって人気の NPM パッケージです。

## 手動でのデベロッパー ツール拡張の読み込み

ツールを使う手段をお望みでない場合は、必要な作業すべてを手で行うこともできます。 Electron で拡張機能を読み込むには、Chrome でそれをダウンロードして、そのファイルシステムのパスを探し、[`ses.loadExtension`] API を呼び出して [Session][session] にロードします。

以下は [React Developer Tools][react-devtools] を使用する例です。

1. Google Chrome で拡張機能をインストールします。
1. `chrome://extensions` に移動し、`fmkadmapgofadopljbjfkapdkoienihi` のようなハッシュ文字列であるそれの拡張 ID を探します。
1. Chrome が拡張機能の保存に使用している、ファイルシステムの場所を調べます。
   * Windows では `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` です。
   * Linux では以下のいずれかになります。
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * macOS では `~/Library/Application Support/Google/Chrome/Default/Extensions` になります。
1. 拡張機能の場所を[`ses.loadExtension`][load-extension] API に渡します。 React Developer Tools `v4.9.0` の場合、以下のようになります。
   ```javascript
    const { app, session } = require('electron')
    const path = require('path')
    const os = require('os')

    // macOS の場合
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0'
    )

    app.whenReady().then(async () => {
      await session.defaultSession.loadExtension(reactDevToolsPath)
    })
   ```

**注釈:**

* `loadExtension` は [Extension オブジェクト][extension-structure] の Promise を返します。これには、読み込まれた拡張機能についてのメタデータが含まれます。 この Promise はページ読み込み前に (`await` 式などで) 解決する必要があります。 さもなくば、拡張の読み込みは保証されません。
* `loadExtension` は、`app` モジュールの `ready`イベントが発生する前には呼び出せず、インメモリ (非永続) セッションでも呼び出せません。
* 拡張機能を読み込みたい場合は、アプリを起動するたびに `loadExtension` を呼び出す必要があります。

### デベロッパー ツール拡張の除去

拡張の ID を [`ses.removeExtension`][remove-extension] API に渡すことで、Session から拡張を削除できます。 これにより、読み込んだ拡張がアプリの次回起動時にも保持されることはなくなります。

## デベロッパー ツール拡張サポート

Electron は [`chrome.*` API のうち限られたいくつか][supported-extension-apis] のみをサポートしています。未サポートの `chrome.*` API を使用した拡張機能は動作しない可能性があります。

以下のデベロッパー ツール拡張は Electron での動作がテストされています。

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### デベロッパー ツール拡張が動作しない場合はどうすればいいですか?

まず、拡張がメンテナンスされていて、最新の Google Chrome と互換性があるかどうかを確認してください。 未サポートの拡張については、さらなるサポートを提供できません。

拡張機能が Chrome で動作しているのに Electron で動作しない場合は、Electron の [Issue トラッカー][issue-tracker] にバグ報告し、拡張機能のどの部分が期待通りに動作しないかをご説明ください。

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[session]: ../api/session.md
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
