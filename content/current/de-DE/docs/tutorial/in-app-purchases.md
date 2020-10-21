# In-App-Kauf (macOS)

## Vorbereitung

### Bezahlte Nutzungsbedingungen
Wenn Sie es noch nicht getan haben, müssen Sie den kostenpflichtigen Applikationsvertrag unterzeichnen und Ihre Bank- und Steuerinformationen in iTunes Connect einrichten.

[iTunes Connect Entwickler Hilfe: Vereinbarungen, Steuern und Bankübersicht](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Erstellen Sie Ihre In-App-Käufe
Dann müssen Sie Ihre In-App-Käufe in iTunes Connect konfigurieren und Details wie Name, hinzufügen Preisgestaltung und Beschreibung, die die Funktionen und Funktionen Ihres In-App-Kauf hervorhebt.

[iTunes Connect Developer Hilfe: Erstellen Sie einen In-App-Kauf](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### CFBundleIdentifier ändern

Um In-App-Käufe in der Entwicklung mit Electron zu testen, müssen Sie den `CFBundleIdentifier` in `node_modules/electron/dist/Electron.app/Contents/Info.plist` ändern. Sie müssen `com.github.electron` durch den Bundle-Identifikator der von Ihnen mit iTunes Connect erstellten Anwendung ersetzen.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Code-Beispiel

Hier ist ein Beispiel, das zeigt, wie In-App-Käufe in Electron verwendet werden. Sie müssen die Produkt-ID durch die Identifikatoren der mit iTunes Connect erstellten Produkte ersetzen (die Kennung von `com. xample.app.product1` ist `product1`). Beachten Sie, dass Sie das `-Transaktions-aktualisierte` Ereignis so bald wie möglich in Ihrer App hören müssen.

```javascript
// Hauptprozess
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// Transaktionen so schnell wie möglich anhören.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Jede Transaktion überprüfen.
  transactions.forEach(function (transaction) {
    const payment = transaction. ayment

    wechseln (Transaktion. ransactionState) {
      case 'purchasing':
        console. og(`Kaufe ${payment.productIdentifier}... )
        break

      case 'purchased': {
        console. og(`${payment.productIdentifier} gekauft.`)

        // Erhalte die Quittungs-URL.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Die Quittungsdatei an den Server senden und überprüfen, ob sie gültig ist.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Wenn die Quittung gültig ist, ist das Produkt gekauft
        // ...

        // Transaktion abschließen.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

      case 'failed':

        console.log(`Fehler beim Kauf von ${payment.productIdentifier}.`)

        // Transaktion abschließen.
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
  console.log('Der Benutzer darf keine In-App-Käufe tätigen.')
}



 // Produktbeschreibungen abrufen und anzeigen.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Prüfen Sie die Parameter.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Konnte die Produktinformationen nicht abrufen. )
    return
  }

  // Name und Preis jedes Artikels anzeigen.
  products.forEach(product => {
    console.log(`Der Preis von ${product.localizedTitle} ist ${product.formattedPrice}.`)
  })

  // Fragen Sie den Benutzer, welches Produkt er kaufen möchte.
  const selectedProduct = Produkte[0]
  const selectedQuantity = 1

  // Das ausgewählte Produkt kaufen.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console. og('Das Produkt ist nicht gültig.')
      return
    }

    Konsole. og('Die Zahlung wurde zur Warteschlange hinzugefügt.')
  })
})
```
