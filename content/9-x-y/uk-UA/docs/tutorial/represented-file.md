# Представлення Файлу для macOS BrowserWindows

На macOS вікно може встановити його представлений файл, таким чином іконка файлу може відображатися в заголовку панелі і коли користувачі натиснуть кнопку "Команди" або "Control-Click на заголовок, який розташований шлях буде показано.

Ви також можете встановити відредагований стан вікна, щоб значок файлу міг позначити чи документ в цьому вікні було змінено.

__Представлення спливаючого меню файлів:__

![Представлення файлу][1]

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename][setrepresentedfilename] and [BrowserWindow.setDocumentEdited][setdocumentedited] APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
