# Notification

> デスクトップ通知を作成します。

プロセス: [Main](../glossary.md#main-process)

## Using in the renderer process

レンダラープロセスから通知を表示したい場合[HTML5 通知 API](../tutorial/notifications.md) を使用する必要があります

## Class: Notification

> デスクトップ通知を作成します。

プロセス: [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter).

`Notification` によって設定されたネイティブプロパティで新しい `BrowserWindow` を生成します。

### 静的メソッド

`Notification` クラスには、次の静的メソッドがあります。

#### `Notification.isSupported()`

Returns `Boolean` - Whether or not desktop notifications are supported on the current system

### `new Notification([options])` *Experimental*

* `options` オブジェクト 
  * `title` String - 通知ウィンドウの上部に表示される通知のタイトル
  * `subtitle` String - (optional) は、タイトルの下が表示されます、通知のサブタイトルです。*macOS*
  * `body` String - タイトルやサブタイトルの下に表示さる、本文
  * `silent` Boolean - (optional) 通知を表示するときに音を鳴らしてOSが通知するかどうか決めます
  * `icon` (String | [NativeImage](native-image.md)) - (optional) An icon to use in the notification
  * `hasReply` Boolean - (optional) インラインを追加するかどうかの返信通知するオプションです。 *macOS*
  * `replyPlaceholder` String - (optional) The placeholder to write in the inline reply input field. *macOS*
  * `sound` String - (optional) The name of the sound file to play when the notification is shown. *macOS*
  * `actions` [NotificationAction[]](structures/notification-action.md) - (optional) Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation *macOS*

### インスタンスイベント

Objects created with `new Notification` emit the following events:

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### イベント: 'show'

戻り値:

* `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### Event: 'click'

戻り値：

* `event` Event

Emitted when the notification is clicked by the user.

#### イベント: 'close'

戻り値:

* `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### Event: 'reply' *macOS*

戻り値:

* `event` Event
* `reply` String - The string the user entered into the inline reply field

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' *macOS*

戻り値:

* `event` Event
* `index` Number - The index of the action that was activated

### インスタンスメソッド

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, simply instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.