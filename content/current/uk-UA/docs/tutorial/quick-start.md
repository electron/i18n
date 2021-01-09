# Короткий посібник користувача

## Швидкий старт

Electron - це фреймворк, який дозволяє створювати настільні програми з JavaScript, HTML та CSS. Ці програми потім можуть бути упаковані для запуску безпосередньо на macOS, Windows або Linux, або розповсюдження через Mac App Store або Microsoft Store.

Як правило, ви створюєте настільні програми для операційної системи (OS) використовуючи кожен вбудований фреймворк конкретної операційної системи. Електрон дозволяє написати ваш додаток один раз, за допомогою технологій, які ви вже знаєте.

### Системні вимоги

Перед продовженням роботи з Electron ви повинні встановити [Node.js](https://nodejs.org/en/download/). Ми рекомендуємо встановити або останню версію `LTS` або `Поточна версія`.

> Будь ласка, встановіть Node.js, використовуючи попередньо побудовані інсталятори для вашої платформи. Ви можете зіткнутися з проблемами несумісності з різними інструментами розвитку.

Щоб перевірити значення Node.js було встановлено правильно, введіть наступні команди у вашого клієнта:

```sh
вузол -v
npm -v
```

Команди повинні друкувати відповідні версії Node.js та npm. Якщо обидва команди успішно, ви готові встановити Electron.

### Створення базової програми

З точки зору розробки, програма Electron це, по суті, додаток Node.js. Це означає, що початковою точкою вашої програми Electron буде файл `package.json` як у будь-якому іншому додатку Node.js. Мінімальний Electron додаток має наступну структуру:

```plaintext
my-electron-app/
─ package.json
────main.js
────index.html
```

Давайте створимо базову програму на основі структури, що вище.

#### Install Electron

Створіть папку для вашого проекту та встановіть Electron тут:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i - save-dev electron
```

#### Створити основний файл скрипту

Основний сценарій визначає вхідну точку вашого додатка Electron (у нашому випадку, це `main.js` файл, який запустить основний процес. Зазвичай скрипт, який виконується в основному процесі, контролює життєвий цикл програми, відображає графічний інтерфейс користувача і його елементи, виконує нативні взаємодії операційної системи та створює процеси рендерингу на веб-сторінках. Додаток Electron може мати лише один головний процес.

Основний сценарій може виглядати наступним чином:

```javascript fiddle='docs/fiddles/quick-start'
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Що відбувається зверху?

1. Лінія 1: По-перше, Ви імпортуєте модуль `додаток` та `BrowserWindow` пакету `electron` , щоб мати можливість керувати подіями життєвого циклу додатку, як і створювати і керувати вікнами браузера.
2. Line 3: After that, you define a function that creates a [new browser window](../api/browser-window.md#new-browserwindowoptions) with node integration enabled, loads `index.html` file into this window (line 12, we will discuss the file later).
3. Line 15: You create a new browser window by invoking the `createWindow` function once the Electron application [is initialized](../api/app.md#appwhenready).
4. Line 17: You add a new listener that tries to quit the application when it no longer has any open windows. Цей слухач не є операційною системою через поведінку управління вікном [операційною системою](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Line 23: You add a new listener that creates a new browser window only if when the application has no visible windows after being activated. Наприклад, після запуску програми в перший раз, або повторного запуску вже запущених додатків.

#### Створити веб-сторінку

Це веб-сторінка, яку ви бажаєте відобразити після ініціалізації програми. Ця веб-сторінка являє собою процес рендерингу. Ви можете створити кілька вікон браузера, де кожне вікно використовує свій незалежний рендер. Кожне вікно може бути надано з повним доступом до Node.js API через налаштування `nodeIntegration`.

Сторінка `index.html` виглядає наступним чином:

```html fiddle='docs/fiddles/quick-start'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body style="background: white;">
    <h1>Hello World!</h1>
    <p>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
    </p>
</body>
</html>
```

#### Змініть ваш файл package.json

Ваш додаток Electron використовує файл `package.json` в якості основної точки запису (як будь-який інший Node.js додаток). Основним скриптом вашого застосунку є `main.js`, тому змініть файл `package.json` відповідно:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js"
}
```

> ПРИМІТКА: якщо `основне` поле пропущене, Electron спробує завантажити `індекс. s` файл з папки, що містить `package.json`.

> NOTE: The `author` and `description` fields are required for packaging, otherwise error will occur when running `npm run make`.

За замовчуванням, команда `npm start` запустить основний скрипт з Node.js. Щоб запустити скрипт з Electron, вам потрібно змінити його таким чином:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "author": "your name",
    "description": "My Electron app",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Запустити програму

```sh
npm початок
```

Ваш запущений додаток Electron повинен виглядати наступним чином:

![Проста програма Electron](../images/simplest-electron-app.png)

### Пакунок та розповсюдження додатка

Найпростіший і найшвидший спосіб розповсюдити новий застосунок використовує [Electron Forge](https://www.electronforge.io).

1. Імпортувати Electron Forge до папки застосунків:

    ```sh
    npx @electron-forge/cli import

    ✔ Перевірка своєї системи
    ✔ Ініціалізація Git репозиторія
    ✔ Створення модифікованого пакету. файл сина
    ✔ Встановлення залежностей
    ✔ Запис оновленого пакету. файл сина
    ✔ Виправлення . itignore

    Ми маємо ATTEMPTED для перетворення додатку в формат його electron-forge understands.

    Дякуємо за використання "electron-forge"!!!
    ```

1. Створити розподілю:

    ```sh
    npm запускає

    > my-gsod-electron-app@1.0. створити /my-electron-app
    > electron-forge make

    ✔ Перевірка своєї системи
    ✔ Вирішення Forge Config
    Нам потрібно упакувати свій додаток, перш ніж ми зможемо зробити його
    ✔ Підготовка до пакунку для архів: x64
    ✔ Підготовка до власних залежностей
    ✔ Пакування додатка
    Making для наступного завдання:
    важка y_check_mark: Making для цілі - Розробка для цілі: * * * * * * * *
    ```

    Electron-forge creates the `out` folder where your package will be located:

    ```plain
    // Зразок для MacOS
    out/
    ── out/make/zip/darwin/x64/my-electron-app-dar-win-x64-1.0.zip
    _PARAM3_ _PARAM3_ ...
    Натомість модифікаціями out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Вивчення основ

Цей розділ веде вас через основи роботи Electron під капою. Вона спрямована на зміцнення знань про Electron та програму, створену раніше в розділі Quickstart.

### Архітектура програм

Електрон складається з трьох основних стовпів:

* **Chromium** для відображення веб-вмісту.
* **Node.js** для роботи з локальною файловою системою та операційною системою.
* **Користувальницькі API** для роботи з часто необхідними ОС нативними функціями.

Розробка програми з Electron схожа на створення додатка Node.js за допомогою веб-інтерфейсу або створення веб-сторінок з безшовною інтеграцією Node.js.

#### Головний та Рендерний процеси

Як було сказано раніше, Electron має два типи процесів: Main і Renderer.

* Головний процес **створює** веб-сторінки, створюючи `BrowserWindow` екземпляри. Кожен `BrowserWindow` екземпляр виконує веб-сторінку в процесі рендерингу. Коли `BrowserWindow` екземпляр знищено, відповідний процес рендеру також припиняється.
* Головний процес **керує** всіма веб-сторінками і їхніми відповідними процесами рендерера.

----

* Процес рендерингу **керує лише** відповідною веб-сторінкою. Крах в одному процесі рендерингу не впливає на інші процеси рендерингу.
* Процес рендерингу **з'єднує** з основним процесом через IPC для виконання операцій з GUI на веб-сторінці. Виклик API, пов'язаних з рідним GUI, безпосередньо з процесу рендерингу, обмежений через проблеми безпеки та випадкові витоки ресурсів.

----

Зв'язок між процесами можливий через модулі взаємодії між процесами (IPC: [`ipcMain`](../api/ipc-main.md) та [`ipcRenderer`](../api/ipc-renderer.md).

#### ОЗ

##### Electron API

API Electron призначені на основі процесу типу, означає, що деякі модулі можна використовувати з процесу Головного, або Рендеререрингу, а деякі з обидвох модулів. API документація Electron вказує, з якого процесу можна використовувати кожен модуль.

Наприклад, щоб отримати доступ до Electron API в обох процесах, потрібен його включений модуль:

```js
const electron = require('electron')
```

Щоб створити вікно, зателефонуйте до класу `BrowserWindow` , який доступний лише в головному процесі:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Для виклику Головного процесу з Рендера, скористайтеся модулем IPC:

```js
// В головному процесі
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... виконувати дії від імені виробника
})
```

```js
// В процесі рендерингу
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> ПРИМІТКА: оскільки процеси рендеру можуть вести ненадійний код (особливо з третіх сторінок), важливо ретельно перевіряти запити, які приходять до основного процесу.

##### Node.js API

> ПРИМІТКА: для доступу до API Node.js з процесу Renderer, необхідно встановити `nodeIntegration` на вибір `true`.

Electron надає повний доступ до Node.js API та його модулів, як основний, так і процесам Renderer. Наприклад, ви можете прочитати всі файли з кореневої теки:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Щоб використовувати модуль Node.js, необхідно встановити його як залежність:

```sh
npm install --save aws-sdk
```

Потім, у вашому додатку Electron потрібен модуль:

```js
const S3 = require('aws-sdk/clients/s3')
```
