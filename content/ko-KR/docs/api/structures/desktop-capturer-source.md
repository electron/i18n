# 데스크톱 캡쳐 소스 개체

* `아이디` String - `navigator. web kit Get User Media`를 호출 할 때 `chrome Media Source Id` 제약 조건으로 사용 할 수 있는 윈도우 또는 스크린 식별자입니다. The format of the identifier will be `window:XX` or `screen:XX`, where `XX` is a random generated number.
* `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.