# Середовище розробника

Розробка Electron це, по суті, розробка Node.js. Щоб перетворити вашу операційну систему в середовище, здатне створювати настільні програми за допомогою Electron, вам знадобляться лише Node.js, npm, редактор коду на ваш вибір і елементарне розуміння клієнта командного рядка вашої операційної системи.

## Налаштовування в macOS

> Electron підтримує macOS 10.10 (Yosemite) та вище. Apple не дозволяє запуск macOS у віртуальній машині, якщо головний комп'ютер не є комп'ютером Apple. Тож, якщо вам потрібен Mac, подумайте про використання хмарної служби, яка надає доступ до Mac (такої як [MacInCloud](https://www.macincloud.com/) чи [xcloud](https://xcloud.me)).

Спочатку встановіть останню версію Node.js. Ми рекомендуємо встановити останню версію `LTS` або `поточну` доступну версію. Відвідайте [сторінку для завантажень Node.js](https://nodejs.org/en/download/) та оберіть `встановлювач macOS`. Хоча Homebrew є пропонованим, але ми не рекомендуємо - багато інструментів будуть несумісними з функціями встановлення Homebrew Node.js.

Після завершення завантаження, запустіть встановлювач та дозвольте майстру встановлення пройти через встановлення.

Після встановлення, підтвердіть, що все працює, як очікувалося. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Налаштовування Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Спочатку встановіть останню версію Node.js. Ми рекомендуємо встановити останню версію `LTS` або `поточну` доступну версію. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Після завершення завантаження, запустіть встановлювач та дозвольте майстру встановлення пройти через встановлення.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Після встановлення, підтвердіть, що все працює, як очікувалося. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Налаштовування Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Спочатку встановіть останню версію Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## A Good Editor

Найкраще підійдуть два популярних редактори: [Atom](https://atom.io/) від GitHub та [VS Code](https://code.visualstudio.com/) від Microsoft. Обидва мають чудову підтримку JavaScript.

Якщо ви вже звикли до якогось редактора чи IDE - знайте, що практично всі редактори коду та IDE в наші дні підтримують JavaScript.
