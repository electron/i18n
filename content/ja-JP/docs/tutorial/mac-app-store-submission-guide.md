# Mac App Store への公開ガイド

このガイドでは以下の情報を提供しています。

* macOS で Electron アプリを署名する方法;
* Mac App Store (MAS) に Electron アプリを提出する方法;
* MAS ビルドの制限。

## 要件

Electron アプリを署名するには、まず以下のツールをインストールする必要があります。

* Xcode 11 以降。
* [electron-osx-sign][electron-osx-sign] npm モジュール。

また、Apple Developer アカウントを登録し [Apple Developer Program][developer-program] に参加する必要があります。

## Electron アプリを署名する

Electron アプリは Mac App Store や外部サイトで頒布できます。 それぞれの方法ごとに、署名やテストの方法が異なります。 このガイドでは Mac App Store での頒布を中心に説明しますが、その他の方法についても言及します。

以下の手順で、Apple から証明書を取得する方法、Electron アプリに署名する方法、テストする方法を説明します。

### 証明書の取得

最も簡単に署名証明書を取得するには、Xcode を使用して以下のようします。

1. Xcode を開いて設定の "Accounts" を開きます。
2. Apple アカウントでサインインします。
3. チームを選択して "Manage Certificates" をクリックします。
4. 署名証明書シートの左下にある追加ボタン (+) をクリックし、以下の証明書を追加します。
   * "Apple Development"
   * "Apple Distribution"

