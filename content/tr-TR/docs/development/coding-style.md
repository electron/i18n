# Kodlama Stili

Electron için kodlama stili rehberleri.

`cpplint` ve `eslint` tarafından tespit edilen durumları görmek için `npm run lint` çalıştırabilirsiniz.

## Genel Kod

* Yeni satır ile biter.
* Place requires in the following order: 
  * Built in Node Modules (such as `path`)
  * Built in Electron Modules (such as `ipc`, `app`)
  * Local Modules (using relative paths)
* Place class properties in the following order: 
  * Class methods and properties (methods starting with a `@`)
  * Instance methods and properties
* Avoid platform-dependent code: 
  * Dosya isimlerini birleştirmek için `path.join()` kullanın.
  * Geçiçi dizine gönderme yapmaya ihtiyaç duyduğunuzda `/tmp` yerine `os.tmpdir()` kullanın.
* Using a plain `return` when returning explicitly at the end of a function. 
  * Not `return null`, `return undefined`, `null` or `undefined`

## C++ and Python

C++ ve Python için Chromium'un [Kodlama stili](https://www.chromium.org/developers/coding-style)'ni takip ediyoruz. C+++ kodlarını otomatik olarak formatlamak için clang-format</0 kullanabilirsiniz. Aynı zamanda `script/cpplint.py` betiği de tüm dosyalar buna uyuyuyor mu kontrol eder.</p> 

Şu an kullandığımız Python versiyonu 2.7.

C++ kodu Chromium'un soyutlamalarını ve tiplerini bolca kullanır. Bunlara hakim olmanız tavsiye edilir. Başlangıç için [Önemli soyutlamalar ve Veri Yapıları](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) dökumanına bakabilirsiniz. Bu belge bazı özel tipleri, scope'lanmış tipleri (scope dışına çıkınca otomatik olarak salınırlar.), kayıt etme mekanizmalarını anlatır.

## Dokümantasyon

* Write [remark](https://github.com/remarkjs/remark) markdown style

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

## JavaScript

* [Standart](https://npm.im/standard) JavaScript stilinde yazın.
* Dosya isimleri `_` ile değil `-` ile birleştirilmeli, örneğin: `dosya_adi.js` yerine `dosya-adi.js`. Bunun sebebi [github/atom](https://github.com/github/atom) modül isimlerinin genelde `module-name` formunda olmasıdır. Bu kural sadece `.js` dosyalarında uygulanır.
* Uygun olan yerlerde ES6/ES2015 sözdizimini kullanın 
  * require komutları ve sabitler için [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
  * değişkenleri tanımlamak için [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
  * `function () { }` yerine [Ok Fonksiyonları](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  * string birleştirme için + kullanmak yerine template literalleri `+`

## İsimlendirmeler

Electron API'leri Node.js ile aynı büyük/küçük harf düzenini kullanır:

* When the module itself is a class like `BrowserWindow`, use `PascalCase`.
* When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
* API bir objenin bir mülkü ise, ve ayrı bir bölüme sahip olacak kadar karmaşık ise, `win.webContents` gibi, `mixedCase` kullanın.
* Modül olmayan API'lar için, `<webview> Tag` veya `Process Object` gibi doğal başlıklar kullanın.

Yeni bir API oluştururken, jQuery'nin tek-fonksiyon stili yerine getter ve setter kullanarak erişim yapmak tercih edilir. Örneğin, `.getText()` and `.setText(text)`, `.text([text])` yerine tercih edilir. Bununla ilgili bir [tartışma](https://github.com/electron/electron/issues/46) mevcut.