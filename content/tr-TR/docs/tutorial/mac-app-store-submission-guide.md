# Mac App Store'a Gönderme Kılavuzu

Since v0.34.0, Electron allows submitting packaged apps to the Mac App Store (MAS). This guide provides information on: how to submit your app and the limitations of the MAS build.

**Note:** Submitting an app to Mac App Store requires enrolling [Apple Developer Program](https://developer.apple.com/support/compare-memberships/), which costs money.

## Uygulamanızı Nasıl sunabilirsiniz

Aşağıdaki adımlar, uygulamanızı Mac App Store'a göndermenin basit bir yolunu sunar. Her ne kadar, bu adımlar uygulamanızın Apple tarafından onaylanmasını sağlamasada; Mac App Store gereksinimlerini nasıl karşılanacağına ilişkin hala Apple'ın [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) kılavuzunu okumanız gerekir.

### Sertifika edin

Uygulamanızı Mac App Store'a göndermek için öncelikle Apple'dan bir sertifika almanız gerekir. [Halihazırda olan rehberleri](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) webde inceleyebilir ve takip edebilirsiniz.

### Takım ID'sini al

Uygulamanızı imzalamadan önce, hesabınızın Takım ID'sini bilmeniz gerekiyor. Takım ID'nizi bulmak için [Apple Geliştirici Merkezi](https://developer.apple.com/account/)'ne giriş yapın ve yan menüdeki Üyelik butonuna tıklayın. Takım ID'niz üyelik bilgileri bölümünün takım adı altında yer almaktadır.

### Uygulamanızı imzalayın

Hazırlık çalışmalarını tamamladıktan sonra, uygulamanızı aşağıdakileri izleyerek paketleyebilirsiniz:  Uygulama Dağıtımı </ 0> 'na gidin ve ardından uygulamanızı imzalayın.</p> 

First, you have to add a `ElectronTeamID` key to your app's `Info.plist`, which has your Team ID as value:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTakımID</key>
  <string>TAKIM_ID</string>
</dict>
</plist>
```

Then, you need to prepare three entitlements files.

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
    <string>TEAM_ID.your.bundle.id</string>
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

And then sign your app with the following script:

```sh
#!/bin/bash

# Uygulamanızın Adı
APP="Uygulama"
# İmzalamak için uygulamanızın dosya dizini
APP_PATH="/path/to/YourApp.app"
# The path to the location you want to put the signed package.
RESULT_PATH="~/Desktop/$APP.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# The path of your plist files.
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
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper EH.app/Contents/MacOS/$APP Helper EH"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper EH.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper NP.app/Contents/MacOS/$APP Helper NP"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper NP.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Uygulamayı manuel olarak imzalamanın yanı sıra, [elektron-osx-sign](https://github.com/electron-userland/electron-osx-sign) modülünü işi yapması için kullanmayı seçebilirsiniz.

#### Yerel modülleri imzala

Uygulamanızda kullanılan yerel modüller de imzalanmalıdır. Eğer Electron-osx-sign kullanılıyorsa, yerleşik ikili dosyaların yolunun bağımsız değişken listesine eklendiğinden emin olun:

```sh
electron-osx-sign Uygulaman.app Uygulaman.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Also note that native modules may have intermediate files produced which should not be included (as they would also need to be signed). If you use [electron-packager](https://github.com/electron-userland/electron-packager) before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versions 8.1.0 and later ignores those files by default.

### Uygulamanı yükle

Uygulamanızı imzaladıktan sonra, yüklemeden önce [created a record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html)’a sahip olduğunuzdan emin olmak ve iTunes Connect'e yazılım yüklemek için uygulama yükleyicisi'ni kullanabilirsiniz.

### Submit Your App for Review

Bu adımların ardından, [uygulamanızı incelenmek üzere gönderebilirsiniz](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Limitations of MAS Build

Uygulama sanal alanı oluşturmak için tüm gereksinimleri karşılamak adına MAS derlemesinde aşağıdaki modüller devre dışı bırakılmıştır:

* `crashReporter`
* `autoUpdater`

ve aşağıdaki davranışlar değiştirilmiştir:

* Video yakalamak bazı makineler için çalışmayabilir.
* Belirli erişilebilirlik özellikleri çalışmayabilir.
* Uygulamalar DNS değişikliklerinden haberdar olmaz.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing](https://developer.apple.com/app-sandboxing/) for more information.

### Additional Entitlements

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

See the [Enabling Network Access documentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Daha fazla bilgi için [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) bakın.

## Bilinen sorunlar

### `shell.openItem(filePath)`

Mac App Store'da dağıtım için imzalandığı takdirde bu işlem hata verecektir. Daha fazla bilgi ve güncellemeler için [#9005](https://github.com/electron/electron/issues/9005)'e abone olun.

#### Geçici çözümler

`shell.openExternal('file://' + filePath)` will open the file in the default application as long as the extension is associated with an installed app.

## Electron Tarafından Kullanılan Kriptografi Algoritmaları

Bulunduğunuz ülke ve bölgeye bağlı olarak, Mac App Store uygulamasında kullanılan şifreleme algoritmalarını belgelemeniz istenilebilir ve hatta ABD şifreleme kaydı (ERN) onayının bir kopyasını göndermeniz istenilebilir.

Elektron aşağıdaki şifreleme algoritmalarını kullanmaktadır:

* AES - [NIST SP 800-38A](http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](http://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](http://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](http://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](http://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](http://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](http://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](http://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](http://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://www.openssl.org/docs/manmaster/crypto/mdc2.html)
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](http://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

ERN onayını nasıl alacağınız,[Şifreleme kullandığında (veya bir ERN'nin nasıl elde edileceği), yasal olarak Apple'ın App Store'a bir uygulama nasıl bildirileceği konusunda, makaleye bakabilirsiniz:](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).