# تصحيح العملية الرئيسية في VSCode

### 1. فتح مشروع إلكترون في VSCode.

```sh
$ git استنساخ git@github.com: الإلكترون / الإلكترون quick-start.git
$ رمز الإلكترون السريع بدء
```

### 2. إضافة ملف `.vscode/launch.json` مع التكوين التالي:

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

عيّن بعض نقاط التوقف في `main.js`، وابدأ تصحيح الأخطاء في [عرض التصحيح](https://code.visualstudio.com/docs/editor/debugging). يجب أن تكون قادراً على الوصول إلى نقاط التوقف

إليك مشروع مكون مسبقاً يمكنك تنزيله وتصحيحه مباشرة في VSCode: https://github.com/octref/vscode-electron-debug/tree/Master/electron-quick-start
