# ダークモード

## 概要

### ネイティブインターフェースの自動更新

"ネイティブインターフェース" は、ファイルピッカー、ウィンドウの境界線、ダイアログ、コンテキストメニューなどの、アプリではなく OS 由来の UI のことです。 デフォルトでは OS からこの自動テーマ設定をオプトインする動作です。

### 自作インターフェイスの自動更新

アプリに独自のダークモードがある場合は、システムのダークモード設定と同期してオンとオフを切り替える必要があります。 これは、[prefer-color-scheme][] CSS メディアクエリを使用するとできます。

### 自作インターフェイスの手動更新

ライト/ダークモードを手動で切り替えたい場合は、`nativeTheme` モジュールの [themeSource](../api/native-theme.md#nativethemethemesource) プロパティで希望するモードを設定するとできます。 このプロパティの値はレンダラープロセスに伝播します。 `prefers-color-scheme` に関連する CSS ルールは、それに応じて更新されます。

## macOS での設定

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード][system-wide-dark-mode] を全ての macOS コンピュータに導入しました。 あなたの Electron アプリにダークモードがある場合、[`nativeTheme` API](../api/native-theme.md) を使用してシステム全体のダークモード設定に従うようにできます。

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 Catalina 上のこのモードで `nativeTheme.shouldUseDarkColors` と `Tray` API を正しく動作させるには、Electron `>=7.0.0` を使用するか、古いバージョンの場合は `Info.plist` ファイルの `NSRequiresAquaSystemAppearance` を `false` に設定する必要があります。 [Electron Packager][electron-packager] と [Electron Forge][electron-forge] の両方には [`darwinDarkModeSupport` オプション][packager-darwindarkmode-api] があり、アプリビルド時の `Info.plist` の変更を自動化します。

Electron &gt; 8.0.0 を使用中でオプトアウトしたい場合は、`Info.plist` ファイルの `NSRequiresAquaSystemAppearance` キーを `true` に設定する必要があります。 Electron 8.0.0 以降では macOS 10.14 SDK を使用するため、このテーマ設定をオプトアウトすることはできません。ご注意ください。

## サンプル

[クイックスタートガイド](quick-start.md) 内の作業用アプリケーションから始め、徐々に機能を追加してくことにします。

まず、ユーザーがライトモードとダークモードを切り替えられるようにインターフェイスを編集してみましょう。  この基本的な UI には、`nativeTheme.themeSource` の設定を変更するボタンと、選択している `themeSource` の値を示すテキスト要素を含めます。 デフォルトでは Electron はシステムのダークモード設定に従うので、テーマソースを "System"とハードコーディングします。

`index.html` ファイルに以下のコードを追加します。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
    <link rel="stylesheet" type="text/css" href="./styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <p>Current theme source: <strong id="theme-source">System</strong></p>

    <button id="toggle-dark-mode">Toggle Dark Mode</button>
    <button id="reset-to-system">Reset to System Theme</button>

    <script src="renderer.js"></script>
  </body>
</body>
</html>
```

次に、[イベントリスナー](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) を追加して切り替えボタンの `click` イベントをリッスンします。 `nativeTheme` モジュールはメインプロセスでのみ公開されているため、IPC を使用してメインプロセスにメッセージを送信したりメインプロセスからの応答をハンドリングしたりするために、各リスナーのコールバックを設定する必要があります。

* "Toggle Dark Mode" ボタンをクリックすると、`dark-mode:toggle` メッセージ (イベント) を送信してメインプロセスにテーマ変更のトリガーを伝え、メインプロセスからのレスポンスに基づいて UI 内の "Current Theme Source" ラベルを更新します。
* "Reset to System Theme" ボタンがクリックされると、メインプロセスにシステムの配色を使用するように指示するために `dark-mode:system` メッセージ (イベント) を送信し、"Current Theme Source" ラベルを`System` に更新します。

リスナーとハンドラーを追加するため、`renderer.js` ファイルに以下のコードを追加します。

```javascript
const { ipcRenderer } = require('electron')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await ipcRenderer.invoke('dark-mode:system')
  document.getElementById('theme-source').innerHTML = 'System'
})
```

この時点でコードを実行しても、ボタンがまだ何もしないことがわかるでしょう。さらに、ボタンをクリックするとメインプロセスはこのようなエラーを出力します。`Error occurred in handler for 'dark-mode:toggle': No handler registered for 'dark-mode:toggle'` これは想定内です。実際にはまだ `nativeTheme` のコードに触れていません。

これでレンダラー側からの IPC への接続は完了したので、次はレンダラープロセスからのイベントを処理するように `main.js` ファイルを更新します。

受信したイベントに応じて [`nativeTheme.themeSource`](../api/native-theme.md#nativethemethemesource) プロパティを更新して、システムのネイティブ UI 要素 (コンテキストメニューなど) に希望のテーマを適用し、設定のカラースキームをレンダラープロセスに伝播します。

* `dark-mode:toggle` を受信したときに、`nativeTheme.shouldUseDarkColors` プロパティを使って、現在ダークテーマが有効かどうかを確認し `themeSource` を逆のテーマに設定します。
* `dark-mode:system` を受信したときに、`themeSource` を `system` にリセットします。

```javascript
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSouce = 'system'
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

最後のステップとして、[`prefers-color-scheme`][prefer-color-scheme] CSS 属性を利用して、UI のウェブ部分でダークモードが有効になるようにスタイルを少し追加します。 `prefers-color-scheme` の値は `nativeTheme.themeSource` の設定に従います。

`styles.css` ファイルを作成して以下の行を追加します。

```css fiddle='docs/fiddles/features/macos-dark-mode'
@media (prefers-color-scheme: dark) {
  body { background:  #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background:  #ddd; color: black; }
}
```

これで、Electron アプリケーションを起動した後に、対応するボタンをクリックしてモードを変更したり、テーマをシステムデフォルトにリセットしたりできます。

![ダークモード](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[prefer-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
