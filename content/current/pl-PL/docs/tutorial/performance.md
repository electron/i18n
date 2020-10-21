# Efektywność

Deweloperzy często pytają o strategie optymalizacji wydajności aplikacji Electron. Inżynierowie oprogramowania, konsumenci i deweloperzy frameworków nie zawsze zgadzają się co oznacza "wydajność". Ten dokument przedstawia niektóre z ulubionych sposobów opiekunów Electrona, aby zmniejszyć ilość pamięci, CPU, i zasoby dysku są używane przy jednoczesnym zapewnieniu, że aplikacja reaguje na wprowadzanie danych przez użytkownika i kończy operacje tak szybko, jak to możliwe . Ponadto chcemy, aby wszystkie strategie wydajności utrzymywały wysoki standard bezpieczeństwa Twojej aplikacji.

Mędrność i informacje o tym, jak budować strony internetowe z JavaScript mają również zastosowanie do aplikacji Electron. Do pewnego stopnia zasoby dyskutują o tym, jak zbudować wydajny Node. s aplikacje mają również zastosowanie, ale bądź uważny, aby zrozumieć, że termin "wydajność" oznacza różne rzeczy dla węzła s backend niż dla aplikacji działającej na klientu.

Ta lista jest dostarczona dla Twojej wygody - i jest, podobnie jak nasza [lista kontrolna bezpieczeństwa](./security.md) - nie jest wyczerpująca. Prawdopodobnie można zbudować wolną aplikację Electrona, która postępuje zgodnie ze wszystkimi poniższymi krokami. Electron jest potężną platformą rozwojową, która pozwala Tobie programistie, zrobić więcej lub mniej cokolwiek chcesz. Wszystko to oznacza, że wydajność to twoja odpowiedzialność.

## Pomiar, pomiar, pomiar

Poniższa lista zawiera kilka kroków, które są dość proste i łatwe do wdrożenia. Jednak budowa najbardziej wydajnej wersji Twojej aplikacji będzie wymagała wychodzenia poza wiele kroków. Zamiast tego musisz dokładnie sprawdzić cały kod uruchomiony w aplikacji poprzez staranne profilowanie i pomiar. Gdzie są wąskie gardła? Kiedy użytkownik kliknie przycisk, co operacje zajmują najwięcej czasu? While the app is simply idling, which objects take up the most memory?

Wielokrotnie widzieliśmy, że najbardziej udaną strategią budowania wydajnej aplikacji Electron jest profilowanie uruchomionego kodu, znajdź najbardziej elementy głodne od zasobów i zoptymalizuj je. Powtarzanie tego pozornie żmudnego procesu po raz kolejny dramatycznie zwiększy wydajność Twojej aplikacji . Doświadczenie zdobyte podczas pracy z głównymi aplikacjami, takimi jak Visual Studio Code lub Slack pokazuje, że ta praktyka jest zdecydowanie najbardziej niezawodną strategią na rzecz poprawy wydajności.

