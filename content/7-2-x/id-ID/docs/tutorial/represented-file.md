# File yang direpresentasikan untuk BrowserWindows macOS

Pada macOS, sebuah jendela dapat mengatur file yang diwakilinya, sehingga ikon file dapat ditampilkan judul bar dan saat pengguna Command-Click atau Control-Click pada judul path popup akan muncul.

Anda juga dapat mengatur keadaan diedit dari jendela sehingga ikon file dapat menunjukkan apakah dokumen di jendela ini telah dimodifikasi.

__Mewakili menu data popup:__

![Represented File](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

Untuk mengatur file jendela yang terwakili, Anda bisa menggunakan [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) dan [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
