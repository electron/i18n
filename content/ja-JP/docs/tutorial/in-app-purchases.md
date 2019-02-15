# App内課金 (macOS)

## 下準備

### 有料アプリケーション契約

まだしていないのであれば、iTunes Connect 内で有料アプリケーション契約に署名し、銀行口座情報と納税フォームをセットアップする必要があります。

[iTunes Connect デベロッパーヘルプ: 契約／税金／口座情報の概要](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### App 内課金の作成

次に、iTunes Connect でアプリ内購入を設定し、名前、価格、説明、アプリ内購入の特徴と機能の説明などの詳細を含める必要があります。

[iTunes Connect デベロッパーヘルプ: App 内課金の作成](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### CFBundleIdentifier を変更

Electron での開発で App 内課金をテストするには、`node_modules/electron/dist/Electron.app/Contents/Info.plist` 内の `CFBundleIdentifier` を変更する必要があります。 iTunes Connect で作成したアプリケーションのバンドル ID で、`com.github.electron` を置き換える必要があります。

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## コード例

以下は、Electron でアプリ内課金を使用する方法を示した例です。 製品 ID を iTunes Connect で作成された製品の識別子で置き換える必要があります (`com.example.app.product1` の識別子は `product1` です)。 Note that you have to listen to the `transactions-updated` event as soon as possible in your app.

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