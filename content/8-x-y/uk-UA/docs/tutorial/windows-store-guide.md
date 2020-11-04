# Інструкція Додання в Windows Store

З Windows 10 старий виконуваний файл win32 отримав нові сестри: Універсальна Windows Platform. Новий `. формат ppx` не тільки використовує ряд нових потужних API, таких як Cortana або Push Сповіщення, але через Windows Store, також спрощує встановлення та оновлення.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages][electron-windows-store], enabling developers to use some of the goodies found in the new application model. Це керівництво пояснює, як використовувати його - і що за можливості і обмеження пакету Electron AppX.

## Фон і вимоги

Windows 10 "Дата оновлення" дозволяє виконувати наступні файли до переможця `.exe` на початку з віртуалізованою файловою системою та реєстром. Обидва створюються під час компіляції запуском додатку і інсталятора всередині Windows контейнера, під час встановлення встановлення дозволяється Windows визначити, які зміни виконуються до операційної системи. Направлення виконуваного файлу з віртуальною файловою системою та віртуальним реєстром дозволяє Windows увімкнути встановлення в один клік і видалити.

Крім того, exe запускається всередині моделі appx, що означає, що він може використовувати багато API-інтерфейсів, доступних для універсальної платформи Windows. Щоб отримати ще більше можливостей, додаток Electron може з'єднуватися з невидимим фоновим завданням UWP , запущеним разом з `exe` - різновидом запуску в якості стоянки у фоновому режимі, отримувати push-сповіщення або спілкуватися з іншими застосунками UWP .

Щоб скомпілювати будь-який наявний Electron додаток, переконайтеся, що у вас є такі вимоги:

* Windows 10 із оновленням до Річниці (випущений 2nd 2016)
* The Windows 10 SDK, [downloadable here][windows-sdk]
* Принаймні вузол 4 (щоб перевірити, запустіть `node -v`)

Потім перейдіть і встановіть `electron-windows-store` CLI:

```sh
установка npm -g electron-windows-store
```

## Крок 1: Пакетуйте вашу програму Electron

Package the application using [electron-packager][electron-packager] (or a similar tool). Переконайтеся, що ви не потребуєте остаточного додатку `node_modules` , оскільки будь-який модуль насправді не потребує збільшення розміру вашого додатка.

Результат повинен виглядати приблизно так:

```plaintext
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Крок 2: Запуск electron-windows-store

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0 `
    --package-name myelectronapp
```

Після виконання інструмент буде працювати: він приймає ваш Electron як вхід, вирівнювання `node_modules`. Потім, архівує ваш додаток як `app.zip`. Використання інсталятора та контейнера Windows, інструмент створює пакет "expanded" AppX - в тому числі програма Windows Application Manifest (`AppXManifest. ml`) а також як віртуальна файлова система та віртуальний реєстр вашого реєстру всередині теки .

Після створення розширених файлів AppX інструмент використовує Windows Packager (`MakeAppx. xe`) для створення пакета з цих файлів на диску. Нарешті, інструмент може бути використаний для створення довіреного сертифікату на вашому комп'ютері для підписання нового пакету AppX. За допомогою підписаного пакету AppX інтерфейс командного рядка може також автоматично встановити його на ваш комп'ютер.

## Крок 3: Використання пакету AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here][how-to-update].

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here][centennial-campaigns]. Тим часом всі користувачі зможуть встановити ваш пакет двічі клацнувши по ньому, таким чином сабміт у магазині може бути непотрібним, якщо вам потрібен простіший метод встановлення. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion][add-appxpackage].

Іншим важливим обмеженням є те, що скомпільований пакет AppX все ще містить win32 виконуваний - і тому не буде виконуватись в Xbox, Гололени або телефони.

## Необов'язково: Додати можливості UWP використовуючи фонові завдання
Ви можете поєднати ваш Electron додаток з невидимою загальноприйнятою задачею для повного використання функцій Windows 10 - наприклад push-сповіщень, Інтеграція Cortana або жива плитка.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample][background-task].

## Необов'язково: Конвертувати за допомогою контейнерів Віртуалізація

Для створення пакунку AppX, `electron-windows-store` CLI використовує шаблон який повинен працювати для більшості додатків Electron. Однак, якщо ви користуєтесь користувацьким інсталятором або у вас виникають будь-які проблеми з згенерованим пакетом, ви можете спробувати створити пакет за допомогою компіляції Windows Container - в цьому режимі, CLI встановить і запустить ваш додаток у порожньому Windows Container , щоб визначити, які зміни ваш додаток виконується в операційній системі .

Перед початком командного рядка установіть програму "Комп'ютер Windows Desktop Converter". Це займе кілька хвилин, але не хвилюйтеся, вам слід зробити тільки один раз. Download and Desktop App Converter from [here][app-converter]. Ви отримаєте два файли: `DesktopAppConverter.zip` та `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. З підвищеного PowerShell (відкрито "запустити з адміністратором", Переконайтеся, що ваша система виконання політики дозволяє нам запускати все, що ми маємо намір бігти по Виклику `Set-ExecutionPolicy bypass`.
2. Після цього виконайте встановлення консольної програми, передавши її в розташування базового зображення Windows (завантаженого як `BaseImage-14316. im`), через виклик `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Якщо запуск вище команд запитує вас для перезавантаження, будь ласка, перезавантажте пристрій і запустіть вищевказану команду знову після успішного перезапуску.

Після встановлення ви можете перейти до компіляції вашого додатку Electron.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
