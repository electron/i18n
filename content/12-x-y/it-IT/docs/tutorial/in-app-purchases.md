# Acquisti In-App (macOS)

## Preparazione

### Accordo Pagato Per Le Domande

Se non l'hai già fatto, dovrai firmare il Contratto di Applicazioni a Pagamento e impostare le informazioni bancarie e fiscali in iTunes Connect.

[iTunes Connect Developer Help: Accordi, tasse e panoramica bancaria](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Crea I Tuoi Acquisti In-App

Poi, avrai bisogno di configurare i tuoi acquisti in-app in iTunes Connect, e includere dettagli come il nome, prezzi e descrizione che mette in evidenza le caratteristiche e le funzionalità del tuo acquisto in-app.

[iTunes Connect Developer Help: Crea un acquisto in-app](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Cambia il CFBundleIdentifier

Per testare l'Acquisto In-App in sviluppo con Electron dovrai cambiare l' `CFBundleIdentifier` in `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Devi sostituire `com.github.electron` con l'identificatore bundle dell'applicazione creata con iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Codice di esempio

Di seguito c'è un esempio che mostra come utilizzare gli acquisti In-App in Electron. Dovrai sostituire gli id del prodotto con gli identificatori dei prodotti creati con iTunes Connect (l'identificatore di `com. xample.app.product1` is `product1`). Nota che devi ascoltare l'evento `transazioni-aggiornato` il prima possibile nella tua app.

```javascript
// Processo principale
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// Ascolta per le transazioni il prima possibile.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Controlla ogni transazione.
  transactions.forEach(function (transaction) {
    const payment = transation. ayment

    switch (transazione. ransactionState) {
      case 'purchasing':
        console. og(`Acquistando ${payment.productIdentifier}... )
        break

      case 'purchased': {
        console. og(`${payment.productIdentifier} acquistato.`)

        // Ottieni l'url di ricevuta.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Invia il file di ricezione al server e controlla se è valido.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Se la ricevuta è valida, il prodotto viene acquistato
        // ...

        // Termina la transazione.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // Termina la transazione.
        inAppPurchase.finishTransactionByDate(transation. ransactionDate)

        break
      case 'restored':

        console. og(`L'acquisto di ${payment.productIdentifier} è stato ripristinato. )

        break
      case 'deferred':

        console. og(`L'acquisto di ${payment.productIdentifier} è stato differito. )

        pausa
      default:
        pausa
    }
  })
})

// Controlla se l'utente è autorizzato a effettuare l'acquisto in-app.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Controllare i parametri.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // Chiedi all'utente quale prodotto vuole acquistare.
  const selectedProduct = products[0]
  const selectedQuantità = 1

  // Acquista il prodotto selezionato.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
