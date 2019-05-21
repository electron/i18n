## Klase: Cookies

> Query at ang pagbabago ng sesyon ng cookies "Query" at pagbabago ng ilang parte ng sesyon ng "cookies".

Proseso:[Pangunahi](../glossary.md#main-process)

May ilang pagkakataon na ang `Cookies` class ay mapupuntahan gamit ang `cookies` na katangian ng `Session`.

Halimbawa:

```javascript
const { session } = kinakailangan ng ('electron')

// e "Query" ang lahat na mga "cookies".
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Query all cookies associated with a specific url.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### Mga Halimbawa ng "Events"

Ang mga sumusunid na kaganapan ay maaring gamitin sa mga halimbawa ng `Cookies`:

#### Kaganapan: 'nagbago'

* `kaganapan` Kaganapan
* `cookie` [Cookie](structures/cookie.md) - Ang "cookie" na binago.
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

#### `cookies.get(filter)`

* `salain` Bagay 
  * `url` String (opsyunal) - Nakuhang cookies na may kaugnayan sa `url`. Ang walang laman ay nagpapahiwatig na pagkuha ng mga cookies ng buong url.
  * `name` String (opsyunal) - Efilter ang mga cookies sa kanilang pangalan.
  * `domain` String (opsyunal) - Ang mga kinuhang cookies na ang domain ay nagtugma o ang mga subdomain ng `domain`.
  * `path` String (opsyunal) - Ang nakuhang cookies na nagtugma ang patungohan `path`.
  * `secure` Boolesn (opsyunal) - Nafilter na cookies ng kanilang Secure na ari-arian.
  * `session` Booelan (opsyunal) - Efilter ang sesyon o ang nagpapatuloy na cookies.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.get(filter,callback)`

* `salain` Bagay 
  * `url` String (opsyunal) - Nakuhang cookies na may kaugnayan sa `url`. Ang walang laman ay nagpapahiwatig na pagkuha ng mga cookies ng buong url.
  * `name` String (opsyunal) - Efilter ang mga cookies sa kanilang pangalan.
  * `domain` String (opsyunal) - Ang mga kinuhang cookies na ang domain ay nagtugma o ang mga subdomain ng `domain`.
  * `path` String (opsyunal) - Ang nakuhang cookies na nagtugma ang patungohan `path`.
  * `secure` Boolesn (opsyunal) - Nafilter na cookies ng kanilang Secure na ari-arian.
  * `session` Booelan (opsyunal) - Efilter ang sesyon o ang nagpapatuloy na cookies.
* `callback` Punsyon 
  * `error` Error
  * `cookies` [Cookie](structures/cookie.md) - ang isang array ng mga bagay ng cookie.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

**[Deprecated Soon](promisification.md)**

#### `cookies.set(details)`

* `ang mga detalye` Bagay 
  * `url` String - Ang url ay maiuugnay sa cookie.
  * `name` String (opsyunal) - Ang pangalan ng cookie. Walang laman ito pagdefault kung itinanggal.
  * `value` String (opsyunal) - Ang halaga ng isang cookie. Walang laman ito pagdefault kung itinanggal.
  * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
  * `path<0> String (opsyunal) - Ang daan ng isang cookie. Walang laman ito pagdefault kung itinanggal.</li>
<li><code>secure` Boolean (opsyunal) - Kung ang isang cookie ay dapat markado na Secure. Pagdefaults to mali.
  * `httpOnly` Boolean (opsyunal) - Kung ang isang cookie ay dapat na markado nang HTTP lang. Pagdefault ito false.
  * `expirationDate` Double (opsyunal) - Ang expiration na petsa ng isang cookie ng bilang ng segundo dahil sa UNIX epoch. Kung ito ay tatanggalin ang cookie ay magiging isang sesyon cookie at hindi na ito mananatili sa pagitan ng mga sesyon.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.set(detalye, baliktawag)`

* `ang mga detalye` Bagay 
  * `url` String - Ang url ay maiuugnay sa cookie.
  * `name` String (opsyunal) - Ang pangalan ng cookie. Walang laman ito pagdefault kung itinanggal.
  * `value` String (opsyunal) - Ang halaga ng isang cookie. Walang laman ito pagdefault kung itinanggal.
  * `domanin` String (opsyunal) - Ang domain ng isang cookie. Walang laman ito pagdefault kung itinanggal.
  * `path<0> String (opsyunal) - Ang daan ng isang cookie. Walang laman ito pagdefault kung itinanggal.</li>
<li><code>secure` Boolean (opsyunal) - Kung ang isang cookie ay dapat markado na Secure. Pagdefaults to mali.
  * `httpOnly` Boolean (opsyunal) - Kung ang isang cookie ay dapat na markado nang HTTP lang. Pagdefault ito false.
  * `expirationDate` Double (opsyunal) - Ang expiration na petsa ng isang cookie ng bilang ng segundo dahil sa UNIX epoch. Kung ito ay tatanggalin ang cookie ay magiging isang sesyon cookie at hindi na ito mananatili sa pagitan ng mga sesyon.
* `callback` function 
  * `error` Error

Eset ang cookie sa mga`details`, `callback` ay pwedeng itawag na may `callback(error)` na kumpleto.

**[Deprecated Soon](promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - Ang isang URL na maiugnay sa may cookie.
* `name` String - Ang pangalan ng isang cookie na natanggal.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.remove(url, pangalan, baliktawag)`

* `url` String - Ang isang URL na maiugnay sa may cookie.
* `name` String - Ang pangalan ng isang cookie na natanggal.
* `callback` na Function

Tanggalin ang mga cookies na nagtugma sa `url` at `name`, `callback` ay tinatawag na may `callback()` kung kumpleto.

**[Deprecated Soon](promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Nasusulat ang anumang di-nakasulat na cookies datos para sa disk.

#### `cookies.flushStore(callback)`

* `callback` na Function

Nasusulat ang anumang di-nakasulat na cookies datos para sa disk.

**[Deprecated Soon](promisification.md)**