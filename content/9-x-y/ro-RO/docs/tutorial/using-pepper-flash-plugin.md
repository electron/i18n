# Utilizarea pluginului Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Pregătiți o copie a plugin-ului Flash

Pe macOS și Linux, detaliile plugin-ului Pepper Flash pot fi găsite prin navigând la `chrome://flash` în browser-ul Chrome. Locația și versiunea sa sunt utile pentru suportul lui Pepper Flash. Îl poți copia și într-o altă locație .

## Adaugă Comutator Electron

Poți adăuga direct `--ppapi-flash-path` și `--ppapi-flash-version` la linia de comandă Electron sau folosind aplicația `. ommandLine.appendSwitch` metoda înainte de evenimentul pregătit de aplicație. De asemenea, activați opțiunea `plugin-uri` a `BrowserWindow`.

De exemplu:

```javascript
const { app, BrowserWindow } = require('electron')
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

Poți de asemenea să încerci să încarci plugin-ul Pepper Flash în loc să expediezi plugin-urile chiar tu, calea sa poate fi primită apelând aplicația`. etPath('pepperFlashSystemPlugin')`.

## Activează Plugin Flash într-o etichetă `<webview>`

Adaugă `plugin-uri` atribut la `<webview>` etichetă.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Depanare

Puteți verifica dacă plugin-ul Pepper Flash a fost încărcat inspectând `navigatorul. lugin-uri` în consola devtools (deși nu poți ști dacă calea a plugin-ului este corectă).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Pentru unele operațiuni, cum ar fi streaming-ul media folosind RTMP, este necesar să se acorde permisiuni mai mari fișierelor `.swf`. Un mod de a realiza acest lucru este de a utiliza [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
