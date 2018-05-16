# 环境变量

> 在不更改代码的情况下控制应用程序配置和行为。

Electrond的某些行为受环境变量的控制, 因为它们比命令行标志和应用程序的代码更早初始化。

POSIX shell示例:

```bash
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

### `GOOGLE_API_KEY`

Electron包含一个硬编码的 API key用于请求谷歌的地理编码服务。 由于此 API key包含在每个版本的Electron中, 因此它通常超过其使用限额。 为了应对这一情况，您可以在环境中提供自己的 Google API key。 在打开将进行地理编码请求的任何Browser窗口之前, 请在主进程文件中放置以下代码:

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

有关如何获取 Google API key的说明, 请访问 [ 这里 ](https://www.chromium.org/developers/how-tos/api-keys)。

默认情况下, 可能不允许新生成的 Google API key进行地理编码请求。 若要启用地理编码请求, 请访问 [ 这里 ](https://console.developers.google.com/apis/api/geolocation/overview)。

### `ELECTRON_NO_ASAR`

禁用 ASAR 支持。仅在设置了 ` ELECTRON_RUN_AS_NODE `变量的fork或spawn的子进程中支持此变量。

### `ELECTRON_RUN_AS_NODE`

当做普通Node.js进程启动。

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

不附加到当前控制台会话。

### ` ELECTRON_FORCE_WINDOW_MENU_BAR `* Linux *

不使用 Linux 的全局菜单栏。

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