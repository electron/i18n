# MemoryInfo 对象

* `pid` Integer - 进程ID
* `workingSetSize` Integer - The amount of memory currently pinned to actual physical RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM. On macOS its value will always be 0.
* `privateBytes` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Note that all statistics are reported in Kilobytes.