# REPL

Read-Eval-Print-Loop (REPL, レプル) は、単一のユーザー入力 (すなわち単一の式) を受け取り、それらを評価して、結果をユーザーに返す、単純な対話型評価環境です。

The `repl` module provides a REPL implementation that can be accessed using:

* Assuming you have `electron` or `electron-prebuilt` installed as a local project dependency:
    
    ```sh
./node_modules/.bin/electron --interactive
```

* Assuming you have `electron` or `electron-prebuilt` installed globally:
    
    ```sh
electron --interactive
```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `electron --interactive` はWindowsでは利用できません。

詳細については、 [Node.js の REPL ドキュメント](https://nodejs.org/dist/latest/docs/api/repl.html)をご覧ください。