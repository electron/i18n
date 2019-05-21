# 使用 Node 原生模块

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed on your system, the modules you use will need to be recompiled for Electron. Otherwise, you will get the following class of error when you try to run your app:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## 如何安装原生模块

There are several different ways to install native modules:

### 为 Electron 安装并重新编译模块

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/electron/electron-rebuild) package. This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# 每次运行"npm install"时，也运行这条命令
./node_modules/.bin/electron-rebuild

# 在windows下如果上述命令遇到了问题，尝试这个：
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools, consult the project's README.

### 通过 `npm` 安装

只要设置一些系统环境变量，你就可以通过 `npm` 直接安装原生模块。

For example, to install all dependencies for Electron:

```sh
# Electron 的版本。
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
export npm_config_arch=x64
export npm_config_target_arch=x64
# 下载 Electron 的 headers。
export npm_config_disturl=https://atom.io/download/electron
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
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

- `HOME=~/.electron-gyp` changes where to find development headers.
- `--target=1.2.3` is the version of Electron.
- `--dist-url=...` specifies where to download the headers.
- `--arch=x64` says the module is built for a 64-bit system.

### 为Electron的自定义编译手动编译

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## 故障排查

If you installed a native module and found it was not working, you need to check the following things:

- 当有疑问时，请先执行 `electron-rebuild`。
- Make sure the native module is compatible with the target platform and architecture for your Electron app.
- Make sure `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- 如果升级了 Electron，你通常需要重新编译这些模块。

### A note about `win_delay_load_hook`

On Windows, by default, `node-gyp` links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll`. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## 依赖于 `prebuild` 的模块

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

如果为 Electron 提供二进制原生模块，请确保删除 `--build-from-source` 和 `npm_config_build_from_source` 环境变量 来充分利用预编译的二进制文件。

## 依赖于 `node-pre-gyp` 的模块

[`node-pre-gyp` 工具](https://github.com/mapbox/node-pre-gyp) 提供一种部署原生 Node 预编译二进制模块的方法， 许多流行的模块都是使用它。

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. So in general, it is recommended to always build native modules from source code. `electron-rebuild` handles this for you automatically.

如果你通过 `npm` 的方式安装模块，默认情况下这就完成了， 如果没有，你需要传入 `--build-from-source` 给 `npm`, 或者设置 `npm_config_build_from_source` 环境变量。