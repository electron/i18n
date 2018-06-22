# टास्कबार में प्रगति बार (विंडोज, मैकओएस, यूनिटी)

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

मैकओएस पर प्रगति बार डॉक आइकॉन के एक हिस्से के रूप में दिखाई देगी |

यूनिटी डीई के पास भी एक ऐसा ही फीचर है जिससे आपको लांचर में प्रगति बार निर्दिष्ट करने की सुविधा मिलती है |

**टास्कबार बटन में प्रगति बार:**

![टास्कबार प्रगति बार](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](../api/browser-window.md#winsetprogressbarprogress).

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```