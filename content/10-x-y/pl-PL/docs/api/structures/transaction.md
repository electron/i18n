# Transaction Object

* `transactionIdentifier` String - string który unikalnie identyfikuje poprawnie wykonaną transakcję płatniczą.
* `transactionDate` String - Data, kiedy transakcja została dodana do kolejki płatności App Store.
* `originalTransactionIdentifier` String - Identyfikator odzyskanej transakcji przez App Store.
* `transactionState` String - Stan transakcji, może być równy `purchasing`, `purchased`, `failed`, `restored` lub `deferred`.
* `errorCode` Integer - Kod błędu, jeżeli takowy wystąpił podczas przetwarzania transakcji.
* `errorMessage` String - Komunikat błędu, jeżeli takowy wystąpił podczas transakcji.
* `payment` Object
  * `productIdentifier` String - Identyfikator zakupionego produktu.
  * `quantity` Integer  - Ilość zakupionego produktu.
