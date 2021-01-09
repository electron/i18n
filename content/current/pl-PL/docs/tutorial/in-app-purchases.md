# Zakupy w aplikacji (macOS)

## Przygotowanie

### Umowa dotycząca płatnych aplikacji

Jeśli jeszcze tego nie zrobiłeś, musisz podpisać umowę płatnych aplikacji i skonfigurować swoje dane bankowe i podatkowe w iTunes Connect.

[Pomoc dla programistów iTunes Connect: umowy, podatki i przegląd bankowy](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Utwórz zakupy w aplikacji

Następnie musisz skonfigurować zakupy w aplikacji w iTunes Connect, a także podać szczegóły, takie jak nazwa, cennik i opis, które podkreślają funkcje i funkcjonalność zakupu w aplikacji.

[Pomoc dla programistów iTunes Connect: Utwórz zakupy w aplikacji](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Zmień identyfikator CFBundleIdentifier

Aby przetestować zakup w aplikacji przy użyciu Electrona, musisz zmienić `CFBundleIdentifier` w `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Musisz zastąpić `com.github.electron` identyfikatorem pakietu aplikacji utworzonej przez iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Przykład

Oto przykład pokazujący jak korzystać z zakupów w aplikacji w Electron. Będziesz musiał zastąpić identyfikatory produktu identyfikatorami produktów utworzonych za pomocą iTunes Connect (identyfikator `com. xample.app.product1` to `product1`). Pamiętaj, że musisz jak najszybciej wysłuchać zdarzenia `zaktualizowanego transakcjami` w swojej aplikacji.

```javascript
// Główny proces
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// Słuchaj transakcji tak szybko, jak to możliwe.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Check each transaction.
  transactions.forEach(function (transaction) {
    const payment = transaction. przełącznik

    (transakcja). ransactionState) {
      case 'purchasing':
        console. og(`Zakupy ${payment.productIdentifier}... )
        przerwa

      przypadek 'zakupiony': {
        konsola. og(`${payment.productIdentifier} kupion.`)

        // Pobierz adres e-mail.
        const partURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Prześlij plik paragonu na serwer i sprawdź, czy jest poprawny.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chaps/ValidateRemotely.html
        // ...
        // Jeśli paragon jest prawidłowy, produkt jest kupowany
        // ...

        // Zakończ transakcję.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break


      case 'failed':

        console.log(`Nie udało się kupić ${payment.productIdentifier}.`)

        // Zakończ transakcję.
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
  console.log('Użytkownik nie może dokonywać zakupów w aplikacji.')


// Pobierz i wyświetl opisy produktu.
inAppPurchase.getProducts(PRODUCT_IDS).then(produkty => {
  // Sprawdź parametry.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Nie można pobrać informacji o produkcie. )
    return
  }

  // Wyświetl nazwę i cenę każdego produktu.
  products.forEach(product => {
    console.log(`Cena ${product.localizedTitle} to ${product.formattedPrice}.`)
  })

  // Zapytaj użytkownika, który produkt chce kupić.
  const selectedProduct = products[0]
  const selectedQuantity = 1

  // Zakup wybrany produkt.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      consolle. og('Produkt nie jest prawidłowy.')
      zwraca
    } konsolę

    . og('Płatność została dodana do kolejki płatności.')
  })
})
```
