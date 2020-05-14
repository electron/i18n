# 소스 코드 디렉토리 구조

Electron의 소스 코드는 몇 개의 파트로 분리되어 있습니다. 그리고 Chromium의 분리 규칙(separation conventions) 을 주로 따르고 있습니다.

이미 [Chromium의 멀티 프로세스 아키텍쳐](https://dev.chromium.org/developers/design-documents/multi-process-architecture)에 익숙해져 있다면 소스 코드를 이해하기 쉬울 것입니다.

## 소스 코드 구조

```diff
Electron
├── build/ - GN으로 빌드하는데 필요한 빌드 구성 파일
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron 문서
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - 문서에 사용되는 이미지
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript 소스 코드
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   ├── remote/ - Logic that handes use of the remote module in
|   |   |             the main process.
|   |   └── web-view/ - Logic that handles the use of webviews in the
|   |                   renderer process.
|   ├── sandboxed_renderer/ - Logic that handles creation of sandboxed renderer
|   |   |                     processes.
|   |   └── api/ - API implementation for sandboxed renderer processes.
|   └── worker/ - Logic that handles proper functionality of Node.js
|                 environments in Web Workers.
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Google의 OpenSSL 포크인 BoringSSL에 적용된 패치.
|   ├── chromium/ - Chromium에 적용된 패치
|   ├── node/ - Node.js 기반에 적용된 패치
|   └── v8/ - Google V8 엔진 기반에 적용된 패치
├── shell/ - C++ 소스 코드
|   ├── app/ - 시스템 엔트리 코드.
|   ├── browser/ - 메인 윈도우, UI, 메인 프로세스의 모든 것을 포함한
|   |   |          프론트엔드. This talks to the renderer to manage web
|   |   |          pages.
|   |   ├── ui/ - 서로 다른 플랫폼에 대한 UI 관련 구현 코드.
|   |   |   ├── cocoa/ - Cocoa 특정 소스 코드.
|   |   |   ├── win/ - Windows GUI 특정 소스 코드.
|   |   |   └── x/ - X11 특정 소스 코드.
|   |   ├── api/ - 메인 프로세스 API의 구현.
|   |   ├── net/ - 네트워킹 관련 코드.
|   |   ├── mac/ - Mac 특정 Objective-C 소스 코드.
|   |   └── resources/ - 아이콘들, 플랫폼 의존성 파일들, 기타 등등..
|   |   └── resources/ - 아이콘들, 플랫폼 의존성 파일들, 기타 등등..
|   |   └── api/ - 렌더러 프로세스 API의 구현.
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Electron의 빌드 규칙.
```

## 그외 디렉터리 구조

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - 배포용 바이너리를 빌드할 때 사용하는 script/create-dist.py 스크립트로부터 만들어지는 임시 디렉터리.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.
* **node_modules** - 빌드에 사용되는 node 서드파티 모듈.
* **npm** - Logic for installation of Electron via npm.
* **out** - ninja의 임시 출력 디렉터리.
* **script** - 개발목적으로 사용되는 빌드, 패키징, 테스트, 기타등을 실행하는 스크립트.
```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```
* **tools** - Helper scripts used by GN files.
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

## Git 서브 모듈 최신 버전으로 유지

Electron 저장소는 몇 가지 외부 벤더 의존성을 가지고 있으며 [/vendor](https://github.com/electron/electron/tree/master/vendor) 디렉터리에서 확인할 수 있습니다. 때때로 `git status`를 실행했을 때 아마 다음과 같은 메시지를 흔히 목격할 것입니다:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

이 외부 의존성 모듈들을 업데이트 하려면, 다음 커맨드를 실행합니다:

```sh
git submodule update --init --recursive
```

만약 자기 자신이 너무 이 커맨드를 자주 사용하는 것 같다면, `~/.gitconfig` 파일을 생성하여 편하게 업데이트할 수 있습니다:

```sh
[alias]
	su = submodule update --init --recursive
```
