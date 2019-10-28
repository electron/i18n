## 类：Cookies

> 查询和修改一个会话的cookies

线程：[主线程](../glossary.md#main-process)

通过`Session`的`cookies`属性来访问`Cookies`的实例

例如：

```javascript
const { session } = require('electron')

// 查询所有 cookies。
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// 查询所有与设置的 URL 相关的所有 cookies.
session.defaultSession.cookies.get({ url: 'http://www.github.com' })
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })

// 设置一个 cookie，使用设置的名称；
// 如果存在，则会覆盖原先 cookie.
const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
  .then(() => {
    // success
  }, (error) => {
    console.error(error)
  })
```

### 实例事件

以下事件会在` Cookies `实例触发。

#### Event: 'changed'

* `event` Event
* `cookie` [Cookie](structures/cookie.md) - 变更后的 cookie 值。
* `cause` String - cookie 值变动的原因，该变量可能的值为： 
  * ` explicit ` - cookie 是由消费者的操作直接更改的。
  * ` overwrite ` - 一个覆盖原值的插入操作导致的 cookie 被自动删除。
  * ` expired ` - cookie 在过期时自动删除。
  * ` evicted ` - 在GC（垃圾回收机制）过程中被回收。
  * `expired-overwrite` - 一个已过期的时间覆写了原cookie 的过期时间。
* `removed` Boolean - `true `表示cookie 已被删掉, 否则为` false`.

该事件在cookie 被添加、修改、删除或过期时触发。

### 实例方法

以下方法可以在` Cookies `实例调用。

#### `cookies.get(filter)`

* `filter` Object - 过滤器对象，包含过滤参数 
  * `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all URLs.
  * ` name `String (可选) - 按名称筛选 cookie。
  * `domain` String (optional) - 检索与域名或者 `domain` 子域名匹配的cookie。
  * ` path `String (可选) - 检索路径与 ` path ` 匹配的 cookie。
  * ` secure `Boolean (可选) - 通过其Secure 属性筛选 cookie。
  * ` session `Boolean (可选) - 筛选出session 内可用或持久性 cookie。

返回 `Promise<Cookie[]>` - 一个会解析成数组或者 cookie 对象的 promise。

Sends a request to get all cookies matching `filter`, and resolves a promise with the response.

#### `cookies.set(details)`

* `details` Object 
  * `url` String - The URL to associate the cookie with. The promise will be rejected if the URL is invalid.
  * ` name `String (可选) - cookie 名称。如果省略, 则默认为空。
  * ` value `String (可选) - cookie 值。如果省略, 则默认为空。
  * `domain` String (可选) - cookie所在域名，通常使用点号开头，以使其对子域名可用。未指定时默认为空。
  * ` path `String (可选) - cookie 的路径。如果省略, 则默认为空。
  * ` secure `Boolean (可选) - 是否将 cookie 标记为Secure。默认为 false。
  * ` httpOnly `Boolean (可选) - 是否只将 cookie 标记为 只允许HTTP 访问。默认为 false。
  * ` expirationDate `Double (可选) - cookie 的到期日期，类型为时间戳，单位为秒。 如果省略, 则 cookie 将成为会话 cookie, 并且不会在会话之间保留。

返回 `Promise<void>` - cookie 设置时解析的一个 promise。

用 `details` 去设置一个 cookie。

#### `cookies.remove(url, name)`

* ` url `String - 与 cookie 关联的 URL。
* ` name `String - cookie 名称。

返回 `Promise<void>` - cookie 移除时解析的的一个 promise。

移除与`url` 和 `name`匹配的 cookie。

#### `cookies.flushStore()`

返回 `Promise<void>` - 一个在 cookie 写入时解析的 promise。

写入所有未写入磁盘的 cookie。