# C++ コードに clang-format を使用する

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) は C/C++/Objective-C のコードを自動的にフォーマットするツールです。開発者がコードレビュー中にスタイルの問題を心配する必要はありません。

プルリクエストを開く前に、変更された C++ コードをフォーマットすることを強くお勧めします。これにより、あなたとレビュアーの時間が節約されます。

`npm install -g clang-format` を介して `clang-format` と `git-clang-format` をインストールできます。

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

以下は変更したコードをフォーマットするワークフローです。

1. Electron レポジトリ内でコードを変更します。
2. `git add your_changed_file.cc` を実行します。
3. `git-clang-format` を実行すると、`clang-format` によって生成された修正が `変更したファイル名.cc` 内に見えるはずです。
4. `git add your_changed_file.cc` を実行して、変更をコミットします。
5. これでこのブランチはプルリクエストを開く準備ができました。

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## エディタ統合

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [Atom](https://atom.io/packages/clang-format)
  * [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
