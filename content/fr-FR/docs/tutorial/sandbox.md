# Mise en bac à sable de processus

L'une des principales fonctionnalités de sécurité de Chromium est que les processus peuvent être exécutés dans un bac à sable. The sandbox limits the harm that malicious code can cause by limiting access to most system resources — sandboxed processes can only freely use CPU cycles and memory. Afin d’effectuer des opérations nécessitant un privilège supplémentaire, les processus mis en bac à sable utilisent des canaux de communication dédiés pour déléguer des tâches à des processus plus privilégiés.

Dans Chromium, le bac à sable est appliqué à la plupart des processus autres que le processus principal. Cela inclut les processus de rendu, ainsi que les processus utilitaires tels que le service audio, le service GPU et le service réseau.

Reportez-vous au document [Conception du bac à sable][sandbox] pour plus d'informations.

## Politiques du bac à sable d’Electron

Electron est livré avec un environnement de bac à sable mixte, ce qui signifie que les processus s'y exécutant peuvent fonctionner aux côtés de processus privilégiés. Par défaut, les processus de rendu ne sont pas en bac à sable mais les processus utilitaires le sont. Notez que dans Chromium le processus principal (navigateur) est privilégié et ne peut pas être mis en bac à sable.

Historiquement, cette approche du bac à sable mixte a été établie car la disponibilité de Node.js dans le moteur de rendu est un outil extrêmement puissant pour les développeurs d'applications. Malheureusement cette fonctionnalité est également une vulnérabilité de sécurité tout aussi massive.

Théoriquement les rendus hors bac à sable ne sont pas un problème pour les applications de bureau qui affichent uniquement du code de confiance mais ils rendent Electron moins sûr que Chromium pour afficher du contenu Web non fiable. Cependant même du code prétendument fiable peut être dangereux - il existe d’innombrables vecteurs d’attaque utilisables par des acteurs malveillants, du script cross-site à l’injection de contenu aux attaques "man-in-the-middle" sur des sites Web distants chargés pour n’en nommer que quelques-uns. Pour cette raison, nous recommandons d'être très prudent et d’activer le bac à sable pour les rendus dans la grande majorité des cas.

<!--TODO: update this guide when #28466 is either solved or closed -->
Notez qu'il y a une discussion active dans le gestionnaire de tickets au sujet de l'activation par défaut de la mise en bac à sable des rendus . Voir [#28466][issue-28466]) pour plus de détails.

## Comportement du bac à sable dans Electron

Dans Electron les processus mis en bac à sable se comportent principalement de la même manière qu'avec Chromium mais il y a quelques concepts supplémentaires à considérer puisque Electron s’interface avec Node.js.

### Processus de rendu

Lorsque les processus de rendu dans Electron sont en bac à sable, ils se comportent de la même manière qu'un moteur de rendu Chrome régulier le ferait. Un moteur de rendu en bac à sable n'aura pas d'environnement Node.js initialisé.

<!-- TODO(erickzhao): when we have a solid guide for IPC, link it here -->
Par conséquent, lorsque le bac à sable est activé, les processus de rendu ne peuvent effectuer des tâches privilégiées (telles que l’interaction avec le système de fichiers, apporter des modifications au système ou engendrer des sous-processus) qu'en déléguant ces tâches au processus principal par la communication inter-processus (IPC).

### Scripts de preload

Afin de permettre aux processus de rendu de communiquer avec le processus principal, les scripts de préchargement attachés aux rendus en bac à sable auront toujours un sous-ensemble polyfill de l'API Node.js disponible. Une fonction `require` similaire au module `require` de Node module est exposée mais ne peut importer qu'un sous-ensemble des modules intégrés d'Electron et de Node :

* `electron` (uniquement les modules de processus de rendu)
* [`événements`](https://nodejs.org/api/events.html)
* [`timers`](https://nodejs.org/api/timers.html)
* [`url`](https://nodejs.org/api/url.html)

En outre, le script de préchargement simule également certaines primitives Node.js en tant que globales :

* [`Buffer`](https://nodejs.org/api/Buffer.html)
* [`processus (process)`](../api/process.md)
* [`clearImmédite`](https://nodejs.org/api/timers.html#timers_clearimmediate_immediate)
* [`setImmédite`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args)

Étant donné que la fonction `require` est un polyfill avec des fonctionnalités limitées, vous ne serez pas en mesure d’utiliser [modules CommonJS][commonjs] pour séparer votre script de préchargement en plusieurs fichiers . Si vous avez besoin de diviser votre code de préchargement, utilisez un groupeur de module tel que [webpack][webpack] ou [Parcel][parcel].

Notez que parce que l’environnement présenté au script `preload` est sensiblement plus privilégié que celui d’un rendu en bac à sable, il est toujours possible de créer une fuite des API privilégiées vers du code non sécurisé en cours d’exécution dans le processus de rendu à moins que [`contextIsolation`][contextIsolation] ne soit activé.

## Configuration du bac à sable

### Activation du bac à sable pour un processus unique

Dans Electron, la mise en bac à sable d'un rendu peut être activé par processus avec la préférence `sandbox: true` dans le constructeur de la [`BrowserWindow`][browser-window].

```js
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('https://google.com')
})
```

### Activation globale du bac à sable

Si vous souhaitez activer de force le bac à sable pour tous les rendus, vous pouvez également utiliser l' [`app.enableSandbox`][enable-sandbox] API. Notez que cette API doit être appelée avant l'événement `ready` de l’application.

```js
// main.js
app.enableSandbox()
app.whenReady().then(() => {
  // inutile de passer `sandbox: true` puisque `app.enableSandbox()` a été appelé.
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```

### Désactivation du bac à sable de Chromium (pour test uniquement)

Vous pouvez également désactiver entièrement le bac à sable de Chromium avec le drapeau CLI [`--no-sandbox`][no-sandbox] , qui le désactivera pour tous les processus (y compris les processus utilitaires). Nous vous recommandons fortement d'utiliser ce drapeau uniquement à des fins de test, et **jamais** en production.

Notez que l'option `sandbox : true` désactivera toujours l'environnement Node.js du moteur de rendu .

## Une note sur le rendu de contenu non fiable

Le rendu de contenu non fiable dans Electron est encore un territoire quelque peu inconnu, bien que certaines applications trouvent le succès (par exemple. [Beaker Browser][beaker]). Notre objectif est de nous rapprocher le plus possible de Chrome en termes de sécurité des contenus en bac à sable, mais en fin de compte, nous serons toujours à la traîne en raison de quelques problèmes fondamentaux :

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. Il n'y a qu'un seul Chromium, alors qu'il y a plusieurs milliers d'applications créées sur Electron, qui se comportent tous légèrement différemment. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

Alors que nous faisons de notre mieux pour rétroporter les correctifs de sécurité Chromium vers d'anciennes versions d'Electron, nous ne garantissons pas que chaque correctif sera rétroporté. Votre meilleure chance de rester en sécurité est d'être sur la dernière version stable d'Electron.

[sandbox]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[issue-28466]: https://github.com/electron/electron/issues/28466
[browser-window]: ../api/browser-window.md
[enable-sandbox]: ../api/app.md#appenablesandbox
[no-sandbox]: ../api/command-line-switches.md#--no-sandbox
[commonjs]: https://nodejs.org/api/modules.html#modules_modules_commonjs_modules
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[beaker]: https://github.com/beakerbrowser/beaker
