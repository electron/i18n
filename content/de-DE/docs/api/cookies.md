## Class: Cookies

> Abfragen und modifizieren von Session Cookies.

Prozess: [Main](../glossary.md#main-process)

Auf Instanzen der `Cookies-Klasse` wird über die Cookie-Eigenschaft einer Sitzung zugegriffen.

Ein Beispiel:

```javascript
const { session } = require('electron')

// Durchsuche all Cookies.
session.defaultSession.cookies.get()
  .then(cookies) =>
    Console.log(cookies)
  .catch(error) =>
    console.log(error)
  )

* Query all cookies associated with a specific url.
session.defaultSession.cookies.get(- url: 'http://www.github.com' ')
  .then(cookies) =>
    console.log(cookies)
  .catch(error) => '
    console.log(error)
  )

* Setzen Sie ein Cookie mit den angegebenen Cookie-Daten;
/ können gleichwertige Cookies überschreiben, wenn vorhanden sind.
const-Cookie = url: 'http://www.github.com', Name: 'dummy_name', Wert: 'dummy' '
session.defaultSession.cookies.set(cookie)
  .then() => '
    / / Erfolg
  ' , (error) => '
    console.error(error)
  ')
```

### Instanz Events

Die folgenden Ereignisse sind auf Instanzen von `Cookies`verfügbar:

#### Event: 'changed'

Rückgabewert:

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - Das Cookie, das geändert wurde.
* `cause` String - Die Ursache der Änderung mit einem der folgenden Werte:
  * `explicit` - Das Cookie wurde direkt durch die Aktion eines Verbrauchers geändert.
  * `overwrite` - Das Cookie wurde aufgrund einer einzufügenden -Operation, die es überschrieben hat, automatisch entfernt.
  * `expired` - Das Cookie wurde automatisch entfernt, da es abgelaufen ist.
  * `evicted` - Das Cookie wurde während der Garbage Collection automatisch entfernt.
  * `expired-overwrite` - Das Cookie wurde mit einem bereits abgelaufenen Ablaufdatum überschrieben.
* `removed` boolesch - `true` , wenn das Cookie entfernt wurde, `false` sonst.

Emittiert, wenn ein Cookie geändert wird, weil es hinzugefügt, bearbeitet, entfernt oder abgelaufen ist.

### Instanz Methoden

Die folgenden Methoden sind für Instanzen von `Cookies`verfügbar:

#### `cookies.get(filter)`

* `filter` -Objekt
  * `url` String (optional) - Ruft Cookies ab, die mit `url`verknüpft sind. Leer impliziert das Abrufen von Cookies aller URLs.
  * `name` String (optional) - Filtert Cookies nach Namen.
  * `domain` String (optional) - Ruft Cookies ab, deren Domänen mit `domains`übereinstimmen oder sind.
  * `path` String (optional) - Ruft Cookies ab, deren Pfad mit `path`übereinstimmt.
  * `secure` Boolean (optional) - Filtert Cookies nach ihrer Secure-Eigenschaft.
  * `session` boolesch (optional) - Filtert Sitzungs- oder persistente Cookies heraus.

Gibt `Promise<Cookie[]>` zurück - Ein Versprechen, das ein Array von Cookie-Objekten auflöst.

Sendet eine Anfrage, um alle Cookies zu erhalten, die `filter`übereinstimmen, und löst ein Versprechen mit der Antwort.

#### `cookies.set(Details)`

* `details` -Objekt
  * `url` String - Die URL, der das Cookie zugeordnet werden soll. Das Versprechen wird abgelehnt, wenn die URL ungültig ist.
  * `name` String (optional) - Der Name des Cookies. Standardmäßig leer, wenn nicht angegeben.
  * `value` String (optional) - Der Wert des Cookies. Standardmäßig leer, wenn nicht angegeben.
  * `domain` String (optional) - Die Domain des Cookie; dies wird mit einem vorhergehenden Punkt normalisiert, so dass es auch für Subdomains gilt. Standardmäßig leer, wenn nicht angegeben.
  * `path` String (optional) - Der Pfad des Cookie. Standardmäßig leer, wenn nicht angegeben.
  * `secure` Boolean (optional) - Gibt an, ob das Cookie als sicher markiert werden soll. Standardmäßig false.
  * `httpOnly` Boolean (optional) - Gibt an, ob das Cookie nur als HTTP markiert werden soll. Der Standardwert ist false.
  * `expirationDate` Double (optional) - Das Ablaufdatum des Cookies als Anzahl der Sekunden seit der UNIX-Epoche. Wenn das Cookie weggelassen wird, wird es zu einer Sitzung Cookie und wird nicht zwischen den Sitzungen beibehalten.
  * `sameSite` String (optional) - Die [gleiche Website](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies) Richtlinie, die auf dieses Cookie angewendet werden soll.  Sein Wert kann `nicht gesetzt `, `no_restriction`, `lax` oder `strict` sein.  Der Standardwert ist `no_restriction`.

Gibt `Promise<void>` zurück - Ein Versprechen, das auflöst, wenn das Cookie gesetzt wurde

Legt ein Cookie mit `details`fest.

#### `cookies.remove(url, name)`

* `url` String - Die URL, die dem Cookie zugeordnet ist.
* `name` String - Der Name des zu entfernenden Cookies.

Gibt `Promise<void>` zurück - Ein Versprechen, das auflöst, wenn das Cookie entfernt wurde

Entfernt die Cookies, die `url` und `name`

#### `cookies.flushStore()`

Gibt `Promise<void>` zurück - Ein Versprechen, das auflöst, wenn der Cookie-Speicher geleert wurde

Schreibt alle ungeschriebenen Cookies auf die Festplatte.
