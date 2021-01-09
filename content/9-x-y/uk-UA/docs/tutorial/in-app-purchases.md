# Покупка в додатку (macOS)

## Підготовка

### Платна угода про додатки
Якщо цього ще немає, вам потрібно буде підписати Платну Угоду про додатки, а також налаштувати банківську та податкову інформацію в iTunes Connect.

[iTunes Connect Developer Help: Угода, податки й банківський огляд](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### Створіть свої покупки в додатку
Потім потрібно налаштувати покупки у додатку iTunes Connect, та включити такі деталі, як ім'я, ціни, а також опис того, що виділяє функції і функціональність Вашої покупки в додатку.

[iTunes Connect Developer Help: Створити покупку в додатку](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### Зміна CFBundleIdentifier

Щоб перевірити In-App покупки в розробці з Electron вам доведеться змінити `CFBundleIdentifier` в `node_modules/electron/dist/Electron.app/Contents/Info.plist`. Вам потрібно замінити `com.github.electron` на свій спільний ідентифікатор програми, створений iTunes Connect.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## Приклад коду

Ось приклад, який показує, як використовувати покупки в програмі в Electron. Вам доведеться замінити ідентифікатори товару ідентифікаторами товарів, створених за допомогою iTunes Connect (ідентифікатор `com. xapp.app.product1` є `продуктом 1`). Зверніть увагу, що ви повинні послухати подію `під час транзакції` якомога швидше в вашому додатку.

```javascript
const { inAppPurchase } = require('electron').remote
const PRODUCT_IDS = ['id1', 'id2']

// Вислуховуйте транзакції якомога швидше.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Перевірте кожну транзакцію.
  transactions.forEach(функція (transaction) {
    let pay = транзакцію. введення

    вимикач (транзакція. ransactionState) {
      case 'purchasing':
        консоль. og(`Придбання ${payment.productIdentifier}... )
        розірвати
      випадок 'придбано':

        консоль. og(`${payment.productIdentifier} куплено.`)

        // Отримайте URL-адресу чеку.
        let receiptURL = inAppPurchase.getReceiptURL()

        console.log(`URL чека: ${receiptURL}`)

        // Надіслати файл чеків на сервер і перевірте, чи він дійсний.
        // @перегляньте
https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // Якщо чек дійсний, продукт придбаний
        // ...

        // Завершити транзакцію.
        inAppPurchase.finishTransactionByDate(transaction.Date)

        розірвати
      випадок 'не вдалося:

        console.log(`Помилка при придбанні ${payment.productIdentifier}.`)

        // Закінчить транзакцію.
        inAppPurchase.finishTransactionByDate(транзакція. ransactionDate)

        розірвати
      випадок 'restored':

        консоль. og(`Придбання ${payment.productIdentifier} відновлено. )

        розірвати
      випадок 'deferred':

        консоль. og(`Придбання ${payment.productIdentifier} було відкладено. )

        розрив
      за замовчуванням:
        перерва
    }
  })
})

// Перевірте, чи дозволено користувачу покупку в додатку.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Перевірте параметри.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`Ціна ${product.localizedTitle} це ${product.formattedPrice}.`)
  })

  // Запитайте користувача, який продукт він/вона хоче придбати.
  let selectedProduct = products[0]
  let selectedquantity = 1

  // Придбати обраний продукт.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
