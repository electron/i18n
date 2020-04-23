# ShortcutDetails オブジェクト

* `target` String - このショートカットから起動するターゲット。
* `cwd` String (任意) - 作業ディレクトリ。 省略値は空文字列です。
* `args` String (任意) - このショートカットから起動された場合に `target` に適用される引数。 省略値は空文字列です。
* `description` String (任意) - ショートカットの説明。 省略値は空文字列です。
* `icon` String (任意) - アイコンへのパス、DLL または EXE にできます。 `icon` と `iconIndex` を共に設定する必要があります。 省略値は空文字列で、target のアイコンが使用されます。
* `iconIndex` Number (任意) - `icon` が DLL もしくは EXE の場合のアイコンのリソース ID。 省略値は 0 です。
* `appUserModelId` String (任意) - アプリケーションユーザーモデル ID。 省略値は空文字列です。
