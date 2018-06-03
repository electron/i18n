## Cookies

> 查询和修改一个会话的cookies

线程：[主线程](../glossary.md#main-process)

通过`Session`的`cookies`属性来访问`Cookies`的实例

例如：

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

#### `cookies.get(filter, callback)`

* `filter` Object - 过滤器对象，包含过滤参数 
  * ` url `String (可选) - 检索与 ` url ` 关联的 cookie。空意味着检索所有 url 的 cookie。
  * ` name `String (可选) - 按名称筛选 cookie。
  * `domain` String (optional) - 检索与域名或者 `domain` 子域名匹配的cookie。
  * ` path `String (可选) - 检索路径与 ` path ` 匹配的 cookie。
  * ` secure `Boolean (可选) - 通过其Secure 属性筛选 cookie。
  * ` session `Boolean (可选) - 筛选出session 内可用或持久性 cookie。
* `callback` Function - 回调函数 
  * `error` Error
  * `cookies` [Cookie[]](structures/cookie.md) - 返回的cookie 对象数组.

发送一个请求获取所有匹配 `filter` 对象条件的cookie，回调函数将在请求结束后以 `callback(error, cookies)` 的形式被调用。

#### `cookies.set(details, callback)`

* `details` Object 
  * ` url `String - 与 cookie 关联的 url。
  * ` name `String (可选) - cookie 名称。如果省略, 则默认为空。
  * ` value `String (可选) - cookie 值。如果省略, 则默认为空。
  * ` domain `String (可选) - cookie 的域名。如果省略, 则默认为空。
  * ` path `String (可选) - cookie 的路径。如果省略, 则默认为空。
  * ` secure `Boolean (可选) - 是否将 cookie 标记为Secure。默认为 false。
  * ` httpOnly `Boolean (可选) - 是否只将 cookie 标记为 只允许HTTP 访问。默认为 false。
  * ` expirationDate `Double (可选) - cookie 的到期日期，类型为时间戳，单位为秒。 如果省略, 则 cookie 将成为会话 cookie, 并且不会在会话之间保留。
* `callback` Function - 回调函数 
  * `error` Error

设置一个以` details `对象为模型的cookie，回调函数将在设置执行后以` callback(error) `形式被调用。

#### `cookies.remove(url, name, callback)`

* ` url `String - 与 cookie 关联的 URL。
* ` name `String - cookie 名称。
* `callback` Function

删除与 ` url ` 和 ` name ` 相匹配的 cookie, 回调函数将在执行完成时被调用。

#### `cookies.flushStore(callback)`

* `callback` Function

写入所有未写入磁盘的 cookie。