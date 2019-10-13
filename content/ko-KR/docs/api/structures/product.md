# Product Object

* `productIdentifier` String - Apple App Store에서 제품을 식별하는 문자열입니다.
* `localizedDescription` String - 제품의 설명입니다.
* `localizedTitle` String - 제품의 이름입니다.
* `contentVersion` String - 내용의 버전을 식별하는 문자열입니다.
* `contentLengths` Number[] - 바이트로 된 내용물의 크기입니다.
* `price` Number - 제품의 현지 통화 가격입니다.
* `formattedPrice` String - 제품의 형식화된 가격의 로켈입니다.
* `isDownloadable` Boolean - 앱스토어에 이 프로덕트에 대해 다운로드 가능한 컨텐츠가 있는지에 대한 부울 값입니다. `true` if at least one file has been associated with the product.