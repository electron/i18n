# Gabay sa Pagsumite sa Mac App Store

Since v0.34.0, Electron allows submitting packaged apps to the Mac App Store (MAS). This guide provides information on: how to submit your app and the limitations of the MAS build.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## Paano Isumite ng Iyong App

Ang sumusunod na mga hakbang ay nagpapakilala ng isang simpleng paraan sa pagsumite ng iyong app sa Mac App Store. Ngunit, ang mga hakbang na ito ay hindi matitiyak na maapruban ng Apple ang iyong app; kailangan mo parin basahin ang hakbang ng [Pagsumite ng Iyong App][submitting-your-app] ng Apple upang matugunan ang pangangailangan ng Mac App Store.

### Kumuha ng Sertipiko

Para isumite ang iyong app sa Mac App Store, una ay kailangan mong kumuha ng sertipiko mula sa Apple. Maaari mong sundin ang mga [nananatili na gabay][nwjs-guide] sa web.

### Kumuha ng Team ID

Bago lagdaan ang iyong app, kailangan mong malaman ang Team ID ng iyong account. Para mahanap ang Team ID, mag-sign in sa [Apple Developer Center](https://developer.apple.com/account/), at i-klik ang Membership sa sidebar. Ang iyong Team ID ay makikita sa Membership impormasyon na seksyon ilalim ng pangalan ng team.

### Lagdaan ang Iyong App

Matapos magtapos ang paghahanda ng gawain, maaari mong i-package ang iyong app sa pamamagitan ng pagsunod sa [Application Distribution](application-distribution.md), at pagkatapos ipagpatuloy lagdaan ang iyong app.

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

Tapos, dapat mong ihanda ang tatlong mga file na may karapatan.

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

Dapat mong palitan ang `TEAM_ID` sa iyong Team ID, at palitan ang `your.bundle.id` sa Bundle ID ng iyong app.

At pagkatapos, lagdaan ang iyong app sa sumusunod na mga iskrip:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# Ang landas sa lokasyon na gusto mong ilagay ang pinirmahang pakete.
RESULT_PATH="~/Desktop/$APP.pkg"
# Ang pangalan ng mga sertipikong hiniling mo.
APP_KEY="3rd Party Mac Developer Application: Pangalan ng Kompanya (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Pangalan ng Kompanya (APPIDENTITY)"
# Ang landas ng iyong plist na mga file.
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

#### Pirmahan ang mga Native na Modyul

Native modules used in your app also need to be signed. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Tandaan din na ang native na mga modyul ay maaaring may intermediate na mga file na binuo na hindi sana kabilang (na dapat rin nilagdaan). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versions 8.1.0 and later ignore those files by default.

### I-upload ang iyong app

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### I-sumite ang Iyong App para sa Pagsusuri

After these steps, you can [submit your app for review][submit-for-review].

## Mga Limitasyon ng MAS Build

Upang matugunan ang pangangailangan ng app sandboxing, ang sumusunod na modyul ay hindi pinagana sa MAS build:

* `crashReporter`
* `autoUpdater`

at ang mga sumusunod na mga paggalaw ay binago:

* Ang pagkuha ng video ay maaaring hindi gumana sa ibang mga makina.
* Ang ilang mga katangian ng aksesibilidad ay maaaring hindi gumana.
* Ang mga app ay hindi makakaalam sa mga pagbabago ng DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### Karagdagang mga Karapatan

Depende sa kung aling mga Electron API ang ginagamit ng iyong app, maaaring kailangan mong magdagdag ng karagdagang mga karapatan sa iyong `parent.plist` na file upang magamit ang mga API na ito mula sa Mac App Store na build ng iyong app.

#### Access sa Network

Paganahin ang mga kasalukuyang mga koneksyon ng network para payagan ang iyong app na kumonekta sa isang server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Paganahin ang mga papasok na koneksyon sa network upang payagan ang iyong app na magbukas ng isang network listening socket:

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

## Mga Cryptographic Algorithm na Ginamit ng Electron

Depending on the countries in which you are releasing your app, you may be required to provide information on the cryptographic algorithms used in your software. See the [encryption export compliance docs][export-compliance] for more information.

Ang Electron ay gumagamit ng mga sumusunod na cryptographic algorithm:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](https://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
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
