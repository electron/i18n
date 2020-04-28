# ProcessMemoryInfo Objekt

* `residentSet` Integer _Linux_ und _Windows_ - Die Menge an aktuell reserviertem Speicher im physischen RAM in Kilobytes.
* `private` Integer - Die Menge an Speicher in Kilobytes, der **nicht** mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt wird.
* `shared` Integer - Die Menge an Speicher in Kilobytes, der mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt wird.
