# In-App Purchase (macOS)

## 사전준비

### 유료 애플리케이션 계약

아직 유료 애플리케이션 계약에 서명하지 않았다면, 서명이 필요합니다. 그리고 iTunes Connect에서 여러분의 은행 및 세금 정보를 설정해야합니다.

[iTunes Connect Developer Help: 계약, 세금, 그리고 은행에 대한 개요](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### In-App Purchases 생성

그런 다음, iTunes Connect에서 인앱 구매를 구성하고, 이름, 가격 및 인앱 구매의 특징 및 기능을 강조하는 설명을 포함시켜야합니다.

[iTunes Connect Developer Help: 인앱 구매 생성](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### CFBundleIdentifier 수정

electron을 사용한 개발에서 In-App Purchase를 테스트하기 위해서는 `node_modules/electron/dist/Electron.app/Contents/Info.plist`의 `CFBundleIdentifier`을 변경해야 합니다. iTunes Connect에서 생성된 애플리케이션의 bundle identifier 값으로 `com.github.electron`의 기본값을 변경해야 합니다.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## 예제 코드

이것은 Electron에서 인앱 구매를 사용하는 방법을 보여주는 예제입니다. 제품 id들을 iTunes Connect에서 생성한 제품 식별자(`com.example.app.product1``의 식별자는 <0>product1`)로 대체해야합니다. 주의할점은 여러분의 앱에서 가능한 빠르게 `transactions-updated`이벤트를 Listen하고 있어야 한다는 것 입니다.

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// Listen for transactions as soon as possible.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Check each transaction.
  transactions.forEach(function (transaction) {
    var payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break
      case 'purchased':

        console.log(`${payment.productIdentifier} purchased.`)

        // Get the receipt url.
        let receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Submit the receipt file to the server and check if it is valid.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // If the receipt is valid, the product is purchased
        // ...

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'restored':

        console.log(`The purchase of ${payment.productIdentifier} has been restored.`)

        break
      case 'deferred':

        console.log(`The purchase of ${payment.productIdentifier} has been deferred.`)

        break
      default:
        break
    }
  })
})

// Check if the user is allowed to make in-app purchase.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS, (products) => {
  // Check the parameters.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach((product) => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // Ask the user which product he/she wants to purchase.
  // ...
  let selectedProduct = products[0]
  let selectedQuantity = 1

  // Purchase the selected product.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity, (isProductValid) => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```