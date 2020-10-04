# 通知

> OSのデスクトップ通知を作成します。

プロセス: [Main](../glossary.md#main-process)

## レンダラープロセスでの使い方

レンダラープロセスから通知を表示したい場合は、[HTML5 Notification API](../tutorial/notifications.md) を使用する必要があります

## クラス: Notification

> OSのデスクトップ通知を作成します。

プロセス: [Main](../glossary.md#main-process)

`Notification` は [EventEmitter][event-emitter] を継承しています。

`options` によって設定されたネイティブプロパティで新しい `Notification` を生成します。

### 静的メソッド

`Notification` クラスには、次の静的メソッドがあります。

#### `Notification.isSupported()`

戻り値 `Boolean` - 現在のシステムでデスクトップ通知がサポートされているかどうか。

### `new Notification([options])`

* `options` Object (任意)
  * `title` String - 通知ウィンドウの上部に表示される通知のタイトル.
  * `subtitle` String (任意) _macOS_ - タイトルの下に表示される、通知のサブタイトル。
  * `body` String - タイトルやサブタイトルの下に表示さる、通知の本文。
  * `silent` Boolean (任意) - 通知を表示するときにOSが通知音を鳴らすかどうか。
  * `icon` (String | [NativeImage](native-image.md)) (任意) - 通知に使用されるアイコン。
  * `hasReply` Boolean (任意) _macOS_ - 通知に埋め込み返信オプションを追加するかどうか。
  * `timeoutType` String (任意) _Linux_ _Windows_ - 通知の消失までの時間。 'default' か 'never' にできます。
  * `replyPlaceholder` String (任意) _macOS_ - 埋め込み返信入力フィールド内に書かれるプレースホルダ。
  * `sound` String (任意) _macOS_ - 通知が表示されるときに再生される音声ファイルの名前。
  * `urgency` String (任意) _Linux_ - 通知の緊急度レベル。 'normal'、'critical'、'low' のいずれかにできます。
  * `actions` [NotificationAction[]](structures/notification-action.md) (任意) _macOS_ - 通知に追加するアクション。 `NotificationAction` ドキュメント内の有効なアクションと制限を読んで下さい。
  * `closeButtonText` String (任意) _macOS_ - 通知を閉じるボタンのカスタムタイトル。 空の文字列の場合は、既定のローカライズされたテキストが使用されます。

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

このイベントは、通知が閉じられたすべての状況で発行されることは保証されていません。

#### イベント: 'reply' _macOS_

戻り値:

* `event` Event
* `reply` String - ユーザが埋め込み返信フィールドに入力した文字列.

`hasReply: true` の通知上で、ユーザが "返信" ボタンをクリックしたときに発行されます。

#### イベント: 'action' _macOS_

戻り値:

* `event` Event
* `index` Number - アクティベートされたアクションのインデックス.

### インスタンスメソッド

`new Notification` で作成されたオブジェクトは、次のインスタンスメソッドを持っています。

#### `notification.show()`

HTML5 Notification の実装とは異なり、`new Notification` でインスタンス化するだけでは、すぐにユーザに表示されないことに注意してください。OS が表示するためにこのメソッドを呼び出す必要があります。

以前にその通知が表示されている場合、このメソッドはその通知を閉じ、同じプロパティを持つ新しい通知を作成します。

#### `notification.close()`

通知を閉じます。

### インスタンスプロパティ

#### `notification.title`

通知のタイトルを表す `String` プロパティ。

#### `notification.subtitle`

通知のサブタイトルを表す `String` プロパティ。

#### `notification.body`

通知の本文を表す `String` プロパティ。

#### `notification.replyPlaceholder`

通知の応答プレースホルダーを表す `String` プロパティ。

#### `notification.sound`

通知音を表す `String` プロパティ。

#### `notification.closeButtonText`

通知の閉じるボタンのテキストを表す `String` プロパティ。

#### `notification.silent`

通知が無音かどうかを表す `Boolean` プロパティ。

#### `notification.hasReply`

通知に応答アクションがあるかどうかを表す `Boolean` プロパティ。

#### `notification.urgency` _Linux_

通知の緊急度を表す `String` プロパティ。 'normal'、'critical'、'low' のいずれかにできます。

省略値は 'low' - この詳細は [NotifyUrgency](https://developer.gnome.org/notification-spec/#urgency-levels) を参照してください。

#### `notification.timeoutType` _Linux_ _Windows_

通知がタイムアウトする種別を表す `String` プロパティ。 'default' か 'never' にできます。

`timeoutType` が 'never' に設定されている場合、通知は自動的に閉じられません。 呼び出し元の API かユーザによって閉じられるまで開いたままになります。

#### `notification.actions`

通知のアクションを表す [`NotificationAction[]`](structures/notification-action.md) プロパティ。

### サウンドの再生

macOS では、通知が表示されたときに再生したいサウンドの名前を指定することができます。 カスタムサウンドファイルに加えて、(システム環境設定 > サウンド にある) デフォルトサウンドのいずれかを使用することができます。 サウンドファイルがアプリバンドル (`YourApp.app/Contents/Resources` など) または以下のいずれかの場所にコピーされることに留意してください。

* `~/ライブラリ/Sounds`
* `/ライブラリ/Sounds`
* `/ネットワーク/ライブラリ/Sounds`
* `/システム/ライブラリ/Sounds`

より詳しくは、[`NSSound`](https://developer.apple.com/documentation/appkit/nssound) ドキュメントを参照して下さい。

[event-emitter]: https://nodejs.org/api/events.html#events_class_eventemitter
