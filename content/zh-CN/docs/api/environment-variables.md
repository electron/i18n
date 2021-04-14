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
导出NODE_OPTIONS="-无警告-最大旧空间大小=2048"
```

不支持的选项是：

```sh
--使用捆绑-ca
-强制-fips
-启用-fips
-打开-配置
-使用-打开-ca
```

`NODE_OPTIONS` 在包装的应用中明确不允许，但以下内容除外：

```sh
--最大-http-标题大小
-赫特普-分析器
```

### `GOOGLE_API_KEY`

Electron 中的地理定位支持需要使用 Google 云平台的 地理定位 Web 服务。 要启用此功能，请获取 [Google API 密钥](https://developers.google.com/maps/documentation/geolocation/get-api-key) ，并将以下代码放在主流程文件中，然后打开任何 浏览器窗口，以便进行地理定位请求：

```javascript
process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'
```

默认情况下，新生成的 Google API 密钥可能不允许进行地理定位请求。 要使地理位置网络服务为您的项目，使其通过 [API库](https://console.cloud.google.com/apis/library)。

N.B。 您将需要向与 API 密钥关联的项目添加 [计费帐户](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) ，以使地理位置 Web 服务工作。

### `ELECTRON_NO_ASAR`

禁用 ASAR 支持。 此变量仅支持分叉儿童过程 和生成儿童过程，设置 `ELECTRON_RUN_AS_NODE`。

### `ELECTRON_RUN_AS_NODE`

当做普通Node.js进程启动。

在此模式下，您将能够将</a>

cli选项传递到节点.js 运行正常节点时.js可执行，但以下标志除外：</p> 

* "-打开配置"
* "-使用捆绑卡"
* "-使用-打开-卡"，
* "-强制-菲普斯"
* "-启用-菲普斯"

这些标志被禁用，因为电子在构建节点时使用 BoringSSL 而不是 OpenSSL .js 的 `crypto` 模块，因此不会像设计的那样工作。



### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

不附加到当前控制台会话。



### ` ELECTRON_FORCE_WINDOW_MENU_BAR `_ Linux _

不使用 Linux 的全局菜单栏。



### `ELECTRON_TRASH` _·利努克斯·_

在 Linux 上设置垃圾实现。 默认值 `gio`。

Options:

* `格夫斯- 垃圾`
* `垃圾- 克利`
* `基奥基伦特5`
* `基奥克利恩特`



## 开发环境相关变量

以下环境变量主要用于开发和调试目的。



### `ELECTRON_ENABLE_LOGGING`

将 Chrome 的内部日志打印到控制台。



### `ELECTRON_LOG_ASAR_READS`

当电子从 ASAR 文件中读取时，请记录读取偏移和文件路径，以 系统 `tmpdir`。 由此产生的文件可以提供给 ASAR 模块 以优化文件订购。



### `ELECTRON_ENABLE_STACK_DUMPING`

当Electron崩溃时, 将跟踪堆栈输出到控制台。

如果 ` crashReporter `已经启动了, 则此环境变量将不起作用。



### ` ELECTRON_DEFAULT_ERROR_MODE `_ Windows _

当Electron崩溃时显示 Windows 的崩溃对话框。

如果 ` crashReporter `已经启动了, 则此环境变量将不起作用。



### `ELECTRON_OVERRIDE_DIST_PATH`

当 `electron` 包运行时，该变量告知 `electron` 命令使用指定Electron的构建代替由 `npm install` 下载的构建。 用法:



```sh
出口ELECTRON_OVERRIDE_DIST_PATH=/用户/用户名/项目/电子/输出/测试
```




## 按电子设置

电子在运行时在环境中设置一些变量。



### `ORIGINAL_XDG_CURRENT_DESKTOP`

此变量设置为应用最初启动时 `XDG_CURRENT_DESKTOP` 值。  电子有时会修改 `XDG_CURRENT_DESKTOP` 值以影响铬内的其他逻辑，因此，如果您想要访问 _原始_ 值 您应该查找此环境变量。
