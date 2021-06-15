# Performance

Developers frequently ask about strategies to optimize the performance of Electron applications. Software engineers, consumers, and framework developers do not always agree on one single definition of what "performance" means. This document outlines some of the Electron maintainers' favorite ways to reduce the amount of memory, CPU, and disk resources being used while ensuring that your app is responsive to user input and completes operations as quickly as possible. De plus, nous voulons que toutes les stratégies de performance maintiennent un standard élevé pour la sécurité de votre application.

La sagesse et les informations sur la façon de construire des sites Web performants avec JavaScript s'appliquent généralement aussi aux applications Electron. Dans une certaine mesure, les ressources discutant de la façon de construire un nœud performant. s applications aussi s'appliquent, mais faites attention à comprendre que le terme "performance" signifie des choses différentes pour un nœud. s backend que pour une application exécutée sur un client.

This list is provided for your convenience – and is, much like our [security checklist][security] – not meant to exhaustive. Il est probablement possible de construire une application Electron lente qui suit toutes les étapes décrites ci-dessous. Electron est une puissante plate-forme de développement qui vous permet, en tant que développeur, de faire plus de ou moins ce que vous voulez. Tout ce que la liberté signifie que la performance est largement votre responsabilité.

## Mesure, Mesure, Mesurer

La liste ci-dessous contient un certain nombre d'étapes qui sont assez simples et faciles à implémenter. Cependant, construire la version la plus performante de votre application vous demandera d'aller au-delà d'un certain nombre d'étapes. Au lieu de cela, vous devrez examiner attentivement tout le code qui s'exécute dans votre application en mesurant soigneusement et le profilage. Où sont les goulets d'étranglement ? Quand l'utilisateur clique sur un bouton, quelles opérations prennent le plus de temps ? Pendant que l'application est simplement au ralliement, quels objets prennent le plus de mémoire ?

À maintes reprises, nous avons vu que la stratégie la plus réussie pour construire une application Electron performante est de profiler le code en cours d'exécution, trouver la pièce la plus touchée par de ressources et l'optimiser. Répéter ce processus apparemment laborieux encore et encore augmentera considérablement les performances de votre application. Expérience de travailler avec des applications majeures telles que Visual Studio Code ou Slack a montré que cette pratique est de loin la stratégie la plus fiable pour améliorer les performances.

Pour en savoir plus sur la façon de profiler le code de votre application, familiarisez-vous avec les Outils de développement Chrome. Pour une analyse avancée en regardant plusieurs processus à la fois, considérez l'outil [de traçage Chrome](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

### Lecture recommandée

* [Commencer avec l'analyse des performances d'exécution][chrome-devtools-tutorial]
* [Conférence: "Visual Studio Code - The First Second"][vscode-first-second]

## Liste de contrôle

Il y a des chances que votre application soit un peu plus légère, plus rapide et généralement moins gourmande en ressources si vous essayez ces étapes.

