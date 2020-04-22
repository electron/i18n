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

以下は、Electron でアプリ内課金を使用する方法を示した例です。 製品 ID を iTunes Connect で作成された製品の識別子で置き換える必要があります (`com.example.app.product1` の識別子は `product1` です)。 アプリ内で `transactions-updated` イベントをできる限り早くリッスンする必要があることに注意してください。

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// できる限り早くトランザクションをリッスンします。
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // それぞれのトランザクションを確認します。
  transactions.forEach(function (transaction) {
    var payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break
      case 'purchased':

        console.log(`${payment.productIdentifier} purchased.`)

        // 領収書の URL を取得します。
        let receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // 領収書ファイルをサーバーに送信して、それが有効かどうかを確認します。
        // こちらを参照 https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // 領収書が有効であれば、プロダクトは購入されます
        // ...

        // トランザクションを終了します。
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // トランザクションを終了します。
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

// ユーザに App 内課金が許可されているかどうか確認します。
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// 製品の説明を取得して表示します。
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // 引数を確認します。
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // 各プロダクトの名前と価格を表示します。
  products.forEach(product => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // どの製品を購入したいかをユーザーに尋ねます。
  let selectedProduct = products[0]
  let selectedQuantity = 1

  // 選択されたプロダクトを購入します。
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
