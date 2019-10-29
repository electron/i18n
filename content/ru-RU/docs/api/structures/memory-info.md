# Объект MemoryInfo

* `workingSetSize` Integer - объем памяти, привязанный в текущий момент к физической RAM.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Обратите внимание, что вся статистика предоставляется ​​в Килобайтах.
