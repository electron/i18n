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

## V8 クラッシュ

V8 コンテキストがクラッシュした場合、デベロッパー ツールにこのメッセージが表示されます。

`デベロッパー ツールはページから切断されました。 ページをリロードすれば、デベロッパー ツールは自動で再接続します。`

Chromium のログは `ELECTRON_ENABLE_LOGGING` 環境変数を介して有効にできます。 詳しい情報は [環境変数ドキュメント](https://www.electronjs.org/docs/api/environment-variables#electron_enable_logging) を参照してください。

代替として、`--enable-logging` コマンドライン引数を渡すことでもできます。 詳しい情報は [コマンドラインスイッチドキュメント](https://www.electronjs.org/docs/api/command-line-switches#--enable-logging) を参照してください。
