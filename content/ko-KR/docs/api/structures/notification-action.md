# NotificationAction Object

* `type` String - 동작 유형, `button` 입니다.
* `text` String - (optional) 지정된 액션의 라벨입니다.

## Platform / Action Support

| Action Type | Platform Support | Usage of `text` | Default `text` | Limitations                                                                                           |
| ----------- | ---------------- | --------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| `button`    | macOS            | 버튼의 라벨로 사용됨     | "Show"         | 여러개의 버튼이 제공된 경우, 마지막으로 사용 한 것이 최대중 하나의 버튼입니다. 이 액션 또한 `hasReply`와 상반되고,`hasReply` 가 `true`일 때 무시 됩니다. |

### Button support on macOS

macOS에서 추가 알림 버튼을 사용하려면 앱에서 다음과 같은 기준을 충족해야 합니다.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `info.plist`.

If either of these requirements are not met the button simply won't appear.