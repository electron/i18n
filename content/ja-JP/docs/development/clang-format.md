# C++ コードに clang-format を使用する

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) は C/C++/Objective-C のコードを自動的にフォーマットするツールです。開発者がコードレビュー中にスタイルの問題を心配する必要はありません。

プルリクエストを開く前に、変更された C++ コードをフォーマットすることを強くお勧めします。これにより、あなたとレビュアーの時間が節約されます。

`npm install -g clang-format` を介して `clang-format` と `git-clang-format` をインストールできます。

Electron C++ コードスタイルに従ってファイルを自動的にフォーマットするには、 `clang-format -i electron/への/パス/ファイル.cc` を実行します。これは macOS/Linux/Windows で動作します。

以下は変更したコードをフォーマットするワークフローです。

1. Electron レポジトリ内でコードを変更します。
2. `git add your_changed_file.cc` を実行します。
3. `git-clang-format` を実行すると、`clang-format` によって生成された修正が `変更したファイル名.cc` 内に見えるはずです。
4. `git add your_changed_file.cc` を実行して、変更をコミットします。
5. これでこのブランチはプルリクエストを開く準備ができました。

もし最新の git コミット (HEAD) 上のあなたが変更したコードをフォーマットしたい場合は、`git-clang-format HEAD~1` を実行できます。より詳しくは `git-clang-format -h` を参照してください。

## エディタ統合

あなたの好きなエディタに直接 `clang-format` を統合することもできます。エディタ統合の設定に関する詳細は、以下のページを参照してください。

- [Atom](https://atom.io/packages/clang-format)
- [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)