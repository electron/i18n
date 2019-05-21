# Поддержка Electron

## Поиск поддержки

Если у вас есть проблема с безопасностью, смотрите [документ безопасности](../../SECURITY.md).

Если вы ищете помощь в программировании, для ответов на вопросы, или присоединиться к обсуждению с другими разработчиками, которые используют Electron, вы можете взаимодействовать с сообществом в этих местах:

* [`electron`](https://discuss.atom.io/c/electron) категория на Atom форумы
* `#atom-shell` канал на Freenode
* [`Electron`](https://atom-slack.herokuapp.com) канал на Atom's Slack
* [`electron-ru`](https://telegram.me/electron_ru) *(Русский)*
* [`electron-br`](https://electron-br.slack.com) *(Бразильский Португальский)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Корейский)*
* [`electron-jp`](https://electron-jp.slack.com) *(Японский)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Турецкий)*
* [`electron-id`](https://electron-id.slack.com) *(Индонезия)*
* [`electron-pl`](https://electronpl.github.io) *(Польша)*

Если вы хотите внести свой вклад в Electron, смотрите [документ](../../CONTRIBUTING.md).

Если вы обнаружили ошибку в [поддерживаемой версии](#supported-versions) Electron, сообщите об этом [issue tracker](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) is a community-maintained list of useful example apps, tools and resources.

## Поддерживаемые версии

The latest three major versions are supported by the Electron team. For example, if the latest release is 5.0.x, then the 4.x.y series is supported, as are the two previous release series 3.x.y and 2.x.y.

### Currently supported versions

* 5.x
* 4.x
* 3.x

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

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### Linux

Предварительные сборки `ia32` (`i686`) и `x64` (`amd64`) Electron основаны на Ubuntu 12.04, сборка `armv7l` собрана против ARM v7 с прошитым ABI и NEON для Debian Wheezy.

[До релиза Electron 2.0](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron также будет продолжать выпуск бинаркой сборки `armv7l` с простым `arm` суффиксом. Both binaries are identical.

Будет ли готовая бинарная сборка включена в дистрибутив, зависит от того, включает ли дистрибутив библиотеки, с которыми связан Electron на компилирруемой платформе, поэтому гарантируется работа только в Ubuntu 12.04, но следующие платформы также проверяются, чтобы иметь возможность запускать прекомпилированные сборки Electron:

* Ubuntu 12.04 и новее
* Fedora 21
* Debian 8