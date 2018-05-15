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

### 3. デバッグする

`main.js` にいくつかブレークポイントを設定し 、[デバッグ ビュー](https://code.visualstudio.com/docs/editor/debugging) からデバッグを開始します。このとき設定したブレークポイントにヒットするはずです。

ここではダウンロードして直接 VSCode 内でデバッグできる構成済みのプロジェクトを用意しています: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start