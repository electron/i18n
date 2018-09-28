# Transaction オブジェクト

* `transactionIdentifier` String - 支払取引の成功を識別する一意な文字列。
* `transactionDate` String - App Store の支払いキューに取引情報が追加された日付。
* `originalTransactionIdentifier` String - App Store によって引き戻された支払いの識別子。
* `transactionState` String - 支払いの状態。`purchasing`, `purchased`, `failed`, `restored`, `deferred` にできます。
* `errorCode` Integer - 支払いの処理中にエラーが発生したときのエラーコード。
* `errorMessage` String - 支払いの処理中にエラーが発生したときのエラーメッセージ。
* `payment` Object 
  * `productIdentifier` String - 購入した製品の識別子。
  * `quantity` Integer - 購入した数。