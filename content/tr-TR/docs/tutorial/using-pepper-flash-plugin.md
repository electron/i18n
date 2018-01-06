# Pepper Flash Eklentisini Kullanma

Electron biber flash eklentisine destek verir. Biber eklentisini Elektronda kullanmak için, biber eklentisinin yerini el ile uygulamanıza eklemeniz gerekir.

## Flash Eklentisinin Bir Kopyasını Oluştur

MacOS ve Linux'ta biber eklentisi Chrome tarayıcı içinde gezinmeden `chrome://plugins` de bulunur. Electron'un konumu ve sürümü Pepper Flash desteği için kullanışlıdır. Ayrıca başka bir yere kopyalayabilirsiniz.

## Electron değişimi ekleyin

`--ppapi-flash-path` ve `--ppapi-flash-version`'u Electron komut satırına doğrudan veya `app.commandLine.appendSwitch` yöntemiyle uygulamanın hazır olayından önce ekleyebilirsiniz. Ayrıca `BrowserWindow` 'un `eklentilerini` etkinleştirin.

Örneğin:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Specify flash path, supposing it is placed in the same directory with main.js.
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

app.on('ready', () => {
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

## Enable Flash Plugin in a `<webview>` Tag

Add `plugins` attribute to `<webview>` tag.

```html
<webview src="http://www.adobe.com/software/flash/about/" plugins></webview>
```

## Arıza giderme

Devtools konsolundaki `navigator.plugins` 'i inceleyerek Pepper Flash eklentisinin yüklenip yüklenmediğini kontrol edebilirsiniz (ancak eklentinin yolunun doğru olup olmadığını anlayamazsınız).

Pepper Flash eklentisinin mimarisi, Electron'un eklentisininkiyle eşleşmelidir. Windows'ta alışılmış bir hata, Electron'un 64 bit sürümüne karşı Flash eklentisinin 32 bit sürümünü kullanmaktır.

Windows'ta `--ppapi-flash-path` adresine giden yol, `` yol tanımlayıcı olarak kullanmalıdır; POSIX stilindeki yollar çalışmaz.

RTMP kullanan eş zamanlı medya gibi bazı işlemler için, oynatıcıların `.swf` dosyalarına daha geniş izinler vermeniz gerekir. Bunu gerçekleştirmenin bir yolu, [nw-flash-trust](https://github.com/szwacz/nw-flash-trust)'ı kullanmaktır.