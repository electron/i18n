## クラス: Cookies

> セッションのクッキーをクエリーしたり、変更したりします。

プロセス: [Main](../glossary.md#main-process)

`Cookies` クラスのインスタンスには、`Session` の `cookies` プロパティを使用してアクセスします。

例:

```javascript
const {session} = require('electron')

// すべてのクッキーをクエリーします。
session.defaultSession.cookies.get({}, (error, cookies) => {
  console.log(error, cookies)
})

// 特定のURLに関連付けられているすべてのクッキーをクエリーします。
session.defaultSession.cookies.get({url: 'http://www.github.com'}, (error, cookies) => {
  console.log(error, cookies)
})

// 指定したクッキーのデータでクッキーを設定します。
// 同一のクッキーが存在する場合、上書きする可能性があります。
const cookie = {url: 'http://www.github.com', name: 'dummy_name', value: 'dummy'}
session.defaultSession.cookies.set(cookie, (error) => {
  if (error) console.error(error)
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
  * `cookies` [Cookie[]](structures/cookie.md) - クッキーオブジェクトの配列。

`filter` と一致するすべてのクッキーを取得するリクエストを送信します。完了時に `callback(error, cookies)` で `callback` が呼び出されます。

#### `cookies.set(details, callback)`

* `details` Object 
  * `url` String - クッキーに関連付けられるURL。
  * `name` String (任意) - クッキーの名前。省略した場合、既定では空です。
  * `value` String (任意) - クッキーの値。省略した場合、既定では空です。
  * `domain` String (任意) - クッキーのドメイン。省略した場合、既定では空です。
  * `path` String (任意) - クッキーのパス。省略した場合、既定では空です。
  * `secure` Boolean (任意) - クッキーにSecure属性がついているかどうか。省略値は、falseです。
  * `httpOnly` Boolean (任意) - クッキーにHttpOnly属性がついているかどうか。省略値は、falseです。
  * `expirationDate` Double (任意) - UNIX時間の秒数によるCookieの有効期限。 省略した場合、クッキーはセッションクッキーになり、セッション間では保持されなくなります。
* `callback` Function 
  * `error` Error

`details` でクッキーを設定します。完了時に `callback(error)` で `callback` が呼び出されます。

#### `cookies.remove(url, name, callback)`

* `url` String - クッキーに関連付けられたURL。
* `name` String - 削除するクッキーの名前。
* `callback` Function

`url` と `name` に一致するクッキーを削除します。完了時に `callback()` で `callback` が呼び出されます。

#### `cookies.flushStore(callback)`

* `callback` Function

未書き込みのクッキーのデータをディスクに書き込みます。