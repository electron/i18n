## Klase: Cookies

> Query at ang pagbabago ng sesyon ng cookies "Query" at pagbabago ng ilang parte ng sesyon ng "cookies".

Proseso:[Pangunahi](../glossary.md#main-process)

May ilang pagkakataon na ang `Cookies` class ay mapupuntahan gamit ang `cookies` na katangian ng `Session`.

Halimbawa:

```javascript
const {session} = kinakailangan ng ('electron')

// e "Query" ang lahat na mga "cookies".
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// e "Query" ang lahat ng "cookies" na may kaugnayan sa isang partikular na "url".
session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
  console.log(error, cookies)
})

// Itakda ang "cookie" sapamamagitan na ibinigay na datos nito;
// maaari ding palitan ang katumbas na "cookies" nito kapag ito'y naiiral na.
const cookie = {url: 'http://www.github.com', name: 'dummy_name', value: 'dummy'}
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
})
```

### Mga Halimbawa ng "Events"

Ang mga sumusunid na kaganapan ay maaring gamitin sa mga halimbawa ng `Cookies`:

#### Kaganapan: 'nagbago'

* `kaganapan` Kaganapan
* `cookie` [Cookie](structures/cookie.md) - The cookie that was changed
* `sanhi` String - Ang mga sanhi ng mga pagbabago sa isa't isa sa mga sumusunod na mga halaga: 
  * `explicit` - Ang cookie ay direktang nagbago sa pamamagitan ng pagkilos ng isang mamimili.
  * `overwrite` - Ang cookie ay awtomatikong natanggal dahil sa ipinasok na operasyon na i-overwrite.
  * `expired` - Ang cookie ay awtomatikong natanggal dahil na-expired.
  * `evicted` - Ang cookie ay awtomatikong na-evicted sa panahon ng koleksyon ng basura.
  * `expired-overwrite` - Ang cookie na ito ay na-overwrite na may na-pasong pag-expire ng petsa.
* `removed` Boolean - `true` kapag ang cookie ay inalis, `false` kung hindi man.

Napalabas kapag ang cookie ay nagbago dahil ito'y idinagdag, inedit, natanggal, o napaso.

### Mga Pamamaraan ng Instance

Ang mga sumusunod ay maaring gamitin sa mga halimbawa na `Cookies`:

#### `cookies.get(filter, callback)`

* `salain` Bagay 
  * `url` String (opsyunal) - Nakuhang cookies na may kaugnayan sa `url`. Ang walang laman ay nagpapahiwatig na pagkuha ng mga cookies ng buong url.
  * `name` String (opsyunal) - Efilter ang mga cookies sa kanilang pangalan.
  * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`
  * `path` String (opsyunal) - Ang nakuhang cookies na nagtugma ang patungohan `path`.
  * `secure` Boolesn (opsyunal) - Nafilter na cookies ng kanilang Secure na ari-arian.
  * `session` Booelan (opsyunal) - Efilter ang sesyon o ang nagpapatuloy na cookies.
* `callback` Function 
  * `error` Error
  * `cookies` [Cookie](structures/cookie.md) - ang isang array ng mga bagay ng cookie.

Sends a request to get all cookies matching `details`, `callback` will be called with `callback(error, cookies)` on complete.

#### `cookies.set(details, callback)`

* `ang mga detalye` Bagay 
  * `url` String - Ang url ay maiuugnay sa cookie.
  * `name` String (opsyunal) - Ang pangalan ng cookie. Walang laman ito pagdefault kung itinanggal.
  * `value` String (opsyunal) - Ang halaga ng isang cookie. Walang laman ito pagdefault kung itinanggal.
  * `domanin` String (opsyunal) - Ang domain ng isang cookie. Walang laman ito pagdefault kung itinanggal.
  * `path<0> String (opsyunal) - Ang daan ng isang cookie. Walang laman ito pagdefault kung itinanggal.</li>
<li><code>secure` Boolean (opsyunal) - Kung ang isang cookie ay dapat markado na Secure. Pagdefaults to mali.
  * `httpOnly` Boolean (opsyunal) - Kung ang isang cookie ay dapat na markado nang HTTP lang. Pagdefault ito false.
  * `expirationDate` Double (opsyunal) - Ang expiration na petsa ng isang cookie ng bilang ng segundo dahil sa UNIX epoch. Kung ito ay tatanggalin ang cookie ay magiging isang sesyon cookie at hindi na ito mananatili sa pagitan ng mga sesyon.
* `callback` Function 
  * `error` Error

Eset ang cookie sa mga`details`, `callback` ay pwedeng itawag na may `callback(error)` na kumpleto.

#### `cookies.remove(url, pangalan, baliktawag)`

* `url` String - Ang isang URL na maiugnay sa may cookie.
* `name` String - Ang pangalan ng isang cookie na natanggal.
* `baliktawag` ginagawa

Tanggalin ang mga cookies na nagtugma sa `url` at `name`, `callback` ay tinatawag na may `callback()` kung kumpleto.

#### `cookies.flushStore(callback)`

* `baliktawag` ginagawa

Nasusulat ang anumang di-nakasulat na cookies datos para sa disk.