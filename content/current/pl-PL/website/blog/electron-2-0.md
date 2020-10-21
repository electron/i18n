---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Po ponad czterech miesiącach rozwoju, osiem wersji beta i na całym świecie testowanie z wersji, które zostało uruchomione przez wiele aplikacji, wydanie Electron 2. .0 jest teraz dostępny od [electronjs.org](https://electronjs.org/).

---

## Proces Wydania

Począwszy od 2.0.0, wydania Electrona będą śledzić [wersji semantycznych](https://electronjs.org/blog/electron-2-semantic-boogaloo). Oznacza to, że główna wersja będzie częściej zgięta i będzie zazwyczaj główną aktualizacją Chromium. Wydania patcha powinny być bardziej stabilne, ponieważ będą zawierać tylko poprawki błędów o wysokim priorytecie.

Electron 2.0.0 oznacza również poprawę w sposobie stabilizacji Electron przed znacznym wydaniem. Kilka dużych aplikacji Electron zawierało 2.0.0 beas w okresowym przeglądzie, zapewniając najlepszą pętlę zwrotną Electron w historii dla serii beta.

## Zmiany / Nowe funkcje

 * Poważne uderzenia w kilka ważnych części łańcucha narzędzi Electrona, w tym Chrome 61, Node 8.9.3, V8 6.1.534.41, GTK+ 3 na Linux, zaktualizowany sprawdzacz pisowni i Squirrel.
 * [Zakupy w aplikacji](https://electronjs.org/blog/in-app-purchases) są teraz obsługiwane na MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nowe API do ładowania plików. [#11565](https://github.com/electron/electron/pull/11565)
 * Nowe API, aby włączyć/wyłączyć okno. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Nowe wsparcie dla logowania wiadomości IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Nowe zdarzenia menu. [#11754](https://github.com/electron/electron/pull/11754)
 * Dodaj zdarzenie `shutdown` do powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Dodaj opcję `powinowactwo` do zebrania kilku przeglądarki BrowserWindows w jeden proces. [#11501](https://github.com/electron/electron/pull/11501)
 * Dodaj możliwość zapisywania okien do listy dostępnych rozszerzeń. [#11873](https://github.com/electron/electron/pull/11873)
 * Wsparcie dla dodatkowych działań w zakresie powiadomień [#11647](https://github.com/electron/electron/pull/11647)
 * Możliwość ustawienia przycisku zamykania powiadomień macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Dodaj warunkowe dla menu.popup(window, callback)
 * Ulepszenie pamięci w elementach paska dotykowego. [#12527](https://github.com/electron/electron/pull/12527)
 * Ulepszona lista zaleceń bezpieczeństwa
 * Dodaj skorelowane zakładki bezpieczeństwa aplikacji [#11711](https://github.com/electron/electron/pull/11711)
 * Dodaj możliwość ustawiania arbitralnych argumentów w procesie renderowania. [#11850](https://github.com/electron/electron/pull/11850)
 * Dodaj widok akcesoriów dla selektora formatów. [#11873](https://github.com/electron/electron/pull/11873)
 * Stała sieć deleguje warunek wyścigu. [#12053](https://github.com/electron/electron/pull/12053)
 * Upuść wsparcie dla łuku `mips64el` na Linux. Electron wymaga narzędzia C++14, który nie był dostępny dla tego łuku w momencie wydania. Mamy nadzieję na ponowne wsparcie w przyszłości.

## Przerwanie zmian API

 * Usunięto [przestarzałych API](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), w tym:
   * Zmieniono podpis `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * Usunięto przestarzały `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Usunięto przestarzałe `webContents.setZoomLevelLimits` i `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Usunięto przestarzałe metody `schowka`. [#11973](https://github.com/electron/electron/pull/11973)
   * Usunięto obsługę parametrów boolean dla `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Poprawki błędów

 * Zmieniono aby upewnić się, że `webContents.isOffscreen()` jest zawsze dostępny. [#12531](https://github.com/electron/electron/pull/12531)
 * Naprawiono `BrowserWindow.getFocusedWindow()` , gdy DevTools jest oddany. [#12554](https://github.com/electron/electron/pull/12554)
 * Stałe ładowanie wstępne nie wczytywanie w piaskowanym renderowaniu, jeśli ścieżka wstępnego ładowania zawiera znaki specjalne. [#12643](https://github.com/electron/electron/pull/12643)
 * Popraw domyślne allowRunningInsecureContent zgodnie z dokumentami. [#12629](https://github.com/electron/electron/pull/12629)
 * Ustalona przezroczystość na nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Naprawiono problem z `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Potwierdzone opcje menu.popup są obiektami. [#12330](https://github.com/electron/electron/pull/12330)
 * Usunięto warunek wyścigu pomiędzy tworzeniem nowego procesu a wydaniem kontekstu. [#12361](https://github.com/electron/electron/pull/12361)
 * Aktualizuj przeciągalne regiony podczas zmiany widoku przeglądarki. [#12370](https://github.com/electron/electron/pull/12370)
 * Naprawiony pasek menu przełącza wykrywanie klawiszy alt przy ognisku. [#12235](https://github.com/electron/electron/pull/12235)
 * Naprawiono niepoprawne ostrzeżenia w widokach internetowych. [#12236](https://github.com/electron/electron/pull/12236)
 * Naprawiono dziedziczenie opcji 'show' z okien nadrzędnych. [#122444](https://github.com/electron/electron/pull/122444)
 * Upewnij się, że `getLastCrashReport()` jest w rzeczywistości ostatnim raportem awarii. [#12255](https://github.com/electron/electron/pull/12255)
 * Naprawiono wymóg na ścieżce współdzielenia sieci. [#12287](https://github.com/electron/electron/pull/12287)
 * Stacjonarne menu kontekstowe kliknij wywołanie zwrotne. [#12170](https://github.com/electron/electron/pull/12170)
 * Naprawiono pozycję wyskakującego menu. [#12181](https://github.com/electron/electron/pull/12181)
 * Ulepszone czyszczenie pętli libuva. [#11465](https://github.com/electron/electron/pull/11465)
 * Naprawiono `hexColorDWORDToRGBA` dla przezroczystych kolorów. [#11557](https://github.com/electron/electron/pull/11557)
 * Naprawiono wartość zerową wskaźnika dla getWebPreferences api. [#12245](https://github.com/electron/electron/pull/12245)
 * Naprawiono odniesienie cykliczne w menu, delegat. [#11967](https://github.com/electron/electron/pull/11967)
 * Stałe filtrowanie protokołu net.Request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits ustawia ograniczenia skali agenta [#12510](https://github.com/electron/electron/pull/12510)
 * Ustaw odpowiednie ustawienia domyślne dla opcji widoku web. [#12292](https://github.com/electron/electron/pull/12292)
 * Ulepszona obsługa żywotności. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Naprawiono problem czasowy w uchwycie singleton.
 * Naprawiono uszkodzoną pamięć podręczną produkcji w NotifierSupportsActions()
 * Utworzono role MenuItem camelCase. [#11532](https://github.com/electron/electron/pull/11532)
 * Ulepszone aktualizacje paska dotykowego. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Usunięto dodatkowe separatory menu. [#11827](https://github.com/electron/electron/pull/11827)
 * Naprawiono błąd wyboru Bluetooth. Zamyka [#11399](https://github.com/electron/electron/pull/11399).
 * Naprawiono etykietę elementu menu pełnoekranowego. [#11633](https://github.com/electron/electron/pull/11633)
 * Ulepszono ukrywanie podpowiedzi po wyłączeniu okna. [#11644](https://github.com/electron/electron/pull/11644)
 * Przenoszenie przestarzałej metody przeglądania sieci. [#11798](https://github.com/electron/electron/pull/11798)
 * Naprawiono zamknięcie okna otwarte z przeglądarki. [#11799](https://github.com/electron/electron/pull/11799)
 * Naprawiono błąd wyboru Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Zaktualizowano do użycia harmonogramu zadań dla app.getFileIcon API. [#11595](https://github.com/electron/electron/pull/11595)
 * Zmieniono na wystrzelenie zdarzenia `console-message` nawet podczas renderowania ekranu. [#11921](https://github.com/electron/electron/pull/11921)
 * Naprawiono pobieranie z niestandardowych protokołów używając `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Stałe przezroczyste okna tracą przezroczystość podczas odłączania narzędzi. [#11956](https://github.com/electron/electron/pull/11956)
 * Naprawione aplikacje Electron anulowały ponowne uruchomienie lub wyłączenie. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Naprawiono wyciek zdarzenia przy ponownym użyciu elementu paska dotykowego. [#12624](https://github.com/electron/electron/pull/12624)
 * Stałe podświetlenie zasobnika w trybie ciemnym. [#12398](https://github.com/electron/electron/pull/12398)
 * Naprawiono główny proces blokowania okna asynchronicznego. [#12407](https://github.com/electron/electron/pull/12407)
 * Naprawiono awarię `setTitle` tacy. [#12356](https://github.com/electron/electron/pull/12356)
 * Naprawiono awarię podczas ustawiania menu doku. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Lepsze powiadomienia na pulpicie Linux. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Lepsze wsparcie motywu GTK+ dla menu. [#12331](https://github.com/electron/electron/pull/12331)
 * Wyjdź z grabieżnie na linuksie. [#12139](https://github.com/electron/electron/pull/12139)
 * Użyj nazwy aplikacji jako domyślnej ikony zasobnika. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Dodano wsparcie programu Visual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * Naprawiono przejście wyjątku do systemu obsługi awarii. [#12259](https://github.com/electron/electron/pull/12259)
 * Naprawiono ukrywanie podpowiedzi z zminimalizowanego okna. [#11644](https://github.com/electron/electron/pull/11644)
 * Naprawiono `pulpitopCapturer` , aby przechwycić poprawny ekran. [#11664](https://github.com/electron/electron/pull/11664)
 * Naprawiono `disableHardwareAcceleration` z przezroczystością. [#11704](https://github.com/electron/electron/pull/11704)

# Co dalej

Zespół Electron jest ciężko pracować, aby wspierać nowsze wersje Chromium, Node i v8. Oczekiwanie 3.0.0-beta.1 wkrótce!
