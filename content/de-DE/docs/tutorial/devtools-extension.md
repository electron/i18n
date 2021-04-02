# DevTools Erweiterung

Electron unterstützt [Chrome DevTools-Erweiterungen][devtools-extension], die verwendet werden können, um die Fähigkeit von Chrome-Entwicklertools zum Debuggen gängigen Webframeworks zu erweitern.

## Laden einer DevTools-Erweiterung mit Werkzeugen

Der einfachste Weg, eine DevTools-Erweiterung zu laden, besteht darin, Tools von Drittanbietern zu verwenden, um den Prozess für Sie zu automatisieren. [Elektron-Devtools-Installer-][electron-devtools-installer] ist ein beliebtes NPM-Paket, das genau das tut.

## Manuelles Laden einer DevTools-Erweiterung

Wenn Sie den Werkzeugansatz nicht verwenden möchten, können Sie auch alle erforderlichen Von-Hand-Vorgängen durchführen. Um eine Erweiterung in Electron zu laden, müssen Sie sie über Chrome herunterladen, den Dateisystempfad zu finden und sie dann in Ihre [Session][session] laden, indem Sie die [`ses.loadExtension`] API aufrufen.

Verwenden der [React Developer Tools][react-devtools] als Beispiel:

1. Installieren Sie die Erweiterung in Google Chrome.
1. Navigieren Sie zu `chrome://extensions`und finden Sie seine Erweiterungs-ID, die ein Hash Zeichenkette ist wie `fmkadmapgofadopljbjfkapdkoienihi`.
1. Finden Sie den Speicherort des Dateisystems heraus, der von Chrome zum Speichern von Erweiterungen verwendet wird:
   * unter Windows ist es `%LOCALAPPDATA%\Google\Chrome\Benutzerdaten\Default\Erweiterungen`;
   * unter Linux könnte es sein:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * on macOS it is `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Übergeben Sie den Speicherort der Erweiterung an die [`ses.loadExtension`][load-extension] -API. Für React Developer Tools `v4.9.0`sieht es etwa so aus:

   ```javascript
    const { app, session } = require('electron')
    const path = require('path')
    const os = require('os')

    / auf macOS
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0'
    )

    app.whenReady().then(async () => -
      warten Session.defaultSession.loadExtension(reactDevToolsPath)
    )
   ```

**Hinweise:**

* `loadExtension` gibt ein Promise mit einem [Extension-Objekt][extension-structure]zurück, das Metadaten über die geladene Erweiterung enthält. Dieses Versprechen muss vor dem Laden einer Seite (z. B. mit einem `await` Ausdruck) aufgelöst werden. Andernfalls wird die Erweiterung nicht garantiert geladen.
* `loadExtension` kann nicht aufgerufen werden, bevor das `ready` Ereignis des `app` Moduls ausgegeben wird, ausgegeben wird, noch kann es in Speichersitzungen (nicht persistent) aufgerufen werden.
* `loadExtension` muss bei jedem Start Ihrer App aufgerufen werden, wenn sie möchten, dass die Erweiterung geladen wird.

### Entfernen einer DevTools-Erweiterung

Sie können die ID der Erweiterung an die [`ses.removeExtension`][remove-extension] -API übergeben, um sie aus Ihrer Sitzung zu entfernen. Geladene Erweiterungen werden zwischen App-Starts nicht beibehalten.

## DevTools-Erweiterungsunterstützung

Electron unterstützt nur [einer begrenzten Anzahl von `chrome.*` -APIs][supported-extension-apis], sodass Erweiterungen, die nicht unterstützte `chrome.*` -APIs unter der Haube verwenden, möglicherweise nicht funktionieren.

Die folgenden Devtools-Erweiterungen wurden getestet, um in Electron zu funktionieren:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Was soll ich tun, wenn eine DevTools-Erweiterung nicht funktioniert?

Stellen Sie zunächst sicher, dass die Erweiterung noch gewartet wird und mit der neuesten Version von Google Chrome kompatibel ist. Wir können keine zusätzliche Unterstützung für nicht unterstützten Erweiterungen bereitstellen.

Wenn die Erweiterung auf Chrome funktioniert, aber nicht auf Electron, dateiieren Sie einen Fehler in Electron s [Problem-Tracker][issue-tracker] und beschreiben Sie, welcher Teil der Erweiterung nicht wie erwartet funktioniert.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[session]: ../api/session.md
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
