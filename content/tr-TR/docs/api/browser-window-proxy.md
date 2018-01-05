## Class: BrowserWindowProxy

> Çocuk tarayıcı penceresini değiştirme

Process: [Renderer](../glossary.md#renderer-process)

The `BrowserWindowProxy` object is returned from `window.open` and provides limited functionality with the child window.

### Örnek yöntemleri

The `BrowserWindowProxy` object has the following instance methods:

#### `win.blur()`

Odağı alt penceresinden kaldır.

#### `win.close()`

Alt ekranlardan bir tanesini kapatma olayını gerçekleştirmeden zorla kapatır.

#### `win.eval(code)`

* `code` String

Alt penceredeki kodu değerlendirir.

#### `win.focus()`

Alt pencereye odaklanır. (pencereyi öne getirir).

#### `win.print()`

Alt pencerede yazdırma iletişim kutusunu çağırır.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Sends a message to the child window with the specified origin or `*` for no origin preference.

In addition to these methods, the child window implements `window.opener` object with no properties and a single method.

### Örnek özellikleri

The `BrowserWindowProxy` object has the following instance properties:

#### `win.closed`

A `Boolean` that is set to true after the child window gets closed.