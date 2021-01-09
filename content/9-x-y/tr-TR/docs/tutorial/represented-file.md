# Represented File for macOS BrowserWindows

MacOS'taki bir pencere temsil edilen dosyasını ayarlayabilir, böylelikle dosyanın simgesi başlık çubuğunda gösterilebilir ve kullanıcılar Komut Tuşu'na veya Kontrol Tuşu'na tıkladığında açılır.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

__Represented file popup menu:__

![Represented File][1]

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
