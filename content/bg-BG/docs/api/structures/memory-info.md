# Обект MemoryInfo

* `pid` Integer - Уникален идентификатор на съответния процес.
* `workingSetSize` Integer - Размерът на използваната RAM памет, точно в този момент.
* `peakWorkingSetSize` Integer - Максималният размер на RAM памет, която някога е била заета. На macOS стойността винаги ще бъде 0.
* `privateBytes` Integer - Размерът на паметта, която никога няма да бъде споделена от други процеси, като например JS купчина/heap или HTML съдържание.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Note that all statistics are reported in Kilobytes.