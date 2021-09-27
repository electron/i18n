## Class: ServiceWorkers

> 从活跃的 service worker 会话中查询和接收事件

Process: [Main](../glossary.md#main-process)<br /> _This class is not exported from the `'electron'` module. It is only available as a return value of other methods in the Electron API._

通过`Session`的`serviceWorkers`属性来访问`ServiceWorkers`的实例

例如：

```javascript
const { session } = require('electron')

// Get all service workers.
console.log(session.defaultSession.serviceWorkers.getAllRunning())

// Handle logs and get service worker info
session.defaultSession.serviceWorkers.on('console-message', (event, messageDetails) => {
  console.log(
    'Got service worker message',
    messageDetails,
    'from',
    session.defaultSession.serviceWorkers.getFromVersionID(messageDetails.versionId)
  )
})
```

### 实例事件

`ServiceWorkers`实例中有下列事件：

#### Event: 'console-message'

返回:

* `event` Event
* `messageDetails` Object - 有关控制台消息的信息
  * `message` String - 实际控制台消息
  * `versionId` Number - 发送消息日志的 service worker 的版本 ID
  * `source` String - 消息源的类型  可以是 `javascript`, `xml`, `network`, `console-api`, `storage`, `app-cache`, `rendering`, `security`, `deprecation`, `worker`, `violation`, `intervention`, `recommendation` 或 `other`.
  * `level` Number - 日志等级，从 0 到 3 。 按顺序匹配 `verbose`, `info`, `warning` 和 `error`.
  * `sourceUrl` String - 消息来源的URL
  * `lineNumber` Number - 触发当前控制台消息的源代码行数

当一个service worker记录日志到控制台的时候将自动触发此事件

#### Event: 'registration-completed'

返回:

* `event` Event
* `details` Object - 有关 service worker 注册的信息
  * `scope` String - 当前 service worker 所注册在的URL

当一个service worker已经被注册完成的时候触发此事件。 注册完成分两种情况， 一个是调用[`navigator.serviceWorker.register('/sw.js')`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)方法成功，另一个是当Chrome的扩展加载结束。

### 实例方法

在`ServiceWorkers`实例对象中，有以下方法:

#### `serviceWorkers.getAllRunning()`

返回 `Record<Number, ServiceWorkerInfo>` ， 一个 [ServiceWorkerInfo](structures/service-worker-info.md) 对象， 其中键是 service worker 的版本 ID ，值是 service worker 的信息。

#### `serviceWorkers.getFromVersionID(versionId)`

* `versionId` Number

返回 [`ServiceWorkerInfo`](structures/service-worker-info.md) - service worker的相关信息

如果 service worker 不存在或者停止运行，此方法将抛出异常。
