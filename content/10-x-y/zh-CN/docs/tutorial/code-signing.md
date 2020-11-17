# 代码签名

代码签名是一种用来证明应用是由你创建的一种安全技术。

macOS 系统能通过代码签名检测对app的任何修改，包括意外修改和来自恶意代码的修改。

在Windows上，系统给您的代码签名证书 指定信任等级，如果您没有，则给您指定信任等级。 或者如果您的信任等级很低，在用户开始使用您的应用程序时，将导致出现安全 对话框。  信任级别随着时间的推移构建 ，因此最好尽早开始代码签字。

即使开发者可以发布一个未签名的应用程序，但是我们并不建议这样做。 Windows 和 macOS 默认都会阻止下载或执行 未签名应用程序。 从 macOS Catalina (版本 10.15) 开始，用户 必须经过多个手动步骤才能打开未签名的应用程序。

![macOS Catalina Gatekeeper 警告：无法打开应用程序，因为
开发者无法验证](../images/gatekeeper.png)

如你所见，用户有两个选择：直接删除应用或者取消运行。 你不会想让用户看见该对话框。

如果你正在开发一款Electron应用，并打算将其打包发布，那你就应该为其添加代码签名。

# 正在签名 & 正在认证macOS 版本

正确准备 macOS 应用程序发布需要两个步骤：首先， 应用程序需要签名。 然后，应用程序需要上传到苹果，然后才能进行名为“公证”的 过程， 自动化系统将会进一步验证您的 应用没有做任何事情来危及其用户。

若要启动进程，请确保您满足签名要求并 认证您的应用：

1. 加入 [Apple Developer Program][](需要缴纳年费)
2. 下载并安装 [Xcode][] - 这需要运行macOS 的计算机。
3. 生成，下载，然后安装[签名证书（signing certificates）][]

Electron的生态系统有利于配置和自由，所以有多种方法 让您的应用程序签名和公证。

## `electron-forge`

如果您正在使用 Electron 的最喜欢的构建工具，让您的应用程序签名 并经过公证需要对您的配置进行一些添加。 [Forge](https://electronforge.io) 是官方的 Electron 工具的 集合，使用 [`电子包装器`][] [`electron-osx-signe`][] [`electronon-recentarization`][] under the lature.

让我们看看一个所有必需字段的示例配置。 并不是所有的 都是必需的：工具将非常聪明，可以自动找到 合适的 `身份`, 例如，但我们建议你明白无误。

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

此处引用的 `plist` 文件需要以下的 macOS 特定权限 来保证您的应用正在做这些事情的苹果安全机制 并不意味着任何伤害：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple/DTD PLIST 1.0//EN" "http://www. ple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llowjit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com。 ple.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

要查看所有这些都在操作中，请查看Electron Fiddle的源代码， [尤其是其 `electron-forge` 配置文件 ](https://github.com/electron/fiddle/blob/master/forge.config.js)。


## `electron-builder`

Electron Builder 带有一个自定义解决方案用于签署您的应用程序。 您 可以在这里找到 [它的文档](https://www.electron.build/code-signing)

## `electron-packager`

如果你没有使用像Forge或Builder这样的集成构建水道， 您 可能使用 [`electron-packer`][]其中包括 [`electron-osx-signe`][] [`electron-公证`][].

如果您正在使用Packager的 API，您可以通过配置 [来签名 并对您的 应用程序进行公证](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html)

```js
const packer = require('electron-packer')

packer(
  dir: '/path/to/my/app',
  osxSign: v.
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    '硬运行时间'：true，
    应享权利: '应享权利。 list',
    '应享权利-继承': '应享权利。 list',
    'signature-flags': 'library'
  },
  osxNotarize: }
    appleId: 'felix@felix. un',
    AppleIdPassword: 'my-apple-id-password'
  }
})
```

此处引用的 `plist` 文件需要以下的 macOS 特定权限 来保证您的应用正在做这些事情的苹果安全机制 并不意味着任何伤害：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple/DTD PLIST 1.0//EN" "http://www. ple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs. llowjit</key>
    <true/>
    <key>com.apple.security.cs. llow-unsigned-executable-memory</key>
    <true/>
    <key>com。 ple.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

See the [Mac App Store Guide][].

# 签署windows应用程序

在签署Windows应用程序前，你需要完成以下事项：

1. 获取一个 Windows 身份验证码签名证书 (需要年度费用)
2. 安装 Visual Studio 以获取签名工具 (免费 [社区 版](https://visualstudio.microsoft.com/vs/community/) 已足够)

您可以从许多转售商获得代码签名证书。 价格各异，所以 您的时间可能值得商店。 热门转销商包括：

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* 除其他外，请在附近商店找到适合您需要的商店，Google 是您的朋友:grinning_face_with_smiling_eyes：

你可以运用许多方式来签署你的应用：

- [`electron-winstaller`][] 将为窗口生成一个安装程序并为您签名
- [`electron-forge`][] 可以签署它通过 Squirel.Windows 或 MSI目标生成的安装程序。
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

参考 [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-signe`]: https://github.com/electron-userland/electron-osx-sign
[`电子包装器`]: https://github.com/electron/electron-packager
[`electron-packer`]: https://github.com/electron/electron-packager
[`electronon-recentarization`]: https://github.com/electron/electron-notarize
[`electron-公证`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[签名证书（signing certificates）]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
