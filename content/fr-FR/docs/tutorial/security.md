# Sécurité, fonctionnalités natives et votre responsabilité

En tant que développeurs web, nous apprécions généralement le réseau de sécurité du navigateur - les risques associés au code que nous écrivons sont relativement faibles. Nos sites Web bénéficient de pouvoirs limités dans un bac à sable, et nous sommes convaincus que nos utilisateurs bénéficient d'un navigateur construit par une grande équipe d'ingénieurs capables de répondre rapidement aux menaces de sécurité récemment découvertes.

Lorsque vous travaillez avec Electron, il est important de comprendre que l’Electron n’est pas un navigateur web. Il vous permet de developper des applications de bureau riche en fonctionnalités avec des technologies web familières, mais votre code exerce un pouvoir beaucoup plus grand. JavaScript peut accéder au système de fichiers, au shell et bien plus. Cela vous permet de développer des applications natives de haute qualité, mais les risques de sécurité inhérents évoluent avec les pouvoirs supplémentaires accordés à votre code.

Dans cet esprit, sachez qu’afficher un contenu arbitraire de sources peu fiables est un grave risque pour la sécurité qu'Electron n’est pas destiné à gérer. En fait, les applications les plus populaires Electron (Atom, Slack, Visual Studio Code, etc.) affichent principalement du contenu local (ou un contenu distant fiable et sécurisé sans intégration de Node) – si votre application exécute le code provenant d’une source en ligne, il est de votre responsabilité de vous assurer que le code n’est pas malveillant.

## Signalement des problèmes de sécurité

Pour plus d’informations sur la façon de communiquer correctement une vulnérabilité d'Electron, voir [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Problèmes de sécurité et mises à jour de Chromium

Electron se tient à jour avec les versions alternatives de Chromium. Pour plus d'informations, voir le blog [Electron Release Cadence](https://electronjs.org/blog/12-week-cadence).

## La sécurité est la responsabilité de tous

Il est important de se rappeler que la sécurité de votre application Electron dépend de la sécurité globalement de la fondation du framework (*Chromium*, *Node.js*), Electron lui-même, toutes les dépendances NPM et votre code. Ainsi, il est de votre responsabilité de suivre quelques pratiques essentielles de test :

* **Gardez votre application à jour avec la dernière version de framework Electron. /0> Lorsque vous libérez votre produit, vous expédiez également un paquet composé d'Electron, bibliothèque partagée Chromium et Node.js. Les vulnérabilités affectant ces composants peuvent affecter la sécurité de votre application. En mettant à jour Electron vers la dernière version vous vous assurez que les vulnérabilités critiques (telles que *nodeIntegration bypasses*) sont déjà corrigées et ne peuvent pas être exploitées dans votre application. Pour plus d'informations, voir "[Utiliser une version actuelle d'Electron](#15-use-a-current-version-of-electron)".</p></li>

* **Évaluez vos dépendances.** Alors que NPM fournit un demi-million de paquets réutilisables, il est de votre responsabilité de choisir des bibliothèques de tiers de confiance. Si vous utilisez des bibliothèques obsolètes affectées par des vulnérabilités connues ou si vous êtes dépendants d'un code mal géré, la sécurité de votre application pourrait être compromise.

* **Adoptez des pratiques de codage sécurisées.** La première ligne de défense pour votre application est votre propre code. Des vulnérabilités web courantes, telles que le cross-site scripting (XSS), ont un impact de sécurité plus élevé sur les applications Electron, c'est pourquoi il est fortement recommandé d'adopter des meilleures pratiques de développement de logiciel sécurisé et d'effectuer des tests de sécurité.</ul>

## Isolation pour les contenus non approuvés

