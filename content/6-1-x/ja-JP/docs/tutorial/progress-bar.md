# タスクバーで示すプログレスバー (Windows, macOS, Unity)

Windows ではのタスクバーのボタンにはプログレスバーを表示できます。 これによって、ユーザーがウィンドウの切り替え操作をすることなく、ユーザーに進捗情報を提供することが可能となります。

macOS でのプログレスバーは、Dock のアイコンの一部として表示されます。

Unity DE にも同様の機能があり、ランチャー内でプログレスバーの提供を可能にすることができます。

__タスクバーのボタンにプログレスバーを表示する__

![タスクバーのプログレスバー](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

これら3つのケースは全て同じAPI - `BrowserWindows` のインスタンスに存在する `setProgressBar()` 関数によって変換されます。 プログレスを示すためにこれを `0` ～ `1`の数値で呼びます。 長い間実行するタスクがある場合、それが今のところ完了に対して 63% であるならば `setProgressBar(0.63)` を呼びます。

一般的に、パラメーターを 0 未満の値 (`-1` など) にすると、プログレスバーが削除されます。1 より大きい値 (`2` など) にすると、プログレスバーが中間モードに切り替わります。

[より多くのオプションやモードについては API ドキュメント](../api/browser-window.md#winsetprogressbarprogress) を参照してください。

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```
