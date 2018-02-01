# Styleguide ng mga dokumento ng electron

Ito ang mga alintuntunin sa pagsulat ng dokumento ng electron.

## Mga Pamagat

* Sa bawat pahina ay dapat magkaroon ng isang solong antas ng `#`-ng pamagat sa itaas.
* Ang mga kabanata ng parehong pahina ay dapat may `#`-antas ng mga titulo.
* Ang pangalawang kabanata ay kailangan upang madagdagan ang bilang ng mga `#` sa pamagat ayon sa lalim ng nilalaman nito.
* Lahat ng mga salita sa titulo ng pahina ay dapat nasa malalaking titik, maliban sa pangatnig gaya ng "ng" at "at".
* Tanging ang unang salita ng pamagat ng isang kabanata ang dapat na nasa malaking titik.

Paggamit ng mga `Quick Start` bilang halimbawa:

```markdown
# Mabilis na simula

...

## Pangunahing proseso

...

## Proseso ng tagasalin

...

## Paganahin ang iyong app

...

### Paganahin bilang isang distribusyon...
```

Para sa mga reperensya ng API, may mga eksepsiyon sa panuntunang ito.

## Mga patakaran ng markdown

* Gamitin ang `sh` sa halip na `cmd` sa mga bloke ng kodigo (dahil sa syntax highlighter).
* Ang mga linya ay dapat nakapaloob sa 80 ng mga hanay.
* Walang nesting list na hihigit sa 2 antas (dahil sa mga tagasalin ng markdown).
* Lahat ng mga bloke ng kodigo sa `js` at `javascript` ay linted sa [standard-markdown](http://npm.im/standard-markdown).

## Pagpili ng mga salita

* Gamitin ang "ay" sa halip ng "nais" kapag naglalarawan sa mga kinalalabasan.
* Piliin ang "sa ____ proseso" sa halip ng "sa".

## Mga sanggunian ng API

Ang mga sumusunod na mga patakaran ay angkop lamang sa mga dokumentasyon ng API.

### Ang pamagat ng pahina

Sa bawat pahina ay dapat gamitin ang aktuwal na pangalan ng mga bagay na ibinalik ng `require('electron')`bilang pamagat, tulad ng `BrowserWindow`, `autoUpdater`, at mga `sesyon`.

Sa ilalim ng pahina ng pamagat ay dapat na may paglalarawan ng isang-linya na nagsisimula sa `>`.

Paggamit ng mga `session` bilang halimbawa:

```markdown
ang mga sesyon sa # > ay pinamamahalaan ang browser session, cookies, cache, mga setting ng proxy, atbp.
```

### Mga pamamaraan ng modyul at mga kaganapan

Para sa mga modyul na hindi naka-klase, ang kanilang pamamaraan at mga pangyayaring dapat ay nakalista sa ilalim ng mga kabanata ng `# # Methods` at `# # Events`.

Paggamit ng mga `autoUpdater` bilang isang halimbawa:

```markdown
# autoUpdater # # Mga Kaganapan ### Kaganapan: 'error' # # Paraan ### `autoUpdater.setFeedURL (url [, requestHeaders])`
```

### Mga Klase

* Ang mga klase ng API o mga klse na kabahagi ng mga modyul ay dapat nakalista sa ilalim ng isang kabanata ng `# # klase: TheClassName`.
* Ang isang pahina ay maaaring magkaroon ng maramihang mga klase.
* Ang mga tagatayo ay dapat na nakalista sa ` ### `-antas ng mga pamagat.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) ay dapat nakalista sa ilalim ng isang kabanata ng `### Static Methods'.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) ay dapat nakalista sa ilalim ng isang kabanata ng `### Instance Methods`.
* Ang lahat ng mga pamamaraan na mayroon ng isang nagbalik na halaga ay dapat nagsimula ng kanilang deskripsyon sa "Returns `[TYPE]` -Bumalik sa deskripsyon" 
  * Kung ang pamamaraan ay ibinabalik ang isang `bagay`. ang istraktura nito ay maaaring tukuyin gamit ang isang kolon kasunod ng bagong linya pagkatapos ay ang wala sa lugar na listahan ng mga katangian sa parehong estilo bilang punsyon ng mga parametro.
