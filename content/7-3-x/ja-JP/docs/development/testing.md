# テスト

私達は Electron のコード網羅率を維持することを目指しています。 すべてのプルリクエストは、既存のすべてのテストに合格するだけでなく、変更されたコードと新しいシナリオをカバーする新しいテストを追加することを推奨します。 できるだけ多くのコードパスと Electron のユースケースを確保することで、より少ないバグでアプリを出荷することができます。

このリポジトリには、JavaScript と C++ の両方に対する lint ルール、同様に対応するユニットテストと統合テストが付属しています。 Electron のコーディングスタイルの詳細については、[コーディングスタイル](coding-style.md) ドキュメントを参照してください。

## Lint
JavaScript が Electron コーディングスタイルに準拠していることを確認するには、`npm run lint-js` を実行します。これは、Electron 自身とユニットテストの両方に対し `standard` を実行します。 プラグイン/アドオンシステムを備えたエディタを使用している場合は、多くの [StandardJS アドオン][standard-addons] にコーディングスタイルの違反が通知されます。

引数つきで `standard` を実行するには、`npm run lint-js --` に `standard` に渡したい引数を続けて書いて実行します。

C++ が Electron コーディングスタイルに準拠していることを確認するには、`npm run lint-cpp` を実行します。これは、`cpplint` スクリプトを実行します。 `clang-format` と用意された [短いチュートリアル](clang-format.md) を使うことを推奨します。

このリポジトリに Python が多数あるわけではありませんが、これもコーディングスタイル規則によって管理されています。 `npm run lint-py` を実行すれば、`pylint` を使ってすべての Python をチェックします。

## 単体テスト

すべてのユニットテストを実行するには、`npm run test` を実行します。 ユニットテストは `spec` フォルダにある Electron アプリ (ｵﾄﾞﾛｷ!) です。 その `package.json` もあり、その依存関係はトップレベルの `package.json` には定義されていないことに注意してください。

パターンに一致する特定のテストだけを実行するには、`npm run test -- -g=PATTERN` で、`PATTERN` を実行したいテストに一致する正規表現に置き換えて実行します。 例として、IPC テストのみを実行したい場合は、`npm run test -g ipc` を実行します。

### Windows 10 デバイス上でテスト
[一部の Windows 10 デバイス](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) はメイリオフォントがインストールされていない状態で出荷されるため、フォントフォールバックテストが失敗する可能性があります。 メイリオをインストールするには以下のようにします。
1. Windows キーを押して _オプション機能の管理_ と検索します。
1. _機能の追加_ をクリックします。
1. _日本語追加フォント_ を選択して _インストール_ をクリックします。

[standard-addons]: https://standardjs.com/#are-there-text-editor-plugins
