# Kodlama Stili

Electron için kodlama stili rehberleri.

`cpplint` ve `eslint` tarafından tespit edilen durumları görmek için `npm run lint` çalıştırabilirsiniz.

## C++ and Python

C++ ve Python için krom'ın [Kodlama stili](http://www.chromium.org/developers/coding-style)'ni takip ediyoruz. C+++ kodlarını otomatik olarak formatlamak için clang-format</0 kullanabilirsiniz. Aynı zamanda `script/cpplint.py` betiği de tüm dosyalar buna uyuyuyor mu kontrol eder.</p> 

Şu an kullandığımız Python versiyonu 2.7.

C+++ kodu Chromium'un soyutlamalarını ve tiplerini bolca kullanır. Bunlara hakim olmanız tavsiye edilir. Başlangıç için [Önemli soyutlamalar ve Veri Yapıları](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) dökumanına bakabilirsiniz. Bu belge bazı özel tipleri, scope'lanmış tipleri (scope dışına çıkınca otomatik olarak salınırlar.), kayıt etme mekanizmalarını anlatır.

## JavaScript

* [Standart](http://npm.im/standard) Javascript stilinde yazın.
* Dosya isimleri `_` ile değil `-` ile birleştirilmeli, örneğin: `dosya_adi.js` yerine `dosya-adi.js`. Bunun sebebi [github/atom](https://github.com/github/atom) modül isimlerinin genelde `module-name` formunda olmasıdır. Bu kural sadece `.js` dosyalarında uygulanır.
* Use newer ES6/ES2015 syntax where appropriate 
  * [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
  * [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) for defining variables
  * [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
  * [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

## İsimlendirmeler

Electron API'leri Node.js ile aynı büyük/küçük harf düzenini kullanır:

* When the module itself is a class like `BrowserWindow`, use `CamelCase`.
* When the module is a set of APIs, like `globalShortcut`, use `mixedCase`.
* When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
* For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

Yeni bir API oluştururken, jQuery'nin tek-fonksiyon stili yerine getter ve setter kullanarak erişim yapmak tercih edilir. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.