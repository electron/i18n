# VSCode 에서 메인 프로세스 디버깅하기

### 1. VS Code 에서 Electron 프로젝트 열기.

```sh
$ git clone git@github.com:electron/electron-quick-start.git
$ code electron-quick-start
```

### 2. 다음 설정으로 `.vscode/launch.json` 파일 추가하기:

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


### 3. 디버깅

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

VSCode 에서 바로 디버깅 할 수 있는 프로젝트를 미리 준비했습니다: https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start
