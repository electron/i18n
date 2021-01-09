# Rozszerzenie DevTools

Electron supports the [Chrome DevTools Extension][devtools-extension], which can be used to extend the ability of devtools for debugging popular web frameworks.

## Jak załadować rozszerzenie DevTools

Ten dokument zarysowuje proces ręcznego ładowania rozszerzenia. Możesz również spróbować [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), narzędzia innych firm, które pobierają rozszerzenia bezpośrednio z Chrome WebStore.

To load an extension in Electron, you need to download it in Chrome browser, locate its filesystem path, and then load it by calling the `BrowserWindow.addDevToolsExtension(extension)` API.

Using the [React Developer Tools][react-devtools] as example:

1. Zainstaluj go w przeglądarce Chrome.
1. Przejdź do `chrome://extensions`, i znajdź jego identyfikator rozszerzenia, który jest skrótem , takim jak `fmkadmapgofadopljbjfkapdkoienihi`.
1. Sprawdź lokalizację systemu plików używaną przez Chrome do przechowywania rozszerzeń:
   * w systemie Windows jest to `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * na Linuksie może być:
     * `~/.config/google-chrome/Domyślne/Extensions/`
     * `~/.config/google-chrome-beta/Domyślne/Extensions/`
     * `~/.config/google-chrome-canary/Domyślne/Extensions/`
     * `~/.config/chromium/Domyślne/Extensions/`
   * na macOS jest `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Przekaż lokalizację rozszerzenia do `BrowserWindow.addDevToolsExtension` API, dla narzędzi dla programistów React to coś takiego:

   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
)
   ```

**Uwaga:** Interfejsu API `BrowserWindow.addDevToolsExtension` nie można wywołać zanim gotowe zdarzenie modułu aplikacji nie zostanie wysłane.

Rozszerzenie zostanie zapamiętane, więc musisz wywołać to API tylko raz na rozszerzenie . Jeśli spróbujesz dodać rozszerzenie, które zostało już załadowane, ta metoda nie zwróci i zamiast tego zaloguje ostrzeżenie do konsoli.

### Jak usunąć rozszerzenie DevTools

Możesz przekazać nazwę rozszerzenia do `BrowserWindow.removeDevToolsExtension` API, aby go usunąć. Nazwa rozszerzenia jest zwracana przez `BrowserWindow. ddDevToolsExtension` i możesz otrzymać nazwy wszystkich zainstalowanych rozszerzeń DevTools za pomocą `BrowserWindow.getDevToolsExtensions` API.

## Obsługiwane rozszerzenia DevTools

Electron obsługuje tylko ograniczony zestaw `chrome.*` API, więc niektóre rozszerzenia przy użyciu nieobsługiwanych `chrome.` API dla funkcji rozszerzenia chrome mogą nie działać. Następujące rozszerzenia Devtools są testowane i gwarantowane, że będą działać w Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Narzędzia dla programistów React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debuger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Debuger jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Debuger Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Rozszerzenie Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Narzędzia dla programistów MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Co powinienem zrobić jeśli wtyczka DevTools nie działa?

Najpierw upewnij się, że rozszerzenie jest nadal utrzymywane, niektóre rozszerzenia nie mogą nawet działać dla najnowszych wersji przeglądarki Chrome i nie jesteśmy w stanie zrobić niczego dla nich.

Następnie wprowadź błąd na liście problemów Electrona i opisz, która część rozszerzenia nie działa zgodnie z oczekiwaniami.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
