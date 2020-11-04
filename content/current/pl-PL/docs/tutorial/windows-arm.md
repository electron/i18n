# Windows 10 na ramieniu

Jeśli twoja aplikacja działa z Electron 6.0.8 lub później, możesz ją teraz zbudować dla Windows 10 na ręki. To znacznie poprawia wydajność, ale wymaga ponownego skompilowania wszelkich natywnych modułów używanych w Twojej aplikacji. Może to również wymagać drobnych napraw, aby twoje skrypty budowy i pakowania zostały stworzone.

## Uruchamianie podstawowej aplikacji
Jeśli twoja aplikacja nie używa żadnych natywnych modułów, to naprawdę łatwo jest utworzyć wersję Ramię twojej aplikacji.

1. Upewnij się, że katalog `node_modules` twojej aplikacji jest pusty.
2. Używając _wiersza poleceń_, uruchom `ustaw npm_config_arch=arm64` przed uruchomieniem `npm install`/`yarn install` jak zwykle.
3. [Jeśli Electron jest zainstalowany jako zależność deweloperska](quick-start.md#prerequisites), npm pobierze i rozpakuje wersję arm64. Następnie możesz spakować i rozpowszechniać swoją aplikację jak zwykle.

## Uwagi ogólne

### Kod specyficzny dla architektury

Wiele kodów specyficznych dla systemu Windows zawiera jeśli... inaczej logika, która wybiera pomiędzy architekturami x64 lub x86.

```js
if (process.arch === 'x64') {
  // Zrób 64-bitowe rzeczy...
} else {
  // Zrób 32-bitowe rzeczy...
}
```

Jeśli chcesz skierować do arm64, logika taka jak ta zazwyczaj wybierze złą architekturę, tak uważnie sprawdź swoją aplikację i stwórz skrypty pod kątem takich warunków. W niestandardowych skryptach budowy i pakowania powinieneś zawsze sprawdzać wartość `npm_config_arch` w środowisku, zamiast polegać na bieżącym łuku procesu.

### Moduły natywne
Jeśli używasz natywnych modułów, musisz się upewnić, że kompilują się one przeciwko v142 kompilatora MSVC (dostarczonego w Visual Studio 2017). Musisz również sprawdzić, czy wszystkie wstępnie zbudowane `.dll` lub `. ib` pliki dostarczone lub przywołane przez natywny moduł są dostępne dla Windows na Raminie.

### Testowanie aplikacji
Aby przetestować aplikację, użyj systemu Windows na urządzeniu Arm z systemem Windows 10 (wersja 1903 lub późniejsza). Upewnij się, że skopiujesz aplikację do docelowego urządzenia - Piaskownica Chromium nie będzie działać poprawnie podczas ładowania aktywów aplikacji z lokalizacji sieciowej.

## Wymagania rozwojowe
### Node.js/node-gyp

[Node.js v12.9.0 lub nowsze jest zalecane.](https://nodejs.org/en/) Jeśli aktualizacja do nowej wersji Node jest niepożądana, zamiast tego możesz [zaktualizować kopię npm manualnie-gyp](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) do wersji 5. .2 lub później, który zawiera wymagane zmiany do kompilacji modułów natywnych dla ramienia.

### Visual Studio 2017
Visual Studio 2017 (dowolna edycja) jest wymagana do kompilacji natywnych modułów. Możesz pobrać społeczność programu Visual Studio 2017 poprzez program Microsoft [Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/). Po instalacji możesz dodać komponenty specyficzne dla Arm-, uruchamiając następujące polecenie z _Command Prompt_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includerecommended
```

#### Tworzenie polecenia kompilacji krzyżowej
Ustawienie `npm_config_arch=arm64` w środowisku tworzy poprawną arm64 `. Pliki bj` , ale standardowy _wiersz poleceń dewelopera dla VS 2017_ użyje linkera x64. Aby to naprawić:

1. Duplikuj skrót _x64_x86 Polecenie Cross Tools dla VS 2017_ (np. poprzez zlokalizowanie go w menu startowym, kliknij prawym przyciskiem myszy, wybierając _Otwórz lokalizację pliku_, kopiowanie i wklejanie) do dogodnego miejsca.
2. Kliknij prawym przyciskiem myszy na nowy skrót i wybierz _Właściwości_.
3. Zmień pole _Cel_ na `vcvarsamd64_arm64.bat` na końcu zamiast `vcvarsamd64_x86.bat`.

Jeśli wykonano pomyślnie, wiersz polecenia powinien wydrukować coś podobnego do tego przy starcie:

```bat
**********************************************************
** Visual Studio 2017 Command Prompt v15.9.15
** Copyright (c) Microsoft Corporation
**************************************************************************************************************************************
[vcvarsall.bat] Środowisko zainicjowane dla: 'x64_arm64'
```

Jeśli chcesz rozwinąć swoją aplikację bezpośrednio na urządzeniu Arm, podłącz `vcvarsx86_arm64. w` w _Target_ , aby kompilacja z emulsją x86 urządzenia mogła się zdarzyć.

### Powiązanie z poprawnym `node.lib`

Domyślnie `node-gyp` rozpakowuje nagłówki węzła Electrona i pobiera wersje x86 i x64 węzła `. ib` do `%APPDATA%\. \Local\node-gyp\Cache`, ale nie pobiera wersji arm64 ([poprawka dla tego jest w fazie rozwoju](https://github.com/nodejs/node-gyp/pull/1875). Aby to naprawić:

1. Pobierz arm64 `node.lib` z https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Przenieś go do `%APPDATA%\..\Local\ngyp\Cache\6.0.9\arm64\node.lib`

Zastąp `6.0.9` dla wersji, której używasz.


## Kompilacja modułów natywnych
Po ukończeniu wszystkiego, otwórz swój wiersz kompilacji i uruchom `ustaw npm_config_arch=arm64`. Następnie użyj `npm install` , aby zbudować swój projekt jak zwykle. Podobnie jak w przypadku kompilacji modułów x86, może być konieczne usunięcie `node_modules` , aby wymusić ponowną kompilację natywnych modułów, jeśli były wcześniej kompilowane dla innej architektury.

## Debugowanie natywnych modułów

Moduły debugowania natywnego mogą być wykonane z programu Visual Studio 2017 (działającego na twoim komputerze programistycznym) i odpowiedniego [zdalnego Debugera Visual Studio](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) działającego na urządzeniu docelowym. Do debugowania:

1. Uruchom aplikację `. xe` na urządzeniu docelowym przez _Wiersz poleceń_ (przekazanie `--inspect-brk` , aby wstrzymać go, zanim jakiekolwiek natywne moduły zostaną załadowane).
2. Uruchom Visual Studio 2017 na swoim komputerze.
3. Połącz się z urządzeniem docelowym, wybierając _Debugowania > Dołącz do procesu..._ i wprowadź adres IP urządzenia i numer portu wyświetlany przez narzędzie do zdalnego debugera Visual Studio.
4. Kliknij _Odśwież_ i wybierz [odpowiedni proces Electrona, aby dołączyć](../development/debug-instructions-windows.md).
5. Być może trzeba upewnić się, że wszystkie symbole modułów natywnych w aplikacji są poprawnie załadowane. Aby to skonfigurować, przejdź do _Debugowania > Opcje..._ w Visual Studio 2017 i dodaj foldery zawierające `. db` symbole pod _Debugowanie > Symbole_.
5. Po załączeniu, ustaw odpowiednie punkty wstrzymania i wznawiaj wykonanie JavaScript przy użyciu [narzędzi zdalnego Chrome dla węzła](debugging-main-process.md).

## Uzyskanie dodatkowej pomocy
Jeśli napotkasz problem z tą dokumentacją lub jeśli aplikacja działa po skompilowaniu dla x86, ale nie dla arm64, [utwórz problem](../development/issues.md) z "Windows on Arm" w tytule.
