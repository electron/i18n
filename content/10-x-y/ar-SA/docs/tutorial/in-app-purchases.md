# شراء داخل التطبيق (macOS)

## تحضير

### اتفاقية التطبيقات المدفوعة
إذا لم تكن قد فعلت ذلك بالفعل، فستحتاج إلى توقيع اتفاقية تطبيقات الدفع وإعداد المعلومات المصرفية والضريبية الخاصة بك في iTunes Connect.

[مساعدة مطور توصيل iTunes : الاتفاقات، والجباية الضريبية، والمصرفية](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### إنشاء عمليات الشراء الخاصة بك في التطبيق
بعد ذلك، ستحتاج إلى تكوين مشترياتك داخل التطبيق في iTunes Connect، وإدراج تفاصيل مثل الاسم، التسعير، والوصف الذي يسلط الضوء على ميزات ووظائف الشراء داخل التطبيق.

[مساعدة مطور توصيل iTunes : إنشاء شراء داخل التطبيق](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### تغيير الـ CFBundleIdentifier

لاختبار عملية الشراء في التطبيق في التطوير باستخدام Electron ، يجب عليك تغيير `CFBundleID` في `node_modules/electron/dist/Electron.app/Contents/Info.plist`. يجب عليك استبدال `com.github.electron` بمعرف الحزمة للتطبيق الذي أنشأته مع اتصال iTunes.

```xml
<key>CFBundleIdentifier</key>
<string>com.example.app</string>
```

## مثال الكود

هنا مثال يوضح كيفية استخدام عمليات الشراء في التطبيق في إلكترون. يجب عليك استبدال معارف المنتج بمعرفات المنتجات التي تم إنشاؤها بواسطة iTunes Connect (معرف `com. xample.app.product1` هو `منتج1`). لاحظ أنه يجب عليك الاستماع إلى حدث `المعاملات` الذي تم تحديثه في أقرب وقت ممكن في التطبيق الخاص بك.

```javascript
const { inAppPurchase } = مطلوب('electron').بعد
const PRODUCT_IDS = ['id1', 'id2']

// الاستماع للمعاملات في أقرب وقت ممكن.
inAppPurchase.on('المعاملات-updated'، (الحدث، المعاملات) => {
  إذا (!Array.isArray(المعاملات)) {
    return
  }

  // تحقق من كل معاملة.
  المعاملات.forEach(وظيفة (معاملة) {
    اسمح بالدفع = المعاملة. أيت

    تبديل (معاملة). ransactionState) {
      حالة 'الشراء':
        وحدة التحكم. og(`شراء ${payment.productIdentifier}... )
        استراحة
      حالة 'الشراء':

        وحدة بيانات. og(`${payment.productIdentifier} شراء.`)

        // احصل على رابط الإيصال.
        اسمح باستلام URL = inAppPurchase.getReceiptURL()

        console.log(`receieipt URL: ${receiptURL}`)

        / أرسل ملف الإيصال إلى الخادم و تحقق مما إذا كان صحيحا.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStorereceieipt/Chapters/ValidateRemotely.html
        // ...
        // إذا كان الإيصال صحيحاً، يتم شراء المنتج
        // ...

        // إنهاء المعاملة.
        InAppPurchase.finishTransactionByDate(المعاملة.transactionDate)

        توقف
      حالة 'فشل':

        console.log('فشل في شراء ${payment.productIdentifier}.`)

        // إنهاء المعاملة.
        معاملة inAppPurchase.finishTransactionByDate(معاملة). تاريخ الاستراحة)

        استراحة
      حالة 'استعادة':

        وحدة التحكم. og(`تم استعادة شراء ${payment.productIdentifier} ). )

        استراحة
      حالة 'تأجيل':

        وحدة بيانات. og(`تم تأجيل شراء ${payment.productIdentifier} ). )

        استراحة
      الافتراضي:
        استراحة

  })
})

// تحقق مما إذا كان للمستخدم حق الشراء داخل التطبيق.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
  // Check the parameters.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product informations.')
    return
  }

  // Display the name and price of each product.
  products.forEach(product => {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  })

  // Ask the user which product he/she wants to purchase.
  let selectedProduct = products[0]
  let selectedQuantity = 1

  // Purchase the selected product.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```
