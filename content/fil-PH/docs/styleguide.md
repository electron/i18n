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
* Instance Properties ay dapat nakalista sa ilalim ng isang `### Katangian ng pagkakataon` kabanata. 
  * Instance properties ay dapat nagsimula ng "A [Property Type] ..."

Gamit ang `Session`at`Cookies`classes bilang halimbawa:

```markdown
# session # # Pamamaraan ### session.fromPartition(partisyon) # # Properties ### session.defaultSession ## Klase: Session ### Mga Pangyayari na may Halimbawa #### Kaganapan: 'will-download'
### Mga Halimbawa ng Pamamaraan #### `ses.getCacheSize (callback)` ### Instance Properties #### `ses.cookies` ## Klase: Mga Cookies ### Mga Halimbawa ng Pamamaraan #### `cookies.get (filter, callback)`
```

### Mga Paraan

Ang pamamaraan ng kabanata ay dapat nasa sumusunod na form:

```markdown
### ' objectName.methodName (kinakailangan [at opsyonal]))' * 'kailangan' pisi - isang paglalarawan ng parameter. * ' optional' Integer (opsyonal) - isa pang parameter na deskripsyon. ...
```

Ang pamagat ay maaaring maging `#` o `#`-antas depende kung ito ay isang pamamaraan ng isang paksa o ng isang klase.

Para sa mga modyul na ito, ang `objectName` ay pangalan ng mga modyul. Para sa klase, ito ay dapat na ang mga pangalan ng mga pagkakataon sa klase, at hindi ay dapat kapareho ng pangalan ng mga modyul.

Halimbawa, ang mga pamamaraan ng `sesyon ng` klase sa ilalim ng `sesyon` seksyon ay dapat gumamit ng `ses` bilang ang `objectName`.

Ang mga opsyonal na argumento ay ipinapahayag sa pamamagitan ng mga square bracket `[]` na nakapalibot sa opsyonal na argumento pati na rin ang kuwit na kinakailangan kung ang opsyonal na argumento ay sumusunod sa isa pa argumento:

```sh
kinakailangan [at opsyonal]
```

Sa ibaba ng paraan ay mas detalyadong impormasyon sa bawat isa sa mga argumento. Ang uri ng argumento ay binibigkas ng alinman sa karaniwang mga uri:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Bilang`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Bagay`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* O isang pasadyang uri tulad ng elektron [`WebContent`](api/web-contents.md)

Kung sa argumento o isang paraan na ito ay natatangi sa ilang mga plataporma, mga plataporma ay ipinahiwatig gamit ang isang delimited ng espasyo na naka-italic ang listahan kasunod ng mga datatype. Values can be `macOS`, `Windows` or `Linux`.

```markdown
* `E-animate` Boolean (opsyonal) _macOS_ _Windows_ - Pagalawin ang bagay.
```

`Array` uri argumento kailangan tukuyin kung anong elemento ang array maaaring isama sa paglalarawan sa ibaba.

Ang detalye ng mga argumento sa uri ng `Function` ay dapat gawin itong malinaw kung paano ito maaaring tumawag at ilista ang mga uri ng mga parameter sa mga ito.

### Pangyayari

Ang pangyayari ng kabanata ay dapat nasa sumusunod na form:

```markdown
### Pangyayari: 'Panggising' Returns: * 'oras' String...
```

Ang pamagat ay maaaring maging `#` o `#`-antas depende kung ito ay isang pamamaraan ng isang paksa o ng isang klase.

Ang mga argumento ng isang pangyayaring sundin ang parehong patakaran bilang pamamaraan.

### Mga Katangian

Ang mga katangian ng kabanata ay dapat nasa sumusunod na form:

```markdown
### session.defaultSession...
```

Ang pamagat ay maaaring maging `#` o `#`-antas depende kung ito ay isang pamamaraan ng isang paksa o ng isang klase.

## Ang mga pagsasalin ng dokumentasyon

See [electron/i18n](https://github.com/electron/i18n#readme)