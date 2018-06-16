# Görev çubuğunda ilerleme göstergesi (Windows, macOS, Unity)

Windows işletim sisteminde, ilerleme göstergesi görev çubuğu butonuna basılarak erişilebilir. Bu sayede kullanıcı pencereler arasında geçiş yapmak zorunda kalmadan ilerlemeyi görebilir.

MacOS üzerinde ilerleme çubuğu dock simgesinin bir parçası olarak görüntülenir.

Unity DE aynı zamanda başlatıcıda ki ilerleme çubuğunu belirlemenizi sağlayan benzer bir özelliğe sahiptir.

**ilerleme çubuğu düğmesindeki görev çubuğu düğmesi:**

![Görev çubuğu ilerleme çubuğu](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```