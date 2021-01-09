# Об'єкт Product

* `productIdentifier` String - Стрічка, яка ідентифікує продукт у магазині Apple App Store.
* `localizedDescription` String - Опис продукту.
* `localizedTitle` String - Назва продукту.
* `contentVersion` String - Строка, яка ідентифікує версію вмісту.
* `contentLengths` Number[] - Загальний розмір вмісту, в байтах.
* `price` Number - Вартість продукту в національній валюті.
* `formattedPrice` String - Ціна, відформатована для місцевості.
* `currencyCode` String - 3 character code presenting a product's currency based on the ISO 4217 standard.
* `isDownloadable` Boolean - Булеве значення, яке вказує на те, чи має App Store завантажений вміст для цього продукту. `true` якщо хоча б один файл був пов'язаний з продуктом.
