## Klase: Cookies

> Query at ang pagbabago ng sesyon ng cookies "Query" at pagbabago ng ilang parte ng sesyon ng "cookies".

Proseso:[Pangunahi](../glossary.md#main-process)

May ilang pagkakataon na ang `Cookies` class ay mapupuntahan gamit ang `cookies` na katangian ng `Session`.

Halimbawa ng:

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
* `cause` String - The cause of the change with one of the following values:
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

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (opsyunal) - Efilter ang mga cookies sa kanilang pangalan.
  * `domain` String (opsyunal) - Ang mga kinuhang cookies na ang domain ay nagtugma o ang mga subdomain ng `domain`.
  * `path` String (opsyunal) - Ang nakuhang cookies na nagtugma ang patungohan `path`.
  * `secure` Boolesn (opsyunal) - Nafilter na cookies ng kanilang Secure na ari-arian.
  * `session` Booelan (opsyunal) - Efilter ang sesyon o ang nagpapatuloy na cookies.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.get(filter,callback)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (opsyunal) - Efilter ang mga cookies sa kanilang pangalan.
  * `domain` String (opsyunal) - Ang mga kinuhang cookies na ang domain ay nagtugma o ang mga subdomain ng `domain`.
  * `path` String (opsyunal) - Ang nakuhang cookies na nagtugma ang patungohan `path`.
  * `secure` Boolesn (opsyunal) - Nafilter na cookies ng kanilang Secure na ari-arian.
  * `session` Booelan (opsyunal) - Efilter ang sesyon o ang nagpapatuloy na cookies.
* `callback` na Function
  * `error` Error
  * `cookies` [Cookie](structures/cookie.md) - ang isang array ng mga bagay ng cookie.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object
  * `url` String - Ang url ay maiuugnay sa cookie. The promise will be rejected if the url is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
  * `path` na String (opsyonal) - Ang path ng mga cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Mga default sa false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. I-default sa false
  * `expirationDate` Double (opsyunal) - Ang expiration na petsa ng isang cookie ng bilang ng segundo dahil sa UNIX epoch. Kung ito ay tatanggalin ang cookie ay magiging isang sesyon cookie at hindi na ito mananatili sa pagitan ng mga sesyon.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.set(detalye, baliktawag)`

* `details` Object
  * `url` String - Ang url ay maiuugnay sa cookie.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` na String (opsyonal) - Ang dominyo ng mga cookie. Empty by default if omitted.
  * `path` na String (opsyonal) - Ang path ng mga cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Mga default sa false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. I-default sa false
  * `expirationDate` Double (opsyunal) - Ang expiration na petsa ng isang cookie ng bilang ng segundo dahil sa UNIX epoch. Kung ito ay tatanggalin ang cookie ay magiging isang sesyon cookie at hindi na ito mananatili sa pagitan ng mga sesyon.
* `callback` na Function
  * `error` Error

Eset ang cookie sa mga`details`, `callback` ay pwedeng itawag na may `callback(error)` na kumpleto.

**[Deprecated Soon](modernization/promisification.md)**

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

**[Deprecated Soon](modernization/promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Nasusulat ang anumang di-nakasulat na cookies datos para sa disk.

#### `cookies.flushStore(callback)`

* `callback` na Function

Nasusulat ang anumang di-nakasulat na cookies datos para sa disk.

**[Deprecated Soon](modernization/promisification.md)**
