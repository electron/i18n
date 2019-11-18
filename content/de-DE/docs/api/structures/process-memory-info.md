# ProcessMemoryInfo Objekt

* `residentSet` Integer *Linux* *Windows* - Die Menge and aktuelle reserviertem Speicher im physischen RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.