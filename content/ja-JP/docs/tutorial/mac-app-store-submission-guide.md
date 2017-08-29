# Mac App Storeへの公開ガイド

v0.34.0から、ElectronはMac App Store (MAS) にパッケージ化したアプリを登録することができます。このガイドでは、MASビルド用の制限とアプリを登録する方法についての情報を提供します。

**注意:** Mac App Storeにアプリを登録するには、[Apple Developer Program](https://developer.apple.com/support/compare-memberships/)に登録する必要があります。これには費用がかかります。

## アプリを登録する方法

Mac App Store にアプリを提出する簡単な方法をご紹介します。 これらの手順は、アプリがAppleによって承認することを保証しているわけではありません。Mac App Storeの登録要件を満たすために、Appleの[アプリを登録するには](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html)ガイドも読んでおく必要があります。

### 証明書の取得

Mac App Store にアプリを提出するには、Appleからまず証明書を取得する必要があります。 詳しくは、[こちらのガイド](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps)をご覧ください。

### チーム ID の取得

アプリに署名する前にアカウントのチーム ID を知っておく必要があります。 チーム ID を知るには、[Apple Developer Center](https://developer.apple.com/account/)にサインインし、サイドバーでMembershipをクリックします。 チーム IDは、Team nameの、Membership Information セクションに表示されます。

### アプリの署名

準備作業を終えた後は、[アプリケーションの配布](application-distribution.md)に従って、アプリをパッケージ化して、アプリの署名に進みます。

First, you have to add a `ElectronTeamID` key to your app's `Info.plist`, which has your Team ID as value:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

つぎに、2 つの資格ファイルを準備する必要があります。

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

`TEAM_ID`をあなたのチーム IDに入れ替えて、`your.bundle.id` をアプリのバンドル ID に置き換えてください。

そして、次のスクリプトでアプリを署名します。

```bash
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# The path to the location you want to put the signed package.
RESULT_PATH="~/Desktop/$APP.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# The path of your plist files.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"

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
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

macOSでのアプリのサンドボックス化を行うことが初めてなら、Appleの[Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html)を通読し、基本的な考え方を確認してから、権利ファイル(entitlement file) にアプリに必要なパーミッションキーを追加します。

署名を手動で行う代わりに、[electron-osx-sign](https://github.com/electron-userland/electron-osx-sign)モジュールを使用することも出来ます。

#### ネイティブ モジュールに署名

Native modules used in your app also need to be signed. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:

```bash
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Also note that native modules may have intermediate files produced which should not be included (as they would also need to be signed). If you use [electron-packager](https://github.com/electron-userland/electron-packager) before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versions 8.1.0 and later ignores those files by default.

### Appをアップロードする。

アプリに署名後、iTunes ConnectにアップロードするためにApplication Loaderを使用できます。アップロードする前に[レコードを作成していること](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html)を確認してください。

### アプリケーションを審査に提出

これらのステップを終えた後、[レビュー用にアプリを登録](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html)できます。

## MAS Buildの制限

アプリのサンドボックスですべての要件を満たすために、MASビルドで次のモジュールを無効にしてください。

* `crashReporter`
* `autoUpdater`

次の挙動を変更してください。

* ビデオキャプチャーはいくつかのマシンで動作しないかもしれません。
* 一部のアクセシビリティ機能が動作しないことがあります。
* アプリはDNSの変更を認識しません。
* ログイン時にアプリケーションを起動するための API は使用できません。https://github.com/electron/electron/issues/7312#issuecomment-249479237 を参照してください。

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing](https://developer.apple.com/app-sandboxing/) for more information.

### Additional Entitlements

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your `parent.plist` file to be able to use these APIs from your app's Mac App Store build.

#### Network Access

Enable outgoing network connections to allow your app to connect to a server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Enable incoming network connections to allow your app to open a network listening socket:

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

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

## Cryptographic Algorithms Used by Electron

Depending on the country and region you are located, Mac App Store may require documenting the cryptographic algorithms used in your app, and even ask you to submit a copy of U.S. Encryption Registration (ERN) approval.

Electron uses following cryptographic algorithms:

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

On how to get the ERN approval, you can reference the article: [How to legally submit an app to Apple’s App Store when it uses encryption (or how to obtain an ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).