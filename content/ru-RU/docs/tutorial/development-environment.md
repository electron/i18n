# Среда разработчика

Разработка на Electron, по сути, является разработкой на Node.js. Что бы превратить вашу операционную систему в окружение для создания Electron приложений, вам необходим Node.js, npm, любой редактор кода, и базовые знания работы с командной строкой вашей системы.

## Настройка macOS

> Electon поддерживает Mac Os 10.10 (Yosemite) и выше. Обычно компания Apple не позволяет запускать macOS на виртуальных машинах если ваш компьютер не является компьютером Apple. Если вам необходим Mac вы можете найти инструкции в сети как запустить MacOS в виртуальной машине или использовать облачные сервисы, которые позволяют получить доступ к компьютерам на MacOS (например [MacInCloud](https://www.macincloud.com/) или [xcloud](https://xcloud.me)).

Первым делом нужно установить последнюю версию Node.js. Мы рекомендуем устанавливать последнюю `LTS` или `текущую` доступную версию. Посетите [страницу загрузки Node.js](https://nodejs.org/en/download/) и выберите `macOS установщик`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Эта команда должны вывести текущую версию Node.js
node -v

# Эта команда должны вывести текущую версию npm
npm -v
```

Если после выполнения команд выше, вы увидели версию Node.js и npm, то все готово! Перед тем, как начать, было бы неплохо установить [редактор кода](#a-good-editor), подходящий для разработки на JavaScript.

## Настройка Windows

> Electron поддерживает Windows 7 и выше - разрабатывать Electron приложения на предыдущих версиях Windows не получиться. Microsoft бесплатно предоставляют [виртуальные машины с Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) для разработчиков.

Первым делом нужно установить последнюю версию Node.js. Мы рекомендуем устанавливать последнюю `LTS` или `текущую` доступную версию. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Эта команда должны вывести текущую версию Node.js
node -v

# Эта команда должны вывести текущую версию npm
npm -v
```

Если после выполнения команд выше, вы увидели версию Node.js и npm, то все готово! Перед тем, как начать, было бы неплохо установить [редактор кода](#a-good-editor), подходящий для разработки на JavaScript.

## Настройка Linux

> В целом, Electron поддерживает Ubuntu 12.04, Fedora 21, Debian 8 и более поздние версии.

Первым делом нужно установить последнюю версию Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# Эта команда должны вывести текущую версию Node.js
node -v

# Эта команда должны вывести текущую версию npm
npm -v
```

Если после выполнения команд выше, вы увидели версию Node.js и npm, то все готово! Перед тем, как начать, было бы неплохо установить [редактор кода](#a-good-editor), подходящий для разработки на JavaScript.

## Хороший редактор кода

Мы предлагаем вам выбрать один из двух популярных редакторов: [Atom](https://atom.io/) и Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Оба идеальны для JavaScript.

Если вы являетесь одним из многих разработчиков с "повышенными требованиями", то знайте, что в наши дни практически все редакторы кода и IDE поддерживают JavaScript.