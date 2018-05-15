# Electron FAQ

## Dlaczego mam problemy z zainstalowaniem elektronu?

Uruchomiając komendę `npm install electron`, niewielka część użytkowników czasami napotyka na błędy instalacji.

W większości przypadków, błędy te są wynikiem problemów z połączeniem internetowym, a nie błędami pakietu `electron`. Błędy typu `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` są objawami tego typu błędów z połączeniem. The best resolution is to try switching networks, or wait a bit and try installing again.

Możesz także spróbować pobrać Electrona bezpośrednio z [electron/electron/releases](https://github.com/electron/electron/releases), jeśli instalacja poprzez `npm` zawodzi.

## Kiedy Electron zostanie zaktualizowany do najnowszej wersji Chrome?

Wersja Chrome w bibliotece Electron jest zazwyczaj aktualizowana 1 lub 2 tygodnie po wydaniu nowej, stabilnej wersji Chrome. Nie możemy jednak zagwarantować, iż zostanie to wykonane w powyższym czasie i zależy to głównie od nakładu pracy, jaki będziemy musieli włożyć przy aktualizacji.

Tylko stabilny kanał Chrome jest używany. Jeśli ważna naprawa jest w fazie beta lub kanale dev, zostanie backportowana.

Aby uzyskać więcej informacji zobacz [wprowadzenie do zabezpieczeń](tutorial/security.md).

## Kiedy Electron zostanie zaktualizowany do najnowszej wersji Node.js?

Kiedy zostanie wydana nowa wersja Node.js, zazwyczaj czekamy około miesiąc przed wprowadzeniem jej do Electron. Dzięki temu jesteśmy wstanie zapobiec styczności z błędami z nowej wersji Node.js, a takowe występują bardzo często.

Nowe funkcje Node.js są zazwyczaj wdrażane przez aktualizacje V8, dlatego, że Electron używa V8 wydanej przez Przeglądarkę Chrome, nowe funkcje języka JavaScript są zazwyczaj już wdrożone w Electron.

## Jak udostępniać dane między stronami internetowymi?

Aby udostępniać dane między stronami internetowymi (procesy renderowania) najlepiej jest użyć HTML5 API, które są dostępne w przeglądarkach. Dobrymi kandydatami są [pamięć API](https://developer.mozilla.org/en-US/docs/Web/API/Storage),[`lokalnaPamięć`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`Pamięć sesji`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), i [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Lub możesz użyć systemu IPC, wyszczególnionego dla Electronu, aby przechowywać obiekty w głównym procesie jako zmienna globalna, a potem by uzyskać do nich dostęp z renderowania za pomocą modułu `zdalna`właściwość`electron`:

```javascript
// W procesie głównym.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// Na stronie 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// Na stronie 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Okno/pole mojej aplikacji zniknęło po kilku minutach.

Ma to miejsce w przypadku, gdy zmienna używana do przechowywania okna/pola jest poddawana automatycznej dealokacji.

Jeśli wystąpi ten problem, poniższe artykuły mogą okazać się pomocne:

* [Zarządzanie pamięcią](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Zakres Zmiennej](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Jeśli chcesz szybkiej naprawy, możesz zglobalizować zmienne poprzez zmianę kodu z tego:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

do tego:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Nie mogę użyć jQuery/RequireJS/Meteor/AngularJS w Electron-ie.

Ze względu na integrację Node.js Electronu, występują pewne dodatkowe symbole wstawione do modelu DOM, takie jak `module`, `exports`, `require`. To tworzy problemy dla niektórych bibliotek ponieważ chcą one wstawić symbole z tymi samymi nazwami.

Aby to rozwiązać, możesz wyłączyć integrację node w Electron:

```javascript
// W głównym procesie.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Lecz jeśli chcesz zachować możliwości używania Node.js i Electron API, musisz zmienić nazwę symboli na stronie zanim zawrzesz inne biblioteki:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` jest niezdefiniowane.

Gdy używasz wbudowanego modułu Electron możesz spotkać się z takim błędem:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Jest tak ponieważ zainstalowany jest [npm `electron` module](https://www.npmjs.com/package/electron) albo lokalnie, albo globalnie, co przejmuje pierwszeństwo nad wbudowanymi modułami Electronu.

Aby zweryfikować to, czy używasz właściwego modułu wbudowanego, możesz wydrukować ścieżkę modułu `electron`:

```javascript
console.log(require.resolve('electron'))
```

a następnie sprawdź, czy występuje w następującej postaci:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Jeśli jest to coś takiego jak `node_modules/electron/index.js`, to musisz albo usunąć moduł npm `electron`, albo zmienić jego nazwę.

```sh
npm uninstall electron
npm uninstall -g electron
```

Jednak jeśli pomimo użycia wbudowanego modułu wciąż występuje ten błąd, bardzo prawdopodobnym jest to, że używasz modułu w niewłaściwym procesie. Na przykład `electron.app` może być używany tylko w głównym procesie, podczas gdy `electron.webFrame` dostępny jest tylko w procesach renderowania.