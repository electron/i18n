# Mga bagay ng MemoryInfo

* `pid` integer - Ang process id ng proseso.
* `workingSetSize` Integer - Ang halaga ng memorya na kasalukuyang nakakabit sa aktuwal na pisikal na RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM. On macOS its value will always be 0.
* `privateBytes` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Note that all statistics are reported in Kilobytes.