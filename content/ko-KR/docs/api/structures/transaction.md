# Transaction Object

* `transactionIdentifier` String - 성공적인 거래 지불을 고유하게 식별하는 문자열입니다.
* `transactionDate` String - App Store의 결제 큐에 추가된 거래일입니다.
* `originalTransactionIdentifier` String - App Store에 의해 복구된 거래의 식별자입니다.
* `transactionState` String - 거래 상태, `purchasing`, `purchased`, `failed`, `restored` 혹은 `deferred` 가 될 수 있습니다.
* `errorCode` Integer - 거래를 처리하는 중 오류가 발생하였다면 오류 코드를 반환합니다.
* `errorMessage` String - 거래를 처리하는 중 오류가 발생하였다면 오류 메시지를 반환합니다.
* `payment` Object 
  * `productIdentifier` String - 결제된 제품의 식별자입니다.
  * `quantity` Integer - 결제된 개수입니다.