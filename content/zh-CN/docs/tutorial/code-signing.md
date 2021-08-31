# 代码签名

代码签名是一种用来证明应用是由你创建的一种安全技术。

macOS 系统能通过代码签名检测对app的任何修改，包括意外修改和来自恶意代码的修改。

On Windows, the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low, will cause security dialogs to appear when users start using your application.  信任级别随着时间的推移构建，因此最好尽早开始代码签名。

即使开发者可以发布一个未签名的应用程序，但是我们并不建议这样做。 Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Starting with macOS Catalina (version 10.15), users have to go through multiple manual steps to open unsigned applications.

![macOS Catalina Gatekeeper 警告：无法打开应用程序，因为开发者无法验证](../images/gatekeeper.png)

如你所见，用户有两个选择：直接删除应用或者取消运行。 你不会想让用户看见该对话框。

如果你正在开发一款Electron应用，并打算将其打包发布，那你就应该为其添加代码签名。

# 签名 & 认证 macOS 版本

正确准备 macOS 应用程序的发布需要两个步骤：首先，应用程序需要签名。 然后，应用程序需要上传到苹果，然后才能进行名为“公证”的过程， 自动化系统将会进一步验证您的应用没有做任何事情来危及其用户。

To start the process, ensure that you fulfill the requirements for signing and notarizing your app:

1. 加入 [Apple Developer Program][](需要缴纳年费)
2. 下载并安装 [Xcode][] - 这需要一台运行 macOS 的计算机。
3. 生成，下载，然后安装[签名证书（signing certificates）][]

Electron 的生态系统有利于配置和自由，所以有多种方法让您的应用程序签名和公证。

## `electron-forge`

If you're using Electron's favorite build tool, getting your application signed and notarized requires a few additions to your configuration. [Forge](https://electronforge.io) 是官方的 Electron 工具的 集合，在hood下使用 [`electron-packager`][] [`electron-osx-sign`][] [`electron-notarize`][] 。

Let's take a look at an example configuration with all required fields. 并不是所有都是必需的：工具非常聪明足以自动找到合适的 `identity`, 例如，但我们建议你明白无误。

```json
{
  "name": "my-app",
  "version": "0.0.1",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix.fun",
          "appleIdPassword": "my-apple-id-password",
        }
      }
    }
  }
}
```

此处引用的 `plist` 文件需要以下的 macOS 特定权限来保证您的应用正在做这些事情的苹果安全机制并不意味着任何伤害：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

要查看所有这些都在操作中，请查看 Electron Fiddle 的源代码，[尤其是其 `electron-forge` 配置文件](https://github.com/electron/fiddle/blob/master/forge.config.js)。

如果您打算在应用中使用 Electron 的 API 访问麦克风或摄像头，您还需要添加以下权限：

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

If these are not present in your app's entitlements when you invoke, for example:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Your app may crash. 在 [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) 中查看资源访问部分以获取更多信息和您可能需要的权限。

## `electron-builder`

Electron Builder comes with a custom solution for signing your application. 你可以在这里找到 [它的文档](https://www.electron.build/code-signing)

## `electron-packager`

If you're not using an integrated build pipeline like Forge or Builder, you are likely using [`electron-packager`][], which includes [`electron-osx-sign`][] and [`electron-notarize`][].

如果您正在使用Packager的 API，您可以通过配置 [来签名并对您的应用程序进行公证](https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html)

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hardened-runtime': true,
    entitlements: 'entitlements.plist',
    'entitlements-inherit': 'entitlements.plist',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix.fun',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

此处引用的 `plist` 文件需要以下的 macOS 特定权限来保证您的应用正在做这些事情的苹果安全机制并不意味着任何伤害：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac 应用程序商店

See the [Mac App Store Guide][].

# 签署windows应用程序

在签署Windows应用程序前，你需要完成以下事项：

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. 安装 Visual Studio 以获取签名工具 (免费 [社区版](https://visualstudio.microsoft.com/vs/community/) 已足够)

You can get a code signing certificate from a lot of resellers. 价格各异，所以值得你花点时间去货比三家。 Popular resellers include:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* 除其他外，请货比三家后选择适合你的那一款，Google 是您的朋友😄：

你可以运用许多方式来签署你的应用：

* [`electron-winstaller`][] will generate an installer for windows and sign it for you
* [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
* [`electron-builder`][] can sign some of its windows targets

## Windows 应用商店

See the [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[签名证书（signing certificates）]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