"Apple Development" 証明書は、Apple Developer ウェブサイトで登録したマシン上で、開発およびテスト用のアプリに署名するために使用します。 登録方法については、[プロビジョニングプロファイルの準備](#prepare-provisioning-profile) で説明します。

"Apple Development" 証明書で署名したアプリは Mac App Store に提出できません。 このためには、代わりに "Apple Distribution" 証明書でアプリに署名する必要があります。 ただし注意として、"Apple Distribution" 証明書で署名したアプリはそのまま実行できません。実行できるようにするには Apple が再署名する必要がありますが、これは Mac App Store からダウンロードした後でのみ可能になります。

#### その他の証明書

証明書の種類が他にもあることにお気づきでしょう。

"Developer ID Application" 証明書は、アプリを Mac App Store 以外で頒布する前の署名に使用します。

"Developer ID Installer" および "Mac Installer Distribution" の証明書は、アプリ自体ではなく "Mac Installer Package" の署名に使用します。 ほとんどの Electron アプリは Mac Installer Package を使用しないので、通常は必要ありません。

証明書の種類の完全なリストは [こちら](https://help.apple.com/xcode/mac/current/#/dev80c6204ec) で見られます。

"Apple Development" および "Apple Distribution" 証明書で署名されたアプリは [App Sandbox][app-sandboxing] 下でしか実行できないため、Electron の MAS ビルドを使用する必要があります。 しかし、"Developer ID Application" 証明書にはこの制限がないため、この証明書で署名されたアプリは Electron の通常ビルドと MAS ビルドのどちらでも使用できます。

#### 従来の証明書の名称

Apple は過去数年の間に証明書の名称を変更しており、古いドキュメントを読んでいると古い名称が出てくるかもしれません。一部のユーティリティも未だに古い名称を使用していることがあります。

* "Apple Distribution" 証明書は、"3rd Party Mac Developer Application" や "Mac App Distribution" という名称でもありました。
* "Apple Development" 証明書は、"Mac Developer" や "Development" という名称でもありました。

### プロビジョニングプロファイルの準備

Mac App Store へアプリを提出する前にローカルマシンでアプリをテストしたい場合は、アプリバンドルに埋め込まれたプロビジョニングプロファイル付きの "Apple Development" 証明書でアプリを署名する必要があります。

[プロビジョニングプロファイルの作成](https://help.apple.com/developer-account/#/devf2eb157f8) は、以下の手順を踏むとできます。

1. [Apple Developer](https://developer.apple.com/account) のウェブサイトで "Certificates, Identifiers & Profiles" のページを開きます。
2. "Identifiers" のページ内でアプリの App ID を新規追加します。
3. "Devices" のページでローカルのマシンを登録します。 お使いのマシンの "デバイス ID" は、"システム情報" アプリの "ハードウェア" のページで確認できます。
4. "Profiles" のページで新しいプロビジョニングプロファイルを登録し、`/path/to/yourapp.provisionprofile` へダウンロードします。

### Apple のアプリサンドボックスを有効にする

Mac App Store に提出したアプリは Apple の [App Sandbox][app-sandboxing] 下で実行する必要があり、Electron の MAS ビルドだけが App Sandbox で実行できます。 Electron の標準の darwin ビルドでは、App Sandbox で実行すると起動に失敗します。

`electron-osx-sign` でアプリを署名すると、必要なエンタイトルメントが自動追加されます。しかしカスタムエンタイトルメントを使用している場合は、App Sandbox の資格が追加されていることを確認する必要があります。

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

#### `electron-osx-sign` を使わない場合のさらなる手順

`electron-osx-sign` を使わずにアプリを署名する場合、アプリバンドルのエンタイトルメントが少なくとも以下のキーを持っていることを確認する必要があります。

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

`TEAM_ID` は Apple Developer アカウントの Team ID に、`your.bundle.id` はアプリの App ID に置き換えてください。

また、アプリのバンドル内のバイナリやヘルパーに以下のエンタイトルメントを追加する必要があります。

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

そしてアプリバンドルの `Info.plist` には、`ElectronTeamID` キーに Apple Developer アカウントの Team ID を値として含める必要があります。

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

`electron-osx-sign` を使用する場合は、証明書の名前から Team ID を抽出することで `ElectronTeamID` キーが自動追加されます。 `electron-osx-sign` が正しい Team ID を見つけられなかった場合は、このキーを手動で追加する必要があるでしょう。

### 開発用にアプリを署名する

開発マシン上で実行できるようにアプリを署名するには、"Apple Development" 証明書で署名し、そのプロビジョニングプロファイルを `electron-osx-sign` に渡す必要があります。

```bash
electron-osx-sign YourApp.app --identity='Apple Development' --provisioning-profile=/path/to/yourapp.provisionprofile
```

`electron-osx-sign` を使わずに署名する場合は、プロビジョニングプロファイルを `YourApp.app/Contents/embedded.provisionprofile` に配置する必要があります。

署名したアプリはプロビジョニングプロファイルによって登録されたマシン上でのみ実行可能です。これが Mac App Store に提出する前に署名したアプリをテストする唯一の方法です。

### Mac App Store へ提出するためにアプリを署名する

Mac App Store へ提出するアプリを署名するには、"Apple Distribution" 証明書で署名する必要があります。 注意として、この証明書で署名されたアプリは、Mac App Store からダウンロードしない限りどのマシンでも実行できません。

```bash
electron-osx-sign YourApp.app --identity='Apple Distribution'
```

### Mac App Store 以外で頒布するアプリケーションの署名

Mac App Store への申請の予定がない場合は、"Developer ID Application" 証明書で署名できます。 この方法では App Sandbox 上の要件はありません。App Sandbox を使用しない場合は、Electron の通常の darwin ビルドを使用してください。

```bash
electron-osx-sign YourApp.app --identity='Developer ID Application' --no-gatekeeper-assess
```

`--no-gatekeeper-assess` を指定すると、`electron-osx-sign` は macOS の GateKeeper の確認を飛ばします。通常この段階ではアプリはまだ公証されていません。

<!-- TODO(zcbenz): Add a chapter about App Notarization -->
このガイドでは、[App Notarization][app-notarization] については説明しません。しかし App Notarization を行っておかないと、ユーザーが Mac App Store 以外からのアプリを使用できないように Apple が阻害する可能性があるので、行っておいた方がよいでしょう。

## Mac App Store に提出する

"Apple Distribution" 証明書でアプリを署名すれば、Mac App Store に提出できます。

このガイドは、Apple がアプリを承認することを保証していません。Mac App Store の登録要件を満たすには、Apple の [アプリの提出][submitting-your-app] のガイドも読んでおくべきでしょう。

### アップロードする

手続きのために、Application Loader を使用して署名したアプリを iTunes Connect にアップロードする必要があります。アップロードする前に [レコードを作成した][create-record] ことを確認するようにしてください。

非公開 API の利用といったエラーが出る場合は、アプリが Electron の MAS ビルドを使用しているかどうかを確認するとよいでしょう。

### 審査に提出する

アップロードした後は、[アプリを審査に提出][submit-for-review] しましょう。

## MAS ビルドの制限

アプリのサンドボックス化ですべての要件を満たすために、MAS ビルドで以下のモジュールを無効にしてください。

* `crashReporter`
* `autoUpdater`

そして、以下の挙動が変化します。

* ビデオキャプチャーはいくつかのマシンで動作しないかもしれません。
* 一部のアクセシビリティ機能が動作しないことがあります。
* アプリはDNSの変更を認識しません。

サンドボックスが使用されるため、アプリがアクセスできるリソースは厳密に制限されています。詳細は [App Sandboxing][app-sandboxing] を参照してください。

### 追加のエンタイトルメント

アプリが使用する Electron API に応じて、アプリの entitlements ファイルに追加のエンタイトルメントが必要です。 さもなくば、App Sandbox がその使用を阻害することがあります。

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
[electron-osx-sign]: https://github.com/electron/electron-osx-sign
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[app-notarization]: https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
