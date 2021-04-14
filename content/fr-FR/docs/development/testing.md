# Test

Notre essayons de garder une couverture de code élevée pour Electron. Nous demandons à ce que toutes les demandes de "pull" passent tout les tests existants, mais ajoutent aussi des tests couvrant les changements de codes et les nouveaux scénarios. Cela nous assure ainsi que nous intégrons le plus de code possible tout en étant sûr que Electron soit livré avec le moins de bugs possible.

Ce dépôt utilise des règles de qualité de code pour JavaScript et C++ ainsi que des tests unitaires et d'intégrations. Pour en apprendre plus sur le style de code d'Electron, référez-vous au document [style de code](coding-style.md).

## Linting

Pour vous assurer que votre JavaScript est en conformité avec le style de de codage électronique, exécutez `npm run lint-js`, qui exécutera des `standard` à la fois contre Electron lui-même ainsi que les tests unitaires. Si vous utilisez un d’éditeur avec un système plugin/addon, vous pouvez utiliser l’un des nombreux addons [Addons standardJS][standard-addons] pour être informé des violations du style de codage avant de les commettre.

Pour exécuter `standard` paramètres, exécutez- `npm run lint-js --` suivi de arguments que vous voulez passer à `standard`.

Pour vous assurer que votre C++ est conforme au style de codage Electron, exécutez `npm run lint-cpp`, qui exécute un script `cpplint` . Nous vous recommandons utiliser `clang-format` et préparé [un court tutoriel](clang-format.md).

Il n’y a pas beaucoup de Python dans ce référentiel, mais il est également régi règles de style de codage. `npm run lint-py` vérifierons tous les Python, en utilisant `pylint` pour le faire.

## Tests unitaires

Si vous n’utilisez pas</a>d’outils de build
, assurez-vous que ce nom que vous avez configuré pour votre build local d’Electron est l’un des `Testing`, `Release`, `Default`, `Debug`ou que vous avez défini `process.env.ELECTRON_OUT_DIR`. Sans ces ensembles, Electron ne pas effectuer certaines étapes de pré-test.</p> 

Pour exécuter tous les tests unitaires, exécutez `npm run test`. Les tests unitaires sont une application électronique (surprise!) que l’on retrouve dans `spec` dossier. Notez qu’il a sa propre `package.json` et que ses dépendances ne sont donc pas définies dans le haut niveau `package.json`.

Pour exécuter uniquement des tests spécifiques correspondant à un modèle, `exécutez un test d’exécuter npm --
-g=PATTERN`, en remplaçant le `PATTERN` par un regex qui correspond aux de tests que vous souhaitez exécuter. À titre d’exemple : si vous ne souhaitez exécuter que des tests IPC, vous exécuteriez `npm run test -- -g ipc`.



### Tests sur les appareils Windows 10



#### Étapes supplémentaires pour exécuter le test unitaire :

1. Visual Studio 2019 doit être installé.
2. Les en-têtes de nœud doivent être compilés pour votre configuration. 
   
   

   ```powershell
   ninja -C out\Testing third_party\electron_node:en-têtes
   ```


3. L’electron.lib doit être copié comme node.lib. 
   
   

   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```




#### Polices manquantes

[certains appareils Windows 10](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) n’expédiquent pas avec la police Meiryo installée, ce qui peut provoquer un test de repli de police. Pour installer Meiryo :

1. Poussez la clé Windows et recherchez des fonctionnalités _gérer les fonctionnalités_.
2. Cliquez _Ajouter une fonctionnalité_.
3. Sélectionnez _polices supplémentaires japonaises_ cliquez sur _installer_.



#### Mesures de pixel

Certains tests qui reposent sur des mesures précises des pixels peuvent ne pas fonctionner correctement sur les appareils avec des paramètres d’écran Hi-DPI en raison d’erreurs de précision de point flottant. Pour exécuter ces tests correctement, assurez-vous que l’appareil est réglé à 100% mise à l’échelle.

Pour configurer la mise à l’échelle d’affichage :

1. Poussez la clé Windows et recherchez les paramètres _'affichage_.
2. Sous _échelle et la mise en_, assurez-vous que l’appareil est réglé à 100%.

[standard-addons]: https://standardjs.com/#are-there-text-editor-plugins
