# Option `sandbox`

> Créez une fenêtre de navigateur avec un renderer bac à sable. With this option enabled, the renderer must communicate via IPC to the main process in order to access node APIs.

Une des fonctionnalités de sécurité majeure de Chromium est que tous les rendements de Blink/le code JavaScript sont éxécutés isolé dans un bac à sable (sandbox). Ce bac à sable utilise des fonctionnalités spécifiques au système pour s’assurer que les exploits dans le processus de redement ne puissent pas nuire au système.

En d’autres termes, lorsque le bac à sable est activé, les processus de rendement ne peuvent apporter des modifications au système qu’en déléguant des tâches au processus principal via IPC. [Voici](https://www.chromium.org/developers/design-documents/sandbox) plus d'informations sur le bac à sable.

Étant donné qu'une fonctionnalité majeure d'Electron est la possibilité d'exécuter Node. s dans le processus de rendu (facilitant le développement d'applications de bureau en utilisant les technologies web ), le bac à sable est désactivé par electron. Ceci est dû au fait que la plupart des API Node.js nécessitent un accès au système. `require()` for example, is not possible without file system permissions, which are not available in a sandboxed environment.

Habituellement, ce n'est pas un problème pour les applications de bureau puisque le code est toujours de confiance, mais cela rend Electron moins sécurisé que Chromium pour l'affichage de contenu web non fiable. Pour les applications qui nécessitent plus de sécurité, le drapeau `bac à sable` forcera Electron à faire apparaître un moteur de rendu Chromium classique compatible avec le bac à sable.

Un moteur de rendu en bac à sable n'a pas d'environnement Node.js en cours d'exécution et n'expose pas les API JavaScript de Node.js au code client. La seule exception est le script de préchargement, qui a accès à un sous-ensemble de l'API de rendu Electron.

Another difference is that sandboxed renderers don't modify any of the default JavaScript APIs. Par conséquent, certaines API telles que `window.open` fonctionneront car elles font dans Chromium (c'est-à-dire qu'ils ne renvoient pas un [`BrowserWindowProxy`](browser-window-proxy.md)).

## Exemple

Pour créer une fenêtre en bac à sable, passez `bac à sable : true` à `webPreferences`:

```js
let win
app.whenReady().then()=> {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL ('http://google.com')
})
```

Dans le code ci-dessus, le [`BrowserWindow`](browser-window.md) qui a été créé a Node.js désactivé et ne peut communiquer que via IPC. L'utilisation de cette option empêche Electron de créer un runtime Node.js dans le moteur de rendu. En outre, dans cette nouvelle fenêtre `window.open` suit le comportement natif (par défaut Electron crée un [`BrowserWindow`](browser-window.md) et renvoie un proxy à ce via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox) peut être utilisé pour forcer `sandbox: true` pour toutes les instances `BrowserWindow`.

```js
let win
app.enableSandbox()
app.whenReady().then()) => {
  // pas besoin de passer 'bac à sable: vrai' depuis 'app.enableSandbox)' a été appelé.
  win = nouveau BrowserWindow()
  win.loadURL ('http://google.com')
})
```

## Preload

Une application peut effectuer des personnalisations sur des rendus bacs à sable à l’aide d’un script de préchargement. Voici un exemple :

```js
let win
app.whenReady().then()=> {
  win = new BrowserWindow ({
    webPreferences: {
      bac à sable: vrai,
      préchargement: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL ('http://google.com')
})
```

et preload.js:

```js
// Ce fichier est chargé chaque fois qu'un contexte javascript est créé. Il s'exécute dans une portée privée
// qui peut accéder à un sous-ensemble d'API de rendu Electron. Sans
// contexteIsolation activée, il est possible de fuir accidentellement des
privilégiés // globals comme ipcRenderer au contenu web.
const { ipcRenderer } = require ('electron')

const defaultWindowOpen = window.open

window.open = fonction customWindowOpen (url, ... args) {
  ipcRenderer.send ('report-window-open', location.origin, url, args)
  return defaultWindowOpen (url + '?from_electron=1', ... args)
}
```

