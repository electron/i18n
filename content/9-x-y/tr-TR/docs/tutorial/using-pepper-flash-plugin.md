# Pepper Flash Eklentisini Kullanma

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Flash Eklentisinin Bir Kopyasını Oluştur

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Electron'un konumu ve sürümü Pepper Flash desteği için kullanışlıdır. Ayrıca başka bir yere kopyalayabilirsiniz.

## Electron değişimi ekleyin

`--ppapi-flash-path` ve `--ppapi-flash-version`'u Electron komut satırına doğrudan veya `app.commandLine.appendSwitch` yöntemiyle uygulamanın hazır olayından önce ekleyebilirsiniz. Ayrıca `BrowserWindow` 'un `eklentilerini` etkinleştirin.

Örneğin:

```javascript
const { app, BrowserWindow } = require('electron') 
const path = require('path') 

// Flash yolunu, main.js ile aynı rehberde olduğu takdirde belirle.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer.dll'
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
  case 'linux':
    pluginName = 'libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optional: Specify flash version, for example, v17.0.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')

app.whenReady().then(() => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true
    }
  })
  win.loadURL(`file://${__dirname}/index.html`)
  // Something else
})
```

Ayrıca, gönderim yerine sistem genelinde Pepper Flash eklentisi yüklemeyi deneyebilirsiniz. Eklentileri kendiniz, çağırarak yolunu alabilirsiniz. `app.getPath('pepperFlashSystemPlugin')`.

## Flash Eklentisini `<webview>` Etiketinde Etkinleştir

`plugins` özniteliğini `<webview>` etiketine ekleyin.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Arıza giderme

Devtools konsolundaki `navigator.plugins` 'i inceleyerek Pepper Flash eklentisinin yüklenip yüklenmediğini kontrol edebilirsiniz (ancak eklentinin yolunun doğru olup olmadığını anlayamazsınız).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

RTMP kullanan eş zamanlı medya gibi bazı işlemler için, oynatıcıların `.swf` dosyalarına daha geniş izinler vermeniz gerekir. Bunu gerçekleştirmenin bir yolu, [nw-flash-trust](https://github.com/szwacz/nw-flash-trust)'ı kullanmaktır.
