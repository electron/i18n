# Tabirler

Bu sayfa Electron gelişiminde yaygın olarak kullanılan bazı terminolojileri tanımlamaktadır.

### ASAR

ASAR, Atom Shell Arşiv Formatı anlamına gelmektedir. Bir [ asar ](https://github.com/electron/asar) arşivi basittir ` tar ` benzeri bir format, dosyaları tek bir dosyaya bağlar. Electron bütün dosyayı arşivden çıkarmadan rasgele dosyaları okuyabilir.

ASAR biçimi öncelikle Windows'daki performansı artırmak için oluşturuldu... TODO

### Brightray

Brightray [was](https://github.com/electron-archive/brightray) statik kitaplığı [libchromiumcontent](#libchromiumcontent) uygulamalarda daha kolay kullanılabilir hale getirdi. Şimdi kullanımdan kaldırıldı ve Electron'un kod tablasına birleştirildi.

### CRT

C Çalışma Zamanı Kitaplığı (CRT) C ++ Standart Kitaplığı'nın bir parçasıdır. ISO C99 standart kütüphanesini içerir. CRT' yi destekleyen görsel C++ kütüphaneleri yerel kod geliştimeyi sağlar,ayrıca hem düzenli hemde düzensiz yerel kodlar .NET'i geliştirmek için yönetilebilir.

### DMG

Bir Apple Disk Görüntüsü, macOS tarafından kullanılan bir paketleme biçimidir. DMG dosyaları uygulama "kurulumcularını" dağıtmak için yaygın olarak kullanılır. [electron-builder](https://github.com/electron-userland/electron-builder) bir yapı hedefi olarak `dmg` destekler.

### IME

Giriş yöntemi editörü. Kullanıcıların klavyelerinde bulunmayan karakterleri ve sembolleri girmesini olanaklı kılan bir program. Örneğin, bu, Latin klavye kullanıcılarının klavyelerini kullanarak Çince, Japonca, Korece ve Hint karakterlerini girmelerine olanak verir.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC, Süreçlararası İletişim anlamına gelir. Elektron, [ana](#main-process) ve [oluşturucu](#renderer-process) işlemleri arasındaki seri hale getirilmiş JSON iletileri göndermek için IPC kullanır.

### libchromiumcontent

[ Chromium İçerik modülünü](https://www.chromium.org/developers/content-module) ve tüm paylaşılan bağımlılıklarını (ör. Blink, [V8](#v8)vb.). içeren bir paylaşılan kütüphane. Ayrıca "libcc" olarak da adlandırılır.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### ana işlem

Ana işlem, yaygın olarak `main.js` adlı bir dosya, her Electron uygulamasına giriş noktasıdır. Uygulama açıkken kapansa da ömrünü kontrol eder. Ayrıca Menü, Menü Bar, Yuva, Tepsi gibi yerel ögeleri de yönetir. Ana işlem, uygulamada her yeni işleyici sürecini oluşturmaktan sorumludur. Tam Düğüm API'si yerleştirilmiştir.

Her uygulamanın ana işlem dosyası `package.json` 'daki `ana` özelliğinde belirtilir. `electron .` başlangıçta hangi dosyanın nasıl yürütüleceğini bilir.

Chromium'da bu işleme "tarayıcı süreci" denir. İşleyici süreçleriyle karıştırılmamak için Electron'da yeniden adlandırılır.

Ayrıca bkz: [process](#process), [renderer process](#renderer-process)

### MAS

Apple'ın Mac App Store'un kısaltması. Uygulamanızı, MAS'a gönderme ile ilgili ayrıntılar için, [ Mac App Store Gönderme Kılavuzu](tutorial/mac-app-store-submission-guide.md) 'na bakın.

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### yerel modüller

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. Temel olarak Node.js'de ve C/C++ kitaplıklarında çalışan JavaScript ile arasında bir arayüz sağlamak için kullanılırlar.

Yerel düğüm modülleri Electron tarafından desteklenmektedir, ancak Electron'un sisteminizde kurulu olan Node ikilisinden farklı bir V8 versiyonu kullanması muhtemel olduğundan, yerli modülleri oluştururken Electron'un üstbilgilerinin konumunu elle belirtmeniz gerekir.

Ayrıca bakınız: [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System, Microsoft Windows için komut dosyası çalıştıran bir yükleyici yazma aracıdır. Ücretsiz yazılım lisanslarının birleşimi altında serbest bırakılır ve InstallShield gibi ticari mülkiyet ürünlerinde yaygın olarak kullanılan bir alternatiftir. [electron-builder](https://github.com/electron-userland/electron-builder) bir yapı hedefi olarak NSIS'yi destekler.

### OSR

OSR (Ekran dışı görüntü işleme) ağır sayfayı arka planda yüklemek ve sonra görüntülerken kullanabilir (çok daha hızlı olacaktır). Ekrandaki sayfayı göstermeden sayfayı oluşturmanıza izin verir.

### işlem

Bir işlem çalıştırılmakta olan bir bilgisayar programının bir örneğidir. [main](#main-process) ve bir veya daha fazla [renderer](#renderer-process) işlemini kullanan electron uygulamaları aslında aynı anda birden fazla programı çalıştırıyor.

Node.js ve Electron'da, çalışan her işlem bir `process` nesnesine sahiptir. Bu nesne, mevcut süreç hakkında bilgi sağlayan ve bu işlemi kontrol eden bir globaldir. Küresel olarak, bu() kullanmayı gerektirmeyen uygulamalar için daima mevcuttur.

Ayrıca bkz: [main process](#main-process), [renderer process](#renderer-process)

### oluşturma süreci

İşleyici süreç uygulamanızda bir tarayıcı penceresidir. Ana işlemin aksine bunlar çoklu olabilir ve her biri ayrı bir süreçte çalıştırılır. Ayrıca gizli olabilirler.

Normal tarayıcılarda, web sayfaları genellikle korumalı bir ortamda çalışır ve yerel kaynaklara erişilmesine izin verilmez. Bununla birlikte, Electron kullanıcıları, daha düşük seviyedeki işletim sistemi etkileşimlerine izin veren web sayfalarında Node.js API'lerini kullanma gücüne sahiptir.

Ayrıca bkz: [process](#process), [main proces](#main-process)

### Sincap

Sincap, Electron uygulamalarının yeni sürümler çıktıkça otomatik olarak güncellenmesini sağlayan açık kaynaklı bir yapıdır. Sincap ile başlamak hakkında bilgi almak için [autoUpdater](api/auto-updater.md) API'ına bakın.

### kullanıcı alanı

Bu terim "userland" veya "userspace" nin işletim sistemi çekirdeğinin dışında çalışan programlara yönlendirildiği Unix topluluğundan kaynaklanmaktadır. Çok yakın zamanda, Node ve npm toluluğunda, "Ağ çekirdeği"nde bulunan özelliklerle npm kayıt defterinde yayınlanan paketleri çok daha geniş "kullanıcı" topluluğu arasında yaymak için bu terim yaygınlaştı.

Like Node, Electron çoklu platform masaüstü uygulamaları geliştirmek için gerekli tüm ilkeleri sağlayan küçük bir API setine sahip olmaya odaklanmıştır. Bu tasarım felsefesi, Electron'un nasıl kullanılacağı konusunda aşırı derecede kuralcı olmadan esnek bir araç olmaya devam etmesine izin verir. Userland, kullanıcıların "çekirdek"te mevcut olanın üstünde ek işlevler sağlayan araçlar oluşturmasına ve paylaşmasına olanak tanır.

### V8

V8 Google'ın açık kaynak kodlu JavaScript motorudur. C++'da yazılmış ve Google Chrome'da kullanılmıştır. V8 tek başına çalışabilir veya herhangi bir C++ uygulamasına eklenebilir.

Electron V8'i Chromium'un bir parçası olarak oluşturur ve arkasından devreyi oluştururken V8'i işaret eder.

V8'in sürüm numaraları her zaman Google Chrome'un sürüm numaralarına karşılık gelir. Chrome 59'un V8'i 5.9'u, Chrome 58'in V8'i 5.8'i vb. içerir.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-devolopment.md](development/v8-development.md)

### web görünümü

`webview` etiketler, 'misafir' içeriğini (harici web sayfaları gibi) Electron uygulamanıza gömmek için kullanır. `iframe`'lerine benzer, ancak her web görünümü ayrı bir süreçte çalıştığı için farklıdır. Web sayfanızla aynı izinlere ve uygulamanız arasındaki tüm etkileşimlere sahip değil ve gömülmüş içerik eş zamansız olacak. Bu uygulamanızı gömülmüş içerikten korur.