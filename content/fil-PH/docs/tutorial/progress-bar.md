# Ang Progress Bar sa Taskbar (Windows, macOS, Unity)

On Windows a taskbar button can be used to display a progress bar. Ito ay nagbibigay ng window para sa pagkita ng kaulranan sa impormasyon patungo sa gumagamit na hindi nangangailangan pumili pa ng ibang window ang gumagamit.

Sa macOs, ang progress bar ay maipapakita bilang isang bahagi ng dock icon.

Ang Unity DE ay mayroon ding kaparehas na katangian na nagpapahintulot nito na itukoy ang progress bar sa launcher.

**Progress bar sa taskbar na pipindutin:**

![Progress bar ng Taskbar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Sa madaling salita, ang pagsetup ng parameter patungo sa isang halaga mababa pa sa zero (halimbawa `-1`) ay makakauha sa progress bar habang isiniset ito sa mas mataas na halaga maliban sa isa (halimbawa `-1`) ay makakaiba sa progress bar patungo sa intermediate mode.

Tingnan ang [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```