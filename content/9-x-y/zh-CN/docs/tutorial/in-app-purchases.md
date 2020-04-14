# 应用内购买 (macOS)

## 准备工作

### 付费应用协议
如果你还没有，你需要在 iTunes Connect 签署付费应用协议, 并设置您的银行和税务信息。

[iTunes Connect 开发人员帮助: 协议、税务和银行概述](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### 创建您的应用内购买
然后，您需要在iTunes Connect中配置您的应用内购买，并包含名称，定价和说明等详细信息，以突出显示您的应用内购买的功能。

[iTunes Connect开发人员帮助：创建应用程序内购买](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### 变更 CFBundleIdentifier

若要在Electron开发阶段对应用内购买功能进行测试，您必须在`node_modules/electron/dist/Electron.app/Contents/Info.plist`路径下修改`CFBundleIdentifier`。 您必须使用通过ITunes Connect创建的应用的bundle indentifier来替换掉`com.github.electron`。

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## 代码示例

通过下面的例子来了解如何在Electron中使用应用内购买功能。 您必须使用通过ITunes Connect创建的产品的唯一标识 （ID）来替换掉下面示例中的PRODUCT_IDS。( `com.example.app.product1` 的ID是 `product1`)。 请注意，您必须尽可能早的在你的应用中监听`transactions-updated`事件。

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// 尽早监听transactions事件.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // 检查每一笔交易.
  transactions.forEach(function (transaction) {
    let payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break
      case 'purchased':

        console.log(`${payment.productIdentifier} purchased.`)

        // Get the receipt url.
        let receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // 将收据提交到服务器并校验收据是否有效.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // 如果收据通过校验，说明产品已经被购买了
        // ...

        // 交易完成.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // 交易完成.
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

// 检查用户是否允许当前app启用应用内购买功能.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// 检索并显示产品描述.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // 检查参数.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // 显示每个产品的名称和价格.
  products.forEach(product => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // 询问用户需要购买哪个产品.
  let selectedProduct = products[0]
  let selectedQuantity = 1

  // 购买选中的产品.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
