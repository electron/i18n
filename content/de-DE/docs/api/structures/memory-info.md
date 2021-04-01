# MemoryInfo Object

* `workingSetSize` Integer - Die Speichergrösse, die gerade dem physischen RAM zugewiesen ist.
* `peakWorkingSetSize` Integer - Das Maximum an je reserviertem Speicher auf dem physikalischen RAM.
* `privateBytes` Integer (optional) _Windows_ - Die Anzahl Bytes im Speicher die nicht mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt werden.

Beachten Sie, dass alle Statistiken in Kilobyte angegeben werden.
