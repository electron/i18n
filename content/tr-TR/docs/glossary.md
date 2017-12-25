# Tabirler

Bu sayfa Electron gelişiminde yaygın olarak kullanılan bazı terminolojileri tanımlamaktadır.

### ASAR

ASAR, Atom Shell Arşiv Formatı anlamına gelmektedir. An [asar](https://github.com/electron/asar) archive is a simple `tar`-like format that concatenates files into a single file. Electron can read arbitrary files from it without unpacking the whole file.

The ASAR format was created primarily to improve performance on Windows... TODO

### Brightray

Brightray [was](https://github.com/electron-archive/brightray) a static library that made [libchromiumcontent](#libchromiumcontent) easier to use in applications. It is now deprecated and has been merged into Electron's codebase.

### CRT

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

An Apple Disk Image is a packaging format used by macOS. DMG files are commonly used for distributing application "installers". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Giriş yöntemi editörü. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Ayrıca "libcc" olarak da adlandırılır.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### ana işlem

Ana işlem, yaygın olarak `main.js` adlı bir dosya, her Electron uygulamasına giriş noktasıdır. Uygulama açıkken kapansa da ömrünü kontrol eder. Ayrıca Menü, Menü Bar, Yuva, Tepsi gibi yerel ögeleri de yönetir. Ana işlem, uygulamada her yeni işleyici sürecini oluşturmaktan sorumludur. Tam Düğüm API'si yerleştirilmiştir.

Her uygulamanın ana işlem dosyası ` package.json` 'daki `ana` özelliğinde belirtilir. ` electron. ` başlangıçta hangi dosyanın nasıl yürütüleceğini bilir.

Chromium'da bu işleme "tarayıcı süreci" denir. İşleyici süreçleriyle karıştırılmamak için Electron'da yeniden adlandırılır.

Ayrıca bkz: [işlem](#process), [işleyici işlemi](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### yerel modüller

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. Ücretsiz yazılım lisanslarının birleşimi altında serbest bırakılır ve InstallShield gibi ticari mülkiyet ürünlerinde yaygın olarak kullanılan bir alternatiftir. [elektron oluşturucu](https://github.com/electron-userland/electron-builder) bir yapı hedefi olarak NSIS'yi destekler.

### OSR

OSR (Ekran dışı görüntü işleme) ağır sayfayı arka planda yüklemek ve sonra görüntülerken kullanabilir (çok daha hızlı olacaktır). Ekrandaki sayfayı göstermeden sayfayı oluşturmanıza izin verir.

### süreç

Bir işlem çalıştırılmakta olan bir bilgisayar programının bir örneğidir. [Ana](#main-process) ve bir veya daha fazla [işleyici](#renderer-process) işlemini kullanan electron uygulamaları aslında aynı anda birden fazla programı çalıştırıyor.

Node.js ve Electron'da, çalışan her işlem bir `işlem` nesnesine sahiptir. Bu nesne, mevcut süreç hakkında bilgi sağlayan ve bu işlemi kontrol eden bir globaldir. Küresel olarak, bu() kullanmayı gerektirmeyen uygulamalar için daima mevcuttur.

Ayrıca bkz: [ana işlem](#main-process), [işleyici süreç](#renderer-process)

### oluşturma süreci

İşleyici süreç uygulamanızda bir tarayıcı penceresidir. Ana işlemin aksine bunlar çoklu olabilir ve her biri ayrı bir süreçte çalıştırılır. Ayrıca gizli olabilirler.

Normal tarayıcılarda, web sayfaları genellikle korumalı bir ortamda çalışır ve yerel kaynaklara erişilmesine izin verilmez. Bununla birlikte, Electron kullanıcıları, daha düşük seviyedeki işletim sistemi etkileşimlerine izin veren web sayfalarında Node.js API'lerini kullanma gücüne sahiptir.

Ayrıca bkz: [işlem](#process), [ana işlem](#main-process)

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
- [modejs.org/api/v8.htm](https://nodejs.org/api/v8.html)
- [docs/development/v8-devolopment.md](development/v8-development.md)

### web görünümü

`web görünümü` etiketler, 'misafir' içeriğini (harici web sayfaları gibi) Electron uygulamanıza gömmek için kullanır. `iframe`'lerine benzer, ancak her web görünümü ayrı bir süreçte çalıştığı için farklıdır. Web sayfanızla aynı izinlere ve uygulamanız arasındaki tüm etkileşimlere sahip değil ve gömülmüş içerik eş zamansız olacak. Bu uygulamanızı gömülmüş içerikten korur.