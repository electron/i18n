# DesktopCapturerSource Object

* `id` String - [`navigator.webkitGetUserMedia`]를 호출할 때 `chromeMediaSourceId` 제약 조건으로 사용될 수 있는 창 또는 화면의 식별자. 식별자의 형식은 `window: XX` 또는 `screen:XX`이며, `XX`는 난수.
* `name` String - 윈도우 소스의 이름이 윈도우 제목과 일치하면, 화면 소스는 `Entire Screen` 또는 `Screen<index>` 으로 명명될 것 입니다.
* `thumbnail` [Native Image](../native-image.md) - 썸네일 이미지 **참고:** `desktopCapturer.getSources` 에 넘겨진 `options`에 명시된 `thumbnailSize` 와 섬네일의 크기가 같음을 보장하지 않습니다. 실제 크기는 화면이나 윈도우의 규모에 의해 결정됩니다.
* `display_id` String - [Screen API](../screen.md)에서 반환되는 [Display](display.md)에 매칭되는 `id`에 해당하는 유일한 식별자입니다. 일부 플랫폼에서는, 이 값이 위의 `id` 필드의 `XX` 부분과 같을 수 있고 다른 값은 다를 것입니다. 사용 불가능할 시에는 빈 문자열이 됩니다.