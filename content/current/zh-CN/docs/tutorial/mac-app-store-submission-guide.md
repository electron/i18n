# Mac App Store 应用程序提交指南

自从 v0.34.0，Electron 就允许提交应用包到 Mac App Store (MAS)。这个向导提供的信息有: 如何提交应用和 MAS 构建的限制。

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program](https://developer.apple.com/support/compare-memberships/), which costs money.

## 如何提交你的应用

下面步骤介绍了一个简单的提交应用到商店方法。 然而，这些步骤不能保证你的应用被 Apple 接受；你仍然需要阅读 Apple 的 [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) 关于如何满足 Mac App Store 要求的向导。

### 获得证书

为了提交应用到商店，首先需要从 Apple 获得一个证书 可以参照 [现有的指南](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps)。

### 获得 Team ID

在软件签名之前，你需要知道开发者账户的 Team ID 查看 Team ID，登录[ Apple Developer Center](https://developer.apple.com/account/) 并点击侧边栏的 Membership。 你可以在团队名称下面的 Membership Information 部分查看到 Team ID。

### 软件签名

获得证书之后，你可以使用 [应用部署](application-distribution.md) 打包你的应用，之后进行提交。

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

之后，你需要准备2个授权文件。

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

请注意上述 `TEAM_ID` 对应开发者账户的 Team ID，`your.bundle.id` 对应软件打包时使用的 Bundle ID。

然后使用下面的脚本签名你的应用：

```sh
#!/bin/bash

# 你的应用名称
APP="YourApp"
# 要签名的应用路径
APP_PATH="/path/to/YourApp.app"
# 生成安装包路径
RESULT_PATH="~/Desktop/$APP.pkg"
# 开发者应用签名证书
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# 授权文件路径
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

如果你是 macOS 下的应用沙箱使用新手，应当仔细阅读 Apple 的 [Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) 了解一些基础，然后在授权文件内添加你的应用需要的许可。

除了手动签名你的应用，你也可以选择使用 [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) 模块来做这项工作。

#### 原生模块签名

应用程序中的原生模块也需要签署。如果使用 electron-osx-sign，确保已生成二进制文件的路径包含在 参数列表：

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

还要注意，原生模块可能产生的中间文件 不包括在内(因为它们也需要签署)。 如果你使用 [electron-packager](https://github.com/electron/electron-packager) 8.1.0 之前的版本，在构建步骤中添加 `--ignore=.+\.o$` 以忽略这些文件。 Versions 8.1.0 and later ignore those files by default.

### 上传你的应用

在签名应用之后，你可以使用 Application Loader 上传软件到 iTunes Connect 进行处理。请确保在上传之前你已经 [创建应用记录](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html)。

### 检查并提交你的应用

最后, 你可以 [检查并提交你的应用](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html)。

## MAS 构建限制

为了让你的应用满足沙箱的所有条件，在 MAS 构建的时候，下面的模块已被禁用：

* `crashReporter`
* `autoUpdater`

并且下面的行为也改变了:

* 一些视频采集功能无效。
* 某些辅助功能无法访问。
* 应用无法检测 DNS 变化。

也由于应用沙箱的使用方法，应用可以访问的资源被严格限制了；阅读更多信息[ App Sandboxing](https://developer.apple.com/app-sandboxing/)。

### 附加授权

根据应用使用的 Electron API，你可能需要添加附加授权 在 `parent.plist` 文件，在 Mac App Store 发布应用程序的时候能够使用这些API。

#### 网络访问

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

详情查看 [Enabling Network Access documentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9).

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

详情查看 [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6).

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

详情查看 [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6).

## Electron 使用的加密算法

Depending on the countries in which you are releasing your app, you may be required to provide information on the cryptographic algorithms used in your software. See the [encryption export compliance docs](https://help.apple.com/app-store-connect/#/devc3f64248f) for more information.

Electron 使用下列加密算法：

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)