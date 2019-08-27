# 环境变量

> 在不更改代码的情况下控制应用程序配置和行为。

Electrond的某些行为受环境变量的控制, 因为它们比命令行标志和应用程序的代码更早初始化。

POSIX shell示例:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Windows 控制台示例:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## 生产环境相关变量

以下环境变量主要用于在打包后的Electron应用运行时使用。

### `NODE_OPTIONS`

Electron 包括对 Node 的 [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) 的子集的支持。 除与 Chromium 使用 BoringSSL 相抵触的情况外，大多数都得到了支持。

示例:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

不支持的选项是：

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

在打包的应用程序中显式禁止使用 `NODE_OPTIONS` 。

### `GOOGLE_API_KEY`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). 默认情况下, 可能不允许新生成的 Google API key进行地理编码请求。 若要启用地理编码请求, 请访问 [ 这里 ](https://developers.google.com/maps/documentation/geocoding/get-api-key)。

### `ELECTRON_NO_ASAR`

禁用 ASAR 支持。仅在设置了 ` ELECTRON_RUN_AS_NODE `变量的fork或spawn的子进程中支持此变量。

### `ELECTRON_RUN_AS_NODE`

当做普通Node.js进程启动。

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

不附加到当前控制台会话。

### ` ELECTRON_FORCE_WINDOW_MENU_BAR `* Linux *

不使用 Linux 的全局菜单栏。

### `ELECTRON_TRASH` *Linux*

在Linux中设置回收站的实现，默认为`gio`。

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## 开发环境相关变量

以下环境变量主要用于开发和调试目的。

### `ELECTRON_ENABLE_LOGGING`

将 Chrome 的内部日志打印到控制台。

### `ELECTRON_LOG_ASAR_READS`

当Electron读取ASAR 文件时, 将读取偏移量和文件路径记录到系统 ` tmpdir `。生成的文件可以提供给 ASAR 模块以优化文件排序。

### `ELECTRON_ENABLE_STACK_DUMPING`

当Electron崩溃时, 将跟踪堆栈输出到控制台。

如果 ` crashReporter `已经启动了, 则此环境变量将不起作用。

### ` ELECTRON_DEFAULT_ERROR_MODE `* Windows *

当Electron崩溃时显示 Windows 的崩溃对话框。

如果 ` crashReporter `已经启动了, 则此环境变量将不起作用。

### `ELECTRON_OVERRIDE_DIST_PATH`

当 `electron` 包运行时，该变量告知 `electron` 命令使用指定Electron的构建代替由 `npm install` 下载的构建。 用法:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```