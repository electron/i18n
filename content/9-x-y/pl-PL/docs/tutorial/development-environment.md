# Środowisko programistyczne

Tworzenie aplikacji Electron to zasadniczo programowanie Node.js. Aby dostosować twój system operacyjny do tworzenia aplikacji komputerowych w Electron, będziesz potrzebował tylko Node.js, npm, wybranego przez ciebie edytoru kodu i podstawowej znajomości obsługi wiersza poleceń twojego systemu operacyjnego.

## Konfigurowanie systemu macOS

> Electron wspiera macOS 10.10 (Yosemite) i nowsze wersje. Apple nie zezwala na uruchamianie systemu macOS na maszynie wirtualnej chyba że twój komputer jest już komputerem Apple, więc jeżeli będziesz potrzebował Mac'a, możesz użyć usługę w chmurzę, która wynajmuje dostęp do Mac'ów (np. [MacInCloud][macincloud], czy [xcloud](https://xcloud.me)).

Najpierw należy zainstalować najnowszą wersję programu Node.js. Zalecamy zainstalowanie najnowszej wersji `LTS` lub `Aktualnej` wersji. Odwiedź [stronę pobierania Node.js][node-download] i wybierz `instalator dla systemu macOS`. Homebrew jest dostępną opcją, ale nie rekomendujemy jej - wiele narzędzi będzie niekompatybilnych z tym, jak Homebrew instaluje Node.js.

Po pobraniu, włącz instalator i podążaj za jego wskazówkami.

Po zainstalowaniu, upewnij się, że wszystko działa tak jak trzeba. Znajdź aplikację `Terminal` systemu macOS w swoim folderze `/Aplikacje/Narzędzia` (lub poprzez wyszukanie słowa `Terminal` w Spotlight). Otwórz aplikację `Terminal` lub innego klienta wiersza poleceń wybranego przez siebie i sprawdź czy te dwie komendy: `node` i `npm`, są dostępne:

```sh
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

Jeśli oba polecenia wydrukowały numer wersji, wszystko jest ustawione! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Konfigurowanie systemu Windows

> Electron obsługuje Windows 7 i późniejsze wersje - próba rozwoju aplikacji Electron we wcześniejszych wersjach Windows nie zadziała. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

Najpierw należy zainstalować najnowszą wersję programu Node.js. Zalecamy zainstalowanie najnowszej wersji `LTS` lub `Aktualnej` wersji. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Po pobraniu, włącz instalator i podążaj za jego wskazówkami.

Na ekranie, który pozwala skonfigurować instalację, upewnij się, że wybierz węzeł `. s runtime`, `npm manager pakietów`i `Dodaj do PATH` opcje.

Po zainstalowaniu, upewnij się, że wszystko działa tak jak trzeba. Znajdź Windows PowerShell otwierając Menu Start i wpisując `PowerShell`. Otwórz w górę `PowerShell` lub innego klienta wiersza poleceń wybranego przez Ciebie i potwierdź, że zarówno `node` jak i `npm` są dostępne:

```powershell
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

Jeśli oba polecenia wydrukowały numer wersji, wszystko jest ustawione! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Konfigurowanie systemu Linux

> Ogólnie rzecz biorąc Electron obsługuje Ubuntu 12.04, Fedora 21, Debian 8 i nowsze.

Najpierw należy zainstalować najnowszą wersję programu Node.js. W zależności od dystrybucji systemu Linux kroki instalacji mogą się różnić. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

Używasz Linux, więc prawdopodobnie wiesz, jak obsługiwać klient wiersza poleceń. Otwórz swojego ulubionego klienta i potwierdź, że zarówno `węzeł` i `npm` są dostępne globalnie:

```sh
# Ta komenda powinna wypisać wersje Node.js
node -v

# Ta komenda powinna wypisać wersje npm
npm -v
```

Jeśli oba polecenia wydrukowały numer wersji, wszystko jest ustawione! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Dobry Edytor

Możemy zasugerować dwa darmowe i popularne edytory zbudowane na Electronie: [Atom][atom] od GitHuba i [Visual Studio Code][code] od Microsoftu. Oba świetnie obsługują JavaScript.

Jeśli jesteś jednym z wielu doświadczonych programistów wiesz, że praktycznie każdy IDE i edytor tekstu obsługuje dzisiaj JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
