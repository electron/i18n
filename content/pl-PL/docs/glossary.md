# Słownik

Ta strona definiuje terminy które są powszechnie używane w rozwoju Electron.

### ASAR

ASAR oznacza Atom Shell Archive Format (Format archiwizowania Atom Shell). Archiwum [asar](https://github.com/electron/asar) jest proste. Format archiwum podobny do formatu `tar`, który łączy pliki w jeden. Electron może odczytywać z niego dowolne pliki bez potrzeby rozpakowania archiwum.

Format ASAR został stworzony głównie aby zwiększyć wydajność w systemie Windows

### Brightray

Brightray [był](https://github.com/electron-archive/brightray) statyczną biblioteką, która ułatwiała używanie [libchromiumcontent](#libchromiumcontent) w aplikacjach. Jest ona aktualnie przestarzała i została włączona do bazy kodu Electron.

### CRT

Biblioteka C Run-time (CRT) jest częścią standardowej biblioteki C++, która zawiera standardową bibliotekę ISO C99. Wizualne biblioteki C++, które implementują CRT obsługują tworzenie kodu natywnego, jak i zarówno mieszanego natywnego i zarządzanego kodu oraz czysto zarządzanego kody dla developmentu .NET.

### DMG

Obraz dysku Apple jest to format pakowania używany przez macOS. Pliki DMG są powszechnie używane do dystrybucji "instalatorów" aplikacji. [electron-builder](https://github.com/electron-userland/electron-builder) wspiera `dmg` jako docelowy format kompilacji.

### Edytor IME

Edytor metod wprowadzania. Program, który umożliwia użytkownikom wprowadzanie znaków i symboli, których nie można odnaleźć na klawiaturze. Na przykład pozwala to na wprowadzanie znaków chińskich, japońskich, koreańskich i indyjskich.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC jest skrótem od Inter-Process Communication (Między-Procesowa Komunikacja). Electron używa IPC do wysyłania serializowanych wiadomości pomiędzy procesami [main](#main-process) i [renderer](#renderer-process).

### libchromiumcontent

Wspólna biblioteka zawierająca [moduł zawartości Chromium](https://www.chromium.org/developers/content-module) i wszystkie jego zależności (np., Blink, [V8](#v8), itp.). Również określane jako "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### główny proces

Proces główny, zazwyczaj plik nazwany `main.js`, jest punktem wejścia do każdej aplikacji Electron'u. Kontroluje życie aplikacji, od otwarcia do zamknięcia. To również zarządza natywnymi elementami takimi jak Menu, Pasek Menu, Dock, Tray, itd. Główny proces odpowiada za tworzenie każdego nowego procesu renderowania w aplikacji. Pełny Node API jest wbudowany.

Plik głównego procesu każdej aplikacji jest określony we właściwości `main` w `package.json`. W ten sposób `electron .` wie co należy wykonać podczas uruchamiania.

W Chromium proces ten jest określany jako "proces przeglądarki". W Electronie jego nazwa jest zmieniona by nie pomylić go z procesami renderowania.

Zobacz też: [process](#process), [renderer process](#renderer-process)

### MAS

Akronim od Apple Mac App Store. Szczegółowe informacje odnośnie przesyłania aplikacji do MAS znajdziesz w [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### natywne moduły

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Używane są głównie w celu zapewnienia interfejsu między uruchomionym w Node.js JavaScript s bibliotekami C/C++.

Natywne moduły Node są obsługiwane przez Electron, ale ponieważ Electron często używa innej wersji V8 od Node binary zainstalowanej na twoim systemie, musisz ręcznie określić lokalizację nagłówków Electronu podczas budowania modułów natywnych.

Zobacz również [Obsługa Natywnych Modułów Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System to skryptowe narzędzie autoryzacji instalacji dla Microsoft Windows. Jest wydany w połączeniu z darmowymi licencjami oprogramowania i jest szeroko stosowaną alternatywą dla komercyjnych zastrzeżonych produktów, takich jak InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) obsługuje NSIS jako docelowy format kompilacji.

### OSR

OSR (Off-screen rendering) może być używane do ładowania dużych stron w tle i wyświetlaniu ich po tym (będzie to znacznie szybsze). Pozwala to na renderowanie stron bez pokazywania ich na ekranie.

### przetwórz

Proces jest instancją programu komputerowego, który jest wykonywany. Electron aplikacje, która używają procesu [main](#main-process) i jednego lub wielu procesów [renderer](#renderer-process) to w rzeczywistości kilka programów uruchomionych jednocześnie.

W Node.js i Electron, każdy z uruchomionych procesów ma obiekt `process`. Ten obiekt jest globalny i zapewnia informacje o obecnym procesie oraz kontrolę nad nim. Jako globalny, jest on zawsze dostępny dla aplikacji bez użycia require().

Zobacz też: [główny proces](#main-process), [proces renderowania](#renderer-process)

### proces renderowania

Proces renderowania jest oknem przeglądarki w Twojej aplikacji. W przeciwieństwie do procesu głównego, tych procesów może być wiele i każdy z nich jest uruchomiony w osobnym procesie. Mogą one również zostać schowane.

W normalnych przeglądarkach, strony internetowe zazwyczaj są zazwyczaj uruchamiane w środowisku piaskownicy i nie posiadają dostępu do zasobów natywnych. Użytkownicy Electron mają jednak możliwość użycia interfejsów API Node.js na stronach internetowych, co pozwala na interakcje systemu operacyjnego na niższym poziomie.

Zobacz także: [proces](#process), [główny proces](#main-process)

### Squirrel

Squirrel to framework open source, który umożliwia aplikacjom Electron automatyczną aktualizację do nowszych wersji. Zobacz [autoUpdater](api/auto-updater.md) API w celu uzyskania informacji o obsłudze platformy Squirrel.

### strefa użytkownika

Ten termin pochodzi ze społeczności Unix, gdzie "userland" lub "userspace" określały programy działające poza jądrem systemu operacyjnego. Ostatnio termin ten został spopularyzowany wśród społeczności Node i npm dla rozróżnienia pomiędzy funkcjami dostępnymi w "Node core" oraz paczkach opublikowanych w rejestrze npm przez znacznie większą społeczność "user" (użytkowników).

Tak jak Node, Electron jest skupiony na posiadaniu małego zestawu interfejsów API, które zapewniają wszystkie niezbędne podstawy do tworzenia multi-platformowych aplikacji. Ta filozofia designu pozwala Electron'owi pozostać wszechstronnym narzędziem unikając zarazem nadmiernej normatywności odnośnie sposobu jego użycia. Userland umożliwia użytkownikom tworzenie i udostępnianie narzędzi zapewniających dodatkową funkcjonalność ponad to, co dostępne jest w "rdzeniu".

### V8

V8 to silnik JavaScript typu open source Google'a. Napisany jest w C++ i używany jedynie w Google Chrome. V8 może działać samodzielnie, lub być osadzony w dowolnej aplikacji C++.

Electron buduje V8 jako część Chromium, a następnie wskazuje to V8 Node'owi podczas jego budowy.

Numery wersji V8 zawsze odpowiadają tym z Google Chrome. Chrome 59 zawiera V8 5.9, Chrome 58 obejmuje V8 5.8, itd.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

Tagi `webview` używane są do osadzania zawartości 'guest' (gościnnej, takiej jak zewnętrzne strony internetowe) w Twojej aplikacji Electron. Są podobne do `iframe`s, ale różnią się tym, że każde webview uruchomione jest w osobnym procesie. Nie posiada to tych samych uprawnień jak Twoja strona internetowa i wszystkie interakcje między Twoją aplikacją a osadzoną zawartością będą asynchroniczne. Ma to na celu ochronę Twojej aplikacji przed osadzoną zawartością.