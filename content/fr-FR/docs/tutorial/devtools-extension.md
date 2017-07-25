# Extension DevTools

Electron prend en charge [l'extension DevTools de Chrome](https://developer.chrome.com/extensions/devtools), qui peut être utilisé pour étendre les capacités du devtools pour le débogage de framework web populaire.

## Comment charger une extension DevTools

Ce document décrit le processus pour charger manuellement une extension. Vous pouvez également essayer [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), un outil tiers qui télécharge les extensions directement à partir du WebStore de Chrome.

To load an extension in Electron, you need to download it in Chrome browser, locate its filesystem path, and then load it by calling the `BrowserWindow.addDevToolsExtension(extension)` API.

En utilisant [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) comme exemple :

1. Installez-le dans le navigateur Chrome.
2. Accédez à `chrome://extensions` et trouvez son ID d’extension, qui est une chaîne de hachage comme `fmkadmapgofadopljbjfkapdkoienihi`.
3. Découvrez les emplacement du système de fichiers utilisé par Chrome pour stocker les extensions : 
    * sous Windows, c'est `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` ;
    * sous Linux, ça pourrait être : 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * sur macOS c’est `~/Library/Application Support/Google/Chrome/Default/Extensions`.
4. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The name of the extension is returned by `BrowserWindow.addDevToolsExtension`, and you can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to unload it.

## Extensions DevTools prises en charge

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Inspecteur Ember](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Outils de développement React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Débogueur Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Débogueur jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [Batarang AngularJS](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Devtools Vue.js](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Débogueur Cerebral](http://www.cerebraljs.com/documentation/the_debugger)
* [Extension DevTools Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Que dois-je faire si une extension DevTools ne fonctionne pas ?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.