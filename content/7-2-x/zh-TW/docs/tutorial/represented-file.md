# macOS BrowserWindows 的代表檔案

在 macOS 中，可以設定視窗的代表檔案，那個檔案的圖示就會顯示在標題列中，使用者按住 Command 或 Control 再點擊標題，就會顯示路徑	快顯選單。

你也可以設定視窗的編輯狀態，就可以由檔案圖示分辨出文件是否在這個視窗中修改過。

__代表檔案快顯選單:__

![Represented File](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

要設定視窗的代表檔案可以使用 [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) 及 [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) API:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
