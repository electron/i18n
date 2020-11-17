# ProcessMemoryInfo Object

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - JS힙 또는 HTML 컨텐츠와 같은 다른 프로세스와 공유하지 않는 메모리(Kilobytes).
* `shared` Integer - 킬로바이트로 나타낸 프로세스 간에 공유되는 메모리의 양, 일반적으로 Electron 코드 자체에 의해 소비되는 메모리.
