# Extension DevTools

Electron prend en charge les [Chrome DevTools extensions](https://developer.chrome.com/extensions/devtools), qui peuvent être utilisées pour étendre les capacités des devtools de Chrome pour le débogage des framework les plus populaires.

## Chargement d'une extension DevTools avec outillage

La façon la plus simple de charger une extension DevTools est l'utilisation d'outil tiers pour automatiser à votre place le processus. Le package [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer) disponible via NPM correspond exactement à cela.

## Chargement manuel d'une extension des DevTools

Si vous ne voulez pas utiliser l'approche outillage, vous pouvez de toute façon effectuer toutes les opérations nécessaires à la main. Pour charger une extension dans Electron, vous devez tout d'abord la télécharger via Chrome puis localiser son chemin dans le système de fichiers et la charger enfin dans votre [Session](../api/session.md) en appelant l'API [`ses.loadExtension`].

Exemple utilisant [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) :

1. Installez l'extension dans Google Chrome.
1. Accédez à `chrome://extensions` et trouvez son ID d’extension, qui est une chaîne de hachage comme `fmkadmapgofadopljbjfkapdkoienihi`.
1. Découvrez l'emplacement utilisé par Chrome dans le système de fichiers pour stocker les extensions :
   * sous Windows, c'est `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions` ;
   * sous Linux, ça pourrait être :
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * sur macOS c’est `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Transmettre l'emplacement de l'extension à l'API [`ses.loadExtension`](../api/session.md#sesloadextensionpath) . Pour les outils de développement React `v4.9.0`, cela ressemble à quelque chose comme :
   ```javascript
    const { app, session } = require('electron')
    const path = require('path')
    const os = require('os')

    // sur macOS
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0'
    )

    app.whenReady().then(async () => {
      await session.defaultSession.loadExtension(reactDevToolsPath)
    })
   ```

**Remarque :**

* `loadExtension` retourne une Promise avec un objet de type [Extension](../api/structures/extension.md) contenant des métadonnées à propos de l'extension qui a été chargée. Cette promesse doit être résolue (par exemple avec une expression `await` ) avant de charger une page. Sinon il n'est pas garanti que l'extension se charge.
* `loadExtension` ne doit pas être invoquée avant que l'évènement `ready` du module `app` ne soit émis, ni lors de sessions en mémoire (non persistantes).
* Pour que l'extension soit chargée `loadExtension` devrat être invoquée à chaque démarrage de votre application.

### Suppression d’une extension DevTools

Afin de supprimer une extension vous devez passer l'ID de l'extension à l'API [`ses.removeExtension`](../api/session.md#sesremoveextensionextensionid). Les extensions chargées ne persistent s pas entre deux lancements d’application.

## Support de l'extension DevTools

Electron ne prend en charge qu'un [ensemble limité des APIs `chrome.` ](../api/extensions.md), donc les extensions utilisant les APIs non supportées sous le capot peuvent ne pas fonctionner.

Les Extensions Devtools suivantes ont été testées et sont garanties de fonctionner dans Electron :

* [Inspecteur Ember](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Outils de développement React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Débogueur Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Débogueur jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [Batarang AngularJS](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Devtools Vue.js](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Débogueur Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Extension DevTools Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Que faire si une extension DevTools ne fonctionne pas ?

Tout d'abord, assurez-vous que l'extension est toujours maintenue, et qu'elle est compatible avec la dernière version de Google Chrome. Nous ne pouvons pas fournir de support supplémentaire pour les extensions non prises en charge.

Si l'extension fonctionne sur Chrome mais pas sur Electron, signalez une bug dans le traqueur de tickets d'Electron en décrivant quelle partie de l'extension ne fonctionne pas comme prévu.
