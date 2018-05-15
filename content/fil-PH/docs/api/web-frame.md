# lumikha ng bahay-alalawa

> Customize the rendering of the current web page.

Mga proseso: [Renderer](../glossary.md#renderer-process)

An example of zooming current page to 200%.

```javascript
const {webFrame} = require('electron')

webFrame.setZoomFactor(2)
```

## Mga Paraan

The `webFrame` module has the following methods:

### `webFrame.setZoomFactor(factor)`

* `kadahilanan`Numero - Zoom factor.

Binabago ang factor ng pag-zoom sa tinukoy na factor. Ang factor ng pag-zoom ay porsiyento ng zoom na hinati sa 100, so 300% = 3.0.

### `webFrame.getZoomFactor()`

Returns `Number` - The current zoom factor.

### `webFrame.setZoomLevel(level)`

* `antas` Numero - antas ng Zoom.

Binabago ang antas ng pag-zoom para sa tinitiyak na antas. Ang orihinal na laki ng 0 at bawat isa Ang pagdagdag sa pagtaas o sa pagbaba ay kumakatawan sa pag-zooming ng 20% na mas malaki o mas maliit sa default mga limitasyon ng 300% at 50% ng orihinal na laki, ayon sa pagkakabanggit.

### `webFrame.getZoomLevel()`

Returns `Number` - The current zoom level.

### `webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Itinatakda ang pinakamataas at pinakamababang antas ng pinch-sa-zoom.

### `webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`

* `pinakamaliitna Antas` na Numero
* `Pinakamataas na Antas` na Numero

Nagtatakda ng pinakamataas at pinakamababa na antas batay sa layout (i.e hindi visual) na antas ng zoom.

### `webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`

* `language` String
* `autoCorrectWord` Boolean
* `provider` Bagay 
  * `spellCheck` Function - Returns `Boolean`. 
    * `text` String

Sets a provider for spell checking in input fields and text areas.

The `provider` must be an object that has a `spellCheck` method that returns whether the word passed is correctly spelled.

An example of using [node-spellchecker](https://github.com/atom/node-spellchecker) as provider:

```javascript
const {webFrame} = require('electron')
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck (text) {
    return !(require('spellchecker').isMisspelled(text))
  }
})
```

### `webFrame.registerURLSchemeAsSecure(scheme)`

* `scheme` na String

Registers the `scheme` as secure scheme.

Secure schemes do not trigger mixed content warnings. For example, `https` and `data` are secure schemes because they cannot be corrupted by active network attackers.

### `webFrame.registerURLSchemeAsBypassingCSP(scheme)`

* `scheme` na String

Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy.

### `webFrame.registerURLSchemeAsPrivileged(scheme[, options])`

* `scheme` na String
* `mga opsyon` Na Bagay (opsyonal) 
  * `secure` Boolean (optional) - Default true.
  * `bypassCSP` Boolean (optional) - Default true.
  * `allowServiceWorkers` Boolean (optional) - Default true.
  * `supportFetchAPI` Boolean (optional) - Default true.
  * `corsEnabled` Boolean (optional) - Default true.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

```javascript
const {webFrame} = require('electron')
webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })
```

### `webFrame.insertText(text)`

* `text` String

Pagsingit `text` para sa nakapukos na elemento.

### `webFrame.executeJavaScript(code[, userGesture, callback])`

* `code` String
* `userGesture` Boolean (opsyonal) - Default ay `huwad`.
* `callback` Function (opsyonal) - Tinawagan pagkatapos na maisakatuparan ang iskrip. 
  * `result` Any

Ibinabalik ang mga `Pangako` - Ang isang pangako na lumulutas sa resulta ng naipatupad na code o tinanggihan kung ang resulta ng code ay isang tinanggihang pangako.

Sinusuri ang mga `code` sa pahina.

Sa window ng browser ang ilang mga HTML API tulad ng `requestFullScreen` ay maaari lamang nananawagan ng kilos mula sa gumagamit. Ang pagtatakda ng `userGesture` sa `totoo` ay alisin ang limitasyon na ito.

### `webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`

* `worldId` Integer
* `scripts` [WebSource[]](structures/web-source.md)
* `userGesture` Boolean (opsyonal) - Default ay `huwad`.
* `callback` Function (opsyonal) - Tinawagan pagkatapos na maisakatuparan ang iskrip. 
  * `result` Any

Work like `executeJavaScript` but evaluates `scripts` in isolated context.

### `webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`

* `worldId` Integer
* `csp` String

Set the content security policy of the isolated world.

### `webFrame.setIsolatedWorldHumanReadableName(worldId, name)`

* `worldId` Integer
* `name` String

Set the name of the isolated world. Useful in devtools.

### `webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`

* `worldId` Integer
* `securityOrigin` String

Set the security origin of the isolated world.

### `webFrame.getResourceUsage()`

Returns `Object`:

* `images` [MemoryUsageDetails](structures/memory-usage-details.md)
* `cssStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `xslStyleSheets` [MemoryUsageDetails](structures/memory-usage-details.md)
* `fonts` [MemoryUsageDetails](structures/memory-usage-details.md)
* `other` [MemoryUsageDetails](structures/memory-usage-details.md)

Returns an object describing usage information of Blink's internal memory caches.

```javascript
const {webFrame} = require('electron')
console.log(webFrame.getResourceUsage())
```

This will generate:

```javascript
{
  images: {
    count: 22,
    size: 2549,
    liveSize: 2542
  },
  cssStyleSheets: { /* same with "images" */ },
  xslStyleSheets: { /* same with "images" */ },
  fonts: { /* same with "images" */ },
  other: { /* same with "images" */ }
}
```

### `webFrame.clearCache()`

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).