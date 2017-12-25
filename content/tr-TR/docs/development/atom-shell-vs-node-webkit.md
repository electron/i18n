# Electron.js ve NW.js arasındaki teknik farklılıklar (eskiden node-webkit)

**Not: Electron önceden Atom Shell olarak adlandırılmıştı.**

NW.js gibi Electron, JavaScript ve HTML ile masaüstü uygulamaları yazmak için bir platform sağlar ve web sayfalarından düşük düzeyde sisteme erişim vermek Node entegrasyon vardır.

Ancak Electron'u NW.js'den tamamen ayrı bir ürün haline getiren iki proje arasında da temel farklılıklar bulunmaktadır:

**1. Uygulama Girişi**

NW.js'de bir uygulamanın ana giriş noktası bir web sayfası veya bir JS komut dosyasıdır. `package.json`'da bir html veya js dosyası belirlersiniz, uygulamanın ana penceresi (bir html giriş noktası olması durumunda) olarak bir tarayıcı penceresinde açılır veya komut dosyası yürütülür.

Electron'da giriş noktası bir JavaScript komut dizisi dosyasıdır. Doğrudan bir URL sağlıyorsanız, manuel olarak bir tarayıcı penceresi oluşturun ve API'yi kullanan bir HTML dosyası yükleyin. Uygulamadan ne zaman çıkılacağına karar vermek için aynı zamanda pencereyi dinlemeniz gerekiyor.

Electron daha çok Node.js çalışma zamanı gibi çalışır. Electron API'leri daha düşük seviyededir, böylece tarayıcı testi için [PhantomJS](http://phantomjs.org/) yerine kullanabilirsiniz.

**2. Sistem Oluşturun**

Tüm Chromium'u oluşturma karmaşıklığından kaçınmak için, Electron [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) kullanır Chromium'un İçerik API'sı. `libchromiumcontent` Chromium içerik modülünü ve tüm bağımlılıklarını içeren tek olarak paylaşılmış kütüphanedir. Kullanıcıların Electron oluşturmak için güçlü bir makineye ihtiyacı yoktur.

**3. Ağ Entegrasyonu**

NW.js'de web sayfalarında ki ağ entegrasyonu, çalışmak için Chromium'u yamalamayı gerektirir, bizim seçtiğimiz Electron'da ise libuv döngüsüne ekleyerek Chromium'un hacklenmesini önleriz. [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) kodunun nasıl yapılacağına bakın.

**4. Çoklu bağlam**

Deneyimli bir NW.js kullanıcıysanız, ağ bağlamı ve web bağlamı kavramlarına tanıdık olamalısınız. Bu kavramlar NW.js'in nasıl uygulandığından dolayı icat edildi.

Ağın [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) özelliğini kullanarak, Electron web sayfalarında yeni bir JavaScript içeriği sunmaz.

Not: NW.js isteğe bağlı olarak 0.13'ten beri çoklu bağlamı desteklenmiştir.