# Словник

Ця сторінка визначає термінологію, що широко використовується в розробці Electron.

### ASAR

ASAR це Atom Shell Archive Format. Архів [asar](https://github.com/electron/asar) це простий `tar` формат, що збирає файли в єдиний. Electron може працювати з файлами архіву без його розпаковування.

ASAR був створений для збільшення продуктивності на Windows...

### Brightray

Brightray [була](https://github.com/electron-archive/brightray) статичною бібліотекою, яка робила легшим використання [libchromiumcontent](#libchromiumcontent) в додатках. Зараз вона є застарілою та об'єднаною з Electron.

### CRT

Бібліотека C Run-time (CRT) є частиною стандартної бібліотеки C++ яка включає стандартну бібліотеку ISO C99. Бібліотеки Visual C++, які реалізують CRT підтримку нативної розробки коду, нативний змішаний та керований код, а також чистий керований код для розробки .NET.

### DMG

Apple Disk Image (DMG) это пакетний формат, який використовується в macOS. DMG файли зазвичай використовуються для поширення програми «установника». [electron-builder](https://github.com/electron-userland/electron-builder) підтримує `dmg` формат як ціль побудови/компіляції.

### IME

Input Method Editor. Це програма, яка дозволяє користувачам вводити букви та символи, які відсутні на клавіатурі. Наприклад, користувачі з Латинською клавіатурою можуть вводити Китайські, Японські, Корейські або Індійські символи.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC (Inter-Process Communication) це набір засобів для комунікації або взаємодії між процесами. Electron використовує IPC для відправки серіалізованих JSON повідомлень між [main](#main-process) та [renderer](#renderer-process) процесами.

### libchromiumcontent

Загальна бібліотека, яка включає в себе [Chromium Content module](https://www.chromium.org/developers/content-module) і всі його залежності (Наприкkад, Blink, [V8](#v8) і т.д.). Також відома як "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### Головний (Main) процес

Головний процес, зазвичай файл з назвою `main.js`, є точкою входу для кожної програми Electron. Він контролює життя додатку, від відкриття до закриття. Він також керує такими елементами як Меню, Панель меню, Dock, Трей, тощо. Головний процес відповідальний за кожен новий процес рендерінгу (render process) в програмі. Node API є вбудованим.

Кожен файл головного процесу застосунку визначений у `main` властивості у `package.json`. Так `electron` знає, який файл виконувати спочатку.

В Chromium, цей процес також відомий як "процес браузера". Він перейменований в Electron щоб уникнути плутанини з процесом рендерингу.

Дивіться також: [головний процес](#process), [процес рендерингу](#renderer-process)

### MAS

Акронім для Apple's Mac App Store. Для інструкції надсилання вашого додатку в MAS, дивіться [Інструкція подання в Mac App Store](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### нативні модулі

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Вони зазвичай використовуються для надання зв'язку JavaScript, який запущений в Node.js та C/C++ бібліотек.

Нативні модулі Node підтримуються Electron, але так як Electron скоріш за все використовує відмінну версію V8 від тієї що в Node встановленого у вашій системі, вам потрібно вручну визначити розташування заголовків Electron при побудові нативних модулів.

Дивіться також [Використання Нативних Модулів Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System це керований скриптом інсталятор для Microsoft Windows. Випускається під комбінацією вільних прикладних ліцензій і гироко використовується як альтернатива комерційним пропрієтарним продуктам таким як InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) підтримує NSIS як ціль побудови.

### OSR

OSR (Off-screen rendering) може бути використаний для завантаження великих сторінок у фоні і подальшого відображення (так буде набагато швидше). Дозволяє рендерити сторінку, не показуючи її на екрані.

### процес

Процес — екземпляр комп'ютерної програми, яка виконується. Застосунки Electron які використовують [головний](#main-process) і один чи декілька процесів [рендерингу](#renderer-process) фактично виконують декілька програм одночасно.

В Node.js та Electron, кожен запущений процес має об'єкт `process`. Цей об'єкт глобальний, надає інформацію про поточний процес та контролює його. Як глобальний, він завжди доступний без використання require().

Дивіться також: [головний процес](#main-process), [процес рендерингу](#renderer-process)

### процес рендерингу

Процес рендерингу це вікно браузера у вашому додатку. На відміну від головного процесу, цих може бути декілька і кожен виконується в окремому процесі. Вони також можуть бути приховані.

У нормальних браузерах, веб-сторінки зазвичай виконуються в тестових середовищах і не мають доступу до нативних ресурсів. Користувачі Electron, однак, мають змогу використовувати Node.js API на веб-сторінках, дозволяючи низькорівневу взаємодію з операційною системою.

Дивіться також: [процес](#process), [процес рендерингу](#main-process)

### Squirrel

Squirrel це фреймворк з відкритим кодом, що дозволяє застосункам Electron оновлюватися автоматично коли виходить нова версія. Дивіться [autoUpdater](api/auto-updater.md) API для початку роботи з Squirrel.

### користувацький простір

Цей термін виник в співтоваристві Unix де "користувацький" відносився до програм, які виконуються поза ядром операційної системи. Останнім часом, термін популяризований в Node та npm спільноті, щоб розділяти функціонал доступний в "ядрі Node" та пакети опубліковані в реєстрі npm, набагато більшою спільнотою "користувачів".

Як і Node, Electron цілеспрямований мати невеликий набір API, який надає всі потрібні примітиви для розробки мультиплатформенних застосунків. Така філософія дизайну дозволяє Electron залишатися гнучким інструментом, не будучи надмірно визначеним у використанні. Користувацький простір дозволяє користувачам створювати і поширювати інструменти, які надають додатковий функціонал тому, що вже доступне в "ядрі".

### V8

V8 це JavaScript енджін Google з відкритим кодом. Написаний на C++ і використовується Google в Chrome. V8 може запускатися автономно чи вбудовуватися в будь-який C++ застосунок.

Electron будує V8 як частину Chromium і потім вказує Node на V8 коли будує його.

Номери версій V8 завжди відповідають версіям Google Chrome. Chrome 59 включає V8 5.9, Chrome 58 включає V8 5.8, тощо.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` тег використовується, щоб вставити 'гостьовий' контент (такий як сторонні веб-сторінки) у ваш застосунок Electron. Він схожий до `iframe`, але відрізняється тим, що кожен webview запускається як окремий процес. Він не має таких самих прав як ваша веб-сторінка і вся взаємодія вашого застосунку та вставленого контенту буде асинхронною. Це захищає ваш додаток від нього.