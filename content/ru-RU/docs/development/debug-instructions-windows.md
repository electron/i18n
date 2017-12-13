# Отладка под Windows

Если вы наблюдаете аварии или проблемы в работе Electron, которые, как вы считаете, вызваны самим Electron, а не приложением на JavaScript, отладка может быть немного сложной, особенно для разработчиков ранее не занимавшихся отладкой кода на C++. Однако, с использованием Visual Studio, сервера символов Electron, размещенного на GitHub, и исходного кода Electron, довольно легко перейти к пошаговой отладке с точки останова в исходном коде Electron.

## Требования

* **Отладочная сборка Electron**: Обычно проще всего собрать ее самостоятельно, используя инструменты и предварительные требования, перечисленные в [инструкции по сборке под Windows](build-instructions-windows.md). Вы конечно можете скачать обычную сборку Electron и подключиться для отладки к ней, но вы обнаружите, что она сильно оптимизирована, и это существенно затрудняет отладку: отладчик не сможет показать вам содержимое всех переменных, и путь выполнения может казаться странным вследствие встраивания функций (inlining), хвостовых вызовов (trail calls) и других оптимизаций, выполненных компилятором.

* **Visual Studio с инструментами C++**: бесплатная общественная редакция Visual Studio, можно использовать версии VS2013 и VS2015. После установки, [настройте Visual Studio для использования сервера символов Electron на GitHub](setting-up-symbol-server.md). Это позволит Visual Studio получить лучшее представление о том, что происходит внутри Electron, что позводит представить переменные в удобочитаемом формате.

* **ProcMon**: [бесплатный инструмент от SysInternals](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx), позволяющий вам просматривать параметры процессов, файловые дескрипторы, и операции над реестром.

## Подключение к Electron для отладки

Для запуска сеанса отладки, откройте PowerShell/CMD и запустите отладочную сборку Electron, указав приложение в качестве параметра.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Задание точек останова

Затем, откройте Visual Studio. Electron не был собран из Visual Studio, и поэтому код не содержит файла проекта; тем не менее, вы можете открывать исходные файлы просто "как файл", то есть Visual Studio откроет их сами по себе. Тем не менее, вы можете ставить точки останова - Visual Studio автоматически определит, что этот исходный код соответствует исполняемому коду в подключенном процессе, и остановится на указанной точке останова.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./brightray/browser` and `./brightray/common`. If you're hardcore, you can also debug Chromium directly, which is obviously found in `chromium_src`.

### Подключение

Вы можете подключить отладчик Visual Studio к запущенному процессу, на локальном или удаленном компьютере. После того как процесс был запущен, нажмите Debug / Attach to Process (или нажмите `CTRL + ALT + P`), чтобы открыть диалоговое окно «Attach to Process». Вы можете использовать эту возможность для отладки приложений, выполняемых на локальном или удаленном компьютере, и для одновременной отладки нескольких процессов.

Если Electron выполняется под учетной записью другого пользователя, установите флажок `Show processes from all users`. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### К какому процессу я должен подключиться?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Использование ProcMon для наблюдения за процессом

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.