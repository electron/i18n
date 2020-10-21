---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

Zespół Electron jest podekscytowany, aby ogłosić, że stabilne wydanie Electron 4 jest już dostępne! Możesz zainstalować go z [electronjs.org](https://electronjs.org/) lub z npm poprzez `npm install electron@latest`. Wydanie jest zapakowane z ulepszeniami, poprawkami i nowymi funkcjami i nie możemy czekać na to, co z nimi budujesz. Dowiedz się więcej o tym wydaniu i podziel się opinią, którą masz podczas przeglądania!

---

## Co nowego?

Duża część funkcji Electrona jest dostarczana przez Chromium, Node.js i V8, główne komponenty Electrona. Głównym celem zespołu Electron jest dotrzymanie w miarę możliwości zmian w tych projektach. zapewnienie deweloperom, którzy budują aplikacje Electrona dostępu do nowych funkcji sieci web i JavaScript. W tym celu Electron 4 posiada główne przechylenia wersji do każdego z tych komponentów; Electron v4.0.0 zawiera Chromium `69. .3497.106`, Węzeł `10.11.0`i V8 `6.9.427.24`.

Ponadto Electron 4 zawiera zmiany w API specyficznym dla elektronów. Podsumowanie głównych zmian w Electron 4 poniżej; aby uzyskać pełną listę zmian, sprawdź [Electron v4. .0 uwagi o wydaniu](https://github.com/electron/electron/releases/tag/v4.0.0).

### Wyłączenie `zdalnego` modułu

Teraz masz możliwość wyłączenia modułu `zdalne` ze względów bezpieczeństwa. Moduł może być wyłączony dla tagów `BrowserWindow`i `przeglądarki internetowej`:

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Zobacz dokumentację [BrowserWindow](https://electronjs.org/docs/api/browser-window) i [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) aby uzyskać więcej informacji.

### Filtrowanie `remote.require()` / `remote.getGlobal()` Żądania

Ta funkcja jest przydatna, jeśli nie chcesz całkowicie wyłączyć modułu `zdalne` w procesie renderowania lub `widoku web` ale potrzebujesz dodatkowej kontroli, nad którymi moduły mogą być wymagane przez `zdalne. Wyposaż się w`.

Gdy moduł jest wymagany przez `zdalnie. saldo` w procesie renderowania, `zdalnie wymagane` zdarzenie jest podniesione w module [`app`](https://electronjs.org/docs/api/app). Możesz zadzwonić do `event.preventDefault()` na wydarzeniu (pierwszy argument), aby zapobiec załadowaniu modułu. [`WebContents` instancja](https://electronjs.org/docs/api/web-contents) , gdzie wymaganie pojawiło się jest przekazywane jako drugi argument, a nazwa modułu jest przekazywana jako trzeci argument. To samo wydarzenie jest również emitowane na przykład `WebContents` ale w tym przypadku jedynymi argumentami są wydarzenie i nazwa modułu. W obu przypadkach można zwrócić niestandardową wartość poprzez ustawienie wartości `event.returnValu`.

```javascript
// Kontrola `remote.require` z wszystkich WebContents:
app.on('remote-require', funkcja (zdarzenie, webContents, requestedModuleName) {
  // ...
})

// Control `remote.require` z określonej instancji WebContent:
browserWin.webContents.on('remote-require', funkcja (zdarzenie, requestedModuleName) {
  // ...
})
```

W podobny sposób, kiedy wywołany jest `remote.getGlobal(name)` zdarzenie `remote-get-global` jest podnoszone. Działa to tak samo jak `zdalne` zdarzenie: wywołanie `zapobiega Default()` , aby zapobiec powrotowi globu, i ustaw `zdarzenie. eturnValue` aby zwrócić niestandardową wartość.

```javascript
// Kontroluj `remote.getGlobal` z wszystkich WebContents:
app.on('remote-get-global', funkcja (zdarzenie, webContents, requrestedGlobalName) {
  // ...
})

// Kontroluj `remote.getGlobal` z konkretnej instancji WebContents:
browserWin.webContents.on('remote-get-global', funkcja (zdarzenie, requestedGlobalName) {
  // ...
})
```

Więcej informacji można znaleźć w następującej dokumentacji:

* [`Wymagany zdalny`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`Zawartość stron internetowych`](https://electronjs.org/docs/api/web-contents)

### Dostęp JavaScript do Panelu O

Na macOS możesz teraz zadzwonić do aplikacji `. howAboutPanel()` aby programowo pokazać panel About tak jak kliknięcie na pozycję menu utworzoną przez `{role: 'about'}`. Zobacz [`pokaż` dokumentację](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) aby uzyskać więcej informacji

### Kontrolowanie `zawartości sieci WebContents` Tło

`WebContents` instancje mają teraz metodę `setBackgroundThrottling(dozwoloną)` aby włączyć lub wyłączyć ograniczanie timerów i animacji, gdy strona jest cofnięta.

```javascript
let wygraj = nowa przeglądarka Window(...)
win.webContents.setBackgroundThrottling(enableBackgroundThrottling)
```

Zobacz [dokumentację `setBackgroundThrottling`](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) , aby uzyskać więcej informacji.

## Breaking Changes

### Brak więcej wsparcia macOS 10.9

Chromium nie obsługuje już macOS 10.9 (OS X Mavericks), a w rezultacie [Electron 4.0 i więcej nie obsługuje również](https://github.com/electron/electron/pull/15357).

### Blokowanie pojedynczej instancji

Poprzednio aby aplikacja stała się pojedynczą aplikacją instancyjną (upewnij się, że tylko jedna instancja aplikacji działa w danym czasie), możesz użyć aplikacji `. metoda akeSingleInstance()`. Począwszy od Electron 4.0, zamiast tego musisz użyć `app.requestSingleInstanceLock()`. Zwrócona wartość tej metody wskazuje, czy ta instancja aplikacji pomyślnie uzyskała blokadę. Jeśli nie udało się uzyskać blokady, możesz założyć, że inna instancja aplikacji jest już uruchomiona z blokadą i natychmiast wyjdź.

Na przykład używanie `requestSingleInstanceLock()` i informacji o zróżnicowanym zachowaniu na różnych platformach, [zobacz dokumentację dla `aplikacji. equestSingleInstanceLock()` i powiązane metody](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) i [zdarzenie `second-instance`](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Podczas tworzenia natywnych modułów dla windowów, zmienna `win_delay_load_hook` w `binding.gyp` modułu musi być prawdziwa (co jest domyślnie). Jeśli ten hak nie jest obecny, moduł natywny nie będzie załadowany na Windows, z komunikatem o błędzie takim jak `Nie można znaleźć modułu`. [Zobacz natywny poradnik modułu](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) , aby uzyskać więcej informacji.

## Deprekacje

Następujące zmiany przełomowe są planowane dla Electron 5.0, a zatem są przestarzałe w Electron 4.0.

### Integracja Node.js wyłączona dla `nativeWindowOpen`-ed Windows

Począwszy od Electron 5.0, okna podrzędne otwarte za pomocą opcji `nativeWindowOpen` zawsze będą wyłączone integracje Node.js.

### `webPreferences` Wartości domyślne

Podczas tworzenia nowej opcji `BrowserWindow` z ustawieniami `webPreferencje` Następujące `ustawienia webPreferencje` są przestarzałe na korzyść nowych ustawień domyślnych wymienionych poniżej:

<div class="table table-ruled table-full-width">

| Właściwość | Przestarzała domyślna | Nowa domyślna |
|----------|---------------------|
| `contextIsolation` | `false` | `true` |
| `nodeIntegration` | `true` | `false` |
| `webviewTag` | wartość `nodeIntegration`, w przeciwnym razie `true` | `false` |

</div>

Uwaga: jest obecnie [znany błąd (#9736)](https://github.com/electron/electron/issues/9736) , który uniemożliwia działanie tagu `widoku internetowego` jeśli `jest włączona izolacja kontekstowa`. Bądź na bieżąco na GitHub w celu uzyskania aktualnych informacji!

Dowiedz się więcej o izolacji kontekstowej, integracji węzła i tagu `widoku internetowego` w [dokumencie bezpieczeństwa Electrona](https://electronjs.org/docs/tutorial/security).

Electron 4.0 nadal będzie używać domyślnych ustawień, ale jeśli nie podasz dla nich wyraźnej wartości, zobaczysz ostrzeżenie o deprekacji. Aby przygotować swoją aplikację do Electron 5.0, użyj wyraźnych wartości dla tych opcji. [Zobacz dokumentację `BrowserWindow`](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) po szczegóły dotyczące każdej z tych opcji.

### `webContents.findInPage(text[, options])`

Opcje `medialCapitalAsWordStart` i `wordStart` zostały przestarzałe, ponieważ zostały usunięte przed strumieniem.

## Program Feedbacku Aplikacji

[App Feedback Program](https://electronjs.org/blog/app-feedback-program) , który uruchomiliśmy podczas rozwoju Electron 3. zakończył się sukcesem, więc kontynuowaliśmy to również podczas rozwoju 4.0. Chcielibyśmy przekazać ogromne podziękowania dla Atlassian, Discord, MS Teams, OpenFin, Slack, Symfonia, WhatsApp i inni członkowie programu za ich zaangażowanie w czasie 4. cykl beta. Aby dowiedzieć się więcej o programie opinii aplikacji i wziąć udział w przyszłych betach, [sprawdź nasz wpis na blogu dotyczący programu](https://electronjs.org/blog/app-feedback-program).

## Co dalej

W perspektywie krótkoterminowej możesz się spodziewać, że zespół będzie nadal skupiał się na rozwijaniu głównych komponentów, które tworzą Electron, w tym chrom, węzeł i V8. Chociaż uważamy, aby nie składać obietnic dotyczących dat wydania, nasz plan jest wydawaniem nowych głównych wersji Electrona z nowymi wersjami tych komponentów w przybliżeniu co kwartał. [Zobacz nasz dokument wersji](https://electronjs.org/docs/tutorial/electron-versioning) , aby uzyskać bardziej szczegółowe informacje na temat wersji w Electron.

Aby uzyskać informacje na temat planowanych zmian w nadchodzących wersjach Electrona, [zobacz nasze planowane zmiany](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
