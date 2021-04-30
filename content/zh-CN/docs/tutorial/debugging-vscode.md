# 使用 VsCode调试

本指南将介绍如何使用 VSCode debugging 为您自己的 Electron 项目和 native Electron 代码库（Electron codebase）调试。

## 调试您的 Electron 应用

### 主进程

#### 1. 在 VSCode 中打开一个 Electron 项目。

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. 添加文件 `.vscode/launch.json`，内容为

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
      "args" : ["."]
    }
  ]
}
```

#### 3. 调试

在 `main.js` 中设置一些断点，并在 [调试视图](https://code.visualstudio.com/docs/editor/debugging) 中开始调试. 您应该能够点击断点。

这是一个预先配置好了的项目，你可以下载并直接在 VSCode 中调试：https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## 调试 Electron 代码库（Electron codebase）

如果您想从源代码构建 Electron 并修改 native Electron 代码库，本节将帮助您测试您的修改。

对于那些不确定在哪里获得代码或如何构建它， [Electron 的构建工具](https://github.com/electron/build-tools) 自动化并解释此过程的大部分。 如果你想手动设置环境，你可以使用这些 [构建指令](https://www.electronjs.org/docs/development/build-instructions-gn)。

### Windows (C++)

#### 1. 在 VSCode 中打开一个 Electron 项目。

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. 添加文件 `.vscode/launch.json`，内容为

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

**配置说明**

* `cppvsdbg` 需要启用 [内置的 C/C++ 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)。
* `${workspaceFolder}` 是 Chromium 的 `源` 的完整路径。
* `your-executable-location` 将是以下几项之一：
  * `Testing`：如果您使用的是默认的 [Electron 构建工具](https://github.com/electron/build-tools) 设置，或默认的 [从源端构建](https://www.electronjs.org/docs/development/build-instructions-gn#building) 的设置。
  * `Release`：如果你构建了一个发布版本，而不是测试版本。
  * `your-directory-name`：如果你在构建过程中修改， 这将是你指定的。
* `args` 数组字符串 `"your electron-project-path"` 应为您正在用于测试的 Electron 项目或 `main.js` 的绝对路径。 在本示例中，它应该是您的 `electron-quick-start` 的路径。

#### 3. 调试

在你选择的原始 Electron C++ 代码中的 .cc 文件中设置一些断点，并在 [Debug View](https://code.visualstudio.com/docs/editor/debugging) 中开始调试。
