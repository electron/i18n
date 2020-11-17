# Web osadza się w Electron

Jeśli chcesz osadzić (osoby trzecie) zawartość strony w przeglądarce `Electron`, dostępne są trzy opcje: `<iframe>` tagów, `<webview>` tagów i `Przeglądarki`. Każdy z nich oferuje nieco inne funkcje i jest przydatny w różnych sytuacjach. Aby pomóc Ci wybrać między nimi, w niniejszym przewodniku wyjaśnione zostaną różnice i możliwości każdego z nich.

## Iramki

Iframy w Electron zachowują się jak iframes w regularnych przeglądarkach. Element `<iframe>` na twojej stronie może pokazywać zewnętrzne strony internetowe, pod warunkiem że ich [Polityka bezpieczeństwa zawartości](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) na to pozwala. Aby ograniczyć możliwości witryny w znaczniku `<iframe>` , rekomendowane jest użycie atrybutu [`sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) i tylko zezwól na możliwości, które chcesz wspierać.

## WebViews

[Widoki sieciowe](../api/webview-tag.md) opierają się na widokach sieciowych Chromium i nie są wyraźnie obsługiwane przez Electron. Nie gwarantujemy, że WebView API pozostanie dostępne w przyszłych wersjach Electrona. Dlatego jeśli chcesz użyć tagów `<webview>` , musisz ustawić `tag przeglądarki internetowej` na `true` w `webPreferences` z `BrowserWindow`.

WebViews to niestandardowy element (`<webview>`), który będzie działać tylko wewnątrz Electron. Są one wdrażane jako „iframe” nieobjęte procesem. Oznacza to, że wszelka komunikacja z `<webview>` odbywa się asynchronicznie za pomocą IPC. Element `<webview>` ma wiele niestandardowych metod i zdarzeń, podobna do `zawartości webContents`, które umożliwiają znacznie większą kontrolę nad zawartościami.

W porównaniu z `<iframe>`, `<webview>` zazwyczaj jest nieco wolniejszy, ale oferuje znacznie większą kontrolę nad wczytywaniem i komunikowaniem się z treściami stron trzecich oraz obsługą różnych wydarzeń.

## Widoki przeglądarek

[BrowserViews](../api/browser-view.md) nie jest częścią DOM - zamiast tego są one tworzone i kontrolowane przez Twój główny proces. Są one po prostu kolejną warstwą zawartości stron internetowych na Twoim istniejącym oknie. Oznacza to, że są one całkowicie oddzielone od twojej `BrowserWindow` i że ich pozycja nie jest kontrolowana przez DOM lub CSS, ale przez ustawienie granic w głównym procesie.

Widoki przeglądarki oferują największą kontrolę nad ich treścią, ponieważ implementują `webContents` podobnie jak implementuje go `BrowserWindow`. Nie są one jednak częścią Twojego DOM, ale są nakładane na siebie, co oznacza, że będziesz musiał ręcznie zarządzać ich pozycją.
