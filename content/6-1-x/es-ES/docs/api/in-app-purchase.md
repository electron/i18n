# Compras integradas

> Compras In-app en Mac App Store.

Proceso: [principal](../glossary.md#main-process)</0>

## Eventos

El módulo `inAppPurchase` emite los siguientes eventos:

### Evento: 'transactions-updated'

Emitido cuando una o más transacciones han sido actualizadas.

Devuelve:

* `event`
* `transactions` Transaction[] - Un array de objetos [`Transaction`](structures/transaction.md).

## Métodos

El módulo `inAppPurchase` tiene los siguientes métodos:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - El identificador del producto a comprar. (El identificador de `com.example.app.product1` es `product1`).
* `quantity` Integer (opcional) - El número de ítems que el usuario quiere comprar.
* `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue.
  * `isProductValid` Boleano - Determina si el producto es válido e se añade a la cola de pagos.

Usted debería escuchar por el evento `transactions-updated` tan pronto como sea posible y sin dudas antes de llamar a `purchaseProduct`.

**[Próximamente desaprobado](modernization/promisification.md)**

### `inAppPurchase.purchaseProduct(productID, quantity)`

* `productID` String - Los identificadores del producto a comprar. (El identificador de `com.example.app.product1` es `product1`).
* `quantity` Integer (opcional) - El número de ítems que el usuario quiere comprar.

Devuelve `Promise<Boolean>` - Devuelve `true` si el producto es valido y añadido a la cola de pago.

Deberías escuchar por el evento `transactions-updated` tan pronto como sea posible y sin dudas antes de llamar a `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - Los identificadores de los productos a obtener.
* `callback` Function - The callback called with the products or an empty array if the products don't exist.
  * `products` Product[] - Array de objetos [`Product`](structures/product.md)

Recupera las descripciones del producto.

**[Próximamente desaprobado](modernization/promisification.md)**

### `inAppPurchase.getProducts(productIDs)`

* `productIDs` String[] - Los identificadores de los productos a obtener.

Devuelve `Promise<Product[]>` - Resuelve con un array de objetos [`Product`](structures/product.md).

Recupera las descripciones del producto.

### `inAppPurchase.canMakePayments()`

Devuelve un `Boolean`, dependiendo si el usuario puede hacer un pago.

### `inAppPurchase.getReceiptURL()`

Devuelve un `String`, que la ruta/dirección del recibo.

### `inAppPurchase.finishAllTransactions()`

Completa todas las transacciones pendientes.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - La fecha en formato ISO de la transacción para terminar.

Completa las pendientes transacciones correspondiendo al día.
