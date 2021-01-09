---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguy
date: '2020-02-04'
---

Electron 8.0.0 został wydany! Zawiera ulepszenia do Chromium `80`, V8 `8.0`i Node.js `12.13.0`. Dodaliśmy wbudowany walidator pisowni Chrome i wiele więcej!

---

Zespół Electron jest podekscytowany do ogłoszenia wydania Electron 8.0.0! Możesz go zainstalować za pomocą npm za pomocą `npm install electron@latest` lub pobrać z naszej [wersji](https://electronjs.org/releases/stable). Wydanie jest zapakowane z aktualizacjami, poprawkami i nowymi funkcjami. Nie możemy się doczekać, aby zobaczyć co z nimi budujesz! Kontynuuj czytanie, aby uzyskać więcej informacji na temat tej wersji i podziel się swoją opinią!

## Istotne zmiany

### Zmiany stosu
* Chromium `80.0.3987.86`
    * [Nowy w Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nowe w Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Węzeł 12.13.0 wpisu na blogu](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [Wpis na blogu V8 7.9](https://v8.dev/blog/v8-release-79)
    * [Wpis na blogu V8 8.0](https://v8.dev/blog/v8-release-80)

### Podświetl funkcje
* Zaimplementowane użycie wbudowanej funkcji sprawdzania pisowni Chrome Więcej szczegółów znajdziesz w [#20692](https://github.com/electron/electron/pull/20692) i [#21266](https://github.com/electron/electron/pull/21266).
* Komunikacja IPC korzysta teraz z algorytmu Klonowania Strukturalnego w wersji 8. Jest to szybsze, bardziej funkcjonalne i mniej zaskakujące niż istniejąca logika i powoduje dwukrotny wzrost wydajności dużych buforów i złożonych obiektów. Opóźnienie w przypadku małych wiadomości nie jest znacząco zagrożone. Zobacz więcej szczegółów w [#20214](https://github.com/electron/electron/pull/20214).

Zobacz [notatki o wydaniu 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) , aby uzyskać pełną listę nowych funkcji i zmian.

## Breaking Changes

* Pokaż nazwę modułu w ostrzeżeniu o deprekacji dla modułów o konsoli. [#21952](https://github.com/electron/electron/pull/21952)
    * Jest to kontynuacja pracy dla przyszłego wymagania, aby natywne moduły węzła wczytane w procesie renderowania były albo [N-API](https://nodejs.org/api/n-api.html) albo [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Pełna informacja i proponowana oś czasu są wyszczególnione w [tym problemie](https://github.com/electron/electron/issues/18397).
* Wartości przesyłane przez IPC są teraz serializowane z Algorytmem Klonowania Strukturalnego.  [#20214](https://github.com/electron/electron/pull/20214)
* Renderowanie na ekranie jest obecnie wyłączone z powodu braku opiekuna do pracy nad tą funkcją.  Zepsuł się podczas aktualizacji Chromium, a następnie został wyłączony. [#20772](https://github.com/electron/electron/issues/20772)

Więcej informacji o tych i przyszłych zmianach można znaleźć na stronie [Zaplanowane zmiany](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)

## Zmiany API
* `aplikacja` zmienia API:
    * Dodano `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Dodano obsługę `app.showAboutPanel()` i `app.setAboutPanelOptions(options)` na Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` zmienia API:
    * Zaktualizowano dokumenty, aby zauważyć, że opcje BrowserWindow `hasShadow` są dostępne na wszystkich platformach [#20038](https://github.com/electron/electron/pull/20038)
    * Dodano opcję `TrafLightPosition` do opcji BrowserWindow aby umożliwić niestandardowe pozycjonowanie przycisków sygnalizacji świetlnej. [#21781](https://github.com/electron/electron/pull/21781)
    * Dodano opcję `Dostępny Tytuł` do okna przeglądarki, aby ustawić tytuł dostępnego okna [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` może teraz zwrócić null [#19983](https://github.com/electron/electron/pull/19983)
    * Dodano `BrowserWindow.getMediaSourceId()` i `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Dodano wsparcie dla zdarzenia `will move` na macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Dokumentowane wcześniej nieudokumentowane `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `okno dialogowe` Zmiany API:
    * Dodano właściwość `nie AddToRecent` do okna dialogowego `showOpenDialog` i `. howOpenDialogSync` aby zapobiec dodawaniu dokumentów do najnowszych dokumentów w systemie Windows w oknach otwartych. [#19669](https://github.com/electron/electron/pull/19669)
    * Dodano właściwości do `dialog.showSaveDialog` i `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Powiadomienie` zmienia API:
    * Dodano opcję `timeoutType` , aby umożliwić użytkownikom Linux/indows ustawianie typu limitu czasu powiadomienia. [#20153](https://github.com/electron/electron/pull/20153)
    * Dodano opcję `pilności`  , aby ustawić pilność na powiadomieniach Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `sesja` Zmiany API:
    * Zaktualizowano dokumentację `session.setProxy(config)` i `session.setCertificateVerifyProc(proc)` aby notać opcjonalne opcje. [#19604](https://github.com/electron/electron/pull/19604)
    * Dodano `session.downloadURL(url)` , aby umożliwić wyzwalanie pobierania bez okna przeglądarki. [#19889](https://github.com/electron/electron/pull/19889)
    * Dodano wsparcie dla podłączenia zasobów HTTP poprzez `session.preconnect(options)` i `preconnect` zdarzenie. [#18671](http://github.com/electron/electron/pull/18671)
    * Dodano `session.addWordToSpellCheckerDictionary` , aby zezwolić na niestandardowe słowa w słowniku [#21297](http://github.com/electron/electron/pull/21297)
* Dodano opcję do `shell.moveItemToTrash(fullŚcieżka [, deleteOnFail])` na macOS, aby określić co się dzieje, gdy moveItemToTrash nie powiedzie się. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferencje` Zmiany API:
    * Zaktualizowano `systemPreferences.getColor(color)` dokumentację dla macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Dodano `ekran` typ mediów do `systemPreferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Dodano `nativeTheme.themeSource` , aby umożliwić aplikacjom nadpisanie wyboru motywu Chromium i systemu operacyjnego. [#19960](https://github.com/electron/electron/pull/19960)
* Interfejs API TouchBar:
    * Dodano `DostępnośćEtykieta` do `TouchBarButton` i `TouchBarLabel` , aby poprawić dostępność TouchBarButton/TouchBarLabel. [#20454](https://github.com/electron/electron/pull/20454)
    * Zaktualizowano dokumentację związaną z TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `zasobnik` zmienia API:
    * Dodano nowe opcje do `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` i `respectQuietTime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Dodano tray.removeBalloon(), który usuwa już wyświetlone powiadomienie balonu. [#19547](https://github.com/electron/electron/pull/19547)
    * Dodano tray.focus(), który zwraca koncentrację do obszaru powiadomień paska zadań. feat: dodaj tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContents` zmienia API:
    * Dodano `contents.executeJavaScriptInsolatedWorld(worldId, scripts[, userGesture])` , aby ujawnić executeJavaScriptInIsolatedWorld na webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Dodano metody do przechwytywania ukrytych treści internetowych. [#21679](https://github.com/electron/electron/pull/21679)
    * Dodano opcje do `webContents.print([options], [callback])` aby włączyć dostosowywanie nagłówków i stopek strony druku. [#19688](https://github.com/electron/electron/pull/19688)
    * Dodano możliwość oglądania określonych współdzielonych pracowników za pośrednictwem `webContents.getAllSharedWorkers()` i `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * Dodano obsługę opcji `fitToPageEnabled` i `scaleFactor` w WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Zaktualizowano `webview.printToPDF` dokumentacją wskazującą typ zwracany jest teraz Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### Przestarzałe API
Następujące API są teraz przestarzałe:
* Przestarzało opcję `visibleOnFullScreen` w `BrowserWindow.setVisibleOnAllWorkspace` przed jej usunięciem w następnej głównej wersji wydania. [#21732](https://github.com/electron/electron/pull/21732)
* Przestarzały `tekst selected-control-` na `systemPreferences.getColor(color)` dla macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Przestarzały `setLayoutZoomLevelLimits` na `zawartości webContents`, `webFrame`i `<webview> Tag` , ponieważ Chromium usunął tę funkcję. [#21296](https://github.com/electron/electron/pull/21296)
* Domyślna wartość `false` dla `app.allowRendererProcessReuse` jest przestarzała. [#21287](https://github.com/electron/electron/pull/21287)
* Przestarzały `<webview>.getWebContents()` , ponieważ zależy on od modułu zdalnego. [#20726](https://github.com/electron/electron/pull/20726)

## Koniec wsparcia dla 5.x.y

Electron 5.x.y osiągnął koniec wsparcia w ramach [polityki wsparcia](https://electronjs.org/docs/tutorial/support#supported-versions). Deweloperzy i aplikacje zachęca się do aktualizacji do nowszej wersji Electron.

## Program Feedbacku Aplikacji

Kontynuujemy korzystanie z naszego [programu Informacji zwrotnej o aplikacjach](https://electronjs.org/blog/app-feedback-program) do testowania. Projekty, które uczestniczą w tym programie testują Electrona betas na swoich aplikacjach; i w zamian za nowe błędy, które znajdą są priorytetowe dla stabilnego wydania. Jeśli chcesz wziąć udział lub dowiedzieć się więcej, [sprawdź nasz wpis na blogu dotyczący programu](https://electronjs.org/blog/app-feedback-program).

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. [wstępny harmonogram 9.0.0](https://electronjs.org/docs/tutorial/electron-timelines) mapuje daty kluczy w cyklu rozwoju Electron 9. Ponadto [zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Deprekacja `zdalnego` Modułu (Rozpoczęcie w Electron 9)
Ze względu na poważne zobowiązania bezpieczeństwa, zaczynamy plany deprekacji [`zdalnego` modułu](https://www.electronjs.org/docs/api/remote) , zaczynającego się w Electron 9. Możesz przeczytać i śledzić [ten problem](https://github.com/electron/electron/issues/21408) , który szczegółowo opisuje nasze przyczyny i zawiera proponowaną oś czasu dla deprekacji.
