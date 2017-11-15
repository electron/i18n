# ThumbarButton Object

* `icon` [NativeImage](../native-image.md) - 썸네일 도구 모음에 표시되는 아이콘입니다.
* `click` Function
* `tooltip` String (optional) - 버튼의 툴팁 텍스트
* `flags` String[] (optional) - 버튼의 특정 상태 및 동작을 제어합니다. 디폴트면, `['enabled']`입니다.

`flags`는 다음 `String`을 포함할 수 있는 array입니다.

* `enabled` - 버튼이 활성화되어 있으며 사용자가 사용할 수 있습니다.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
* `nobackground` - Do not draw a button border, use only the image.
* `hidden` - The button is not shown to the user.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.