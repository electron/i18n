# Compra no app (macOS)

## Preparando

### Contrato de aplicativos pagos
Se você ainda não o fez, precisará assinar o Contrato de aplicativos pagos e configurar suas informações bancárias e fiscais no iTunes Connect.

[Ajuda do desenvolvedor do iTunes Connect: Visão geral de contratos, impostos e serviços bancários](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Crie suas compras no aplicativo
Então, você precisará configurar suas compras no app no iTunes Connect, e incluir detalhes como nome, preços e descrição que destaca os recursos e funcionalidade de sua compra no aplicativo.

[Ajuda para Desenvolvedores do iTunes: Crie uma compra dentro do aplicativo](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Alterar o CFBundleIdentifier

Para testar a Compra In-App em desenvolvimento com o Electron você terá que alterar o `CFBundleIdentifier` em `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Você precisa substituir `com.github.electron` pelo identificador de pacote do aplicativo que você criou através do iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Exemplo de código

Aqui está um exemplo que mostra como usar Compras In-App no Electron. Você terá que substituir os IDs do produto pelos identificadores dos produtos criados pelo iTunes Connect (o identificador de `com. xample.app.product1` é `product1`). Note que você precisa ouvir o evento `de atualização de transações` o mais rápido possível em seu aplicativo.

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// Ouça as transações assim que possível.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transações)) {
    return
  }

  // Verifique cada transação.
  transações.forEach(função (transação) {
    const payment = transação. switch ayment

    (transação). ransactionState) {
      caso 'comprando':
        console. og(`Comprando ${payment.productIdentifier}... )
        quebre

      caso 'purchased': {
        console. og(`${payment.productIdentifier} comprado.`)

        // Obtenha a url de recibo.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Recipt URL: ${receiptURL}`)

        // Envie o arquivo de recibo para o servidor e verifique se ele é válido.
        // @veja https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Se o recibo for válido, o produto é comprado
        // ...

        // Termine a transação.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        quebre
      }

      caso 'failed':

        console.log(`Falha ao comprar ${payment.productIdentifier}.`)

        // Finaliza a transação.
        inAppPurchase.finishTransactionByDate(transação. ransactionDate)

        quebra o
      caso 'restored':

        console. og(`A compra de ${payment.productIdentifier} foi restaurada. )

        quebre
      caso 'deferred':

        console. og(`A compra de ${payment.productIdentifier} foi adiada. )

        quebrou
      padrão:
        quebra
    }
  })
})

// Verifique se o usuário tem permissão para fazer a compra no aplicativo.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Verifique os parâmetros.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`O preço de ${product.localizedTitle} é ${product.formattedPrice}.`)
  })

  // Pergunte ao usuário qual produto ele/ela quer comprar.
  const selectedProduct = products[0]
  const selectedQuantity = 1

  // Compre o produto selecionado.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  }) 
})
```
