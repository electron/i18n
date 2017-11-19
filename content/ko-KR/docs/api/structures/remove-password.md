# RemovePassword Object

* `type` String - `password`.
* `origin` String (optional) - 제공된 인증 정보와 관련하여 원본과 관련된 인증 정보만 제거되면 전체 캐시가 지워집니다.
* `scheme` String (optional) - 인증 Scheme `basic`, `digest`, `ntlm`, `negotiate`해야 합니다. `origin`에서 제거할 경우 제공되어야 합니다.
* `realm` String (optional) - 인증 영역입니다. `origin`에서 제거될 경우 제공되어야 합니다.
* `username` String (optional) - 인증 정보입니다. `origin`에서 제거될 경우 제공되어야 합니다.
* `password` String (optional) - 인증 정보입니다. `origin`에서 제거될 경우 제공되어야 합니다.