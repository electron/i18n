# Utilisation du plugin Widevine CDM

Dans Electron, vous pouvez utiliser le plugin Widevine CDM livré avec le navigateur Chrome.

## Obtenir le plugin

Electron n’est pas livré avec le plugin Widevine CDM pour des raisons de licence, pour l’obtenir, vous devez installer le navigateur Chrome officiel, qui doit correspondre à l’architecture et la version de Chrome de la version d'Electron que vous utilisez.

**Remarque :** La version majeur du navigateur Chrome doit être la même que la version de Chrome utilisée par Electron, sinon le plugin ne fonctionnera pas même si `navigator.plugins` indiquera qu’il a été chargé.

### Windows et macOS

Open `chrome://components/` in Chrome browser, find `WidevineCdm` and make sure it is up to date, then you can find all the plugin binaries from the `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/` directory.

`APP_DATA` is system's location for storing app data, on Windows it is `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` is Widevine CDM plugin's version string, like `1.4.8.866`. `PLATFORM` is `mac` or `win`. `ARCH` is `x86` or `x64`.

On Windows the required binaries are `widevinecdm.dll` and `widevinecdmadapter.dll`, on macOS they are `libwidevinecdm.dylib` and `widevinecdmadapter.plugin`. You can copy them to anywhere you like, but they have to be put together.

### Linux

On Linux the plugin binaries are shipped together with Chrome browser, you can find them under `/opt/google/chrome`, the filenames are `libwidevinecdm.so` and `libwidevinecdmadapter.so`.

## Utiliser le plugin

After getting the plugin files, you should pass the `widevinecdmadapter`'s path to Electron with `--widevine-cdm-path` command line switch, and the plugin's version with `--widevine-cdm-version` switch.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

The command line switches have to be passed before the `ready` event of `app` module gets emitted, and the page that uses this plugin must have plugin enabled.

Exemple de code :

```javascript
const {app, BrowserWindow} = require('electron')

// Vous devez passer le nom de fichier de `widevinecdmadapter` ici, c'est
// * `widevinecdmadapter.plugin` sur macOS,
// * `libwidevinecdmadapter.so` sur Linux,
// * `widevinecdmadapter.dll` sur Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// La version du plugin peut être obtenue depuis la page `chrome://plugins` dans Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // The `plugins` have to be enabled.
      plugins: true
    }
  })
  win.show()
})
```

## Vérifier le plugin

Pour vérifier que le plugin fonctionne, vous pouvez utiliser les moyens suivants :

* Ouvrez les devtools et vérifiez si `navigator.plugins` inclut le plugin Widevine CDM.
* Ouvrez https://shaka-player-demo.appspot.com/ et charger un manifeste qui utilise `Widevine`.
* Ouvrez http://www.dash-player.com/demo/drm-test-area/, vérifier que la page indique `bitdash uses Widevine in your browser`, puis lire la vidéo.