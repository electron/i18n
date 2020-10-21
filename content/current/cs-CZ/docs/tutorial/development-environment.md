# Vývojářské prostředí

Vývoj elektronových aplikací je v podstatě vývoj v Node.js. Aby se váš operační systém změnil v prostředí schopné vytvářet stolní aplikace pomocí Electronu, budete pouze potřebovat Node. , npm, editor kódu dle vašeho výběru a základní pochopení klienta příkazové řádky vašeho operačního systému.

## Nastavení pro macOS

> Electron podporuje macOS 10.10 (Yosemite) a vyšší. Apple neumožňuje spuštění macOS ve virtuálních zařízeních, pokud počítač není již počítačem Apple, takže pokud potřebujete Mac, zvažte pomocí cloudové služby, která pronajímá přístup k Macům (jako [MacInCloud](https://www.macincloud.com/) nebo [xcloud](https://xcloud.me)).

Nejprve nainstalujte nejnovější verzi Node.js. Doporučujeme nainstalovat buď nejnovější `LTS` nebo `aktuální` verzi, která je k dispozici. Navštivte [stránku stažení Node.js](https://nodejs.org/en/download/) a vyberte `macOS Installer`. Zatímco Homebrew je nabízená možnost, ale doporučujeme proti ní - mnoho nástrojů nebude kompatibilní se způsobem, jakým Homebrew instaluje Node.js.

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

> Electron podporuje Windows 7 a novější verze – pokus o vývoj aplikací Electron na starších verzích Windows nebude fungovat. Microsoft nabízí zdarma [virtuálních počítačových obrázků s Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) pro vývojáře.

Nejprve nainstalujte nejnovější verzi Node.js. Doporučujeme nainstalovat buď nejnovější `LTS` nebo `aktuální` verzi, která je k dispozici. Navštivte [stránku stažení Node.js](https://nodejs.org/en/download/) a vyberte `Instalátor Windows`. Po stažení spusťte instalační program a nechte vás Průvodce instalací prostřednictvím instalace.

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

Nejprve nainstalujte nejnovější verzi Node.js. V závislosti na vaší distribuci Linuxu se mohou instalační kroky lišit. Předpokládejme, že normálně instalujete software pomocí správce balíčků jako `apt` nebo `pacman`, použít úředníka [Node. s pokyny pro instalaci na Linux](https://nodejs.org/en/download/package-manager/).

Běžíte na Linux, takže už pravděpodobně víte, jak pracovat s příkazovou řádkou klientem. Otevřete svého oblíbeného klienta a potvrďte, že `uzel` a `npm` jsou dostupné globálně:

```sh
# Tento příkaz by měl vytisknout verzi Node.js
uzel -v

# Tento příkaz by měl vytisknout verzi npm
npm -v
```

Pokud oba příkazy vytisknou číslo verze, jsou všechny nastaveny! Než začnete , možná budete chtít nainstalovat [editor kódu](#a-good-editor) vhodný pro vývoj JavaScriptu.

## Dobrý editor

Mohli bychom navrhnout dva populární editory vytvořené v Electronu: GitHub's [Atom](https://atom.io/) a [Visual Studio Code](https://code.visualstudio.com/) Microsoftu. Oba mají vynikající podporu JavaScriptu.

Pokud jste jedním z mnoha vývojářů se silnou preferencí, víte, že prakticky všechny editory kódu a IDEs v těchto dnech podporují JavaScript.
