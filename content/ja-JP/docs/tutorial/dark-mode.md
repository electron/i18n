# ダークモード

## 概要

### ネイティブインターフェースの自動更新

"ネイティブインターフェース" は、ファイルピッカー、ウィンドウの境界線、ダイアログ、コンテキストメニューなどの、アプリではなく OS 由来の UI のことです。 デフォルトでは OS からこの自動テーマ設定をオプトインする動作です。

### 自作インターフェイスの自動更新

アプリに独自のダークモードがある場合は、システムのダークモード設定と同期してオンとオフを切り替える必要があります。 これは、[prefer-color-scheme] CSS メディアクエリを使用することで可能です。

### 自作インターフェイスの手動更新

ライト/ダークモードを手動で切り替えたい場合は、`nativeTheme` モジュールの [themeSource](../api/native-theme.md#nativethemethemesource) プロパティで希望するモードを設定するとできます。 このプロパティの値はレンダラープロセスに伝播します。 `prefers-color-scheme` に関連する CSS ルールは、それに応じて更新されます。

## macOS での設定

macOS 10.14 Mojave にて、Apple は新しい [システム全体のダークモード][system-wide-dark-mode] を全ての macOS コンピュータに導入しました。 あなたの Electron アプリにダークモードがある場合、[`nativeTheme` API](../api/native-theme.md) を使用してシステム全体のダークモード設定に従うようにできます。

macOS 10.15 Catalina にて、Apple は新しい "自動" ダークモードオプションを全ての macOS コンピュータに導入しました。 Catalina 上のこのモードで `nativeTheme.shouldUseDarkColors` と `Tray` API を正しく動作させるには、Electron `>=7.0.0` を使用するか、古いバージョンの場合は `Info.plist` ファイルの `NSRequiresAquaSystemAppearance` を `false` に設定する必要があります。 [Electron Packager][electron-packager] と [Electron Forge][electron-forge] の両方には [`darwinDarkModeSupport` オプション][packager-darwindarkmode-api] があり、アプリビルド時の `Info.plist` の変更を自動化します。

Electron &gt; 8.0.0 を使用中でオプトアウトしたい場合は、`Info.plist` ファイルの `NSRequiresAquaSystemAppearance` キーを `true` に設定する必要があります。 Electron 8.0.0 以降では macOS 10.14 SDK を使用するため、このテーマ設定をオプトアウトすることはできません。ご注意ください。

## サンプル

ここでは、`nativeTheme` から派生したテーマカラーになる Electron アプリケーションの例を示します。 加えて、IPC チャンネルを利用したテーマの切り替えとリセットの制御もできます。

```javascript fiddle='docs/fiddles/features/macos-dark-mode'

```

### これはどのように動作しているのでしょうか？

`index.html` ファイルから見ていきましょう。

```html title='index.html'
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

そして `style.css` ファイルです。

```css title='style.css'
@media (prefers-color-scheme: dark) {
  body { background: #333; color: white; }
}

@media (prefers-color-scheme: light) {
  body { background: #ddd; color: black; }
}
```

この例では、一対の要素を持つ HTML ページを描画しています。 `<strong id="theme-source">` 要素は現在選択されているテーマを示すもので、2 つの `<button>` 要素は制御用です。 CSS ファイルでは、[`prefers-color-scheme`][prefers-color-scheme] のメディアクエリを使用して `<body>` 要素の背景色とテキスト色を設定しています。

`preload.js` スクリプトで、`window` オブジェクトに `darkMode` という新しい API を追加します。 この API は、`'dark-mode:toggle'` と `'dark-mode:system'` の 2 つの IPC チャンネルをレンダラープロセスへ公開します。 また、レンダラープロセスからのメッセージをメインプロセスに渡すため、`toggle` と `system` の 2 つのメソッドも代入しています。

```js title='preload.js'
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
```

これで、レンダラープロセスはメインプロセスと安全に通信し、`nativeTheme` オブジェクトに必要な変更操作ができます。

`renderer.js` ファイルは、`<button>` の機能を制御する役割を担います。

```js title='renderer.js'
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})
```

`addEventListener` を使って、`renderer.js` ファイルで `'click'` [イベントリスナー][event-listeners] を各ボタン要素に追加します。 各イベントリスナーハンドラーには、それぞれの `window.darkMode` API メソッドの呼び出しをさせます。

最後に、`main.js` ファイルでメインプロセスを記述し、実際の `nativeTheme` の API を入れます。

```js
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
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
    nativeTheme.themeSource = 'system'
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

`ipcMain.handle` メソッドは、HTML ページ上のボタンからのクリックイベントに対して、メインプロセスが応答する手段となります。

`'dark-mode:toggle'` IPC チャンネルハンドラーのメソッドは、`shouldUseDarkColors` 真偽値型プロパティを確認して対応する `themeSource` を設定し、現在の `shouldUseDarkColors` プロパティを返します。 この IPC チャンネルに対応するレンダラープロセスのイベントリスナーへと戻って見てみると、このハンドラーの戻り値を利用して `<strong id='theme-source'>` 要素に正しいテキストを代入しています。

`'dark-mode:system'` IPC チャンネルハンドラーのメソッドは、文字列`'system'` を `themeSource` に割り当てるだけで何も返しません。 これは対応するレンダラープロセスのイベントリスナーにも言えることで、このメソッドは戻り値が期待できない状態で待機しています。

Electron Fiddle を使ってサンプルを実行してみましょう。"Toggle Dark Mode" ボタンをクリックすると、アプリの背景色が明るくなったり暗くなったりするでしょう。

![ダークモード](../images/dark_mode.gif)

[system-wide-dark-mode]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/
[electron-forge]: https://www.electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[packager-darwindarkmode-api]: https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html#darwindarkmodesupport
[prefers-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[event-listeners]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
