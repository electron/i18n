# 소스 코드 디렉토리 구조

Electron의 소스 코드는 몇 개의 파트로 분리되어 있습니다. 그리고 Chromium의 분리 규칙(separation conventions) 을 주로 따르고 있습니다.

이미 [Chromium의 멀티 프로세스 아키텍쳐](https://dev.chromium.org/developers/design-documents/multi-process-architecture)에 익숙해져 있다면 소스 코드를 이해하기 쉬울 것입니다.

## 소스 코드 구조

```diff
Electron
├── atom/ - C++ 소스 코드.
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
|   |   └── resources/ - Icons, platform-dependent files, etc.
|   ├── renderer/ - Code that runs in renderer process.
|   |   └── api/ - 렌더러 프로세스 API의 구현.
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── chromium_src/ - Chromium에서 복사하여 가져온 소스 코드. 아래를 참조하세요.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - 참조 문서.
├── lib/ - JavaScript 소스 코드.
|   ├── browser/ - Javascript 메인 프로세스 초기화 코드.
|   |   └── api/ - Javascript API 구현 코드.
|   ├── common/ - 메인과 렌더러 프로세스에서 모두 사용하는 JavaScript
|   |   └── api/ - Javascript API 구현 코드.
|   └── renderer/ - Javascript 렌더러 프로세스 초기화 코드.
|       └── api/ - Javascript API 구현 코드.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - 자동화 테스트.
└── BUILD.gn - Electron의 빌드 규칙.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## 그외 디렉터리 구조

* **script** - 개발목적으로 사용되는 빌드, 패키징, 테스트, 기타등을 실행하는 스크립트.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - 소스 코드의 서드파티 의존성 코드 소스 코드 디렉터리가 겹쳐 혼란을 일으킬 수 있기 때문에 `third_party`와 같은 Chromium 소스 코드 디렉터리에서 사용된 폴더 이름은 사용하지 않았습니다.
* **node_modules** - 빌드에 사용되는 node 서드파티 모듈.
* **out** - ninja의 임시 출력 디렉터리.
* **dist** - 배포용 바이너리를 빌드할 때 사용하는 script/create-dist.py 스크립트로부터 만들어지는 임시 디렉터리.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

## Git 서브 모듈 최신 버전으로 유지

Electron 저장소는 몇 가지 외부 벤더 의존성을 가지고 있으며 [/vendor][vendor] 디렉터리에서 확인할 수 있습니다. 때때로 `git status`를 실행했을 때 아마 다음과 같은 메시지를 흔히 목격할 것입니다:

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

[vendor]: https://github.com/electron/electron/tree/master/vendor
