# ThumbarButton Object

* `icon` [NativeImage](../native-image.md) - 썸네일 도구 모음에 표시되는 아이콘입니다.
* `click` Function
* `tooltip` String (optional) - 버튼의 툴팁 텍스트
* `flags` String[] (optional) - 버튼의 특정 상태 및 동작을 제어. 기본값은 `['enabled']`.

`flags`는 다음 `String`을 포함할 수 있는  array입니다.

* `enabled` - 버튼이 활성화되어 있으며 사용자가 사용할  수 있습니다.
* `disabled` - 버튼을 비활성화합니다. 존재하지만 사용자의 액션에 반응하지 않는 시각적 상태를 나타냅니다.
* `dismissonclick` - 버튼을 클릭하면 바로 축소판 창이 닫힙니다.
* `nobackground` - 버튼 테두리를 그리지 말고 이미지만 사용하세요.
* `hidden` - 버튼이 사용자에게 보이지 않습니다.
* `noninteractive` - 버튼이 활성화되어있더라도 반응하지 않습니다; 눌려진 버튼 상태로 표시되지 않습니다. 이 값은 버튼이 알림에 사용되는 경우에 사용됩니다.
