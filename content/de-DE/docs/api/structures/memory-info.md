# MemoryInfo Object

* `workingSetSize` Integer - Die Speichergrösse, die gerade dem physischen RAM zugewiesen ist.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Beachten Sie, dass alle Statistiken in Kilobyte angegeben werden.
