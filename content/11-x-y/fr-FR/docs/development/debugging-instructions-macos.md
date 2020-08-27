# Débogage sur macOS

Si vous rencontrez des crash ou des problèmes dans Electron et que vous croyez qu'il ne viennent pas de votre app JavaScript, mais plutôt d'Electron lui-même, alors le débogage peut être un peu difficile, surtout pour les développeurs peu expérimentés pour le débogage natif/C++. Toutefois, en utilisant Ildb, et le code source d'Electron, il est assez facile d'activer le débogage avec des points d’arrêt dans le code source d'Electron. Vous pouvez également utiliser [XCode pour le débogage](debugging-instructions-macos-xcode.md) si vous préférez une interface graphique.

## Spécifications requises

* **Une compilation debug d'Electron** : le moyen le plus simple est généralement de le compiler vous-même, en utilisant les outils et prérequis énumérées dans les [instructions de compilation pour macOS](build-instructions-macos.md). Tandis que vous pouvez facilement déboguer Electron puisque vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le débogage sensiblement plus difficile : le débogueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’inlining, liste des appels qui s’enchaînent et d'autres optimisations du compilateur.

* **Xcode**: En plus de Xcode, vous devez aussi installer les outils de ligne de commande de Xcode. Ils incluent LLDB, le débogueur par défaut dans Xcode sur macOS. Il prend en charge le débogage en C, Objectif-C et Cm sur les appareils et simulateurs de bureau et d’iOS.

* **.lldbinit**: Create or edit `~/.lldbinit` to allow Chromium code to be properly source-mapped.
   ```text
   import du script de commande ~/electron/src/tools/lldb/lldbinit.py
   ```

## Débogage d'Electron

Pour démarrer une session de débogage, ouvrez le Terminal et démarrez `lldb`, en passant une version non-version d'Electron en paramètre.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) target create "./out/Testing/Electron.app"
Current executable set to './out/Testing/Electron.app' (x86_64).
```

### Définition de points d’arrêt

LLDB est un outil puissant et supporte plusieurs stratégies d'inspection de code. Pour cette introduction basique, assumons que vous exécutez une commande JavaScript qui ne se comporte pas correctement - donc vous aimeriez voir l'equivalent de cette commande en C++.

Les fichiers de code pertinents peuvent être trouvés dans `./shell/`.

Supposons que vous souhaitez déboguer `app.setName()`, qui est définie dans `browser.cc` comme `Browser::SetName()`. Définissez le point d’arrêt à l’aide de la commande de `breakpoint`, en spécifiant le fichier et la ligne à couper :

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Ensuite, démarrez Electron :

```sh
(lldb) run
```

L’app sera immédiatement suspendu, puisque l’électron définit le nom de l’application au lancement :

```sh
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/Testing/Electron. pp/Contents/MacOS/Electron' (x86_64)
Le processus 25244 s'est arrêté
* thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 au navigateur. c:118, queue = 'com.apple.main-thread', stop reason = point d'arrêt 1.
    frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 dans le navigateur. c:118
   115 }
   116
   117 void Browser::SetName(const std::string& name) {
-> 118 name_override_ = name;
   119 }
   120
   121 int Browser::GetBadgeCount() {
(lldb)
```

Pour afficher les arguments et les variables locales pour le frame en cours, exécutez `frame variable` (ou `fr v`), qui vous montrera que l'app est en train de mettre le nom à "Electron".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Pour faire une étape au niveau source dans le thread actuellement sélectionné, exécutez `step` (ou `s`). Cela vous amènerait dans `name_override_.empty()`. Pour continuer et refaire une étape, exécutez `next` (ou `n`).

```sh
(lldb) step
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119
   116
   117  void Browser::SetName(const std::string& name) {
   118    name_override_ = name;
-> 119  }
   120
   121  int Browser::GetBadgeCount() {
   122    return badge_count_;
```

**NOTE:** If you don't see source code when you think you should, you may not have added the `~/.lldbinit` file above.

Pour terminer de déboguer à ce stade, exécutez : `process continue`. Vous pouvez également continuer jusqu'à ce que la ligne soit frappée dans ce thread (`thread jusqu'à 100`). Cette commande exécutera le thread dans le frame actif jusqu'à ce qu’il atteigne la ligne 100 dans cette trame ou s’arrête si elle quitte le frame en cours.

Maintenant, si vous ouvrez les outils de développement d'Electron et appelez `setName`, vous frapperez une fois de plus le point d’arrêt.

### Lectures additionnelles
LLDB est un outil puissant, avec une excellente documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference][lldb-command-structure] or the introduction to [Using LLDB as a Standalone Debugger][lldb-standalone].

You can also check out LLDB's fantastic [manual and tutorial][lldb-tutorial], which will explain more complex debugging scenarios.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
[lldb-tutorial]: http://lldb.llvm.org/tutorial.html
