# inAppPurchase

> Mac App Store의 인앱 결제입니다.

프로세스:[Main](../glossary.md#main-process)

## 이벤트

`inAppPurchase` 모듈은 다음 이벤트를 발생시킵니다:

### Event: 'transactions-updated'

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

반드시 `purchaseProduct`를 수행하기 전에 최대한 빨리 `transactions-updated` 이벤트를 등록해야 합니다.

### `inAppPurchase.getProducts(productIDs, callback)`

* `productIDs` String[] - 받을 제품의 식별자.
* `callback` Function - 제품과 함께 호출된 콜백, 혹은 존재하지 않을 땐 빈 Array. 
    * `products` Product[] - [`Product`](structures/product.md) 객체의 Array.

제품 정보를 받아옵니다.

### `inAppPurchase.canMakePayments()`

사용자가 결제를 할 수 있는지에 대한 `Boolean`을 반환합니다.

### `inAppPurchase.getReceiptURL()`

영수증의 주소인 ` String`을 반환합니다.

### `inAppPurchase.finishAllTransactions()`

모든 보류중인 트랜잭션을 완료합니다.

### `inAppPurchase.finishTransactionByDate(date)`

* `date` String - ISO 포맷의 트랜잭션을 끝낼 날짜.

날짜에 맞는 보류중인 트랜잭션을 완료합니다.