# REPL

Read-Eval-Print-Loop (REPL) is a simple, interactive computer programming environment that takes single user inputs (i.e. single expressions), evaluates them, and returns the result to the user.

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

**Lưu ý:** `electron --interactive` không thể sử dụng trên Windows.

Để tìm hiểu thêm, các thông tin về REPL có tại: [Tài liệu Node.js REPL](https://nodejs.org/dist/latest/docs/api/repl.html).