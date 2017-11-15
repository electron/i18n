# NotificationAction Object

* `type` String - 동작 유형, `button` 입니다.
* `text` String - (optional) 지정된 액션의 라벨입니다.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text` | Default `text` | Limitations                                                                                           |
| ----------- | ---------------- | --------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | 버튼의 라벨로 사용됨     | "Show"         | 여러개의 버튼이 제공된 경우, 마지막으로 사용 한 것이 최대중 하나의 버튼입니다. 이 액션 또한 `hasReply`와 상반되고,`hasReply` 가 `true`일 때 무시 됩니다. |

### Button support on macOS

macOS에서 추가 알림 버튼을 사용하려면 앱에서 다음과 같은 기준을 충족해야 합니다.

* 앱이 서명되었습니다.
* 앱은 `info.plist`안에서 `NSUserNotificationAlertStyle` 이 `alert`으로 설정되어 있습니다.

이러한 요구 사항 중 하나라도 충족되지 않으면 버튼이 나타나지 않습니다.