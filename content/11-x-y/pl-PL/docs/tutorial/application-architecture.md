# Architektura aplikacji Electron

Zanim zagłębimy się w Electron API, musimy omówić dwa typy procesów dostępnych w Electronie. Różnią się one od siebie całkowicie i ważnym jest, by je dobrze zrozumieć.

## Proces główny i renderer

W Electronie proces, który wykonuje skrypt `main` z pliku `package.json` nazywa się __proces główny__. Skrypt który uruchamia proces główny, wyświetla GUI przez tworzenie kolejnych stron HTML. Aplikacja korzystająca z Electrona zawsze ma tylko jeden proces główny.

Ponieważ Electron używa Chromium do wyświetlania stron internetowych, wykorzystywana jest również wielo-procesowa architektura Chromium. Każda strona internetowa w Electronie działa w swoim własnym procesie, który nazywa się __proces renderowania__.

W normalnych przeglądarkach, strony internetowe zazwyczaj są uruchamiane w tzw. sandboxie i nie posiadają dostępu do zasobów natywnych. Użytkownicy Electron mają jednak możliwość użycia interfejsów API Node.js na stronach internetowych, co pozwala na niskopoziomowe interakcje z systemem operacyjnym.

### Różnice Pomiędzy Procesem Głównym i Procesem Renderowania

Główny proces renderuje strony internetowe poprzez tworzenie instancji `BrowserWindow`. Każda instancja `BrowserWindow` uruchamia stronę poprzez swój własny proces renderowania. Kiedy instancja `BrowserWindow` zostanie zniszczona, odpowiadający jej proces renderowania również zostaje zakończony.

Główny proces zarządza wszystkimi stronami oraz ich procesami renderowania. Wszystkie procesy renderowania są odizolowane od siebie i zajmują się wyłącznie swoją przydzieloną stroną internetową.

W aplikacji Electron wywoływanie natywnego API od GUI jest niedozwolone, ponieważ zarządzanie natywnymi zasobami GUI za pomocą witryn internetowych jest bardzo niebezpieczne i łatwo w ten sposób dopuścić do stworzenia luk bezpieczeństwa. Jeżeli jednak chcesz dopuścić do operacji na GUI z pomocą strony internetowej, proces renderowania witryny musi się komunikować z głównym procesem, aby to on go wykonał.

> #### Notatka: Komunikacja pomiędzy procesami
> 
> W Electronie, komunikacja między głównym procesem a procesami renderowania, jest wykonywany przez moduły [`ipcRenderer`](../api/ipc-renderer.md) i [`ipcMain`](../api/ipc-main.md) Istnieje również wpis FAQ w [jak udostępniać dane pomiędzy stronami internetowymi][share-data].


## Używanie Electron API

Electron oferuje szereg interfejsów API, które wspierają development aplikacji desktopowych zarówno w procesie głównym, jak i w procesach renderowania. W każdym z procesów możesz uzyskać dostęp do Electron API poprzez dołączenie jego modułu:

```javascript
const electron = require('electron')
```

Wszystkie z Electron API mają przypisany typ procesu. Wiele z nich może być użyte z poziomu głownego procesu, część z nich z procesu renderowania, a niektóre mogą być wykorzystane przez oba z nich. W dokumentacji każdego z Electron API znajdziesz szczegóły dotyczące tego, z którego procesu można go użyć.

Okno w Electronie jest na przykład tworzone za pomocą klasy `BrowserWindow`. Jest dostępny tylko w głównym procesie.

```javascript
// To zadziała w głównym procesie, ale będzie 
// `undefined` w procesie renderowania:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Ponieważ komunikacja między procesami jest możliwa, proces renderowania może wywołać główny proces do wykonywania zadań przez IPC.

```javascript
// W głównym procesie:
const { ipcMain } = require('electron')

ipcMain. świeca ('perform-action', (zdarzenie...args) => {
  // ... wykonaj coś w imieniu renderowa...
})

// W procesie renderowania:
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

Zauważ, że kod w renderowaniu może nie być wiarygodny, więc ważne jest uważnej weryfikacji w głównym procesie żądań, które pochodzą od renderowców, szczególnie jeśli przechowują treści innych firm.

## Używanie API Node.js

Electron dostarcza pełen dostęp do Node.js zarówno w procesie głównym, jak i podczas procesu renderowania. Ma to dwie poważne konsekwencje:

1) Całe API Node.js jest dostępne w Electronie. Wywoływanie poniższego kodu z poziomu aplikacji zadziała w następujący sposób:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// Wypisze wszystkie pliki z katalogu głównego na dysku
// na przykład '/' lub 'C:\'.
console.log(root)
```

Być może zwróciłeś uwagę na to, że może to mieć istotne skutki w sprawach bezpieczeństwa, w szczególności gdy aplikacja będzie pobierać dane z zewnętrznego serwera. Więcej informacji i porad dotyczących bezpiecznego ładowania zewnętrznych zasobów znajdziesz w naszej [dokumentacji][security].

2) W swojej aplikacji możesz korzystać z modułów Node.js. Umożliwi Ci to korzystanie ze swoich ulubionych repozytoriów npm. npm oferuje obecnie największe na świecie repozytorium oprogramowania opensource - umożliwia Ci to korzystanie z dobrze utrzymanego i przetestowanego kodu. Jest to jedna z kluczowych cech Electron.

Na przykład, aby użyć oficjalne SDK AWS w Twojej aplikacji, na początek musisz zainstalować je jako zależność:

```sh
npm install --save aws-sdk
```

Następnie użyj moduł tak, jakbyś tworzył zwykłą aplikację Node.js:

```javascript
// Gotowy do użycia S3 Client
const S3 = require('aws-sdk/clients/s3')
```

Jest jedno ważne zastrzeżenie: natywne moduły Node.js muszą zostać przekompilowane, by móc je wykorzystać w Electronie.

Zdecydowana większość modułów Node.js _to nie_ moduły natywne. Tylko około 400 z ~650,000 modułów to moduły natywne. Jednak jeśli potrzebujesz moduły natywne, przejrzyj [ten poradnik jak zrekompilować je dla aplikacji Electron][native-node].

[security]: ./security.md
[native-node]: ./using-native-node-modules.md
[share-data]: ../faq.md#how-to-share-data-between-web-pages
