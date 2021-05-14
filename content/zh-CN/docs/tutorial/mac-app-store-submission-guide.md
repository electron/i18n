# Mac App Store 应用程序提交指南

本指南提供以下相关资讯：

* 如何在 macOS 上为 Electron 应用签名；
* 如何在 Mac App Store (MAS) 上提交 Electron 应用；
* 对于 MAS 构建版本的局限性。

## 要求

要为 Electron 应用签名，则必须首先安装下列应用：

* Xcode 11 或更高版本。
* [electron-osx-sign][electron-osx-sign] npm 模块.

您还必须注册一个苹果开发者帐户，并加入 [苹果开发者计划][developer-program]。

## 为 Electron 应用签名

Electron应用可以通过 Mac 应用商店或其外部进行发布。 每种方式都需要不同的签名和测试方法。 本指南侧重于通过 Mac 应用商店进行发布，也会提及其他方法。

以下步骤描述了如何从 Apple 获得证书，如何对Electron应用程序进行签名以及如何测试它们。

### 获取证书

获得签名证书的最简单方法是使用 Xcode：

1. 打开Xcode并打开“帐户”首选项；
2. 使用您的 Apple 帐户登录;
3. 选择一个团队并单击"管理证书";
4. 在签名证书表的左下角，单击添加按钮 (+)，并添加以下证书：
   * "Apple Development"
   * "Apple Distribution"

