# 通知

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

## 在渲染进程中使用

如果要显示来自渲染进程的通知, 你应该使用 [ HTML5 Notification API ](../tutorial/notifications.md)

## 类: Notification

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

`Notification` 是一个 [事件][event-emitter]。

通过 ` options ` 来设置的一个新的原生 ` Notification `。

### 静态方法

`Notification` 类有以下静态方法：

#### `Notification.isSupported()`

Returns ` Boolean `-当前系统是否支持桌面通知

### `新通知（[options]）`

* `options` Object (可选)
  * `title` 字符串（可选） - 通知的标题，当通知窗口显示时，该标题将显示在通知窗口的顶部。
  * ` subtitle `String (可选) 通知的副标题, 显示在标题下面。_ macOS _
  * `body` 字符串（可选） - 通知的主体文本，将显示在标题或副标题下方。
  * ` silent `Boolean (可选) 在显示通知时是否发出系统提示音。
  * ` icon`(String | [ NativeImage ](native-image.md)) (可选) 用于在该通知上显示的图标。
  * ` hasReply `Boolean (可选) 是否在通知中添加一个答复选项。 _ macOS _
  * `timeoutType` 字符串（可选） _Linux_ _窗口_ - 通知的超时持续时间。 可以是"默认"或"从不"。
  * ` replyPlaceholder `String (可选) 答复输入框中的占位符。_ macOS _
  * `sound `String (可选) 显示通知时播放的声音文件的名称。_ macOS _
  * `urgency` 字符串（可选） _Linux_ - 通知的紧急级别。 可以是"正常"，"关键"或"低"。
  * `actions` [NotificationAction[]](structures/notification-action.md) (可选) _macOS_ - 要添加到通知中的操作 请阅读 `NotificationAction`文档来了解可用的操作和限制。
  * `closeButtonText` 字符串（可选） _macOS_ - 警报关闭按钮的自定义标题。 空字符串将导致使用默认的本地化文本。
  * `toastXml` 字符串（可选） _视窗_ - Windows 上的通知的自定义描述取代了上述所有属性。 全面定制通知的设计和行为。

### 实例事件

用 `new Notification` 创建的对象触发以下事件：

** 注意: **某些事件仅在特定的操作系统上可用, 这些方法会被标记出来。

#### 事件: 'show'

返回:

* `event` Event

当通知向用户显示时触发, 请注意, 这可能会多次触发, 因为「通知」可以通过 ` show() ` 方法多次显示。

#### 事件: 'click'

返回:

* `event` Event

在用户单击通知时触发。

#### 事件： 'close'

返回:

* `event` Event

当用户手动关闭通知时触发

当通知关闭后，这个事件不能保证在所有情况下都会触发。

#### 事件: 'reply' _macOS_

返回:

* `event` Event
* ` reply `String-用户在内联答复字段中输入的字符串.

当用户单击 ` hasReply: true ` 的通知上的 "Reply" 按钮时触发。

#### 事件: 'action' _macOS_

返回:

* `event` Event
* `index` Number - 已激活的操作的索引.

#### 事件：视窗</em>_"失败"</h4>

返回:

* `event` Event
* `error` 字符串 - 执行 `show()` 方法时遇到的错误。

在创建和显示原生通知时遇到错误时发出。

### 实例方法

用`new Notification` 创建的对象有以下实例方法：

#### `notification.show()`

即时向用户展示 notification ，请注意这意味着与HTML5的 Notification 的实现不同，实例化一个`new Notification` 不会立刻向用户展示， 你需要在系统将要显示它之前调用这个方法

如果 notification 已展示过，此方法将忽略以前显示的 notification，并创建具有相同属性的新通知

#### `notification.close()`

忽略这条通知

### 实例属性

#### `通知。标题`

代表通知标题的 `String` 属性。

#### `通知。字幕`

代表通知副标题的 `String` 属性。

#### `通知。身体`

代表通知主体的 `String` 属性。

#### `通知。回复位持有人`

代表通知回复占位符的 `String` 属性。

#### `通知。声音`

代表通知声音的 `String` 属性。

#### `通知。关闭按钮`

代表通知的关闭按钮文本的 `String` 属性。

#### `通知。无声`

`Boolean` 属性，表示通知是否为无声。

#### `通知。已恢复`

代表通知是否有回复操作的 `Boolean` 属性。

#### `notification.urgency` _·利努克斯·_

代表通知紧急级别的 `String` 属性。 可以是"正常"，"关键"或"低"。

默认值为"低" - 有关更多信息，请参阅 [通知](https://developer.gnome.org/notification-spec/#urgency-levels) 。

#### `notification.timeoutType` _Linux_ _视窗_

代表通知超时持续时间类型的 `String` 属性。 可以是"默认"或"从不"。

如果 `timeoutType` 设置为"从不"，则通知永远不会过期。 它保持开放状态，直到呼叫 API 或用户关闭。

#### `通知。行动`

代表通知操作的 [`NotificationAction[]`](structures/notification-action.md) 属性。

#### `notification.toastXml` _视窗_

代表通知的自定义烤面包 XML 的 `String` 属性。

### 播放声音

在 macOS 上, 您可以指定在显示通知时要播放的声音的名称。 除自定义声音文件外，还可以使用任何默认声音（根据系统首选项 > 声音）。 请确保声音文件是在应用程序包(例如, ` YourApp.app/Contents/Resources`) 内存在副本, 或者是下列位置之一:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

有关详细信息, 请参见 [` NSSound `](https://developer.apple.com/documentation/appkit/nssound) 文档。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
