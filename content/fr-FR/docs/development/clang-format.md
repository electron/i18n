# Utilisation du clang-format sur du code C++

[`Clang-format`](http://clang.llvm.org/docs/ClangFormat.html) est un outil pour formater le code C/C++/Objective-C, afin que les développeurs n’aient pas à se soucier des problèmes de style au cours de la révision du code.

It is highly recommended to format your changed C++ code before opening pull requests, which will save you and the reviewers' time.

Vous pouvez installer `clang-format` et `git-clang-format` via `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, simply run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

The workflow to format your changed code:

  1. Make codes changes in Electron repository.
  2. Run `git add your_changed_file.cc`.
  3. Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
  4. Run `git add your_changed_file.cc`, and commit your change.
  5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Intégration dans l’éditeur

Vous pouvez également intégrer `clang-format` directement dans vos éditeurs préférés. Pour plus d’informations sur l’intégration, consultez ces pages :

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)