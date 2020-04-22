# Tabirler

Bu sayfa Electron gelişiminde yaygın olarak kullanılan bazı terminolojileri tanımlamaktadır.

### ASAR

ASAR, Atom Shell Arşiv Formatı anlamına gelmektedir. Bir [ asar ](https://github.com/electron/asar) arşivi basittir ` tar ` benzeri bir format, dosyaları tek bir dosyaya bağlar. Electron bütün dosyayı arşivden çıkarmadan rasgele dosyaları okuyabilir.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

C Çalışma Zamanı Kitaplığı (CRT) C ++ Standart Kitaplığı'nın bir parçasıdır. ISO C99 standart kütüphanesini içerir. CRT' yi destekleyen görsel C++ kütüphaneleri yerel kod geliştimeyi sağlar,ayrıca hem düzenli hemde düzensiz yerel kodlar .NET'i geliştirmek için yönetilebilir.

### DMG

Bir Apple Disk Görüntüsü, macOS tarafından kullanılan bir paketleme biçimidir. DMG dosyaları uygulama "kurulumcularını" dağıtmak için yaygın olarak kullanılır. [electron-builder](https://github.com/electron-userland/electron-builder) bir yapı hedefi olarak `dmg` destekler.

### IME

Giriş yöntemi editörü. Kullanıcıların klavyelerinde bulunmayan karakterleri ve sembolleri girmesini olanaklı kılan bir program. Örneğin, bu, Latin klavye kullanıcılarının klavyelerini kullanarak Çince, Japonca, Korece ve Hint karakterlerini girmelerine olanak verir.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

[ Chromium İçerik modülünü](https://www.chromium.org/developers/content-module) ve tüm paylaşılan bağımlılıklarını (ör. Blink, [V8](#v8)vb.). içeren bir paylaşılan kütüphane. Ayrıca "libcc" olarak da adlandırılır.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### ana işlem

Ana işlem, yaygın olarak `main.js` adlı bir dosya, her Electron uygulamasına giriş noktasıdır. Uygulama açıkken kapansa da ömrünü kontrol eder. Ayrıca Menü, Menü Bar, Yuva, Tepsi gibi yerel ögeleri de yönetir. Ana işlem, uygulamada her yeni işleyici sürecini oluşturmaktan sorumludur. Tam Düğüm API'si yerleştirilmiştir.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

Ayrıca bkz: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

IPC, İşlem içi veya inter-process iletişim kurmak için bir sistemidir, ve bu önemlidir, çünkü Chrome, bellek baskılarına vb. bağlı olarak çalışmalarını ayrı süreçlere bölmeye isteklidir.

https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md adresine bakın

### yerel modüller

Native modülleri (ayrıca Node.js'de [eklentiler](https://nodejs.org/api/addons.html) olarak adlandırılır) require() işlevini kullanarak Node.js veya Electron'a yüklenebilen C veya C++ olarak yazılan modüllerdir ve sıradan bir Node.js modülü gibi kullanılırlar. Temel olarak Node.js'de ve C/C++ kitaplıklarında çalışan JavaScript ile arasında bir arayüz sağlamak için kullanılırlar.

Yerel düğüm modülleri Electron tarafından desteklenmektedir, ancak Electron'un sisteminizde kurulu olan Node ikilisinden farklı bir V8 versiyonu kullanması muhtemel olduğundan, yerli modülleri oluştururken Electron'un üstbilgilerinin konumunu elle belirtmeniz gerekir.

Ayrıca bakınız: [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System, Microsoft Windows için komut dosyası çalıştıran bir yükleyici yazma aracıdır. Ücretsiz yazılım lisanslarının birleşimi altında serbest bırakılır ve InstallShield gibi ticari mülkiyet ürünlerinde yaygın olarak kullanılan bir alternatiftir. [electron-builder](https://github.com/electron-userland/electron-builder) bir yapı hedefi olarak NSIS'yi destekler.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### işlem

Bir işlem çalıştırılmakta olan bir bilgisayar programının bir örneğidir. [main](#main-process) ve bir veya daha fazla [renderer](#renderer-process) işlemini kullanan electron uygulamaları aslında aynı anda birden fazla programı çalıştırıyor.

Node.js ve Electron'da, çalışan her işlem bir `process` nesnesine sahiptir. Bu nesne, mevcut süreç hakkında bilgi sağlayan ve bu işlemi kontrol eden bir globaldir. Küresel olarak, bu() kullanmayı gerektirmeyen uygulamalar için daima mevcuttur.

Ayrıca bkz: [main process](#main-process), [renderer process](#renderer-process)

### oluşturma süreci

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

Normal tarayıcılarda, web sayfaları genellikle korumalı bir ortamda çalışır ve yerel kaynaklara erişilmesine izin verilmez. Bununla birlikte, Electron kullanıcıları, daha düşük seviyedeki işletim sistemi etkileşimlerine izin veren web sayfalarında Node.js API'lerini kullanma gücüne sahiptir.

Ayrıca bkz: [process](#process), [main proces](#main-process)

### Sincap

Sincap, Electron uygulamalarının yeni sürümler çıktıkça otomatik olarak güncellenmesini sağlayan açık kaynaklı bir yapıdır. Sincap ile başlamak hakkında bilgi almak için [autoUpdater](api/auto-updater.md) API'ına bakın.

### kullanıcı alanı

Bu terim "userland" veya "userspace" nin işletim sistemi çekirdeğinin dışında çalışan programlara yönlendirildiği Unix topluluğundan kaynaklanmaktadır. Çok yakın zamanda, Node ve npm toluluğunda, "Ağ çekirdeği"nde bulunan özelliklerle npm kayıt defterinde yayınlanan paketleri çok daha geniş "kullanıcı" topluluğu arasında yaymak için bu terim yaygınlaştı.

Like Node, Electron çoklu platform masaüstü uygulamaları geliştirmek için gerekli tüm ilkeleri sağlayan küçük bir API setine sahip olmaya odaklanmıştır. Bu tasarım felsefesi, Electron'un nasıl kullanılacağı konusunda aşırı derecede kuralcı olmadan esnek bir araç olmaya devam etmesine izin verir. Userland, kullanıcıların "çekirdek"te mevcut olanın üstünde ek işlevler sağlayan araçlar oluşturmasına ve paylaşmasına olanak tanır.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron V8'i Chromium'un bir parçası olarak oluşturur ve arkasından devreyi oluştururken V8'i işaret eder.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [modejs.org/api/v8.htm](https://nodejs.org/api/v8.html)
- [docs/development/v8-devolopment.md](development/v8-development.md)

### web görünümü

`webview` etiketler, 'misafir' içeriğini (harici web sayfaları gibi) Electron uygulamanıza gömmek için kullanır. `iframe`'lerine benzer, ancak her web görünümü ayrı bir süreçte çalıştığı için farklıdır. Web sayfanızla aynı izinlere ve uygulamanız arasındaki tüm etkileşimlere sahip değil ve gömülmüş içerik eş zamansız olacak. Bu uygulamanızı gömülmüş içerikten korur.
