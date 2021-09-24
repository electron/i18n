# Глоссарий

Данная страница посвящена терминам, которые обычно используются при разработке на Electron.

### ASAR

ASAR это Atom Shell Archive Format. [Asar][] это простой архив `tar`-подобного формата, который объединяет файлы в один файл. Electron может читать файлы в архиве без распаковки оного.

Формат ASAR был создан в первую очередь для повышения производительности в Windows при чтения большого количества небольших файлов (например, при загрузке дерева зависимостей JavaScript приложения из `node_modules`).

### code signing

Подписывание кода — это процесс, при котором разработчик приложения подписывает свой код цифровой подписью, чтобы после упаковки подтвердить, что он не подделан. И Windows, и macOS реализуют собственную версию подписи кода. Как разработчик классических приложений, важно подписать свой код, если вы планируете распространять его среди широкой общественности.

Дополнительные сведения можно узнать в обучении [подписывание кода][].

### изоляция контекста

Context isolation is a security measure in Electron that ensures that your preload script cannot leak privileged Electron or Node.js APIs to the web contents in your renderer process. With context isolation enabled, the only way to expose APIs from your preload script is through the `contextBridge` API.

For more information, read the [Context Isolation][] tutorial.

See also: [preload script](#preload-script), [renderer process](#renderer-process)

### CRT

The C Runtime Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. Библиотеки Visual C++, которые реализуют CRT, поддерживают развитие машинного кода и смешанного собственного и управляемого кода и чисто управляемого кода для разработки .NET.

### DMG

Apple Disk Image (DMG) это пакетный формат, который используется в macOS. DMG файлы обычно используются для распространения "установщиков" приложения.

### IME

Input Method Editor. Эта программа позволяет пользователям вводить символы, которые отсутствуют на клавиатуре. Например, это позволяет пользователям Латинской клавиатуры вводить Китайские, Японские, Корейские и Хинди символы.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for inter-process communication. Electron uses IPC to send serialized JSON messages between the main and renderer processes.

см. также: [основной(main) процесс](#main-process), [процесс отображения(renderer)](#renderer-process)

### главный (main) процесс

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Также управляет нативными элементами, такими как Menu, Menu Bar, Dock, Tray, и др. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

См. также: [процесс](#process), [процесс отображения(renderer)](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

Смотри https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

See also: [IPC](#ipc)

### MSI

On Windows, MSI packages are used by the Windows Installer (also known as Microsoft Installer) service to install and configure applications.

More information can be found in [Microsoft's documentation][msi].

### собственные модули

Собственные модули (также называемые [дополнениями][] в Node.js) это модули написанные на C или C++, которые могут быть загружены в Node.js или Electron используя функцию require(), и используются так, как если бы они были обычным модулем Node.js. Они используются главным образом для предоставления интерфейса между скриптов JavaScript, выполняющийся в Node.js и C/C++ библиотеках.

Собственные модули Node поддерживаются в Electron, но учитывая, что Electron предпочитает использовать разные версии V8 для Node, установленного на Вашем компьютере, вы должны вручную указать расположение заголовков Electron'а, когда собираете собственные модули.

For more information, read the [Native Node Modules] tutorial.

### notarization

Notarization is a macOS-specific process where a developer can send a code-signed app to Apple servers to get verified for malicious components through an automated service.

See also: [code signing](#code-signing)

### OSR

OSR (offscreen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

For more information, read the [Offscreen Rendering][][osr] tutorial.

### preload script

Preload scripts contain code that executes in a renderer process before its web contents begin loading. These scripts run within the renderer context, but are granted more privileges by having access to Node.js APIs.

See also: [renderer process](#renderer-process), [context isolation](#context-isolation)

### process

Процесс является экземпляром выполняемой компьютерной программы. Electron приложения используют [главный(main)][] процесс и один или более процессы [отображения(renderer)][], на самом деле работает несколько программ одновременно.

В Node.js и Electron, каждый запущенный процесс имеет объект `process`. Этот объект является глобальным, предоставляющий информацию о текущем процессе и контроль над ним. Он всегда доступен глобально в приложение без использования require().

См. также: [основной(main) процесс](#main-process), [процесс отображения(renderer)](#renderer-process)

### Процесс отображения (renderer process)

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

См. также: [процесс](#process), [основной(main) процесс](#main-process)

### песочница

The sandbox is a security feature inherited from Chromium that restricts your renderer processes to a limited set of permissions.

For more information, read the [Process Sandboxing][] tutorial.

See also: [process](#process)

### Squirrel

Squirrel является фреймворком с открытым исходным кодом, который позволяет Electron приложениям автоматически обновляться, когда выпустится новая версия. См. [autoUpdated][] API для информации о начале работы с Squirrel.

### пользовательское пространство

Этот термин возник в сообществе Unix, где "userland" или "userspace" относится к программам, которые выполняются за пределами ядра операционной системы. Этот термин был популяризирован в сообществах Node и npm, чтобы различать функции доступные в "ядре Node" по сравнению с пакетами опубликованными в реестре npm гораздо более "пользовательским" сообществом.

Как и Node, Electron сфокусирован на наличии небольшого набора API функций, которые обеспечивают весь необходимый базис для разработки кросс-платформенных настольных приложений. Такая философия позволяет Electron оставаться гибким инструментом, будучи не предписывая того как им пользоваться. Пользовательское пространство позволяет создавать и совместно использовать инструменты, которые обеспечивают дополнительный функционал поверх того, который доступен в ядре.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron компилирует V8 как часть Chromium а затем указывает Node использовать этот V8 при сборке.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Оно не имеет тех же разрешений, так как ваша веб страница и все взаимодействие между вашим приложением и встроенным контентом будут асинхронными. Это позволяет защитить ваше приложение от встраиваемого содержимого.

[дополнениями]: https://nodejs.org/api/addons.html
[Asar]: https://github.com/electron/asar
[autoUpdated]: api/auto-updater.md
[подписывание кода]: tutorial/code-signing.md
[Context Isolation]: tutorial/context-isolation.md
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[главный(main)]: #main-process
[msi]: https://docs.microsoft.com/en-us/windows/win32/msi/windows-installer-portal
[Offscreen Rendering]: tutorial/offscreen-rendering.md
[Process Sandboxing]: tutorial/sandbox.md
[отображения(renderer)]: #renderer-process
