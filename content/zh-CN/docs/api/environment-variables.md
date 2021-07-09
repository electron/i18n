# 环境变量

> 在不更改代码的情况下控制应用程序配置和行为。

Electron的某些行为受环境变量的控制, 因为它们比命令行标志和应用程序的代码更早初始化。

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

`NODE_OPTIONS` are explicitly disallowed in packaged apps, except for the following:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

Geolocation support in Electron requires the use of Google Cloud Platform's geolocation webservice. To enable this feature, acquire a [Google API key](https://developers.google.com/maps/documentation/geolocation/get-api-key) and place the following code in your main process file, before opening any browser windows that will make geolocation requests:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

By default, a newly generated Google API key may not be allowed to make geolocation requests. To enable the geolocation webservice for your project, enable it through the [API library](https://console.cloud.google.com/apis/library).

N.B. You will need to add a [Billing Account](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) to the project associated to the API key for the geolocation webservice to work.

### `ELECTRON_NO_ASAR`

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

当做普通Node.js进程启动。

In this mode, you will be able to pass [cli options](https://nodejs.org/api/cli.html) to Node.js as you would when running the normal Node.js executable, with the exception of the following flags:

* "--openssl-config"
* "--use-bundled-ca"
* "--use-openssl-ca",
* "--force-fips"
* "--enable-fips"

These flags are disabled owing to the fact that Electron uses BoringSSL instead of OpenSSL when building Node.js' `crypto` module, and so will not work as designed.

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

不附加到当前控制台会话。

### ` ELECTRON_FORCE_WINDOW_MENU_BAR `_ Linux _

不使用 Linux 的全局菜单栏。

### `ELECTRON_TRASH` _Linux_

Set the trash implementation on Linux. 默认值为 `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## 开发环境相关变量

以下环境变量主要用于开发和调试目的。

### `ELECTRON_ENABLE_LOGGING`

将 Chrome 的内部日志打印到控制台。

### `ELECTRON_DEBUG_DRAG_REGIONS`

Adds coloration to draggable regions on [`BrowserView`](./browser-view.md)s on macOS - draggable regions will be colored green and non-draggable regions will be colored red to aid debugging.

### `ELECTRON_DEBUG_NOTIFICATIONS`

Adds extra logs to [`Notification`](./notification.md) lifecycles on macOS to aid in debugging. Extra logging will be displayed when new Notifications are created or activated. They will also be displayed when common actions are taken: a notification is shown, dismissed, its button is clicked, or it is replied to.

Sample output:

```sh
Notification created (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
Notification displayed (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
Notification activated (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
Notification replied to (com.github.Electron:notification:EAF7B87C-A113-43D7-8E76-F88EC9D73D44)
```

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

当Electron崩溃时, 将跟踪堆栈输出到控制台。

如果 ` crashReporter `已经启动了, 则此环境变量将不起作用。

### ` ELECTRON_DEFAULT_ERROR_MODE `_ Windows _

当Electron崩溃时显示 Windows 的崩溃对话框。

如果 ` crashReporter `已经启动了, 则此环境变量将不起作用。

### `ELECTRON_OVERRIDE_DIST_PATH`

由 ` electron ` 包运行时，该变量告知 ` electron `命令使用指定构件代替由`npm install`下载的构件。 用法：

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

## Set By Electron

Electron sets some variables in your environment at runtime.

### `ORIGINAL_XDG_CURRENT_DESKTOP`

This variable is set to the value of `XDG_CURRENT_DESKTOP` that your application originally launched with.  Electron 有时修改 `XDG_CURRENT_DESKTOP` 的值以影响Chromium 中的其他逻辑，所以如果您想访问 _原始的_ 值 您应该重新查看此环境变量。
