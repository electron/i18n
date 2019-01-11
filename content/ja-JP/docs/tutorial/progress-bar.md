# タスクバーで示すプログレスバー (Windows, macOS, Unity)

Windowsでは、タスクバーのボタンにプログレスバーを表示できます。 これによって、ユーザーがウィンドウの切り替え操作をすることなく、ユーザーに進捗情報を提供することが可能となります。

Mac OSでは、プログレスバーはドックアイコンの一部に表示されます。

Unity DEでは、ランチャーでプログレスバーの指定を可能にするための同様の機能もあります。

**タスクバーのボタンにプログレスバーを表示する**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

これら3つのケースは全て同じAPI - `BrowserWindows` のインスタンスに存在する `setProgressBar()` 関数によって変換されます。 プログレスを示すためにこれを `0` ～ `1`の数値で呼びます。 If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```