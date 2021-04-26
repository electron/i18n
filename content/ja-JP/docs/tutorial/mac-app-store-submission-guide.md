# Mac App Store への公開ガイド

v0.34.0 から、Electron のパッケージしたアプリを Mac App Store (MAS) に登録できるようになります。 このガイドでは、MASビルド用の制限とアプリを登録する方法についての情報を提供します。

**注意:** Mac App Store にアプリを登録するには、[Apple Developer Program][developer-program] に登録する必要があります。これには費用がかかります。

## アプリを登録する方法

Mac App Store にアプリを提出する簡単な方法をご紹介します。 これらの手順は、アプリがAppleによって承認することを保証しているわけではありません。Mac App Storeの登録要件を満たすために、Appleの[アプリを登録するには][submitting-your-app]ガイドも読んでおく必要があります。

### 証明書の取得

Mac App Store にアプリを提出するには、まず Apple から証明書を取得する必要があります。 詳しくは、[こちらのガイド][nwjs-guide]をご覧ください。

### チーム ID の取得

アプリに署名する前にアカウントのチーム ID を知っておく必要があります。 チーム ID を知るには、[Apple Developer Center](https://developer.apple.com/account/)にサインインし、サイドバーでMembershipをクリックします。 チーム IDは、Team nameの、Membership Information セクションに表示されます。

### アプリの署名

準備作業を終えた後は、[アプリケーションの配布](application-distribution.md)に従って、アプリをパッケージ化して、アプリの署名に進みます。

まず、アプリの `Info.plist` に、チーム ID を値として持つ `ElectronTeamID` キーを以下のように追加する必要があります。

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

それから、3 つの資格ファイルを準備する必要があります。

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

`TEAM_ID` をあなたのチーム ID に置き換えて、`your.bundle.id` をアプリのバンドル ID に置き換えてください。

そして、次のスクリプトでアプリを署名します。

```sh
#!/bin/bash

# アプリの名前。
APP="YourApp"
# 署名するアプリのパス。
APP_PATH="/path/to/YourApp.app"
# 署名付きパッケージを配置する場所へのパス。
RESULT_PATH="~/Desktop/$APP.pkg"
# リクエストした証明書の名前
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# plist ファイルのパス。
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

macOS で初めてアプリをサンドボックス化するのであれば、Apple の [Enabling App Sandbox][enable-app-sandbox] を通読し、基本的な考え方を確認してから、権利ファイル (entitlement file) にアプリで必要なパーミッションキーを追加しましょう。

署名を手動で行う代わりに、[electron-osx-sign][electron-osx-sign] モジュールを使用することも出来ます。

#### ネイティブ モジュールに署名

アプリで使用されているネイティブモジュールも署名する必要があります。 electron-osx-sign を使用している場合は、必ず引数リストに構築済みバイナリへのパスを含めてください。

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

また、ネイティブモジュールは中間ファイルを生成しているかもしれませんが、それらは含まれるべきではありません (それらもまた署名される必要があるので)。 バージョン 8.1.0 より前の [electron-packager][electron-packager] を使用している場合は、ビルド手順に `--ignore=.+\.o$` を追加してこれらのファイルを無視してください。 バージョン 8.1.0 以降ではこれらのファイルはデフォルトで無視されます。

### App をアップロード

アプリに署名後、iTunes Connect にアップロードするために Application Loader を使用できます。アップロードする前に [レコードを作成していること][create-record] を確認してください。

### アプリケーションを審査に提出

これらのステップを終えれば、[アプリをレビュー登録][submit-for-review] できます。

## MAS ビルドの制限

アプリのサンドボックス化ですべての要件を満たすために、MAS ビルドで以下のモジュールを無効にしてください。

* `crashReporter`
* `autoUpdater`

そして、以下の挙動が変化します。

* ビデオキャプチャーはいくつかのマシンで動作しないかもしれません。
* 一部のアクセシビリティ機能が動作しないことがあります。
* アプリはDNSの変更を認識しません。

サンドボックス化の利用により、アプリがアクセスできるリソースは厳密に制限されます。詳細は [アプリのサンドボックス化][app-sandboxing] をご参照ください。

### 追加のエンタイトルメント

アプリで使用する Electron API に応じて、アプリの Mac App Store ビルドからこれらの API を使用できるようにするために、追加のエンタイトルメントを `parent.plist` ファイルに追加する必要があります。

#### ネットワークアクセス

アプリがサーバーに接続できるように、以下のように発信ネットワーク接続を有効にします。

```xml
<key>com.apple.security.network.client</key>
<true/>
```

アプリがネットワーク待機ソケットを開くことを許可するために、以下のように着信ネットワーク接続を有効にします。

```xml
<key>com.apple.security.network.server</key>
<true/>
```

詳細は [Enabling Network Access ドキュメント][network-access] を参照してください。

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

詳細は [Enabling User-Selected File Access ドキュメント][user-selected] を参照してください。

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

詳細は [Enabling User-Selected File Access ドキュメント][user-selected] を参照してください。

## Electron が使用する暗号化アルゴリズム

アプリをリリースする国によっては、ソフトウェアで使用されている暗号化アルゴリズムに関する情報を提供する必要があります。 詳細は [暗号輸出コンプライアンスドキュメント][export-compliance] を参照してください。

Electron は次の暗号アルゴリズムを使用しています:

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
