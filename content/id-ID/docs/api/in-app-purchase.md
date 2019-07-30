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
* `callback` Function (optional) - Callback yang dipanggil ketika pembayaran ditambahkan ke PaymentQueue. 
  * `isProductValid` Boolean - Menunjukan apabila produk tersedia dan telah ditambahkan ke antrian pembayaran.

Anda harus menunggu even `transactions-updated` sesegera mungkin dan tentu saja sebelum memanggil `purchaseProduct`.

**[Deprecated Soon](modernization/promisification.md)**

### `inAppPurchase.purchaseProduct(productID, quantity)`

* `productID` String - Pengenal produk yang akan dibeli. (Pengenal dari `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - Jumlah item yang akan dibeli pengguna.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

Anda harus menunggu even `transactions-updated` sesegera mungkin dan tentu saja sebelum memanggil `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - The identifiers of the products to get.
* `callback` Function - The callback called with the products or an empty array if the products don't exist. 
  * `products` Product[] - Array of [`Product`](structures/product.md) objects

Retrieves the product descriptions.

**[Deprecated Soon](modernization/promisification.md)**

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - The identifiers of the products to get.

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

Retrieves the product descriptions.

### `inAppPurchase.canMakePayments()`

Returns `Boolean`, whether a user can make a payment.

### `inAppPurchase.getReceiptURL()`

Returns `String`, the path to the receipt.

### `inAppPurchase.finishAllTransactions()`

Completes all pending transactions.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.