# Objeto Transaction

* `transactionIdentifier` String - Un string que identifica de forma única, una transacción de pago exitosa.
* `transactionDate` String - La fecha en que la transacción fue agregada a la lista de pago de la App Store.
* `originalTransactionIdentifier` String - Identificador de la transacción que fue restaurada por la App Store.
* `transactionState` String - El estado de la transacción, puede ser: `purchasing`, `purchased`, `failed`, `restored` o `deferred`.
* `errorCode` Integer - El código de error si ha ocurrido algún error al procesar la transacción.
* `errorMessage` String - El mensaje de error si ha ocurrido algún error al procesar la transacción.
* `payment` Objeto
  * `productIdentifier` String - El identificador del producto adquirido.
  * `quantity` Integer  - La cantidad adquirida.
