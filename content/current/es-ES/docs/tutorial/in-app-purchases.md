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
// Proceso principal
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// Escuche las transacciones tan pronto como sea posible.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Verifica cada transacción.
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
        // Si el recibo es válido, el producto es comprado
        // ...

        // Acaba la transacción.
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

// Verifica si el usuario tiene permitido realizar la compra.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Recupera y muestra las descripciones de los productos.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Verificar los parámetros.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Muestra el nombre y precio de cada producto.
  products.forEach(product => {
    console.log(`El precio de  ${product.localizedTitle} es ${product.formattedPrice}.`)
  })

  // Pregunta al usuario cual producto el/ella quiere comprar.
  const selectedProduct = products[0]
  const selectedQuantity = 1

  // Purchase the selected product.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('El producto no es válido.')
      return
    }

    console.log('El pago se ha añadido a la cola de pagos.')
  })
})
```
