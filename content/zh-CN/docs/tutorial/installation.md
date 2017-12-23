# 安装

> Electron安装小贴士

要安装预编译好的的二进制文件, 请使用 [` npm `](https://docs.npmjs.com/)。 首选的方法是在项目中作为development dependency安装。

```sh
npm install electron --save-dev
```

查看[Electron 版本管理](electron-versioning.md)查看如何在你的应用中管理Electron版本。

## 全局安装

您还可以在 `$PATH ` 中全局安装 ` electron ` 命令:

```sh
npm install electron -g
```

## 自定义

如果需要安装某一位数的版本 (例如,在` x64`位的系统中安装` ia32`位版本), 则可以使用 npm中的 ` arch ` 命令，或可以通过设置 ` npm_config_arch ` 的环境变量来进行安装:

```shell
npm install --arch=ia32 electron
```

此外, 您还可以使用 `--platform` 来指定开发平台 (例如, ` win32 `、` linux ` 等):

```shell
npm install --platform=win32 electron
```

## 代理

如果需要使用 HTTP 代理, 则可以 [ 设置这些环境变量 ](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables)。

## 故障排查

在运行 `npm install electron` 时，有些用户会偶尔遇到安装问题。

在大多数情况下，这些错误都是由网络问题导致，而不是 `electron` npm 模块的问题。 如 `ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET` 和 `ETIMEDOUT` 等错误都是此类网络问题的标志。 最佳的解决方法是尝试切换网络，或是稍后再尝试安装。

如果通过 `npm` 安装失败，您可以尝试直接从 [electron/electron/releases](https://github.com/electron/electron/releases) 直接下载 Electron。

如果安装失败并出现 ` EACCESS ` 错误, 则可能需要 [ 修复您的 npm 权限 ](https://docs.npmjs.com/getting-started/fixing-npm-permissions)。（例如使用 sudo ）

如果上述错误仍然存在, 则可能需要将 [unsafe-perm ](https://docs.npmjs.com/misc/config#unsafe-perm) 标志设置为 true:

```sh
sudo npm install electron --unsafe-perm=true
```

在较慢的网络上, 最好使用 `--verbose ` 标志以显示下载进度:

```sh
npm install --verbose electron
```

如果需要强制重新下载文件, 并且 SHASUM 文件将 ` force_no_cache ` 环境变量设置为 ` true `。  
(译者追加: 国内可使用淘宝镜像或者cnpm安装)