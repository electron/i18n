# Objeto de Transação

* `transactionIdentifier` String - Uma string que identifica exclusivamente uma transação de pagamento bem-sucedida.
* `transactionDate` String - A data em que a transação foi adicionada à fila de pagamento da App Store.
* `originalTransactionIdentifier` String - O identificador da transação restaurada pela App Store.
* `transactionState` String - o estado da transação, pode ser `purchasing`, `purchased`, `failed`, `restored` ou `deferred`.
* `errorCode` Integer - O código do erro, que ocorreu ao processar a transação.
* `errorMessage` String - A mensagem do erro, que ocorreu ao processar a transação.
* `payment` Object
  * `productIdentifier` String - O identificador do produto comprado.
  * `quantity` Integer  - A quantidade comprada.
