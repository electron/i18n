# MemoryInfo Object

* `workingSetSize` Integer - 실제 물리적 RAM에 고정된 메모리 양입니다.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

모든 통계는 킬로바이트로 보고됩니다.
