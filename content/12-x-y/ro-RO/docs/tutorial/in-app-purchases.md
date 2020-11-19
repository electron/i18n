# Achiziție în aplicație (macOS)

## Pregătire

### Acord de cereri plătite

Dacă nu ați semnat deja, va trebui să semnați Acordul de Aplicații Plătite și să vă configurați informațiile bancare și fiscale în iTunes Connect.

[iTunes Connect Developer Help: Acorduri, impozite și servicii bancare](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Creează-ți cumpărăturile în aplicație

Apoi, va trebui să configurați achizițiile în aplicație în iTunes Connect, și să includeți detalii cum ar fi numele, stabilirea prețurilor și descrierea care evidențiază caracteristicile și funcționalitatea achiziției în aplicație.

[iTunes Connect Developer Help: Creați o achiziție în aplicație](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Schimbă CFBundleIdentifier

Pentru a testa Achiziția în aplicație cu Electron va trebui să schimbi `CFBundleIdentifier` în `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Trebuie să înlocuiți `com.github.electron` cu un identificator de pachet al aplicației create cu iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Exemplu de cod

Iată un exemplu care arată cum să folosești Achizițiile In-App în Electron. Va trebui să înlocuiești id-urile produsului cu identificatorii produselor create cu iTunes Connect (identificatorul lui `com. xample.app.product1` este `product1`). Țineți cont că trebuie să ascultați evenimentul `tranzacții actualizate` cât mai curând posibil în aplicația dvs.

```javascript
// Procesul principal
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// Ascultați tranzacțiile cât mai curând posibil.
inAppPurchase.on('transactions-updated', (event, tranzacții) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Verificați fiecare tranzacție.
  transactions.forEach(function (transaction) {
    const payment = tranzacție. Comutator

    ayment (tranzacție. ransactionState) {
      case 'purchasing':
        consolă. Câine(`Achiziționând ${payment.productIdentifier}... )
        spart

      case 'purchased': {
        consolă. og(`${payment.productIdentifier} cumpărat.`)

        // Obține url-ul de chitanță.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Trimiteți fișierul de chitanță la server și verificați dacă este valid.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Dacă chitanța este validă, produsul este cumpărat
        // ...

        // Finalizează tranzacția.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(tranzacție). ransactionDate)

        sparge
      case 'restored':

        consolă. Câine(`Achiziția ${payment.productIdentifier} a fost restabilită. )

        spargerea majusculei
      „amânată”:

        consolă. Câine(`Achiziția de ${payment.productIdentifier} a fost amânată. )

        pauză de
      implicit:
        pauză
    }
  })
})

// Verifică dacă utilizatorul are permisiunea de a efectua achiziții în aplicație.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(produse => {
  // Verificați parametrii.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`Prețul ${product.localizedTitle} este ${product.formattedPrice}.`)
  })

  // Întreabă utilizatorul ce produs dorește să cumpere.
  const produsa selectata = produsele[0]
  const selectedQuantity = 1

  // Achiziționați produsul selectat.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
