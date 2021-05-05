# REPL

[Read-Eval-Print-Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) (REPL, レプル) はシンプルな対話型コンピュータープログラミング環境で、単一のユーザー入力 (すなわち単一の式) を受け取り、それらを評価して結果をユーザーへ返します。

## メインプロセス

Electron は `--interactive` CLI フラグに応じてその [Node.js `repl` モジュール](https://nodejs.org/dist/latest/docs/api/repl.html) を公開します。 ローカルプロジェクトの依存関係として `electron` がインストールされていれば、以下のコマンドで REPL にアクセスできるはずです。

  ```sh
  ./node_modules/.bin/electron --interactive
  ```

**注意:** `electron --interactive` は Windows では利用できません (詳細は [electron/electron#5776](https://github.com/electron/electron/pull/5776) をご参照ください)。

## レンダラープロセス

デベロッパー ツールの Console タブを使用すれば、あらゆるレンダラープロセスで REPL ができます。 より詳しく学びたい方は、[Chrome ドキュメント](https://developer.chrome.com/docs/devtools/console/) をご覧ください。
