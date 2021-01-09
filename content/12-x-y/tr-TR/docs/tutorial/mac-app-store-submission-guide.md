# Mac App Store'a Gönderme Kılavuzu

Since v0.34.0, Electron allows submitting packaged apps to the Mac App Store (MAS). This guide provides information on: how to submit your app and the limitations of the MAS build.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## Uygulamanızı Nasıl sunabilirsiniz

Aşağıdaki adımlar, uygulamanızı Mac App Store'a göndermenin basit bir yolunu sunar. Her ne kadar, bu adımlar uygulamanızın Apple tarafından onaylanmasını sağlamasada; Mac App Store gereksinimlerini nasıl karşılanacağına ilişkin hala Apple'ın [Submitting Your App][submitting-your-app] kılavuzunu okumanız gerekir.

### Sertifika edin

Uygulamanızı Mac App Store'a göndermek için öncelikle Apple'dan bir sertifika almanız gerekir. [Halihazırda olan rehberleri][nwjs-guide] webde inceleyebilir ve takip edebilirsiniz.

### Takım ID'sini al

Uygulamanızı imzalamadan önce, hesabınızın Takım ID'sini bilmeniz gerekiyor. Takım ID'nizi bulmak için [Apple Geliştirici Merkezi](https://developer.apple.com/account/)'ne giriş yapın ve yan menüdeki Üyelik butonuna tıklayın. Takım ID'niz üyelik bilgileri bölümünün takım adı altında yer almaktadır.

### Uygulamanızı imzalayın

Hazırlık çalışmalarını tamamladıktan sonra, uygulamanızı aşağıdakileri izleyerek paketleyebilirsiniz:
 Uygulama Dağıtımı </ 0> 'na gidin ve ardından uygulamanızı imzalayın.</p> 

First, you have to add a `ElectronTeamID` key to your app's `Info.plist`, which has your Team ID as its value:



```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```


Sonra, üç yetki dosyaları hazırlamanız gerekir.

`child.plist`:



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```


`parent.plist`:



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
      <string>TEAM_ID.your.bundle.id</string>
    </array>
  </dict>
</plist>
```


`loginhelper.plist`:



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
  </dict>
</plist>
```


`TEAM_ID` kısmını takım ID'nizle `your.bundle.id` kısmını ise Bundle ID'nizle değiştirmeniz gerekmektedir.

Ve sonra aşağıdaki komut dosyası ile uygulamayı imzalayın:



```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH = "/ path / to / YourApp.app"
# İmzalanan paketi koymak istediğiniz yere giden yol.
RESULT_PATH="~/Desktop/$APP.pkg"
# İstediğiniz sertifikaların adı.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# plist dosyalarınızın yolu.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```


If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.



#### Yerel modülleri imzala

Native modules used in your app also need to be signed. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:



```sh
electron-osx-sign Uygulaman.app Uygulaman.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```


Ayrıca, yerli modüllerde üretilmemiş ara dosyaların bulunmasına dikkat edilmelidir. (bunların da imzalanması gerektiğinden dolayı dahil edilmemelidir). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versions 8.1.0 and later ignore those files by default.



### Uygulamanı yükle

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.



### Uygulamanızı gözden geçirmek için gönderin

After these steps, you can [submit your app for review][submit-for-review].



## MAS Yapısının Sınırlamaları

Uygulama sanal alanı oluşturmak için tüm gereksinimleri karşılamak adına MAS derlemesinde aşağıdaki modüller devre dışı bırakılmıştır:

* `crashReporter`
* `autoUpdater`

ve aşağıdaki davranışlar değiştirilmiştir:

* Video yakalamak bazı makineler için çalışmayabilir.
* Belirli erişilebilirlik özellikleri çalışmayabilir.
* Uygulamalar DNS değişikliklerinden haberdar olmaz.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.



### Ek yükümlülükler

Uygulamanızın hangi Elektron API'larını kullandığına bağlı olarak, uygulamanızın bu API'ları Mac App Store yapısından kullanabilmesi için `parent.plist` dosyanıza ek yetkiler eklemeniz gerekebilir.



#### Ağ erişimi

Uygulamanızın bir sunucuya bağlanmasına izin vermek için giden ağ bağlantılarını etkinleştirin:



```xml
<key>com.apple.security.network.client</key>
<true/>
```


Uygulamanızın ağ dinleme soketini açmasını sağlamak için gelen ağ bağlantılarınızı etkinleştirin:



```xml
<key>com.apple.security.network.server</key>
<true/>
```


See the [Enabling Network Access documentation][network-access] for more details.



#### dialog.showOpenDialog



```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```


See the [Enabling User-Selected File Access documentation][user-selected] for more details.



#### dialog.showSaveDialog



```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```


See the [Enabling User-Selected File Access documentation][user-selected] for more details.



## Electron Tarafından Kullanılan Kriptografi Algoritmaları

Depending on the countries in which you are releasing your app, you may be required to provide information on the cryptographic algorithms used in your software. See the [encryption export compliance docs][export-compliance] for more information.

Electron aşağıdaki şifreleme algoritmalarını kullanmaktadır:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](https://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* OYUNCULAR - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* FİKİR - X. Lai'nin "Block Ciphers Tasarım ve Güvenliği Hakkında" kitabı
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[electron-osx-sign]: https://github.com/electron-userland/electron-osx-sign
[electron-packager]: https://github.com/electron/electron-packager
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
