# Przewodnik szybkiego startu

## Szybki start

Electron to framework, który umożliwia tworzenie aplikacji desktopowych za pomocą JavaScript, HTML i CSS. Aplikacje te mogą być następnie zapakowane bezpośrednio w macOS, Windows lub Linux, lub rozpowszechniane za pośrednictwem Mac App Store lub Microsoft Store.

Zazwyczaj tworzysz aplikację stacjonarną dla systemu operacyjnego (OS) przy użyciu specyficznych natywnych ram aplikacji każdego systemu operacyjnego. Electron umożliwia napisanie aplikacji przy użyciu technologii, które już znasz.

### Wymagania

Zanim przejdziesz do Electrona, musisz zainstalować [Node.js](https://nodejs.org/en/download/). We recommend that you install either the latest `LTS` or `Current` version available.

> Proszę zainstalować Node.js za pomocą wstępnie zbudowanych instalatorów dla swojej platformy. W przeciwnym razie możesz napotkać problemy z niezgodnością z różnymi narzędziami rozwoju.

Aby sprawdzić, czy Node.js został zainstalowany poprawnie, wpisz następujące polecenia w swoim kliencie terminala:

```sh
node -v
npm -v
```

Komendy powinny wydrukować wersje Node.js i npm. Jeśli obie komendy się powiodły, jesteś gotowy do zainstalowania Electron.

### Utwórz podstawową aplikację

Z perspektywy rozwoju aplikacja Electron jest zasadniczo aplikacją Node.js. Oznacza to, że punktem początkowym twojej aplikacji Electron będzie plik `package.json` , jak w każdej innej aplikacji Node.js. Minimalna aplikacja Electron ma następującą strukturę:

```plain
moj-electron-app/
↑ package.json
¾ main.js
<unk> <unk> <unk> <unk> <unk> index.html
```

Utwórzmy podstawową aplikację na podstawie powyższej struktury.

#### Install Electron

Utwórz folder dla swojego projektu i zainstaluj Electrona:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Utwórz główny plik skryptu

Główny skrypt określa punkt wejścia twojej aplikacji Electron (w naszym przypadku plik `main.js` ), która uruchomi główny proces. Zazwyczaj skrypt, który działa w głównym procesie, kontroluje cykl życia aplikacji, wyświetla graficzny interfejs użytkownika i jego elementy, wykonuje natywne interakcje z systemem operacyjnym i tworzy procesy renderowania na stronach internetowych. Aplikacja Electron może mieć tylko jeden główny proces.

Główny skrypt może wyglądać następująco:

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    wysokość: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  wygrywa. oadFile('index.html')
  win.webContents.openDevTools()
}

aplikacja. henReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app. uit()
  }
})

