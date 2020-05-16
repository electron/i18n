# 安装

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

查看[versioning doc](./electron-versioning.md)获取如何在你的应用中管理Electron的相关信息。

## 全局安装

您还可以在 `$PATH ` 中全局安装 ` electron ` 命令:

```sh
npm install electron -g
```

## 自定义

如果想修改下载安装的位版本(例如, 在`x64`机器上安装`ia32`位版本), 你可以使用npm install中的`--arch`标记，或者设置`npm_config_arch` 环境变量:

```shell
npm install --arch=ia32 electron
```

此外, 您还可以使用 `--platform` 来指定开发平台 (例如, ` win32 `、` linux ` 等):

```shell
npm install --platform=win32 electron
```

## 代理

如果您需要使用 HTTP 代理，您需要设置 `ELECTRON_GET_USE_PROXY` 变量为 任何值。 附加额外的环境变量，取决于您的主机系统Node版本：

* [Node10及以上](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Node10前](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## 自定义镜像和缓存
在安装过程中，`electron` 模块会通过 [`electron-download`](https://github.com/electron/get) 为您的平台下载 Electron 的预编译二进制文件。 这将通过访问 GitHub 的发布下载页面来完成 (`https://github.com/electron/electron/releases/tag/v$VERSION`, 这里的 `$VERSION` 是 Electron 的确切版本).

如果您无法访问GitHub，或者您需要提供自定义构建，则可以通过提供镜像或现有的缓存目录来实现。

#### 镜像
您可以使用环境变量来覆盖基本 URL，查找 Electron 二进制文件的路径以及二进制文件名。 The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

例如，使用一个中国的镜像：

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

默认情况下，`ELECTRON_CUSTTOM_DIR`被设置为 `v$VERSION`。 要更改格式，请使用 `{{ version }}` 占位符。 例如，`version-{{ version }}` 被解析为 `version-5.0.0`, `{{ version }}` 被解析为 `5.0.0`， `v{{ version }}` 与默认值等价。 更具体的例子，使用中国非CDN镜像：

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

上述配置将从URL下载，例如`https://npm.taobao.org/mirrors/electron-v8.0.0-linux-x64.zip`

#### 缓存
或者，您可以覆盖本地缓存。 `electron-download` 会将下载的二进制文件缓存在本地目录中，不会增加网络负担。 您可以使用该缓存文件夹来提供 Electron 的定制版本，或者避免进行网络连接。

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

在使用旧版本 Electron 的环境中，您也可以在`~/.electron`中找到缓存。

您也可以通过提供一个 `electron_config_cache` 环境变量来覆盖本地缓存位置。

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

## 跳过二进制包下载
当您在安装 `electron` NPM 包时, 它会自动下载 electron 的二进制包。

当在CI环境中 测试另一个组件的时候，这可能是不必要的。

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECRON_SKIP_BINARY_DOWNOAD=1 npm install
```

## 故障排查

在运行 `npm install electron` 时，有些用户会偶尔遇到安装问题。

在大多数情况下，这些错误都是由网络问题导致，而不是因为 `electron` npm 包的问题。 如 `ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET` 和 `ETIMEDOUT` 等错误都是此类网络问题的标志。 最佳的解决方法是尝试切换网络，或是稍后再尝试安装。

如果通过 `npm` 安装失败，您可以尝试直接从 [electron/electron/releases](https://github.com/electron/electron/releases) 直接下载 Electron。

如果安装失败并出现 ` EACCESS ` 错误, 则可能需要 [ 修复您的 npm 权限 ](https://docs.npmjs.com/getting-started/fixing-npm-permissions)。（例如使用 sudo ）

如果上述错误仍然存在, 则可能需要将参数 unsafe-perm 设置为 true

```sh
sudo npm install electron --unsafe-perm=true
```

在较慢的网络上, 最好使用 `--verbose ` 标志来显示下载进度:

```sh
npm install --verbose electron
```

如果需要强制重新下载文件, 并且 SHASUM 文件将 ` force_no_cache ` 环境变量设置为 ` true `。
