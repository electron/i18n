# ProcessMemoryInfo Object

* `residentSet` Integer *Linux* 및 *Windows* - 킬로바이트로 나타낸 실제 물리적 메모리에서 사용 중인 메모리의 양.
* `private` Integer - 킬로바이트로 나타낸 JS힙 또는 HTML컨텐츠와 같은 다른 프로세스에서 공유되지 않는 메모리 양.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.