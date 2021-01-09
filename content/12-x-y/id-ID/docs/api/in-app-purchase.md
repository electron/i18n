# inAppPurchase

> Pembayaran dalam aplikasi di Mac App Store.

Proses: [Main](../glossary.md#main-process)

## Events

Modul `inAppPurchase` menghasilkan even sebagai berikut:

### Even: 'transactions-updated'

Dikeluarkan saat ada transaksi yang diupdate.

Mengembalikan:

* `event` Sinyal
* `transactions` Transaction[] - Array of [`Transaction`](structures/transaction.md) objects.

## Methods

Modul `inAppPurchase` memiliki fungsi sebagai berikut:

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - Pengenal produk yang akan dibeli. (Pengenal dari `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - Jumlah item yang akan dibeli pengguna.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

Anda harus menunggu even `transactions-updated` sesegera mungkin dan tentu saja sebelum memanggil `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - Pengenal produk yang akan didapatkan.

Returns `Promise<Product[]>` - Resolves with an array of [`Product`](structures/product.md) objects.

Mendapatkan deskripsi produk.

### `inAppPurchase.canMakePayments()`

Returns `Boolean` - whether a user can make a payment.

### `inAppPurchase.restoreCompletedTransactions()`

Restores finished transactions. This method can be called either to install purchases on additional devices, or to restore purchases for an application that the user deleted and reinstalled.

[The payment queue](https://developer.apple.com/documentation/storekit/skpaymentqueue?language=objc) delivers a new transaction for each previously completed transaction that can be restored. Each transaction includes a copy of the original transaction.

### `inAppPurchase.getReceiptURL()`

Returns `String` - the path to the receipt.

### `inAppPurchase.finishAllTransactions()`

Menyelesaikan semua transaksi yang tertunda.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - Tanggal transaksi selesai dalam format ISO.

Selesaikan setiap transaksi tertunda.
