---
title: Electron 9.0.0
author:
  - sofianguy
  - VerteDinde
date: '2020-05-19'
---

Electron 9.0.0 został wydany! Zawiera ulepszenia do Chromium `83`, V8 `8.3`i Node.js `12.14`. Dodaliśmy kilka nowych integracji API dla naszej funkcji sprawdzania pisowni, włączonej przeglądarki PDF i wiele więcej!

---

Zespół Electron jest podekscytowany do ogłoszenia wydania Electron 9.0.0! Możesz go zainstalować za pomocą npm za pomocą `npm install electron@latest` lub pobrać z naszej [wersji](https://electronjs.org/releases/stable). Wydanie jest zapakowane z aktualizacjami, poprawkami i nowymi funkcjami. Nie możemy się doczekać, aby zobaczyć co z nimi budujesz! Kontynuuj czytanie, aby uzyskać więcej informacji na temat tej wersji i podziel się swoją opinią!

## Znaczące zmiany

### Zmiany stosu

* Chromium `83.0.4103.64`
    * [Nowe w Chrome 81](https://developers.google.com/web/updates/2020/04/nic81)
    * [Chrome 82 został pominięty](https://chromereleases.googleblog.com/2020/03/chrome-and-chrome-os-release-updates.html)
    * [Nowy w Chrome 83](https://developers.google.com/web/updates/2020/05/nic83)
* Node.js `12.14.1`
    * [Węzeł 12.14.1 wpisu na blogu](https://nodejs.org/en/blog/release/v12.14.1/)
* V8 `8.3`
    * [Wpis na blogu V8 8.1](https://v8.dev/blog/v8-release-81)
    * [Wpis na blogu V8 8.3](https://v8.dev/blog/v8-release-83)

### Podświetl funkcje

* Wiele ulepszeń do funkcji sprawdzania pisowni. Więcej szczegółów znajdziesz w [#22128](https://github.com/electron/electron/pull/22128) i [#22368](https://github.com/electron/electron/pull/22368).
* Poprawiona efektywność obsługi zdarzeń okna na Linux. [#23260](https://github.com/electron/electron/pull/23260).
* Włącz przeglądarkę PDF. [#22131](https://github.com/electron/electron/pull/22131).

Zobacz [notatki o wydaniu 9.0.0](https://github.com/electron/electron/releases/tag/v9.0.0) , aby uzyskać pełną listę nowych funkcji i zmian.

## Breaking Changes

* Ostrzeżenie o deprecjacji podczas używania `zdalnego` bez `enableteModule: true`. [#21546](https://github.com/electron/electron/pull/21546)
    * To jest pierwszy krok w naszych planach deprekacji modułu `zdalne` i przeniesienia go do użytkownika. Możesz przeczytać i śledzić [ten problem](https://github.com/electron/electron/issues/21408) , który szczegółowo opisuje nasze przyczyny i zawiera proponowaną oś czasu dla deprekacji.
* Ustaw domyślnie `app.enableRendererProcessReuse` na true [#22336](https://github.com/electron/electron/pull/22336)
    * Jest to kontynuacja pracy dla przyszłego wymagania, aby natywne moduły węzła wczytane w procesie renderowania były albo [N-API](https://nodejs.org/api/n-api.html) albo [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Pełna informacja i proponowana oś czasu są wyszczególnione w [tym problemie](https://github.com/electron/electron/issues/18397).
* Wysyłanie obiektów innych niż JavaScript przez IPC teraz rzuca wyjątek. [#21560](https://github.com/electron/electron/pull/21560)
    * To zachowanie zostało amortyzowane w Electron 8.0. W Electron 9.0 został usunięty stary algorytm serializacji, a wysłanie takich nieserializowanych obiektów spowoduje teraz błąd "obiekt nie może być sklonowany.

Więcej informacji o tych i przyszłych zmianach można znaleźć na stronie [Zaplanowane zmiany](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)

## Zmiany API

* `powłoka` zmienia API:
   * `shell.openItem` API zostało zastąpione asynchronicznym `shell.openPath API`. [propozycja](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md)
* `sesja`Zmiany API:
   * Dodano `session.listWordsFromSpellCheckerDictionary` API aby wyświetlić własne słowa w słowniku. [#22128](https://github.com/electron/electron/pull/22128)
   * Dodano `session.removeWordFromSpellCheckerDictionary` API aby usunąć niestandardowe słowa ze słownika. [#22368](https://github.com/electron/electron/pull/22368)
   * Dodano `session.serviceWorkerContext` API aby uzyskać dostęp do podstawowych informacji o pracowniku usługi i otrzymywać dzienniki konsoli od pracowników serwisowych. [#22313](https://github.com/electron/electron/pull/22313)
* `aplikacja` zmienia API:
   * Dodano nowy parametr wymuszenia do `app.focus()` na macOS, aby umożliwić aplikacjom wymuszanie zajęcia ostrości. [#23447](https://github.com/electron/electron/pull/23447)
* `BrowserWindow` zmienia API:
   * Dodano wsparcie dla dostępu własności do niektórych par getter/setter w `BrowserWindow`. [#23208](https://github.com/electron/electron/pull/23208)

### Przestarzałe API

Następujące API są teraz przestarzałe lub usunięte:

* `shell.openItem` API jest teraz amortyzowane i zastąpione asynchronicznym `shell.openPath API`.
* `<webview>.getWebContents`, który został przestarzały w Electron 8.0, został teraz usunięty.
* `webFrame.setLayoutZoomLevelLimits`, który został przestarzały w Electron 8.0, został teraz usunięty.

## Koniec wsparcia dla 6.x.y

Electron 6.x.y osiągnął koniec wsparcia w ramach [polityki wsparcia](https://electronjs.org/docs/tutorial/support#supported-versions). Deweloperzy i aplikacje zachęca się do aktualizacji do nowszej wersji Electron.

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. The [tentative 10.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 10.0 development life cycle. Ponadto [zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Zmień wartość domyślną `contextIsolation` z `false` na `true` (Początek w Electron 10)

Bez kontekstuIsolacji, każdy kod uruchomiony w procesie renderowania może dość łatwo dotrzeć do wnętrza Electron lub skryptu wstępnego ładowania aplikacji. Ten kod może wtedy wykonywać uprzywilejowane czynności, które Electron chce zachować ograniczenia.

Zmiana tej domyślnej wartości zwiększa domyślne bezpieczeństwo aplikacji Electron, tak aby aplikacje musiały świadomie zdecydować się na niepewne zachowanie. Electron amortyzuje bieżącą wartość domyślną `contextIsolation` w Electron 10. , i zmień na nowy domyślny (`true`) w Electron 12.0.

Więcej informacji na temat `contextIsolation`, jak łatwo je włączyć, a korzyści dla bezpieczeństwa zobacz nasz dedykowany [dokument izolacji kontekstowej](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).
