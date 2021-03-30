# ProcessMemoryInfo Objekt

* `residentSet` Integer _Linux_ _Windows_ - Die Menge des Speichers die derzeit an den tatsächlichen physischen RAM-Speicher angeheftet ist, in Kilobytes.
* `private` Integer - Die Menge an Speicher in Kilobytes, der **nicht** mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt wird.
* `shared` Integer - Die Menge an Speicher in Kilobytes, der mit anderen Prozessen (wie JS-Heap oder HTML-Content) geteilt wird.
