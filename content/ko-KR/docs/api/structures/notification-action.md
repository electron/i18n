# NotificationAction Object

* `type` String - 동작 유형, `button` 입니다.
* `text` String - (optional) 지정된 액션의 라벨입니다.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text` | Default `text` | Limitations                                                                                                                                                          |
| ----------- | ---------------- | --------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | 버튼의 라벨로 사용됨     | "Show"         | Maximum of one button, if multiple are provided only the last is used. This action is also incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### Button support on macOS

macOS에서 추가 알림 버튼을 사용하려면 앱에서 다음과 같은 기준을 충족해야 합니다.

* 앱이 서명되었습니다.
* 앱은 `info.plist`안에서 `NSUserNotificationAlertStyle` 이 `alert`으로 설정되어 있습니다.

이러한 요구 사항 중 하나라도 충족되지 않으면 버튼이 나타나지 않습니다.