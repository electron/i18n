# 설치

[`npm`](https://docs.npmjs.com)을 이용해 Electron 바이너리 버전을 설치할 수 있습니다. 앱에서 Electron을 설치할 때는 개발 의존성 모드로 설치할 것을 권장합니다:

```sh
npm install electron --save-dev
```

엡에서 Electron 버전을 관리하는 방법은 [Electron 버전 관리](./electron-versioning.md) 문서를 참고하세요.

## 전역(Global) 설치

또한 여러분의 `$PATH`:에 전역 명령어로 설치 할 수도 있습니다.

```sh
npm install electron -g
```

## 사용자 정의

만약 다운로드된 아키텍쳐(e.g., `x64` machine 에서 `ia32`으로)를 변경하기 원한다면, npm install과 함께 `--arch` 플래그를 사용하거나 혹은 `npm_config_arch` 환경 변수를 설정할 수 있습니다.

```shell
npm install --arch=ia32 electron
```

아키텍쳐를 변경하는것 외에도, `--platform` 플래그를 사용하여 플랫폼을 지정할 수 있습니다. (e.g., `win32`, `linux`, etc.)

```shell
npm install --platform=win32 electron
```

## 프록시

HTTP 프록시 사용이 필요하다면 이곳을 확인하세요. [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## 커스텀 미러와 캐시

설치하는 동안, `electron` 모듈은 여러분의 플랫폼에 맞는 사전 빌드된 바이너리를 다운로드하기 위해 [`electron-download`](https://github.com/electron-userland/electron-download)을 호출할 것 입니다. electron-download는 GitHub의 릴리스 다운로드 페이지에 접속할 것입니다(`https://github.com/electron/electron/releases/tag/v$VERSION`, 여기서 `$VERSION`은 Electron의 정확한 버전입니다 ).

GitHub에 액세스 할 수 없거나 사용자 정의 빌드를 제공해야하는 경우 미러 또는 기존 캐시 디렉토리를 제공해야합니다.

#### Mirror

환경 변수를 사용하여 기본 URL, Electron binaries가 위치한 경로, 그 binary의 filename을 대체할 수 있습니다. `electron-download`에 의해 사용되는 url은 다음과 같이 구성됩니다.

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

예를 들어, 중국 mirror는 다음과 같습니다.

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

또는, 로컬 캐시를 대체할 수 있습니다. `electron-download`는 다운로드 된 바이너리를 로컬 디렉토리에 캐시하여 네트워크에 스트레스를주지 않습니다. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

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

## 문제 해결

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.