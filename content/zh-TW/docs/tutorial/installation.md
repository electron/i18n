# 安裝

> Electron 安裝秘訣

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com/). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

## 全域安裝

You can also install the `electron` command globally in your `$PATH`:

```sh
npm install electron -g
```

## 客製化

If you want to change the architecture that is downloaded (e.g., `ia32` on an `x64` machine), you can use the `--arch` flag with npm install or set the `npm_config_arch` environment variable:

```shell
npm install --arch=ia32 electron
```

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm install --platform=win32 electron
```

## 代理伺服器

If you need to use an HTTP proxy you can [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## 疑難排解

執行 `npm install electron` 時，有些人會遇到安裝錯誤。

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 最好的處理方式就是切換網路看看，或是晚點再重裝一次。

如果用 `npm` 怎樣都裝不起來的話，你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron。

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