* Ang mga Kaganapan ng Instansya ay dapat na nakalista sa ilalim ng isang kabanata ng `### Instance Events `.
* Ang mga Katangian ng Instansya ay dapat na nakalista sa ilalim ng isang kabanata ng `### Instance Properties`. 
  * Ang mga katangian ng Instansya ay dapat magsimula sa "A [Property Type] ..."

Ginagamit ang mga klase ng `Session`at`Cookies` bilang halimbawa:

```markdown
# sesyon # # Pamamaraan ### session.fromPartition(partisyon) # # Katangian ### session.defaultSession ## Klase: Sesyon ### Mga Pangyayari na may Halimbawa #### Kaganapan: 'will-download'
### Mga Halimbawa ng Pamamaraan #### `ses.getCacheSize (callback)` ### Instance Properties #### `ses.cookies` ## Klase: Mga Cookies ### Mga Halimbawa ng Pamamaraan #### `cookies.get (filter, callback)`
```

### Pamamaraan

Ang pamamaraan ng kabanata ay dapat nasa sumusunod na porma:

```markdown
### ' objectName.methodName (kinakailangan [ opsyonal]))' * 'kailangan' String - isang paglalarawan ng parametro. * ' optional' Integer (opsyonal) - isa pang paglalarawan ng parametro. ...
```

Ang pamagat ay maaaring maging `#` o `#`-antas depende kung ito ay isang pamamaraan ng isang paksa o ng isang klase.

Para sa mga modyul, ang `objectName` ay pangalan ng mga modyul. Para sa mga klase, ito ay dapat na ang mga pangalan ng mga pagkakataon sa klase, at hindi dapat kapareho ng pangalan ng mga modyul.

Halimbawa, ang mga pamamaraan ng klsae ng `session` sa ilalim ng modyul ng `session` ay dapat gumamit ng `ses` bilang ang `objectName`.

Ang mga opsyonal na argumento ay ipinapahayag sa pamamagitan ng mga square bracket `[]` na nakapalibot sa opsyonal na argumento pati na rin ang kuwit na kinakailangan kung ang opsyonal na argumento ay sumusunod sa isa pang argumento:

```sh
kinakailangan [opsyonal]
```

Sa ibaba ng paraan ay mas detalyadong impormasyon sa bawat isa sa mga argumento. Ang uri ng argumento ay binibigkas ng alinman sa karaniwang mga uri:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Bilang`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Bagay`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* O isang pasadyang uri tulad ng electron [`WebContent`](api/web-contents.md)

Kung ang isang argumento o isang paraan ay natatangi sa ilang mga plataporma, ang mga plataporma ay ipinahiwatig gamit ang isang delimited na espasyo na naka-italic ang listahan kasunod ng mga datatype. Ang pagpapahalaga ay maaaring maging `macOS`, `Windows`, o `Linux`.

```markdown
* `E-animate` Boolean (opsyonal) _macOS_ _Windows_ - Pagalawin ang bagay.
```

Ang `Array` ay uri ng mga argumento na kailangang tukuyin kung anong mga elemento ng array amg maaaring isama sa paglalarawan sa ibaba.

Ang detalye ng uri ng mga argumento ng `Function` ay dapat gawin itong malinaw kung paano ito tatawagin at ililista ang mga uri ng mga parametro na ipapasa dito.

### Mga pangyayari

Ang mga pangyayari ng kabanata ay dapat nasa sumusunod na porma:

```markdown
### Pangyayari: 'Panggising' Returns: * 'oras' String...
```

Ang pamagat ay maaaring maging `#` o `#`-antas depende kung ito ay isang event ng isang paksa o ng isang klase.

Ang mga argumento ng isang pangyayari ay sinusunod ang parehong patakaran bilang pamamaraan.

### Mga Katangian

Ang mga katangian ng kabanata ay dapat nasa sumusunod na porma:

```markdown
### session.defaultSession...
```

Ang pamagat ay maaaring maging `#` o `#`-antas depende kung ito ay isang katangian ng isang paksa o ng isang klase.

## Ang mga pagsasalin ng dokumentasyon

Tingnan ang [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)
