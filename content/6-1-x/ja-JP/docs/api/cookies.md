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

// 特定のurlに関連した全てのクッキーを問い合わせ
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// 与えられたクッキーデータでクッキーをセット
// 同等なクッキーが存在していた場合、それを上書きすることあり
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // 成功
  }, (error) => {
    console.error(error)
  })
```

### インスタンスイベント

`Cookies` のインスタンスでは、以下のイベントが利用できます。

#### イベント: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - 変更された cookie。
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
  * `url` String (任意) - `url` に関連付けられた Cookie を取得します。 空の場合は全ての URL の Cookie を取得します。
  * `name` String (任意) - 名前でクッキーをフィルタリングします。
  * `domain` String (任意) - クッキーのドメインと一致するか、ドメインが `domains` のサブドメインであるクッキーを取得します。
  * `path` String (任意) - クッキーのパスが `path` と一致するクッキーを取得します。
  * `secure` Boolean (任意) - Secureプロパティでクッキーをフィルタリングします。
  * `session` Boolean (任意) - セッションまたは永続的クッキーでフィルタリングします。

戻り値 `Promise<Cookie[]>` - cookie オブジェクトの配列で解決される Promise。

`filter` に一致するすべての cookie を取得するリクエストを送り、そのレスポンスで Promise を解決します。

#### `cookies.get(filter, callback)`

* `filter` Object
  * `url` String (任意) - `url` に関連付けられた Cookie を取得します。 空の場合は全ての URL の Cookie を取得します。
  * `name` String (任意) - 名前でクッキーをフィルタリングします。
  * `domain` String (任意) - クッキーのドメインと一致するか、ドメインが `domains` のサブドメインであるクッキーを取得します。
  * `path` String (任意) - クッキーのパスが `path` と一致するクッキーを取得します。
  * `secure` Boolean (任意) - Secureプロパティでクッキーをフィルタリングします。
  * `session` Boolean (任意) - セッションまたは永続的クッキーでフィルタリングします。
* `callback` Function
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - クッキーオブジェクトの配列。

`filter` と一致するすべてのクッキーを取得するリクエストを送信します。完了時に `callback(error, cookies)` で `callback` が呼び出されます。

**[非推奨予定](modernization/promisification.md)**

#### `cookies.set(details)`

* `details` Object
  * `url` String - クッキーに関連付けられるURL。 URL が不正な場合、 Promise は reject されます。
  * `name` String (任意) - Cookie の名前。 省略された場合は既定で空になります。
  * `value` String (任意) - Cookie の値。 省略された場合は既定で空になります。
  * `domain` String (任意) - Cookie のドメインです。これはサブドメインでも有効になるように最初のドットで正規化されます。 省略された場合は既定で空になります。
  * `path` String (optional) - Cookie のパス。 省略された場合は既定で空になります。
  * `secure` Boolean (任意) - Cookie に Secure フラグがついているか。 省略値は false です。
  * `httpOnly` Boolean (任意) - Cookie に HttpOnly フラグがついているか。 省略値は、false です。
  * `expirationDate` Double (任意) - UNIX時間の秒数によるCookieの有効期限。 省略した場合、クッキーはセッションクッキーになり、セッション間では保持されなくなります。

戻り値 `Promise<void>` - cookie が設定されたときに解決される Promise。

cookie を `details` で設定します。

#### `cookies.set(details, callback)`

* `details` Object
  * `url` String - クッキーに関連付けられるURL。
  * `name` String (任意) - Cookie の名前。 省略された場合は既定で空になります。
  * `value` String (任意) - Cookie の値。 省略された場合は既定で空になります。
  * `domain` String (任意) - Cookie のドメイン。 省略された場合は既定で空になります。
  * `path` String (optional) - Cookie のパス。 省略された場合は既定で空になります。
  * `secure` Boolean (任意) - Cookie に Secure フラグがついているか。 省略値は false です。
  * `httpOnly` Boolean (任意) - Cookie に HttpOnly フラグがついているか。 省略値は、false です。
  * `expirationDate` Double (任意) - UNIX時間の秒数によるCookieの有効期限。 省略した場合、クッキーはセッションクッキーになり、セッション間では保持されなくなります。
* `callback` Function
  * `error` Error

`details` でクッキーを設定します。完了時に `callback(error)` で `callback` が呼び出されます。

**[非推奨予定](modernization/promisification.md)**

#### `cookies.remove(url, name)`

* `url` String - クッキーに関連付けられたURL。
* `name` String - 削除するクッキーの名前。

戻り値 `Promise<void>` - cookie が削除されたときに解決される Promise。

`url` と `name` が一致する cookie を削除します。

#### `cookies.remove(url, name, callback)`

* `url` String - クッキーに関連付けられたURL。
* `name` String - 削除するクッキーの名前。
* `callback` Function

`url` と `name` に一致するクッキーを削除します。完了時に `callback()` で `callback` が呼び出されます。

**[非推奨予定](modernization/promisification.md)**

#### `cookies.flushStore()`

戻り値 `Promise<void>` - cookie ストアがフラッシュされたときに解決される Promise。

未書き込みのクッキーのデータをディスクに書き込みます。

#### `cookies.flushStore(callback)`

* `callback` Function

未書き込みのクッキーのデータをディスクに書き込みます。

**[非推奨予定](modernization/promisification.md)**
