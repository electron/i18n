# 通知

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

## 在渲染进程中使用

如果要显示来自渲染进程的通知, 你应该使用 [ HTML5 Notification API ](../tutorial/notifications.md)

## 类: Notification

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

`Notification` 是 [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter)

通过 ` options ` 来设置的一个新的原生 ` Notification `。

### 静态方法

`Notification` 类有以下静态方法：

#### `Notification.isSupported()`

Returns ` Boolean `-当前系统是否支持桌面通知

### `new Notification([options])` *实验功能*

* `选项` 对象 
  * ` title `String - 通知的标题, 将在通知窗口的顶部显示.
  * ` subtitle `String (可选) 通知的副标题, 显示在标题下面。* macOS *
  * ` body `String 通知的正文文本, 将显示在标题或副标题下面.
  * ` silent `Boolean (可选) 在显示通知时是否发出系统提示音。
  * ` icon`(String | [ NativeImage ](native-image.md)) (可选) 用于在该通知上显示的图标。
  * ` hasReply `Boolean (可选) 是否在通知中添加一个答复选项。 * macOS *
  * ` replyPlaceholder `String (可选) 答复输入框中的占位符。* macOS *
  * `sound `String (可选) 显示通知时播放的声音文件的名称。* macOS *
  * `actions` [NotificationAction[]](structures/notification-action.md) (可选) *macOS* - 要添加到通知中的操作 请阅读 `NotificationAction`文档来了解可用的操作和限制。
  * `closeButtonText` String (可选) *macOS* - 自定义的警告框关闭按钮文字。如果该字符串为空，那么将使用本地化的默认文本。

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

#### 事件: 'reply' *macOS*

返回:

* `event` Event
* ` reply `String-用户在内联答复字段中输入的字符串.

当用户单击 ` hasReply: true ` 的通知上的 "Reply" 按钮时触发。

#### 事件: 'action' *macOS*

返回:

* `event` Event
* `index` Number - 已激活的操作的索引.

### 实例方法

用`new Notification` 创建的对象有以下实例方法：

#### `notification.show()`

立即显示通知给用户，请注意这一点不同于 HTML5通知实现，只实例化一个 `new Notification` 不会马上显示给用户，你需要在OS将要显示它之前调用这个方法将显示它。

如果以前已显示通知, 则此方法将忽略以前显示的通知，并创建具有相同属性的新通知

#### `notification.close()`

忽略这条通知

### 播放声音

在 macOS 上, 您可以指定在显示通知时要播放的声音的名称。 除了自定义声音文件之外, 还可以使用任何默认声音 ("系统首选项" > "声音")。 请确保声音文件是在应用程序包(例如, ` YourApp.app/Contents/Resources`) 内存在副本, 或者是下列位置之一:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

有关详细信息, 请参见 [` NSSound `](https://developer.apple.com/documentation/appkit/nssound) 文档。