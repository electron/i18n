# Notification

> 產生作業系統桌面通知。

處理序: [主處理序](../glossary.md#main-process)

## 在畫面轉譯處理序中使用

If you want to show Notifications from a renderer process you should use the [HTML5 Notification API](../tutorial/notifications.md)

## Class: Notification

> 產生作業系統桌面通知。

處理序: [主處理序](../glossary.md#main-process)

`Notification` 是個 [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter)。

It creates a new `Notification` with native properties as set by the `options`.

### 靜態方法

The `Notification` class has the following static methods:

#### `Notification.isSupported()`

Returns `Boolean` - Whether or not desktop notifications are supported on the current system

### `new Notification([options])` *試驗中*

* `options` Object 
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

### 物件事件

Objects created with `new Notification` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### 事件: 'show'

回傳:

* `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### 事件: 'click'

回傳:

* `event` Event

Emitted when the notification is clicked by the user.

#### 事件: 'close'

回傳:

* `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### 事件: 'reply' *macOS*

回傳:

* `event` Event
* `reply` String - The string the user entered into the inline reply field.

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### 事件: 'action' *macOS*

回傳:

* `event` Event
* `index` Number - The index of the action that was activated.

### 物件方法

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, simply instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### 播放聲音

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.