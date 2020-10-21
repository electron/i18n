---
title: Electron 6.0.0
author:
  - sofianguy
  - ckerr
  - codebytere
date: '2019-07-30'
---

Zespół Electron jest podekscytowany do ogłoszenia wydania Electron 6.0.0! Możesz go zainstalować za pomocą npm za pomocą `npm install electron@latest` lub pobrać z naszej [wersji](https://electronjs.org/releases/stable). Wydanie jest zapakowane z aktualizacjami, poprawkami i nowymi funkcjami. Nie możemy się doczekać, aby zobaczyć co z nimi budujesz! Kontynuuj czytanie, aby uzyskać więcej informacji na temat tej wersji i podziel się swoją opinią!

---

## Co nowego

Dziś oznacza pierwszy projekt Electrona: po raz pierwszy stworzyliśmy stabilną wersję Electrona **tego samego dnia** co odpowiednie [stabilne wydanie Chrome](https://www.chromestatus.com/features/schedule)! 🎉

Duża część funkcjonalności Electronu jest zapewniona przez główne komponenty Chromium, Node.js i V8. Electron na bieżąco aktualizuje te projekty, aby zapewnić naszym użytkownikom nowe funkcje JavaScript, ulepszenia wydajności i poprawki bezpieczeństwa. Każdy z tych pakietów ma duży skok wersji w Electron 6:

- Chrom `76.0.3809.88`
  - [Nowe w 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nowe w 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nowe w 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Węzeł 12.4.0 wpisu na blogu](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [Wpis na blogu V8 7.6](https://v8.dev/blog/v8-release-76)

To wydanie zawiera również ulepszenia API Electrona. [Notatki o wydaniu](https://github.com/electron/electron/releases/tag/v6.0.0) mają bardziej kompletną listę, ale tutaj znajdują się podświetlenia:

### Promisification

Electron 6.0 kontynuuje inicjatywę [](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) rozpoczętą w wersji 5.0 w celu poprawy wsparcia [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Funkcje te obecnie zwracają Promisy i nadal wspierają starsze wywołanie zwrotne:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `webContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Funkcje te mają teraz dwie formy: asynchroniczne i oparte na promiennikach:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Funkcje te zwracają obecnie obietnicy:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Pomocnik Electron (Renderer).app`, `Pomocnik Electron (GPU).app` i `Pomocnik Electron (Plugin).app`

Aby włączyć [utwardzony czas pracy](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), które ogranicza takie rzeczy jak zapisywalna-wykonywalna pamięć i ładowanie kodu podpisanego przez inny zespół ID, uprawnienia do podpisywania specjalnego kodu potrzebne do przyznania pomocy pomocnikowi.

Aby te uprawnienia były dostosowane do typów procesów, które ich wymagają, Chromium [dodał](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) trzy nowe warianty aplikacji Helper: jeden dla renderer (`Electron Helper (Renderer). pp`), jeden dla procesu GPU (`Pomoc Electron (GPU). pp`) i jeden dla wtyczek (`Electron Helper (Plugin).app`).

Uczniowie używający `electron-osx-sign` do współprojektowania swojej aplikacji Electron nie powinni być zmuszeni do wprowadzania żadnych zmian w logice budowy. Jeśli używasz kodowania swojej aplikacji niestandardowymi skryptami, powinieneś upewnić się, że trzy nowe aplikacje Pomocnika są poprawnie zaprogramowane.

Aby poprawnie zapakować aplikację za pomocą tych nowych pomocników, musisz używać `electron-packager@14.0.4` lub wyższej.  Jeśli używasz `electron-builder` powinieneś obserwować [ten problem](https://github.com/electron-userland/electron-builder/issues/4104) , aby śledzić wsparcie dla tych nowych pomocników.

## Breaking Changes

 * To wydanie zaczyna układać grunt dla przyszłego wymagania, aby moduły natywnego węzła wczytane w procesie renderowania były albo [N-API](https://nodejs.org/api/n-api.html) albo [kontekstowe](https://nodejs.org/api/addons.html#addons_context_aware_addons). Przyczyną tej zmiany są szybsze wyniki, większe bezpieczeństwo i zmniejszone obciążenie pracą konserwacyjną. Przeczytaj wszystkie szczegóły, w tym proponowaną oś czasu w [tym problemie](https://github.com/electron/electron/issues/18397). Oczekuje się, że ta zmiana zostanie zakończona w Electron v11.

 * `net.IncomingMessage` nagłówki [zmieniły nieznacznie](https://github.com/electron/electron/pull/17517#issue-263752903) tak, aby ściślej pasowały do [Node. s zachowanie](https://nodejs.org/api/http.html#http_message_headers), w szczególności wartość `set-cookie` i sposób obsługi duplikatów nagłówków. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` zwraca teraz unieważnienie i jest połączeniem asynchronicznym. [#17121](https://github.com/electron/electron/pull/17121)

 * Aplikacje muszą teraz wyraźnie ustawić ścieżkę dziennika wywołując nową funkcję `app.setAppLogPath()` przed użyciem `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Koniec wsparcia dla 3.x.y

Na naszą [politykę wsparcia](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y już się skończyło. Deweloperzy i aplikacje zachęca się do aktualizacji do nowszej wersji Electron.

## Program Feedbacku Aplikacji

Kontynuujemy korzystanie z naszego [programu Informacji zwrotnej o aplikacjach](https://electronjs.org/blog/app-feedback-program) do testowania. Projekty, które uczestniczą w tym programie testują Electrona betas na swoich aplikacjach; i w zamian za nowe błędy, które znajdą są priorytetowe dla stabilnego wydania. Jeśli chcesz wziąć udział lub dowiedzieć się więcej, [sprawdź nasz wpis na blogu dotyczący programu](https://electronjs.org/blog/app-feedback-program).

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. The [tentative 7.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) maps out key dates in the Electron 7 development life cycle. Ponadto [zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
