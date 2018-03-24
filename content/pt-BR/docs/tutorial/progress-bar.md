# Barra de Progresso na Barra de Tarefas (Windows, macOS, Unity)

No Windows um botão na barra de tarefas pode ser usado para exibir uma barra de progresso. This enables a window to provide progress information to the user without the user having to switch to the window itself.

No macOS a barra de progresso vai ser exibida em uma parte do dock.

O Unity DE também possuir uma função semelhante, permite você especificar a barra de progresso em uma parte do launcher.

**Barra de progresso em um botão da barra de tarefas:**

![Barra de Progresso](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```