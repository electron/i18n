# MemoryInfo Object

* `pid` Integer - 프로세스의 ID
* `workingSetSize` Integer - 실제 물리적 RAM에 고정된 메모리 양입니다.
* `peakWorkingSetSize` Integer - 실제 물리저 RAM에 고정된 메모리의 최대 양입니다. maxTS의 값은 항상 0입니다.
* `privateBytes` Integer - JS힙 또는 HTML컨텐츠와 같은 다른 프로세스에서 공유되지 않는 메모리 양입니다.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Note that all statistics are reported in Kilobytes.