# Podpora Electronu

## Hledání podpory

Pokud máte obavy o bezpečnost, navštivte prosím [bezpečnostní dokument](https://github.com/electron/electron/tree/master/SECURITY.md).

Pokud hledáte pomoc při programování, pro odpovědi na otázky, nebo se připojit k diskuzi s ostatními vývojáři, kteří používají Electron, můžete komunikovat s komunitou na těchto místech:
- [`elektroron`](https://discuss.atom.io/c/electron) kategorie na Atom fórech
- `#atom-shell` kanál na Freenode
- `#electron` kanál na [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`elektron-ru`](https://telegram.me/electron_ru) *(Rusko)*
- [`elektron-br`](https://electron-br.slack.com) *(Brazilské portugalštiny)*
- [`elektron-kr`](https://electron-kr.github.io/electron-kr) *(korejský)*
- [`elektron-jp`](https://electron-jp.slack.com) *(Japonsko)*
- [`elektron-tr`](https://electron-tr.herokuapp.com) *(turečtina)*
- [`elektron-id`](https://electron-id.slack.com) *(Indonésie)*
- [`elektron-pl`](https://electronpl.github.io) *(Polsko)*

Pokud chcete přispět do Electronu, podívejte se na [přispívající dokument](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Pokud jste našli chybu v [podporované verzi](#supported-versions) Electronu, ji prosím nahlaste pomocí [systému úkolů](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) je komunitně vedený seznam užitečných příkladů aplikací, nástrojů a zdrojů.

## Podporované verze

Poslední tři *stabilní* hlavní verze jsou podporovány týmem Electron. For example, if the latest release is 6.x.y, then the 5.x.y as well as the 4.x.y series are supported.

Poslední stabilní vydání jednostranně přijímá všechny opravy od `master`, a verze před tím, než obdrží převážnou většinu těchto opravných položek , jak je čas a šířka pásma zárukou. Nejstarší podporovaný release řádek obdrží pouze opravy zabezpečení.

Všechny podporované řádky release budou přijímat externí požadavky na natažení pro backport oprav dříve sloučené s `master`, i když to může být případ od případu u některých starších podporovaných tratí. Všechna napadená rozhodnutí týkající se zpětné vazby k vydání vyřeší pracovní skupina [uvolňuje](https://github.com/electron/governance/tree/master/wg-releases) jako bod pořadu jednání na jejich týdenním zasedání v týdnu, kdy je podklad PR zvýšen.

### Aktuálně podporované verze
- 8.x.y
- 7.x.y
- 6.x.y

### Konec životnosti

Jakmile uvolněná větev dosáhne konce svého podpůrného cyklu, série bude v NPM zastaralá a konečné vydání na konci podpory bude učiněno . Toto vydání přidá upozornění, že používá nepodporovanou verzi Electronu.

Tyto kroky pomáhají vývojářům aplikací naučit se, když větev používá, přestane být podporovaná, ale aniž by byli příliš rušiví pro koncové uživatele.

Pokud má žádost výjimečné okolnosti a musí zůstat v nepodporované sérii elektřiny, vývojáři mohou umlčet varování na konci podpory vynecháním konečného vydání z balíčku `. syn` `devDependencies`. Například od doby, kdy série 1-6-x skončila podporou 1.6. 8 vydání, vývojáři by mohli zvolit zůstat v sérii 1-6-x bez varování s `devDependency` z `"electron": 1. .0 - 1.6.17`.

## Podporované platformy

Následující platformy jsou podporovány Electronem:

### macOS

Pro macOS jsou k dispozici pouze 64bitové binární soubory a minimální podporovaná macOS verze je macOS 10.10 (Yosemite).

### Windows

Windows 7 a novější jsou podporovány, starší operační systémy nejsou podporovány (a nefungují).

Pro systém `ia32` (`x86`) a `x64` (`amd64`jsou k dispozici binární soubory. [Electron 6.0.8 a později přidejte podporu pro Windows on Arm (`arm64`) zařízení](windows-arm.md). Spuštěné aplikace zabalené s předchozími verzemi jsou možné pomocí binárního souboru ia32.

### Linux

Předpostavené binárky `ia32` (`i686`a `x64` (`amd64`) jsou postaveny na Ubuntu 12. 4 binární soubor `armv7l` je postaven proti ARM v7 s hard-float ABI a NEON pro Debian Wheezy.

[Until the release of Electron 2.0][arm-breaking-change], Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Oba binární soubory jsou totožné.

Zda předpostavený binární soubor může běžet na distribuci, závisí na tom, zda distribuce obsahuje knihovny, ke kterým je Electron připojen na platformě budovy , tak pouze Ubuntu 12. 4 má zaručeno fungování, ale následující platformy jsou také ověřeny, aby mohly spustit předpostavené binární soubory Electronu:

* Ubuntu 12.04 a novější
* Fedora 21
* Debian 8

[arm-breaking-change]: ../breaking-changes.md#duplicate-arm-assets
