# 安装

要安装预编译的 Electron 二进制文件，请使用 [`npm`][npm]。 首选方法是在你的应用程序中安装 Electron 作为开发依赖：

```sh
npm install electron --save-dev
```

查看[versioning doc][versioning]获取如何在你的应用中管理Electron的相关信息。

## 运行 Electron ad-hoc

如果你不想在本地工程上使用 `npm install` 同时又没用其它选择时，你也可以使用 `npm` 捆绑的 [`npx`][npx] 命令来运行 Electron ad-hoc：

```sh
npx electron .
```

上面的命令会在当前工作目录下运行Electron。 需要注意的是，你的应用中的任何依赖将不会被安装。

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

* [Node10及以上][proxy-env-10]
* [Node10前][proxy-env]

## 自定义镜像和缓存

在安装过程中，`electron` 模块会通过 [`electron-download`][electron-get] 为您的平台下载 Electron 的预编译二进制文件。 这将通过访问 GitHub 的发布下载页面来完成 (`https://github.com/electron/electron/releases/tag/v$VERSION`, 这里的 `$VERSION` 是 Electron 的确切版本).

如果您无法访问GitHub，或者您需要提供自定义构建，则可以通过提供镜像或现有的缓存目录来实现。

#### 镜像

您可以使用环境变量来覆盖基本 URL，查找 Electron 二进制文件的路径以及二进制文件名。 `electron/get` 使用的网址组成如下：

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

缓存中包含了以文本文件形式存储的带有校验和的版本官方zip文件。 典型的缓存可能看起来像这样：

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

Under the hood, Electron's JavaScript API binds to a binary that contains its implementations. Because this binary is crucial to the function of any Electron app, it is downloaded by default in the `postinstall` step every time you install `electron` from the npm registry.

However, if you want to install your project's dependencies but don't need to use Electron functionality, you can set the `ELECTRON_SKIP_BINARY_DOWNLOAD` environment variable to prevent the binary from being downloaded. For instance, this feature can be useful in continuous integration environments when running unit tests that mock out the `electron` module.

```sh npm2yarn
ELECRON_SKIP_BINARY_DOWNOAD=1 npm install
```

## 故障排查

在运行 `npm install electron` 时，有些用户会偶尔遇到安装问题。

在大多数情况下，这些错误都是由网络问题导致，而不是因为 `electron` npm 包的问题。 如 `ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET` 和 `ETIMEDOUT` 等错误都是此类网络问题的标志。 最佳的解决方法是尝试切换网络，或是稍后再尝试安装。

如果通过`npm`安装失败，您也可以尝试通过从[electron/electron/release][releases]直接下载Electron。

如果安装失败并报错`EACCESS`，您可能需要[修复npm权限][npm-permissions]。

如果上述报错持续出现，[unsafe-perm][unsafe-perm] 标志可能需要被设置为 true:

```sh
sudo npm install electron --unsafe-perm=true
```

在较慢的网络上, 最好使用 `--verbose ` 标志来显示下载进度:

```sh
npm install --verbose electron
```

如果需要强制重新下载文件, 并且 SHASUM 文件将 ` force_no_cache ` 环境变量设置为 ` true `。

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[npx]: https://docs.npmjs.com/cli/v7/commands/npx
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
