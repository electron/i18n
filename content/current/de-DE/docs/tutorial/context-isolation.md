# Kontext-Isolation

## Was ist das?

Kontext-Isolation ist eine Funktion, die sicherstellt, dass sowohl Ihre `Vorlade` Skripte als auch die interne Logik von Electronic in einem separaten Kontext auf die Webseite, die Sie in einer [`WebContent`](../api/web-contents.md) laden, ausgeführt werden.  Dies ist für Sicherheitszwecke wichtig, da es verhindert, dass die Website auf die Interna von Electron oder die leistungsstarken APIs zugreift, auf die Ihr Preload-Skript Zugriff hat.

Das bedeutet, dass das `-Fenster` Objekt, auf das Ihr Preload-Skript Zugriff hat, tatsächlich ein **anderes** Objekt ist, auf das die Webseite Zugriff hätte.  Wenn Sie zum Beispiel `window.hallello = 'wave'` in Ihrem Vorladeskript setzen und Kontext-Isolierung aktiviert ist `Fenster. ello` wird nicht definiert, wenn die Website versucht, darauf zuzugreifen.

Jede einzelne Anwendung sollte Kontext-Isolierung aktivieren und von Electron 12 wird sie standardmäßig aktiviert.

## Wie aktiviere ich es?

Ab Electron 12 wird es standardmäßig aktiviert. Bei niedrigeren Versionen ist dies eine Option in der `webPreferences` Option beim Konstruieren von `neuem BrowserFenster`'s.

```javascript
const mainWindow = new BrowserWindow({
  webEinstellungen: {
    contextIsolation: true
  }
})
```

## Migration

> Ich habe APIs von meinem Preload-Skript über das `Fenster bereitgestellt.X = apiObject` was jetzt?

APIs von Ihrem Preload-Skript der geladenen Website zu belichten ist eine gemeinsame Usenecase und es gibt ein dediziertes Modul in Electron, das Ihnen dabei hilft, dies auf schmerzlose Art und Weise zu tun.

**Vor: Mit Kontext Isolierung deaktiviert**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Nach: Mit aktivierter Kontext-Isolation**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Das [`contextBridge`](../api/context-bridge.md) Modul kann verwendet werden, um **sicher** APIs aus dem isolierten Kontext auszublenden, in dem Ihr Vorladeskript in den Kontext läuft, in dem die Webseite läuft. Die API wird auch von der Webseite auf `window.myAPI` erreichbar sein, so wie es vorher war.

Sie sollten die `contextBridge` Dokumentation lesen, die oben verlinkt ist, um ihre Grenzen vollständig zu verstehen.  Zum Beispiel können Sie keine benutzerdefinierten Prototypen oder Symbole über die Bridge senden.

## Sicherheitsaspekte

Einfach `Kontext-Isolation` aktivieren und `contextBridge` verwenden bedeutet nicht automatisch, dass alles, was Sie tun, sicher ist.  Zum Beispiel ist dieser Code **unsicher**.

```javascript
// ❌ Falscher Code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Es enthüllt direkt eine leistungsstarke API ohne jede Art von Argumentfilterung. Dies würde es jeder Website ermöglichen, beliebige IPC-Nachrichten zu senden, die Sie nicht möglich sein möchten. Der richtige Weg, um IPC-basierte APIs zu enthüllen, wäre stattdessen eine Methode pro IPC-Nachricht.

```javascript
// ✅ Gute Code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```
