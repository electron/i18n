## Class: Cookies

> 세션 쿠키를 가져오거나 수정합니다.

프로세스: [Main](../glossary.md#main-process)

`Cookies` 클래스는 `Session` 의`cookies` 속성을 이용해 접근합니다.

예시:

```javascript
const { session } = require('electron')

// 모든 쿠키 쿼리.
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
    // 성공
  }, (error) => {
    console.error(error)
  })
```

### 인스턴스 이벤트

아래의 이벤트들은 `Cookies` 인스턴스를 통해 사용할 수 있다.

#### Event: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - 변경된 cookie 값
* `cause` String - The cause of the change with one of the following values:
  * `explicit` - 사용자가 의도적으로 cookie를 변경하였음.
  * `overwrite` - 덮어쓰기에 의해 cookie가 자동으로 삭제되었음.
  * `expired` - 기간 만료로 cookie가 자동으로 삭제되었음.
  * `evicted` - gabage collextion으로 인해 cookie가 자동으로 삭제되었음.
  * `expired-overwrite` - 이미 만료된 기간으로 cookie가 덮어 씌어졌음.
* `removed` Boolean - cookie가 삭제되었으면 `true`이고, 그렇지 않으면, `false`이다.

Cookie가 추가, 수정, 삭제, 만료로 인해 변경된 경우 호출된다.

### 인스턴스 메서드

`Cookies` 인스턴스는 다음의 메서드를 사용할 수 있다.

#### `cookies.get(filter)`

* `filter` Object
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * `name` String (optional) - name 기반으로 필터를 함.
  * `domain` - String (optional) - `domains`과 같거나 subdomain을 cookies에서 찾는다.
  * `path` String (optional) - `path`와 같은 경로를 갖는 cookies에서 찾는다.
  * `secure` Boolean (optional) - Secure 속성으로 필터를 함.
  * `session` Boolean (optional) - session 혹은 영구 cookies를 필터를 함.

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.set(details)`

* `details` Object
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `도메인` String (옵션) - 쿠키의 도메인; 앞의 점으로 정규화 되어 서브도메인에도 유효합니다. Empty by default if omitted.
  * `경로` String(옵션) - 쿠키의 경로 Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

#### `cookies.remove(url, name)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Writes any unwritten cookies data to disk.
