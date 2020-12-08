# Використання Нативних Модулів Node.js

Native Node.js modules are supported by Electron, but since Electron has a different [application binary interface (ABI)](https://en.wikipedia.org/wiki/Application_binary_interface) from a given Node.js binary (due to differences such as using Chromium's BoringSSL instead of OpenSSL), the native modules you use will need to be recompiled for Electron. В іншому випадку ви отримаєте наступний клас помилок, коли спробуєте запустити додаток:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. Для цієї версії Node.js потрібна
NODE_MODULE_VERSION $ABC. Будь ласка, спробуйте перекомпілювати або перевстановити
модуль (наприклад, з використанням `npm rebuild` або `npm install`).
```

## Як встановити нативні модулі

Існує кілька різних способів встановлення стандартних модулів:

### Встановлення модулів та реконструкції для Electron

Ви можете встановити модулі, такі як інші проекти вузла, а потім перебудувати модулі для Electron з пакетом [`electron-rebuild`](https://github.com/electron/electron-rebuild) This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app. If you are using [Electron Forge](https://electronforge.io/), this tool is used automatically in both development mode and when making distributables.

For example, to install the standalone `electron-rebuild` tool and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools such as [Electron Packager](https://github.com/electron/electron-packager), consult the project's README.

### Використання `npm`

Встановивши декілька змінних середовища, ви можете використати `npm` для встановлення модулів безпосередньо.

Наприклад, для встановлення всіх залежностей для Electron:

```sh
# Версія Electron.
експорт npm_config_target=1.2.3
# Архітектура Electron, див. https://electronjs.org/docs/tutorial/support#supported-platforms
# для підтримуваних архітектур.
експорт npm_config_arch=x64
експорт npm_config_target_arch=x64
# заголовки для Electron.
експорт npm_config_disturl=https://electronjs.org/headers
# Розкажіть node-pre-gyp, який ми розробляємо для Electron.
експортувати npm_config_runtime=electron
# Тель node-pre-gyp щоб побудувати модуль з вихідного коду.
експорт npm_config_build_from_source=true
# Встановити всі залежності, і зберегти кеш до ~/.electron-gyp.
HOME=~/.electron-gyp npm встановлення
```

### Вручну побудову для Electron

Якщо ви розробник нативних модулів і хочете протестувати його проти Electron, ви можете захотіти відновити модуль для Electron вручну. Ви можете використати `node-gyp` безпосередньо для будівництва для Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` змінює те, де знайти заголовки розробників.
* `--target=1.2.3` це версія Electron.
* `--dist-url=...` вказує, куди завантажити заголовки.
* `--arch=x64` каже, що модуль побудований для 64-розрядної системи.

### Ручна побудова для користувальницької збірки Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm перебудувати --nodedir=/path/to/electron/vendor/node
```

## Виправлення Неполадок

Якщо ви встановили рідний модуль і знайшли його, що він не працює, вам потрібно перевірити такі речі:

* Коли маєте сумніви, запустіть `electron-rebuild` першим.
* Переконайтеся, що рідний модуль сумісний з цільовою платформою і архітектурою для вашого додатку Electron.
* Переконайтеся, що `win_delay_load_hook` не вказано на `false` в модулі `binding.gyp`.
* Після оновлення Electron, вам, зазвичай, необхідно перебудувати модулі.

### Нотатка про `win_delay_load_hook`

На Windows, за замовчуванням, `node-gyp` посилається на нативні модулі навпроти `node.dll`. Тим не менш, в Electron 4.x та вище, символи, необхідні для нативних модулів експортуються `електроном. x`, і немає `node.dll`. Для завантаження нативних модулів на Windows, `node-gyp` встановлює [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) , що спрацьовує після завантаження стандартного модуля, і перенаправляє `вузол. ll` посилання на використання для завантаження виконуваного файлу замість `вузла. усі` у пошуку бібліотеки шлях (який нічого не з'явиться). Таким чином, на Electron 4.x і вище, `'win_delay_load_hook': 'true'` потрібно завантажити нативні модулі.

Якщо у вас помилка на зразок `модуль не зареєструвався самостійно`, або `Зазначена
процедура не знайдена`, це може означати, що модуль, який ви намагаєтеся використати неправильно розмістив хук із зацикленою затримкою.  Якщо модуль побудований за допомогою node-gyp, переконайтеся що змінна `win_delay_load_hook` має `true` в `. файл yp` , і більше не перевизначено.  If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Ваше `посилання` на має виглядати наступним чином:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_load_hook.obj"
```

Зокрема, важливо, що:

* ви пов'язуєте посилання на вузол `node.lib` з _Electron_ і не без нічого. Якщо ви поєднуєте посилання на невірний `node.lib` з результатами завантаження будуть помилки, коли вам знадобиться модуль в Electron.
* прапор `/DELAYLOAD:node.exe`. Якщо `вузол. xe` посилання не затримано, тоді гак затримки завантаження не дасть шансу звільнити, а вузол символи не будуть правильно вирішені.
* `win_delay_load_hook.obj` безпосередньо приєднується до фінальної DLL. Якщо гак налаштований в залежному DLL - він не буде стріляти в потрібний час.

Дивіться [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) наприклад delay-load hook якщо ви реалізуєте свої власні.

## Модулі, які покладаються на `здібності`

[`prebuild`](https://github.com/prebuild/prebuild) надає спосіб опублікувати нативні модулі Node з попередньо побудованими двійковими файлами для декількох версій Node і Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Модулі, на які покладаються `node-pre-gyp`

Інструмент [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) надає спосіб розгортання стандартних модулів Node з вбудованими бінарниками, і багато популярних модулів використовуються.

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.
