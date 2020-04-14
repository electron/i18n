# ProcessMemoryInfo Object

* `residentSet` Integer *Linux* *Windows* - 현재 실제 물리 RAM에 고정된 메모리(Kilobytes).
* `private` Integer - JS힙 또는 HTML 컨텐츠와 같은 다른 프로세스와 공유하지 않는 메모리(Kilobytes).
* `shared` Integer - 킬로바이트로 나타낸 프로세스 간에 공유되는 메모리의 양, 일반적으로 Electron 코드 자체에 의해 소비되는 메모리.