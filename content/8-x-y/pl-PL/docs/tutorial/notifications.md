# Powiadomienia (Windows, Linux, macOS)

Wszystkie trzy systemy operacyjne zapewniają środki dla aplikacji do wysyłania powiadomień do użytkownika. Electron wygodnie pozwala programistom wysyłać powiadomienia z [powiadomieniami HTML5 API](https://notifications.spec.whatwg.org/), za pomocą aktualnie uruchomionych natywnych API powiadomień systemu operacyjnego do wyświetlenia go.

**Note:** Since this is an HTML5 API it is only available in the renderer process. Jeśli chcesz pokazać Powiadomienia w głównym procesie sprawdź moduł [Powiadomienia](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Podczas gdy kod i doświadczenie użytkowników we wszystkich systemach operacyjnych są podobne, występują subtelne różnice.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. To może być przestarzałe podczas rozwoju, więc dodawanie `node_module\electron\dist\electron.exe` do menu Start również robi to sztuczkę. Przejdź do pliku w Explorerze, kliknij prawym przyciskiem myszy i 'Przypnij aby uruchomić menu'. Następnie musisz dodać wiersz `app.setAppUserModelId(process.execPath)` do głównego procesu, aby zobaczyć powiadomienia.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Należy pamiętać jednak, że nie musi być przypięte do ekranu startowego.
* W systemie Windows 7, powiadomienia działają przez niestandardową implementację, która wizualnie przypomina macierzyste z nowszych systemów.

Electron próbuje zautomatyzować pracę wokół ID modelu aplikacji. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Electron wykryje, że Squirrel był używany i automatycznie zadzwoni `app.setAppUserModelId()` z poprawną wartością. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Ponadto w systemie Windows 8 maksymalna długość jednostki powiadomień wynosi 250 znaków, z zespołem Windows rekomendującym, aby powiadomienia były przechowywane od do 200 znaków. To powiedziawszy, ograniczenie zostało usunięte w systemie Windows 10, przy czym zespół Windows prosi deweloperów o rozsądne rozwiązanie. Próba wysłania gigantycznej ilości tekstu do API (tysiące znaków) może spowodować niestabilność.

### Zaawansowane powiadomienia

Późniejsze wersje systemu Windows pozwalają na zaawansowane powiadomienia, z niestandardowymi szablonami, obrazkami oraz innymi elastycznymi elementami. Aby wysłać te powiadomienia (z głównego procesu lub procesu renderowania) użyj modułu użytkownika [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), który używa natywnych dodatków do węzła do wysyłania `ToastNotification` i `TileNotification` obiektów.

Powiadomienia, w tym przyciski pracują z `electron-windows-notifications`, obsługa odpowiedzi wymaga użycia [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications)który pomaga zarejestrować wymagane komponenty COM i wywoływać aplikację Electron z wprowadzonymi danymi użytkownika.

### Godziny ciszy / Tryb prezentacji

Do wykrywania, czy masz możliwość wysłać powiadomienie, użyj modułu użytkownika [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Pozwala to na ustalenie, czy system Windows wyciszy powiadomień.

## macOS

Powiadomienia są bezpośrednie na macOS, lecz powinieneś zawsze uważać na [Wytyczne Apple dotyczące interfejsu ludzkiego dotyczące powiadomień](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Pamiętaj, że powiadomienia są ograniczone do 256 bajtów i zostają przycinane, jeśli przekroczysz limit.

### Zaawansowane powiadomienia

Późniejsze wersje macOS pozwalają na powiadomienia z polem tekstowym, pozwalając użytkownikowi szybko odpowiedzieć na powiadomienie. Aby wysyłać powiadomienia z polem wejściowym, użyj modułu użytkownika [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Nie przeszkadzać / Stan sesji

Do wykrywania, czy masz możliwość wysłać powiadomienie, użyj modułu użytkownika [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Pozwoli to wykryć przed upływem czasu, czy powiadomienie będzie wyświetlane.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
