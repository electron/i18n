# アプリケーションのデバッグ

Electron アプリケーションが望むように動作しないときは、デバッグツール一式がコーディングエラー、パフォーマンスのボトルネック、最適化の機会を見つけるのに役立つかもしれません。

## レンダラープロセス

個々のレンダラープロセスをデバッグするための最も包括的なツールは、Chromium Developer Toolset です。 `BrowserWindow`、`BrowserView`、`WebView` のインスタンスを含むすべてのレンダラープロセスに対して利用可能です。 インスタンスの `webContents` 上で `openDevTools()` APIを呼ぶことで、プログラムで開くことができます。

```javascript
const { BrowserWindow } = require('electron')

let win = new BrowserWindow()
win.webContents.openDevTools()
```

Google は [開発者向けツールの優れたドキュメント](https://developer.chrome.com/devtools) を提供しています。 通常、Electron 開発者のツールベルトの中で最も強力なユーティリティの1つです。自分自身に慣れさせることを推奨します。

## メインプロセス

メインプロセスのデバッグは少し難解です。なぜなら、開発者向けツールで開くことができないからです。 Google / Chrome と Node.js の緊密なコラボレーションのおかげで、Chromium デベロッパーツールを使用して [Electron のメインプロセスをデバッグする](https://nodejs.org/en/docs/inspector/) ことができます。しかし、コンソールに`require` が存在しないなどの奇妙な問題が発生する可能性があります。

より詳しい情報は、[メインプロセスのデバッグのドキュメント](./debugging-main-process.md) を参照してください。

## V8 Crashes

If the V8 context crashes, the DevTools will display this message.

`DevTools was disconnected from the page. Once page is reloaded, DevTools will automatically reconnect.`

Chromium logs can be enabled via the `ELECTRON_ENABLE_LOGGING` environment variable. For more information, see the [environment variables documentation](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging).

Alternatively, the command line argument `--enable-logging` can be passed. More information is available in the [command line switches documentation](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging).