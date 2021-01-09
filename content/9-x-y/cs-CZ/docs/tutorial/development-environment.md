# Vývojářské prostředí

Vývoj elektronových aplikací je v podstatě vývoj v Node.js. Aby se váš operační systém změnil v prostředí schopné vytvářet stolní aplikace pomocí Electronu, budete pouze potřebovat Node. , npm, editor kódu dle vašeho výběru a základní pochopení klienta příkazové řádky vašeho operačního systému.

## Nastavení pro macOS

> Electron podporuje macOS 10.10 (Yosemite) a vyšší. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud][macincloud] or [xcloud](https://xcloud.me)).

Nejprve nainstalujte nejnovější verzi Node.js. Doporučujeme nainstalovat buď nejnovější `LTS` nebo `aktuální` verzi, která je k dispozici. Visit [the Node.js download page][node-download] and select the `macOS Installer`. Zatímco Homebrew je nabízená možnost, ale doporučujeme proti ní - mnoho nástrojů nebude kompatibilní se způsobem, jakým Homebrew instaluje Node.js.

Po stažení spusťte instalační program a nechte vás Průvodce instalací prostřednictvím instalace.

Po instalaci potvrďte, že vše funguje podle očekávání. Najděte macOS `Terminál` aplikaci ve složce `/Applications/Utilities` (nebo hledáním slova `Terminálu` ve Spotlight). Otevřete `Terminál` nebo jiný klient příkazové řádky dle vašeho výběru a potvrďte, že jsou k dispozici `uzel` a `npm`:

```sh
# Tento příkaz by měl vytisknout verzi Node.js
uzel -v

# Tento příkaz by měl vytisknout verzi npm
npm -v
```

Pokud oba příkazy vytisknou číslo verze, jsou všechny nastaveny! Než začnete , možná budete chtít nainstalovat [editor kódu](#a-good-editor) vhodný pro vývoj JavaScriptu.

## Nastavení pro Windows

> Electron podporuje Windows 7 a novější verze – pokus o vývoj aplikací Electron na starších verzích Windows nebude fungovat. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

Nejprve nainstalujte nejnovější verzi Node.js. Doporučujeme nainstalovat buď nejnovější `LTS` nebo `aktuální` verzi, která je k dispozici. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Po stažení spusťte instalační program a nechte vás Průvodce instalací prostřednictvím instalace.

Na obrazovce, která vám umožňuje nakonfigurovat instalaci, se ujistěte, že vyberte `Node. s runtime`, `npm správce balíčků`, a `Přidat do PATH` .

Po instalaci potvrďte, že vše funguje podle očekávání. Najděte Windows PowerShell otevřením Menu Start a psaním `PowerShell`. Otevřete nahoru `PowerShell` nebo jiný klient příkazové řádky dle vašeho výběru a potvrďte, že jsou k dispozici `uzel` a `npm`:

```powershell
# Tento příkaz by měl vytisknout verzi Node.js
uzel -v

# Tento příkaz by měl vytisknout verzi npm
npm -v
```

Pokud oba příkazy vytisknou číslo verze, jsou všechny nastaveny! Než začnete , možná budete chtít nainstalovat [editor kódu](#a-good-editor) vhodný pro vývoj JavaScriptu.

## Nastavení pro Linux

> Electron obecně podporuje Ubuntu 12.04, Fedora 21, Debian 8 a novější.

Nejprve nainstalujte nejnovější verzi Node.js. V závislosti na vaší distribuci Linuxu se mohou instalační kroky lišit. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

Běžíte na Linux, takže už pravděpodobně víte, jak pracovat s příkazovou řádkou klientem. Otevřete svého oblíbeného klienta a potvrďte, že `uzel` a `npm` jsou dostupné globálně:

```sh
# Tento příkaz by měl vytisknout verzi Node.js
uzel -v

# Tento příkaz by měl vytisknout verzi npm
npm -v
```

Pokud oba příkazy vytisknou číslo verze, jsou všechny nastaveny! Než začnete , možná budete chtít nainstalovat [editor kódu](#a-good-editor) vhodný pro vývoj JavaScriptu.

## Dobrý editor

We might suggest two free popular editors built in Electron: GitHub's [Atom][atom] and Microsoft's [Visual Studio Code][code]. Oba mají vynikající podporu JavaScriptu.

Pokud jste jedním z mnoha vývojářů se silnou preferencí, víte, že prakticky všechny editory kódu a IDEs v těchto dnech podporují JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
