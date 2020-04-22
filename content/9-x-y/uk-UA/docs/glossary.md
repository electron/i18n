# Glossary

This page defines some terminology that is commonly used in Electron development.

### ASAR

ASAR це Atom Shell Archive Format. An [asar](https://github.com/electron/asar) archive is a simple `tar`-like format that concatenates files into a single file. Electron може працювати з файлами архіву без його розпаковування.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

Apple Disk Image (DMG) — це пакетний формат, який використовується в macOS. DMG files are commonly used for distributing application "installers". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Input Method Editor. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

See also: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

Дивіться https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### нативні модулі

Нативні модулі(ще називають [аддонами](https://nodejs.org/api/addons.html) в Node.js) є модулями написаними на C або C++ що можуть бути завантажені в Node.js або Electron використовує функцію require(), і використані, як звичайний модуль Node.js. Вони зазвичай використовуються для надання зв'язку JavaScript, який запущений в Node.js та C/C++ бібліотек.

Нативні модулі Node підтримуються Electron, але так як Electron скоріш за все використовує відмінну версію V8 від тієї що в Node встановленого у вашій системі, вам потрібно вручну визначити розташування заголовків Electron при побудові нативних модулів.

Дивіться також [Використання Нативних Модулів Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System це керований скриптом інсталятор для Microsoft Windows. Випускається під комбінацією вільних прикладних ліцензій і гироко використовується як альтернатива комерційним пропрієтарним продуктам таким як InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) підтримує NSIS як ціль побудови.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### процес

Процес — екземпляр комп'ютерної програми, яка виконується. Застосунки Electron які використовують [головний](#main-process) і один чи декілька процесів [рендерингу](#renderer-process) фактично виконують декілька програм одночасно.

В Node.js та Electron, кожен запущений процес має об'єкт `process`. Цей об'єкт глобальний, надає інформацію про поточний процес та контролює його. Як глобальний, він завжди доступний без використання require().

Дивіться також: [головний процес](#main-process), [процес рендерингу](#renderer-process)

### процес рендерингу

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

У нормальних браузерах, веб-сторінки зазвичай виконуються в тестових середовищах і не мають доступу до нативних ресурсів. Користувачі Electron, однак, мають змогу використовувати Node.js API на веб-сторінках, дозволяючи низькорівневу взаємодію з операційною системою.

Дивіться також: [процес](#process), [процес рендерингу](#main-process)

### Squirrel

Squirrel це фреймворк з відкритим кодом, що дозволяє застосункам Electron оновлюватися автоматично коли виходить нова версія. Дивіться [autoUpdater](api/auto-updater.md) API для початку роботи з Squirrel.

### userland

Цей термін виник в співтоваристві Unix де "користувацький" відносився до програм, які виконуються поза ядром операційної системи. Останнім часом, термін популяризований в Node та npm спільноті, щоб розділяти функціонал доступний в "ядрі Node" та пакети опубліковані в реєстрі npm, набагато більшою спільнотою "користувачів".

Як і Node, Electron цілеспрямований мати невеликий набір API, який надає всі потрібні примітиви для розробки мультиплатформенних застосунків. Така філософія дизайну дозволяє Electron залишатися гнучким інструментом, не будучи надмірно визначеним у використанні. Користувацький простір дозволяє користувачам створювати і поширювати інструменти, які надають додатковий функціонал тому, що вже доступне в "ядрі".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron будує V8 як частину Chromium і потім вказує Node на V8 коли будує його.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` тег використовується, щоб вставити 'гостьовий' контент (такий як сторонні веб-сторінки) у ваш застосунок Electron. Він схожий до `iframe`, але відрізняється тим, що кожен webview запускається як окремий процес. Він не має таких самих прав як ваша веб-сторінка і вся взаємодія вашого застосунку та вставленого контенту буде асинхронною. Це захищає ваш додаток від його вбудованого вмісту.
