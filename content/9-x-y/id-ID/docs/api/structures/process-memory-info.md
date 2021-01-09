# ProcessMemoryInfo Objek

* `residentSet` Integer _Linux_ _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Bilangan Bulat - Jumlah memori yang dibagi di antara beberapa proses, biasanya memori yang dikonsumsi oleh kode Electron itu sendiri dalam Kilobyte.
