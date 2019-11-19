# ProcessMemoryInfo Objekt

* `residentSet` Integer *Linux* *Windows* - Die Menge and aktuelle reserviertem Speicher im physischen RAM in Kilobytes.
* `private` Integer - Die Menge an Speicher in Kilobytes, der **nicht** mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt wird.
* `shared` Integer - Die Menge an Speicher in Kilobytes, der mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt wird.