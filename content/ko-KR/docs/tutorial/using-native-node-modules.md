# 네이티브 노드 모듈 사용하기

일랙트론은 노드의 네이티브모듈을 지원하지만, 당신의 시스템에 설치된 노드바이너리와는 다른 v8 버전을 사용할 가능성이 매우 높다. 그래서 네이티브모듈을 빌드할때는 반드시 수동으로 일랙트론의 헤더위치를 수동으로 지정해야한다.(일랙트론 용으로 다시 빌드해야한다)

## 네이티브 모듈들을 설치하는 방법

네이티브 모듈을 설치하는 방법은 3가지가 있습니다.

### `npm` 사용하기

몇 가지 환경 변수를 설정하여, `npm`을 이용하여 모듈을 바로 설치할 수 있습니다.

Electron의 모든 종속성 모듈을 설치하는 예:

```sh
# Electron의 버전
export npm_config_target=1.2.3
# Electron의 아키텍처, ia32 나 x64가 될 수 있습니다.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Electron의 헤더 다운 받기
export npm_config_disturl=https://atom.io/download/electron
# node-pre-gyp에게 Electron을 빌드하고 있다는 것을 알려줍니다.
export npm_config_runtime=electron
# node-pre-gyp에 소스 코드로부터 모듈을 빌드하라고 알려줍니다.
export npm_config_build_from_source=true
# 모든 종속성을 설치하고 ~/.electron-gyp에 캐시 저장하기
HOME=~/.electron-gyp npm install
```

### 모듈을 설치하고 Electron용으로 다시 빌드하기

다른 Node 프로젝트처럼 설치할 모듈을 고른 다음, [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild)를 사용하여 모듈을 다시 빌드하세요. 이 모듈은 Electron의 버전을 가져오고 다운로드 헤더의 수동 절차를 처리하며 앱의 네이티브 모듈을 빌드합니다.

`electron-rebuild`의 설치와 electron-rebuild를 사용하여 모듈을 다시 빌드하는 예:

```sh
npm install --save-dev electron-rebuild

# "npm install"을 실행할 때마다, 이것을 실행하세요:
./node_modules/.bin/electron-rebuild

# Windows에서 문제가 있다면, 이것을 시도해 보세요:
.\node_modules\.bin\electron-rebuild.cmd
```

### 수동으로 빌드하기

만약 네이티브 모듈을 개발하는 개발자이며 Electron에서 시험해 보고 싶을 때, 수동으로 Electron을 위한 모듈을 다시 빌드 하고 싶을 수도 있습니다. 직접 `node-gyp`를 사용하여 Electron을 빌드 할 수 있습니다:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp`은 development headers 를 찾을 위치를 변경합니다. `--target=1.2.3`은 Electron 버전입니다. `--dist-url=...`은 headers 를 다운로드 할 위치를 지정합니다. `--arch=x64`는 모듈이 64 비트 시스템 용으로 제작되었다는것을 의미합니다.

### Manually building for a custom build of Electron

To compile native Node addons against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## 문제 해결

네이티브 모듈을 설치하고 작동하지 않는 것으로 판명 된 경우 다음 사항을 확인해야합니다.

* 모듈의 아키텍처는 Electron의 아키텍처 (ia32 또는 x64)와 일치해야합니다.
* Electron를 업그레이드 한 후에는 일반적으로 모듈을 다시 빌드해야합니다.
* 의심스러운 경우 `electron-rebuild`를 먼저 실행하십시오.

## `prebuild`에 의존하는 모듈

[`prebuild`](https://github.com/mafintosh/prebuild)는 여러 버전의 노드와 일렉트론에 대한 사전 빌드 된 바이너리로 네이티브 노드 모듈을 게시하는 방법을 제공합니다.

모듈이 Electron에서 사용을 위한 바이너리를 제공한다면 미리 만들어진 바이너리를 최대한 활용하기 위해 `-- build-from-source`와 `npm_config_build_from_source` 환경 변수를 생략해야합니다.

## `node-pre-gyp`에 의존하는 모듈

[`node-pre-gyp`도구](https://github.com/mapbox/node-pre-gyp)는 미리 만들어진 바이너리로 네이티브 노드 모듈을 배포하는 방법을 제공하며 많은 인기 모듈이 이것을 사용하고 있습니다.

보통 이러한 모듈은 Electron에서 잘 작동하지만, Electron이 Node보다 V8의 새로운 버전을 사용하고 ABI 변경이있는 경우가 문제가 발생할 수 있습니다. 따라서 일반적으로 소스 코드에서 항상 네이티브 모듈을 빌드하는 것이 좋습니다.

모듈을 설치 방법인 `npm`을 따르고 있다면, 이것은 기본적으로 수행됩니다. 그렇지 않으면 `--build-from-source`를 `npm`에 전달하거나 또는 `npm_config_build_from_source` 환경 변수를 설정하십시오.