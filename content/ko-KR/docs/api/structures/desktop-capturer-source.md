# 데스크톱 캡쳐 소스 개체

* `아이디` String - `navigator. web kit Get User Media`를 호출 할 때 `chrome Media Source Id` 제약 조건으로 사용 할 수 있는 윈도우 또는 스크린 식별자입니다. 식별자의 형식은 `윈도우: XX` `스크린:XX`, `XX`는 랜덤 숫자로 생성됩니다.
* `이름` String - 윈도우 소스의 이름이 윈도우 제목과 일치하면, 화면 소스는 `Entire Screen` 또는 `Screen<index>` 으로 명명될 것 입니다.
* `썸네일` [Native Image](../native-image.md) - 썸네일 이미지 **참고:** `desktopCapturer.getSources` 에 넘겨진 `options`에 명시된 `thumbnailSize` 와 섬네일의 크기가 같음을 보장하지 않습니다. 실제 크기는 화면이나 윈도우의 규모에 의해 결정됩니다.