# Glossary

This page defines some terminology that is commonly used in Electron development.

### ASAR

ASAR це Atom Shell Archive Format. An [asar](https://github.com/electron/asar) archive is a simple `tar`-like format that concatenates files into a single file. Electron може працювати з файлами архіву без його розпаковування.

ASAR був створений для підвищення продуктивності на Windows... TODO

### CRT

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

Apple Disk Image (DMG) — це пакетний формат, який використовується в macOS. DMG files are commonly used for distributing application "installers". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Input Method Editor. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

### IDL

Мова опису інтерфейсу. Писати сигнатури функцій і типи даних у форматі, який можна використовувати для створення інтерфейсів в Java, C++, JavaScript, тощо.

### IPC

IPC означає взаємообробне спілкування. Electron використовує IPC для надсилання серіалізованих JSON-повідомлень між [головним](#main-process) і [рендер](#renderer-process) процесів.

### libchromiumcontent

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Основний файл процесу кожної програми вказано в `головній властивості` в `package.json`. Ось як `електрон.` знає, який файл виконувати при запуску.

В Chromium цей процес називають "процесом браузера". Це перейменовано в Electron, щоб уникнути плутанини з процесами рендерингу.

See also: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym для Apple Mac App Store. Для отримання докладнішої інформації про відправлення програми до MAS, за посиланням [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

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

OSR (Вивід екранного рендерингу) використовується для завантаження важкої сторінки в у фоновому режимі і відображення його після (зображення буде набагато швидше). Це дозволяє Вам показувати сторінку без відображення на екрані.

### процес

Процес — екземпляр комп'ютерної програми, яка виконується. Застосунки Electron які використовують [головний](#main-process) і один чи декілька процесів [рендерингу](#renderer-process) фактично виконують декілька програм одночасно.

В Node.js та Electron, кожен запущений процес має об'єкт `process`. Цей об'єкт глобальний, надає інформацію про поточний процес та контролює його. Як глобальний, він завжди доступний без використання require().

Дивіться також: [головний процес](#main-process), [процес рендерингу](#renderer-process)

### процес рендерингу

Процес рендеру - це вікно браузера у вашій програмі. На відміну від основного процесу може бути кілька з них і кожен запускається в окремому процесі. Вони також можуть бути приховані.

У нормальних браузерах, веб-сторінки зазвичай виконуються в тестових середовищах і не мають доступу до нативних ресурсів. Користувачі Electron, однак, мають змогу використовувати Node.js API на веб-сторінках, дозволяючи низькорівневу взаємодію з операційною системою.

Дивіться також: [процес](#process), [процес рендерингу](#main-process)

### Squirrel

Squirrel це фреймворк з відкритим кодом, що дозволяє застосункам Electron оновлюватися автоматично коли виходить нова версія. Дивіться [autoUpdater](api/auto-updater.md) API для початку роботи з Squirrel.

### userland

Цей термін виник в співтоваристві Unix де "користувацький" відносився до програм, які виконуються поза ядром операційної системи. Останнім часом, термін популяризований в Node та npm спільноті, щоб розділяти функціонал доступний в "ядрі Node" та пакети опубліковані в реєстрі npm, набагато більшою спільнотою "користувачів".

Як і Node, Electron цілеспрямований мати невеликий набір API, який надає всі потрібні примітиви для розробки мультиплатформенних застосунків. Така філософія дизайну дозволяє Electron залишатися гнучким інструментом, не будучи надмірно визначеним у використанні. Користувацький простір дозволяє користувачам створювати і поширювати інструменти, які надають додатковий функціонал тому, що вже доступне в "ядрі".

### V8

V8, це механізм Google з відкритим початковим кодом. Написано на С++, і використовується в Google Chrome. V8 може запустити автономний режим, або може бути вбудований в будь-який додаток C++.

Electron будує V8 як частину Chromium і потім вказує Node на V8 коли будує його.

Номери версій V8 завжди відповідають темам Google Chrome. Chrome 59 включає V8 5.9, Chrome 58 включає V8 5.8 і т. д.

- [v8.dev](https://v8.dev/)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` тег використовується, щоб вставити 'гостьовий' контент (такий як сторонні веб-сторінки) у ваш застосунок Electron. Він схожий до `iframe`, але відрізняється тим, що кожен webview запускається як окремий процес. Він не має таких самих прав як ваша веб-сторінка і вся взаємодія вашого застосунку та вставленого контенту буде асинхронною. Це захищає ваш додаток від його вбудованого вмісту.
