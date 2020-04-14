# Utilisation du clang-format pour du code C++

[`Clang-format`](http://clang.llvm.org/docs/ClangFormat.html) est un outil pour formater le code C/C++/Objective-C permettant aux développeurs de ne pas se soucier des problèmes de style au cours de la révision du code.

Il est fortement recommandé de formater votre code C++ avant d'ouvrir des pull requests afin de vous faire gagner du temps ainsi qu'aux réviseurs.

Vous pouvez installer `clang-format` et `git-clang-format` via `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

Suivez ces étapes pour changer votre code :

1. Apportez des modifications de codes dans le repository d'Electron.
2. Exécutez `git add votre_fichier.cc`.
3. Exécutez `git-clang-format` et vous verrez probablement des modifications dans `votre_fichier.cc`, ces modifications sont générées à partir de `clang-format`.
4. Exécutez `git add votre_fichier.cc` et commitez vos modifications.
5. Maintenant la branche est prête pour être en pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Intégration dans l’éditeur

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [Atom](https://atom.io/packages/clang-format)
  * [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