Aby dowiedzieć się więcej na temat profilowania kodu aplikacji, zapoznaj się z narzędziami dla programistów Chrome. W celu zaawansowanej analizy sprawdzającej wiele procesów na raz, weź pod uwagę narzędzie [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

### Polecane czytanie

 * [Zacznij od analizy wydajności Runtime](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
 * [Talk: "Visual Studio Code - First Second"](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## Checklist

Szansa na to, że twoja aplikacja może być nieco łagodniejsza, szybsza i na ogół mniej głodna zasobów jeśli spróbujesz wykonać te kroki.

1. [Bezproblemowo wliczając moduły](#1-carelessly-including-modules)
2. [Wczytywanie i uruchamianie kodu zbyt szybko](#2-loading-and-running-code-too-soon)
3. [Blokowanie głównego procesu](#3-blocking-the-main-process)
4. [Blokowanie procesu renderowania](#4-blocking-the-renderer-process)
5. [Niepotrzebne poliwypełnienia](#5-unnecessary-polyfills)
6. [Niepotrzebne lub blokowanie żądań sieciowych](#6-unnecessary-or-blocking-network-requests)
7. [Pakiet kodu](#7-bundle-your-code)

## 1) Ostrożnie włączając moduły

Przed dodaniem modułu Node.js do aplikacji, sprawdź wspomniany moduł. How many dependencies does that module include? Jakiego rodzaju zasoby muszą być po prostu wywołane w wyrażeniu `require()`? Możesz znaleźć , że moduł z największą ilością pobrań w rejestrze pakietów NPM lub z największą liczbą gwiazd na GitHubie nie jest w rzeczywistości najkorzystniejszy lub najmniejszy dostępny.

### Dlaczego?

Rozumowanie tej rekomendacji najlepiej ilustruje przykład świata rzeczywistego . W pierwszych dniach Electrona problemem było niezawodne wykrywanie połączeń sieciowych . w wyniku czego wiele aplikacji używało modułu, który ujawnił metodę prostą `isOnline()`.

Moduł wykrył Twoją łączność sieciową, próbując dotrzeć do liczby dobrze znanych punktów końcowych. Na liście tych punktów końcowych zależało ono od innego modułu, który zawierał również listę dobrze znanych portów. Ta zależność sama w sobie polegała na module zawierającym informacje o portach, który przybrał formę pliku JSON z ponad 100 000 liniami treści. Za każdym razem, gdy moduł został załadowany (zwykle w instrukcji `require('module')` , załadowałby wszystkie swoje zależności i ostatecznie odczytywał i analizował ten plik JSON . Parkowanie wielu tysięcy linii JSON to bardzo kosztowna operacja. wolna maszyna może zająć całe sekundy czasu.

W wielu kontekstach serwera czas uruchamiania jest praktycznie nieistotny. Węzeł. s serwer , który wymaga informacji o wszystkich portach jest prawdopodobnie "bardziej wydajny" , jeśli ładuje wszystkie wymagane informacje do pamięci za każdym razem, gdy serwer uruchomi się na korzyść szybszego obsługi żądań. Moduł omówiony w tym przykładzie to nie jest "złym" modułem. Aplikacje Electron nie powinny jednak być wczytywane, analizowane i przechowywane w informacjach o pamięci, których tak naprawdę nie potrzebuje.

Krótko mówiąc, pozornie doskonały moduł napisany głównie na serwery Node.js z obsługą Linux może być złą wiadomością o wydajności aplikacji. W tym konkretnym przykładzie poprawnym rozwiązaniem było użycie żadnego modułu, i zamiast tego używać kontroli połączenia zawartych w późniejszych wersjach Chromium.

### Jak?

Rozważając moduł, zalecamy sprawdzenie:

1. rozmiar zależności uwzględnionych 2) zasoby wymagane do załadowania (`require()`)
3. zasoby wymagane do wykonania akcji, którą jesteś zainteresowany

Generowanie profilu CPU i profilu pamięci heap do ładowania modułu można wykonać za pomocą pojedynczej komendy w wierszu poleceń. W poniższym przykładzie patrzymy na żądanie popularnego modułu ``.

```sh
węzeł --cpu-prof --heap-prof -e "require('request')"
```

Wykonywanie tej komendy prowadzi do pliku `.cpuprofile` i pliku `.heapprofile` w katalogu, w którym go wykonałeś. Oba pliki mogą być analizowane za pomocą narzędzi dla programistów Chrome, używając odpowiednio kart `Wydajność` i `Pamięć` .

![performance-cpu-prof](../images/performance-cpu-prof.png)

![wydajność-heap-prof](../images/performance-heap-prof.png)

W tym przykładzie na maszynie autora zobaczyliśmy, że wczytywanie `request` zajęło pół sekundy, mając na uwadze, że `pobranie węzła` było dramatycznie mniej pamięci i mniej niż 50 ms.

## 2) Zbyt szybko wczytywanie i uruchamianie kodu

Jeśli masz kosztowne operacje konfiguracji, rozważ ich odroczenie. Sprawdź wszystkie prace wykonywane bezpośrednio po rozpoczęciu aplikacji. Zamiast odpalać wszystkie operacje od razu, rozważ zastój je w sekwencji bardziej dopasowanej do przejazdu użytkownika.

W tradycyjnym rozwoju Node.js jesteśmy przyzwyczajeni do umieszczania na górze wszystkich naszych wyrażeń `require()` . Jeśli obecnie piszesz swoją aplikację Electron używając tej samej strategii _i_ używasz modułów, których nie potrzebujesz, zastosuj tę samą strategię i odłożyć ładowanie na więcej czasu dopasowania.

### Dlaczego?

Ładowanie modułów jest zaskakująco kosztowną operacją, zwłaszcza na Windows. Po uruchomieniu aplikacji, nie powinno to sprawić, że użytkownicy czekają na operacje, które nie są obecnie konieczne.

To może wydawać się oczywiste, ale wiele aplikacji zazwyczaj wykonuje wiele pracy bezpośrednio po uruchomieniu aplikacji - jak sprawdzanie aktualizacji, pobieranie zawartości używanej w późniejszym przepływie lub wykonywanie ciężkich operacji I/O .

Za przykład uznajmy kodeks Visual Studio. Po otwarciu pliku natychmiast wyświetli plik bez wyróżniania kodu, ustalanie priorytetów twoja umiejętność interakcji z tekstem. Po wykonaniu tej pracy przejdzie do podświetlenia kodu.

### Jak?

Weźmy pod uwagę przykład i zakładajmy, że Twoja aplikacja analizuje pliki w fikcyjnym formacie `.foo`. Aby to zrobić, opiera się na równie fikcyjnym `module foo-parser`. W tradycyjnym rozwoju Node.js możesz napisać kod, który z niecierpliwością ładuje zależności:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    to. iles = fs.readdirSync('. )
  }

  getParsedFiles () {
    zwraca fooParser.parse(to. iles)
  }
}

parser const = new Parser()

module.Export = { parser }
```

W powyższym przykładzie robimy dużo pracy, która jest wykonywana natychmiast po załadowaniu pliku. Czy musimy natychmiast pobrać sparowane pliki? Czy moglibyśmy wykonać tę pracę trochę później, kiedy `getParsedFiles()` jest w rzeczywistości wywoływany?

```js
// "fs" jest prawdopodobnie już załadowane, więc wywołanie `require()` jest tanie
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk zaraz po wywołaniu `getFiles` nie wcześniej.
    // Upewnij się, że nie blokujemy innych operacji używając
    // wersji asynchronicznej.
    this.files = this.files || oczekiwanie fs.readdir('.')

    zwraca to. iles
  }

  async getParsedFiles () {
    // Nasz fikcyjny foo-parser to duży i kosztowny moduł do załadowania, więc
    // odłożyć to działanie do momentu, gdy będziemy musieli przetworzyć pliki.
    // Ponieważ `require()` jest wyposażony w modułową pamięć podręczną, połączenie `require()`
    // będzie kosztowne tylko raz - kolejne połączenia `getParsedFiles()`
    // będą szybsze.
    const fooParser = require('foo-parser')
    const files = oczekiwanie this.getFiles()

    return fooParser. arse(files)
  }


// Ta operacja jest teraz dużo tańsza niż w naszym poprzednim przykładzie
parser const = new Parser()

module. xports = { parser }
```

Krótko mówiąc, przydzielaj zasoby „just in time” zamiast przydzielać je wszystkim w momencie rozpoczęcia aplikacji.

## 3) Blokowanie głównego procesu

Główny proces Electrona (czasami nazywany "procesem przeglądarki") jest specjalny: proces nadrzędny dla wszystkich innych procesów aplikacji, a proces pierwotny z którym system operacyjny współpracuje. Obsługuje okna, interakcje i komunikację między różnymi komponentami w Twojej aplikacji. Zawiera również wątek interfejsu.

W żadnym wypadku nie powinieneś blokować tego procesu i wątku interfejsu użytkownika za pomocą długotrwałych operacji. Blokowanie wątku interfejsu użytkownika oznacza, że cała twoja aplikacja zostanie zamrożona, dopóki główny proces nie będzie gotowy do kontynuowania przetwarzania.

### Dlaczego?

Główny proces i jego wątek interfejsu to zasadniczo wieża kontrolna dla głównych operacji wewnątrz aplikacji. Gdy system operacyjny poinformuje Twoją aplikację o kliknięciu myszy, przejdzie przez główny proces, zanim dotrze do Twojego okna. Jeśli okno wyświetla animację gładką mostka, będzie musiał o tym porozmawiać z procesorem GPU – ponownie przejść przez główny proces.

Electron i Chromium ostrożnie umieszczają ciężkie operacje I/O i CPU na nowych wątkach, aby uniknąć blokowania wątku UI. Powinieneś zrobić to samo.

### Jak?

Potężna architektura wieloprocesowa Electron jest gotowa do pomocy w twoich długotrwałych zadań, ale zawiera również niewielką liczbę pułapek wydajności.

1) W przypadku długotrwających ciężkich zadań CPU, użyj [wątków pracowników](https://nodejs.org/api/worker_threads.html), rozważ przeniesienie ich do BrowserWindow, lub (w ostateczności) spawn dedykowanego procesu.

2) Unikać stosowania synchronicznego modułu IPC i `zdalnych` w możliwie najszerszym zakresie. Podczas gdy istnieją przypadki zgodnego z prawem użytkowania, zbyt łatwo jest zablokować wątek interfejsu użytkownika używając modułu `zdalny`.

3) Unikać blokowania operacji we/we/Wy w głównym procesie. Krótko mówiąc, ilekroć główny węzeł. s moduły (takie jak `fs` lub `child_process`) oferują wersję synchroniczną lub asynchroniczną, powinieneś preferować wariant asynchroniczny i nieblokujący .


## 4) Blokowanie procesu renderowania

Od Electron pływa z aktualną wersją Chrome, możesz korzystać z najnowszych i największych funkcji, które oferuje platforma internetowa do odroczenia lub odciążenia operacji w taki sposób, aby aplikacja działała płynnie i reagowała.

### Dlaczego?

Twoja aplikacja ma prawdopodobnie mnóstwo JavaScript do uruchomienia w procesie renderowania. sztuczka polega na wykonaniu operacji tak szybko, jak to możliwe, bez odbierania zasobów potrzebnych do utrzymania płynności przewijania, odpowiadaj na dane wejściowe użytkownika lub animacje na 60fps.

Uorzenie przepływu operacji w kodzie twojego renderowca jest szczególnie przydatne, jeśli użytkownicy skarżą się na twoją aplikację czasami "szturująco".

### Jak?

Ogólnie rzecz biorąc, wszystkie porady dotyczące budowania wydajnych aplikacji internetowych dla nowoczesnych przeglądarek dotyczą również renderowców Electrona. Dwa podstawowe narzędzia znajdujące się w Twojej to obecnie `requestIdleCallback()` dla małych operacji i `Pracownicy Web` dla długotrwających operacji.

*`requestIdleCallback()`* pozwala deweloperom na kolejkowanie funkcji wykonanej natychmiast po wejściu procesu w okres bezczynności. Pozwala wykonywać pracę o niskim priorytecie lub w tle bez wpływu na doświadczenie użytkownika. Aby uzyskać więcej informacji o tym, jak z niego korzystać, [sprawdź dokumentację na MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

*Pracownicy sieci* są potężnym narzędziem do uruchamiania kodu w osobnym wątku. Istnieją zastrzeżeń do rozważenia – sprawdź dokumentację [wielowątkową](./multithreading.md) i [dokumentację MDN dla pracowników sieciowych](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). Są one idealnym rozwiązaniem dla każdej operacji, która wymaga dużej mocy procesora przez okres czasu.


## 5) Niepotrzebne włókna polipropylenowe

Jedną z wielkich zalet Electron jest to, że wiesz dokładnie, który silnik będzie analizował Twój JavaScript, HTML i CSS. Jeśli używasz kodu, który został zapisany na ogólnodostępnej stronie internetowej, upewnij się, że nie ma funkcji polifill zawartych w Electron.

### Dlaczego?

Tworząc aplikację internetową dla dzisiejszego Internetu, najstarsze środowiska dyktują jakie funkcje możesz i nie możesz użyć. Mimo że Electron obsługuje dobrze funkcjonujących filtrów i animacji CSS, starsza przeglądarka może nie. Gdzie możesz użyć WebGL, twoi deweloperzy mogli wybrać bardziej głodne zasoby rozwiązanie do obsługi starszych telefonów.

Jeśli chodzi o JavaScript, Być może uwzględniłeś biblioteki narzędzi, takie jak jQuery dla selektorów DOM lub pola, takie jak `regenerator-runtime` , aby wesprzeć `async/oczekiwanie`.

Rzadko polifil oparty na JavaScript jest szybszy niż odpowiednik natywnej funkcji w Electron. Nie zwalniaj aplikacji Electron wysyłając swoją wersję standardowych funkcji platformy internetowej.

### Jak?

Działaj przy założeniu, że poliwypełnienia w obecnych wersjach Electron są niepotrzebne. Jeśli masz wątpliwości, sprawdź [pochłaniacz. m](https://caniuse.com/) i sprawdź, czy [wersja Chromium używana w wersji Electron](../api/process.md#processversionschrome-readonly) obsługuje funkcję, której potrzebujesz.

Ponadto uważnie przeanalizuj używane biblioteki. Czy są one naprawdę konieczne? `jQuery`na przykład Sukces był taki, że wiele z jego funkcji jest obecnie z [dostępnego zestawu funkcji JavaScript](http://youmightnotneedjquery.com/).

Jeśli używasz transpilera/kompilatora takiego jak TypeScript, sprawdź jego konfigurację i upewnij się, że kierujesz najnowszą wersję ECMAScript obsługiwaną przez Electron.


## 6) Niepotrzebne lub blokowanie żądań sieciowych

Nie pobieraj rzadko zmieniających się zasobów z Internetu, jeśli można je łatwo połączyć z twoją aplikacją.

### Dlaczego?

Wielu użytkowników Electrona zaczyna się od całkowicie internetowej aplikacji, którą przekształcają w aplikację stacjonarną. Jako twórcy stron internetowych używamy do ładowania zasobów z różnych sieci dostarczania treści. Teraz, gdy wysyłasz poprawną aplikację pulpitową, próba "przecięcia sznurka" tam, gdzie jest to możliwe i uniknięcie czekania przez użytkowników na zasoby, które nigdy się nie zmieniają i które można łatwo włączyć do Twojej aplikacji.

Typowym przykładem są czcionki Google. Wielu deweloperów korzysta z imponującej kolekcji darmowych czcionek, które są dostępne w sieci dostarczania treści . Wysokość jest prosta: Dołącz kilka linii CSS i Google zajmie się resztą.

Podczas tworzenia aplikacji Electron użytkownicy są lepiej obsługiwani, jeśli pobierzesz czcionek i umieścisz je w pakiecie aplikacji.

### Jak?

W idealnym świecie Twoja aplikacja nie potrzebuje, aby działała w ogóle. Aby tam dotrzeć, musisz zrozumieć, jakie zasoby pobierana jest twoja aplikacja \- i jak duże są te zasoby.

Aby to zrobić, otwórz narzędzia deweloperskie. Przejdź do karty `Sieć` i sprawdź opcję `Wyłącz pamięć podręczną`. Następnie odśwież swój rendere. chyba że Twoja aplikacja zakazuje takich przeładowań, zwykle możesz uruchomić przeładowanie przez uderzenie `Cmd + R` lub `Ctrl + R` przy pomocy narzędzi deweloperskich w centrum uwagi.

Narzędzia będą teraz dokładnie rejestrować wszystkie żądania sieci. W pierwszym przejściu zaprezentuj wszystkie pobierane zasoby, koncentrując się najpierw na większych plikach . Czy którykolwiek z nich obrazy, czcionki lub pliki multimedialne, które nie zmieniają się i mogą być zawarte w pakiecie? Jeśli tak, proszę je uwzględnić.

W następnym kroku włącz `Tłumienie sieci`. Znajdź rozwijany, który obecnie czyta `online` i wybierz wolniejszą prędkość, taką jak `Szybki 3G`. Odśwież swój renderer i sprawdź, czy są jakieś zasoby, na które aplikacja czeka niepotrzebnie . W wielu przypadkach aplikacja będzie czekać na zakończenie żądania sieciowego , mimo że nie potrzebuje zaangażowanego zasobu.

Wczytywanie zasobów z Internetu, które możesz zmienić bez wysyłania aktualizacji aplikacji, jest potężną strategią. Dla zaawansowanej kontroli ładowania zasobów, rozważmy inwestowanie w [Wątki usługowe](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## 7) Pakiet kodu

Jak już wskazano w "[Ładowanie i uruchamianie kodu zbyt szybko](#2-loading-and-running-code-too-soon)", wywołanie `require()` jest kosztowną operacją. Jeśli możesz to zrobić, dodaj kod swojej aplikacji do pojedynczego pliku.

### Dlaczego?

Nowoczesny rozwój JavaScript zazwyczaj obejmuje wiele plików i modułów. Podczas jest to idealnie dobre do rozwoju z Electronem, zdecydowanie zalecamy połączenie całego kodu w jeden plik, aby upewnić się, że atak zawarty w wezwaniu `wymagany()` jest opłacany tylko raz, gdy aplikacja się ładuje.

### Jak?

Istnieje tam wiele pakietów JavaScript i wiemy lepiej niż złość społeczności, rekomendując jedno narzędzie nad innym. Zalecamy jednak, abyś użył pakietu, który jest w stanie obsługiwać unikalne środowisko Electrona, które musi obsługiwać oba węzły Node. s i środowisko przeglądarki.

Do pisania tego artykułu popularne wybory obejmują [Webpack](https://webpack.js.org/), [paczka](https://parceljs.org/)i [rollup.js](https://rollupjs.org/).
