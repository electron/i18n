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

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Starts the process as a normal Node.js process.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Don't attach to the current console session.

### ` ELECTRON_FORCE_WINDOW_MENU_BAR `* Linux *

Don't use the global menu bar on Linux.

### `ELECTRON_TRASH` *Linux*

Set the trash implementation on Linux. Default is `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## 开发环境相关变量

The following environment variables are intended primarily for development and debugging purposes.

### `ELECTRON_ENABLE_LOGGING`

Prints Chrome's internal logging to the console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### ` ELECTRON_DEFAULT_ERROR_MODE `* Windows *

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Usage:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```