# Utilisation du plugin Pepper Flash

Electron prend en charge le plugin Pepper Flash. Pour utiliser le plugin Pepper Flash dans Electron, vous devez spécifier manuellement l'emplacement du plugin Pepper flash et puis l'activer dans votre application.

## Préparer une copie du Plugin Flash

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Son emplacement et sa version sont utiles pour le support de Pepper Flash dans Electron. Vous pouvez également le copier vers un autre emplacement.

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

// Optionnel: Spécifier la version de flash, par exemple : v17.0.0.169
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

Vous pouvez aussi essayer de charger le plugin Pepper Flash depuis le système au lieu de le distribuer vous-même. Son chemin d'accès peut être donné en appelant `app.getPath('pepperFlashSystemPlugin')`.

## Activez le Plugin Flash dans une balise `<webview>`

Ajoutez l'attribut `plugins` à la balise `<webview>`.

```html
<webview src="https://www.adobe.com/software/flash/about/" plugins></webview>
```

## Résolution de problème

Vous pouvez vérifier si le plugin Pepper Flash a été chargé en inspectant `navigator.plugins` dans la console des outils de développement (bien que vous ne puissiez pas savoir si le chemin d'accès du plugin est correct).

L'architecture du plugin Pepper Flash doit correspondre à celle d'Electron. Sur Windows, une erreur courante est d'utiliser une version 32 bits du plugin flash avec la version 64 bits d'Electron.

Sur Windows, le chemin d'accès passé au `--ppapi-flash-path` doit utiliser `` en tant que délimiteur de chemin d'accès, utiliser des chemin d'accès du style POSIX ne fonctionnera pas.

Pour certaines opérations, telles que le streaming média en utilisant le protocole RTMP, il est nécessaire d'accorder des permissions plus larges aux lecteurs de fichier `.swf`. Une façon d'y parvenir est d'utiliser [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).