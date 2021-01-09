# Розповсюдження Програм

Щоб розповсюдити свій застосунок з Electron, вам потрібно упакувати і проаналізувати його. Найпростіший спосіб це зробити - використати один з наступних сторонніх інструментів упаковки:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [електро-пакувальник](https://github.com/electron/electron-packager)

Ці інструменти будуть подбати про всі кроки, які вам потрібно зробити, щоб закінчити з розподіленими застосунками Electron, такі, як упаковка вашого додатку, rebranding виконуваного файлу, встановлюйте правильні іконки і при необхідності створюйте інсталятори.

## Ручний розподіл

Ви також можете вибрати, щоб вручну отримати ваш додаток готовий для розподілу. кроки, необхідні для цього, були викладені нижче.

Щоб розповсюдити ваш додаток з Electron, вам необхідно завантажити файли Electron [попередньо зібрані файли](https://github.com/electron/electron/releases). Далі, папка , що містить ваш додаток, має бути названа `застосунком` і розміщена в каталозі ресурсів Electron, , як показано в наступних прикладах. Note that the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

На macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
────package.json
─────.js
────index.html
```

На Windows та Linux:

```plaintext
electron/resources/app
── package.json
────main.js
─ index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Упаковка Вашого додатку у файл

Окрім доставки вашого додатку, скопіюючи всі вихідні файли, ви також можете упакувати ваш додаток в архів [asar](https://github.com/electron/asar) , щоб уникнути поширення вихідного коду вашої програми користувачам.

Для використання `asar` архіву замінити папку `додатка` , ви повинні перейменувати архів на `додаток. сару`, і розмістіть його під каталогом ресурсів Electron, як нижче, і потім Electron спробує прочитати архів і почати з нього.

На macOS:

```plaintext
electron/Electron.app/Contents/Resources/
──app.asar
```

На Windows та Linux:

```plaintext
electron/resources/
───app.asar
```

Детальнішу інформацію можна знайти в [пакунку додатка](application-packaging.md).

## Повернення з завантаженими двійками

Після приєднання вашої програми до Electron, ви хочете перефлучити Electron перед тим, як поділитись нею з користувачами.

### Windows

Можна перейменувати `електрон. xe` будь-якої назви, яка вам подобається, а також змінити її значок та іншу інформацію з інструментами, такими як [rcedit](https://github.com/electron/rcedit).

### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Ви також можете перейменувати допоміжний додаток, щоб уникнути показу `Electron Helper` в Моніторі діяльності, але переконайтеся, що ви перейменували виконуване ім'я додатку помічника імені файлу.

Структура перейменованого додатку виглядатиме так:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
         └── MyApp Helper
```

### Linux

Можна перейменувати `електрон` виконуваний з будь-яким іменами.

## Отримання за допомогою перебудови Electron з джерела

Також можливо зробити Electron шляхом зміни назви продукту і створення його з джерела. Щоб зробити це ви повинні встановити аргумент збірки відповідний до назви товару (`electron_product_name = "YourProductName"`) в аргументах `. n` файл і перебудова.

### Створення користувальницької формули Electron

Створення власного форку Electron майже напевно не є чимось, що вам потрібно зробити для того, щоб створити ваш додаток, навіть для додатків "Рівень продукції". Використання інструменту, такого як `electron-packager` або `electron-forge` дозволить вам "Rebrand" Electron без необхідності робити ці кроки.

Ви повинні форкнути Electron коли у вас є власний C++ код, який ви пропатчили безпосередньо в Electron, що або не може бути першоджерело, або відхилено від офіційної версії. Як супроводжуючі жителі Electron, ми дуже хотіли б зробити вашу роботу сценарію так що будь ласка, намагайтеся домогтися своїх змін до офіційної версії Electron, на вас буде набагато простіше, як ми цінуємо вашу допомогу.

#### Створення користувальницького релізу з збіркою surf-build

1. Встановити [Surf](https://github.com/surf-build/surf), через npm: `npm встановити -g surf-build@latest`

2. Створити новий кошик S3 і створити наступну порожню структуру каталогу:

    ```sh
    - electron/
      - символи/
      - відстань/
    ```

3. Встановити наступні змінні середовища:

   * `ELECTRON_GITHUB_TOKEN` - токен який може створювати релізи на GitHub
   * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - місце, де ви завантажите заголовки Node.js і символи
   * `ELECTRON_RELEASE` - Встановити на `true` і запуститься частина завантаження залишити без змін і `будути` виконуватимуть контролі типу CI-типу, які відповідають за кожний запит на злиття.
   * `CI` - Встановити на `true` або іншим це не вдалося
   * `GITHUB_TOKEN` - встановити такий самий як `конструкція RON_GITHUB_TOKEN`
   * `SURF_TEMP` - встановити на `C:\Temp` on Windows для запобігання шляху занадто довгих проблем
   * `TARGET_ARCH` - задано на `ia32` або `x64`

4. У `script/upload. y`, ви _повинні_ встановити `ЕЛЕКТ RON_REPO` у ваш форк (`MYORG/electron` особливо якщо ви учасник Electron propery.

5. `супер збірка -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Зачекайте дуже, дуже тривалий час, щоб завершити збірку.
