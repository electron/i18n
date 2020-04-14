# REPL

Read-Eval-Print-Loop (REPL, レプル) は、単一のユーザー入力 (すなわち単一の式) を受け取り、それらを評価して、結果をユーザーに返す、単純な対話型評価環境です。

`repl`モジュールは、以下を使用してアクセスできるREPL実装を提供します。

* ローカルプロジェクトの依存関係として`electron`または`electron-prebuilt`がインストールされている場合:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* グローバルに`electron`または`electron-prebuilt`がインストールされている場合:
    
    ```sh
    electron --interactive
    ```

replモジュールはREPLをメインプロセス向けにしか生成しません。レンダラプロセス向けにREPLを生成する場合はDev ToolsのConsoleタブを使用してください。

**Note:** `electron --interactive` はWindowsでは利用できません。

詳細については、 [Node.js の REPL ドキュメント](https://nodejs.org/dist/latest/docs/api/repl.html)をご覧ください。