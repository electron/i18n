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

## 문제 해결

네이티브 모듈을 설치하고 작동하지 않는 것으로 판명 된 경우 다음 사항을 확인해야합니다.

* 모듈의 아키텍처는 Electron의 아키텍처 (ia32 또는 x64)와 일치해야합니다.
* Electron를 업그레이드 한 후에는 일반적으로 모듈을 다시 빌드해야합니다.
* 의심스러운 경우 `electron-rebuild`를 먼저 실행하십시오.

## `prebuild`에 의존하는 모듈

[`prebuild`](https://github.com/mafintosh/prebuild)는 여러 버전의 노드와 일렉트론에 대한 사전 빌드 된 바이너리로 네이티브 노드 모듈을 게시하는 방법을 제공합니다.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.