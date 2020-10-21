# Achat In-App (macOS)

## Préparation en cours

### Accord sur les applications payantes
Si vous ne l'avez pas déjà fait, vous devrez signer l'accord d'application payante et configurer vos informations bancaires et fiscales dans iTunes Connect.

[Aide pour le développeur iTunes Connect : Accords, taxes et aperçu bancaire](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Créez vos achats In-App
Ensuite, vous devrez configurer vos achats in-app dans iTunes Connect, et inclure des détails tels que le nom, la tarification et la description qui mettent en évidence les fonctionnalités et les fonctionnalités de votre achat in-app.

[Aide pour le développeur iTunes Connect : Créez un achat in-app](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Changer l'identifiant CFBundleIdentifier

Pour tester l'achat In-App en cours de développement avec Electron, vous devrez changer le `CFBundleIdentifier` dans `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Vous devez remplacer `com.github.electron` par l'identifiant du bundle de l'application que vous avez créée avec iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Exemple de code

Voici un exemple qui montre comment utiliser les achats In-App dans Electron. Vous devrez remplacer les identifiants des produits par les identifiants des produits créés avec iTunes Connect (l'identifiant de `com. xample.app.product1` est `product1`). Notez que vous devez écouter l'événement `transactions-updated` dès que possible dans votre application.

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// Écouter les transactions dès que possible.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Vérifiez chaque transaction.
  transactions.forEach(function (transaction) {
    var payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break
      case 'purchased':

        console.log(`${payment.productIdentifier} purchased.`)

        // Get the receipt url.
        let receiptURL = inAppPurchase.getReceiptURL()

        console.log(`URL de reçu: ${receiptURL}`)

        // Soumet le fichier de réception au serveur et vérifie s'il est valide.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Si le reçu est valide, le produit est acheté
        // ...

        // Terminer la transaction.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'failed':

        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(transaction. ransactionDate)

        break
      case 'restauré' :

        console. og(`L'achat de ${payment.productIdentifier} a été restauré. )

        break
      cas 'reporté' :

        console. og(`L'achat de ${payment.productIdentifier} a été reporté. )

        break
      par défaut :
        break
    }
  })
})

// Vérifiez si l'utilisateur est autorisé à effectuer un achat dans l'application.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Vérifier les paramètres.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`Le prix de ${product.localizedTitle} est ${product.formattedPrice}.`)
  })

  // Demandez à l'utilisateur quel produit il/elle veut acheter.
  let selectedProduct = produits[0]
  let selectedQuantity = 1

  // Acheter le produit sélectionné.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
