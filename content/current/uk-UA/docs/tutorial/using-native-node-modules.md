# Використання Нативних Модулів Node.js

Модулі Native Node підтримуються Electron, але оскільки Electron дуже , швидше за все, використовує іншу версію V8 з двійкового файлу Node встановленого на вашій системі, модулі, які ви використовуєте, повинні бути перекомпільовані для Electron. В іншому випадку ви отримаєте наступний клас помилок, коли спробуєте запустити додаток:

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

Ви можете встановити модулі, такі як інші проекти вузла, а потім перебудувати модулі для Electron з пакетом [`electron-rebuild`](https://github.com/electron/electron-rebuild) Цей модуль може автоматично визначати версію Electron і обробляти ручних етапів завантаження заголовків та відновлення нативних модулів для вашої програми.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
npm встановлює --save-dev electron-rebuild

# кожного разу коли ви запускаєте "npm install", запустіть це:
./node_modules/. in/electron-rebuild

# на Windows, якщо у вас виникли неполадки, спробуйте
.\node_modules\.bin\electron-rebuild.cmd
```

Для отримання додаткової інформації про використання та інтеграцію з іншими інструментами, зверніться до проекту README.

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

- ви пов'язуєте посилання на вузол `node.lib` з _Electron_ і не без нічого. Якщо ви поєднуєте посилання на невірний `node.lib` з результатами завантаження будуть помилки, коли вам знадобиться модуль в Electron.
- прапор `/DELAYLOAD:node.exe`. Якщо `вузол. xe` посилання не затримано, тоді гак затримки завантаження не дасть шансу звільнити, а вузол символи не будуть правильно вирішені.
- `win_delay_load_hook.obj` безпосередньо приєднується до фінальної DLL. Якщо гак налаштований в залежному DLL - він не буде стріляти в потрібний час.

Дивіться [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) наприклад delay-load hook якщо ви реалізуєте свої власні.

## Модулі, які покладаються на `здібності`

[`prebuild`](https://github.com/prebuild/prebuild) надає спосіб опублікувати нативні модулі Node з попередньо побудованими двійковими файлами для декількох версій Node і Electron.

Якщо модулі забезпечують двійкові файли для використання Electron, переконайтеся, що програма `--build-from-source` і `npm_config_build_from_source` змінну , щоб повністю скористатися шаблонними двійковими системами.

## Модулі, на які покладаються `node-pre-gyp`

Інструмент [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) надає спосіб розгортання стандартних модулів Node з вбудованими бінарниками, і багато популярних модулів використовуються.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. Тому загалом, рекомендується завжди створювати рідні модулі з вихідного коду. `electron-rebuild` обробляє це для вас автоматично.

Якщо ви дотримуєтесь `npm` способу встановлення модулів, то це зроблено за замовчуванням, якщо ні, ви повинні передати `--build-from-source` до `npm`, або встановіть змінну середовища `npm_config_build_from_source`.
