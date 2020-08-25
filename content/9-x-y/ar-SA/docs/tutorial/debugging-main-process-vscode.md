# تنقيح عملية الرئيسية في VSCode

### 1. Open an Electron project in VSCode.

```sh
$ git استنساخ git@github.com: الإلكترون / الإلكترون quick-start.git
$ رمز الإلكترون السريع بدء
```

### 2. إضافة ملف `.vscode / launch.json` مع التكوين التالي:

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


### 3. التنقيح

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Here is a pre-configured project that you can download and directly debug in VSCode: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
