## 类：服务工作者

> 查询和接收来自会话中现役服务人员的事件。

进程：[主进程](../glossary.md#main-process)

使用 `Session`的 `serviceWorkers` 属性访问 `ServiceWorkers` 类的实例。

例如：

```javascript
康斯特 { session } =要求（"电子"）

//获取所有服务人员。
控制台.log（会话.默认服务人员.getallRunning）

//处理日志，并在会话
获取服务人员信息。 （事件，消息尾部）=> •
  控制台.log（
    "获取服务人员消息"，
    消息尾声，
    "来自"，
    会话。默认服务人员。从"服务人员"（消息尾部.versionId）
  ）
}）
```

### 实例事件

下列活动可在 `ServiceWorkers`：

#### Event: 'console-message'

返回:

* `event` Event
* `messageDetails` 对象 - 有关控制台消息的信息
  * `message` 字符串 - 实际控制台消息
  * `versionId` 号码 - 发送日志消息的服务人员的版本 ID
  * `source` 字符串 - 此消息的源类型。  可 `javascript`、 `xml`、 `network`、 `console-api`、 `storage`、 `app-cache`、 `rendering`、 `security`、 `deprecation`、 `worker`、 `violation`、 `intervention`、 `recommendation` 或 `other`。
  * `level` 编号 - 日志级别，从 0 到 3。 为了它匹配 `verbose`， `info`， `warning` 和 `error`。
  * `sourceUrl` 字符串 - 消息来自的 URL
  * `lineNumber` 编号 - 触发此控制台消息的源的行数

当服务人员将某些东西记录到控制台时发出。

### 实例方法

下列方法可适用于 `ServiceWorkers`：

#### `服务工人。获取所有运行（）`

返回 `Record<Number, ServiceWorkerInfo>` - [服务工作者信息](structures/service-worker-info.md) 对象，其中密钥是服务人员版本 ID，值是有关该服务人员的信息。

#### `服务工人。从反向ID（版本ID）获取`

* `versionId` 编号

返回 [`ServiceWorkerInfo`](structures/service-worker-info.md) - 有关此服务人员的信息

如果服务人员不存在或没有运行此方法将抛出一个例外。
