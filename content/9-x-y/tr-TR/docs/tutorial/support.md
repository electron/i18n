# Electron Support

## Finding Support

If you have a security concern, please see the [security document](https://github.com/electron/electron/tree/master/SECURITY.md).

If you're looking for programming help, for answers to questions, or to join in discussion with other developers who use Electron, you can interact with the community in these locations:
- [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
- `#atom-shell` channel on Freenode
- `#electron` channel on [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Russian)*
- [`electron-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Korean)*
- [`electron-jp`](https://electron-jp.slack.com) *(Japanese)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turkish)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
- [`electron-pl`](https://electronpl.github.io) *(Poland)*

If you'd like to contribute to Electron, see the [contributing document](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

If you've found a bug in a [supported version](#supported-versions) of Electron, please report it with the [issue tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) is a community-maintained list of useful example apps, tools and resources.

## Supported Versions

The latest three *stable* major versions are supported by the Electron team. For example, if the latest release is 6.x.y, then the 5.x.y as well as the 4.x.y series are supported.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

### Currently supported versions
- 8.x.y
- 7.x.y
- 6.x.y

### End-of-life

When a release branch reaches the end of its support cycle, the series will be deprecated in NPM and a final end-of-support release will be made. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## Desteklenen Platformlar

Electron tarafından desteklenen platformlar:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.10 (Yosemite).

### Windows

Windows 7 ve sonraki sürümleri desteklenir, eski işletim sistemleri desteklenmez (ve çalışmaz).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

Electron'un önceden hazırlanmış `ia32` (`i686`) ve `x64` (`amd64`) ikilileri Ubuntu 12.04 üzerine kurulmuştur, `armv7l` ikili ARM v7'e karşı hard-float ABI ve NEON Debian Wheezy için yapılmıştır.

[Until the release of Electron 2.0](../breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Önceden derlenmiş sürümün normal olarak çalışıp çalışamayacağı, derleme platformunun bağlantı kitaplığının eklenip eklenmediğine bağlıdır. Dolayısıyla yalnızca Ubuntu 12.04'ün çalışması garanti edilir ve aşağıdaki platformların Electron'un önceden derlenmiş sürümleriyle çalıştığı kanıtlanmıştır:

* Ubuntu 12.04 and newer
* Fedora 21
* Debian 8
