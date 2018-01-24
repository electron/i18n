## Class: BrowserWindowProxy

> Manipulahin ang mga maliliit na window ng browser

Mga proseso: [Renderer](../glossary.md#renderer-process)

The `BrowserWindowProxy` object is returned from `window.open` and provides limited functionality with the child window.

### Instance Methods

The `BrowserWindowProxy` object has the following instance methods:

#### `win.blur()`

Removes focus from the child window.

#### `win.close()`

Forcefully closes the child window without calling its unload event.

#### `win.eval(code)`

* `code` String

ipakita ang code sa maliit na window

#### `win.focus()
 `

Focuses the child window (brings the window to front).

#### `win.print()`

Invokes the print dialog on the child window.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Ipasa ang mensahe sa maliit na window kasama ang tamang origin o kaya `*` sa hindi tamang husto ng origin.

Bukod sa mga pamamaraang ito, ay ipinatutupad ng maliit na window na to na ang `window.opener` ay bagay na walang katangian at iisa ang pamamaraan.

### Humahalimbawa sa bahagi nito

Ang `BrowserWindowProxy` na to ay bahagi ng mga sumusunod na halimbawa ng mga bahagi:

#### `win.closed`

Ang `Boolean` ay itinalaga para itama bago isara ang maliit na window.