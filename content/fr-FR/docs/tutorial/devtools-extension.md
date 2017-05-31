# DevTools Extension

Électron prend en charge la Extension</a> Chrome DevTools, qui peut être utilisé pour étendre la capacité de devtools pour le débogage des frameworks web populaire.</p> 

## Comment charger une DevTools Extension

Ce document décrit le processus pour charger manuellement une extension. Vous pouvez également essayer[electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), un outil tiers qui télécharge les extensions directement à partir de la boutique en ligne de Chrome.

Pour charger une extension en électronique, vous avez besoin pour le télécharger au navigateur Chrome, localiser son chemin d’accès de système de fichiers et ensuite le charger en appelant le`BrowserWindow.addDevToolsExtension (poste)` API.

En utilisant le [React développeur Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) comme exemple :

  1. Installez-le dans le navigateur de Chrome.
  2. Accédez à ` chrome://extensions` et trouver son ID d’extension, qui est une chaîne de hachage comme `fmkadmapgofadopljbjfkapdkoienihi`.
  3. Découvrez les emplacement de système de fichiers utilisé par Chrome pour stocker des extensions : 
    * sous Windows, il est `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` ;
    * sous Linux, ça pourrait être : 
        * `~/.config/Google-Chrome/default/extensions/`
        * `~/.config/Google-Chrome-Beta/default/extensions/`
        * `~/.config/Google-Chrome-Canary/default/extensions/`
        * `~/.config/Chromium/default/extensions/`
    * sous macOS, c’est ` ~ / Library/Application Support/Google/Chrome/Default/Extensions`.
  4. Transmettre l’emplacement de l’extension à `BrowserWindow.addDevToolsExtension` API, pour les outils de développement réagissent, c’est quelque chose comme : ` ~ / Bibliothèque/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** le `BrowserWindow.addDevToolsExtension` API ne peut pas être appelé avant l’événement ready du module app est émis.

Le nom de l’extension est retourné par `BrowserWindow.addDevToolsExtension`, et vous pouvez passer le nom de l’extension à la `BrowserWindow.removeDevToolsExtension` API pour le décharger.

## Extensions prises en charge DevTools

Électron prend uniquement en charge un ensemble limité de `chrome.*` API, donc certaines extensions à l’aide de `chrome.*` non prise en charge API pour les fonctionnalités d’extension chrome peuvent ne pas fonctionner. Les Extensions Devtools suivantes sont testées et garanties de fonctionner en électrons :

* [Inspecteur de braise](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Outils de développement de Bull](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Débogueur de la colonne vertébrale](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery débogueur](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Débogueur cérébrale](http://www.cerebraljs.com/documentation/the_debugger)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Que dois-je faire si une DevTools Extension ne fonctionne pas ?

Tout d’abord, s’il vous plaît assurez-vous que l’extension est encore maintenu, certaines extensions ne peuvent pas encore travailler pour les versions récentes du navigateur Chrome, et nous ne sommes pas en mesure de faire quelque chose pour eux.

Remplir un rapport de bogue à la liste des problèmes de l’électron, puis décrire quelle partie de l’extension ne fonctionne pas comme prévu.