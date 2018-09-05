# Utilisation du clang-format pour du code C++

[`Clang-format`](http://clang.llvm.org/docs/ClangFormat.html) est un outil pour formater le code C/C++/Objective-C permettant aux développeurs de ne pas se soucier des problèmes de style au cours de la révision du code.

Il est fortement recommandé de formater votre code C++ avant d'ouvrir des pull requests afin de vous faire gagner du temps ainsi qu'aux réviseurs.

Vous pouvez installer `clang-format` et `git-clang-format` via `npm install -g clang-format`.

Pour automatiquement formater un fichier selon le style de code C++ d'Electron, il suffit de lancer `clang-format -i chemin/vers/electron/fichier.cc`. Cela devrait fonctionner sur MacOS/Linux/Windows.

Suivez ces étapes pour changer votre code :

1. Apportez des modifications de codes dans le repository d'Electron.
2. Exécutez `git add votre_fichier.cc`.
3. Exécutez `git-clang-format` et vous verrez problablement des modifications dans `votre_fichier.cc`, ces modifications sont générées à partir de `clang-format`.
4. Exécutez `git add votre_fichier.cc` et commiter vos modifications.
5. Maintenant la branche est prête pour être en pull request.

Si vous voulez formater le code changé sur votre dernier git commit (HEAD), vous pouvez exécuter `git-clang-format HEAD~1`. Voir `git-clang-format-h` pour plus de détails.

## Intégration dans l’éditeur

Vous pouvez également intégrer `clang-format` directement dans vos éditeurs préférés. Pour plus d’informations sur l’intégration, consultez ces pages :

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)