# DevTools Erweiterung

Electron supports the [Chrome DevTools Extension][devtools-extension], which can be used to extend the ability of devtools for debugging popular web frameworks.

## Wie man eine DevTools-Erweiterung lädt

Dieses Dokument skizziert den Prozess zum manuellen Laden einer Erweiterung. Sie können auch [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), ein Drittanbieter-Tool ausprobieren, das Erweiterungen direkt aus dem Chrome WebStore herunterlädt.

Um eine Erweiterung in Electron zu laden, müssen Sie sie im Chrome-Browser herunterladen, findet den Pfad des Dateisystems und lädt ihn dann durch Aufruf des `BrowserWindows. ddDevToolsExtension(Erweiterung)` API.

Using the [React Developer Tools][react-devtools] as example:

1. Installiere den Chrome Browser.
1. Navigieren Sie zu `chrome://extensions`und finden Sie seine Erweiterungs-ID, die ein Hash Zeichenkette ist wie `fmkadmapgofadopljbjfkapdkoienihi`.
1. Finde den Speicherort des Dateisystems, der von Chrome zum Speichern von Erweiterungen verwendet wird:
   * unter Windows ist es `%LOCALAPPDATA%\Google\Chrome\Benutzerdaten\Default\Erweiterungen`;
   * unter Linux könnte es sein:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * on macOS it is `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Übergeben Sie die Position der Erweiterung an `BrowserWindow.addDevToolsExtension` API, für die React Developer Tools, ist es so etwas wie :
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0')
   )
   ```

**Hinweis:** Die `BrowserWindow.addDevToolsExtension` API kann nicht aufgerufen werden, bevor das fertige Ereignis des App-Moduls emittiert wird.

Die Erweiterung wird gespeichert, so dass Sie diese API nur einmal pro Erweiterung aufrufen müssen. Wenn Sie versuchen eine Erweiterung hinzuzufügen, die bereits geladen wurde, diese Methode gibt nicht zurück und protokolliert stattdessen eine Warnung an die Konsole.

### DevTools-Erweiterung entfernen

Sie können den Namen der Erweiterung an die `BrowserWindow.removeDevToolsExtension` übergeben, um sie zu entfernen. Der Name der Erweiterung wird von `BrowserFenster zurückgegeben. ddDevToolsExtension` und Sie können die Namen aller installierten DevTools Erweiterungen über die `BrowserWindow.getDevToolsExtensions` API abrufen.

## Unterstützte DevTools Extensions

Electron unterstützt nur einen begrenzten Satz von `Chrome.*` APIs, also einige Erweiterungen die nicht unterstützt `Chrom.` APIs für Chrome-Erweiterungsfunktionen funktionieren möglicherweise nicht. Folgende Devtools Erweiterungen sind getestet und garantiert in elektronischer Form zu funktionieren:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Was soll ich tun, wenn eine DevTools Extension nicht funktioniert?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Dann melden Sie einen Fehler auf der Liste der elektronischen Ausgaben und beschreiben Sie, welcher Teil der Erweiterung nicht wie erwartet funktioniert.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
