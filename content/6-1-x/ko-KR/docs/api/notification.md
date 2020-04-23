# 알림

> 운영체제의 알림을 생성합니다.

프로세스: [Main](../glossary.md#main-process)

## 렌더러 프로세스에서 사용하기

만약 렌더러 프로세스에서 알림을 보여주고 싶다면 [HTML5 알림 API](../tutorial/notifications.md)를 사용해야 합니다.

## Class: Notification

> 운영체제의 알림을 생성합니다.

프로세스: [Main](../glossary.md#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

It creates a new `Notification` with native properties as set by the `options`.

### 정적 메서드

`Notification` 클래스는 다음의 스태틱 매서드를 가집니다.

#### `Notification.isSupported()`

`Boolean` 값을 반환합니다 - 현재 시스템에서 알림을 지원하는지 여부를 반환합니다.

### `new Notification([options])` _실험적_

* `options` Object
  * `title` String - 알림 윈도우가 표시될 때 상단에 나타나는, 알림의 타이틀입니다.
  * `subtitle` String (옵션) _macOS_ - 알림의 부제목으로써, 타이틀의 아래에 표시됩니다.
  * `body` String - 알림의 body에 표시되는 문자열로서, title 혹은 subtitle의 아래에 표시됩니다.
  * `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
  * `icon` (String | [NativeImage](native-image.md)) (옵션) - 알림에 사용할 아이콘.
  * `hasReply` Boolean (optional) _macOS_ - Whether or not to add an inline reply option to the notification.
  * `replyPlaceholder` String (optional) _macOS_ - The placeholder to write in the inline reply input field.
  * `sound` String (optional) _macOS_ - 알림이 표시될 때 재생될 음악파일의 이름.
  * `actions` [NotificationAction[]](structures/notification-action.md) (optional) _macOS_ - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
  * `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### 인스턴스 이벤트

Objects created with `new Notification` emit the following events:

**참고:** 몇몇 이벤트는 표기된 특정 운영체제에서만 사용할 수 있습니다.

#### Event: 'show'

Returns:

* `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### Event: 'click'

Returns:

* `event` Event

Emitted when the notification is clicked by the user.

#### 이벤트: 'close'

Returns:

* `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### Event: 'reply' _macOS_

Returns:

* `event` Event
* `reply` String - The string the user entered into the inline reply field.

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### Event: 'action' _macOS_

Returns:

* `event` Event
* `index` Number - The index of the action that was activated.

### 인스턴스 메서드

Objects created with `new Notification` have the following instance methods:

#### `notification.show()`

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### `notification.close()`

알림창을 닫습니다.

### 사운드 재생

macOS에서는, 알림이 표시될 때 재생하고싶은 특정한 알림음을 지정할 수 있습니다. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. 사운드 파일이 app 경로 아래(예: `YourApp.app/Contents/Resources`), 혹은 다음 경로들 중 하나에 복사되어있는지 확인하세요:

* `~/Library/Sounds`
* `/Library/Sounds`
* `/Network/Library/Sounds`
* `/System/Library/Sounds`

[`NSSound`](https://developer.apple.com/documentation/appkit/nssound) 문서에서 더 자세한 정보를 확인할 수 있습니다.
