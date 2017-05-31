# Débogage sur macOS

Si vous rencontrez des plantages ou questions en électron que vous croyiez ne sont pas causées par votre application JavaScript, mais plutôt par l’électron lui-même, débogage peut être un peu difficile, surtout pour les développeurs pas utilisé pour le débogage natif/C++. Toutefois, à l’aide de base et le code source de l’électron, il est assez facile activer le débogage avec points d’arrêt dans le code source de l’électron.

## Exigences en matière

* Version de debug de **A de Electron** : le plus simple est généralement il construire vous-même, en utilisant les outils et composants requis énumérés dans les instructions de[build pour macOS](build-instructions-osx.md). Alors que vous pouvez facilement fixer à et déboguer les électrons comme vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le débogage sensiblement plus difficile : le débogueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’in-Lining, queue d’appels et autres optimisations du compilateur.

* **Xcode** : en plus de Xcode, également installer les outils de ligne de commande de Xcode. Ils incluent de base, le débogueur par défaut dans Xcode sur Mac OS X. Il prend en charge le débogage C, Objective-C et C++ sur les appareils iOS et bureau et simulateur.

## Fixation au et le débogage des électrons

Pour démarrer une session de débogage, ouvrez terminal et lancez `lldb`, passant d’une version debug de l’électron en tant que paramètre.

```bash
cible de./out/D/Electron.app (base) $ base créer «. / out/D/Electron.app » fichier exécutable actuel, la valeur '. / out/D/Electron.app' (x86_64).
```

### Définition de points d’arrêt

BASE est un outil puissant et prend en charge plusieurs stratégies pour inspection de code. Pour cette initiation, supposons que vous appelez une commande de JavaScript qui n’est pas se comporter correctement - si vous souhaitez briser sur homologue C++ de la commande à l’intérieur de la source d’électrons.

Les fichiers de code correspondant se trouvent dans `./atom/` ainsi que dans Brightray, dans `./vendor/brightray/browser` et `./vendor/brightray/common`. Si vous êtes hardcore, vous pouvez également déboguer chrome directement, qui se trouve évidemment dans `chromium_src`.

Supposons que vous souhaitez déboguer `app.setName ()`, qui est définie dans `browser.cc` comme `Browser::SetName () `. Définissez le point d’arrêt à l’aide de la commande de `breakpoint`, en spécifiant le fichier et couper sur ligne :

```bash
(base) point d’arrêt défini--browser.cc--ligne 117 du fichier 1 point d’arrêt : où = électrons Framework'atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 à browser.cc:118, adresse = 0x000000000015fdb4
```

Ensuite, démarrez électron :

```bash
run (base)
```

L’app sera immédiatement suspendu, puisque l’électron définit le nom de l’application au lancement :

```bash
(base) exécution processus 25244 lancé : ' / Users/fr/Code/electron/out/D/Electron.app/Contents/MacOS/Electron' (x86_64) processus 25244 arrêté * fil #1 : tid = 0x839a4c, 0x0000000100162db4 Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 à browser.cc:118, en file d’attente = ' com.apple.main-fil ', arrêter la raison = point d’arrêt 1.1 cadre #0 : 0x0000000100162db4 électronique Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 à browser.cc:118 115} 116 117 void navigateur :: SetName(const std::string& name) {-> 118 name_override_ = nom ;
   119} 120 121 int navigateur :: GetBadgeCount() {(base)
```

Pour afficher les arguments et les variables locales pour le frame en cours, exécution `frame variable` (ou `fr v`), qui vous montrera que le soft est en train de mettre le nom de « Électron ».

```bash
variable d’armature (base) (atom::Browser *) Ceci = 0x0000000108b14f20 (const string &) nom = « Electron » : {[...]}
```

Pour faire une étape unique niveau de source dans le thread actuellement sélectionné, exécutez `step` (ou `s`). Cela vous en tiendrait `name_override_.empty ()`. Pour aller de l’avant et refaire une étape, exécutez `next` (ou `n`).

```bash
(base) étape 25244 processus arrêté * fil #1 : tid = 0x839a4c, 0x0000000100162dcc Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 à browser.cc:119, en file d’attente = ' com.apple.main-thread ", arrêter la raison = étape en image #0 : 0x0000000100162dcc Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 au browser.cc:119 116 117 Sub Browser::SetName (const std::string& nom) {118 name_override_ = nom ; -> 119} int 120 121 navigateur :: GetBadgeCount() {badge_count_ retour 122 ;
```

Pour terminer de déboguer à ce stade, exécutez `process continue`. Vous pouvez continuer jusqu'à ce que la ligne est frappée dans ce fil (`thread jusqu’au 100`). Cette commande exécutera le thread dans le frame actif jusqu'à ce qu’il atteigne la ligne 100 dans cette trame ou s’arrête si elle laisse le frame en cours.

Maintenant, si vous ouvrez outils de développement et les `setName` de l’appel de l’électron, vous frapperez une fois de plus le point d’arrêt.

### Autres lectures

BASE est un outil puissant, avec une excellente documentation. Pour en savoir plus à ce sujet, examiner la documentation de débogage de Apple, par exemple le Reference</a> de Structure de commande de LLDB ou l’introduction à base de [Using comme un Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).</p> 

Vous pouvez également consulter [manual fantastique de base et tutorial](http://lldb.llvm.org/tutorial.html), qui vous expliquera les scénarios de débogage plus complexes.