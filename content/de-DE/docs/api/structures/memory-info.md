# MemoryInfo Object

* `pid` Integer - Prozess Id des Prozesses.
* `workingSetSize` Integer - Die Speichergrösse, die gerade dem physischen RAM zugewiesen ist.
* `peakWorkingSetSize` Integer - Die maximale Speichergrösse, die dem RAM zugewiesen war.
* `privateBytes` Integer - Die Speichergrösse die nicht mit anderen Prozessen wie zB. JS heap oder HTML geteilt wird.
* `sharedBytes` Integer - Die Speichergrösse die mit anderen Prozessen geteilt wird, typischerweise Speicher, der von Electron code selber gebraucht wird

Beachten Sie, dass alle Statistiken in Kilobyte angegeben werden.