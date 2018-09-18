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
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// Escucha las transacciones tan pronto com sea posible.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Verifica cada transacción.
  transactions.forEach(function (transaction) {
    var payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break
      case 'purchased':

        console.log(`${payment.productIdentifier} purchased.`)

        // Obtén el recibo de pago.
        let receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Envía el recibo al servidor y verifica si es válido.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Si el recibo es válido, el producto es comprado
        // ...

        // Acaba la transacción.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // Acaba la transacción.
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

// Verifica si el usuario tiene permitido realizar la compra.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Recupera y muestra las descripciones de los productos.
inAppPurchase.getProducts(PRODUCT_IDS, (products) => {
  // Verifica los parámetros.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Muestra el nombre y precio de cada producto.
  products.forEach((product) => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // Pregunta as usuário que producto quiere comprar.
  // ...
  let selectedProduct = products[0]
  let selectedQuantity = 1

  // Compra el producto seleccionado.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity, (isProductValid) => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```