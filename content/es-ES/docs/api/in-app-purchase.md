# Compras integradas

> Compras In-app en Mac App Store.

Process: [Main](../glossary.md#main-process)

## Eventos

El módulo `inAppPurchase` emite los siguientes eventos:

### Event: 'transactions-updated'

Emitido cuando una o más transacciones han sido actualizadas.

Devuelve:

* `event`
* `transactions` ([Transaction[]](structures/transaction.md) - Array de transacciones.)

## Métodos

El módulo `inAppPurchase` tiene los siguientes métodos:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - El id del producto a comprar. (el id de `com.example.app.product1` es `product1`).
* `quantity` Integer (opcional) - El número de objetos que el usuario quiere comprar.
* `callback` Función (opcional) - El callback llama cuando el pago se añade a la cola de pagos (PaymentQueue). (Debes añadir una escucha com `inAppPurchase.addTransactionsListener` para obtener el estatuto de la transacción). 
  * `isProductValid` Boleano - Determina si el producto es válido e se añade a la cola de pagos.

### `inAppPurchase.canMakePayments()`

Devuelve un `Boolean`, dependiendo si el usuario puede hacer un pago.

### `inAppPurchase.getReceiptURL()`

Devuelve un `String`, que la ruta/dirección del recibo.