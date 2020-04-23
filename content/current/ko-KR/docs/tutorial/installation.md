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

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## 커스텀 미러와 캐시
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. electron-download는 GitHub의 릴리스 다운로드 페이지에 접속할 것입니다(`https://github.com/electron/electron/releases/tag/v$VERSION`, 여기서 `$VERSION`은 Electron의 정확한 버전입니다 ).

GitHub에 액세스 할 수 없거나 사용자 정의 빌드를 제공해야하는 경우 미러 또는 기존 캐시 디렉토리를 제공해야합니다.

#### 미러(Mirror)
환경 변수를 사용하여 기본 URL, Electron binaries가 위치한 경로, 그 binary의 filename을 대체할 수 있습니다. The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

By default, `ELECTRON_CUSTOM_DIR` is set to `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

The above configuration will download from URLs such as `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### 캐시(Cache)
또는, 로컬 캐시를 대체할 수 있습니다. `@electron/get` will cache downloaded binaries in a local directory to not stress your network. 캐시 폴더를 사용하여 electron의 커스텀 빌드를 제공하거나 일체의 네트워크 접속을 피할 수 있습니다.

* Linux: `$XDG_CACHE_HOME` 또는 `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` 또는 `~/AppData/Local/electron/Cache/`

이전 버전의 electron을 사용하는 환경에서는, `~/.electron`에서 캐시를 찾을 수 있습니다.

You can also override the local cache location by providing a `electron_config_cache` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Skip binary download
When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## 문제 해결

`npm install electron`을 실행할 때, 어떤 사용자에게는 가끔 설치 오류가 발생합니다.

대부분의 경우에는, 이 오류는 네트웍 문제로 인한 것이고 `electron` npm 패키지 자체의 오류는 아닙니다. `ELIFECYCLE`나 `EAI_AGAIN`, `ECONNRESET`, `ETIMEDOUT` 같은 오류는 이런 네트웍 문제임을 나타냅니다. 최선의 방법은 네트웍을 전환하거나 잠시 기다린 후에 다시 설치를 시도하는 것입니다.

`npm`을 통해 설치하는 것에 실패한다면 Electron을 [electron/electron/releases](https://github.com/electron/electron/releases)로부터 직접 다운로드할 수 있습니다.

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
