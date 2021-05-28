# Electron技术支持

## 寻找技术支持

如果您有安全方面的问题，请参阅 [安全文档](https://github.com/electron/electron/tree/master/SECURITY.md)

如果你想获得编程方面的帮助、问题的答案亦或是想要加入Electron的开发者大家庭，您可以参考以下链接：

* [`Electron's Discord`](https://discord.com/invite/electron) has channels for:
  * 寻求帮助
  * Ecosystem apps like [Electron Forge](https://github.com/electron-userland/electron-forge) and [Electron Fiddle](https://github.com/electron/fiddle)
  * Sharing ideas with other Electron app developers
  * 以及更多！
* [`electron`](https://discuss.atom.io/c/electron) 各种 Atom 论坛
* `#electron` [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)上的频道
* [`electron-ru`](https://telegram.me/electron_ru) *(俄语版)*
* [`electron-br`](https://electron-br.slack.com) *(巴西葡语版)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(韩语版)*
* [`electron-jp`](https://electron-jp.slack.com) *(日语版)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(土耳其语版)*
* [`electron-id`](https://electron-id.slack.com) *(印尼语版)*
* [`electron-pl`](https://electronpl.github.io) *(波兰语版)*

如果你有意为加入Electron的开发，可参阅[贡献文档](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)

如果你在Electron的[支持版](#supported-versions)中发现漏洞，请在[问题追踪](../development/issues.md)中提交你发现的漏洞。

[awesome-electron](https://github.com/sindresorhus/awesome-electron)是一个社区维护的示例程序列表。

## 支持版

最新的 3 个*稳定的*的版本受 Electron 团队支持。 例如，如果最新版本是 6.1.x，则包括 5.0.x和 4.2.x系列的同样会被支持  我们只支持每个稳定版本序列的最新次要版本 。  这意味着在安全修复的情况下 6.1。 我们将收到修复，但我们将不会释放一个新版本的6.0.x。

最新的稳定释放单方面从 `master`收到所有修正， 以及此前的版本将在时间和带宽条件下收到这些修复中的绝大多数 。 最早支持的发布线将直接获得 个安全修复。

所有支持的发布行将接受外部拉取请求到背港 修复先前合并到 `主`， 但这可能是某些较老的支助线路的个案 基础。 围绕发布 返回线的所有有争议的决定将由 [释放工作组](https://github.com/electron/governance/tree/master/wg-releases) 作为一个议程项目解决，在他们每周的会议上提出了返回线返回线问题。

当一个API的改动或移除会导致某个现有功能被破坏时，这个现有功能在被移除之前，仍然会在至少两个主要版本号内得到尽可能的支持。 比如，某个函数需要三个参数，而在主要版本10中，它被修改为需要两个参数，那么这个函数的三参数版本仍然会被支持，至少持续到主要版本12。 经过两个主要版本后，我们仍会尝试支持后向兼容，直到维护成本高得难以承受而无法继续支持。

### 当前支持的版本

* 13.x.y
* 12.x.y
* 11.x.y

### 服务终止

当一个发行分支达到了其支持周期的末尾，该序列将会在NPM中弃用，且会发布一个最终的“结束支持”版本。 这个版本将会添加一个警告以通知正在使用一个不受支持的Electron版本。

这些步骤是用于帮助应用开发者了解他们使用的分支不受支持，而不会过分打扰最终用户。

如果一个应用有特殊情况并需要保持使用一个不受支持的Electron版本，开发者可以通过忽略来自应用的`package.json` `devDependencies`的最终版本以关闭结束支持警告。 例如，自1-6-x 系列 结束以来，支持终点1.6。 8 次发布， 开发者可以选择 在 1-6-x 序列中停留，无需警告 `devDependency` of `"electron": 1。 0 - 1.6.17`

## 支持平台

目前 Electron 支持以下平台：

### macOS

对 macOS 仅提供64位版本，并且只支持 macOS 10.11 (El Capitan) 以及更高版本。

Electron 11.0.0 已原生支持 Apple Silicon (`arm64`) 设备。

### Windows

仅支持 Windows 7 或更高版本, 旧版操作系统已不再支持(并且无法运行).

为Windows系统提供`ia32` (`x86`) 和 `x64` (`amd64`) 两种二进制版本。 [Electron 6.0.8 已原生支持 Windows on Arm (`arm64`) 设备。](windows-arm.md) 可以使用 ia32 二进制程序打包前几个版本的应用程序。

### Linux

在 Ubuntu 18.04 上预构建的二进制文件。

预编译版本是否能够正常运行，取决于其中是否包含了编译平台的链接库。所以只有 Ubuntu 18.04 是可以保证能正常运行的，并且以下平台也被证实可以正常运行 Electron 的预编译版本：

* Ubuntu 14.04 或更高版本
* Fedora 24 或更高版本
* Debian 8 或更高版本
