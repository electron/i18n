# Tabirler

This page defines some terminology that is commonly used in Electron development.

### ASAR

ASAR stands for Atom Shell Archive Format. An [asar](https://github.com/electron/asar) archive is a simple `tar`-like format that concatenates files into a single file. Electron can read arbitrary files from it without unpacking the whole file.

The ASAR format was created primarily to improve performance on Windows... TODO

### Brightray

Brightray [was](https://github.com/electron-archive/brightray) a static library that made [libchromiumcontent](#libchromiumcontent) easier to use in applications. It is now deprecated and has been merged into Electron's codebase.

### CRT

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

An Apple Disk Image is a packaging format used by macOS. DMG files are commonly used for distributing application "installers". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### IME

Input Method Editor. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

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

Bu terim "userland" veya "userspace" nin işletim sistemi çekirdeğinin dışında çalışan programlara yönlendirildiği Unix topluluğundan kaynaklanmaktadır. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [modejs.org/api/v8.htm](https://nodejs.org/api/v8.html)
- [docs/development/v8-devolopment.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.