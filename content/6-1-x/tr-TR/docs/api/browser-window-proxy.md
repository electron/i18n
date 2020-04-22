## Sınıf: BrowserWindowProxy

> Alt tarayıcı penceresini değiştirme

İşlem: [Renderer](../glossary.md#renderer-process)

`BrowserWindowProxy` nesnesi `window.open`'dan döner ve alt pencere ile sınırlı işlevsellik sağlar.

### Örnek yöntemleri

`BrowserWindowProxy` nesnesi aşağıdaki örnek metodlara sahiptir:

#### `win.blur()`

Odağı alt penceresinden kaldır.

#### `win.close()`

Alt ekranlardan bir tanesini kapatma olayını gerçekleştirmeden zorla kapatır.

#### `win.eval(code)`

* `code` Dizgi

Alt penceredeki kodu değerlendirir.

#### `win.focus()`

Alt pencereye odaklanır. (pencereyi öne getirir).

#### `win.print()`

Alt pencerede yazdırma iletişim kutusunu çağırır.

#### `win.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Belirtilen başlangıç noktası ile alt pencereye bir mesaj gönderir veya `*` için başlangıç noktası seçeneği yoktur.

Bu metodlara ek olarak, alt pencere seçeneksiz ve tek bir metod ile `window.opener` nesnesini implement eder.

### Örnek Özellikler

`BrowserWindowProxy` nesnesi aşağıdaki örnek özelliklere sahiptir:

#### `win.closed`

Alt pencere kapatıldıktan sonra bir `Boolean`'ın değeri true olarak ayarlanır.
