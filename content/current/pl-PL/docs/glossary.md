# Słownik

Ta strona definiuje terminy które są powszechnie używane w rozwoju Electron.

### ASAR

ASAR oznacza Atom Shell Archive Format (Format archiwizowania Atom Shell). Archiwum [asar](https://github.com/electron/asar) jest proste. Format archiwum podobny do formatu `tar`, który łączy pliki w jeden. Electron może odczytywać z niego dowolne pliki bez potrzeby rozpakowania archiwum.

Format ASAR został stworzony głównie w celu poprawy wydajności systemu Windows... TODO

### CRT

Biblioteka C Run-time (CRT) jest częścią standardowej biblioteki C++, która zawiera standardową bibliotekę ISO C99. Wizualne biblioteki C++, które implementują CRT obsługują tworzenie kodu natywnego, jak i zarówno mieszanego natywnego i zarządzanego kodu oraz czysto zarządzanego kody dla platformy .NET.

### DMG

Obraz dysku, używany przez macOS. Pliki DMG są powszechnie używane do dystrybucji "instalatorów" aplikacji. [electron-builder](https://github.com/electron-userland/electron-builder) wspiera `dmg` jako docelowy format kompilacji.

### IME

Edytor metod wprowadzania. Program, który umożliwia użytkownikom wprowadzanie znaków i symboli, których nie można odnaleźć na klawiaturze. Na przykład pozwala to na wprowadzanie znaków chińskich, japońskich, koreańskich i hinduskich.

### IDL

Język opisu interfejsu. Zapisywanie podpisów i typów danych funkcji w formacie, który może być używany do generowania interfejsów w Java, C++, JavaScript, itp.

### IPC

IPC oznacza komunikację międzyprocesową. Electron używa IPC do wysyłania serializowanych wiadomości JSON między procesami [main](#main-process) i [renderer](#renderer-process).

### libchromiumcontent

Wspólna biblioteka zawierająca [moduł zawartości Chromium](https://www.chromium.org/developers/content-module) i wszystkie jego zależności (np., Blink, [V8](#v8), itp.). Również określane jako "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

Proces główny, zazwyczaj plik nazwany `main.js`, jest punktem wejścia do każdej aplikacji Electron'u. Kontroluje życie aplikacji, od otwarcia do zamknięcia. To również zarządza natywnymi elementami takimi jak Menu, Pasek Menu, Dock, Tray, itd. Główny proces odpowiada za tworzenie każdego nowego procesu renderowania w aplikacji. Pełny Node API jest wbudowany.

Główny plik procesu każdej aplikacji jest określony w `głównej` właściwości w `package.json`. Oto jak `elektron.` wie, jaki plik należy wykonać przy uruchomieniu.

W Chromie proces ten nazywany jest "procesem przeglądarki". zmienił nazwę w Electronie, aby uniknąć pomylenia z procesami renderowania.

Zobacz też: [process](#process), [renderer process](#renderer-process)

### MAS

Akronim dla Apple Mac App Store. Więcej szczegółów na temat przesłania aplikacji do MAS, zobacz [Przewodnik składania aplikacji Mac App Store](tutorial/mac-app-store-submission-guide.md).

### Mojo

System IPC do komunikowania się wewnątrz- lub między-procesami, jest to ważne ponieważ Chrome jest w stanie podzielić swoją prace na oddzielne procesy lub nie, w zależności od ograniczenia pamięci itp.

Zobacz https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Natywne moduły (nazywane również [dodatkami](https://nodejs.org/api/addons.html) w Node.js) są modułami napisanymi w C lub C++, które mogą być załadowane do Node.js lub Electrona za pomocą funkcji require() i używane tak, jakby były zwyczajnymi modułami Node.js. Używane są głównie w celu zapewnienia interfejsu między uruchomionym w Node.js JavaScript s bibliotekami C/C++.

Natywne moduły Node są obsługiwane przez Electron, ale ponieważ Electron często używa innej wersji V8 od Node binary zainstalowanej na twoim systemie, musisz ręcznie określić lokalizację nagłówków Electronu podczas budowania modułów natywnych.

Zobacz również [Obsługa Natywnych Modułów Node](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System to skryptowe narzędzie autoryzacji instalacji dla Microsoft Windows. Jest wydany w połączeniu z darmowymi licencjami oprogramowania i jest szeroko stosowaną alternatywą dla komercyjnych zastrzeżonych produktów, takich jak InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) obsługuje NSIS jako docelowy format kompilacji.

### OSR

OSR (renderowanie wyłączonego ekranu) może być użyty do ładowania dużej strony w tle, a następnie wyświetlania jej (będzie znacznie szybsze). Pozwala na renderowanie strony bez wyświetlania jej na ekranie.

### przetwórz

Proces jest instancją programu komputerowego, który jest wykonywany. Electron aplikacje, która używają procesu [main](#main-process) i jednego lub wielu procesów [renderer](#renderer-process) to w rzeczywistości kilka programów uruchomionych jednocześnie.

W Node.js i Electron, każdy z uruchomionych procesów ma obiekt `process`. Ten obiekt jest globalny i zapewnia informacje o obecnym procesie oraz kontrolę nad nim. Jako globalny, jest on zawsze dostępny dla aplikacji bez użycia require().

Zobacz też: [główny proces](#main-process), [proces renderowania](#renderer-process)

### renderer process

Proces renderowania jest oknem przeglądarki w Twojej aplikacji. W przeciwieństwie do głównego procesu, może być ich wiele i każdy jest uruchamiany w osobnym procesie. Mogą być również ukryte.

W normalnych przeglądarkach, strony internetowe zazwyczaj są zazwyczaj uruchamiane w środowisku piaskownicy i nie posiadają dostępu do zasobów natywnych. Użytkownicy Electron mają jednak możliwość użycia interfejsów API Node.js na stronach internetowych, co pozwala na interakcje systemu operacyjnego na niższym poziomie.

Zobacz także: [proces](#process), [główny proces](#main-process)

### Squirrel

Squirrel to framework open source, który umożliwia aplikacjom Electron automatyczną aktualizację do nowszych wersji. Zobacz [autoUpdater](api/auto-updater.md) API w celu uzyskania informacji o obsłudze platformy Squirrel.

### userland

Ten termin pochodzi ze społeczności Unix, gdzie "userland" lub "userspace" określały programy działające poza jądrem systemu operacyjnego. Ostatnio termin ten został spopularyzowany wśród społeczności Node i npm dla rozróżnienia pomiędzy funkcjami dostępnymi w "Node core" oraz paczkach opublikowanych w rejestrze npm przez znacznie większą społeczność "user" (użytkowników).

Tak jak Node, Electron jest skupiony na posiadaniu małego zestawu interfejsów API, które zapewniają wszystkie niezbędne podstawy do tworzenia multi-platformowych aplikacji. Ta filozofia designu pozwala Electron'owi pozostać wszechstronnym narzędziem unikając zarazem nadmiernej normatywności odnośnie sposobu jego użycia. Userland umożliwia użytkownikom tworzenie i udostępnianie narzędzi zapewniających dodatkową funkcjonalność ponad to, co dostępne jest w "rdzeniu".

### V8

V8 jest wyszukiwarką JavaScript Google. Jest napisany w C++ i jest używany w Google Chrome. V8 może działać samodzielnie, lub może być wbudowany w dowolną aplikację C++.

Electron buduje V8 jako część Chromium, a następnie wskazuje go Node'owi podczas jego budowy.

Numery wersji V8 zawsze odpowiadają numerom wersji Google Chrome. Chrome 59 zawiera V8 5.9, Chrome 58 zawiera V8 5.8 itp.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

Tagi `webview` są używane do osadzania zawartości 'guest' (takiej jak np. zewnętrzne strony internetowe) w Twojej aplikacji. Są podobne do `iframe`'ów, ale różnią się tym, że każde webview uruchomione jest w osobnym procesie. Nie posiada to tych samych uprawnień jak Twoja strona internetowa i wszystkie interakcje między Twoją aplikacją a osadzoną zawartością będą asynchroniczne. Ma to na celu ochronę Twojej aplikacji przed osadzoną zawartością.
