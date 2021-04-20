# Compra dentro de la App (macOS)

## Preparando

### Acuerdo de Aplicaciones de Pago

Si no lo has hecho todavia, tienes que firmar el Acuerdo de Aplicaciones de Pago y configurar tus dados bancarios y fiscales en iTunes Connect.

[Ayuda al desarrollador de iTunes Connect: Resumen de acuerdos, impuestos y bancos](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Crea tus compras dentro de la App

Después, debes configurar tus compras dentro de la App en iTunes Connect, e incluir detalles como nombre, precio, y un descriptivo que destaque las características y funcionalidades de tu compra dentro de la aplicación.

[Ayuda al desarrollador de iTunes Connect: Crear una compra dentro de la App](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Cambia el CFBundleIdentifier

Para testar las compras dentro de la App, tienes que cambiar el `CFBundleIdentifier` en `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Tienes que reemplazar `com.github.electron` por el identificador del paquete de la aplicación que creaste en iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Ejemplo de código

Aquí hay un ejemplo de como usar las compras dentro de la App en Electron. Tienes que reemplazar las IDs de los productos por los identificadores de los productos creados con iTunes Connect (el identificador de `com.example.app.product1` es `product1`). Nota que tienes que escuchar al evento `transactions-updated` tan pronto como sea posible en tu App.

```javascript
// Main process
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// Listen for transactions as soon as possible.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Check each transaction.
  transactions.forEach(function (transaction) {
    const payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break

      case 'purchased': {
        console.log(`${payment.productIdentifier} purchased.`)

        // Get the receipt url.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Submit the receipt file to the server and check if it is valid.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // If the receipt is valid, the product is purchased
        // ...

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

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
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Check the parameters.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // Ask the user which product he/she wants to purchase.
  const selectedProduct = products[0]
  const selectedQuantity = 1

  // Purchase the selected product.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
