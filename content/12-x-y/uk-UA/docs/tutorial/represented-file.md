# Представлення Файлу для macOS BrowserWindows

## Огляд

On macOS, you can set a represented file for any window in your application. The represented file's icon will be shown in the title bar, and when users `Command-Click` or `Control-Click`, a popup with a path to the file will be shown.

![Представлення файлу][1]

> NOTE: The screenshot above is an example where this feature is used to indicate the currently opened file in the Atom text editor.

You can also set the edited state for a window so that the file icon can indicate whether the document in this window has been modified.

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs.

## Приклад

Починаючи з робочого додатку з [Короткого Путівника](quick-start.md), додайте наступні рядки у файл `main.js`:

```javascript
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEdited(true)
})
```

After launching the Electron application, click on the title with `Command` or `Control` key pressed. You should see a popup with the file you just defined:

![Represented file](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
