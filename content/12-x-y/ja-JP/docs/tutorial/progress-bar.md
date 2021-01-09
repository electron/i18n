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

パラメータを負の値 (例えば `-1`) に設定するとプログレスバーは削除されますが、`1`より大きい値 (例えば `2`) に設定するとプログレスバーは不定モード (Windows のみ -- これ以外は 100% に切り捨てられます) に切り替わります。 このモードではプログレスバーはアクティブなままですが、実際のパーセンテージが表示されません。 このモードは、操作完了までの時間がわからない場合に使用します。

[より多くのオプションやモードについては API ドキュメント][setprogressbar] を参照してください。

## サンプル

[クイックスタートガイド](quick-start.md)の作業アプリケーションから始めて、次の行を `main.js` ファイルに追加します。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

Electron アプリケーションを起動すると、Dock (macOS) またはタスクバー (Windows、Unity) にバーが表示され、設定した進捗率が表示されます。

![macOS Dock プログレスバー](../images/dock-progress-bar.png)

macOS の場合、[Mission Control](https://support.apple.com/en-us/HT204100) の使用中でもアプリケーションのプログレスバーが表示されます。

![Mission Control プログレスバー](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
