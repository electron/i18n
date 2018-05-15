# 通知

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

## 在渲染进程中使用

如果要显示来自渲染进程的通知, 你应该使用 [ HTML5 Notification API ](../tutorial/notifications.md)

## 类: Notification

> 创建OS(操作系统)桌面通知

进程：[主进程](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

通过 ` options ` 来设置的一个新的原生 ` Notification `。

### 静态方法

`Notification` 类有以下静态方法：

#### `Notification.isSupported()`

Returns ` Boolean `-无论当前系统是否支持桌面通知

### `new Notification([options])` *实验功能*

* `选项` 对象 
  * `title` String - A title for the notification, which will be shown at the top of the notification window when it is shown.
  * `subtitle` String (optional) *macOS* - A subtitle for the notification, which will be displayed below the title.
  * `body` String - The body text of the notification, which will be displayed below the title or subtitle.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (optional) - An icon to use in the notification.
  * `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
  * `sound` String (optional) *macOS* - The name of the sound file to play when the notification is shown.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

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
* `reply` String - The string the user entered into the inline reply field.

当用户单击 ` hasReply: true ` 的通知上的 "Reply" 按钮时触发。

#### 事件: 'action' *macOS*

返回:

* `event` Event
* `index` Number - The index of the action that was activated.

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