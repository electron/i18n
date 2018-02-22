# Represented File for macOS BrowserWindows

MacOS'taki bir pencere temsil edilen dosyasını ayarlayabilir, böylelikle dosyanın simgesi başlık çubuğunda gösterilebilir ve kullanıcılar Komut Tuşu'na veya Kontrol Tuşu'na tıkladığında açılır.

Bir pencerenin düzenlenmiş durumunu ayarlayabilirsiniz, böylece dosya simgesi bu penceredeki belgenin değiştirilmiş olup olmadığını gösterebilir.

**Temsil dosya açılan menüsü:**

![Represented File](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Gösterilen pencerenin dosyasını ayarlamak için [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) ve [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) API'lerini kullanabilirsiniz:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```