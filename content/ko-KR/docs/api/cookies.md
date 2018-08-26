## Class: Cookies

> 세션 쿠키를 가져오거나 수정합니다.

프로세스:[Main](../glossary.md#main-process)

`Cookies` 클래스는 `Session` 의`cookies` 속성을 이용해 접근합니다.

예시:

```javascript
const {session} = require('electron')

// Query all cookies.
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// Query all cookies associated with a specific url.
session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
  console.log(error, cookies)
})

// Set a cookie with the given cookie data;
// may overwrite equivalent cookies if they exist.
const cookie = {url: 'http://www.github.com', name: 'dummy_name', value: 'dummy'}
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
})
```

### 인스턴스 이벤트

아래의 이벤트들은 `Cookies` 인스턴스를 통해 사용할 수 있다.

#### Event: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - 변경된 cookie 값
* `cause` String - 변경 원인은 다음 항목들 중 하나임. 
  * `explicit` - 사용자가 의도적으로 cookie를 변경하였음.
  * `overwrite` - 덮어쓰기에 의해 cookie가 자동으로 삭제되었음.
  * `expired` - 기간 만료로 cookie가 자동으로 삭제되었음.
  * `evicted` - gabage collextion으로 인해 cookie가 자동으로 삭제되었음.
  * `expired-overwrite` - 이미 만료된 기간으로 cookie가 덮어 씌어졌음.
* `removed` Boolean - `true` if the cookie was removed, `false` otherwise.

Emitted when a cookie is changed because it was added, edited, removed, or expired.

### 인스턴스 메서드

The following methods are available on instances of `Cookies`:

#### `cookies.get(filter, callback)`

* `filter` Object 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
  * `name` String (optional) - Filters cookies by name.
  * `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
  * `path` String (optional) - Retrieves cookies whose path matches `path`.
  * `secure` Boolean (optional) - Filters cookies by their Secure property.
  * `session` Boolean (optional) - Filters out session or persistent cookies.
* `callback` 함수 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

#### `cookies.set(details, callback)`

* `details` Object 
  * `url` String - The url to associate the cookie with.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - The domain of the cookie. Empty by default if omitted.
  * `path` String (optional) - The path of the cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
* `callback` 함수 
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