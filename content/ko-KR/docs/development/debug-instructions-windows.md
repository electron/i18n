# Windows에서 Electron 디버깅하기

만약 작성한 Javascript 애플리케이션이 아닌 Electron 자체의 크래시나 문제를 경험하고 있다면, 네이티브/C++ 디버깅에 익숙하지 않은 개발자는 디버깅이 약간 까다로울 수 있습니다. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## 요구 사항

* **Electron의 디버그 빌드**: 가장 쉬운 방법은 보통 [Windows용 빌드 설명서](build-instructions-windows.md)에 명시된 요구 사항과 툴을 사용하여 스스로 빌드하는 것입니다. While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio와 C++ 툴**: Visual Studio 2013과 Visual Studio 2015 두 가지 커뮤니티 에디션 모두 잘 작동합니다. 설치가 완료되면, [Visual Studio가 GitHub의 Electron 심볼 서버를 사용하도록](setting-up-symbol-server.md) 설정해야 합니다. 이 작업은 Visual Studio가 Electron에서 무슨일이 일어나는지 더 잘 이해할 수 있도록 하며 변수를 사람이 읽기 좋은 포맷으로 쉽게 표현할 수 있도록 합니다.

* **ProcMon**: 이 [무료 SysInternals 툴](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx)은 프로세스 인수, 파일 핸들러 그리고 레지스트리 작업을 탐색할 수 있게 도와줍니다.

## Electron에 디버거 연결하고 디버깅하기

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### 중단점 설정

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

관련된 코드 파일들은 `./atom/`에서 찾을 수 있으며 또한 Brightray 안 `./brightray/browser`와 `./brightray/common`에서도 찾을 수 있습니다.

### 디버거 연결

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### 어떤 프로세스에 디버거를 적용해야 하나요?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## 프로세스를 관찰하기 위해 ProcMon 사용

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.