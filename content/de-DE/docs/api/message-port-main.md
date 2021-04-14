# MessagePortMain

`MessagePortMain` ist das hauptprozessseitige Äquivalent des DOM- [`MessagePort`][] -Objekts. Es verhält sich ähnlich wie die DOM-Version, mit der Ausnahme, dass es das Node.js `EventEmitter` -Ereignissystem anstelle des DOM- `EventTarget` -Systems verwendet. Dies bedeutet, dass Sie `port.on('message', ...)` verwenden sollten, um Ereignisse zu hören, anstatt `port.onmessage = ...` oder `port.addEventListener('message', ...)`

Weitere Informationen zur Verwendung Channel Messaging finden Sie in der Dokumentation [Channel Messaging][] .

`MessagePortMain` ist ein \[EventEmitter\]\[event-emitter\].

## Klasse: MessagePortMain

Prozess: [Main](../glossary.md#main-process)

### Instanz Methoden

#### `port.postMessage(Nachricht, [transfer])`

* `message`
* `transfer` MessagePortMain[] (optional)

Sendet eine Nachricht vom Port und überträgt optional den Besitz von Objekten, die , in andere Browserkontexte.

#### `port.start()`

Startet das Senden von Nachrichten, die sich in der Warteschlange am Port befinden. Nachrichten werden in die Warteschlange gestellt, bis diese Methode aufgerufen wird.

#### `port.close()`

Trennt den Port, sodass er nicht mehr aktiv ist.

### Instanz Events

#### Ereignis: 'Nachricht'

Rückgabewert:

* `messageEvent` -Objekt
  * `data`
  * `ports` MessagePortMain[]

Wird gesendet, wenn ein MessagePortMain-Objekt eine Nachricht empfängt.

#### Event: 'close'

Wird gesendet, wenn das Remote-Ende eines MessagePortMain-Objekts getrennt wird.

[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
