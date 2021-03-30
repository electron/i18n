# VS Code でデバッグする

このガイドでは、自作の Electron プロジェクトとネイティブの Electron コードベース両方の VSCode デバッグを設定する方法について説明します。

## Electron アプリをデバッグする

### メインプロセス

#### 1. VS Code で Electron プロジェクトを開く

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. 以下の構成の `.vscode/launch.json` ファイルを追加する

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args" : ["."],
      "outputCapture": "std"
    }
  ]
}
```

#### 3. デバッグする

`main.js` にいくつかブレークポイントを設定し 、[デバッグ ビュー](https://code.visualstudio.com/docs/editor/debugging) からデバッグを開始します。 このとき設定したブレークポイントにヒットするはずです。

ここではダウンロードして直接 VSCode 内でデバッグできる構成済みのプロジェクトを用意しています: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## Electron コードベースをデバッグする

ソースから Electron をビルドしてネイティブの Electron コードベースを変更したい場合は、このセクションを参照してください。

このコードの入手方法やビルド方法がわからない方のために、[Electron のビルドツール](https://github.com/electron/build-tools) がこのプロセスのほとんどを自動化して説明します。 手動で環境を設定したい場合は、代わりに以下の [ビルド手順](https://www.electronjs.org/docs/development/build-instructions-gn) も使用できます。

### Windows (C++)

#### 1. VS Code で Electron プロジェクトを開く

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. 以下の構成の `.vscode/launch.json` ファイルを追加する

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "(Windows) Launch",
      "type": "cppvsdbg",
      "request": "launch",
      "program": "${workspaceFolder}\\out\\your-executable-location\\electron.exe",
      "args": ["your-electron-project-path"],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [
          {"name": "ELECTRON_ENABLE_LOGGING", "value": "true"},
          {"name": "ELECTRON_ENABLE_STACK_DUMPING", "value": "true"},
          {"name": "ELECTRON_RUN_AS_NODE", "value": ""},
      ],
      "externalConsole": false,
      "sourceFileMap": {
          "o:\\": "${workspaceFolder}",
      },
    },
  ]
}
```

**設定メモ**

* `cppvsdbg` は [組み込み C/C++ 拡張](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) が有効である必要があります。
* `${workspaceFolder}` Chromium の `src` ディレクトリのフルパスです。
* `your-executable-location` はいくつかの項目に応じて以下のいずれかになります。
  * `Testing`: [Electron のビルドツール](https://github.com/electron/build-tools) のデフォルト設定や、[ソースからビルド](https://www.electronjs.org/docs/development/build-instructions-gn#building) でのデフォルト指定を使用している場合。
  * `Release`: Testing ビルドではなく Release ビルドで構築した場合。
  * `your-directory-name`: ビルド処理中にこれをデフォルトから変更した場合は、指定したものがそのまま適用されます。
* `args` 配列文字列内の `"your-electron-project-path"` は、テストに用する Electron プロジェクトのディレクトリまたは `main.js` ファイルへの絶対パスでなければなりません。 このサンプルでは、 `electron-quick-start` へのパスである必要があります。

#### 3. デバッグする

ネイティブの Electron C++ コード内の任意の .cc ファイルにブレークポイントを設定し、[デバッグビュー](https://code.visualstudio.com/docs/editor/debugging) でデバッグを開始しましょう。
