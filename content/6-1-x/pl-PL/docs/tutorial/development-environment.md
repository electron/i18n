# Środowisko programistyczne

Tworzenie aplikacji Electron to zasadniczo programowanie Node.js. Aby dostosować twój system operacyjny do tworzenia aplikacji komputerowych w Electron, będziesz potrzebował tylko Node.js, npm, wybranego przez ciebie edytoru kodu i podstawowej znajomości obsługi wiersza poleceń twojego systemu operacyjnego.

## Konfigurowanie systemu macOS

> Electron wspiera macOS 10.10 (Yosemite) i nowsze wersje. Apple nie zezwala na uruchamianie systemu macOS na maszynie wirtualnej chyba że twój komputer jest już komputerem Apple, więc jeżeli będziesz potrzebował Mac'a, możesz użyć usługę w chmurzę, która wynajmuje dostęp do Mac'ów (np. [MacInCloud](https://www.macincloud.com/), czy [xcloud](https://xcloud.me)).

Najpierw należy zainstalować najnowszą wersję programu Node.js. Zalecamy zainstalowanie najnowszej wersji `LTS` lub `Aktualnej` wersji. Odwiedź [stronę pobierania Node.js](https://nodejs.org/en/download/) i wybierz `instalator dla systemu macOS`. Homebrew jest dostępną opcją, ale nie rekomendujemy jej - wiele narzędzi będzie niekompatybilnych z tym, jak Homebrew instaluje Node.js.

Po pobraniu, włącz instalator i podążaj za jego wskazówkami.

Po zainstalowaniu, upewnij się, że wszystko działa tak jak trzeba. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Konfigurowanie systemu Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Najpierw należy zainstalować najnowszą wersję programu Node.js. Zalecamy zainstalowanie najnowszej wersji `LTS` lub `Aktualnej` wersji. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Po pobraniu, włącz instalator i podążaj za jego wskazówkami.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Po zainstalowaniu, upewnij się, że wszystko działa tak jak trzeba. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Konfigurowanie systemu Linux

> Ogólnie rzecz biorąc Electron obsługuje Ubuntu 12.04, Fedora 21, Debian 8 i nowsze.

Najpierw należy zainstalować najnowszą wersję programu Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Dobry Edytor

Możemy zasugerować dwa darmowe i popularne edytory zbudowane na Electronie: [Atom](https://atom.io/) od GitHuba i [Visual Studio Code](https://code.visualstudio.com/) od Microsoftu. Oba świetnie obsługują JavaScript.

Jeśli jesteś jednym z wielu doświadczonych programistów wiesz, że praktycznie każdy IDE i edytor tekstu obsługuje dzisiaj JavaScript.
