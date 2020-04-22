# Представленный файл для macOS BrowserWindows

В macOS, Window может установить свой представленный файл так, что иконка файла появится в заголовке и, когда пользователи нажмут кнопки Command-Click или Control-Click в заглавии, выскачет всплывающее сообщение с адресом.

Можно также установить изменённое состояние окна так, что иконка файла будет указывать, что документ в этом окне был изменён.

__Представленный файл вспывающего меню:__

![Представленный файл](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Для установления представленного файла можно использовать [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) и [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
