# Electron.js ve NW.js arasındaki teknik farklılıklar (eskiden node-webkit)

**Not: Electron önceden Atom Shell olarak adlandırılmıştı.**

NW.js gibi Electron, JavaScript ve HTML ile masaüstü uygulamaları yazmak için bir platform sağlar ve web sayfalarından düşük düzeyde sisteme erişim vermek Node entegrasyon vardır.

Ancak Electron'u NW.js'den tamamen ayrı bir ürün haline getiren iki proje arasında da temel farklılıklar bulunmaktadır:

**1. Uygulama Girişi**

NW.js'de bir uygulamanın ana giriş noktası bir web sayfası veya bir JS komut dosyasıdır. `package.json`'da bir html veya js dosyası belirlersiniz, uygulamanın ana penceresi (bir html giriş noktası olması durumunda) olarak bir tarayıcı penceresinde açılır veya komut dosyası yürütülür.

Electron'da giriş noktası bir JavaScript komut dizisi dosyasıdır. Doğrudan bir URL sağlıyorsanız, manuel olarak bir tarayıcı penceresi oluşturun ve API'yi kullanan bir HTML dosyası yükleyin. Uygulamadan ne zaman çıkılacağına karar vermek için aynı zamanda pencereyi dinlemeniz gerekiyor.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

**2. Sistem Oluşturun**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.