Un problème de sécurité existe chaque fois que vous recevez du code d'une source non fiable (par exemple, un serveur distant) et que vous l'exécutez localement. À titre d'exemple, considérez qu'un site Web distant est affiché à l'intérieur d'un [`BrowserWindow`][browser-window] par défaut. Si un attaquant parvient d'une manière ou d'une autre à modifier ledit contenu (soit en s'attaquant directement à la source, ou en se plaçant entre votre application et la destination voulue), il sera en mesure d'exécuter le code natif sur la machine de l'utilisateur.

> :warning: en aucune circonstance vous devriez charger et exécuter du code distant avec l'intégration de Node.js activé. Utilisez plutôt les fichiers locaux (empaquetés avec votre application) pour exécuter le code de Node. Pour afficher du contenu à distance, utilisez le tag  [`<webview>`][webview-tag] ou [`BrowserView`][browser-view], assurez-vous de désactiver `nodeIntegration` et d'activer `contextIsolation`.

## Avertissements de sécurité d'Electron

A partir d'Electron 2.0, les développeurs recevront des avertissements et recommandations directement dans la console de développement. Ils n'apparaissent que lorsque le nom du binaire est Electron, indiquant qu'un développeur regarde actuellement la console.

Vous pouvez forcer l'activation ou la désactivation ces avertissements en définissant `ELECTRON_ENABLE_SECURITY_WARNINGS` ou `ELECTRON_DISABLE_SECURITY_WARNINGS` sur `process.env` ou sur l’objet `window`.

## Checklist : recommandations de sécurité

Vous devriez au moins suivre ces étapes pour améliorer la sécurité de votre application :

1. [Charger uniquement du contenu sécurisé](#1-only-load-secure-content)
2. [Désactiver l'intégration de Node.js dans tous les moteurs de rendu qui affichent du contenu distant](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Activer l'isolement du contexte dans tous les moteurs de rendu qui affichent le contenu distant](#3-enable-context-isolation-for-remote-content)
4. [Utiliser `ses.setPermissionRequestHandler()` dans toutes les sessions qui se chargent de contenu distant](#4-handle-session-permission-requests-from-remote-content)
5. [Ne pas désactiver `webSecurity`](#5-do-not-disable-websecurity)
6. [Définissez une `Content-Security-Policy`](#6-define-a-content-security-policy) et utilisez des règles restrictives (c.-à-d. `script-src 'self'`)
7. [Ne pas définir `allowRunningInsecureContent` à `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Ne pas activer les fonctionnalités expérimentales](#8-do-not-enable-experimental-features)
9. [Ne pas utiliser `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>` : N'utilisez pas `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Vérifier les options et les paramètres](#11-verify-webview-options-before-creation)
12. [Désactiver ou limiter la navigation](#12-disable-or-limit-navigation)
13. [Désactiver ou limiter la création de nouvelles fenêtres](#13-disable-or-limit-creation-of-new-windows)
14. [Ne pas utiliser `openExternal` avec un contenu non fiable](#14-do-not-use-openexternal-with-untrusted-content)
15. [Utiliser une version actuelle d'Electron](#15-use-a-current-version-of-electron)

Pour automatiser la détection de mauvaises configurations et de patrons non sécurisés, il est possible d'utiliser [electronegativity](https://github.com/doyensec/electronegativity). Pour plus de détails sur les faiblesses potentielles et les bogues d'implémentation lorsque développant des applications utilisant Electron, veuillez vous référer à ce [guide pour développeurs et auditeurs](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Ne télécharger que des contenus sécurisés

Toutes les ressources non incluses avec votre application doivent être téléchargées à l’aide d’un protocole sécurisé `HTTPS`. En d’autres termes, n’utilisez pas de protocoles non sécurisés tels que `HTTP`. De même, nous vous recommandons d’utiliser `WSS` plutôt `WS`, `FTPS` par `FTP` et ainsi de suite.

### Pourquoi ?

`HTTPS` a trois principaux avantages :

1) Il authentifie le serveur distant, ce qui certifie que votre application se connecte au bon hôte plutôt qu'a un imitateur. 2) Il assure l'intégrité des données, certifiant que les données n'ont pas été modifiées durant le transit entre l'application et l'hôte. 3) Il encrypte le trafic entre votre l'utilisateur et l'hôte de destination, ce qui complique la tâche de quiconque voudrait épier les informations échangées entre l'hôte et votre application.

### Comment ?

```js
// Incorrect
browserWindow.loadURL('http://example.com')

// Correct
browserWindow.loadURL('https://example.com')
```

```html
<!-- Incorrect -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Correct -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Ne pas activer l'intégration de Node.js pour le contenu distant

_Cette recommandation est le comportement par défaut d'Electron depuis la version 5.0.0._

Il est primordial que vous n'activiez pas l'intégration de Node.js dans aucun moteur de rendu ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], ou [`<webview>`][webview-tag]<3></2>) qui charge le contenu distant. Le but est de limiter les permissions accordées aux contenus distants, ce qui complique drastiquement la tâche pour un attaquant qui souhaiterait nuire à vos utilisateurs (si jamais cet attaquant réussissait à exécuter du javascript sur votre site).

Une fois cela fait, vous pouvez accorder des permissions supplémentaires à des hôtes spécifiques. Par exemple, si vous ouvrez un BrowserWindow pointé sur `https://example. om/`, vous pouvez donner à ce site exactement les capacités dont il a besoin, mais pas plus.

### Pourquoi ?

Une attaque cross-site-scripting (XSS) est plus dangereuse si un attaquant peut sortir du processus de rendu et exécuter du code sur l'ordinateur de l'utilisateur. Les attaques de type cross-site-scripting sont assez courantes - et tant qu'un problème, leur pouvoir se limite généralement à gâcher avec le site Web sur lequel ils sont exécutés. La désactivation de l'intégration de Node.js aide à empêcher un XSS d'être escaladé pour devenir une attaque appelée "Exécution de Code distant" (RCE).

### Comment ?

```js
// Mauvais
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Bon
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Incorrect -->
<webview nodeIntegration src="page.html"></webview>

<!-- Correct -->
<webview src="page.html"></webview>
```

Lors de la désactivation de l'intégration de Node.js, vous pouvez toujours exposer des API à votre site web qui consomment des modules ou des fonctionnalités de Node.js. Les scripts de préchargement continuent d'avoir accès à `require` et aux autres fonctionnalités de Node.js, permettant aux développeurs d'exposer une API personnalisée au contenu chargé à distance.

Dans l'exemple suivant du script de préchargement, le site web chargé plus tard aura accès à une méthode `window.readConfig()`, mais aucune fonctionnalité Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Activer l'isolement du contexte pour le contenu distant

L'isolement du contexte est une fonctionnalité d'Electron qui permet aux développeurs d'exécuter du code dans les scripts de préchargement et dans les API Electron dans un contexte JavaScript dédié. Dans la pratique cela signifie que les objets globaux comme `Array.prototype.push` ou `JSON.parse` ne peuvent pas être modifiés par les scripts exécutés dans le processus de rendu.

L'électron utilise la même technologie que le chrome [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) pour permettre ce comportement.

Même lorsque `nodeIntegration: false` est utilisé, pour vraiment appliquer une isolation forte et empêcher l'utilisation de Node primitives `contextIsolation` **doivent** également être utilisées.

### Pourquoi & Comment ?

Pour plus d'informations sur ce qu'est `contextIsolation` et comment l'activer, veuillez voir notre document dédié [Isolation de contexte](context-isolation.md).

## 4) Gérer les demandes d'autorisation de session à partir du contenu distant

Vous avez peut-être vu des demandes d'autorisation lors de l'utilisation de Chrome : elles apparaissent chaque fois que le site Web tente d'utiliser une fonctionnalité que l'utilisateur doit approuver manuellement ( comme les notifications).

L'API se base sur [l'API de permissions Chromium](https://developer.chrome.com/extensions/permissions) et implémente le même type de permissions.

### Pourquoi ?

Par défaut, Electron approuvera automatiquement toutes les demandes de permission, sauf si le développeur a manuellement configuré un gestionnaire personnalisé. Bien que la valeur par défaut soit solide, les développeurs soucieux de la sécurité pourraient vouloir assumer le contraire.

### Comment ?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Ne pas désactiver WebSecurity

_Cette recommandation est appliquée par défaut sur Electron_

Vous avez peut-être déjà deviné que la désactivation de la propriété `webSecurity` sur un processus de rendu ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], ou [`<webview>`][webview-tag]<4></code></a>) désactive les fonctionnalités de sécurité cruciales .

Ne pas désactiver `webSecurity` dans les applications de production.

### Pourquoi ?

Désactiver `webSecurity` désactivera la politique de même origine et définira la propriété `allowRunningInsecureContent` à `true`. En d'autres termes, il permet l'exécution de code non sécurisé à partir de différents domaines.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow()
```

```html
<!-- Incorrect -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Correct -->
<webview src="page.html"></webview>
```

## 6) Définir une politique de sécurité de contenu

Une politique de sécurité de contenu (CSP) est une couche supplémentaire de protection contre des attaques cross-site-scripting et des attaques d'injection de données. Nous recommandons qu'ils soient activés par n'importe quel site Web que vous chargez dans Electron.

### Pourquoi ?

CSP permet au serveur servant le contenu de restreindre et de contrôler les ressources Electron peut charger pour cette page web. `https://example.com` devrait être autorisé à charger des scripts depuis les origines que vous avez définies alors que les scripts de `https://evil.attacker.com` ne devraient pas être autorisés à s'exécuter. Définir un CSP est un moyen facile d'améliorer la sécurité de votre application.

Le CSP suivant permettra à Electron d'exécuter des scripts depuis le site web actuel et depuis `apis.example.com`.

```plaintext
// Incorrect
Content-Security-Policy: '*'

// Correct
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Entête CSP HTTP

Electron respecte le [`Content-Security-Policy` en-tête HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) qui peut être défini en utilisant le gestionnaire [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) d'Electron :

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

Le mécanisme de livraison préféré de CSP est un en-tête HTTP, cependant il n'est pas possible d'utiliser cette méthode lors du chargement d'une ressource en utilisant le protocole `file://`. Il peut être utile dans certains cas, par exemple en utilisant le protocole `file://` , pour définir une politique sur une page directement dans le balisage en utilisant une balise `< meta>` :

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Ne pas définir `allowRunningInsecureContent` à `true`

_Cette recommandation est appliquée par défaut sur Electron_

Par défaut, Electron n'autorisera pas les sites Web chargés sur `HTTPS` à charger et exécuter des scripts, CSS ou plugins à partir de sources non sécurisées (`HTTP`). Définir la propriété `allowRunningInsecureContent` à `true` désactive cette protection.

Chargement du HTML initial d'un site sur `HTTPS` et tentative de chargement de ressources ultérieures via `HTTP` est aussi connu sous le nom de "contenu mixte".

### Pourquoi ?

Le chargement du contenu sur `HTTPS` assure l'authenticité et l'intégrité des ressources chargées tout en chiffrant le trafic lui-même. Consultez la section sur l' [affichage du contenu sécurisé uniquement](#1-only-load-secure-content) pour plus de détails.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow({})
```

## 8) N'autorisez pas de fonctionnalités expérimentales

_Cette recommandation est appliquée par défaut sur Electron_

Les utilisateurs avancés d'Electron peuvent activer les fonctionnalités expérimentales de Chromium en utilisant la propriété `fonctionnalités expérimentales`.

### Pourquoi ?

Les fonctionnalités expérimentales sont, comme le nom le suggère, expérimentales et n'ont pas été activées pour tous les utilisateurs de Chromium. De plus, leur impact sur Electron dans son ensemble n'a probablement pas été testé.

Il est parfois légitime de les implémenter, mais à moins que vous sachiez vraiment ce que vous faites, vous ne devriez pas autoriser ces fonctionnalités.

### Comment ?

```js
// Incorrect
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow({})
```

## 9) N'utilisez pas `enableBlinkFeatures`

_Cette recommandation est appliquée par défaut sur Electron_

Blink est le nom du moteur de rendu derrière Chromium. Comme pour `experimentalFeatures`, la propriété `enableBlinkFeatures` permet aux développeurs d'activer les fonctionnalités qui ont été désactivées par défaut.

### Pourquoi ?

De manière générale, il y a probablement de bonnes raisons si une fonctionnalité n'était pas activée par défaut. Il existe des cas d'utilisation légitime pour l'activation de fonctionnalités spécifiques. En tant que développeur , vous devriez savoir exactement pourquoi vous avez besoin d'activer une fonctionnalité, quelles sont les ramifications et comment elles ont un impact sur la sécurité de votre application. En aucune circonstance ne devrait vous permettre d'activer des fonctionnalités de manière spéculative.

### Comment ?

```js
// Mauvais
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Correct
const mainWindow = new BrowserWindow()
```

## 10) Ne pas utiliser `allowpopups`

_Cette recommandation est appliquée par défaut sur Electron_

Si vous utilisez [`<webview>`][webview-tag]`<webview>`</0>, vous aurez peut-être besoin des pages et des scripts chargés dans votre balise <2> pour ouvrir de nouvelles fenêtres. L'attribut `allowpopups` leur permet de créer un nouveau [`BrowserWindows`][browser-window] en utilisant la méthode `window.open()`. Les balises `<webview>` ne sont pas autorisées à créer de nouvelles fenêtres .

### Pourquoi ?

Si vous n'avez pas besoin de popups, il vaut mieux ne pas autoriser la création de nouveaux [`BrowserWindows`][browser-window] par défaut. Cela suit le principe d'accès minimum requis : ne laissez pas un site web créer de nouvelles fenêtres popups à moins que vous sachiez qu'il a besoin de cette fonctionnalité.

### Comment ?

```html
<!-- Incorrect -->
<webview allowpopups src="page.html"></webview>

<!-- Correct -->
<webview src="page.html"></webview>
```

## 11) Vérifiez les options de WebView avant la création

Un WebView créé dans un processus de rendu qui n'a pas d'intégration Node.js activé ne sera pas en mesure d'activer l'intégration elle-même. Cependant, un WebView créera toujours un processus de rendu indépendant avec ses propres `webPreferences`.

C'est une bonne idée de contrôler la création de nouvelles balises [`<webview>`][webview-tag]<1></0> depuis le processus principal et de vérifier que leurs préférences web ne désactivent pas les fonctions de sécurité .

### Pourquoi ?

Depuis que `<webview>` vivent dans le DOM, ils peuvent être créés par un script exécuté sur votre site web même si l'intégration de Node.js est désactivée.

Electron permet aux développeurs de désactiver diverses fonctionnalités de sécurité qui contrôlent un processus de rendu. Dans la plupart des cas, les développeurs n'ont pas besoin de désactiver ces fonctionnalités - et vous ne devriez donc pas autoriser différentes configurations pour les balises [`<webview>`][webview-tag]<1></0> nouvellement créées.

### Comment ?

Avant qu'un tag [`<webview>`][webview-tag]`</0> ne soit attaché, Electron lancera l'événement
<2>will-attach-webview</2> sur l'hébergement <2>webContents</2>. Utilisez l'événement pour
empêcher la création de <code>webViews` avec des options potentiellement non sécurisées.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Encore une fois, cette liste ne fait que minimiser le risque, elle ne le supprime pas. Si votre objectif est d'afficher un site web, un navigateur sera une option plus sûre.

## 12) Désactiver ou limiter la navigation

Si votre application n'a pas besoin de naviguer ou a seulement besoin de naviguer vers des pages connues, c'est une bonne idée de limiter la navigation directement à cette portée connue, interdire tout autre type de navigation.

### Pourquoi ?

La navigation est un vecteur d'attaque courant. Si un attaquant peut convaincre votre application de naviguer loin de sa page actuelle, ils peuvent éventuellement forcer votre application à ouvrir sites web sur Internet. Même si vos `webContents` sont configurés pour être plus sécurisé (comme avoir `nodeIntegration` désactivé ou `contextIsolation` activé), pour que votre application ouvre un site web aléatoire rendra le travail d'exploiter votre application beaucoup plus facile.

Un modèle d'attaque courant est que l'attaquant convainc les utilisateurs de votre application d'interagir avec l'application de manière à ce qu'il navigue sur l'une des pages de l'attaquant. Cela se fait généralement par le biais de liens, de plugins, ou d'autres contenus générés par l'utilisateur.

### Comment ?

Si votre application n'a pas besoin de navigation, vous pouvez appeler `event.preventDefault()` dans un gestionnaire [`navigate`][will-navigate]. Si vous savez vers quelles pages votre application peut naviguer, vérifiez l'URL dans le gestionnaire d'événements et laissez seulement la navigation se produire si elle correspond aux URL que vous attendez.

Nous vous recommandons d'utiliser l'analyseur de Node pour les URL. Des comparaisons simples de chaînes de caractères peuvent parfois être dupliquées - un test `startsWith('https://example.com')` laisserait pas `https://example.com.attacker.com` à travers.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contenu. n('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl. rigin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Désactiver ou limiter la création de nouvelles fenêtres

Si vous avez un ensemble connu de fenêtres, il est bon de limiter la création de fenêtres supplémentaires dans votre application.

### Pourquoi ?

Tout comme la navigation, la création de nouveaux `webContents` est un vecteur d'attaque commun . Les attaquants tentent de convaincre votre application de créer de nouvelles fenêtres, cadres, ou d'autres processus de rendu avec plus de privilèges qu'avant; ou avec des pages ouvertes qu'ils ne pouvaient pas ouvrir avant.

Si vous n'avez pas besoin de créer des fenêtres en plus de celles que vous savez que vous aurez besoin de créer, la désactivation de la création vous permet d'acheter gratuitement un peu de sécurité supplémentaire. C'est généralement le cas pour les applications qui ouvrent une `BrowserWindow` et n'ont pas besoin d'ouvrir un nombre arbitraire de fenêtres supplémentaires à l'exécution.

### Comment ?

[`webContents`][web-contents] will delegate to its [window open handler][window-open-handler] before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) N'utilisez pas `openExternal` avec du contenu non fiable

Le [`openExternal`][open-external] de Shell permet d'ouvrir un URI de protocole donné avec les utilitaires natifs du bureau. Sur macOS, par exemple, cette fonction est similaire à l'utilitaire de commande terminal `open` et ouvrira l'application spécifique basée sur l'URI et l'association de type fichier.

### Pourquoi ?

L'utilisation incorrecte de [`openExternal`][open-external] peut être utilisée pour compromettre l'hôte de l'utilisateur. Lorsque openExternal est utilisé avec du contenu non fiable, il peut être exploité pour exécuter des commandes arbitraires.

### Comment ?

```js
// Mauvais
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
// Bon
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Utiliser une version actuelle d'Electron

Vous devriez toujours vous efforcer d'utiliser la dernière version disponible d'Electron. Chaque fois qu'une nouvelle version majeure est publiée, vous devriez essayer de mettre à jour votre application le plus rapidement possible.

### Pourquoi ?

Une application construite avec une ancienne version d'Electron, de Chromium ou de Node.js est une cible plus facile qu'une application qui utilise des versions plus récentes de ces composants. De manière générale, les problèmes de sécurité et les exploitation de failles pour les anciennes versions de Chromium et de Node.js sont plus fréquentes.

Chromium et Node.js représentent des prouesses impressionnantes d'ingénierie produites par des milliers de développeurs talentueux. Compte tenu de leur popularité, leur sécurité est soigneusement testée et analysée par des chercheurs en sécurité tout aussi compétents. Beaucoup de ces chercheurs [révèlent des vulnérabilités de manière responsable][responsible-disclosure], ce qui signifie généralement que les chercheurs donnent de leur temps à Chromium et Node.js pour résoudre les problèmes avant de les publier. Votre application sera plus sécurisée si elle exécute une version récente d'Electron (et donc Chromium et Node.js) dont les problèmes de sécurité potentiels ne sont pas aussi connus.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
