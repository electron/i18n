# inAppPurchase

> Pembayaran dalam aplikasi di Mac App Store.

Proses: [Main](../glossary.md#main-process)

## Kejadian

Modul `inAppPurchase` menghasilkan even sebagai berikut:

### Even: 'transactions-updated'

Dikeluarkan saat ada transaksi yang diupdate.

Pengembalian:

* `event` Event
* `transactions` Transaction[] - Array of [`Transaction`](structures/transaction.md) objects.

## Metode

Modul `inAppPurchase` memiliki fungsi sebagai berikut:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - Pengenal produk yang akan dibeli. (Pengenal dari `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - Jumlah item yang akan dibeli pengguna.
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue.
  * `isProductValid` Boolean - Menunjukan apabila produk tersedia dan telah ditambahkan ke antrian pembayaran.

Anda harus menunggu even `transactions-updated` sesegera mungkin dan tentu saja sebelum memanggil `purchaseProduct`.

**[Deprecated Soon](modernization/promisification.md)**

### `inAppPurchase.purchaseProduct(productID, quantity)`

* `productID` String - Pengenal produk yang akan dibeli. (Pengenal dari `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - Jumlah item yang akan dibeli pengguna.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

Anda harus menunggu even `transactions-updated` sesegera mungkin dan tentu saja sebelum memanggil `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - Pengenal produk yang akan didapatkan.
* `callback` Function - The callback called with the products or an empty array if the products don't exist.
  * `products` Product[] - Array dari objek [`Product`](structures/product.md)

Mendapatkan deskripsi produk.

**[Deprecated Soon](modernization/promisification.md)**

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - Pengenal produk yang akan didapatkan.

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

Mendapatkan deskripsi produk.

### `inAppPurchase.canMakePayments()`

Mengembalikan `Boolean`, apakah pengguna bisa melakukan pembayaran.

### `inAppPurchase.getReceiptURL()`

Mengembalikan `String`, lokasi untuk menyimpan stuk transaksi.

### `inAppPurchase.finishAllTransactions()`

Menyelesaikan semua transaksi yang tertunda.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - Tanggal transaksi selesai dalam format ISO.

Selesaikan setiap transaksi tertunda.
