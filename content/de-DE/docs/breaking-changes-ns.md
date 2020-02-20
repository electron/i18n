# Große Änderungen (NetworkService) (Entwurf)

Diese Dokument beschreibt Änderungen an der Electron API nach dem migrieren von Netzwerk Code zu NetworkService API.

Wir können gerade noch nicht einschätzen wann wir `NetworkService` als Standard in Electron einsetzen, aber wie Chromium schon `NetworkService` aus dem Code entfernt, werden wir vielleicht vor Electron 10 wechseln.

Der Inhalt dieses Dokumentes sollte zur Datei `breaking-changes.md` verschoben werden, wenn wir entschieden haben wann wir `NetworkService` in Electron aktivieren.

## Geplante Änderungen an der Schnittstelle

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

Diese Schnittstelle ist jetzt Synchron und der optionale callback wird nicht länger gebraucht.

```javascript
// Veraltet
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Ersetzen durch
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`
### `protocol.registerBufferProtocol`
### `protocol.registerStringProtocol`
### `protocol.registerHttpProtocol`
### `protocol.registerStreamProtocol`
### `protocol.interceptFileProtocol`
### `protocol.interceptStringProtocol`
### `protocol.interceptBufferProtocol`
### `protocol.interceptHttpProtocol`
### `protocol.interceptStreamProtocol`

Diese Schnittstelle ist jetzt Synchron und der optionale callback wird nicht länger gebraucht.

```javascript
// Veraltet
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Ersetzt durch
protocol.registerFileProtocol(scheme, handler)
```

Das registrierte oder abgefangene Protokoll hat keine Auswirkungen auf die aktuelle Seite, bis eine Navigation stattfindet.

### `protocol.isProtocolHandled`

Diese Schnittstelle ist veraltet anstatt dessen sollten Benutzer `protocol.isProtocolRegistered` und `protocol.isProtocolIntercepted` nutzen.

```javascript
// Veraltet
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Ersetzen mit
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocolIntercepted(scheme)
```
