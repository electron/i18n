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

Setting the parameter to negative values (e.g. `-1`) will remove the progress bar. Setting it to a value greater than `1` will indicate an indeterminate progress bar in Windows or clamp to 100% in other operating systems. An indeterminate progress bar remains active but does not show an actual percentage, and is used for situations when you do not know how long an operation will take to complete.

[より多くのオプションやモードについては API ドキュメント][setprogressbar] を参照してください。

## サンプル

In this example, we add a progress bar to the main window that increments over time using Node.js timers.

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
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c)

    // increment or reset progress bar
    if (c < 2) c += INCREMENT
    else c = 0
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// before the app is terminated, clear both timers
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

After launching the Electron application, the dock (macOS) or taskbar (Windows, Unity) should show a progress bar that starts at zero and progresses through 100% to completion. It should then show indeterminate (Windows) or pin to 100% (other operating systems) briefly and then loop.

![macOS Dock プログレスバー](../images/dock-progress-bar.png)

macOS の場合、[Mission Control](https://support.apple.com/en-us/HT204100) の使用中でもアプリケーションのプログレスバーが表示されます。

![Mission Control プログレスバー](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
