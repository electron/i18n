# Installation

> Tips for installing Electron

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com/). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

## Global Installation

You can also install the `electron` command globally in your `$PATH`:

```sh
npm install electron -g
```

## Customization

If you want to change the architecture that is downloaded (e.g., `ia32` on an `x64` machine), you can use the `--arch` flag with npm install or set the `npm_config_arch` environment variable:

```shell
npm install --arch=ia32 electron
```

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## Proxies

If you need to use an HTTP proxy you can [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## 문제 해결

`npm install electron`을 실행할 때, 사용자들은 가끔 설치 에러를 마주치게 됩니다.

대부분의 경우, 이 에러는 네트워크 문제일 뿐 `electron` npm 패키지의 문제는 거의 아닙니다. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` 위 같은 에러들은 모두 네트워크 문제라고 볼 수 있습니다. 가장 좋은 해결책은 네트워크를 바꾸거나, 기다려 보거나, 설치를 다시 하는 것입니다.

또한 `npm` 을 이용한 설치가 실패한다면 Electron을 [electron/electron/releases](https://github.com/electron/electron/releases) 에서 직접 설치할 수 있습니다.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.