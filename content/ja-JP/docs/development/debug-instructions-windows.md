# Windows におけるデバッグ

JavaScriptアプリケーションによらないと思われるクラッシュや問題がElectron上で起こった場合、デバッグは少し複雑になります。ネイティブ/C++の経験がない場合には得にそうでしょう。 However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

## 要件

* **Electronのデバッグビルド**: 最も簡単な方法は、[ビルド手順 (Windows) ](build-instructions-windows.md)にリストされているツールと必要な環境を使って、自分でビルドをする方法です。 While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio with C++ Tools**: 無料のコミュニティ版Visual Studio 2013と2015で利用できます。 インストール後[GithubのElectron シンボルサーバーを使うための設定を行います](setting-up-symbol-server.md)。 これによりVisual StudioがElectron内で起こっていることをより理解できるようになり、人が読める形式で現在の変数を表示することができます。

* **ProcMon**: [無料の SysInternals ツール](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx)を使うことでプロセスパラメーター、ファイル操作、レジストリ操作を検査することができます。

## Electronへの接続とデバッグ

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### ブレークポイントの設定

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./brightray/browser` and `./brightray/common`.

### アタッチ

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### どのプロセスにアタッチするべきか

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## プロセス監視にProcMonを使用する

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.