1. [Inutile d'inclure des modules](#1-carelessly-including-modules)
2. [Chargement et exécution du code trop tôt](#2-loading-and-running-code-too-soon)
3. [Blocage du processus principal](#3-blocking-the-main-process)
4. [Blocage du processus de rendu](#4-blocking-the-renderer-process)
5. [Polycompléments inutiles](#5-unnecessary-polyfills)
6. [Innécessaire ou bloquer les requêtes réseau](#6-unnecessary-or-blocking-network-requests)
7. [Bundle ton code](#7-bundle-your-code)

## 1) Inutile d'inclure des modules

Avant d'ajouter un module Node.js à votre application, examinez ledit module. Combien de de dépendances contient ce module ? Quel type de ressources a-t-il besoin d'être simplement appelé dans une instruction `require()`? Vous pouvez trouver que le module avec le plus de téléchargements sur le Registre de Paquets NPM ou le plus d'étoiles sur GitHub n'est en fait pas le plus maigre ou le plus petit disponible.

### Pourquoi ?

Le raisonnement qui sous-tend cette recommandation est mieux illustré par un exemple de monde réel . Durant les premiers jours d'Electron, la détection fiable de la connectivité réseau était un problème résultant de nombreuses applications à utiliser un module qui a exposé une méthode simple `isOnline()`.

Ce module a détecté votre connectivité réseau en essayant d'atteindre un nombre de terminaux connus. Pour la liste de ces extrémités, il dépendait de un autre module, qui contenait également une liste de ports connus. Cette dépendance a elle-même reposé sur un module contenant des informations sur les ports, ce que est venu sous la forme d'un fichier JSON avec plus de 100.000 lignes de contenu. À chaque fois que le module a été chargé (généralement dans une instruction `require('module')` ), il chargerait toutes ses dépendances et finirait par lire et analyser ce fichier JSON . L'analyse de plusieurs milliers de lignes de JSON est une opération très coûteuse. Sur une machine lente, elle peut prendre des secondes entières de temps.

Dans de nombreux contextes de serveur, le temps de démarrage est pratiquement insignifiant. Un nœud. s serveur qui requiert des informations sur tous les ports est probablement "plus performant" s'il charge toutes les informations requises en mémoire chaque fois que le serveur démarre à l'avantage de traiter les requêtes plus rapidement. Le module discuté dans cet exemple n'est pas un module "mauvais". Cependant, les applications Electron ne devraient pas être en train de charger, d'analyser et de stocker dans des informations mémoire dont elle n'a pas réellement besoin.

En bref, un module apparemment excellent écrit principalement pour les serveurs Node.js fonctionnant sous Linux pourrait être une mauvaise nouvelle pour les performances de votre application. Dans cet exemple particulier de , la bonne solution était de ne pas utiliser de module du tout, et pour utiliser les vérifications de connectivité incluses dans les versions ultérieures de Chromium.

### Comment ?

Lorsque vous envisagez un module, nous vous recommandons de vérifier :

1. the size of dependencies included
2. the resources required to load (`require()`) it
3. les ressources nécessaires pour effectuer l'action qui vous intéresse

La génération d'un profil CPU et d'un profil de mémoire de tas pour le chargement d'un module peut être effectuée avec une seule commande sur la ligne de commande. Dans l'exemple ci-dessous, nous regardons la demande populaire `du module`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

L'exécution de cette commande aboutit à un fichier `.cpuprofile` et un fichier `.heapprofile` dans le répertoire dans lequel vous l'avez exécuté. Les deux fichiers peuvent être analysés en utilisant les outils de développement Chrome, en utilisant respectivement les onglets `Performance` et `Mémoire` .

![Profil de performance de CPU][4]

![Profil de performance de la mémoire du tas][5]

Dans cet exemple, sur la machine de l'auteur, nous avons vu que le chargement du module Request `` a pris près d'une demi-seconde, alors que `node-fetch` a pris beaucoup moins de mémoire et moins de 50ms.

## 2) Chargement et exécution du code trop tôt

Si vous avez des opérations de configuration coûteuses, envisagez de les reporter. Inspectez tous les travaux en cours d'exécution juste après le démarrage de l'application. Au lieu de tirer sur toutes les opérations immédiatement, envisagez de les étourdir dans une séquence plus étroitement alignée avec le voyage de l'utilisateur.

Dans le développement traditionnel de Node.js, nous avons l'habitude de mettre toutes nos instructions `require()` en haut. Si vous écrivez actuellement votre application Electron en utilisant la même stratégie _et_ utilisent des modules de taille dont vous n'avez pas besoin immédiatement appliquer la même stratégie et reporter le chargement à un temps plus opportun.

### Pourquoi ?

Le chargement de modules est une opération étonnamment onéreuse, en particulier sur Windows. Lorsque votre application démarre, elle ne devrait pas obliger les utilisateurs à attendre des opérations qui ne sont pas actuellement nécessaires.

Cela peut sembler évident, mais beaucoup d'applications ont tendance à faire une grande partie de travail immédiatement après le lancement de l'application - comme la recherche de mises à jour, télécharger du contenu utilisé dans un flux ultérieur, ou effectuer des opérations d'E/S disque lourd de disque.

Prenons l'exemple de Visual Studio Code. Lorsque vous ouvrez un fichier, il vous affichera immédiatement le fichier sans surligner le code, en priorisant votre capacité à interagir avec le texte. Une fois qu'il aura fait ce travail, il passera à la mise en surbrillance du code.

### Comment ?

Prenons un exemple et supposons que votre application analyse les fichiers au format fictif `.foo`. Pour cela, il s'appuie sur le module également fictif `de l'analyseur de foo-`. Dans le développement traditionnel de Node.js, vous pouvez écrire du code qui charge fortement les dépendances:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

In the above example, we're doing a lot of work that's being executed as soon as the file is loaded. Devons-nous immédiatement obtenir des fichiers analysés ? Pourrions-nous faire ce travail un peu plus tard, quand `getParsedFiles()` est réellement appelé ?

```js
// "fs" est susceptible d'être déjà chargé, donc l'appel `require()` est bon marché
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touchez le disque dès que `getFiles` est appelé, pas plus tôt.
    // Assurez-vous également que nous ne bloquons pas les autres opérations en utilisant
    // la version asynchrone.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Puisque `require()` est fourni avec un cache de module, l'appel `require()`
    // ne sera coûteux qu'une seule fois - les appels suivants de `getParsedFiles()`
    // seront plus rapides.
    const fooParser = require('foo-parser')
    fichiers const = attendre this.getFiles()

    retourner fooParser. arse(fichiers)
  }
}

// Cette opération est maintenant beaucoup moins chère que dans notre exemple précédent
const parser = new Parser()

module. xports = { parser }
```

En bref, allouer des ressources « juste à temps » plutôt que de les allouer toutes lorsque votre application démarre.

## 3) Blocage du processus principal

Le processus principal d'Electron (parfois appelé "processus de navigateur") est spécial : c'est le processus parent de tous les autres processus de votre application et le processus primaire avec lequel le système d'exploitation interagit. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

En aucun cas vous ne devez bloquer ce processus et le fil de discussion de l'interface utilisateur avec des opérations de longue durée. Bloquer le fil de discussion de l'interface signifie que toute votre application se figera jusqu'à ce que le processus principal soit prêt à continuer le traitement.

### Pourquoi ?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. Si votre fenêtre affiche une animation lisse au beurre, il aura besoin de parler à le processus GPU à ce sujet - une fois de plus passer par le processus principal.

Electron et Chromium veillent à placer des opérations lourdes d'E/S disque et de liaison avec le processeur sur de nouveaux threads pour éviter de bloquer le fil d'interface utilisateur. Vous devriez en faire de même.

### Comment ?

Electron's powerful multi-process architecture stands ready to assist you with your long-running tasks, but also includes a small number of performance traps.

1) For long running CPU-heavy tasks, make use of [worker threads][worker-threads], consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Évitez d'utiliser l'IPC synchrone et le module `distant` autant que possible. Bien qu'il y ait des cas d'utilisation légitimes, il est beaucoup trop facile de bloquer inconsciemment le thread de l'interface en utilisant le module `distant`.

3) Évitez d'utiliser les opérations de blocage d'E/S dans le processus principal. Bref, chaque fois que des modules coeur de Node.js (comme `fs` ou `child_process`) offrent une version synchrone ou une version asynchrone vous devriez préférer la variante asynchrone et non-bloquant .

## 4) Blocage du processus de rendu

Puisque Electron est livré avec une version actuelle de Chrome, vous pouvez utiliser les dernières fonctionnalités et les meilleures de la plateforme Web pour différer ou décharger des opérations lourdes de manière à garder votre application en douceur et réactive.

### Pourquoi ?

Votre application a probablement beaucoup de JavaScript à exécuter dans le processus de rendu. L'astuce est d'exécuter des opérations aussi rapidement que possible sans enlever ressources nécessaires pour garder le défilement lisse, répondre à l'entrée de l'utilisateur, ou les animations à 60fps.

L'orchestration du flux d'opérations dans le code de votre moteur de rendu est particulièrement utile si les utilisateurs se plaignent parfois de votre application "stuttering".

### Comment ?

De manière générale, tous les conseils pour créer des applications web performantes pour les navigateurs modernes s'appliquent également aux moteurs de rendu d'Electron. The two primary tools at your disposal  are currently `requestIdleCallback()` for small operations and `Web Workers` for long-running operations.

*`requestIdleCallback()`* permet aux développeurs de mettre en file d'attente une fonction à exécuter dès que le processus entre une période d'inactivité. Il vous permet de effectuer des tâches de faible priorité ou en arrière-plan sans affecter l'expérience utilisateur. For more information about how to use it, [check out its documentation on MDN][request-idle-callback].

*Les Web Workers* sont un outil puissant pour exécuter du code sur un fil de discussion séparé. There are some caveats to consider – consult Electron's [multithreading documentation][multithreading] and the [MDN documentation for Web Workers][web-workers]. Ils sont une solution idéale pour toute opération qui nécessite beaucoup de puissance CPU pendant une période prolongée de temps.

## 5) Remplissage inutile

L'un des grands avantages d'Electron, c'est que vous savez exactement quel moteur va analyser votre JavaScript, HTML et CSS. Si vous réutilisez le code qui a été écrit pour le web en gros, assurez-vous de ne pas les fonctionnalités de polyfill incluses dans Electron.

### Pourquoi ?

Lors de la construction d'une application web pour Internet d'aujourd'hui, les environnements les plus anciens dictent quelles fonctionnalités vous pouvez et ne pouvez pas utiliser. Même si Electron prend en charge des filtres et des animations CSS très performants, un navigateur plus ancien pourrait ne pas le faire. Où vous pourriez utiliser WebGL, vos développeurs peuvent avoir choisi une solution plus gourmande en ressources pour prendre en charge les vieux téléphones.

En ce qui concerne JavaScript, vous avez peut-être inclus des bibliothèques de toolkit comme jQuery pour les sélecteurs DOM ou polyfills comme le `regenerator-runtime` pour supporter `async/wait`.

Il est rare qu'un polyremplissage basé sur JavaScript soit plus rapide que la fonctionnalité native équivalente dans Electron. Ne ralentissez pas votre application Electron en envoyant votre propre version des fonctionnalités de la plate-forme web standard.

### Comment ?

Opère en supposant que les polyfills dans les versions actuelles d'Electron ne sont pas nécessaires. Si vous avez des doutes, cochez [caniuse. om](https://caniuse.com/) et vérifiez si la version [de Chromium utilisée dans votre version d'Electron](../api/process.md#processversionschrome-readonly) prend en charge la fonctionnalité que vous désirez.

En outre, examinez attentivement les bibliothèques que vous utilisez. Sont-ils vraiment nécessaires? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available][jquery-need].

Si vous utilisez un transpiler/compilateur comme TypeScript, vérifiez sa configuration et assurez-vous que vous visez la dernière version de ECMAScript supportée par Electron.

## 6) Innécessaire ou blocage des requêtes réseau

Évitez de récupérer rarement des ressources d'Internet si elles pouvaient facilement être livrées avec votre application.

### Pourquoi ?

De nombreux utilisateurs d'Electron commencent avec une application entièrement web qu'ils se transforment en une application de bureau. En tant que développeurs web, nous sommes utilisés pour charger ressources à partir d'une variété de réseaux de distribution de contenu. Maintenant que vous expédiez une application de bureau appropriée, essayez de « couper le cordon » si possible et évitez de laisser vos utilisateurs attendre des ressources qui ne changent jamais et qui pourraient être facilement incluses dans votre application.

Un exemple typique est Google Fonts. De nombreux développeurs utilisent l'impressionnante collection de polices de caractères de Google, qui est fournie avec un réseau de distribution de contenu . Le pas est simple : Inclure quelques lignes de CSS et Google s'occupera du reste.

Lors de la construction d'une application Electron, vos utilisateurs sont mieux servis si vous téléchargez les polices et les incluez dans le lot de votre application.

### Comment ?

Dans un monde idéal, votre application n'aurait pas besoin du réseau pour fonctionner à . Pour y arriver, vous devez comprendre quelles ressources votre application télécharge \- et à quelle taille ces ressources sont.

Pour ce faire, ouvrez les outils de développement. Naviguez dans l'onglet `Réseau` et cochez l'option `Désactiver le cache`. Ensuite, rechargez votre moteur de rendu. Sauf si votre application interdit de tels rechargements, vous pouvez habituellement déclencher un rechargement en appuyant sur `Cmd + R` ou `Ctrl + R` avec les outils de développement dans le focus.

Les outils enregistreront minutieusement toutes les requêtes sur le réseau. Dans un premier temps, fait le point sur toutes les ressources en cours de téléchargement, en se concentrant d'abord sur les plus gros fichiers . Y a-t-il des images, des polices ou des fichiers multimédias qui ne changent pas et qui pourraient être inclus dans votre bundle? Dans l'affirmative, incluez-les.

En tant que prochaine étape, activez `Réalisation du réseau`. Trouvez le menu déroulant qui lit actuellement `en ligne` et sélectionnez une vitesse plus lente comme `Fast 3G`. Rechargez votre moteur de rendu et vérifiez s'il y a des ressources que votre application attend inutilement. Dans de nombreux cas, une application attendra qu'une demande de réseau soit complétée bien qu'elle n'ait pas besoin de la ressource concernée.

En guise de conseil, charger des ressources depuis Internet que vous pourriez vouloir changer sans expédier une mise à jour de l'application est une stratégie puissante. For advanced control over how resources are being loaded, consider investing in [Service Workers][service-workers].

## 7) Empaquetez votre code

Comme déjà indiqué dans "[Chargement et exécution du code trop tôt](#2-loading-and-running-code-too-soon)", appel `require()` est une opération coûteuse. Si vous êtes en mesure de le faire, regroupez le code de votre application dans un seul fichier.

### Pourquoi ?

Le développement moderne de JavaScript implique généralement de nombreux fichiers et modules. Alors que est parfait pour le développement avec Electron, nous vous recommandons fortement de regrouper tout votre code en un seul fichier pour vous assurer que le dépassement inclus dans l'appel à la fonction `require()` n'est payé qu'une seule fois lorsque votre application se charge.

### Comment ?

Il y a de nombreux bundles JavaScript là-bas et nous savons mieux que de irriter la communauté en recommandant un outil plutôt qu'un autre. Cependant, nous recommandons d'utiliser un bundler capable de gérer l'environnement unique d'Electron qui a besoin de gérer les deux nœuds. s et environnements du navigateur.

As of writing this article, the popular choices include [Webpack][webpack], [Parcel][parcel], and [rollup.js][rollup].

[4]: ../images/performance-cpu-prof.png
[5]: ../images/performance-heap-prof.png

[security]: ./security.md
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
