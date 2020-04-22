# Индикатор прогресса в меню задач (Windows, macOS, Unity)

В Windows можно использовать иконку в меню задач для отображения индикатора прогресса. Это позволяет окну предоставлять информацию пользователю без надобности переключения на окно самостоятельно.

На macOS progress bar будет отображаться как часть значка в dock.

В Unity DE присутствует схожая особенность, которая позволит вам отобразить индикатор прогресса в лаунчере.

__Индикатор прогресса в меню задач:__

![Индикатор прогресса в меню задач](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

Просмотрите [документацию по API для большего количества опций и режимов](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```
