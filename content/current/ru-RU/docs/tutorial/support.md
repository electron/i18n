# Поддержка Electron

## Поиск поддержки

If you have a security concern, please see the [security document](https://github.com/electron/electron/tree/master/SECURITY.md).

Если вы ищете помощь в программировании, для ответов на вопросы, или присоединиться к обсуждению с другими разработчиками, которые используют Electron, вы можете взаимодействовать с сообществом в этих местах:
- [`electron`](https://discuss.atom.io/c/electron) категория на Atom форумы
- `#atom-shell` канал на Freenode
- `#electron` канал на [Atom Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Русский)*
- [`electron-br`](https://electron-br.slack.com) *(Бразильский Португальский)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Корейский)*
- [`electron-jp`](https://electron-jp.slack.com) *(Японский)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Турецкий)*
- [`electron-id`](https://electron-id.slack.com) *(Индонезия)*
- [`electron-pl`](https://electronpl.github.io) *(Польша)*

If you'd like to contribute to Electron, see the [contributing document](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Если вы обнаружили ошибку в [поддерживаемой версии](#supported-versions) Electron, сообщите об этом [issue tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) is a community-maintained list of useful example apps, tools and resources.

## Поддерживаемые версии

The latest three *stable* major versions are supported by the Electron team. For example, if the latest release is 6.1.x, then the 5.0.x as well as the 4.2.x series are supported.  We only support the latest minor release for each stable release series.  This means that in the case of a security fix 6.1.x will receive the fix, but we will not release a new version of 6.0.x.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

When an API is changed or removed in a way that breaks existing functionality, the previous functionality will be supported for a minimum of two major versions when possible before being removed. For example, if a function takes three arguments, and that number is reduced to two in major version 10, the three-argument version would continue to work until, at minimum, major version 12. Past the minimum two-version threshold, we will attempt to support backwards compatibility beyond two versions until the maintainers feel the maintenance burden is too high to continue doing so.

### Currently supported versions
- 8.1.x
- 7.1.x
- 6.1.x

### End-of-life

When a release branch reaches the end of its support cycle, the series will be deprecated in NPM and a final end-of-support release will be made. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## Поддерживаемые платформы

Следующие платформы поддерживаются Electron:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.10 (Yosemite).

### Windows

Поддерживаются Windows 7 и более поздние версии, более старые операционные системы не поддерживаются (и не работают).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

Предварительные сборки `ia32` (`i686`) и `x64` (`amd64`) Electron основаны на Ubuntu 12.04, сборка `armv7l` собрана против ARM v7 с прошитым ABI и NEON для Debian Wheezy.

[Until the release of Electron 2.0](../breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Будет ли готовая бинарная сборка включена в дистрибутив, зависит от того, включает ли дистрибутив библиотеки, с которыми связан Electron на компилирруемой платформе, поэтому гарантируется работа только в Ubuntu 12.04, но следующие платформы также проверяются, чтобы иметь возможность запускать прекомпилированные сборки Electron:

* Ubuntu 12.04 и новее
* Fedora 21
* Debian 8
