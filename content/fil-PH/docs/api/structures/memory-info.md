# Mga bagay ng MemoryInfo

* `pid` integer - Ang process id ng proseso.
* `workingSetSize` Integer - Ang halaga ng memorya na kasalukuyang nakakabit sa aktuwal na pisikal na RAM.
* `peakWorkingSetSize` Integer - Ang pinakamataas na halaga ng memorya na dati ng ikinabit sa aktuwal na pisikal na RAM. Sa macOS ang halaga nito ay laging 0.
* `privateBytes` Integer - Ang halaga ng memorya na hindi isinama ng iba pang mga proseso, tulad ng tambakan ng JS o mga nilalaman ng HTML.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Note that all statistics are reported in Kilobytes.