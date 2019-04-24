## クラス: Cookies

> セッションのクッキーをクエリーしたり、変更したりします。

プロセス: [Main](../glossary.md#main-process)

`Cookies` クラスのインスタンスには、`Session` の `cookies` プロパティを使用してアクセスします。

例:

```javascript
const { session } = require('electron')

// すべてのクッキーをクエリーします。
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

### インスタンスイベント

`Cookies` のインスタンスでは、以下のイベントが利用できます。

#### イベント: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - 変更されたクッキー.
* `cause` String - 以下のいずれかの値となる変更の原因。 
  * `explicit` - ユーザーのアクションによってクッキーが直接変更されました。
  * `overwrite` - 上書きする挿入操作のため、クッキーが自動的に削除されました。
  * `expired` - 有効期限切れのため、クッキーが自動的に削除されました。
  * `evicted` - ガベージコレクション中にクッキーが自動的に破棄されました。
  * `expired-overwrite` - クッキーが既に期限切れの有効期限で上書きされました。
* `removed` Boolean - クッキーが削除された場合、`true`、それ以外は、`false`。

追加されたり、編集されたり、削除されたり、有効期限が切れたりすることによってクッキーが変更されたときに発生します。

### インスタンスメソッド

`Cookies` のインスタンスでは、以下のメソッドが利用できます。

#### `cookies.get(filter)`

* `filter` Object 
  * `url` String (任意) - `url` と関連付けられたクッキーを取得します。空は、すべてのURLのクッキーを取得することを意味します。
  * `name` String (任意) - 名前でクッキーをフィルタリングします。
  * `domain` String (任意) - クッキーのドメインと一致するか、ドメインが `domains` のサブドメインであるクッキーを取得します。
  * `path` String (任意) - クッキーのパスが `path` と一致するクッキーを取得します。
  * `secure` Boolean (任意) - Secureプロパティでクッキーをフィルタリングします。
  * `session` Boolean (任意) - セッションまたは永続的クッキーでフィルタリングします。

Returns `Promise<Cookie[]>` - A promise which resolves an array of cookie objects.

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.get(filter, callback)`

* `filter` Object 
  * `url` String (任意) - `url` と関連付けられたクッキーを取得します。空は、すべてのURLのクッキーを取得することを意味します。
  * `name` String (任意) - 名前でクッキーをフィルタリングします。
  * `domain` String (任意) - クッキーのドメインと一致するか、ドメインが `domains` のサブドメインであるクッキーを取得します。
  * `path` String (任意) - クッキーのパスが `path` と一致するクッキーを取得します。
  * `secure` Boolean (任意) - Secureプロパティでクッキーをフィルタリングします。
  * `session` Boolean (任意) - セッションまたは永続的クッキーでフィルタリングします。
* `callback` Function 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - an array of cookie objects.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

**[Deprecated Soon](promisification.md)**

#### `cookies.set(details)`

* `details` Object 
  * `url` String - The url to associate the cookie with.
  * `name` String (optional) - The name of the cookie. Empty by default if omitted.
  * `value` String (optional) - The value of the cookie. Empty by default if omitted.
  * `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
  * `path` String (optional) - The path of the cookie. Empty by default if omitted.
  * `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
  * `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
  * `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.

Returns `Promise<void>` - A promise which resolves when the cookie has been set

Sets a cookie with `details`.

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
* `callback` Function 
  * `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

**[Deprecated Soon](promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.

Returns `Promise<void>` - A promise which resolves when the cookie has been removed

Removes the cookies matching `url` and `name`

#### `cookies.remove(url, name, callback)`

* `url` String - The URL associated with the cookie.
* `name` String - The name of cookie to remove.
* `callback` Function

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

**[Deprecated Soon](promisification.md)**

#### `cookies.flushStore()`

Returns `Promise<void>` - A promise which resolves when the cookie store has been flushed

Writes any unwritten cookies data to disk.

#### `cookies.flushStore(callback)`

* `callback` Function

Writes any unwritten cookies data to disk.

**[Deprecated Soon](promisification.md)**