# Utilisation du plugin Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Préparer une copie du Plugin Flash

Sur macOS et Linux, les détails du plugin Pepper Flash peuvent être trouvés en naviguant à l'adresse `chrome://flash` de votre navigateur Chrome. Son emplacement et sa version sont utiles pour le support de Pepper Flash dans Electron. Vous pouvez également le copier vers un autre emplacement.

## Ajout de paramètres Electron

Vous pouvez directement ajouter `--ppapi-flash-path` et `--ppapi-flash-version` à la ligne de commande d'Electron ou en utilisant la méthode `app.commandLine.appendSwitch` avant l’événement ready de l'application. Aussi, veuillez activer l'option `plugins` de `BrowserWindow`.

Par exemple :

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Spécifie l'emplacement de flash, en supposant qu'il est placé dans le même dossier que main.js.
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

Vous pouvez aussi essayer de charger le plugin Pepper Flash depuis le système au lieu de le distribuer vous-même. Son chemin d'accès peut être donné en appelant `app.getPath('pepperFlashSystemPlugin')`.

## Activez le Plugin Flash dans une balise `<webview>`

Ajoutez l'attribut `plugins` à la balise `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Résolution de problème

Vous pouvez vérifier si le plugin Pepper Flash a été chargé en inspectant `navigator.plugins` dans la console des outils de développement (bien que vous ne puissiez pas savoir si le chemin d'accès du plugin est correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

Pour certaines opérations, telles que le streaming média en utilisant le protocole RTMP, il est nécessaire d'accorder des permissions plus larges aux lecteurs de fichier `.swf`. Une façon d'y parvenir est d'utiliser [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
