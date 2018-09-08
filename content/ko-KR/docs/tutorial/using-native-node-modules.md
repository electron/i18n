# 네이티브 노드 모듈 사용하기

일랙트론은 노드의 네이티브모듈을 지원하지만, 당신의 시스템에 설치된 노드바이너리와는 다른 v8 버전을 사용할 가능성이 매우 높다. 그래서 네이티브모듈을 빌드할때는 반드시 수동으로 일랙트론의 헤더위치를 수동으로 지정해야한다.(일랙트론 용으로 다시 빌드해야한다)

## 네이티브 모듈들을 설치하는 방법

네이티브 모듈을 설치하는 방법은 3가지가 있다.

### Npm 사용하기

몇가지 환경변수를 세팅하는것으로 npm을 이용해서 모듈들을 바로 설치할 수 있다.

일랙트론에 대한 모든 종속성들을 설치하는 예

```sh
# Electron's version.
export npm_config_target=1.2.3
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
#모든 종속성설치하고 ~/.electron-gyp 에 캐쉬 저장하기
HOME=~/.electron-gyp npm install
```

### 모듈 설치하고 일랙트론용으로 재빌드하기

또한 다른 노드프로잭트들과 비슷하게 인스톨한 모듈을 선택한 다음. [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) 을 가지고 그 모듈을 재빌드 한다. 이 모듈은 일랙트론의 버전을 얻어올수 있고 헤더를 다운로드 하는 단계들을 조율하여 당신의 앱을 위한 네이티브모듈을 빌드한다.

`electron-rebuild` 인스톨한다음 그것을 가지고 모듈 재빌드 하기 예

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### 수동으로 빌드하기

만약 네이티브 모듈을 개발하는 개발자이고 일랙트론에서 동작 테스트를 원한다면, 수동으로 일랙트론용모듈을 리빌드 하기를 원할 것이다. `node-gyp` 를 써서 일랙트론용으로 바로 빌드 할 수 있다.

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