# Debugging pada Windows

Jika Anda mengalami crash atau masalah di Electron yang Anda percaya tidak disebabkan oleh Anda JavaScript aplikasi, melainkan oleh elektron itu sendiri, debugging bisa menjadi sedikit rumit, terutama untuk pengembang tidak digunakan untuk native / C ++ debugging. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Persyaratan

* **Sebuah membangun debug Elektron**: Cara termudah biasanya membangun sendiri, menggunakan alat dan prasyarat yang tercantum dalam [membangun petunjuk untuk Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio dengan C ++ Alat**: Edisi masyarakat bebas dari Visual Studio 2013 dan Visual Studio 2015 keduanya bekerja. Setelah terinstal, [mengkonfigurasi Visual Studio untuk menggunakan GitHub ini Electron Simbol Server](setting-up-symbol-server.md). Ini akan memungkinkan Visual Studio untuk mendapatkan pemahaman yang lebih baik dari apa yang terjadi di dalam Electron , sehingga lebih mudah untuk menyajikan variabel dalam format yang dapat dibaca manusia.

* **ProcMon**: The [alat SysInternals bebas](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) memungkinkan Anda untuk memeriksa sebuah proses parameter, file menangani, dan operasi registry.

## Melekat dan Debugging Electron

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Pengaturan Breakpoints

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

File kode yang relevan dapat ditemukan di `./atom/` serta dalam Brightray, ditemukan di `./brightray/browser` dan `./brightray/common`.

### melampirkan

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Proses Yang Harus Saya Lampirkan ke?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Menggunakan ProcMon untuk Amati Proses sebuah

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.