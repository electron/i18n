# Глоссарий

Данная страница посвящена терминам, которые обычно используются при разработке на Electron.

### ASAR

ASAR это Atom Shell Archive Format. [Asar][asar] это простой архив `tar`-подобного формата, который объединяет файлы в один файл. Electron может читать файлы в архиве без распаковки оного.

The ASAR format is created primarily to improve performance on Windows... TODO

### CRT

Библиотека C Run-time (CRT) является частью стандартной библиотеки C++, которая включает стандартную библиотеку ISO C99. Библиотеки Visual C++, которые реализуют CRT, поддерживают развитие машинного кода и смешанного собственного и управляемого кода и чисто управляемого кода для разработки .NET.

### DMG

Apple Disk Image (DMG) это пакетный формат, который используется в macOS. DMG файлы обычно используются для распространения "установщиков" приложения. [electron-builder][] поддерживает `dmg` как целевой объект компиляции.

### IME

Input Method Editor. Эта программа позволяет пользователям вводить символы, которые отсутствуют на клавиатуре. Например, это позволяет пользователям Латинской клавиатуры вводить Китайские, Японские, Корейские и Хинди символы.

### IDL

Язык описания интерфейса. Запись подписи функции и типов данных в формате, который может быть использован для генерации интерфейсов в Java, C++, JavaScript, и т.д.

### IPC

IPC означает межпроцессное взаимодействие. Electron uses IPC to send serialized JSON messages between the [main][] and [renderer][] processes.

### libchromiumcontent

Общая библиотека, которая включает в себя [модуль Chromium Content][] и все его зависимости. (Например, Blink, [V8][] и т.д.). Также именуется, как "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### главный (main) процесс

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. Также управляет нативными элементами, такими как Menu, Menu Bar, Dock, Tray, и др. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Основной файл процесса каждого приложения указан в главном свойстве `` в `package.json`. Вот так `электрон.` знает, какой файл выполнить при запуске.

В Chromium этот процесс называется "процесс браузера". переименован в Electron, чтобы избежать путаницы с процессами визуализации.

См. также: [процесс](#process), [процесс отображения(renderer)](#renderer-process)

### MAS

Acronym для Apple App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide][].

### Mojo

Система IPC для обмена внутри- или межпроцессорными процессами, она важна, потому что Chrome решает, разделять свою работу на отдельные процессы или нет, в зависимости от заполнения памяти и т.д.

Смотри https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### собственные модули

Собственные модули (также называемые [дополнениями][] в Node.js) это модули написанные на C или C++, которые могут быть загружены в Node.js или Electron используя функцию require(), и используются так, как если бы они были обычным модулем Node.js. Они используются главным образом для предоставления интерфейса между скриптами JavaScript, выполняющихся в Node.js и C/C++ библиотеках.

Собственные модули Node поддерживаются в Electron, но учитывая, что Electron предпочитает использовать разные версии V8 для Node, установленного на Вашем компьютере, вы должны вручную указать расположение заголовков Electron'а, когда собираете собственные модули.

См. также [Использование собственных модулей Node][].

### NSIS

Nullsoft Scriptable Install System это управляемое скриптом средство установки для Microsoft Windows. Оно выпускается под сочетанием различных лицензий на свободное программное обеспечение и является широко используемой альтернативой коммерческим проприетарным продуктам, таким как например InstallShield. [electron-builder][] поддерживает NSIS как целевой объект компиляции.

### OSR

OSR (Off-screen рендеринг) может быть использован для загрузки тяжелой страницы в фоне, а затем отображать ее после (будет гораздо быстрее). Она позволяет отображать страницу без ее отображения на экране.

### process

Процесс является экземпляром компьютерной программы, который выполняется. Electron приложения используют [главный(main)][] процесс и один или более процессы [отображения(renderer)][], на самом деле работает несколько программ одновременно.

В Node.js и Electron, каждый запущенный процесс имеет объект `process`. Этот объект является глобальным, предоставляющий информацию о текущем процессе и контроль над ним. Он всегда доступен глобально в приложение без использования require().

См. также: [основной(main) процесс](#main-process), [процесс отображения(renderer)](#renderer-process)

### процесс отображения(renderer)

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. Они также могут быть скрыты.

В нормальных браузерах, веб-страницы обычно выполняются в изолированной среде и им не разрешается доступ к нативным ресурсам. Пользователи Electron'а, однако, имеют право использовать API Node.js на веб-страницах, позволяя взаимодействовать на низком уровне операционной системы.

См. также: [процесс](#process), [основной(main) процесс](#main-process)

### Squirrel

Squirrel является фреймворком с открытым исходным кодом, который позволяет Electron приложениям автоматически обновляться, когда выпустится новая версия. См. [autoUpdated][] API для информации о начале работы с Squirrel.

### пользовательское пространство

Этот термин возник в сообществе Unix, где "userland" или "userspace" относится к программам, которые выполняются за пределами ядра операционной системы. Этот термин был популяризирован в сообществах Node и npm, чтобы различать функции доступные в "ядре Node" по сравнению с пакетами опубликованными в реестре npm гораздо более "пользовательским" сообществом.

Как и Node, Electron сфокусирован на наличии небольшого набора API функций, которые обеспечивают весь необходимый базис для разработки кросс-платформенных настольных приложений. Такая философия позволяет Electron оставаться гибким инструментом, будучи не предписывая того как им пользоваться. Пользовательское пространство позволяет создавать и совместно использовать инструменты, которые обеспечивают дополнительный функционал поверх того, который доступен в ядре.

### V8

V8 является Google с открытым исходным кодом JavaScript движка. Он написан на C++ и используется в Google Chrome. V8 может запускаться как отдельно, так и встраиваться в любое приложение C++.

Electron компилирует V8 как часть Chromium а затем указывает Node использовать этот V8 при сборке.

Номера версий V8 всегда соответствуют версиям Google Chrome. Chrome 59 включает в себя V8 5.9, Chrome 58 включает в себя V8 5.8 и т.д.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. Оно не имеет тех же разрешений, так как ваша веб страница и все взаимодействие между вашим приложением и встроенным контентом будут асинхронными. Это позволяет защитить ваше приложение от встраиваемого содержимого.

[дополнениями]: https://nodejs.org/api/addons.html
[asar]: https://github.com/electron/asar
[autoUpdated]: api/auto-updater.md
[модуль Chromium Content]: https://www.chromium.org/developers/content-module
[electron-builder]: https://github.com/electron-userland/electron-builder
[Mac App Store Submission Guide]: tutorial/mac-app-store-submission-guide.md
[main]: #main-process
[главный(main)]: #main-process
[renderer]: #renderer-process
[отображения(renderer)]: #renderer-process
[Использование собственных модулей Node]: tutorial/using-native-node-modules.md
[V8]: #v8
