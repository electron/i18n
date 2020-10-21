# Electron FAQ

## Dlaczego mam problemy z instalacją Electrona?

Wywołując polecenie `npm install electron`, niektórzy użytkownicy napotykają okazjonalne błędy instalacji.

W więkoszości przypadków, błędy są efektem problemów z połączeniem internetowym, a nie błędami pakietu `electron`. Błędy typu `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, i`ETIMEDOUT` są efeketem problemów z połączeniem internetowym. Najlepszym rozwiązaniem jest próba zmiany sieci lub odczekanie chwili i ponowienie próby instalacji.

Możesz także spróbować pobrać Electrona bezpośrednio z [electron/electron/releases](https://github.com/electron/electron/releases), jeśli instalacja poprzez `npm` zawodzi.

## Kiedy Electron zostanie zaktualizowany do najnowszej wersji Chrome?

Wersja Chrome w bibliotece Electron jest zazwyczaj aktualizowana 1 lub 2 tygodnie po wydaniu nowej, stabilnej wersji Chrome. Nie możemy jednak zagwarantować, iż zostanie to wykonane w powyższym czasie, gdyż zależy to głównie od nakładu pracy, jaki będziemy musieli włożyć przy aktualizacji.

Używany jest tylko stały kanał Chrome. Jeśli ważna korekta jest w kanale beta lub dev , będziemy go zapisywać.

Aby uzyskać więcej informacji zobacz [wprowadzenie do zabezpieczeń](tutorial/security.md).

## Kiedy Electron zostanie zaktualizowany do najnowszej wersji Node.js?

Kiedy zostanie wydana nowa wersja Node.js, zazwyczaj czekamy około miesiąc przed wprowadzeniem jej do Electrona. Dzięki temu jesteśmy wstanie zapobiec styczności z błędami z nowej wersji Node.js, a takowe występują bardzo często.

Nowe funkcje Node.js są zazwyczaj wdrażane przez aktualizacje silnika V8, dlatego, iż Electron używa silnika V8 wydawanego przez Przeglądarkę Chrome, nowe funkcje języka JavaScript są zazwyczaj już wdrożone w Electronie.

## Jak udostępniać dane między stronami internetowymi?

Aby udostępniać dane między stronami internetowymi (procesy renderowania) najlepiej jest użyć HTML5 API, które są dostępne w przeglądarkach. Dobrymi kandydatami są [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage),[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), i [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Alternatywnie można użyć prymitywów IPC dostarczanych przez Electron. Aby dzielić się danymi pomiędzy procesami głównymi i renderowanymi, możesz użyć modułów [`ipcMain`](api/ipc-main.md) i [`ipcRenderer`](api/ipc-renderer.md) Aby komunikować się bezpośrednio między stronami internetowymi, możesz wysłać [`Port Wiadomości`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) z jednego do drugiego, ewentualnie przez główny proces przy użyciu [`ipcRenderer. ostMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Kolejna komunikacja nad portami wiadomości jest bezpośrednia i nie oddziela się przez głównego procesu.

## Okno/pole mojej aplikacji zniknęło po kilku minutach.

Ma to miejsce w przypadku, gdy zmienna używana do przechowywania pola jest poddawana automatycznej dealokacji.

Jeśli wystąpi ten problem, poniższe artykuły mogą okazać się pomocne:

* [Zarządzanie pamięcią](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Zakres Zmiennej](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Jeśli chcesz szybkiej łatki, możesz zglobalizować zmienne poprzez zmianę kodu z tego:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

do tego:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Nie mogę użyć jQuery/RequireJS/Meteor/AngularJS w Electronie.

Ze względu na integrację Node.js z Electron, występują pewne dodatkowe symbole wstawione do modelu DOM, takie jak `module`, `exports`, `require`. Tworzy to problemy dla niektórych bibliotek ponieważ chcą one wstawić symbole z tymi samymi nazwami.

Aby to rozwiązać, możesz wyłączyć integrację node w Electronie:

```javascript
//W głównym procesie.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Lecz jeśli chcesz zachować możliwości używania Node.js i Electron API, musisz zmienić nazwę symboli na stronie zanim dodasz inne biblioteki:

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

## Nie zdefiniowano `require('electron').xxx`.

Gdy używasz wbudowanego modułu Electron możesz spotkać się z takim błędem:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Jest bardzo prawdopodobne, że używasz modułu w niewłaściwym procesie. Na przykład `electron.app` może być używany tylko w głównym procesie, podczas gdy `electron.webFrame` dostępny jest tylko w procesach renderowania.

## Czcionka wygląda na rozmazaną, co to jest i jak to naprawić?

Jeśli [antyaliasing podpikseli](http://alienryderflex.com/sub_pixel/) jest wyłączony, czcionki na ekranach LCD mogą wyglądać na rozmyte. Przykład:

![przykład renderowania subpikseli](images/subpixel-rendering-screenshot.gif)

Antyaliasing subpikseli wymaga nieprzezroczystego tła warstwy zawierającej tekst. (Zobacz [ problem ](https://github.com/electron/electron/issues/6344#issuecomment-420371918) by dowiedzieć się więcej).

Aby osiągnąć oczekiwany wynik, ustaw właściwość background w konstruktorze [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

Efekt jest widoczny tylko na (części?) ekranach LCD. Nawet jeśli nie widzisz różnicy, niektórzy z Twoich użytkowników mogą. Najlepiej zawsze ustawiać tło w ten sposób, chyba że mają państwo powody, aby tego nie robić.

Zauważ, że sama zmiana tła w CSS nie przyniesie oczekiwanego efektu.