Choses importantes à remarquer dans le script de préchargement :

- Même si le moteur de rendu en bac à sable n'a pas de Node. , il a encore accès à un environnement de type noeud limité : `Buffer`, `process`, `setImmediate`, `clearImmediate` et `require` sont disponibles.
- Le script de préchargement doit être contenu dans un seul script, mais il est possible d'avoir un code de préchargement complexe composé de plusieurs modules en utilisant un outil comme webpack ou browserify. Un exemple d'utilisation de browserify est ci-dessous.

Pour créer un paquet browserify et l'utiliser comme un script de préchargement, quelque chose comme devrait être utilisé :

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

Le drapeau `-x` doit être utilisé avec tout module requis qui est déjà exposé dans le champ de préchargement, et indique à browserify d'utiliser la fonction `require` en pièce jointe pour cela. `--insert-global-vars` s'assurera que `processus`, `Buffer` et `setImmediate` sont également pris à partir de la portée englobante (normalement browserify injecte du code pour ceux-ci).

Actuellement la fonction `require` fournie dans la portée de préchargement expose les modules suivants :

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `webFrame`
- `événements`
- `timers`
- `url`

D’autres peuvent être ajoutés au besoin pour exposer plus d’API d’électrons dans le bac à sable.

## Rendu de contenu nontrusted

Le rendu du contenu non sécurisé dans Electron est encore un territoire quelque peu inconnu, bien que certaines applications trouvent le succès (par exemple Beaker Browser). Notre objectif est d’obtenir aussi près de Chrome que nous le pouvons en termes de sécurité du contenu bac à sable, mais en fin de compte, nous serons toujours en retard en raison de quelques questions fondamentales:

1. Nous n’avons pas les ressources ou l’expertise dédiées que Chromium doit appliquer à la sécurité de son produit. Nous faisons de notre mieux pour utiliser ce que nous avons , pour hériter de tout ce que nous pouvons du Chrome, et pour répondre rapidement aux problèmes de sécurité , mais Electron ne peut pas être aussi sûr que le chrome sans les ressources que chrome est en mesure de consacrer.
2. Certaines fonctionnalités de sécurité dans Chrome (telles que la navigation sécurisée et la transparence du certificat ) nécessitent une autorité centralisée et des serveurs dédiés, tous deux de qui va à l’encontre des objectifs du projet Electron. En tant que tel, nous désactivons ces fonctionnalités dans Electron, au prix de la sécurité associée qu’ils qu’ils apporteraient autrement.
3. Il n’y a qu’un seul chrome, alors qu’il existe plusieurs milliers d’applications sur Electron, qui se comportent toutes légèrement différemment. La comptabilisation de ces différences peut donner un espace de possibilité énorme, et le rendre difficile à assurer la sécurité de la plate-forme dans les cas d’utilisation inhabituelle.
4. Nous ne pouvons pas pousser directement les mises à jour de sécurité pour les utilisateurs, nous comptons donc sur les fournisseurs d’applications pour mettre à niveau la version d’Electron sous-jacente à leur application afin que les mises à jour de sécurité atteignent les utilisateurs.

Voici quelques éléments à considérer avant de rendre du contenu non fidèle :

- Un script de préchargement peut accidentellement fuir des API privilégiées vers du code non fiable, sauf si [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content) est également activé.
- Certains bogues dans le moteur V8 peuvent permettre au code malveillant d’accéder aux API de préchargement de de rendu, accordant ainsi un accès complet au système via le module `remote` . Par conséquent, il est fortement recommandé [désactiver le module `remote` module](../tutorial/security.md#15-disable-the-remote-module). Si la désactivation n’est pas possible, vous devez filtrer [le module `remote` de](../tutorial/security.md#16-filter-the-remote-module).
- Bien que nous faisons de notre mieux pour faire reculer les correctifs de sécurité chrome vers les anciennes versions d’Electron, nous ne garantissons pas que chaque correctif sera backported. Votre meilleure chance de rester en sécurité est d’être sur la dernière version stable 'Electron.
