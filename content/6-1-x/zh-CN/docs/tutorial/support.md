# Electron技术支持

## 寻找技术支持

如果你有安全方面的问题，请阅读 [安全文档](../../SECURITY.md)。

如果你想获得编程方面的帮助、问题的答案亦或是想要加入Electron的开发者大家庭，您可以参考以下链接：
- [`electron`](https://discuss.atom.io/c/electron) 各种 Atom 论坛
- `#atom-shell` Freenode上的频道
- [`Electron`](https://atom-slack.herokuapp.com) Atom's Slack上的频道
- [`electron-ru`](https://telegram.me/electron_ru) *(俄语版)*
- [`electron-br`](https://electron-br.slack.com) *(巴西葡语版)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(韩语版)*
- [`electron-jp`](https://electron-jp.slack.com) *(日语版)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(土耳其语版)*
- [`electron-id`](https://electron-id.slack.com) *(印尼语版)*
- [`electron-pl`](https://electronpl.github.io) *(波兰语版)*

如果你有意为加入Electron的开发，可参阅[贡献文档](../../CONTRIBUTING.md)

如果你在Electron的[支持版](#supported-versions)中发现漏洞，请在[问题追踪](../development/issues.md)中提交你发现的漏洞。

[awesome-electron](https://github.com/sindresorhus/awesome-electron)是一个社区维护的示例程序列表。

## 支持版

最新的 3 个主版本受 Electron 团队支持。 例如，如果最新的发布是 5.0.x，那么 4.x.y 系列会受支持。对于之前的两个发行系列 3.x.y 和 2.x.y 也是一样。

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

### 当前支持的版本
- 5.x
- 4.x
- 3.x

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

为Windows系统提供`ia32` (`x86`) 和 `x64` (`amd64`) 两种二进制版本。 如果在ARM版Windows上使用Electron的话调用ia32库就行了。

### Linux

Electron 的 `ia32` (`i686`) 和 `x64` (`amd64`) 预编译版本均是在Ubuntu 12.04 下编译的，`arm` 版的二进制文件是在 ARM v7（硬浮点 ABI 与 Debian Wheezy 版本的 NEON）下完成的。

[在Electron 2.0的发布之前](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets)，Electron 也会 继续用简单的` arm `后缀释放` armv7l `二进制文件。 两个二进制文件是相同的。

预编译版本是否能够正常运行，取决于其中是否包含了编译平台的链接库。所以只有 Ubuntu 12.04 是可以保证能正常运行的，并且以下平台也被证实可以正常运行 Electron 的预编译版本：

* Ubuntu 12.04 或更高版本
* Fedora 21
* Debian 8
