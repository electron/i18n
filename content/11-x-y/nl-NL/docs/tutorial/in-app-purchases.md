# In-App aankoop (macOS)

## Voorbereiden

### Betaalde aanvragen overeenkomst
Als u dat nog niet gedaan hebt, moet u de Paid Applications Agreement ondertekenen en uw bank- en belastinginformatie instellen in iTunes Connect.

[iTunes Connect Developer Help: Overeenkomsten, belastingen, en bank-overzicht](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Maak je in-app-aankopen
Vervolgens moet u uw in-app aankopen configureren in iTunes Connect, en details zoals naam vermelden, prijzen en een beschrijving van de functies en functionaliteit van uw in-app aankoop.

[iTunes Connect ontwikkelaar Help: Maak een in-app aankoop](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Wijzig CFBundleIdentifier

Om de in-app aankoop te testen met Electron moet u de `CFBundleIdentifier` wijzigen in `node_modules/electron/dist/Electron.app/Contents/Info.plist`. U moet `com.github.electron` vervangen door de bundel-id van de applicatie die u heeft aangemaakt met iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Code voorbeeld

Hier is een voorbeeld dat laat zien hoe je In-App Aankopen in Electron moet gebruiken. U moet de product-id's vervangen door de ID's van de producten gemaakt met iTunes Connect (de id van `com). xample.app.product1` is `product1`). Houd er rekening mee dat u zo snel mogelijk naar het `transacties bijgewerkte` evenement moet luisteren in uw app.

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// Luister zo snel mogelijk voor transacties.
inAppPurchase.on('transactions-bijgewerkt', (event, transacties) => {
  if (!Array.isArray(transacties)) {
    return
  }

  // Controleer elke transactie.
  transactions.forEach(function (transactie) {
    const betaling = transactie. ayment

    wissel (transactie. ransactionState) {
      case 'aangekocht':
        console. og(`Aankoop ${payment.productIdentifier}... )
        break

      case 'aangeschaft': {
        console. og(`${payment.productIdentifier} aangeschaft.`)

        // Verkrijg de betaalbewijs url.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Ontvangst-URL: ${receiptURL}`)

        // Dien het ontvangstbewijs bestand naar de server en controleer of het geldig is.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Als het ontvangstbewijs geldig is, wordt het product gekocht
        // ...

        // Voltooi de transactie.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

      case 'failed':

        console.log(`Aankoop ${payment.productIdentifier}.`)

        // Voltooi de transactie.
        inAppPurchase.finishTransactieByDate(transactie. RsactionDate)

        break
      case 'restored':

        console. og(`De aankoop van ${payment.productIdentifier} is hersteld. )

        pauze
      case 'uitgesteld':

        console. og(`De aankoop van ${payment.productIdentifier} is uitgesteld. )

        breken
      standaard:
        break
    }
  })
})

// Controleer of de gebruiker toestemming heeft om in-app aankopen te doen.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(producten => {
  // Controleer de parameters.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`De prijs van ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // Vraag de gebruiker welk product hij/zij wil kopen.
  const selectedProduct = products[0]
  const selectedQuantity = 1

  // Koop het geselecteerde product.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