“Apple Development”证书用于在Apple Developer网站上注册的计算机上签署用于开发和测试的应用程序。 注册方法会在[准备配置文件](#prepare-provisioning-profile)中描述。

带有"Apple Development"证书签名的应用无法提交到Mac 应用商店。 为此，应用程序必须使用"Apple Distribution"证书进行签名。 但请注意，使用"Apple Distribution"证书签名的应用程序不能直接运行，它们必须由 Apple 重新签名才能运行，也就是只有从 Mac 应用商店下载后才能运行。

#### 其它证书

您可以注意到还有其他类型的证书。

"Developer ID Application"证书用于将应用发布到Mac 应用商店以外的地方之前签名。

"Deceloper ID Installer"和"Mac Installer Distribution"证书用于签署 Mac 安装程序包，而不是应用程序本身。 大多数Electron应用不使用Mac Installer Package，因此通常不需要它们。

完整的证书类型列表可以在[这里](https://help.apple.com/xcode/mac/current/#/dev80c6204ec)找到。

使用 "Apple Development" 和 "Apple Distribution" 证书签名的应用程序只能在 [App Sandbox][app-sandboxing]下运行， 所以他们必须使用Electron 的 MAS 构建。 然而，“Developer ID Application”证书没有这个限制，因此，用其签名的应用既可以使用普通构建也可以使用 Electron 的 MAS 构建。

#### 传统证书名称

Apple在过去几年中一直在更改证书的名称，您可能会在阅读旧文档时遇到这些证书，并且一些工具仍然在使用旧名称。

* “Apple Distribution”证书也叫做“3rd Party Mac Developer Application”和“Mac App Distribution”。
* “Apple Development”证书也叫做“Mac Developer”和“Development”。

### 准备配置配置文件

如果您想在将应用提交给Mac App Store之前在本地机器上测试您的应用， 您必须使用"Apple Development"证书签名该应用，并在程序包中嵌入配置文件。

要 [创建一个配置文件](https://help.apple.com/developer-account/#/devf2eb157f8)，您可以按照以下步骤：

1. 在 [Apple Developer](https://developer.apple.com/account) 网站上打开"证书、标识符 & 配置文件"页面。
2. 在“标识符”页面为您的应用添加一个新的App ID。
3. 在"设备"页面中注册本地计算机。 您可以在"系统信息"应用的"硬件"页面中找到机器的"设备 ID"。
4. 在“Profiles”页面注册一个新的配置文件，然后下载到 `/path/to/yourapp.provisionfile`。

### 启用Apple的应用沙箱

提交到 Mac App Store 的应用程序必须在 Apple [App Sandbox][app-sandboxing]下运行， 并且只有Electron的 MAS 构建可以使用App Sandbox 运行。 在 App Sandbox 下运行时，Electron 的标准 darwin 构建将无法启动。

使用 `electron-osx-signe`签名时，它将会自动将必要的权限添加到您应用的所需权利中， 但如果您正在使用自定义所需权利，您必须确保App Sandbox capacity已经添加：

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

#### 不使用 `electron-osx-sign`的额外步骤

如果您的应用没有使用 `electron-osx-signe` 进行签名，您必须确保应用包的权限至少有以下键：

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

`TEAM_ID` 应替换为 Apple 开发者帐户的Team ID，`your.bundle.id` 应替换为应用的App ID。

以下权限必须添加到应用程序包的二进制程序和助手中：

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

应用程序包的 `Info.plist` 必须包含 `ElectronTeamID` 键，其值为你的 Apple 开发者团队ID：

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

当使用 `electron-osx-signing` 时， `ElectronTeamID` 键将通过从证书名称提取团队 ID 自动添加。 如果`electron-osx-sign`找不到正确的团队 ID，则可能需要你手动添加此键 。

### Sign apps for development

To sign an app that can run on your development machine, you must sign it with the "Apple Development" certificate and pass the provisioning profile to `electron-osx-sign`.

```bash
electron-osx-sign YourApp.app --identity='Apple Development' --provisioning-profile=/path/to/yourapp.provisionprofile
```

If you are signing without `electron-osx-sign`, you must place the provisioning profile to `YourApp.app/Contents/embedded.provisionprofile`.

The signed app can only run on the machines that registered by the provisioning profile, and this is the only way to test the signed app before submitting to Mac App Store.

### Sign apps for submitting to the Mac App Store

To sign an app that will be submitted to Mac App Store, you must sign it with the "Apple Distribution" certificate. Note that apps signed with this certificate will not run anywhere, unless it is downloaded from Mac App Store.

```bash
electron-osx-sign YourApp.app --identity='Apple Distribution'
```

### Sign apps for distribution outside the Mac App Store

If you don't plan to submit the app to Mac App Store, you can sign it the "Developer ID Application" certificate. In this way there is no requirement on App Sandbox, and you should use the normal darwin build of Electron if you don't use App Sandbox.

```bash
electron-osx-sign YourApp.app --identity='Developer ID Application' --no-gatekeeper-assess
```

By passing `--no-gatekeeper-assess`, the `electron-osx-sign` will skip the macOS GateKeeper check as your app usually has not been notarized yet by this step.

<!-- TODO(zcbenz): Add a chapter about App Notarization -->
This guide does not cover [App Notarization][app-notarization], but you might want to do it otherwise Apple may prevent users from using your app outside Mac App Store.

## Submit Apps to the Mac App Store

After signing the app with the "Apple Distribution" certificate, you can continue to submit it to Mac App Store.

However, this guide do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App][submitting-your-app] guide on how to meet the Mac App Store requirements.

### Upload

The Application Loader should be used to upload the signed app to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

If you are seeing errors like private APIs uses, you should check if the app is using the MAS build of Electron.

### Submit for review

After uploading, you should [submit your app for review][submit-for-review].

## MAS 构建限制

为了让你的应用满足沙箱的所有条件，在 MAS 构建的时候，下面的模块已被禁用：

* `crashReporter`
* `autoUpdater`

并且下面的行为也改变了:

* 一些视频采集功能无效。
* 某些辅助功能无法访问。
* 应用无法检测 DNS 变化。

此外，由于应用沙盒的使用，应用程序可以访问的资源受到严格限制；您可以阅读 [应用沙盒][app-sandboxing] ，了解更多信息。

### Additional entitlements

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your app's entitlements file. Otherwise, the App Sandbox may prevent you from using them.

#### Network access

启用传出的网络连接，允许你的应用程序连接到服务器：

```xml
<key>com.apple.security.network.client</key>
<true/>
```

启用传入的网络连接，让你的应用程序打开网络 socket 监听：

```xml
<key>com.apple.security.network.server</key>
<true/>
```

有关更多 详细信息，请参阅[启用网络访问文档][network-access]。

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

有关更多详细信息，请参阅["启用访问用户选择的文件"文档][user-selected]。

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

有关更多详细信息，请参阅["启用访问用户选择的文件"文档][user-selected]。

## Electron 使用的加密算法

根据你发布应用所在的国家或地区，你可能需要提供您软件使用的加密算法的信息。 更多信息，请参阅[ 加密导出合规性文档 ][export-compliance]。

Electron 使用下列加密算法：

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
