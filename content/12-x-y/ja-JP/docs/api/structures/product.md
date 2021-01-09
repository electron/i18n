# Product オブジェクト

* `productIdentifier` String - Apple App Store において製品を識別する文字列。
* `localizedDescription` String - 製品の説明。
* `localizedTitle` String - 製品名。
* `contentVersion` String - コンテンツのバージョンを識別する文字列。
* `contentLengths` Number[] - コンテンツのバイト単位の総ファイルサイズ。
* `price` Number - 現地通貨における製品の価格。
* `formattedPrice` String - 製品の価格形式のロケール。
* `currencyCode` String - ISO 4217規格に基づく製品の通貨単位を示す3文字コード。
* `isDownloadable` Boolean - この製品が App Store でダウンロード可能かどうかを表す Boolean の値。 少なくとも 1 つのファイルが製品に関連付けられている場合は `true` です。
