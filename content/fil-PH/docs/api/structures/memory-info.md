# Mga bagay ng MemoryInfo

* `pid` integer - Ang process id ng proseso.
* `workingSetSize` Integer - Ang halaga ng memorya na kasalukuyang nakakabit sa aktuwal na pisikal na RAM.
* `peakWorkingSetSize` Integer - Ang pinakamataas na halaga ng memorya na dati ng ikinabit sa aktuwal na pisikal na RAM. Sa macOS ang halaga nito ay laging 0.
* `privateBytes` Integer - Ang halaga ng memorya na hindi ibinahagi ng iba pang mga proseso, tulad ng tambakan ng JS o mga nilalaman ng HTML.
* `sharedBytes` Integer - Ang halaga ng memorya na naibahagi sa bawat mga proseso, na kadalasan ay memoryang nagagamit ng mismong code ng Electron

Tandaan na ang lahat ng mga estatistika ay iniulat sa Kilobytes.