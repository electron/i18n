# タスクバーで示すプログレスバー (Windows, macOS, Unity)

Windowsでは、タスクバーのボタンにプログレスバーを表示できます。 これによって、ユーザーがウィンドウの切り替え操作をすることなく、ユーザーに進捗情報を提供することが可能となります。

Mac OSでは、プログレスバーはドックアイコンの一部に表示されます。

The Unity DE also has a similar feature that allows you to specify the progress bar in the launcher.

**タスクバーのボタンにプログレスバーを表示する**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```