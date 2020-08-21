# Display Object

* `id` Number - 디스플레이와 관련된 고유 식별자.
* `rotation` Number - 0, 90, 180, 270, 시계 방향의 화면 회전을 표시.
* `scaleFactor` Number - 출력 장치의 화소 배율.
* `touchSupport` String -  `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - 디스플레이가 monochrome 디스플레이 인지 아닌지.
* `accelerometerSupport` String - `available`, `unavailable`, `unknown` 중 하나가 될 수 있습니다.
* `colorSpace` String - 색상 변환을 위해 색상 공간(모든 실현 가능한 색상 조합을 포함하는 3차원 객체) 을 나타냅니다.
* `colorDepth` Number - 픽셀당 비트 개수.
* `depthPerComponent` Number - 색상 컴포넌트당 비트 개수.
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true`는 내장 디스플레이, `false`로 외장 디스플레이를 사용합니다.

`Display` 객체는 시스템에 연결된 물리 디스플레이입니다. 헤드리스 시스템(디스플레이 장치가 없는 시스템) 에서는 가짜 `Display` 가 존재할 수 있습니다. 또는 `Display` 는 원격 가상 디스플레이일 수 있습니다.
