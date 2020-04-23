# Глоссарий

Данная страница посвящена терминам, которые обычно используются при разработке на Electron.

### ASAR

ASAR это Atom Shell Archive Format. [Asar](https://github.com/electron/asar) это простой архив `tar`-подобного формата, который объединяет файлы в один файл. Electron может читать файлы в архиве без распаковки оного.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

Библиотека C Run-time (CRT) является частью стандартной библиотеки C++, которая включает стандартную библиотеку ISO C99. Библиотеки Visual C++, которые реализуют CRT, поддерживают развитие машинного кода и смешанного собственного и управляемого кода и чисто управляемого кода для разработки .NET.

### DMG

Apple Disk Image (DMG) это пакетный формат, который используется в macOS. DMG файлы обычно используются для распространения "установщиков" приложения. [electron-builder](https://github.com/electron-userland/electron-builder) поддерживает `dmg` как целевой объект компиляции.

### IME

Input Method Editor. Эта программа позволяет пользователям вводить символы, которые отсутствуют на клавиатуре. Например, это позволяет пользователям Латинской клавиатуры вводить Китайские, Японские, Корейские и Хинди символы.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

Общая библиотека, которая включает в себя [модуль Chromium Content](https://www.chromium.org/developers/content-module) и все его зависимости. (Например, Blink, [V8](#v8) и т.д.). Также именуется, как "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### главный (main) процесс

Главный процесс, обычно файл с именем `main.js`, является точкой входа для каждого приложения Electron. Он контролирует жизнь приложения, от его открытия до закрытия. Также управляет нативными элементами, такими как Menu, Menu Bar, Dock, Tray, и др. Главный процесс отвечает за создание каждого нового процесса отображения(renderer) в приложение. Полностью встроено Node API.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

См. также: [процесс](#process), [процесс отображения(renderer)](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

Система IPC для обмена внутри- или межпроцессорными процессами, она важна, потому что Chrome решает, разделять свою работу на отдельные процессы или нет, в зависимости от заполнения памяти и т.д.

Смотри https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### собственные модули

Собственные модули (также называемые [дополнениями](https://nodejs.org/api/addons.html) в Node.js) это модули написанные на C или C++, которые могут быть загружены в Node.js или Electron используя функцию require(), и используются так, как если бы они были обычным модулем Node.js. Они используются главным образом для предоставления интерфейса между скриптами JavaScript, выполняющихся в Node.js и C/C++ библиотеках.

Собственные модули Node поддерживаются в Electron, но учитывая, что Electron предпочитает использовать разные версии V8 для Node, установленного на Вашем компьютере, вы должны вручную указать расположение заголовков Electron'а, когда собираете собственные модули.

См. также [Использование собственных модулей Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System это управляемое скриптом средство установки для Microsoft Windows. Оно выпускается под сочетанием различных лицензий на свободное программное обеспечение и является широко используемой альтернативой коммерческим проприетарным продуктам, таким как например InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) поддерживает NSIS как целевой объект компиляции.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

Процесс является экземпляром компьютерной программы, который выполняется. Electron приложения используют [главный(main)](#main-process) процесс и один или более процессы [отображения(renderer)](#renderer-process), на самом деле работает несколько программ одновременно.

В Node.js и Electron, каждый запущенный процесс имеет объект `process`. Этот объект является глобальным, предоставляющий информацию о текущем процессе и контроль над ним. Он всегда доступен глобально в приложение без использования require().

См. также: [основной(main) процесс](#main-process), [процесс отображения(renderer)](#renderer-process)

### Процесс отображения (renderer process)

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

В нормальных браузерах, веб-страницы обычно выполняются в изолированной среде и им не разрешается доступ к нативным ресурсам. Пользователи Electron'а, однако, имеют право использовать API Node.js на веб-страницах, позволяя взаимодействовать на нижнем уровне операционной системы.

См. также: [процесс](#process), [основной(main) процесс](#main-process)

### Squirrel

Squirrel является фреймворком с открытым исходным кодом, который позволяет Electron приложениям автоматически обновляться, когда выпустится новая версия. См. [autoUpdated](api/auto-updater.md) API для информации о начале работы с Squirrel.

### пользовательское пространство

Этот термин возник в сообществе Unix, где "userland" или "userspace" относится к программам, которые выполняются за пределами ядра операционной системы. Этот термин был популяризирован в сообществах Node и npm, чтобы различать функции доступные в "ядре Node" по сравнению с пакетами опубликованными в реестре npm гораздо более "пользовательским" сообществом.

Как и Node, Electron сфокусирован на наличии небольшого набора API функций, которые обеспечивают весь необходимый базис для разработки кросс-платформенных настольных приложений. Такая философия позволяет Electron оставаться гибким инструментом, будучи не предписывая того как им пользоваться. Пользовательское пространство позволяет создавать и совместно использовать инструменты, которые обеспечивают дополнительный функционал поверх того, который доступен в ядре.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron компилирует V8 как часть Chromium а затем указывает Node использовать этот V8 при сборке.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

Теги `webview` используются для того, чтобы встроить сторонние ресурсы (например внешние веб-страницы) в ваше Electron приложение. Они похожи на `iframe`, но отличаются тем, что каждый webview запускается в отдельном процессе. Оно не имеет тех же разрешений, так как ваша веб страница и все взаимодействие между вашим приложением и встроенным контентом будут асинхронными. Это позволяет защитить ваше приложение от встраиваемого содержимого.
