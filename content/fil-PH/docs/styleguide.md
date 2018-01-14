# Styleguide ng mga dokumento ng elektron

Ito ang mga alintuntunin sa pagsulat ng dokumento ng elektron.

## Mga Pamagat

* Sa bawat pahina ay dapat magkaroon ng isang solong `#`-antas na pamagat sa itaas.
* Sa bawat kabanata ng parehong pahina ay dapat may `#`-antas na may titulo.
* Sub kabanata ay kailangan upang madagdagan ang bilang ng mga `#` sa pamagat ayon sa lalim ng nesting nito.
* Lahat ng mga salita sa bawat pahina na may titulo ay dapat nasa malalaking titik, maliban sa pangatnig gaya ng "ng" at "at".
* Tanging ang unang salita ng kabanata na may pamagat ay dapat naka-capital.

Paggamit ng mga `Quick Start` bilang halimbawa:

```markdown
# Mabilis na simula

...

## Pangunahing proseso

...

## Proseso ng tagapagbalita

...

## Patakbuhin ang iyong app

...

### Patakbuhin bilang pamamahagi...
```

Para sa mga reperensya ng API, may mga eksepsiyon sa panuntunang ito.

## Mga patakaran ng markdown

* Gamitin ang `sh` sa halip ng `cmd` sa mga bloke ng code (dahil sa syntax highlighter).
* Ang mga linya dapat naka balot sa 80 ng mga hanay.
* Walang nesting na nangangahulugang mahigit 2 antas (dahil sa mga tagatanghal ng markdown).
* Lahat ng bloke ng code sa `js` at `javascript` ay linted sa [pamantayan-markdown](http://npm.im/standard-markdown).

## Pagpili ng mga salita

* Gamitin ang "ay" sa halip ng "nais" kapag naglalarawan sa mga kinalalabasan.
* Piliin ang "sa ____ proseso" sa halip ng "sa".

## Mga reperensya sa mga API

Ang mga sumusunod na patakaran ay angkop lamang sa dokumentasyon ng APIs.

### Mga pamagat ng pahina

Sa bawat pahina ay dapat gamitin ang aktuwal na pangalan sa mga bagay na ibinalik na `kailangan meron('electron')`bilang pamagat, tulad ng `BrowserWindow`, `autoUpdater`, at mga `sesyon`.

Sa ilalim ng pahina ng pamagat ay dapat na may paglalarawan ng isang-linya na nagsisimula sa `>`.

Paggamit ng mga `sesyon` bilang halimbawa:

```markdown
ang mga sesyon sa # > pamahalaan ang browser session, cookies, cache, mga setting ng proxy, atbp.
```

### Mga pamamaraan ng modyul at mga kaganapan

Para sa mga modyuls na hindi nakaklase, ang kanilang pamamaraan at mga pangyayaring dapat ay nakalista sa ilalim ng `# # pamamaraan` at `# # pangyayari` kabanata.

Paggamit ng mga `autoUpdater` bilang isang halimbawa:

```markdown
# autoUpdater # # Mga Kaganapan ### Kaganapan: 'error' # # Paraan ### `autoUpdater.setFeedURL (url [, requestHeaders])`
```

### Mga Klase

* Ang klase o mga klase ng API na bahagi ng Modyul ay dapat nakalista sa ilalim ng isang `# # klase: TheClassName` kabanata.
* Isang pahina ay maaaring magkaroon ng maramihang mga klase.
* Ang mga tagatayo ay dapat na nakalista sa ` ### `-antas na pamagat.
* [Static na pamamaraan](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) ay dapat nakalista sa ilalim ng isang `### Static na pamamaraan`kabanata.
* [Halimbawa ng mga pamamaraan](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) ay dapat nakalista sa ilalim ng isang `### pamamaraan ng pagkakataon` kabanata.
* Lahat ng mga pamamaraan na magkaroon ng isang pagbalik na halaga ay dapat nagsimula ng kanilang deskripsyon sa "Returns `[TYPE]` -Bumalik sa deskrpsyon" 
  * Kung ang paraan na ito ay nagbabalik ng isang `bagay`. ng istraktura nito ay tinukoy gamit ang isang colon kasunod ng newline at ang unordered na listahan ng mga katangian sa parehong estilo bilang function ng mga parameters.
* Ang mga Kaganapan ng Instance ay dapat na nakalista sa ilalim ng kabanata ng `### Instance Events `.
* Instance Properties ay dapat nakalista sa ilalim ng isang `### Instance Properties` kabanata. 
  * Instance properties ay dapat nagsimula ng "A [Property Type] ..."

Gamit ang `Session`at`Cookies`classes bilang halimbawa:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Events

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)