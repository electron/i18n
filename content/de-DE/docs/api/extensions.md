# Chrome-Erweiterungsunterstützung

Electron unterstützt eine Teilmenge der [Chrome Extensions API][chrome-extensions-api-index], in erster Linie zur Unterstützung von DevTools-Erweiterungen und Chromium-internen Erweiterungen, aber es unterstützt auch einige andere Erweiterungsfunktionen.

> **Hinweis:** Electron unterstützt keine beliebigen Chrome-Erweiterungen aus dem Store und ist ein **Nicht-Ziel-** des Electron-Projekts, perfekt kompatibel mit Chromes Implementierung von Extensions zu sein.

## Laden von Erweiterungen

Electron unterstützt nur das Laden entpackter Erweiterungen (d. h. `.crx` Dateien funktionieren nicht ). Erweiterungen werden pro`session`installiert. Um eine Erweiterung zu laden, rufen Sie [`ses.loadExtension`](session.md#sesloadextensionpath-options)auf:

```js
const { session } = require('electron')

session.loadExtension('path/to/unpacked/extension').then(({ id }) => '
  / ...
})
```

Geladene Erweiterungen werden nicht automatisch über Exits hinweg gespeichert. Wenn Sie `loadExtension` nicht aufrufen , wenn die App ausgeführt wird, wird die Erweiterung nicht geladen.

Beachten Sie, dass das Laden von Erweiterungen nur in persistenten Sitzungen unterstützt wird. Der Versuch, eine Erweiterung in eine In-Memory-Sitzung zu laden, löst einen Fehler aus.

Weitere Informationen zum Laden, Entladen und Abfragen aktiver Erweiterungen finden Sie in der Dokumentation [`session`](session.md) .

## Unterstützte Erweiterungs-APIs

Wir unterstützen die folgenden Erweiterungs-APIs mit einigen Einschränkungen. Andere APIs können zusätzlich unterstützt werden, aber die Unterstützung für alle APIs, die hier nicht aufgeführt sind, ist vorläufig und kann entfernt werden.

### `chrome.devtools.inspectedFenster`

Alle Funktionen dieser API werden unterstützt.

### `chrome.devtools.network`

Alle Funktionen dieser API werden unterstützt.

### `chrome.devtools.panels`

Alle Funktionen dieser API werden unterstützt.

### `chrome.extension`

Die folgenden Eigenschaften von `chrome.extension` werden unterstützt:

- `chrome.extension.lastError`

Die folgenden Methoden der `chrome.extension` werden unterstützt:

- `chrome.extension.getURL`
- `chrome.extension.getBackgroundPage`

### `chrome.runtime`

Die folgenden Eigenschaften von `chrome.runtime` werden unterstützt:

- `chrome.runtime.lastError`
- `chrome.runtime.id`

Die folgenden Methoden der `chrome.runtime` werden unterstützt:

- `chrome.runtime.getBackgroundPage`
- `chrome.runtime.getManifest`
- `chrome.runtime.getPlatformInfo`
- `chrome.runtime.getURL`
- `chrome.runtime.connect`
- `chrome.runtime.sendMessage`

Die folgenden Ereignisse von `chrome.runtime` werden unterstützt:

- `chrome.runtime.onStartup`
- `chrome.runtime.onInstalliert`
- `chrome.runtime.onSuspend`
- `chrome.runtime.onSuspendCanceled`
- `chrome.runtime.onConnect`
- `chrome.runtime.onNachricht`

### `chrome.storage`

Nur `chrome.storage.local` wird unterstützt. `chrome.storage.sync` und `chrome.storage.managed` nicht.

### `chrome.tabs`

Die folgenden Methoden der `chrome.tabs` werden unterstützt:

- `chrome.tabs.sendMessage`
- `chrome.tabs.executeScript`

> **Hinweis:** In Chrome bedeutet das Übergeben `-1` als Tab-ID die "aktuell aktive Registerkarte". Da Electron kein solches Konzept hat, wird das Übergeben `-1` als Tab-ID nicht unterstützt und löst einen Fehler aus.

### `chrome.management`

Die folgenden Methoden der `chrome.management` werden unterstützt:

- `chrome.management.getAll`
- `chrome.management.get`
- `chrome.management.getSelf`
- `chrome.management.getPermissionWarningsById`
- `chrome.management.getPermissionWarningsByManifest`
- `chrome.management.onAktiviert`
- `chrome.management.onDeaktiviert`

### `chrome.webAnfrage`

Alle Funktionen dieser API werden unterstützt.

> **HINWEIS:** [`webRequest`](web-request.md) Modul von  Electron hat Vorrang vor `chrome.webRequest` , wenn es in Konflikt stehende Handler gibt.

[chrome-extensions-api-index]: https://developer.chrome.com/extensions/api_index
