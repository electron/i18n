# 使用原生 Node 模組

Electron 支援 Node 原生模組，但是 Electron 很有可能會用跟你安裝的 Node 不同版本的 V8，因此建置原生模組時你要手動指定 Electron 標頭檔的位置。

## 如何安裝原生模組

有三種方式可以安裝原生模組:

### 使用 `npm`

設定幾個環境變數後，你就可以使用 `npm` 直接安裝模組。

An example of installing all dependencies for Electron:

```sh
# Electron 版本。
export npm_config_target=1.2.3
# Electron 硬體架構，可以是 ia32 或 x64。
export npm_config_arch=x64
export npm_config_target_arch=x64
# 下載 Electron 標頭檔。
export npm_config_disturl=https://atom.io/download/electron
# 告訴 node-pre-gyp 我們正要跑 Electron 建置。
export npm_config_runtime=electron
# 告訴 node-pre-gyp 由原始碼開始建置模組。
export npm_config_build_from_source=true
# 安裝所有相依的套件，並儲存一份在 ~/.electron-gyp 。
HOME=~/.electron-gyp npm install
```

### 安裝模組並重新建置 Electron

You can also choose to install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) package. This module can get the version of Electron and handle the manual steps of downloading headers and building native modules for your app.

An example of installing `electron-rebuild` and then rebuild modules with it:

```sh
npm install --save-dev electron-rebuild

# 每次執行完 "npm install" 後，記得再跑:
./node_modules/.bin/electron-rebuild

# 如果你在 Windows 下碰到問題，可以試:
.\node_modules\.bin\electron-rebuild.cmd
```

### 手動建置 Electron

If you are a developer developing a native module and want to test it against Electron, you might want to rebuild the module for Electron manually. You can use `node-gyp` directly to build for Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

The `HOME=~/.electron-gyp` changes where to find development headers. The `--target=1.2.3` is version of Electron. The `--dist-url=...` specifies where to download the headers. The `--arch=x64` says the module is built for 64bit system.

## 疑難排解

If you installed a native module and found it was not working, you need to check following things:

* The architecture of the module has to match Electron's architecture (ia32 or x64).
* After you upgrade Electron, you usually need to rebuild the modules.
* When in doubt, run `electron-rebuild` first.

## 相依 `prebuild` 的模組

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## 相依 `node-pre-gyp` 的模組

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.