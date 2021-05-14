# Tester le CDM Widevine

Dans Electron, vous pouvez utiliser le plugin Widevine CDM livré avec le navigateur Chrome.

Les modules de décryptage de contenu Widevine (CDM) sont la façon dont les services de streaming protègent le contenu en utilisant des vidéos HTML5 aux navigateurs Web sans compter sur un plugin NPAPI comme Flash ou Silverlight. Le support Widevine est une solution alternative pour les services de streaming qui dépendent actuellement de Silverlight pour la lecture de contenus vidéo protégés DRM. Il permettra aux sites Web d'afficher du contenu vidéo protégé DRM dans Firefox sans utiliser les plugins NPAPI. Le CDM Widevine fonctionne dans un sandbox CDM open-source offrant une meilleure sécurité utilisateur que les plugins NPAPI.

#### Note sur VMP

À partir de [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), les étapes ci-dessous ne sont peut-être que quelques-unes des étapes nécessaires pour activer Widevine ; toute application sur ou après cette version ayant l'intention d'utiliser le CDM Widevine peut avoir besoin de être signée en utilisant une licence obtenue de [Widevine](https://www.widevine.com/) elle-même.

Par [Widevine](https://www.widevine.com/):

> Chrome 59 (et plus) inclut le support de Verified Media Path (VMP). VMP fournit une méthode pour vérifier l'authenticité d'une plate-forme de périphérique. Pour les déploiements du navigateur, cela fournira un signal supplémentaire pour déterminer si une implémentation basée sur le navigateur est fiable et sécurisée.
> 
> Le guide d'intégration de proxy a été mis à jour avec des informations sur VMP et comment émettre des licences.
> 
> Widevine recommande que nos intégrations basées sur le navigateur (vendeurs et applications basées sur le navigateur) ajoutent la prise en charge de VMP.

Pour activer la lecture vidéo avec cette nouvelle restriction, [castLabs](https://castlabs.com/open-source/downstream/) a créé un [fork](https://github.com/castlabs/electron-releases) qui a implémenté les modifications nécessaires pour permettre la lecture de Widevine dans une application Electron si on a obtenu les licences nécessaires de widevine.

## Obtention de la bibliothèque

Ouvrez `chrome://components/` dans le navigateur Chrome, trouver `le Module de déchiffrement de contenu Widevine` et assurez-vous qu'il est à jour, vous pouvez alors trouver les fichiers de la bibliothèque dans le répertoire de l'application .

### Sur Windows 

Le fichier de bibliothèque `widevinecdm.dll` sera sous `dossier Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` .

### Sur macOS 

Le fichier de bibliothèque `libwidevinecdm.dylib` sera sous `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` dossier

**Remarque :** Assurez-vous que la version de chrome utilisée par Electron est supérieure ou égale à la `min_chrome_version` valeur de la composante de cdm widevine de Chrome. La valeur peut être trouvée dans le répertoire `manifest.json` sous `WidevineCdm`.

## Utilisation de la bibliothèque

Après avoir récupéré les fichiers de la bibliothèque, vous devez passer le chemin vers le fichier avec le commutateur de ligne de commande `--widevine-cdm-path` , et la version de la bibliothèque avec le commutateur `--widevine-cdm-version`. Les commutateurs de ligne de commande doivent être passés avant que l'événement `prêt` du module `app` ne soit émis.

Exemple de code :

```javascript
const { app, BrowserWindow } = require('electron')

// Vous devez passer le répertoire qui contient la bibliothèque widevine ici, c'est
// * `libwidevinecdm. ylib` sur macOS,
// * `widevinecdm.dll` sous Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// La version du plugin peut être obtenue à partir de la page `chrome://components` dans Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.whenReady().then(() => {
  win = new BrowserWindow()
  win.show()
})
```

## Vérification de la prise en charge de Widevine CDM

Pour vérifier si Widevine fonctionne, vous pouvez utiliser les méthodes suivantes:

* Ouvrez https://shaka-player-demo.appspot.com/ et charger un manifeste qui utilise `Widevine`.
* Ouvrez http://www.dash-player.com/demo/drm-test-area/, vérifier que la page indique `bitdash uses Widevine in your browser`, puis lancez la vidéo.
