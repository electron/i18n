# 使用 Node 原生模块

Electron 支持原生的 Node 模块，但由于 Electron 非常有可能使用一个与您的系统上所安装的 Node 不同的 V8 引擎，您所使用的模块将需要被重新编译。 否则，当您尝试运行您的应用程序时， 将会遇到以下的错误：

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

您可以像其他 Node 项目一样安装模块，然后用 [`electron-rebuild`][electron-rebuild] 包重建这些模块以适配 Electron 。 这个包可以自动识别当前 Electron 版本，为你的应用自动完成下载 headers、重新编译原生模块等步骤。

例如，想要通过命令行下载 `electron-rebuild` 并重新编译：

```sh
npm install --save-dev electron-rebuild

# 每次运行"npm install"后，也运行这条命令
./node_modules/.bin/electron-rebuild

# 在windows下如果上述命令遇到了问题，尝试这个：
.\node_modules\.bin\electron-rebuild.cmd
```

更多有关使用方法和与其他工具结合的信息，请查阅该项目的README。

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

- 您链接了 `node.lib` 来自 _Electron_ 而不是节点。 如果您链接到 错误的 `node.lib` 当您需要 Electron 中的 模块时，您将会遇到加载时间错误。
- 您包含标志 `/DELAYLOAD:node.exe`。 If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` 直接连接到最终的 DLL。 如果钩子 设置在依赖的 DLL 中，它不会在适当的时候开火。

请参阅 [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) 以示例显示延迟载荷钩，如果您正在执行自己的操作。

## 依赖于 `prebuild` 的模块

[`预构建`](https://github.com/prebuild/prebuild) 提供了一种发布 本机节点模块的方式，并且预建了二进制节点 和 Electron。

如果为 Electron 提供二进制原生模块，请确保删除 `--build-from-source` 和 `npm_config_build_from_source` 环境变量 来充分利用预编译的二进制文件。

## 依赖于 `node-pre-gyp` 的模块

[`node-pre-gyp` 工具][node-pre-gyp] 提供一种部署原生 Node 预编译二进制模块的方法， 许多流行的模块都是使用它。

通常这些模块在 Electron 中工作良好，但有时当 Electron 使用比 Node 新的 V8 版本且/或有 ABI 改变时，可能发生错误。 因此，一般来说，建议始终从源代码编译原生模块。 `electron-rebuild` 会自动帮你处理这些问题。

如果你通过 `npm` 的方式安装模块，默认情况下这就完成了， 如果没有，你需要传入 `--build-from-source` 给 `npm`, 或者设置 `npm_config_build_from_source` 环境变量。

[electron-rebuild]: https://github.com/electron/electron-rebuild
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
