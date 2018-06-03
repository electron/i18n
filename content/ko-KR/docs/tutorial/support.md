# Electron Support

## Finding Support

보안 문제가 있다면, [security document](../../SECURITY.md)를 참조하세요.

프로그래밍 도움말, 질문에 대한 답변 또는 Electron을 사용하는 다른 개발자와 토론에 참여하려는 경우, 다음 위치에서 커뮤니티와 상호 작용할 수 있습니다.

* [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
* `#atom-shell` channel on Freenode
* [`Electron`](https://atom-slack.herokuapp.com) channel on Atom's Slack
* [`electron-ru`](https://telegram.me/electron_ru) *(Russian)*
* [`electron-br`](https://electron-br.slack.com) *(Brazilian Portuguese)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Korean)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japanese)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turkish)*
* [`electron-id`](https://electron-id.slack.com) *(Indonesia)*
* [`electron-pl`](https://electronpl.github.io) *(Poland)*

Electron에 공헌하고 싶다면, [contributing document](../../CONTRIBUTING.md)를 보십시오.

[supported version](#supported-versions) Electron에서 버그를 발견 한다면, [issue tracker](../development/issues.md)에 보고해 주세요.

[awesome-electron](https://github.com/sindresorhus/awesome-electron)은 커뮤니티에서 관리되는 유용한 예제 앱, 도구 및 리소스 목록입니다.

## 지원되는 버전

최신 3 개의 release branches은 Electron 팀에서 지원합니다. 예를 들어, 최신 릴리스가 2.0.x 인 경우 2-0-x 시리즈가 지원되며, 두 개의 이전 릴리스 시리즈 1-7-x 및 1-8-x도 지원됩니다.

Release branch에서 지원주기가 끝나면, 이 시리즈는 NPM에서 더이상 사용되지 않게 설정되며, 최종 지원 배포가 만들어질 것 입니다. 이 릴리스에서는 지원되지 않는 버전의 Electron이 사용 중임을 알리는 경고가 추가됩니다.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

## 지원되는 플랫폼

Following platforms are supported by Electron:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.9.

### Windows

Windows 7 and later are supported, older operating systems are not supported (and do not work).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and newer
* Fedora 21
* Debian 8