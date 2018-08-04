# テスト

私達は Electron のコード網羅率を維持することを目指しています。 すべてのプルリクエストは、既存のすべてのテストに合格するだけでなく、変更されたコードと新しいシナリオをカバーする新しいテストを追加することを推奨します。 できるだけ多くのコードパスと Electron のユースケースを確保することで、より少ないバグでアプリを出荷することができます。

このリポジトリには、JavaScript と C++ の両方に対する lint ルール、同様に対応するユニットテストと統合テストが付属しています。 Electron のコーディングスタイルの詳細については、[コーディングスタイル](coding-style.md) ドキュメントを参照してください。

## Lint

JavaScript が Electron コーディングスタイルに準拠していることを確認するには、`npm run lint-js` を実行します。これは、Electron 自身とユニットテストの両方に対し `standard` を実行します。 プラグイン/アドオンシステムを備えたエディタを使用している場合は、多くの [StandardJS アドオン](https://standardjs.com/#are-there-text-editor-plugins) にコーディングスタイルの違反が通知されます。

引数つきで `standard` を実行するには、`npm run lint-js --` に `standard` に渡したい引数を続けて書いて実行します。

C++ が Electron コーディングスタイルに準拠していることを確認するには、`npm run lint-cpp` を実行します。これは、`cpplint` スクリプトを実行します。 `clang-format` と用意された [短いチュートリアル](clang-format.md) を使うことを推奨します。

このリポジトリにはたくさんの Python はありませんが、これもコーディングスタイルの規則によって管理されています。`npm run lint-py` は、`pylint` を使ってすべての Python をチェックします。

## ユニットテスト

すべてのユニットテストを実行するには、`npm run test` を実行します。 ユニットテストは `spec` フォルダにある Electron アプリ (ｵﾄﾞﾛｷ!) です。 その `package.json` もあり、その依存関係はトップレベルの `package.json` には定義されていないことに注意してください。

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.