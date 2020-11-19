# Reprezentowany plik dla macOS BrowserWindows

## Przegląd

On macOS, you can set a represented file for any window in your application. The represented file's icon will be shown in the title bar, and when users `Command-Click` or `Control-Click`, a popup with a path to the file will be shown.

![Reprezentowany plik][1]

> NOTE: The screenshot above is an example where this feature is used to indicate the currently opened file in the Atom text editor.

You can also set the edited state for a window so that the file icon can indicate whether the document in this window has been modified.

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs.

## Przykład

Zaczynając od działającej aplikacji z [Poradnika szybkiego startu](quick-start.md), dodaj następujące linie do pliku `main.js`:

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
