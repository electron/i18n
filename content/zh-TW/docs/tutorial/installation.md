# 安裝

> Electron 安裝秘訣

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com/). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev --save-exact
```

建議使用 `--save-exact` 旗標，因為 Electron 並沒有遵守語意化版號規則。 請參考[版號規則文件](https://electron.atom.io/docs/tutorial/electron-versioning/)，了解如何管理你應用程式中的 Electron 版本。

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

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or just wait a bit and try installing again.

你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron，如果用 `npm` 怎樣都裝不起來的話。

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