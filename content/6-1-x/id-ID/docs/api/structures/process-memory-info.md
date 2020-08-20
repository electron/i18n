# ProcessMemoryInfo Objek

* `residentSet` Bilangan Bulat_Linux_ dan _Windows_ - Jumlah memori yang saat ini disematkan ke RAM fisiksecara akktual dalam Kilobyte.
* `private` Bilangan Bulat - Jumlah memori yang tidak digunakan oleh proses lain, seperti JS heap atau konten HTML dalam Kilobyte.
* `shared` Bilangan Bulat - Jumlah memori yang dibagi di antara beberapa proses, biasanya memori yang dikonsumsi oleh kode Electron itu sendiri dalam Kilobyte.
