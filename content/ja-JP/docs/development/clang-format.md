# C++ コードに clang-format を使用する

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) は C/C++/Objective-C のコードを自動的にフォーマットするツールです。開発者がコードレビュー中にスタイルの問題を心配する必要はありません。

プルリクエストを開く前に、変更された C++ コードをフォーマットすることを強くお勧めします。これにより、あなたとレビュアーの時間が節約されます。

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

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)