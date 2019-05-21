# RemovePassword 객체

* `type` String - `password`.
* `origin` String (선택적) - 제공되는 경우 원본에 관련된 인증 정보는 제거 되지만, 그렇지 않은 경우 전체 캐시가 지워집니다.
* `scheme` String (선택적) - 인증 체계 `basic`, `digest`, `ntlm`, `negotiate`해야 합니다. `origin`에 의해 제거되는 경우 반드시 제공되어야 합니다.
* `realm` String (optional) - 인증 영역입니다. `origin`에서 제거될 경우 제공되어야 합니다.
* `username` String (optional) - 인증 정보입니다. `origin`에서 제거될 경우 제공되어야 합니다.
* `password` String (optional) - 인증 정보입니다. `origin`에서 제거될 경우 제공되어야 합니다.