# File na nagrerepresenta sa macOS BrowserWindows

Sa macOS, ang isang window ay pwedeng magtakda ng nirerepresentang file, upang ang icon nito ay lalabas sa title bar, at kung ang mga gumagamit ay nag Command-Click o Control-Click sa titulo, ang isang path popup ay lalabas.

Pwede mo ring itakda ang binagong katayuan ng isang window upang ang file icon ay makapagpakita na ang dokumento sa window nito ay nabago na.

__Narepresentang menu ng file popup:__

![Represented File](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Upang itakda ang narepresentang file ng window, pwede mong gamitin ang [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) at [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) na mga API:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
