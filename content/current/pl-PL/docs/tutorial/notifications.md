# Powiadomienia (Windows, Linux, macOS)

## Przegląd

Wszystkie trzy systemy operacyjne zapewniają aplikacjom możliwość wysyłania powiadomień do użytkownika. Technika wyświetlania powiadomień jest inna dla procesów głównych i Rendererowych.

W procesie renderem, Electron pozwala programistom na wysyłanie powiadomień za pomocą [HTML5 Notification API](https://notifications.spec.whatwg.org/), użycie natywnych API powiadomień systemu operacyjnego do wyświetlania go.

Aby wyświetlić powiadomienia w głównym procesie, musisz użyć modułu [Powiadomienie](../api/notification.md).

## Przykład

### Pokaż powiadomienia w procesie Renderer

Zakładając, że masz pracującą aplikację Electron z [Szybki Przewodnik](quick-start.md), dodaj następujący wiersz do indeksu `. Plik tml` przed oznaczeniem `</body>`:

```html
<script src="renderer.js"></script>
```

i dodaj plik `renderer.js`:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Powiadomienie kliknięte')
}
```

Po uruchomieniu aplikacji Electron powinieneś zobaczyć powiadomienie:

![Powiadomienie w procesie renderowania](../images/notification-renderer.png)

Jeśli otworzysz konsolę, a następnie kliknij powiadomienie, zobaczysz wiadomość, która została wygenerowana po wyzwalaniu zdarzenia `onclick`:

![Wiadomość po kliknięciu dla powiadomienia](../images/message-notification-renderer.png)

### Pokaż powiadomienia w głównym procesie

Zaczynając od działającej aplikacji z [Szybki Start Przewodnik](quick-start.md), zaktualizuj plik `main.js` następującymi liniami:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Po uruchomieniu aplikacji Electron powinieneś zobaczyć powiadomienie:

![Powiadomienie w głównym procesie](../images/notification-main.png)

## Dodatkowe informacje

Podczas gdy kod i doświadczenie użytkowników we wszystkich systemach operacyjnych są podobne, występują subtelne różnice.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. To może być przestarzałe podczas rozwoju, więc dodawanie `node_module\electron\dist\electron.exe` do Menu Start robi również sztukę. Przejdź do pliku w Explorerze, kliknij prawym przyciskiem myszy i 'Przypnij aby uruchomić menu'. Następnie musisz dodać wiersz `app.setAppUserModelId(process.execPath)` do głównego procesu, aby zobaczyć powiadomienia.
* W systemie Windows 8. i Windows 8, Skrót do Twojej aplikacji z [User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) musi być zainstalowany na ekranie początkowym. Należy pamiętać jednak, że nie musi być przypięte do ekranu startowego.
* W systemie Windows 7, powiadomienia działają przez niestandardową implementację, która wizualnie przypomina macierzyste z nowszych systemów.

Electron próbuje zautomatyzować pracę wokół ID modelu aplikacji. Gdy Electron jest używany razem z instalacją i aktualizacją frameworka, skróty [zostaną automatycznie ustawione poprawnie](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Electron wykryje, że Squirrel był używany i automatycznie zadzwoni `app.setAppUserModelId()` z poprawną wartością. Podczas tworzenia możesz mieć do wywołania [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) siebie.

Ponadto w systemie Windows 8 maksymalna długość jednostki powiadomień wynosi 250 znaków, z zespołem Windows rekomendującym, aby powiadomienia były przechowywane od do 200 znaków. To powiedziawszy, ograniczenie zostało usunięte w systemie Windows 10, przy czym zespół Windows prosi deweloperów o rozsądne rozwiązanie. Próba wysłania gigantycznej ilości tekstu do API (tysiące znaków) może spowodować niestabilność.

#### Zaawansowane powiadomienia

Późniejsze wersje systemu Windows pozwalają na zaawansowane powiadomienia, z niestandardowymi szablonami, obrazkami oraz innymi elastycznymi elementami. Aby wysłać te powiadomienia (z głównego procesu lub procesu renderowania) użyj modułu użytkownika [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), który używa natywnych dodatków do węzła do wysyłania `ToastNotification` i `TileNotification` obiektów.

Powiadomienia, w tym przyciski pracują z `electron-windows-notifications`, obsługa odpowiedzi wymaga użycia [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), który pomaga zarejestrować wymagane komponenty COM i wywoływać twoją aplikację Electron z wprowadzonymi danymi użytkownika.

#### Godziny ciszy / Tryb prezentacji

Aby wykryć, czy możesz wysyłać powiadomienie, użyj modułu użytkownika [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Pozwala to na określenie przed upływem czasu, czy Windows wymknie powiadomienie.

### macOS

Powiadomienia są bezpośrednie na macOS, lecz powinieneś zawsze uważać na [Wytyczne Apple dotyczące interfejsu ludzkiego dotyczące powiadomień](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Pamiętaj, że powiadomienia są ograniczone do 256 bajtów i zostają przycinane, jeśli przekroczysz limit.

#### Zaawansowane powiadomienia

Późniejsze wersje macOS pozwalają na powiadomienia z polem tekstowym, pozwalając użytkownikowi szybko odpowiedzieć na powiadomienie. Aby wysyłać powiadomienia z polem wejściowym, użyj modułu użytkownika [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Nie przeszkadzać / Stan sesji

Do wykrywania, czy masz możliwość wysłać powiadomienie, użyj modułu użytkownika [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Pozwoli to wykryć przed upływem czasu, czy powiadomienie będzie wyświetlane.

### Linux

Powiadomienia są wysyłane przy użyciu `libnotify` , który może pokazywać powiadomienia w dowolnym środowisku pulpitowym, które śledzi [powiadomienia pulpitowe Specyfikację](https://developer.gnome.org/notification-spec/), w tym Cinnamon, Enlightenment, Unity, GNOME, KDE.
