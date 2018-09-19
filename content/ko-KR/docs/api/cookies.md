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
* `removed` Boolean - cookie가 삭제되었으면 `true`이고, 그렇지 않으면, `false`이다.

Cookie가 추가, 수정, 삭제, 만료로 인해 변경된 경우 호출된다.

### 인스턴스 메서드

`Cookies` 인스턴스는 다음의 메서드를 사용할 수 있다.

#### `cookies.get(filter, callback)`

* `filter` Object 
  * `url` String (optional) - cookies에서 주어진 url에 관련된 정보를 조사한다. `url`을 공백으로 준 경우 모든 url에 대해서 조사한다.
  * `name` String (optional) - name 기반으로 필터를 함.
  * `domain` - String (optional) - `domains`과 같거나 subdomain을 cookies에서 찾는다.
  * `path` String (optional) - `path`와 같은 경로를 갖는 cookies에서 찾는다.
  * `secure` Boolean (optional) - Secure 속성으로 필터를 함.
  * `session` Boolean (optional) - session 혹은 영구 cookies를 필터를 함.
* `callback` 함수 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - cookie 오브젝트 배열.

`filter`, `callback`이 매칭되는 모든 cookies를 얻기 위한 요청이 완료되면, `callback(error, cookies)`이 호출된다.

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