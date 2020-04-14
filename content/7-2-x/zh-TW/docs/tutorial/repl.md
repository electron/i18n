# REPL

「讀取、求值、輸出」迴圈 (Read-Eval-Print-Loop; REPL) 是一種簡單、互動式電腦程式開發環境，一次取得一筆使用者輸入的內容 (即一句運算式)，求值，並將結果回傳給使用者。

`repl` 模組提供 REPL 實作，可以透過下列方法使用:

* 假設您已將 `electron` 或 `electron-prebuild` 安裝為專案本地的相依元件:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* 假設您已將 `electron` 或 `electron-prebuild` 安裝為全域元件:

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**注意:** `electron --interactive` 在 Windows 上不能用。

可以在 [Node.js REPL 文件](https://nodejs.org/dist/latest/docs/api/repl.html) 中找到更多資料。
