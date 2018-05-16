# 通知

> OSのデスクトップ通知を作成します。

プロセス: [Main](../glossary.md#main-process)

## レンダラープロセスでの使い方

レンダラープロセスから通知を表示したい場合は、[HTML5 Notification API](../tutorial/notifications.md) を使用する必要があります

## クラス: Notification

> OSのデスクトップ通知を作成します。

プロセス: [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

`options` によって設定されたネイティブプロパティで新しい `Notification` を生成します。

### 静的メソッド

`Notification` クラスには、次の静的メソッドがあります。

#### `Notification.isSupported()`

戻り値 `Boolean` - 現在のシステムでデスクトップ通知がサポートされているかどうか。

### `new Notification([options])` *実験的*

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

### インスタンスイベント

`new Notification` で作成されたオブジェクトでは以下のイベントが発生します。

**注:** いくつかのイベントは特定のオペレーティングシステムでのみ利用可能で、そのように注記がつけられています。

#### イベント: 'show'

戻り値:

* `event` Event

通知がユーザーに表示されたときに発行されます。`show()` メソッドを使用して通知を複数回表示できることに注意して下さい。

#### イベント: 'click'

戻り値:

* `event` Event

ユーザによって通知がクリックされたときに発行されます。

#### イベント: 'close'

戻り値:

* `event` Event

ユーザの手によって手動で通知が閉じられたときに発行されます。

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### イベント: 'reply' *macOS*

戻り値:

* `event` Event
* `reply` String - The string the user entered into the inline reply field.

`hasReply: true` の通知上で、ユーザが "返信" ボタンをクリックしたときに発行されます。

#### イベント: 'action' *macOS*

戻り値:

* `event` Event
* `index` Number - The index of the action that was activated.

### インスタンスメソッド

`new Notification` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

#### `notification.show()`

HTML5 Notification の実装とは異なり、`new Notification` で簡単にインスタンス化するだけでは、すぐにユーザに表示されないことに注意してください。OS が表示するためにこのメソッドを呼び出す必要があります。

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

Dismisses the notification.

### サウンドの再生

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/ライブラリ/Sounds`
* `/ライブラリ/Sounds`
* `/ネットワーク/ライブラリ/Sounds`
* `/システム/ライブラリ/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.