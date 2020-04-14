# Electron技术支持

## 寻找技术支持

如果您有安全方面的问题，请参阅 [安全文档](https://github.com/electron/electron/tree/master/SECURITY.md)

如果你想获得编程方面的帮助、问题的答案亦或是想要加入Electron的开发者大家庭，您可以参考以下链接：
- [`electron`](https://discuss.atom.io/c/electron) 各种 Atom 论坛
- `#atom-shell` Freenode上的频道
- `#electron` [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)上的频道
- [`electron-ru`](https://telegram.me/electron_ru) *(俄语版)*
- [`electron-br`](https://electron-br.slack.com) *(巴西葡语版)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(韩语版)*
- [`electron-jp`](https://electron-jp.slack.com) *(日语版)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(土耳其语版)*
- [`electron-id`](https://electron-id.slack.com) *(印尼语版)*
- [`electron-pl`](https://electronpl.github.io) *(波兰语版)*

如果你有意为加入Electron的开发，可参阅[贡献文档](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)

如果你在Electron的[支持版](#supported-versions)中发现漏洞，请在[问题追踪](../development/issues.md)中提交你发现的漏洞。

[awesome-electron](https://github.com/sindresorhus/awesome-electron)是一个社区维护的示例程序列表。

## 支持版

最新的 3 个*稳定的*的版本受 Electron 团队支持。 例如，如果最新版本是 6.1.x，则包括 5.0.x和 4.2.x系列的同样会被支持  We only support the latest minor release for each stable release series.  This means that in the case of a security fix 6.1.x will receive the fix, but we will not release a new version of 6.0.x.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

When an API is changed or removed in a way that breaks existing functionality, the previous functionality will be supported for a minimum of two major versions when possible before being removed. For example, if a function takes three arguments, and that number is reduced to two in major version 10, the three-argument version would continue to work until, at minimum, major version 12. Past the minimum two-version threshold, we will attempt to support backwards compatibility beyond two versions until the maintainers feel the maintenance burden is too high to continue doing so.

### 当前支持的版本
- 8.1.x
- 7.1.x
- 6.1.x

### End-of-life

当一个发行分支达到了其支持周期的末尾，该序列将会在NPM中弃用，且会发布一个最终的“结束支持”版本。 这个版本将会添加一个警告以通知正在使用一个不受支持的Electron版本。

这些步骤是用于帮助应用开发者了解他们使用的分支不受支持，而不会过分打扰最终用户。

如果一个应用有特殊情况并需要保持使用一个不受支持的Electron版本，开发者可以通过忽略来自应用的`package.json` `devDependencies`的最终版本以关闭结束支持警告。 For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## 支持平台

目前 Electron 支持以下平台：

### macOS

对 macOS 仅提供64位版本，并且只支持 macOS 10.10 (Yosemite) 以及更高版本。

### Windows

仅支持 Windows 7 或更高版本, 旧版操作系统已不再支持(并且无法运行).

为Windows系统提供`ia32` (`x86`) 和 `x64` (`amd64`) 两种二进制版本。 [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

Electron 的 `ia32` (`i686`) 和 `x64` (`amd64`) 预编译版本均是在Ubuntu 12.04 下编译的，`arm` 版的二进制文件是在 ARM v7（硬浮点 ABI 与 Debian Wheezy 版本的 NEON）下完成的。

[Until the release of Electron 2.0](../breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. 两个二进制文件是相同的。

预编译版本是否能够正常运行，取决于其中是否包含了编译平台的链接库。所以只有 Ubuntu 12.04 是可以保证能正常运行的，并且以下平台也被证实可以正常运行 Electron 的预编译版本：

* Ubuntu 12.04 或更高版本
* Fedora 21
* Debian 8
