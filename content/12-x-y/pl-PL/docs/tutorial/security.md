# Bezpieczeństwo, zdolności rodzime i Twoja odpowiedzialność

Jako twórcy stron internetowych, zwykle korzystamy z silnej sieci zabezpieczeń przeglądarki - zagrożenia związane z kodem, który zapisujemy są stosunkowo niewielkie. Nasze strony mają ograniczone uprawnienia w piaskownicy. i wierzymy, że nasi użytkownicy korzystają z przeglądarki zbudowanej przez duży zespół inżynierów, który jest w stanie szybko zareagować na nowo odkryte zagrożenia dla bezpieczeństwa.

Podczas pracy z Electronem ważne jest, aby zrozumieć, że Electron nie jest przeglądarką internetową. Pozwala to na budowanie aplikacji stacjonarnych bogatych w funkcje dzięki znanym technologiom sieciowym, ale Twój kod daje znacznie większą moc. JavaScript może uzyskać dostęp do systemu plików, powłoki użytkownika i innych. Pozwala to zbudować wysokiej jakości natywne aplikacje, ale nieunikniona skala ryzyka bezpieczeństwa z dodatkowymi uprawnieniami przyznanymi kodowi.

Mając to na uwadze, mieć świadomość, że wyświetlanie arbitralnych treści z niezaufanych źródeł stwarza poważne zagrożenie bezpieczeństwa, którego nie zamierza obawiać się Electron. W rzeczywistości najpopularniejsze aplikacje Electrona (Atom, Slack, Visual Studio Code, itp.) wyświetlają głównie lokalne treści (lub zaufane, bezpieczna zawartość zdalna bez integracji węzła – jeśli aplikacja wykonuje kod ze źródła online, jest Twoim obowiązkiem zapewnienia, że kod nie jest złośliwy.

## Zgłaszanie Problemów z Bezpieczeństwem

Aby uzyskać informacje na temat właściwego ujawnienia wrażliwości Electrona, zobacz [BEZPIECZEŃSTWO.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Problemy z Bezpieczeństwem i Aktualizacje Chromium

Electron aktualizuje się na bieżąco z naprzemiennymi wydaniami Chromium. Aby uzyskać więcej informacji, zobacz wpis [Electron Release Cadence na blogu](https://electronjs.org/blog/12-week-cadence).

## Bezpieczeństwo to odpowiedzialność wszystkich

Należy pamiętać, że bezpieczeństwo Twojej aplikacji Electron jest wynikiem ogólnego bezpieczeństwa fundacji frameworka (*Chromium*, *Węzeł. s*), Electrona, wszystkie zależności NPM i twój kod. W związku z tym Twoim obowiązkiem jest przestrzeganie kilku ważnych najlepszych praktyk:

* **Aktualizuj swoją aplikację z najnowszą wersją Electron framework.** Wysyłasz również pakiet złożony z Electron, biblioteki udostępnionej przez Chromium i Node.js. Zagrożenia dotyczące tych składników mogą mieć wpływ na bezpieczeństwo aplikacji. Aktualizując Electron do najnowszej wersji , upewnisz się, że krytyczne słabości (takie jak *nodeIntegration bypass*) są już zainstalowane i nie mogą być wykorzystywane w aplikacji. Aby uzyskać więcej informacji, zobacz "[Użyj bieżącej wersji Electron](#17-use-a-current-version-of-electron)".

* **Oceń swoje zależności.** Podczas gdy NPM dostarcza pół miliona pakietów wielokrotnego użytku, Twoim obowiązkiem jest wybór zaufanych bibliotek firm zewnętrznych. Jeśli używasz przestarzałych bibliotek dotkniętych znanymi słabościami lub polegasz na słabo utrzymanym kodzie, bezpieczeństwo aplikacji może być zagrożone.

* **Przyjęcie bezpiecznych praktyk kodowania.** Pierwsza linia obrony aplikacji to twój własny kod. powszechne luki w sieciach, takie jak Skryptowanie Cross-Site (XSS), ma większy wpływ na bezpieczeństwo aplikacji Electron, dlatego też zaleca się przyjęcie bezpiecznych najlepszych praktyk w zakresie opracowywania oprogramowania i przeprowadzanie testów bezpieczeństwa.

## Izolacja dla niezaufanych treści

Problem bezpieczeństwa istnieje za każdym razem, gdy otrzymasz kod z niezaufanego źródła (np. zdalnego serwera) i wykonaj go lokalnie. As an example, consider a remote website being displayed inside a default [`BrowserWindow`][browser-window]. Jeśli atakujący w jakiś sposób potrafi zmienić wspomnianą zawartość (albo poprzez bezpośrednie atakowanie źródła , lub siedząc pomiędzy aplikacją a rzeczywistym miejscem docelowym), będzie mógł wykonać natywny kod na komputerze użytkownika.

> :warning: W żadnym wypadku nie powinieneś załadować i wykonywać zdalnego kodu z włączoną integracją Node.js. Zamiast tego używaj tylko plików lokalnych (spakowanych razem z aplikacją) aby wykonać kod Node.js. To display remote content, use the [`<webview>`][webview-tag] tag or [`BrowserView`][browser-view], make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Ostrzeżenia bezpieczeństwa Electrona

Od Electron 2.0 deweloperzy zobaczą ostrzeżenia i rekomendacje wydrukowane do konsoli deweloperskiej. Pokazują się tylko wtedy, gdy binarną nazwą jest Electron, wskazując, że deweloper aktualnie patrzy na konsolę.

Możesz wymusić lub wymusić wyłączenie tych ostrzeżeń, ustawiając `ELECTRON_ENABLE_SECURITY_WARNINGS` lub `ELECTRON_DISABLE_SECURITY_WARNINGS` na albo `proces. nv` lub obiekt `okno`.

## Lista kontrolna: Zalecenia dotyczące bezpieczeństwa

Powinieneś przynajmniej wykonać te kroki, aby zwiększyć bezpieczeństwo aplikacji:

1. [Ładuj tylko bezpieczną zawartość](#1-only-load-secure-content)
2. [Wyłącz integrację Node.js we wszystkich renderowach, które wyświetlają zdalne treści](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Włącz izolację kontekstową we wszystkich odtwarzaczach, które wyświetlają zdalne treści](#3-enable-context-isolation-for-remote-content)
4. [Użyj `ses.setPermissionRequestHandler()` we wszystkich sesjach, które ładują zdalne treści](#4-handle-session-permission-requests-from-remote-content)
5. [Nie wyłączaj `WebSecurity`](#5-do-not-disable-websecurity)
6. [Zdefiniuj `Content-Security-Policy`](#6-define-a-content-security-policy) i użyj restrykcyjnych reguł (tj. `script-src 'self'`)
7. [Nie ustawiaj `allowRunningInsecureContent` na `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Nie włączaj funkcji eksperymentalnych](#8-do-not-enable-experimental-features)
9. [Nie używaj `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Nie używaj `dozwolonych okienek`](#10-do-not-use-allowpopups)
11. [`<webview>`: Zweryfikuj opcje i parametry](#11-verify-webview-options-before-creation)
12. [Wyłącz lub ogranicz nawigację](#12-disable-or-limit-navigation)
13. [Wyłącz lub ogranicz tworzenie nowych okien](#13-disable-or-limit-creation-of-new-windows)
14. [Nie używaj `openExternal` z niezaufanymi treściami](#14-do-not-use-openexternal-with-untrusted-content)
15. [Wyłącz moduł `zdalne`](#15-disable-the-remote-module)
16. [Filtruj moduł `zdalne`](#16-filter-the-remote-module)
17. [Użyj bieżącej wersji Electron](#17-use-a-current-version-of-electron)

Aby zautomatyzować wykrywanie nieprawidłowych konfiguracji i niezabezpieczonych wzorów, można użyć [elektronegatywności](https://github.com/doyensec/electronegativity). dodatkowe szczegóły dotyczące potencjalnych słabości i błędów implementacji podczas tworzenia aplikacji przy użyciu Electrona, zapoznaj się z tym [przewodnikiem dla deweloperów i audytorów](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Tylko ładuj bezpieczną zawartość

Wszelkie zasoby nieuwzględnione w aplikacji powinny być załadowane przy użyciu bezpiecznego protokołu, takiego jak `HTTPPS`. Innymi słowy, nie używaj niezabezpieczonych protokołów takich jak `HTTP`. Podobnie, zalecamy użycie `WSS` przez `WS`, `FTPS` ponad `FTP`i tak dalej.

### Dlaczego?

`HTTPS` ma trzy główne zalety:

1) Uwierzytelnia zdalny serwer, upewniając się, że aplikacja łączy się z prawidłowym hostem zamiast z podszyciem się. 2) Zapewnia integralność danych, potwierdzając, że dane nie zostały zmodyfikowane, podczas tranzytu pomiędzy aplikacją a hostem. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### Jak?

```js
// Źle
browserWindow.loadURL('http://example.com')

// Dobrze
browserWindow.loadURL('https://example.com')
```

```html<!-- Źle --><script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css"><!-- Dobrze --><script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Nie włączaj integracji Node.js dla zdalnej zawartości

_Ta rekomendacja jest domyślnym zachowaniem Electron od 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) that loads remote content. Celem jest ograniczenie uprawnień, które przyznasz zdalnej zawartości, w ten sposób dramatycznie utrudnianie atakującemu uszkodzenie twoich użytkowników, jeśli zyskają możliwość wykonania JavaScript na twojej stronie.

Następnie możesz przyznać dodatkowe uprawnienia dla określonych hostów. Na przykład jeśli otwierasz okno przeglądarki wskazane na `https://. om/`, możesz podać tej stronie dokładnie potrzebne umiejętności, ale nie więcej.

### Dlaczego?

Atak typu cross-site-scripting (XSS) jest bardziej niebezpieczny, jeśli atakujący może wyjść z procesu renderowania i wykonać kod na komputerze użytkownika. Ataki transkrypcyjne w różnych witrynach są dość powszechne - i są problemem, ich moc jest zazwyczaj ograniczona do przesyłania wiadomości na stronie internetowej, na której są wykonywane. Wyłączenie integracji Node.js pomaga zapobiec przenikaniu XSS do tak zwanego "Wykonania zdalnego kodu" (RCE).

### Jak?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html<!-- Źle --><webview nodeIntegration src="page.html"></webview><!-- Dobrze --><webview src="page.html"></webview>
```

Po wyłączeniu integracji Node.js, nadal możesz ujawnić API swojej stronie internetowej, która zużywa moduły Node.js lub funkcje. Wstępne ładowanie skryptów nadal ma dostęp do `wymaga` i innych węzłów s funkcje, pozwalając programistom na ujawnienie niestandardowego API do zdalnie załadowanej zawartości.

W poniższym przykładzie wstępne załadowanie skryptu, później załadowana strona internetowa będzie miała dostęp do metody `window.readConfig()` , ale nie ma żadnych funkcji Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Włącz izolację kontekstową dla zawartości zdalnej

Izolacja kontekstowa jest funkcją Electron, która pozwala programistom na uruchamianie kodu w skryptach wstępnego ładowania oraz w API Electron w dedykowanym kontekście JavaScript. W praktyce oznacza to, że globalne obiekty takie jak `Array.prototype. push` lub `JSON.parse` nie może być modyfikowany przez skrypty działające w procesie renderowania.

Electron używa tej samej technologii co [Skrypty Treści](https://developer.chrome.com/extensions/content_scripts#execution-environment) Chromium.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

### Czemu & Jak?

Aby uzyskać więcej informacji na temat `izolacji kontekstu` i jak ją włączyć, zobacz nasz dedykowany [izolacja kontekstowa](context-isolation.md) dokument.

## 4) Obsługa wniosków o uprawnienia sesji ze zdalnej zawartości

Możesz widzieć żądania uprawnień podczas korzystania z Chrome: Wyskakują one za każdym razem, gdy strona próbuje użyć funkcji, którą użytkownik musi ręcznie zatwierdzić ( jak powiadomienia).

API opiera się na [uprawnieniach Chromium API](https://developer.chrome.com/extensions/permissions) i implementuje te same typy uprawnień.

### Dlaczego?

Domyślnie Electron automatycznie zatwierdzi wszystkie żądania uprawnień, chyba że programista ręcznie skonfigurował niestandardowy uchwyt. Podczas gdy solidny domyślny, deweloperzy świadomi bezpieczeństwa mogą chcieć przyjąć coś zupełnie przeciwnego.

### Jak?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  . etPermissionRequestHandler(webContents, permission, callback) => {
    const url = webContents. etURL()

    if (permission === 'notifications') {
      // Zatwierdza żądanie uprawnień
      callback(true)
    }

    // Sprawdź adres URL
    jeśli (! rl. tartsWith('https://example. om/')) {
      // Odmowa zezwolenia
      return callback(false)
    }
})
```

## 5) Nie wyłączaj WebSecurity

_Rekomendacja jest domyślna Electrona_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) disables crucial security features.

Nie wyłączaj `WebSecurity` w aplikacjach produkcyjnych.

### Dlaczego?

Wyłączenie `webSecurity` wyłączy politykę tego samego pochodzenia i ustaw `zezwalajRunningInsecureContent` na `true`. Innymi słowy, umożliwia wykonywanie niezabezpieczonego kodu z różnych domen.

### Jak?

```js
// Źle
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Dobrze
const mainWindow = new BrowserWindow()
```

```html<!-- Źle --><webview disablewebsecurity src="page.html"></webview><!-- Dobrze --><webview src="page.html"></webview>
```

## 6) Zdefiniowanie polityki bezpieczeństwa treści

Polityka bezpieczeństwa treści (CSP) to dodatkowa warstwa ochrony przed atakami skryptującymi i atakami wtryskowymi danych. Zalecamy włączenie przez każdą stronę internetową, którą ładujesz wewnątrz Electron.

### Dlaczego?

CSP pozwala na ograniczenie i kontrolowanie zasobów serwera obsługującego treść Electron może załadować dla tej strony internetowej. `https://example.com` powinien mieć możliwość ładowania skryptów ze zdefiniowanych przez Ciebie źródeł podczas skryptów z `https://evil. ttacker.com` nie może być uruchomiony. Definiowanie CSP jest prostym sposobem poprawy bezpieczeństwa aplikacji.

Poniższy CSP pozwoli Electron na wykonywanie skryptów z bieżącej strony oraz z `apis.example.com`.

```plaintext
// Źle
Content-Security-Policy: '*'

// Dobrze
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Nagłówek HTTP CSP

Electron szanuje [`Content-Security-Policy` nagłówek HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) który można ustawić za pomocą obsługi Electron [`webRequest.onHeadersRereceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest. nHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      . .details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\']
    }
  })
})
```

### CSP Meta Tag

Preferowanym mechanizmem dostawy CSP jest nagłówek HTTP, jednak nie jest możliwe użycie tej metody podczas ładowania zasobu przy użyciu protokołu `plik://`. może być przydatny w niektórych przypadkach, na przykład przy użyciu protokołu `file://` , aby ustawić regułę na stronie bezpośrednio w znaczniku `<meta>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Nie ustawiaj `zezwalajRunningInsecureContent` na `true`

_Rekomendacja jest domyślna Electrona_

Domyślnie Electron nie zezwoli na ładowanie stron internetowych przez `HTTPPS` i wykonuje skrypty, CSS lub wtyczki z niezabezpieczonych źródeł (`HTTP`). Ustawienie właściwość `Zezwól RunningInsecureContent` na `true` wyłącza tę ochronę.

Ładowanie początkowego HTML strony internetowej przez `HTTPS` i próba załadowania kolejnych zasobów przez `HTTP` jest również znane jako "mieszana zawartość".

### Dlaczego?

Ładowanie zawartości przez `HTTPS` zapewnia autentyczność i integralność załadowanych zasobów przy szyfrowaniu samego ruchu. Zobacz sekcję [wyświetla tylko bezpieczną zawartość](#1-only-load-secure-content) , aby uzyskać więcej informacji.

### Jak?

```js
// Źle
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Dobrze
const mainWindow = new BrowserWindow({})
```

## 8) Nie włączaj funkcji eksperymentalnych

_Rekomendacja jest domyślna Electrona_

Zaawansowani użytkownicy Electron mogą włączyć eksperymentalne funkcje Chromium za pomocą właściwości `eksperymentalFeatures`.

### Dlaczego?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Ponadto ich wpływ na Electron jako całość prawdopodobnie nie został przetestowany.

Uzasadnione użycie przypadków istnieje, ale chyba że wiesz co robisz, nie powinieneś włączyć tej właściwości.

### Jak?

```js
// Źle
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Dobrze
const mainWindow = new BrowserWindow({})
```

## 9) Nie używaj `enableBlinkFeatures`

_Rekomendacja jest domyślna Electrona_

Miganie jest nazwą silnika renderowania za pomocą Chromium. Podobnie jak w `experimentalFeatures`, właściwość `enableBlinkFeatures` pozwala programistom włączyć funkcje, które zostały domyślnie wyłączone.

### Dlaczego?

Ogólnie rzecz biorąc, prawdopodobnie istnieją uzasadnione powody, dla których funkcja nie została domyślnie włączona . Aby włączyć określone funkcje, należy korzystać z uzasadnionych przypadków. Jako deweloper, powinieneś dokładnie wiedzieć, dlaczego chcesz włączyć funkcję, jakie są skutki i jak ma to wpływ na bezpieczeństwo Twojej aplikacji. W nie powinieneś włączać funkcji spekulacyjnie.

### Jak?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Dobrze
const mainWindow = new BrowserWindow()
```

## 10) Nie używaj `dozwolonych okienek`

_Rekomendacja jest domyślna Electrona_

If you are using [`<webview>`][webview-tag], you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`][browser-window] using the `window.open()` method. `<webview>` tagi nie mogą tworzyć nowych okn.

### Dlaczego?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`][browser-window] by default. Jest to zgodne z zasadą minimalnie wymaganego dostępu: Nie pozwól stronie na tworzenie nowych wyskakujących okienek, chyba że wiesz, że ta funkcja jest potrzebna.

### Jak?

```html<!-- Źle --><webview allowpopups src="page.html"></webview><!-- Dobrze --><webview src="page.html"></webview>
```

## 11) Zweryfikuj opcje WebView przed utworzeniem

WebView utworzony w procesie renderowania, który nie ma włączonej integracji Node.js nie będzie w stanie sama włączyć integracji. Jednak WebView zawsze stworzy niezależny proces renderowania z własnymi `ustawieniami sieciowymi`.

It is a good idea to control the creation of new [`<webview>`][webview-tag] tags from the main process and to verify that their webPreferences do not disable security features.

### Dlaczego?

Skoro `<webview>` żyje w DOM, można je utworzyć za pomocą skryptu działającego na twojej stronie nawet jeśli Node. s integracja jest w przeciwnym razie wyłączona.

Electron umożliwia programistom wyłączenie różnych funkcji bezpieczeństwa, które kontrolują proces renderowania. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`][webview-tag] tags.

### Jak?

Before a [`<webview>`][webview-tag] tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Użyj wydarzenia, aby zapobiec tworzeniu `wyświetleń sieciowych` z potencjalnie niezabezpieczonymi opcjami.

```js
app.on('web-contents-created', (zdarzenie, zawartość) => {
  zawartość. n('will-attach-webview', (zdarzenie, ustawienia webPreferencje, params) => {
    // Usuń skrypty wstępnego ładowania jeśli nieużywane lub sprawdzenie ich lokalizacji jest zgodne z prawem
    usuń ustawienia webPreferencje. odśwież
    usuń ustawienia webPreferencje. reloadURL

    // Wyłącz integrację Node.js
    webPreferencje. Integracja węzła = fałsz

    // Zweryfikuj adres URL załadowany
    jeśli (!params. rc.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Ponownie, lista ta ogranicza jedynie do minimum ryzyko, nie usuwa go. Jeśli Twoim celem jest wyświetlenie strony internetowej, przeglądarka będzie bardziej bezpieczną opcją.

## 12) Wyłącz lub ogranicz nawigację

Jeśli twoja aplikacja nie ma potrzeby nawigowania lub tylko musi przejść do znanych stron, dobrym pomysłem jest bezwzględne ograniczenie nawigacji do tego znanego zakresu, uniemożliwiając wszelkim innym rodzajom nawigacji.

### Dlaczego?

Nawigacja jest wspólnym wektorem ataku. Jeśli atakujący może przekonać Twoją aplikację do opuszczenia bieżącej strony, mogą zmusić Twoją aplikację do otwarcia stron internetowych w Internecie. Nawet jeśli twój `webContents` jest skonfigurowany tak, aby był bardziej bezpieczny (np. `nodeIntegration` wyłączony lub `contextIsolation` włączony), uzyskanie aplikacji do otwarcia losowej strony internetowej znacznie ułatwi korzystanie z aplikacji .

Powszechny wzorzec ataku jest taki, że atakujący przekonuje użytkowników Twojej aplikacji do interakcji z aplikacją w taki sposób, aby przechodził do jednej z stron atakującego. Zwykle odbywa się to za pomocą linków, wtyczek lub innych treści generowanych przez użytkownika.

### Jak?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`][will-navigate] handler. Jeśli wiesz do których stron twoja aplikacja może się udać, sprawdź adres URL w obsłudze zdarzeń i pozwól na nawigację , jeśli pasuje do oczekiwanych adresów URL.

Zalecamy korzystanie z parsera Node dla adresów URL. Proste porównania ciągów znaków można czasami oszukać - test `startsWith('https://example.com')` pozwoliłby `https://example.com.attacker.com`.

```js
const URL = require('url').URL

app.on('web-contents-created', (zdarzenie, zawartość) => {
  zawartości. n('will-navigate', (zdarzenie, navigationUrl) => {
    const parsedUrl = new URL (navigationUrl)

    if (parsedUrl. rigin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Wyłącz lub ogranicz tworzenie nowych okien

Jeśli masz znany zestaw okien to dobry pomysł, aby ograniczyć tworzenie dodatkowych okien w aplikacji.

### Dlaczego?

Wiele takich jak nawigacja, tworzenie nowych `webContents` jest wspólnym atakiem wektorem. Atakujący próbują przekonać Twoją aplikację do tworzenia nowych okien, klatek lub innych procesów renderowania z większą ilością uprawnień niż poprzednio; lub z otwartymi stronami, których nie mogły otworzyć wcześniej.

Jeśli nie musisz tworzyć okien oprócz tych, które wiesz, że musisz utworzyć , wyłączenie twórcy kupuje trochę dodatkowego bezpieczeństwa za wszelką cenę. Zazwyczaj jest to przypadek aplikacji, które otwierają jeden `BrowserWindow` i nie muszą otwierać arbitralnej liczby dodatkowych okien w czasie pracy.

### Jak?

[`webContents`][web-contents] will delegate to its [window open handler][window-open-handler] before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) Nie używaj `openExternal` z niezaufanymi treściami

Shell's [`openExternal`][open-external] allows opening a given protocol URI with the desktop's native utilities. Na przykład w przypadku macOS ta funkcja jest podobna do `otwartej` komendy terminala i otworzy określoną aplikację na podstawie powiązania URI i typu plików.

### Dlaczego?

Improper use of [`openExternal`][open-external] can be leveraged to compromise the user's host. Gdy openExternal jest używany z niezaufanymi treściami, może być lewarowany, aby wykonywać dowolne polecenia.

### Jak?

```js
// Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
// Dobry
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Wyłącz moduł `zdalne`

Moduł `zdalny` umożliwia procesom renderowania dostęp do API zwykle dostępnych tylko w głównym procesie. Używając tego, renderer może wywoływać metody głównego obiektu procesu bez wyraźnego wysyłania wiadomości międzyprocesowych. Jeśli aplikacja pulpitowa nie uruchamia niezaufanej zawartości, może to być użyteczny sposób na dostęp do procesów renderowania i pracować z modułami dostępnymi tylko dla głównego procesu, takie jak moduły związane z GUI (dialogi, menu itp.).

However, if your app can run untrusted content and even if you [sandbox][sandbox] your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Dlatego powinien być wyłączony w takich okolicznościach.

### Dlaczego?

`remote` używa wewnętrznego kanału IPC do komunikowania się z głównym procesem. Ataki "prototyp zanieczyszczenia" mogą zapewnić szkodliwy dostęp do wewnętrznego kanału IPC, który może być następnie użyty do ucieczki piaskownicy poprzez mikrowanie `zdalnych` wiadomości IPC i uzyskanie dostępu do głównych modułów procesu działających z wyższymi uprawnieniami.

Dodatkowo, jest możliwe, aby wstępnie załadować skrypty przypadkowo wyciekające moduły do piaskowanego rendere'a. Wyciek `zdalny` złośliwy kod broni z wieloma głównymi modułami procesu, za pomocą których można wykonać atak.

Wyłączenie modułu `remote` eliminuje te wektory ataku. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### Jak?

```js
// Błędne, jeśli renderer może uruchomić niezaufaną zawartość
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Bad if the renderer can run untrusted content  -->
<webview enableremotemodule="true" src="page.html"></webview>

<!-- Good -->
<webview enableremotemodule="false" src="page.html"></webview>
```

> **Note:** The default value of `enableRemoteModule` is `false` starting from Electron 10. For prior versions, you need to explicitly disable the `remote` module by the means above.

## 16) Filtruj moduł `zdalne`

Jeśli nie możesz wyłączyć modułu `zdalne` , powinieneś filtrować globale, Node, i moduły Electron (tak zwane wbudowane) dostępne przez `zdalny` , których aplikacja nie wymaga. Można to zrobić poprzez całkowite zablokowanie niektórych modułów i zastąpienie innych serwerami proxy, które przedstawiają tylko funkcje, których potrzebuje twoja aplikacja.

### Dlaczego?

Ze względu na uprawnienia dostępu systemu do głównego procesu, funkcjonalność dostarczana przez główne moduły procesu może być niebezpieczna w rękach złośliwego kodu działającego w niebezpiecznym procesie renderowania. Ograniczając zestaw dostępnych modułów do minimum, jakiego potrzebuje twoja aplikacja i filtrowanie innych, zmniejszasz zestaw narzędzi, którego złośliwy kod może użyć do atakowania systemu.

Pamiętaj, że najbezpieczniejszą opcją jest [całkowicie wyłączenie zdalnego modułu](#15-disable-the-remote-module). Jeśli wybierzesz filtrowanie dostępu zamiast całkowicie wyłączyć moduł, musisz być bardzo ostrożny, aby upewnić się, że żadna eskalacja uprawnień nie jest możliwa przez moduły, na które pozwalasz przejść od filtra.

### Jak?

```js
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})
```

## 17) Użyj bieżącej wersji Electron

Powinieneś starać się zawsze korzystać z najnowszej dostępnej wersji Electron. Za każdym razem, gdy nowa główna wersja zostanie wydana, powinieneś spróbować zaktualizować aplikację tak szybko, jak to możliwe.

### Dlaczego?

Aplikacja zbudowana ze starszą wersją Electron, Chromium i Node. s jest celem łatwiejszym niż aplikacja, która używa nowszych wersji tych komponentów. Ogólnie rzecz biorąc, problemy związane z bezpieczeństwem i wykorzystywanie w starszych wersjach Chromium i Node.js są bardziej dostępne.

Zarówno Chromium jak i Node.js to imponujące fety inżynierii zbudowane przez tysięcy utalentowanych programistów. Ze względu na ich popularność ich bezpieczeństwo jest starannie testowane i analizowane przez równie wykwalifikowanych badaczy ds. bezpieczeństwa. Many of those researchers [disclose vulnerabilities responsibly][responsible-disclosure], which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Twoja aplikacja będzie bezpieczniejsza jeśli korzysta z najnowszej wersji Electron (a więc Chromium i Node. s) dla , dla których potencjalne kwestie bezpieczeństwa nie są tak powszechnie znane.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[sandbox]: ../api/sandbox-option.md
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
