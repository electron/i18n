# Electron 지원

## 지원 찾기

보안 문제가 있다면, [security document](../../SECURITY.md)를 참조하세요.

프로그래밍 도움말, 질문에 대한 답변 또는 Electron을 사용하는 다른 개발자와 토론에 참여하려는 경우, 다음 위치에서 커뮤니티와 상호 작용할 수 있습니다.
- Atom 포럼의 [`electron`](https://discuss.atom.io/c/electron) 카테고리
- Freenode의 `#atom-shell` 채널
- [`Electron`](https://atom-slack.herokuapp.com) channel on Atom's Slack
- [`electron-ru`](https://telegram.me/electron_ru) *(러시아어)*
- [`electron-br`](https://electron-br.slack.com) *(브라질 포르투갈어)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(한국어)*
- [`electron-jp`](https://electron-jp.slack.com) *(일본어)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(터키어)*
- [`electron-id`](https://electron-id.slack.com) *(인도네시아어)*
- [`electron-pl`](https://electronpl.github.io) *(폴란드어)*

Electron에 공헌하고 싶다면, [contributing document](../../CONTRIBUTING.md)를 보십시오.

[supported version](#supported-versions) Electron에서 버그를 발견 한다면, [issue tracker](../development/issues.md)에 보고해 주세요.

[awesome-electron](https://github.com/sindresorhus/awesome-electron)은 커뮤니티에서 관리되는 유용한 예제 앱, 도구 및 리소스 목록입니다.

## 지원되는 버전

The latest three major versions are supported by the Electron team. For example, if the latest release is 5.0.x, then the 4.x.y series is supported, as are the two previous release series 3.x.y and 2.x.y.

마지막 안정화 릴리스는 `master`에서 모든 수정사항을 일방적으로 받고 있으며, 그 이전 버전은 대부분의 수정 사항을 시간 및 대역폭 보증으로 받습니다. 가장 오래된 지원 릴리스 라인은 보안 수정사항만 직접 받습니다.

지원되는 모든 릴리스 라인은 이전에 `master`에 병합된 수정 사항을 백포트하기 위한 외부 pull request를 수락하지만, 이는 일부 이전 지원되는 라인의 경우 사례에 따라 다를 수 있습니다. 릴리스 라인 백 포트와 관련된 모든 결정은 [릴리즈 워킹 그룹](https://github.com/electron/governance/tree/master/wg-releases)에 의해 백포트 PR이 제기되는 주별 회의에서 의제 항목으로 해결됩니다.

### 현재 지원되는 버전
- 5.x
- 4.x
- 3.x

### 생애 종료

Release branch에서 지원주기가 끝나면, 이 시리즈는 NPM에서 더이상 사용되지 않게 설정되며, 최종 지원 배포가 만들어질 것 입니다. 이 릴리스에서는 지원되지 않는 버전의 Electron이 사용 중임을 알리는 경고가 추가됩니다.

이 단계는 최종 사용자에게 과도하게 관여하지 않으면서, 앱 개발자가 사용하는 branch가 지원되지 않을 때 이를 알 수 있도록 도와줍니다.

만약 애플리케이션이 예외적인 상황으로 지원되지 않는 Electron에 버전에 머무를 필요가있는 경우, 개발자는 애플리케이션의 `package.json` `devDependencies`에서 최종 릴리스를 생략하여 지원 종료 경고(end-of-support warning)를 없앨 수 있습니다. 예를 들어, 1-6-x 시리즈는 1.6.18의 지원 종료로 종료 되었으므로, 개발자는 `devDependency`를 `"electron": 1.6.0 - 1.6.17`로 설정하여 경고 없이 1-6-x 시리즈에 머물도록 선택할 수 있습니다.

## 지원되는 플랫폼

Electron이 지원하는 플랫폼은 다음과 같습니다:

### macOS

MacOS에는 64 비트 바이너리만 제공되며, 최소 버전은 macOS 10.10입니다).

### Windows

Windows 7 이상을 지원하며, 이전 버전의 Os는 지원하지 않습니다(그리고 동작하지 않음).

32비트 `ia32` (`x86`) 와 64비트 `x64` (`amd64`) 바이너리가 둘다 제공됩니다. Electron 애플리케이션을 ia32 바이너리를 사용해 ARM 기반 윈도우에서 실행하는 것이 가능합니다.

### Linux

Prebuilt `ia32` (`i686`) 과 `x64` (`amd64`) Electron 바이너리는 Ubuntu 12.04에서 빌드 되었으며, `armv7l`바이너리는 hard-float ABI가 있는 ARM v7 및 Debian Wheezy의 NEON 용으로 제작되었습니다.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. 두 바이너리는 동일합니다.

사전 빌드 된 바이너리가 배포판에서 실행될 수 있는지 여부는 배포판에 Electron이 빌드중인 플랫폼에서 링크된 라이브러리가 포함되어 있는지 여부에 따라 달라지므로, Ubuntu 12.04에서 작동하도록 보장될 뿐만 아니라, 다음 플랫폼 또한 Electron의 사전 작성된 바이너리를 실행할 수 있음을 검증했습니다:

* Ubuntu 12.04 이후
* Fedora 21
* Debian 8
