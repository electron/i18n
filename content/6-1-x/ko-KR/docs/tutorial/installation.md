# 설치

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

엡에서 Electron 버전을 관리하는 방법은 [Electron 버전 관리](./electron-versioning.md) 문서를 참고하세요.

## 전역(Global) 설치

또한 `electron` 명령어를 여러분의 `$PATH`에 전역 설치를 할 수도 있습니다:

```sh
npm install electron -g
```

## 사용자 정의

만약 다운로드된 아키텍쳐(e.g., `x64` machine 에서 `ia32`으로)를 변경하기 원한다면,   npm install과 함께 `--arch` 플래그를 사용하거나 혹은 `npm_config_arch` 환경 변수를 설정할 수 있습니다.

```shell
npm install --arch=ia32 electron
```

아키텍쳐를 변경하는것 외에도, `--platform` 플래그를 사용하여 플랫폼을 지정할 수 있습니다. (e.g., `win32`, `linux`, etc.)

```shell
npm install --platform=win32 electron
```

## 프록시

HTTP 프록시 사용이 필요하다면 [이 환경 변수들을 설정](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables)하면 됩니다.

## 커스텀 미러와 캐시
설치하는 동안, `electron` 모듈은 여러분의 플랫폼에 맞는 사전 빌드된 바이너리를 다운로드하기 위해 [`electron-download`](https://github.com/electron-userland/electron-download)을 호출할 것 입니다. electron-download는 GitHub의 릴리스 다운로드 페이지에 접속할 것입니다(`https://github.com/electron/electron/releases/tag/v$VERSION`, 여기서 `$VERSION`은 Electron의 정확한 버전입니다 ).

GitHub에 액세스 할 수 없거나 사용자 정의 빌드를 제공해야하는 경우 미러 또는 기존 캐시 디렉토리를 제공해야합니다.

#### 미러(Mirror)
환경 변수를 사용하여 기본 URL, Electron binaries가 위치한 경로, 그 binary의 filename을 대체할 수 있습니다. `electron-download`에 의해 사용되는 url은 다음과 같이 구성됩니다.

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

예를 들어, 중국 mirror는 다음과 같습니다.

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### 캐시(Cache)
또는, 로컬 캐시를 대체할 수 있습니다. `electron-download`는 다운로드 된 바이너리를 로컬 디렉토리에 캐시하여 네트워크에 스트레스를주지 않습니다. 캐시 폴더를 사용하여 electron의 커스텀 빌드를 제공하거나 일체의 네트워크 접속을 피할 수 있습니다.

* Linux: `$XDG_CACHE_HOME` 또는 `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` 또는 `~/AppData/Local/electron/Cache/`

이전 버전의 electron을 사용하는 환경에서는, `~/.electron`에서 캐시를 찾을 수 있습니다.

`ELECTRON_CACHE` 환경 변수를 제공하여 로컬 캐시 위치를 재정의 할 수도 있습니다.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Skip binary download
When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## 문제 해결

`npm install electron`을 실행하면 일부 사용자는 설치 오류가 발생할 수 있습니다.

대부분의 경우에는, 이 오류는 네트웍 문제로 인한 것이고 `electron` npm 패키지 자체의 오류는 아닙니다. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 및 `ETIMEDOUT`과 같은 오류는 모두 네트워크 문제를 나타냅니다. 가장 좋은 해결책은 네트워크를 전환하거나, 잠시 기다렸다가 다시 설치하는 것입니다.

`npm`을 통한 설치가 실패 할 경우[electron/electron/releases](https://github.com/electron/electron/releases)에서 Electron을 직접 다운로드 할 수도 있습니다.

`EACCESS` 오류로 설치가 실패한 경우 [여러분의 npm 권한을 수정하십시오](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

위의 오류가 계속되면 [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) 플래그를 true로 설정해야 할 수 있습니니다.

```sh
sudo npm install electron --unsafe-perm=true
```

속도가 느린 네트워크에서는 다운로드 진행 상황을 보여주기 위해 `--verbose` 플래그를 사용하는 것이 좋습니다.

```sh
npm install --verbose electron
```

Asset 및 체크섬 파일을 강제로 다시 다운로드해야 하는 경우 `force_no_cache`환경 변수를 `true`로 설정하십시오.
