# Native Node Modules

原生Node.js模块由Electron支持，但由于Electron具有与给定Node.js不同的 [应用二进制接口 (ABI)][abi](由于使用Chromium的 BoringSL 而不是 OpenSSL 等 差异)，您使用的原生 模块需要为Electron重新编译。 否则，当您尝试运行您的应用程序时， 将会遇到以下的错误：

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

您可以像其他 Node 项目一样安装模块，然后用 [`electron-rebuild`][electron-rebuild] 包重建这些模块以适配 Electron 。 这个包可以自动识别当前 Electron 版本，为你的应用自动完成下载 headers、重新编译原生模块等步骤。 如果您正在使用 [Electron Forge][electron-forge]，这个工具将在开发模式和发布时自动使用。

For example, to install the standalone `electron-rebuild` tool and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools such as [Electron Packager][electron-packager], consult the project's README.

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

在Windows上，默认情况下，`node-gyp`将原生模块与`node.dll`链接。 然而，在Electron 4.x和更高的版本中，原生模块需要的symbols由`electron.exe`导出，并且没有`node.dll`。 In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook.  If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere.  If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

* you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
* you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
* `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## 依赖于 `prebuild` 的模块

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## 依赖于 `node-pre-gyp` 的模块

[`node-pre-gyp` 工具][node-pre-gyp] 提供一种部署原生 Node 预编译二进制模块的方法， 许多流行的模块都是使用它。

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
