# Testowanie Widevine CDM

W Electron możesz użyć biblioteki Widevine CDM dostarczonej w przeglądarce Chrome.

Widevine Content Decryption Modules (CDMs) are how streaming services protect content using HTML5 video to web browsers without relying on an NPAPI plugin like Flash or Silverlight. Obsługa Widevine jest alternatywnym rozwiązaniem dla usług transmisji strumieniowej, które obecnie polegają na Silverlight do odtwarzania treści wideo chronionych przez DRM. Pozwoli to stronom internetowym pokazywać zawartość wideo chronioną przed DRM w Firefox bez użycia wtyczek NPAPI. Widevine CDM działa w open-source CDM sandbox, zapewniając większe bezpieczeństwo użytkownika niż wtyczki NPAPI.

#### Uwaga na temat VMP

Od [`Electron v1.8. (chrome v59)`](https://electronjs.org/releases#1.8.1), poniższe kroki mogą być tylko niektórymi niezbędnymi krokami, aby umożliwić Widewine; każda aplikacja na lub po tej wersji zamierzającej korzystać z Widevine CDM może wymagać podpisu przy użyciu licencji uzyskanej od [Widevine](https://www.widevine.com/) .

Na [Widevine](https://www.widevine.com/):

> Chrome 59 (i nowsze) zawiera obsługę Zweryfikowanej Ścieżki Mediów (VMP). VMP zapewnia metodę weryfikacji autentyczności platformy urządzenia. W przypadku implementacji przeglądarki będzie to stanowiło dodatkowy sygnał, aby określić, czy implementacja oparta na przeglądarce internetowej jest niezawodna i bezpieczna.
> 
> Przewodnik integracji proxy został zaktualizowany z informacjami o VMP i jak wydawać licencje.
> 
> Widevine recommended our browser-based integrations (vendors and browser-based applications - Aplikacje) add support for VMP.

Aby włączyć odtwarzanie wideo z tym nowym ograniczeniem, [castLabs](https://castlabs.com/open-source/downstream/) stworzył [fork](https://github.com/castlabs/electron-releases) , który zaimplementował niezbędne zmiany, aby umożliwić odtwarzanie Widevine w aplikacji Electrona, jeśli otrzyma niezbędne licencje od wideo.

## Pobieranie biblioteki

Otwórz `chrome://components/` w przeglądarce Chrome, znajdź `moduł Decryption Widevine Content Modu` i upewnij się, że jest aktualny, następnie możesz znaleźć pliki biblioteki z katalogu aplikacji .

### Na Windowsie

Plik biblioteki `widevinecdm.dll` będzie w katalogu `Pliki programowe (x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/`

### On MacOS

Plik biblioteki `libwidevinecdm.dylib` będzie pod `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` katalog.

**Uwaga:** Upewnij się, że wersja chrome używana przez Electron jest większa lub równa wartości `min_chrome_version` składnika Cdm wideo. Wartość można znaleźć w `manifest.json` pod `WidevineCdm`.

## Używanie biblioteki

Po pobraniu plików biblioteki powinieneś przekazać ścieżkę do pliku za pomocą `--widevine-cdm-path` przełącznik wiersza poleceń, i wersji biblioteki z przełącznikiem `--widevine-cdm-version`. Przełączniki wiersza poleceń muszą być przekazane zanim moduł `gotowy` zdarzenie `aplikacji` zostanie wysłany.

Przykładowy kod:

```javascript
const { app, BrowserWindow } = require('electron')

// Musisz przekazać katalog zawierający tutaj bibliotekę wideo, to
// * `libwidevinecdm. ylib` na macOS,
// * `widevinecdm.dll` na Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// Wersja wtyczki może być dostępna ze strony `chrome://components` w Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Weryfikacja wsparcia Widevine CDM

Aby sprawdzić, czy utwory szerokoekranowe, możesz użyć następujących sposobów:

* Otwórz https://shaka-player-demo.appspot.com/ i załaduj manifest, który używa `Widevine`.
* Otwórz http://www.dash-player.com/demo/drm-test-area/, sprawdź, czy strona mówi, że `bitdash używa Widevine w Twojej przeglądarce`, a następnie odtwarzaj wideo.
