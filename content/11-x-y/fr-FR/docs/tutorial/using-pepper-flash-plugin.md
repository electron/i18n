# Utilisation du plugin Pepper Flash

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

## Préparer une copie du Plugin Flash

Sur macOS et Linux, on trouvera les détails du plugin Pepper Flash en accédant à `chrome://version` dans le navigateur Chrome. Son emplacement et sa version sont utiles pour le support de Pepper Flash dans Electron. Vous pouvez également le copier vers un autre emplacement.

## Ajout de paramètres Electron

Vous pouvez directement ajouter `--ppapi-flash-path` et `--ppapi-flash-version` à la ligne de commande d'Electron ou en utilisant la méthode `app.commandLine.appendSwitch` avant l’événement ready de l'application. Aussi, veuillez activer l'option `plugins` de `BrowserWindow`.

Par exemple :

```javascript
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Spécifie le chemin flash, Si elle est placée dans le même répertoire avec main. s.
let pluginName
switch (process.platform) {
  case 'win32':
    pluginName = 'pepflashplayer. ll'
    casser
  cas 'darwin' :
    pluginName = 'PepperFlashPlayer. lugin'
    break
  case 'linux':
    pluginName = 'libpepflashplay'. o'
    break
}
app. ommandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))

// Optionnel: Spécifier la version flash, par exemple, v17.0.169
app.commandLine.appendSwitch('ppapi-flash-version', '17.0.169')

app.whenReady(). hen(() => {
  const win = new BrowserWindow({
    width: 800,
    hauteur: 600,
    webPreferences: {
      plugins: true
    }
  })
  gagnez. oadURL(`file://${__dirname}/index.html`)
  // Quelque chose d'autre
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

Sur Windows, le chemin d'accès passé au `--ppapi-flash-path` doit utiliser `\` en tant que délimiteur de chemin d'accès, utiliser des chemin d'accès du style POSIX ne fonctionnera pas.

Pour certaines opérations, telles que le streaming média en utilisant le protocole RTMP, il est nécessaire d'accorder des permissions plus larges aux lecteurs de fichier `.swf`. Une façon d'y parvenir est d'utiliser [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).