app.on('activate', () => {
  if (BrowserWindow. etAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Co się dzieje powyżej?

1. Linia 1: Pierwsza importujesz moduły `app` i `BrowserWindow` pakietu `electron` , aby móc zarządzać wydarzeniami w cyklu życia aplikacji, jak również tworzenie i sterowanie oknami przeglądarki.
2. Linia 3: Następnie definiujesz funkcję, która tworzy [nowe okno przeglądarki](../api/browser-window.md#new-browserwindowoptions) z włączoną integracją węzłów, indeks obciążeń `. Plik tml` w tym oknie (linia 12, omówimy plik później) i otworzy narzędzia dla programistów (linia 13).
3. Wiersz 16: Tworzysz nowe okno przeglądarki, powołując się na funkcję `createWindow` po zainicjowaniu aplikacji Electron [](../api/app.md#appwhenready).
4. Linia 18: Dodajesz nowego słuchacza, który próbuje opuścić aplikację, gdy nie ma już żadnych otwartych okien Ten słuchacz jest no-op na macOS ze względu na [zachowanie zarządzania oknem systemu operacyjnego](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Linia 24: Dodajesz nowego słuchacza, który tworzy nowe okno przeglądarki tylko wtedy, gdy aplikacja nie ma widocznych okien po aktywacji. Na przykład po pierwszym uruchomieniu aplikacji lub ponownym uruchomieniu już uruchomionej aplikacji.

#### Utwórz stronę internetową

To jest strona internetowa, którą chcesz wyświetlić po zainicjowaniu aplikacji. Ta strona reprezentuje proces renderem. Możesz tworzyć wiele okien przeglądarki, gdzie każde okno używa własnego niezależnego renderera. Każde okno może być opcjonalnie przyznane z pełnym dostępem do API Node.js poprzez preferencje `nodeIntegration`.

Strona `index.html` wygląda następująco:

```html
<! OCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Witaj światu!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Witaj Świat!</h1>
    Używamy węzła <script>dokumentu. rite(process.versions.node)</script>,
    Chrome <script>document.write(process.versions. hrome)</script>,
    i Electron <script>document.write(process.versions.electron)</script>.
</body>
</html>
```

#### Modyfikuj swój plik package.json

Twoja aplikacja Electron używa pliku `package.json` jako głównego punktu wejścia (jak każda inna aplikacja Node.js). Głównym skryptem Twojej aplikacji jest `main.js`, więc zmień plik `package.json` odpowiednio:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> UWAGA: Jeśli pole `główne` zostanie pominięte, Electron spróbuje załadować `indeks. s` plik z katalogu zawierający `package.json`.

Domyślnie komenda `npm start` uruchomi główny skrypt z Node.js. Aby uruchomić skrypt z Electronem, musisz go zmienić jako taki:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Uruchom aplikację

```sh
npm start
```

Twoja uruchomiona aplikacja Electron powinna wyglądać następująco:

![Prosta aplikacja Electron](../images/simplest-electron-app.png)

### Pakiet i dystrybucja aplikacji

Najprostszym i najszybszym sposobem rozpowszechniania nowo utworzonej aplikacji jest użycie [Electron Forge](https://www.electronforge.io).

1. Importuj Electron Forge do folderu aplikacji:

    ```sh
    npx @electron-forge/cli import

    ✔ Sprawdzanie twojego systemu
    ✔ Inicjowanie repozytorium Git
    ✔ Zapisywanie zmodyfikowanego pakietu. plik son
    ✔ Instalacja zależności
    ✔ Pisanie zmodyfikowanego pakietu. plik son
    ✔ Naprawianie. itignore

    Mamy ATTEMPTED do konwersji aplikacji w formacie zrozumiałym dla elektron-forge.

    Dziękujemy za używanie "electron-forge"!!!
    ```

1. Utwórz rozproszoną tabelę:

    ```sh
    npm run make

    > my-gsod-electron-app@1.0. utwórz /my-electron-app
    > electron-forge make

    ✔ Sprawdzanie twojego systemu
    ✔ Rozwiązywanie konfiguracji Forge
    Musimy spakować twoją aplikację zanim będziemy mogli to zrobić
    ✔ Przygotowanie aplikacji Pakietowej dla arch: x64
    ✔ Przygotowanie natywnych zależności
    ✔ Pakowanie aplikacji
    Tworzenie następujących celów: zip
    ✔ Making for target: zip - On platforma: darwin - For arch: x64
    ```

    Electron-forge tworzy `` folder, w którym znajduje się Twój pakiet:

    ```plain
    // Przykład dla MacOS
    out/
    <unk> <unk> <unk> out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    <unk> <unk> ...
    &gt; &gt; &gt; /moj-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/moj-electron-app
    ```

## Nauka podstaw

Ta sekcja prowadzi Cię przez podstawy jak Electron działa pod kapturkiem. Jego celem jest zwiększenie wiedzy na temat Electron i aplikacji utworzonej wcześniej w sekcji Quickstart.

### Architektura aplikacji

Elektronika składa się z trzech głównych filarów:

* **Chromium** do wyświetlania zawartości stron internetowych.
* **Node.js** do pracy z lokalnym systemem plików i systemem operacyjnym.
* **Niestandardowe API** do pracy z często potrzebnymi funkcjami natywnymi systemu operacyjnego.

Tworzenie aplikacji z Electronem jest jak budowanie aplikacji Node.js z interfejsem internetowym lub tworzenie stron internetowych z integracją Node.js.

#### Proces główny i renderer

Jak wspomniano wcześniej, Electron ma dwa rodzaje procesów: główny i Renderer.

* Główny proces **tworzy** strony internetowe tworząc instancje `BrowserWindow`. Każda instancja `BrowserWindow` uruchamia stronę internetową w procesie renderowania. Kiedy `BrowserWindow` zostanie zniszczony, odpowiedni proces renderer również zostanie zakończony.
* Główny proces **zarządza** wszystkimi stronami i odpowiadającymi im procesami renderem.

----

* Proces renderowania **zarządza** tylko odpowiednią stroną internetową. Awaria w jednym procesie renderowania nie ma wpływu na inne procesy renderem.
* Proces renderowania **komunikuje się** z głównym procesem poprzez IPC w celu wykonywania operacji GUI na stronie internetowej. Wywoływanie natywnych API związanych z GUI z procesu renderer jest bezpośrednio ograniczone ze względu na obawy dotyczące bezpieczeństwa i potencjalne wycieki zasobów.

----

Komunikacja między procesami jest możliwa za pomocą modułów komunikacji międzyprocesowej (IPC): [`ipcMain`](../api/ipc-main.md) i [`ipcRenderer`](../api/ipc-renderer.md).

#### API

##### Electron API

API Electron są przypisane na podstawie typu procesu, co oznacza, że niektóre moduły mogą być używane z procesu głównego lub renderowania, a niektóre z nich. Dokumentacja API Electrona wskazuje, z którego procesu każdy moduł może być użyty.

Na przykład, aby uzyskać dostęp do Electron API w obu procesach, wymaga dołączonego modułu:

```js
const electron = require('electron')
```

Aby utworzyć okno, wywołaj klasę `BrowserWindow` , która jest dostępna tylko w głównym procesie:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Aby wywołać główny proces z Renderer, użyj modułu IPC:

```js
// W głównym procesie
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event...args) => {
  // ... wykonaj akcje w imieniu Renderer
})
```

```js
// W procesie renderowania
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> UWAGA: ponieważ procesy renderowania mogą uruchamiać niezaufany kod (zwłaszcza od osób trzecich), ważne jest, aby starannie zatwierdzić wnioski, które trafiają do głównego procesu.

##### Nodej.js API

> UWAGA: Aby uzyskać dostęp do API Node.js z procesu Renderer musisz ustawić preferencje `nodeIntegration` na `true`.

Electron ujawnia pełny dostęp do Node.js API i jego modułów zarówno w procesach głównych, jak i renderem. Na przykład możesz odczytać wszystkie pliki z katalogu głównego:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Aby użyć modułu Node.js, musisz najpierw zainstalować go jako zależność:

```sh
npm install --save aws-sdk
```

Następnie, w aplikacji Electron, wymaga modułu:

```js
const S3 = require('aws-sdk/clients/s3')
```