# ShortcutDetails オブジェクト

* `target` String - このショートカットから起動するターゲット。
* `cwd` String (任意) - 作業ディレクトリ。初期値は空です。
* `args` String (任意) - このショートカットから起動された場合に `target` に適用される引数。初期値は空です。
* `description` String (任意) - ショートカットの説明。初期値は空です。
* `icon` String (任意) - DLLもしくはEXEとなりうるアイコンのパス。`icon` と `iconIndex` は 一緒に設定されなければなりません。初期値は空で、その場合、ターゲットのアイコンが使われます。
* `iconIndex` Number (任意) - `icon`がDLLもしくはEXEの場合のアイコンのリソースID。初期値は0です。
* `appUserModelId` String (任意) - アプリケーションユーザーモデルID。初期値は空です。