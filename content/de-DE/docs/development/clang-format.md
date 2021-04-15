# clang-format im C++ Code verwenden

[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html) ist ein Tool, mit dem C/C+++/Objective-C-Code automatisch formatiert , sodass Entwickler sich bei Codeüberprüfungen keine Sorgen über Stilprobleme müssen.

It is highly recommended to format your changed C++ code before opening pull requests, which will save you and the reviewers' time.

You can install `clang-format` and `git-clang-format` via `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

The workflow to format your changed code:

1. Make codes changes in Electron repository.
2. Run `git add your_changed_file.cc`.
3. Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
4. Run `git add your_changed_file.cc`, and commit your change.
5. Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## Editor Integration

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

* [Atom](https://atom.io/packages/clang-format)
* [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
* [Visual Studio-Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
