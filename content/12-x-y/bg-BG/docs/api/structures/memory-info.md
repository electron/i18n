# Обект MemoryInfo

* `workingSetSize` Integer - Размерът на използваната RAM памет, точно в този момент.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Обърнете внимание, че всички статистики са докладвани в килобайти (kb).
