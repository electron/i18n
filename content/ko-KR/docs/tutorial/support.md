# Electron Support

## Finding Support

보안 문제가 있다면, [security document](../../SECURITY.md)를 참조하세요.

프로그래밍 도움말, 질문에 대한 답변 또는 Electron을 사용하는 다른 개발자와 토론에 참여하려는 경우, 다음 위치에서 커뮤니티와 상호 작용할 수 있습니다.

* [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
* `#atom-shell` channel on Freenode
* `#electron` channel on [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
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

The latest three *stable* major versions are supported by the Electron team. For example, if the latest release is 6.x.y, then the 5.x.y as well as the 4.x.y series are supported.

The latest stable release unilaterally receives all fixes from `master`, and the version prior to that receives the vast majority of those fixes as time and bandwidth warrants. The oldest supported release line will receive only security fixes directly.

All supported release lines will accept external pull requests to backport fixes previously merged to `master`, though this may be on a case-by-case basis for some older supported lines. All contested decisions around release line backports will be resolved by the [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) as an agenda item at their weekly meeting the week the backport PR is raised.

### Currently supported versions

* 7.x.y
* 6.x.y
* 5.x.y

### End-of-life

Release branch에서 지원주기가 끝나면, 이 시리즈는 NPM에서 더이상 사용되지 않게 설정되며, 최종 지원 배포가 만들어질 것 입니다. 이 릴리스에서는 지원되지 않는 버전의 Electron이 사용 중임을 알리는 경고가 추가됩니다.

이 단계는 최종 사용자에게 과도하게 관여하지 않으면서, 앱 개발자가 사용하는 branch가 지원되지 않을 때 이를 알 수 있도록 도와줍니다.

만약 애플리케이션이 예외적인 상황으로 지원되지 않는 Electron에 버전에 머무를 필요가있는 경우, 개발자는 애플리케이션의 `package.json` `devDependencies`에서 최종 릴리스를 생략하여 지원 종료 경고(end-of-support warning)를 없앨 수 있습니다. 예를 들어, 1-6-x 시리즈는 1.6.18의 지원 종료로 종료 되었으므로, 개발자는 `devDependency`를 `"electron": 1.6.0 - 1.6.17`로 설정하여 경고 없이 1-6-x 시리즈에 머물도록 선택할 수 있습니다.

## 지원되는 플랫폼

Electron이 지원하는 플랫폼은 다음과 같습니다:

### macOS

MacOS에는 64 비트 바이너리만 제공되며, 최소 버전은 macOS 10.10입니다).

### Windows

Windows 7 이상을 지원하며, 이전 버전의 Os는 지원하지 않습니다(그리고 동작하지 않음).

32비트 `ia32` (`x86`) 와 64비트 `x64` (`amd64`) 바이너리가 둘다 제공됩니다. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

Prebuilt `ia32` (`i686`) 과 `x64` (`amd64`) Electron 바이너리는 Ubuntu 12.04에서 빌드 되었으며, `armv7l`바이너리는 hard-float ABI가 있는 ARM v7 및 Debian Wheezy의 NEON 용으로 제작되었습니다.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

사전 빌드 된 바이너리가 배포판에서 실행될 수 있는지 여부는 배포판에 Electron이 빌드중인 플랫폼에서 링크된 라이브러리가 포함되어 있는지 여부에 따라 달라지므로, Ubuntu 12.04에서 작동하도록 보장될 뿐만 아니라, 다음 플랫폼 또한 Electron의 사전 작성된 바이너리를 실행할 수 있음을 검증했습니다:

* Ubuntu 12.04 and newer
* Fedora 21
* Debian 8