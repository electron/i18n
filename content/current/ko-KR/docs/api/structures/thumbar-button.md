# ThumbarButton Object

* `icon` [NativeImage](../native-image.md) - 썸네일 도구 모음에 표시되는 아이콘입니다.
* `click` Function
* `tooltip` String (optional) - 버튼의 툴팁 텍스트
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags`는 다음 `String`을 포함할 수 있는  array입니다.

* `enabled` - 버튼이 활성화되어 있으며 사용자가 사용할  수 있습니다.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - 버튼을 클릭하면 바로 축소판 창이 닫힙니다.
* `nobackground` - 버튼 테두리를 그리지 말고 이미지만 사용하세요.
* `hidden` - 버튼이 사용자에게 보이지 않습니다.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
