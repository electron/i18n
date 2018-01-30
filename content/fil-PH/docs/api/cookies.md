## Klase: Cookies

> Query at ang pagbabago ng sesyon ng cookies "Query" at pagbabago ng ilang parte ng sesyon ng "cookies".

Prosseso: [Main](../glossary.md#main-process)

May ilang pagkakataon na ang `Cookies` class ay mapupuntahan gamit ang `cookies` na katangian ng `Session`.

Halimbawa ng:

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

### Mga halimbawa ng mga kaganapan

Ang mga sumusunid na kaganapan ay maaring gamitin sa mga halimbawa ng `Cookies`:

#### Kaganapan: 'nagbago'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - Ang "cookie" na binago
* `sanhi` String - Ang mga sanhi ng mga pagbabago sa isa't isa sa mga sumusunod na mga halaga: 
  * `explicit` - Ang cookie ay direktang nagbago sa pamamagitan ng pagkilos ng isang mamimili.
  * `overwrite` - Ang cookie ay awtomatikong natanggal dahil sa ipinasok na operasyon na i-overwrite.
  * `expired` - Ang cookie ay awtomatikong natanggal dahil na-expired.
  * `evicted` - Ang cookie ay awtomatikong na-evicted sa panahon ng koleksyon ng basura.
  * `expired-overwrite` - Ang cookie na ito ay na-overwrite na may na-pasong pag-expire ng petsa.
* `removed` Boolean - `true` if the cookie was removed, `false` otherwise.

Emitted when a cookie is changed because it was added, edited, removed, or expired.

### Mga pamamaraan ng pagkakataon

The following methods are available on instances of `Cookies`:

#### `cookies.get(filter, callback)`

* `filter` Bagay 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (optional) - Filters cookies by name.
  * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`
  * `path` String (optional) - Retrieves cookies whose path matches `path`.
  * `secure` Boolean (optional) - Filters cookies by their Secure property.
  * `session` Boolean (optional) - Filters out session or persistent cookies.
* `tumawag muli` Punsyon 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.

Sends a request to get all cookies matching `details`, `callback` will be called with `callback(error, cookies)` on complete.

#### `cookies.set(details, callback)`

* `details` Bagay 
  * `url` String - The url to associate the cookie with.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - The domain of the cookie. Empty by default if omitted.
  * `path` String (optional) - The path of the cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `tumawag muli` Punsyon 
  * `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

#### `cookies.remove(url, name, callback)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.
* `callback` Function

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

#### `cookies.flushStore(callback)`

* `callback` Function

Writes any unwritten cookies data to disk.