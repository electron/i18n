# L’utilisation du MDP Widevine Plugin

En électronique, vous pouvez utiliser le plugin Widevine CDM livré avec le navigateur Chrome.

## Obtenir le plugin

Électron n’est pas livré avec le plugin Widevine CDM pour des raisons de licence, pour l’obtenir, vous devez installer le navigateur Chrome officiel tout d’abord, qui doit correspondre à l’architecture et la version de Chrome de la génération d’électrons que vous utilisez.

**Note:** que la version principale du navigateur Chrome doit être la même chose avec la version de Chrome utilisée par électron, sinon le plugin ne fonctionne pas même si`navigator.plugins` montrerait qu’il a été chargé.

### Windows & macOS

Ouvrez ` chrome://components/` dans le navigateur Chrome, trouver `WidevineCdm` et assurez-vous que c’est à jour, alors vous pouvez trouver tous les binaires de plugin dans le répertoire `APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/`.

`APP_DATA` emplacement de système de stockage des données de l’app, sous Windows, il est `%LOCALAPPDATA%`, sur macOS c’est ` ~ / Bibliothèque/Application Support`. `VERSION` est la chaîne de version du plugin Widevine CDM, comme `1.4.8.866`. `PLATFORM` est `mac` ou `win`. `ARCH` est `x86` ou `x64`.

Sous Windows, les fichiers binaires requis sont `widevinecdm.dll` et `widevinecdmadapter.dll`, sur Mac OS, ils sont `libwidevinecdm.dylib` et `widevinecdmadapter.plugin`. Vous pouvez les copier à où que vous voulez, mais ils doivent être mis en place.

### Linux

Sur Linux, que les fichiers binaires de plugin sont expédiés avec le navigateur Chrome, vous pouvez les trouver sous `/opt/google/chrome`, les noms de fichiers sont `libwidevinecdm.so` et `libwidevinecdmadapter.so`.

## En utilisant le plugin

Après avoir obtenu les fichiers du plugin, vous devez passer le chemin d’accès de la `widevinecdmadapter` électronique avec `--commutateur de ligne de commande widevine-cdm-path` et la version du plugin avec `--widevine-cdm-version` commutateur.

**Note:** bien que seulement le `widevinecdmadapter` binaire est passée à l’électron, le `widevinecdm` binaire doit être mis de côté il.

Les commutateurs de ligne de commande doivent être passés avant que l’événement `ready` du module `app` obtient émis, et la page qui utilise ce plugin doit avoir le plugin activé.

Exemple de code :

```javascript
const {app, BrowserWindow} = require('electron') / / vous devez passer le nom de fichier de « widevinecdmadapter » ici, c’est / / * « widevinecdmadapter.plugin » sur macOS, / / * « libwidevinecdmadapter.so » sous Linux, / / * « widevinecdmadapter.dll » sous Windows.
app.commandLine.appendSwitch ('widevine-cdm-path', ' / path/to/widevinecdmadapter.plugin') / / la version du plugin peut être obtenue de « chrome://plugins » page en Chrome.
app.commandLine.appendSwitch ('widevine-cdm-version', '1.4.8.866') laisser gagner = null app.on ("prêt", () => {gagner = new BrowserWindow ({webPreferences : {/ / les "plugins" doivent être activées.
      plugins : true}}) win.show()})
```

## Vérifier le plugin

Pour vérifier que si le plugin fonctionne, vous pouvez utiliser à la suite des moyens :

* Ouvrez devtools et vérifiez si `navigator.plugins` contient le plugin Widevine CDM.
* Ouvrez https://shaka-player-demo.appspot.com/ et charger un manifeste qui utilise`Widevine`.
* Ouvrez http://www.dash-player.com/demo/drm-test-area/, vérifier si la page indique `bitdash utilise Widevine dans votre browser`, puis lire la vidéo.