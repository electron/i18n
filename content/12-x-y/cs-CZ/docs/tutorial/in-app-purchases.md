# Nákup v aplikaci (macOS)

## Příprava

### Dohoda o platbách

Pokud již nemáte, budete muset podepsat dohodu o platbách a vytvořit Vaše bankovní a daňové informace v iTunes Connect.

[Nápověda vývojáře iTunes Connect: dohody, daně a bankovní přehled](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Vytvořte si své nákupy v aplikaci

Poté budete muset nakonfigurovat vaše nákupy v aplikaci iTunes Connect, včetně podrobností, jako je jméno, ceny a popis, který upozorňuje na funkce a funkčnost vašeho nákupu v aplikaci.

[Nápověda pro vývojáře iTunes: Vytvořit nákup v aplikaci](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Změnit CFBundleIdentifier

Pro testování vývoje pomocí Electronu budete muset změnit `CFBundleIdentifier` v `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Musíte nahradit `com.github.electron` identifikátorem balíčku aplikace, kterou jste vytvořili pomocí iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Příklad kódu

Zde je příklad, který ukazuje, jak používat In-App nákupy v Electronu. Budete muset nahradit ID produktu identifikátory produktů vytvořených pomocí iTunes Connect (identifikátor `com. xample.app.product1` je `produkt1`). Všimněte si, že musíte co nejdříve naslouchat události `transakcí-aktualizované` ve vaší aplikaci.

```javascript
// Hlavní proces
const { inAppPurchase } = require('electron')
const PRODUCT_IDS = ['id1', 'id2']

// poslouchat transakce co nejdříve.
inAppPurchase.on('transactions-updated', (událost, transakce) => {
  if (!Array.isArray(transakce)) {
    return
  }

  // Kontrola každé transakce.
  transactions.forEach(funkce (transakce) {
    const payment = transakce. Přepínač platby

    (transakce. ransactionState) {
      case 'purchasing':
        console. og(`Nákup ${payment.productIdentifier}... )
        break

      case 'purchased': {
        konzola. og(`${payment.productIdentifier} zakoupil.`)

        // Získejte adresu účtenky.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Odeslat soubor s účtenkou na server a zkontrolovat, zda je platný.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/chaps/ValidateRemotely.html
        // ...
        // Pokud je přijetí platné, produkt je zakoupený
        // ...

        // Dokončit transakci.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

      případ 'selhalo':

        console.log(`Nepodařilo se zakoupit ${payment.productIdentifier}.`)

        // Dokončit transakci.
        inAppPurchase.finishTransactionByDate(transakce. ransactionDate)

        přerušit
      případ 'restored':

        konzola. og(`Nákup ${payment.productIdentifier} byl obnoven. )

        přestávka
      případ 'odloženo':

        konzola. og(`Nákup ${payment.productIdentifier} byl odložen. )

        přestávka
      výchozí:
        přestávka
    }
  })
})

// Zkontrolujte, zda je uživatel oprávněn nakupovat v aplikaci.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Zkontrolujte parametry.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`Cena ${product.localizedTitle} je ${product.formattedPrice}.`)
  })

  // Zeptejte se uživatele, který produkt si chce koupit.
  const selectedProduct = produkty[0]
  const selectedQuantity = 1

  // Koupit vybraný produkt.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
