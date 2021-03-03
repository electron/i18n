# Объект Product

* `productIdentifier` String - идентификатор продукта для Apple App Store.
* `localizedDescription` String - описание продукта.
* `localizedTitle` String - название продукта.
* `contentVersion` String - строка, определяющая версию продукта.
* `contentLengths` Number[] - полный размер всего продукта в байтах.
* `price` Number - стоимость продукта в местной валюте.
* `formattedPrice` String - форматированная местная цена продукта.
* `currencyCode` String - код из 3 символов, обозначающий валюту товара по стандарту ICO 4217.
* `isDownloadable` Boolean - Булево значение, которое указывает, имеет ли App Store загружаемый контент для этого продукта. `true` если хотя бы один файл был связан с продуктом.
