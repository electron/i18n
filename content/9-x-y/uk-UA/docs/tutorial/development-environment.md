# Середовище розробника

Розробка Electron це, по суті, розробка Node.js. Щоб перетворити вашу операційну систему в середовище, здатне створювати настільні програми за допомогою Electron, вам знадобляться лише Node.js, npm, редактор коду на ваш вибір і елементарне розуміння клієнта командного рядка вашої операційної системи.

## Налаштовування в macOS

> Electron підтримує macOS 10.10 (Yosemite) та вище. Apple не дозволяє запуск macOS у віртуальній машині, якщо головний комп'ютер не є комп'ютером Apple. Тож, якщо вам потрібен Mac, подумайте про використання хмарної служби, яка надає доступ до Mac (такої як [MacInCloud][macincloud] чи [xcloud](https://xcloud.me)).

Спочатку встановіть останню версію Node.js. Ми рекомендуємо встановити останню версію `LTS` або `поточну` доступну версію. Відвідайте [сторінку для завантажень Node.js][node-download] та оберіть `встановлювач macOS`. Хоча Homebrew є пропонованим, але ми не рекомендуємо - багато інструментів будуть несумісними з функціями встановлення Homebrew Node.js.

Після завершення завантаження, запустіть встановлювач та дозвольте майстру встановлення пройти через встановлення.

Після встановлення, підтвердіть, що все працює, як очікувалося. Знайдіть додаток macOS `Термінал` в вашій папці `/Applications/Utilities` (або за допомогою пошуку слово `Термінал` в Spotlight). Відкрийте `термінал` або інший командний клієнт на вибір і підтвердіть, що обидва `вузол` і `npm` доступні:

```sh
# Ця команда повинна вивести версію Node.js
node -v

# Ця команда повинна вивести версію npm
npm -v
```

Якщо обидва команди надрукували номер версії, то все готово! Перед початком роботи ви можете встановити [редактор коду](#a-good-editor) для розвитку JavaScript.

## Налаштовування Windows

> Electron підтримує Windows 7 і вище - спроби розробки програм Electron на старіших версіях не увінчаються успіхом. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

Спочатку встановіть останню версію Node.js. Ми рекомендуємо встановити останню версію `LTS` або `поточну` доступну версію. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Після завершення завантаження, запустіть встановлювач та дозвольте майстру встановлення пройти через встановлення.

На екрані, яке дозволяє налаштувати установку, переконайтеся, що виберіть `Ні. s runtime`, `npm менеджер`і `Додати до PATH` параметри.

Після встановлення, підтвердіть, що все працює, як очікувалося. Віднайди Windows PowerShell відкривши Пуск і надрукувавши `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Ця команда повинна вивести версію Node.js
node -v

# Ця команда повинна вивести версію npm
npm -v
```

Якщо обидва команди надрукували номер версії, то все готово! Перед початком роботи ви можете встановити [редактор коду](#a-good-editor) для розвитку JavaScript.

## Налаштовування Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Спочатку встановіть останню версію Node.js. Залежно від вашого дистрибутива , встановлення може відрізнятися. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

Ви використовуєте Linux, тому, ви, швидше за все, знаєте, як працювати з командним рядком клієнтом. Відкрийте улюблений клієнт і підтвердіть, що і `вузол` і `npm` доступні глобально:

```sh
# Ця команда повинна вивести версію Node.js
node -v

# Ця команда повинна вивести версію npm
npm -v
```

Якщо обидва команди надрукували номер версії, то все готово! Перед початком роботи ви можете встановити [редактор коду](#a-good-editor) для розвитку JavaScript.

## Гарний редактор

Найкраще підійдуть два популярних редактори: [Atom][atom] від GitHub та [VS Code][code] від Microsoft. Обидва мають чудову підтримку JavaScript.

Якщо ви вже звикли до якогось редактора чи IDE - знайте, що практично всі редактори коду та IDE в наші дні підтримують JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
