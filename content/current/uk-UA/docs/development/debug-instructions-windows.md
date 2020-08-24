# Відлагоджування на Windows

If you experience crashes or issues in Electron that you believe are not caused by your JavaScript application, but instead by Electron itself, debugging can be a little bit tricky, especially for developers not used to native/C++ debugging. However, using Visual Studio, Electron's hosted Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Requirements

* **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio with C++ Tools**: The free community editions of Visual Studio 2013 and Visual Studio 2015 both work. Once installed, [configure Visual Studio to use Electron's Symbol server](setting-up-symbol-server.md). It will enable Visual Studio to gain a better understanding of what happens inside Electron, making it easier to present variables in a human-readable format.

* **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.

## Attaching to and Debugging Electron

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/Testing/electron.exe ~/my-electron-app/
```

### Setting Breakpoints

Після цього, відкрийте Visual Studio. Electron не зібраний з Visual Studio, а, отже, не містить файл проєкту; тим не менш, ви можете відкрити вихідні файли "як файл", тобто Visual Studio відкриє їх самі по собі. Тим не менш, ви можете ставити контрольні точки - Visual Studio автоматично визначить, що цей вихідний код відповідає виконуваного коду в підключеному процесі, і зупиниться на зазначеній контрольній точці.

Relevant code files can be found in `./shell/`.

### Attaching

You can attach the Visual Studio debugger to a running process on a local or remote computer. Після запуску процесу, натисніть Debug / Attach to Process (або натисніть `CTRL+ALT+P`), щоб відкрити діалогове вікно «Attach to Process». Ви можете використовувати цю можливість для налагодження додатків, що запускаються на локальному або віддаленому комп'ютері, і для налагодження декількох процесів одночасно.

Якщо Electron працює під обліковим записом іншого користувача, встановіть прапорець `Show processes from all users`. Зверніть увагу, що ви побачите кілька процесів; їх кількість залежить від того, скільки BrowserWindows відкрито у вашому додатку. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### До якого процесу мені слід приєднатися?

Код, що виконується в рамках основного процесу (тобто, код знаходиться в вашому основному JavaScript файлі або викликається з нього), а також код, що викликається за допомогою remote (`require('electron').remote`), буде виконуватися всередині основного процесу, в той час як інший код буде виконуватися всередині відповідного процесу візуалізації.

Ви можете бути підключені до кількох програм для налагодження, але тільки одна програма буде активна у відлагоджувачі в будь-який час. Ви можете встановити активну програму в панелі інструментів `Debug Location` або у вікні `Processes`.

## Using ProcMon to Observe a Process

У той час як Visual Studio відмінно підходить для вивчення конкретних шляхів виконання, ProcMon дійсно сильний в спостереженні за всім, що робить ваш додаток з операційною системою - включаючи файл, реєстр, мережу, процес і детальне профілювання процесів. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

В якості введення в базові та розширені можливості налагодження ProcMon, перейдіть до [цієї відео-інструкції](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) від Microsoft.
