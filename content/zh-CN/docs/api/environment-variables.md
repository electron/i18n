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

示例：

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

`NODE_OPTIONS` 在打包应用程序中明确禁止使用，以下情况除外:

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

Electron中的地理定位支持需要使用Google云平台的地理定位网络服务。 为了启用此功能，需获取一个 [Google API 密钥](https://developers.google.com/maps/documentation/geolocation/get-api-key) 并将以下代码放入你的主进程文件， 在打开任何 浏览器窗口之前将生成地理位置请求：

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

默认情况下, 可能不允许新生成的 Google API key进行地理编码请求。 要为你的项目启用地理定位网络服务，请通过 [API 库](https://console.cloud.google.com/apis/library) 启用它。

注： 你需要在与 API 密钥相关的项目中添加一个[计费帐户](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method)，以便地理定位网络服务工作。

### `ELECTRON_NO_ASAR`

禁用 ASAR 支持。 该变量只在设置 `ELECTRON_RUN_AS_NODE` 的派生子进程和衍生子进程中受支持。

### `ELECTRON_RUN_AS_NODE`

当做普通Node.js进程启动。

在当前模式下，当运行普通可执行Node.js文件时，你可以将 [cli 选项](https://nodejs.org/api/cli.html) 传递给Node.js，但下列标志除外：

* "--openssl-config"
* "--use-bundled-ca"
* "--use-openssl-ca",
* "--force-fips"
* "--enable-fips"

由于Electron 在构建 Node.js 的 `crypto` 模块时使用 BoringSSL 而不是 OpenSSL，因此这些标志被禁用。所以不会像设计的那样工作。

### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

不附加到当前控制台会话。

### ` ELECTRON_FORCE_WINDOW_MENU_BAR `_ Linux _

不使用 Linux 的全局菜单栏。

### `ELECTRON_TRASH` _Linux_

在 Linux 上设置垃圾回收实现。 默认值为 `gio`.

选项:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## 开发环境相关变量

以下环境变量主要用于开发和调试目的。

### `ELECTRON_ENABLE_LOGGING`

Prints Chromium's internal logging to the console.

Setting this variable is the same as passing `--enable-logging` on the command line. For more info, see `--enable-logging` in [command-line switches](./command-line-switches.md#enable-loggingfile).

### `ELECTRON_LOG_FILE`

Sets the file destination for Chromium's internal logging.

Setting this variable is the same as passing `--log-file` on the command line. For more info, see `--log-file` in [command-line switches](./command-line-switches.md#log-filepath).

### `ELECTRON_DEBUG_DRAG_REGIONS`

在 macOS 的 [`BrowserView`](./browser-view.md)上添加可拖动区域的颜色 - 可拖动区域将着绿色， 不可拖动区域将着红色以帮助调试。

### `ELECTRON_DEBUG_NOTIFICATIONS`

在 macOS 上添加额外日志到 [`通知`](./notification.md) 生命周期以帮助调试。 当创建或激活新通知时，将显示额外日志。 They will also be displayed when common a tions are taken: a notification is shown, dismissed, its button is clicked, or it is replied to.

示例输出：

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

当 `electron` 包运行时，该变量告知 `electron` 命令使用指定Electron的构建代替由 `npm install` 下载的构建。 用法：

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Testing
```

## 通过 Electron 设置

在Electron运行时设置一些环境变量

### `ORIGINAL_XDG_CURRENT_DESKTOP`

This variable is set to the value of `XDG_CURRENT_DESKTOP` that your application originally launched with.  Electron 有时修改 `XDG_CURRENT_DESKTOP` 的值以影响Chromium 中的其他逻辑，所以如果您想访问 _原始的_ 值 您应该重新查看此环境变量。
