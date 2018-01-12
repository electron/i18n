# Güvenlik, Yerli Yetenekler ve Sorumluluklarınız

Web geliştiricileri olarak, genellikle tarayıcının güçlü güvenlik ağının tadını çıkarırız - Yazdığımız kodla ilişkili riskler nispeten azdır. Web sitelerimize sanal bir alanda sınırlı yetkiler verilir, ve kullanıcılarımızın yeni keşfedilen güvenlik tehditlerine karşı çabuk şekilde cevap verebilecek büyük bir mühendis takımı tarafından oluşturulmuş bir tarayıcıdan hoşlandıklarını düşünüyoruz.

Elektron ile çalışırken, Elektronun bir web tarayıcısı olmadığını bilmeniz önemlidir. Tanıdık web teknolojileri ile zengin özelliklere sahip masaüstü uygulamaları oluşturmanıza izin verir, ancak kodunuz daha fazla güç sağlar. JavaScript; dosya sistemine, kullanıcı kabuğuna ve daha fazlasına erişebilir. Bu, yüksek kaliteli yerli uygulamalar oluşturmanızı sağlar, ancak doğal güvenlik riskleri kodunuza verilen ek güçlerle ölçeklenir.

Bunu göz önünde bulundurarak, güvenilmeyen kaynaklardan keyfi içeriğin görüntülenmesinin, Electron'un ele alması tasarlanmamış ciddi bir güvenlik riski taşıdığına dikkat edin. Aslında, en popüler Elektron uygulamaları (Atom, Slack, Visual Studio Code vb.) öncelikle yerel içeriği görüntüler (veya güvenilir, düğüm entegrasyonu olmadan uzaktan içeriği güvenli hale getirir) - uygulamanız kodu çevrimiçi bir kaynaktan yürütürse kodun kötü niyetli olmadığından emin olmak sizin sorumluluğunuzdur.

## Güvenlik sorunlarını raporlama

Bir Electron'un güvenlik açığını düzgün bir şekilde açıklamayla ilgili bilgi için, bkz. [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Güvenlik Sorunları ve Yükseltmeleri

Electron, Chromium'un yeni sürümünü mümkün olan en kısa sürede desteklemeye çalışsa da geliştiriciler, düzinelerce veya hatta yüzlerce dosyanın manuel olarak düzenlenmesini içeren ciddi bir girişim olduğunu farkında olmalıdır. Bugün mevcut kaynaklar ve katkılar göz önüne alındığında, Electron genellikle günler veya haftalarca geride kalan Chromium'un en son sürümünde olmayacak.

Mevcut Chromium bileşenlerini güncellediğimiz sistemin bize sağladığı kaynaklarla çerçeve üzerine inşa edilen çoğu uygulamanın ihtiyaçları arasında doğru dengede olduğuna inanıyoruz. Elektronların üstünde veri üreten insanlardan gelen özel kullanım davaları hakkında daha fazla bilgi almak istiyoruz. Bu çabaları destekleyen çekme talepleri ve katkılar her zaman açığız.

## Yukarıdaki önerileri dikkate alma

Uzak bir hedeften kod alıp yerel olarak çalıştırdığınızda bir güvenlik sorunu var demektir. Örnek olarak, bir tarayıcı penceresinin içinde görüntülenen uzak bir web sitesini düşünün. Eğer bir saldırgan, söz konusu olan içeriği bir şekilde değiştirirse (doğrudan kaynağa saldırarak yada uygulamanız ile gerçek hedef arasında bulunarak), kullanıcı makinesinde bulunan yerel kodu çalıştırabilir.

> :warning: Hiç bir şart altında Node entegrasyonu aktif uzaktan çalışan kodları yüklemeyiniz! Bunun yerine, düğüm kodu çalıştırmak için sadece yerel dosyaları (uygulamanızla birlikte paketlenmiş) kullanın. Uzak içeriği görüntülemek için `webview` etiketini kullanın ve `nodeIntegration` devre dışı bıraktığınızdan emin olun.

#### Kontrol Listesi

Bu kusursuz değildir, ancak en azından aşağıdakileri denemelisiniz:

* Sadece güvenli (https) içeriğini görüntüle
* Uzak içeriği görüntüleyen tüm oluşturuculardaki Node entegrasyonunu devre dışı bırakın (`webPreferences`'de `nodeIntegration` ayarını `false` olarak ayarlayın)
* Uzaktan kontrol içeriğini goruntuleyen tum işlemlerde ortamı izole etmeyi etkınlestırın
* Uzak içeriği yükleyen tüm oturumlarda `ses.setPermissionRequestHandler()` kullanın
* `webSecurity`'i devre dışı bırakmayın. Devre dışı bırakılması same-origin politikasını devre dışı bırakır.
* [`İçerik Güvenliği Politikası'nı`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) tanımlayın ve kısıtlayıcı kurallar kullanın (örneğin `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8), bu dizelerin kod olarak yürütülmesine izin verir.
* `allowRunningInsecureContent`'i doğru olarak ayarlamayın.
* Ne yaptığınızın farkında olana kadar `experimentalFeatures` veya `experimentalCanvasFeatures`'i etkinleştirmeyin.
* Ne yaptığınızın farkında olana kadar `blinkFeatures`'ı kullanmayın.
* WebViews:`nodeintegration` özniteliğini eklemeyin.
* WebViews:`disablewebsecurity` kullanmayın
* WebViews:`allowpopups` kullanmayın
* WebViews: Uzaktan CSS/JS kullanım ile `insertCSS` veya `executeJavaScript` kullanmayın.
* `<webview>` etiketlerini, `will-attach-webview` event: bağlanmadan önce seçenekleri ve paramları doğrulayın:

```js
app.on('web-contents-created', (event, contents) => {
contents.on('will-attach-webview', (event, webPreferences, params) => {
// Kullanılmayan yazılımları eğer kullanılmamışşa veya konum doğrulaması yapılmışşa kaldır
webPreferences.preload sil
webPreferences.preloadURL sil

// Düğüm entegrasyonunu iptal et
webPreferences.nodeIntegration = yalnış
// URL Yüklenme durumunu sorgula
if (!params.src.startsWith('https://yourapp.com/')) {
event.preventDefault()
     }
   })
 })
```

Yine, bu liste yalnızca riski en aza indirir, kaldırmaz. Amacınız bir web sitesini görüntülemek ise, tarayıcı daha güvenli bir seçenek olacaktır .