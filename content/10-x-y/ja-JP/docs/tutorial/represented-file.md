# macOS の BrowserWindow が表すファイル

macOS では、ウインドウが表すファイルを設定できます。ファイルのアイコンはタイトルバーに表示され、ユーザがタイトルを Command クリックまたは Control クリックするとパスのポップアップが表示されます。

ウインドウのドキュメントが変更されたことをファイルアイコンが示せるように、ウインドウの編集状態を設定することもできます。

__ウインドウが表すファイルのポップアップメニュー:__

![ウインドウが表すファイル][1]

ウインドウが表すファイルを設定するには、[BrowserWindow.setReprepresentFilename][setrepresentedfilename] および [BrowserWindow.setDocumentEdited][setdocumentedited] API を使用できます。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
