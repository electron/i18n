# 使用 Node 原生模块

原生节点.js模块由电子支持，但由于电子具有与给定节点不同的 [应用二进制界面 （ABI）][abi] .js二进制（由于使用铬的 BoringSL 而不是 OpenSSL 等 差异），您使用的原生 模块需要为电子重新编译。 否则，当您尝试运行您的应用程序时， 将会遇到以下的错误：

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## 如何安装原生模块

有多种不同的方法来安装原生模块：

### 为 Electron 安装并重新编译模块

您可以像其他 Node 项目一样安装模块，然后用 [`electron-rebuild`][electron-rebuild] 包重建这些模块以适配 Electron 。 这个包可以自动识别当前 Electron 版本，为你的应用自动完成下载 headers、重新编译原生模块等步骤。 如果您使用的是 [电子锻造][electron-forge]，则该工具在开发模式和分发时都会自动 使用。

例如，安装独立的 `electron-rebuild` 工具，然后通过命令行与它一起重建 模块：

```sh
npm 安装 - 保存开发电子重建

# 每次运行"npm 安装"时，运行此操作：
。/node_modules/.bin/电子重建

# 如果您在 Windows 上遇到问题，请尝试：
。\node_modules.bin电子重建. cmd
```

有关 [电子 包装][electron-packager]等其他工具的使用和集成的更多信息，请咨询该项目的README。

### 通过 `npm` 安装

只要设置一些系统环境变量，你就可以通过 `npm` 直接安装原生模块。

例如，要安装所有Electron的依赖：

```sh
# Electron 的版本。
export npm_config_target=1.2.3
# Electron的目标架构, 可用的架构列表请参见
# https://electronjs.org/docs/tutorial/support#supported-platforms
export npm_config_arch=x64
export npm_config_target_arch=x64
# 下载 Electron 的 headers。
export npm_config_disturl=https://electronjs.org/headers
# 告诉 node-pre-gyp 我们是在为 Electron 生成模块。
export npm_config_runtime=electron
# 告诉 node-pre-gyp 从源代码构建模块。
export npm_config_build_from_source=true
# 安装所有依赖，并缓存到 ~/.electron-gyp。
HOME=~/.electron-gyp npm install
```

### 为 Electron 手动编译

如果你是一个原生模块的开发人员，想在 Electron 中进行测试， 你可能要手动编译 Electron 模块。 你可以 使用 `node-gyp` 直接编译：

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` 设置去哪找头文件
* `--target=1.2.3` 设置了 Electron 的版本。
* `--dist-url=...`设置了 Electron 的 headers 的下载地址。
* `--arch=x64` 设置了该模块为适配64位操作系统而编译。

### 为Electron的自定义编译手动编译

如果是为一个与公共发行版不匹配的Electron自定义版本编译原生Node模块，需要让`npm`使用你的Electron自定义版本所对应的Node版本。

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## 故障排查

如果您安装了本机模块并发现它无法正常工作，则需要检查以下内容：

* 当有疑问时，请先执行 `electron-rebuild`。
* 确保原生模块与Electron应用程序的目标平台和体系结构兼容。
* 确保在该模块的`binding.gyp`中`win_delay_load_hook`没有被设置为`false`。
* 如果升级了 Electron，你通常需要重新编译这些模块。

### 关于`win_delay_load_hook`的说明

在Windows上，默认情况下，`node-gyp`将原生模块与`node.dll`链接。 然而，在Electron 4.x和更高的版本中，原生模块需要的symbols由`electron.exe`导出，并且没有`node.dll`。 为了在Windows上加载原生 模块 `node-gyp` 安装一个 [延迟加载 钩子](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) 当本地模块加载时触发 并重定向 `节点。 ll` 引用了使用 加载可执行文件而不是 `节点。 在书库搜索中显示` 的路径 路径(不会出现任何路径)。 因此，在 Electron 4.x 和更高版本， `'win_delay_load_hook': 'true'` 需要加载本机模块。

如果您遇到错误，如 `模块没有自注册`， 或 `无法找到指定的
程序`这可能意味着你试图使用的模块 没有正确地包含延迟载荷钩。  如果模块是由 node-gyp, 确保将 `win_delay_load_hook` 变量设置为 `true` 在 中设置为 `绑定。 yp` 文件，不会在任何地方被忽略。  如果模块 是与另一个系统构建的， 您需要确保您在主 `安装了
个延迟钩子来构建。 代码` 文件。 您的 `link.exe` 调用 看起来像这样：

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib / DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

尤其重要的是：

* 您链接了 `node.lib` 来自 _Electron_ 而不是节点。 如果您链接到 错误的 `node.lib` 当您需要 Electron 中的 模块时，您将会遇到加载时间错误。
* 您包含标志 `/DELAYLOAD:node.exe`。 如果 `node.exe` 链接没有延迟 ，则延迟加载挂钩将无法启动， 符号的节点将无法正确解决。
* `win_delay_load_hook.obj` 直接连接到最终的 DLL。 如果钩子 设置在依赖的 DLL 中，它不会在适当的时候开火。

请参阅 [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) 以示例显示延迟载荷钩，如果您正在执行自己的操作。

## 依赖于 `prebuild` 的模块

[`预构建`](https://github.com/prebuild/prebuild) 提供了一种发布 本机节点模块的方式，并且预建了二进制节点 和 Electron。

如果 `prebuild`驱动的模块为 Electron 中的使用提供二进制文件， 确保省略 `--build-from-source` 和 `npm_config_build_from_source` 环境变量，以便充分利用预建的二进制文件。

## 依赖于 `node-pre-gyp` 的模块

[`node-pre-gyp` 工具][node-pre-gyp] 提供一种部署原生 Node 预编译二进制模块的方法， 许多流行的模块都是使用它。

有时这些模块在 Electron 下工作正常，但当没有 电子特异性二进制文件可用时，您需要从源头构建。 因此，建议为这些模块使用 `electron-rebuild` 。

如果您正在按照安装模块的 `npm` 方式，则需要将 `--build-from-source` 传递到 `npm`，或设置 `npm_config_build_from_source` 环境变量。

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
