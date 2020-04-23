# Gamit ang Pepper Flash Plugin

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Maghanda ng Kopya ng Flash Plugin

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Itong lokasyon at bersyon ay mapapakinabangan para sa Electron's Pepper Flash support. Maaari mo ring kopyahin ito sa ibang lokasyon.

## Dagdagan ng Electron Switch

Kaya mong direktang magdagdag ng `--ppapi-flash-landas` at `– ppapi-flash version` sa linya ng utos ng Electron o sa pamamagitan ng paggamit ng `app.commandLine.appendSwitch` paraan bago ang app handa sa pangyayari. Saka, buksan ang `plugin` opsyon sa `BrowserWindow`.

Halimbawa:

```javascript
const { app, BrowserWindow } = kaylangan('elektron') const path = kaylangan('path') 


// Liwanagin ang flash path, ipagpalagay ito ay nakalagay sa parehong listahan kasama ang main.js.
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

Maaari mong subukan ang loading system wide Pepper Flash plugin sa halip na ipapadala ang mga plugin sa iyong sarili, itong path ay pwedeng matanggap sa pagtawag sa `app.getPath('pepperFlashSystemPlugin')`.

## Paganahin ang Flash Plugin sa `<webview>` Tag

Magdagdag ng `plugins` katangian sa `<webview>`tag.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Pag-aayos

Maaari mo ring suriin kung Pepper Flash plugin ay karga ng pagsusuri ang `navigator.plugins` sa console ng devtools (kahit na hindi mo alam kung tama ang plugin path).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Para sa ilang mga operasyon, tulad ng streaming media gamit ang RTMP, ito ay kinakailangan upang bigyan ng mas malawak na pahintulot sa mga manlalaro `.swf` files. Ang isang paraan para maisakatuparan ito, gamitin ang [nw-flash-tiwala](https://github.com/szwacz/nw-flash-trust).
