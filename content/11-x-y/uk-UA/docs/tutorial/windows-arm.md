# Windows 10 на зброї

Якщо ваша програма працює з Electron 6.0.8 або пізніше, ви можете створити її для Windows 10 на Arm. This considerably improves performance, but requires recompilation of any native modules used in your app. It may also require small fixups to your build and packaging scripts.

## Запуск основного додатку
Якщо ваш застосунок не використовує жодні нативні модулі, то це дуже легко створити версію Arm для вашої програми.

1. Переконайтеся, що каталог `node_modules` порожній.
2. Використовуючи _командний рядок_, запустіть `встановити npm_config_arch=arm64` до запуску `npm встановлення`/`yarn встановить` як зазвичай.
3. [Якщо у вас є вбудований електрон в якості залежності від розробки](first-app.md), npm буде завантажувати і розпакувати версію arm64. Потім ви можете упакувати і поширювати ваш додаток як звичайний.

## Загальні міркування

### Код специфічний для архітектури

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
якщо (process.arch === 'x64') {
  // Зробіть 64-розрядно...
} else {
  // Зробіть 32-бітну річ...
}
```

Якщо ви хочете залізти на броню, то подібна логіка зазвичай обере неправильну архітектуру, так що ретельно перевірити свій додаток і побудувати скрипти для таких умов. У власних сценаріях збірки та упаковки завжди можна перевірити значення `npm_config_arch` в середовищі. замість того, щоб покладатися на арку поточного процесу.

### Модулі
Якщо ви використовуєте вбудовані модулі, ви повинні переконатися, що вони компілюються проти v142 компілятора MSVC (написаного в Visual Studio 2017). Ви також повинні перевірити, чи будь-який попередній з них `.dll` або `. ib` файли, надані або посилання на нативні модулі доступні для Windows на Arm.

### Тестування вашого додатку
Щоб протестувати вашу програму, скористайтеся Windows на пристрої з підтримкою Windows 10 (версія 1903 або новіше). Переконайтеся, що ви скопіювали свою програму на цільовий пристрій - пісочниця Chromium працюватиме неправильно при завантаженні медіафайлів програми з мережі.

## Передумови розробки
### Вузол / розміру

[Node.js v12.9.0 or later is recommended.](https://nodejs.org/en/) If updating to a new version of Node is  undesirable, you can instead [update npm's copy of node-gyp manually](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) to version 5.0.2 or later, which contains the required changes to compile native modules for Arm.

### Візуальна студія 2017
Visual Studio 2017 (будь-якої редакції) потрібна для перехресної компіляції стандартних модулів. Ви можете завантажити Спільноту Visual Studio 2017 через Microsoft [Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/). Після установки ви можете додати компоненти, специфічні для обладунку, запустивши наступний з _командного рядка_:

```powershell
vs_installer.exe ^
- додати Microsoft.VisualStudio.Workload.Nativedesktop ^
--додати Microsoft.VisualStudio.Component.VC.ATLMFC ^
--додати Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--додати Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeРекомендується
```

#### Створення крос-компіляційного командного рядка
Setting `npm_config_arch=arm64` in the environment creates the correct arm64 `.obj` files, but the standard _Developer Command Prompt for VS 2017_ will use the x64 linker. Щоб виправити це:

1. Duplicate the _x64_x86 Cross Tools Command Prompt for VS 2017_ shortcut (e.g. by locating it in the start menu, right clicking, selecting _Open File Location_, copying and pasting) to somewhere convenient.
2. Натисніть правою кнопкою миші на новий ярлик та виберіть _Властивості_.
3. Змініть поле _Ціль_ на прочитання `vcvarsamd64_arm64.bat` в кінці замість `vcvarsamd64_x86.bat`.

Якщо це виконано успішно, команда повинна надрукувати щось подібне до цього під час запуску:

```bat
**********************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************
[vcvarsall.bat] Environment initialized for: 'x64_arm64'
```

Якщо ви хочете створювати програму безпосередньо на Windows на пристрої Arm, замінювати `vcvarsx86_arm64. в` _Target_ , щоб перехресне компіляцію могло статися з емуляцією x86 пристрою.

### Пов'язування проти правильного `node.lib`

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) Щоб виправити це:

1. Завантажте arm64 `node.lib` з https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Перемістити на `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Замініть `6.0.9` для версії, яку ви використовуєте.


## Міжкомпіляційні рідні модулі
Після завершення всіх перерахованих вище відкрийте командний рядок між компіляцією і запустіть `set npm_config_arch=arm64`. Потім використовуйте `npm установку` для створення вашого проекту як нормально. Як і з перехресною компіляцією x86 модулів, може знадобитися видалити `node_modules` , щоб примусово перекомпілювати нативні модулі, якщо вони були раніше скомпільовані для іншої архітектури.

## Відлагодження власних модулів

Налагодження власних модулів можна зробити за допомогою Visual Studio 2017 (працює на вашій машині розробки) і відповідного [Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) на цільовому пристрої. Для відлагодження:

1. Запустіть ваш додаток `. xe` на цільовому пристрої через _командний рядок_ (передавання `--inspect-brk` , щоб призупинити його, перш ніж будуть завантажені будь-які нативні модулі).
2. Запустіть Visual Studio 2017 на вашій машині розробки.
3. З'єднайтесь із цільовим пристроєм, вибравши _Налагодження > Приєднатись до Процесу..._ і введіть IP-адресу пристрою та номер порту, який відображається інструментом віддаленого налагоджувача візуальної Студії.
4. Натисніть _Оновити_ і виберіть [відповідний процес Electron для приєднання](../development/debug-instructions-windows.md).
5. Ви можете переконатися, що будь-які символи для нативних модулів Вашого додатку завантажені правильно. Для налаштування перейдіть до _Налагодження > Опції..._ в Visual Studio 2017 і додайте папки, що містять ваш `. db` символів нижче _/ Налагодження > символів_.
5. Після додавання, встановіть будь-які відповідні точки зупинки та відновіть виконання JavaScript, за допомогою Chrome [віддалені інструменти для вузла](debugging-main-process.md).

## Отримання додаткової допомоги
Якщо ви зіткнетеся з проблемою з цією документацією, або якщо ваш додаток працює при компілюванні за x86 але не для arm64, будь ласка, [видавай задачу](../development/issues.md) з Windows в заголовку.
