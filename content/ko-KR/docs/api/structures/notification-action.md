# NotificationAction 객체

* `type` String - 동작 유형, `button` 입니다.
* `text` String (optional) - The label for the given action.

## 플랫폼 / 동작 지원

| 동작 종류    | 플랫폼 지원 | `text` 사용법  | 기본 `text`                                                                                   | 제한 사항                                                                                                                                                                                                                                                                     |
| -------- | ------ | ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `button` | macOS  | 버튼의 라벨로 사용됨 | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true`. |

### macOS에서의 버튼 지원

macOS에서 추가 알림 버튼을 사용하려면 앱에서 다음과 같은 기준을 충족해야 합니다.

* 앱이 서명됨
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

이러한 요구 사항 중 하나라도 충족되지 않으면 버튼이 나타나지 않습니다.