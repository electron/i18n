# inAppPurchase

> Mac App Store의 인앱 결제입니다.

프로세스:[Main](../glossary.md#main-process)

## 이벤트

`inAppPurchase` 모듈은 다음 이벤트를 발생시킵니다:

### 이벤트: 'transactions-updated'

하나 이상의 트랜잭션이 업데이트됐을 때 발생합니다.

반환:

* `event` Event
* `transactions` Transaction[] - [`Transaction`](structures/transaction.md) 객체의 Array.

## 메소드

`inAppPurchase` 모듈은 다음 메서드를 가지고 있습니다:

### `inAppPurchase.purchaseProduct(productID, quantity, callback)`

* `productID` String - 결제할 제품의 식별자. (`com.example.app.product1` 의 식별자는 `product1` 임).
* `quantity` Integer (선택적) - 사용자가 결제하기 원하는 항목의 수량.
* `callback` Function (선택적) - PaymentQueue에 결제가 추가되었을 때 수행할 콜백. 
    * `isProductValid` Boolean - 제품이 올바른지와 결제 큐에 추가되었는지에 대한 Boolean.

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - The identifiers of the products to get.
* `callback` Function - The callback called with the products or an empty array if the products don't exist. 
    * `products` Product[] - Array of [`Product`](structures/product.md) objects

제품 정보를 받아옵니다.

### `inAppPurchase.canMakePayments()`

사용자가 결제를 할 수 있는지에 대한 `Boolean`을 반환합니다.

### `inAppPurchase.getReceiptURL()`

영수증의 주소인 ` String`을 반환합니다.

### `inAppPurchase.finishAllTransactions()`

모든 대기중인 트랜잭션을 완료합니다.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.