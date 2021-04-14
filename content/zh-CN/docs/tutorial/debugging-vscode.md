# 使用 VsCode调试

本指南将介绍如何为您自己的电子项目以及本机电子代码库设置 VSCode 调试。

## 调试您的电子应用程序

### 主进程

#### 1. 在 VSCode 中打开一个 Electron 项目。

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. 添加具有以下配置的文件 `.vscode/launch.json`：

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

在 `main.js`中设置一些断点，并在 [调试视图](https://code.visualstudio.com/docs/editor/debugging) 中开始调试. 您应该能够击中断点。

这是一个预先配置的项目，你可以下载并直接在 VSCode中调试: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start

## 调试电子代码库

如果您想从源上构建电子并修改本机电子代码库，此部分将帮助您测试您的修改。

对于那些不确定在哪里获得此代码或如何构建它， [电子的生成工具](https://github.com/electron/build-tools) 自动化，并解释这个过程的大部分。 如果你想手动设置环境，你可以改为使用这些 [建立说明](https://www.electronjs.org/docs/development/build-instructions-gn)。

### 视窗（C++）

#### 1. 在 VSCode 中打开一个 Electron 项目。

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

#### 2. 添加具有以下配置的文件 `.vscode/launch.json`：

```json
•
  "版本"："0.2.0"，
  "配置"：[
    ]
      "名称"："（窗口）启动"，
      "类型"："cppvsdbg"，
      "请求"："启动"，
      "程序"："${workspaceFolder}[出]您的可执行位置\电子.exe"，
      "args"："您的电子项目路径"]，
      "停止进入"：虚假的，
      的"cwd"："${workspaceFolder}"，
      "环境"：[
          {"名称"："ELECTRON_ENABLE_LOGGING"，"价值"："真实"}，
          {"名称"："ELECTRON_ENABLE_STACK_DUMPING"，"价值"："真实"[，
          {"名称"："ELECTRON_RUN_AS_NODE"，"价值"："}，
      ]，
      "外部 文件"：虚假的，
      的"来源文件"：{
          "o：\"："${workspaceFolder}"，
      }，
    [，
  ]
}
```

**配置说明**

* `cppvsdbg` 需要启用内置 [C/C++扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) 。
* `${workspaceFolder}` 是铬 `src` 目录的完整路径。
* `your-executable-location` 将取决于以下几个项目之一：
  * `Testing`：如果您使用 [电子构建工具](https://github.com/electron/build-tools) 的默认设置，或从源</a>

构建时的默认说明。</li> 
    
      * `Release`：如果您构建了版本生成，而不是测试生成。
  * `your-directory-name`：如果您在从默认值构建过程中修改了此版本，这将是您指定的任何版本。</ul></li> 

* `args` 阵列字符串 `"your-electron-project-path"` 应该是您用于测试的 Electron 项目的目录或 `main.js` 文件的绝对路径。 在这个例子中，它应该是你 `electron-quick-start`的道路。</ul> 



#### 3. 调试

在原生电子C++代码中设置您选择的 .cc 文件中的一些断点，并开始在 [Debug 视图](https://code.visualstudio.com/docs/editor/debugging)中进行调试。
