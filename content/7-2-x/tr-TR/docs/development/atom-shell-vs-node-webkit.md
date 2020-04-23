# Electron.js ve NW.js arasındaki teknik farklılıklar (eskiden node-webkit)

__Not: Electron önceden Atom Shell olarak adlandırılmıştı.__

NW.js gibi Electron, JavaScript ve HTML ile masaüstü uygulamaları yazmak için bir platform sağlar ve web sayfalarından düşük düzeyde sisteme erişim vermek Node entegrasyon vardır.

Ancak Electron'u NW.js'den tamamen ayrı bir ürün haline getiren iki proje arasında da temel farklılıklar bulunmaktadır:

__1. Uygulama Girişi__

NW.js'de bir uygulamanın ana giriş noktası bir web sayfası veya bir JS komut dosyasıdır. `package.json`'da bir html veya js dosyası belirlersiniz, uygulamanın ana penceresi (bir html giriş noktası olması durumunda) olarak bir tarayıcı penceresinde açılır veya komut dosyası yürütülür.

Electron'da giriş noktası bir JavaScript komut dizisi dosyasıdır. Doğrudan bir URL sağlıyorsanız, manuel olarak bir tarayıcı penceresi oluşturun ve API'yi kullanan bir HTML dosyası yükleyin. Uygulamadan ne zaman çıkılacağına karar vermek için aynı zamanda pencereyi dinlemeniz gerekiyor.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

__2. Sistem Oluşturun__

Tüm Chromium'u oluşturma karmaşıklığından kaçınmak için, Electron [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) kullanır Chromium'un İçerik API'sı. `libchromiumcontent` Chromium içerik modülünü ve tüm bağımlılıklarını içeren tek olarak paylaşılmış kütüphanedir. Kullanıcıların Electron oluşturmak için güçlü bir makineye ihtiyacı yoktur.

__3. Ağ Entegrasyonu__

NW.js'de web sayfalarında ki ağ entegrasyonu, çalışmak için Chromium'u yamalamayı gerektirir, bizim seçtiğimiz Electron'da ise libuv döngüsüne ekleyerek Chromium'un hacklenmesini önleriz. [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) kodunun nasıl yapılacağına bakın.

__4. Çoklu bağlam__

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

Ağın [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) özelliğini kullanarak, Electron web sayfalarında yeni bir JavaScript içeriği sunmaz.

Not: NW.js isteğe bağlı olarak 0.13'ten beri çoklu bağlamı desteklenmiştir.
