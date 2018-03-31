# VS Code におけるメインプロセスのデバッグ

### 1. VS Code で Electron プロジェクトを開く

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. 以下の構成で `.vscode/launch.json` ファイルを追加する

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."]
    }
  ]
}
```

**Note:** Windows では `runtimeExecutable` に `"${workspaceRoot}/node_modules/.bin/electron.cmd"` を使用します。

### 3. デバッグする

`main.js` にいくつかブレークポイントを設定し 、[デバッグ ビュー](https://code.visualstudio.com/docs/editor/debugging) からデバッグを開始します。このとき設定したブレークポイントにヒットします。

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start