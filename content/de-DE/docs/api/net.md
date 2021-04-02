# net

> Stellen Sie HTTP/HTTPS-Anforderungen mithilfe der nativen Netzwerkbibliothek von Chromium aus

Prozess: [Main](../glossary.md#main-process)

Das `net` -Modul ist eine clientseitige API zum Ausgeben von HTTP(S)-Anforderungen. Es ist ähnlich wie die [HTTP-](https://nodejs.org/api/http.html) und [HTTPS-](https://nodejs.org/api/https.html) -Module von Node.js verwendet jedoch native Netzwerkbibliothek von Chromium anstelle der Node.js-Implementierung, eine bessere Unterstützung für Webproxys bietet. Es unterstützt auch die Überprüfung des Netzwerkstatus.

Im Folgenden finden Sie eine nicht erschöpfende Liste, warum Sie die Verwendung des `net` -Moduls anstelle der systemeigenen Node.js-Module in Betracht ziehen können:

* Automatische Verwaltung der Systemproxykonfiguration, Unterstützung der wpad- Protokoll- und Proxy-Pac-Konfigurationsdateien.
* Automatisches Tunneln von HTTPS-Anforderungen.
* Unterstützung für die Authentifizierung von Proxys mithilfe von Basis-, Digest-, NTLM-, Kerberos- oder aushandelnvon Authentifizierungsschemata.
* Unterstützung für Datenverkehrsüberwachungsproxys: Fiddler-ähnliche Proxys, die für den Zugriff Steuerung und Überwachung verwendet werden.

Die API-Komponenten (einschließlich Klassen, Methoden, Eigenschaften und Ereignisnamen) ähneln denen, die in Node.js verwendet werden.

Beispielverwendung:

```javascript
const { app } = require('electron')
app.whenReady().then()=>
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) =>
    console.log('STATUS: ${response.statusCode}')
    console.log('HEADERS: 'JSON.stringify(response.headers)')
    response.on('data', (chunk) => '
      console.log('BODY: ${chunk}')
    ').log
      > 
')
    
  )
  request.end()
)
```

Die `net` -API kann nur verwendet werden, nachdem die Anwendung das `ready` -Ereignis ausgibt. Der Versuch, das Modul vor dem `ready` -Ereignis zu verwenden, löst einen Fehler aus.

## Methoden

Das Modul `net` besitzt folgende Methoden:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - Die `ClientRequest` Konstruktoroptionen.

Rücksendungen [`ClientRequest`](./client-request.md)

Erstellt eine [`ClientRequest`](./client-request.md) Instanz mit den bereitgestellten `options` die direkt an den `ClientRequest` -Konstruktor weitergeleitet werden. Die `net.request` Methode wird verwendet, um sowohl sichere als auch unsichere HTTP- Anforderungen gemäß dem angegebenen Protokollschema im `options` -Objekt zu geben.

### `net.isOnline()`

Gibt `Boolean` zurück - Gibt an, ob derzeit eine Internetverbindung besteht.

Ein Rückgabewert von `false` ist ein ziemlich starker Indikator dafür, dass der Benutzer keine Verbindung zu Remote-Standorten herstellen kann. Ein Rückgabewert von `true` ist jedoch nicht eindeutig; Selbst wenn eine Verbindung hergestellt wird, ist es ungewiss, ob ein bestimmter Verbindungsversuch zu einem bestimmten Remote-Standort erfolgreich sein wird.

## Eigenschaften

### `net.online` _Readonly_

Eine `Boolean` Eigenschaft. Ob es derzeit eine Internetverbindung gibt.

Ein Rückgabewert von `false` ist ein ziemlich starker Indikator dafür, dass der Benutzer keine Verbindung zu Remote-Standorten herstellen kann. Ein Rückgabewert von `true` ist jedoch nicht eindeutig; Selbst wenn eine Verbindung hergestellt wird, ist es ungewiss, ob ein bestimmter Verbindungsversuch zu einem bestimmten Remote-Standort erfolgreich sein wird.
