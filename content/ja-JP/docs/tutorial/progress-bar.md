# タスクバーで示すプログレスバー (Windows, macOS, Unity)

## 概要

プログレスバーは、ユーザーがウィンドウの切り替え操作をすることなくユーザーに進捗情報を提供できます。

Windows では、タスクバーのボタンにプログレスバーを表示できます。

![Windows プログレスバー][1]

macOS では、Dock のアイコンの一部としてプログレスバーを表示します。

![macOS プログレスバー][2]

Linux では、Unity のグラフィカルインターフェイスにも同様の機能があり、ランチャー内でプログレスバーを指定できます。

![Linux プログレスバー][3]

> 注意: Windows では各ウィンドウごとにプログレスバーを保有できますが、macOS と Linux (Unity) ではアプリケーションのプログレスバーが 1 つだけです。

----

[`setProgressBar()`][setprogressbar] メソッドは、`BrowserWindow` のインスタンスから利用できます。 進捗状況を示すには、`0` から `1` の間の数でこのメソッドを呼び出します。 例えば、現在完了までの進捗率が 63% に達している長期のタスクがある場合、`setProgressBar(0.63)` のように呼び出します。

引数を負の値 (例: `-1`) にすると、プログレスバーが取り除かれます。 `1` より大きい値にすると、Windows では不定のプログレスバーが表示され、他のオペレーティングシステムでは 100% に切り詰められます。 不定のプログレスバーはアクティブな状態を維持しますが、実際のパーセンテージは表示されません。これは、操作が完了するまでの時間がわからない場合に使用します。

[より多くのオプションやモードについては API ドキュメント][setprogressbar] を参照してください。

## サンプル

この例では、Node.js のタイマーを使って時間経過で増えるプログレスバーをメインウインドウに追加しています。

```javascript fiddle='docs/fiddles/features/progress-bar'
const { app, BrowserWindow } = require('electron')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // プログレスバーを次の値へと更新する
    // 0 から 1 の値は進捗状況を示し、1 より大きい値は不定または 100% で留まります。
    win.setProgressBar(c)

    // プログレスバーの増加またはリセット
    if (c < 2) c += INCREMENT
    else c = 0
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// アプリが終了される前に、両方のタイマーを消去
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

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

Electron アプリケーションを起動すると、Dock (macOS) またはタスクバー (Windows、Unity) にプログレスバーが表示され、0 から始まり 100% で完了します。 その後、不定の表示 (Windows) や 100% で留まった表示 (他のオペレーティングシステム) が短時間表示され、ループします。

![macOS Dock プログレスバー](../images/dock-progress-bar.png)

macOS の場合、[Mission Control](https://support.apple.com/en-us/HT204100) の使用中でもアプリケーションのプログレスバーが表示されます。

![Mission Control プログレスバー](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
