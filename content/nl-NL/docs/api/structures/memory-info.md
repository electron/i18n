# MemoryInfo Object

* `pid` Integer - Proces-id van het proces.
* ` workingSetSize` Integer - De hoeveelheid geheugen die momenteel is vastgezet op werkelijke fysieke RAM.
* `peakWorkingSetSize` Integer - De maximale hoeveelheid geheugen die ooit is vastgezet op werkelijke fysieke RAM. Op macOS zal de waarde altijd 0 zijn.
* ` privateBytes ` Integer - De hoeveelheid geheugen die niet wordt gedeeld door andere processen, zoals JS heap of HTML-inhoud.
* `sharedBytes` Integer - De hoeveelheid geheugen gedeeld tussen processen, meestal geheugen verbruikt door de Electron-code zelf

Let op dat alle statistieken worden gerapporteerd in Kilobytes.