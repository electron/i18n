# Wsparcie Electron'a

## Znalezienie wsparcia

If you have a security concern, please see the [security document](../../SECURITY.md).

Jeśli szukasz pomocy programowania, odpowiedzi na pytania, lub dołączysz do dyskusji z innymi programistami, którzy korzystają z Electrona, możesz współdziałać ze społecznością w tych lokalizacjach:
- [`elektron`](https://discuss.atom.io/c/electron) kategoria na forum Atom
- `#atom-shell` kanał na Freenode
- `#electron` kanał na [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(rosyjski)*
- [`electron-br`](https://electron-br.slack.com) *(brazylijski portugalski)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(koreański)*
- [`electron-jp`](https://electron-jp.slack.com) *(japoński)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(turecki)*
- [`electron-id`](https://electron-id.slack.com) *(Indonezja)*
- [`electron-id`](https://electronpl.github.io) *(Indonezja)*

If you'd like to contribute to Electron, see the [contributing document](../../CONTRIBUTING.md).

Jeśli znalazłeś błąd w [obsługiwanej wersji](#supported-versions) Electron, zgłoś go za pomocą [trackera problemów](../development/issues.md).

[niesamowity elektron](https://github.com/sindresorhus/awesome-electron) jest obsługiwaną przez społeczność listą przydatnych przykładowych aplikacji, narzędzi i zasobów.

## Wspierane wersje

Najnowsze trzy *stabilne* wersje są obsługiwane przez zespół Electron. For example, if the latest release is 6.x.y, then the 5.x.y as well as the 4.x.y series are supported.

Najnowsze stabilne wydanie jednostronnie otrzymuje wszystkie poprawki od `mastera`, i wersja poprzedzająca otrzymają zdecydowaną większość z tych poprawek jako czas i szerokość pasma. Najstarszy wiersz wydania otrzyma tylko poprawki bezpieczeństwa.

Wszystkie obsługiwane linie wydania zaakceptują zewnętrzne żądania ściągnięcia do backportu poprawki uprzednio scalone do `master`, aczkolwiek może to odbywać się indywidualnie dla każdego przypadku dla niektórych starszych, obsługiwanych linii. Wszystkie sporne decyzje dotyczące wydania tła linii zostaną rozstrzygnięte przez [Grupę Roboczą ds. Wydań](https://github.com/electron/governance/tree/master/wg-releases) jako punkt porządku obrad podczas cotygodniowego posiedzenia, w którym podnosi się wsparcie PR .

### Aktualnie wspierane wersje
- 7.x.y
- 6.x.y
- 5.x.y

### EOL

Kiedy oddział zwolniony osiągnie koniec swojego cyklu wsparcia, seria zostanie przestarzała w NPM i zostanie zakończona wersja końca wsparcia . Ta wersja doda ostrzeżenie, że nieobsługiwana wersja Electron jest w użyciu.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

Jeśli aplikacja ma wyjątkowe okoliczności i musi pozostać na nieobsługiwanej serii Electron, deweloperzy mogą ciszyć ostrzeżenie końca wsparcia, pomijając ostateczną wersję pakietu `aplikacji. syn` `zależności devDeZależności`. Na przykład, ponieważ seria 1-6-x zakończyła się koniec wsparcia 1.6. 8 zwolnienie, deweloperzy mogliby wybrać pozostać w serii 1-6 x bez ostrzeżeń o `devDependency` z `"electron": 1. .0 - 1.6.17`.

## Wspierane Platformy

Następujące platformy są obsługiwane przez Electron:

### macOS

Tylko 64bitowe pliki binarne są dostępne dla macOS, a minimalna wersja macOS jest obsługiwana macOS 10.10 (Yosemite).

### Windows

Windows 7 i nowsze są obsługiwane, starsze systemy operacyjne nie są obsługiwane (i nie działają).

Zarówno `ia32` (`x86`) i `x64` (`amd64`) pliki binarne są dostępne dla Windows. [Electron 6.0.8 i później dodaj natywne wsparcie dla Windows na uzbrojeniu (`arm64`) urządzeń](windows-arm.md). Uruchamianie aplikacji spakowanych z poprzednimi wersjami jest możliwe przy użyciu binarnego ia32.

### Linux

Wstępnie zbudowane `ia32` (`i686`) i `x64` (`amd64`) pliki binarne Electron są zbudowane na Ubuntu 12. 4, plik binarny `armv7l` jest zbudowany przeciwko ARM v7 z hard-float ABI i NEON dla Debian Wheezy.

[Aż do wydania Electrona 2.0][arm-breaking-change] Electron będzie również kontynuował wydanie pliku binarnego dla `armv7l` z przyrostek `arm`. Oba pliki binarne są identyczne.

To, czy wstępnie zbudowany plik binarny może działać na dystrybucji, zależy od tego, czy dystrybucja zawiera biblioteki, z którymi Electron jest połączona na platformie , tak tylko Ubuntu 12. 4 ma gwarancję, że działa, ale następujące platformy są również weryfikowane, aby móc obsługiwać wstępnie wybudowane binary Electrona:

* Ubuntu 12.04 i nowsze
* Fedora 21
* Debian 8

[arm-breaking-change]: https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets
