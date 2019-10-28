# 알림

> 운영체제의 알림을 생성합니다.

프로세스:[Main](../glossary.md#main-process)

## 렌더러 프로세스에서 사용하기

만약 렌더러 프로세스에서 알림을 보여주고 싶다면 [HTML5 알림 API](../tutorial/notifications.md)를 사용해야 합니다.

## Class: Notification

> 운영체제의 알림을 생성합니다.

프로세스:[Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

It creates a new `Notification` with native properties as set by the `options`.

### 정적 메서드

`Notification` 클래스는 다음의 스태틱 매서드를 가집니다.

#### `Notification.isSupported()`

`Boolean` 값을 반환합니다 - 현재 시스템에서 알림을 지원하는지 여부를 반환합니다.

### `new Notification([options])` *실험적*

* `options` 객체 (선택) 
  * `title` String - 알림 윈도우가 표시될 때 상단에 나타나는, 알림의 타이틀입니다.
  * `subtitle` String (옵션) *macOS* - 알림의 부제목으로써, 타이틀의 아래에 표시됩니다.
  * `body` String - 알림의 body에 표시되는 문자열로서, title 혹은 subtitle의 아래에 표시됩니다.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (옵션) - 알림에 사용할 아이콘.
  * `hasReply` Boolean (optional) *macOS* - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) *macOS* - The placeholder to write in the inline reply input field.
  * `sound` String (optional) *macOS* - 알림이 표시될 때 재생될 음악파일의 이름.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) *macOS* - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) *macOS* - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### 인스턴스 이벤트

Objects created with `new Notification` emit the following events:

**참고:** 몇몇 이벤트는 표기된 특정 운영체제에서만 사용할 수 있습니다.

#### Event: 'show'

반환:

* `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### Event: 'click'

반환:

* `event` Event

Emitted when the notification is clicked by the user.

#### 이벤트: 'close'

반환:

* `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### Event: 'reply' *macOS*

반환:

* `event` Event
* `reply` String - The string the user entered into the inline reply field.

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' *macOS*

반환:

* `event` Event
* `index` Number - The index of the action that was activated.

### 인스턴스 메서드

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

알림창을 닫습니다.

### Instance Properties

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

#### `notification.actions`

A [`NotificationAction[]`](structures/notification-action.md) property representing the actions of the notification.

### Playing Sounds

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.