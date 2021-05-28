# C++ コードに clang-tidy を使用する

[`clang-tidy`](https://clang.llvm.org/extra/clang-tidy/) は C/C++/Objective-C コードのスタイル違反、プログラミングエラー、ベストプラクティスを自動でチェックするツールです。

Electron の `clang-tidy` インテグレーションは、`npm run lint:clang-tidy` で実行できるリンタースクリプトとして提供しています。 `clang-tidy` でディスク上のファイルをチェックするには、使用するコンパイラーフラグが分かるように Electron をビルドしておく必要があります。 このスクリプトには、コンパイル情報を取得するビルドディレクトリを指定するオプション `--output-dir` があります。 典型的な使用方法としては `npm run lint:clang-tidy --out-dir ../out/Testing` のようになります。

ファイル名を指定しない場合、すべての C/C++/Objective-C ファイルがチェックされます。 チェックするファイルのリストを指定するには、`npm run lint:clang-tidy --out-dir ../out/testing shell/browser/api/electron_api_app.cc` のようにオプションの後にそのファイル名を渡すとできます。

`clang-tidy` では [こちらの長いリスト](https://clang.llvm.org/extra/clang-tidy/checks/list.html) がチェック可能な項目ですが、Electron のデフォルトではこのうちいくつかのチェックしか有効になっていません。 現時点の Electron には `.clang-tidy` の設定が無いので、`clang-tidy` は Chromium 内の `src/.clang-tidy` にあるものを見つけ、Chromium が有効にしているチェックを使用します。 実行するチェックは `--checks=` オプションで変更できます。 これはそのまま `clang-tidy` に渡されるので、この詳細は clang-tidy のドキュメントを参照してください。 ワイルドカードが使用でき、`-` を頭に付けるとそのチェックを無効にできます。 デフォルトでは、リストしたチェックはすべて `.clang-tidy` のチェックに追加されます。そのため、特定のチェックを制限したい場合は、最初にすべてのチェックを除外してから `--checks=-*,performance*` のように必要なものを追加してください。

`clang-tidy` の実行はかなり遅いです。内部的には各ファイルをコンパイルしてからチェックするので、何らかの要因でコンパイルよりも常に遅くなります。 `--jobs|-j` オプションで並列実行して高速化できますが、`clang-tidy` もチェック中に多くのメモリを使用するので、メモリ不足エラーに陥りやすくなります。 このため、デフォルトのジョブ数は 1 です。
