# 디스플레이 개체

* `id` Number - 디스플레이와 관련된 고유 식별자.
* `rotation` Number - 0, 90, 180, 270, 시계 방향의 화면 회전을 표시.
* `scaleFactor` Number - 출력 장치의 화소 배율.
* `touchSupport` String - `available`, `unavailable`, `unknown`. 
* `bounds` [Rectangle](rectangle.md)
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

`Display` 객체는 시스템에 연결된 물리 디스플레이입니다. 헤드리스 시스템(디스플레이 장치가 없는 시스템) 에서는 가짜 `Display` 가 존재할 수 있습니다. 또는 `Display` 는 원격 가상 디스플레이일 수 있습니다.