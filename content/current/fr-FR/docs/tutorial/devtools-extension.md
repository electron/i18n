# Extension DevTools

Electron prend en charge [l'extension DevTools de Chrome](https://developer.chrome.com/extensions/devtools), qui peut être utilisé pour étendre les capacités du devtools pour le débogage de framework web populaire.

## Comment charger une extension DevTools

Ce document décrit le processus pour charger manuellement une extension. Vous pouvez également essayer [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), un outil tiers qui télécharge les extensions directement à partir du WebStore de Chrome.

Pour charger une extension dans Electron, vous avez besoin de le télécharger dans le navigateur Chrome, de localiser son chemin d’accès au système de fichiers et ensuite de le charger en appelant l'API `BrowserWindow.addDevToolsExtension(extension)`.

En utilisant [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) comme exemple :

1. Installez-le dans le navigateur Chrome.
1. Accédez à `chrome://extensions` et trouvez son ID d’extension, qui est une chaîne de hachage comme `fmkadmapgofadopljbjfkapdkoienihi`.
1. Découvrez les emplacement du système de fichiers utilisé par Chrome pour stocker les extensions :
   * sous Windows, c'est `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` ;
   * sous Linux, ça pourrait être :
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * sur macOS c’est `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**Remarque :** L'API `BrowserWindow.addDevToolsExtension` ne peut pas être appelée avant que l’événement ready du module app est émis.

L'extension sera mémorisée donc vous n'avez besoin d'appeler cette API qu'une seule fois par extension . Si vous essayez d'ajouter une extension qui a déjà été chargée, cette méthode ne retournera pas et enregistrera à la place une alerte sur la console.

### Comment supprimer une extension DevTools

Vous pouvez passer le nom de l'extension à l'API `BrowserWindow.removeDevToolsExtension` pour la supprimer. Le nom de l'extension est retourné par `BrowserWindow. ddDevToolsExtension` et vous pouvez obtenir les noms de toutes les extensions installées DevTools en utilisant l'API `BrowserWindow.getDevToolsExtensions`.

## Extensions DevTools prises en charge

Electron supporte uniquement un ensemble limité d'APIs `chrome.*`, donc certaines extensions fonctionnant avec des APIs `chrome.*` non supportées ne pourront pas fonctionner. Les Extensions Devtools suivantes sont testées et garanties de fonctionner dans Electron :

* [Inspecteur Ember](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Outils de développement React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Débogueur Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Débogueur jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [Batarang AngularJS](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Devtools Vue.js](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Débogueur Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Extension DevTools Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Que dois-je faire si une extension DevTools ne fonctionne pas ?

Tout d’abord, assurez-vous que l’extension est encore maintenu, certaines extensions ne peuvent plus fonctionner pour les versions récentes du navigateur Chrome, et nous ne sommes pas en mesure de faire quelque chose pour eux.

Ensuite, faites un rapport de bogue dans les issues d'Electron, puis décrivez quelle partie de l'extension ne fonctionne pas comme prévu.
