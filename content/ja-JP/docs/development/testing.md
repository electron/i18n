# テスト

私達は Electron のコード網羅率を維持することを目指しています。 すべてのプルリクエストは、既存のすべてのテストに合格するだけでなく、変更されたコードと新しいシナリオをカバーする新しいテストを追加することを推奨します。 できるだけ多くのコードパスと Electron のユースケースを確保することで、より少ないバグでアプリを出荷することができます。

このリポジトリには、JavaScript と C++ の両方に対する lint ルール、同様に対応するユニットテストと統合テストが付属しています。 Electron のコーディングスタイルの詳細については、[コーディングスタイル](coding-style.md) ドキュメントを参照してください。

## Lint

JavaScript が Electron コーディングスタイルに準拠していることを確認するには、`npm run lint-js` を実行します。これは、Electron 自身とユニットテストの両方に対し `standard` を実行します。 プラグイン/アドオンシステムを備えたエディタを使用している場合は、多くの [StandardJS アドオン](https://standardjs.com/#are-there-text-editor-plugins) にコーディングスタイルの違反が通知されます。

引数つきで `standard` を実行するには、`npm run lint-js --` に `standard` に渡したい引数を続けて書いて実行します。

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.