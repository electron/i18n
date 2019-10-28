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

### `inAppPurchase.purchaseProduct(productID[, quantity])`

* `productID` String - Pengenal produk yang akan dibeli. (Pengenal dari `com.example.app.product1` is `product1`).
* `quantity` Integer (optional) - Jumlah item yang akan dibeli pengguna.

Returns `Promise<Boolean>` - Returns `true` if the product is valid and added to the payment queue.

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

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