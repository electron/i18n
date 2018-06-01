# 작업 표시줄 안의 프로그레스 바 (Windows, macOS, Unity)

Windows에서는 작업 표시줄 버튼을 사용하여 진행 표시줄을 표시할 수 있습니다. 이를 통해 윈도우를 전환할 필요 없이 사용자에게 진행률 정보를 제공할 수 있습니다.

macOS에선 프로그레스바가 dock 아이콘의 일부에 표시됩니다.

또한 Unity DE도 런처에 프로그레스 바를 부착할 수 있습니다.

**작업 표시줄 버튼의 프로그레스 바:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

세가지 경우 모두 같은 API인 `BrowserWindows` 인스턴스의 `setProgressBar()` 메소드로 처리됩니다. 진행 상황을 나타내기 위해 ``~`1` 사이의 파라메터로 메소드를 호출하십시요. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```