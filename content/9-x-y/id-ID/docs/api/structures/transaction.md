# Transaction Object

* `transactionIdentifier` String - Sebuah string unik yang mengindentifikasi sebuah transaksi yang sukses.
* `transactionDate` String - tanggal dimana transaksi di tambahkan ke dalam App Store's payment queue.
* `originalTransactionIdentifier` String - Pengidentifikasi transaksi yang dipulihkan oleh App Store.
* `transactionState`String - Status transaksi, bisa jadi `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
* `errorCode` Integer - Kode kesalahan jika terjadi kesalahan saat memproses transaksi.
* `errorMessage` String - Pesan kesalahan jika terjadi kesalahan saat memproses transaksi.
* `payment` Object
  * `productIdentifier` String - Pengidentifikasi produk yang dibeli.
  * `quantity` Integer  - Jumlah yang dibeli.
