# Utilisation du plugin Widevine CDM

Dans Electron, vous pouvez utiliser le plugin Widevine CDM livré avec le navigateur Chrome.

## Obtenir le plugin

Electron n’est pas livré avec le plugin Widevine CDM pour des raisons de licence, pour l’obtenir, vous devez installer le navigateur Chrome officiel, qui doit correspondre à l’architecture et la version de Chrome de la version d'Electron que vous utilisez.

**Remarque :** La version majeur du navigateur Chrome doit être la même que la version de Chrome utilisée par Electron, sinon le plugin ne fonctionnera pas même si `navigator.plugins` indiquera qu’il a été chargé.

### Windows et macOS

Ouvrez `chrome://components/` dans le navigateur Chrome, trouvez `WidevineCdm` et assurez-vous que c’est à jour, puis vous trouverez tous les binaires du plugin dans le répertoire `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/`.

`APP_DATA` est emplacement du système de stockage des données de l’application, sur Windows, il se trouve dans `%LOCALAPPDATA%`, sur macOS c’est `~/Library/Application Support`. `VERSION` est la version du plugin Widevine CDM, comme `1.4.8.866`. `PLATFORM` est `mac` ou `win`. `ARCH` est `x86` ou `x64`.

Sous Windows, les fichiers binaires requis sont `widevinecdm.dll` et `widevinecdmadapter.dll`, sur macOS, ce sont `libwidevinecdm.dylib` et `widevinecdmadapter.plugin`. Vous pouvez les copier où vous voulez, mais ils doivent être mis ensemble.

### Linux

Sur Linux, les fichiers binaires du plugin sont livrés avec le navigateur Chrome, vous pouvez les trouver dans `/opt/google/chrome`, les noms de fichiers sont `libwidevinecdm.so` et `libwidevinecdmadapter.so`.

## Utiliser le plugin

Après avoir obtenu les fichiers du plugin, vous devez passer le chemin d'accès de `widevinecdmadapter` à Electron avec le paramètre `--widevine-cdm-path` en ligne de commande et la version du plugin avec le paramètre `--widevine-cdm-version`.

**Remarque :** Bien que seulement le binaire `widevinecdmadapter` est passée à Electron, le binaire `widevinecdm` doit être mis au même endroit.

Les paramètres de ligne de commande doivent être passés avant l'événement `ready` du module `app` soit émit, et la page qui utilise ce plugin doit avoir le plugin activé.

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
* Ouvrez http://www.dash-player.com/demo/drm-test-area/, vérifier que la page indique `bitdash uses Widevine in your browser`, puis lancez la vidéo.