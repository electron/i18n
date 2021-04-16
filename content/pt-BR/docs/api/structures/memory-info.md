# Objeto MemoryInfo

* `workingSetSize` Integer - A quantidade de memória atualmente fixado a RAM físico real.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Note-se que todas as estatísticas são relatadas em Kilobytes.
