# 通知

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

## 在渲染进程中使用

如果要显示来自渲染进程的通知, 你应该使用 [ HTML5 Notification API ](../tutorial/notifications.md)

## 类: Notification

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

通过 ` options ` 来设置的一个新的原生 ` Notification `。

### 静态方法

`Notification` 类有以下静态方法：

#### `Notification.isSupported()`

Returns ` Boolean `-当前系统是否支持桌面通知

### `new Notification([options])` _实验功能_

* `options` Object (optional)
  * ` title `String - 通知的标题, 将在通知窗口的顶部显示.
  * ` subtitle `String (可选) 通知的副标题, 显示在标题下面。_ macOS _
  * ` body `String 通知的正文文本, 将显示在标题或副标题下面.
  * ` silent `Boolean (可选) 在显示通知时是否发出系统提示音。
  * ` icon`(String | [ NativeImage ](native-image.md)) (可选) 用于在该通知上显示的图标。
  * ` hasReply `Boolean (可选) 是否在通知中添加一个答复选项。 _ macOS _
  * `timeoutType` String (optional) _Linux_ _Windows_ - The timeout duration of the notification. Can be 'default' or 'never'.
  * ` replyPlaceholder `String (可选) 答复输入框中的占位符。_ macOS _
  * `sound `String (可选) 显示通知时播放的声音文件的名称。_ macOS _
  * `urgency` String (optional) _Linux_ - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
  * `actions` [NotificationAction[]](structures/notification-action.md) (可选) _macOS_ - 要添加到通知中的操作 请阅读 `NotificationAction`文档来了解可用的操作和限制。
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

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

### 实例方法

用`new Notification` 创建的对象有以下实例方法：

#### `notification.show()`

即时向用户展示 notification ，请注意这意味着与HTML5的 Notification 的实现不同，实例化一个`new Notification` 不会立刻向用户展示， 你需要在系统将要显示它之前调用这个方法

如果 notification 已展示过，此方法将忽略以前显示的 notification，并创建具有相同属性的新通知

#### `notification.close()`

忽略这条通知

### 实例属性

#### `notification.title`

A `String` property representing the title of the notification.

#### `notification.subtitle`

A `String` property representing the subtitle of the notification.

#### `notification.body`

A `String` property representing the body of the notification.

#### `notification.replyPlaceholder`

A `String` property representing the reply placeholder of the notification.

#### `notification.sound`

A `String` property representing the sound of the notification.

#### `notification.closeButtonText`

A `String` property representing the close button text of the notification.

#### `notification.silent`

A `Boolean` property representing whether the notification is silent.

#### `notification.hasReply`

A `Boolean` property representing whether the notification has a reply action.

#### `notification.urgency` _Linux_

A `String` property representing the urgency level of the notification. Can be 'normal', 'critical', or 'low'.

Default is 'low' - see [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) for more information.

#### `notification.timeoutType` _Linux_ _Windows_

A `String` property representing the type of timeout duration for the notification. Can be 'default' or 'never'.

If `timeoutType` is set to 'never', the notification never expires. It stays open until closed by the calling API or the user.

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### 播放声音

在 macOS 上, 您可以指定在显示通知时要播放的声音的名称。 Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. 请确保声音文件是在应用程序包(例如, ` YourApp.app/Contents/Resources`) 内存在副本, 或者是下列位置之一:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

有关详细信息, 请参见 [` NSSound `](https://developer.apple.com/documentation/appkit/nssound) 文档。
