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

### natywne moduły

Natywne moduły (nazywane również [addon](https://nodejs.org/api/addons.html) w Node.js) są modułami napisanymi w C lub C++, które mogą być załadowane do Node.js lub Electron za pomocą funkcji require() i używane tak, jakby były zwyczajnymi modułami Node.js. Używane są głównie w celu zapewnienia interfejsu między uruchomionym w Node.js JavaScript s bibliotekami C/C++.

Natywne moduły Node są obsługiwane przez Electron, ale ponieważ Electron często używa innej wersji V8 od Node binary zainstalowanej na twoim systemie, musisz ręcznie określić lokalizację nagłówków Electronu podczas budowania modułów natywnych.

Zobacz również [Obsługa Natywnych Modułów Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System to skryptowe narzędzie autoryzacji instalacji dla Microsoft Windows. Jest wydany w połączeniu z darmowymi licencjami oprogramowania i jest szeroko stosowaną alternatywą dla komercyjnych zastrzeżonych produktów, takich jak InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) obsługuje NSIS jako docelowy format kompilacji.

### OSR

OSR (Off-screen rendering) może być używane do ładowania dużych stron w tle i wyświetlaniu ich po tym (będzie to znacznie szybsze). Pozwala to na renderowanie stron bez pokazywania ich na ekranie.

### proces

Proces jest instancją programu komputerowego, który jest wykonywany. Electron aplikacje, która używają procesu [main](#main-process) i jednego lub wielu procesów [renderer](#renderer-process) to w rzeczywistości kilka programów uruchomionych jednocześnie.

W Node.js i Electron, każdy z uruchomionych procesów ma objekt `process`. Ten obiekt jest globalny i zapewnia informacje o obecnym procesie oraz kontrolę nad nim. Jako globalny, jest on zawsze dostępny dla aplikacji bez użycia require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### proces renderowania

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### strefa użytkownika

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.