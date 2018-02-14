# 安裝

> Electron 安裝秘訣

可以透過 [`npm`](https://docs.npmjs.com/) 安裝預先建置好的 Electron 二進位檔。建議將 Electron 安裝成你應用程式開發相依套件:

```sh
npm install electron --save-dev
```

請參考 [Electron 版號規則文件](electron-versioning.md)，了解該怎麼管理你應用程式中的 Electron 版本。

## 全域安裝

你也可以把 `electron` 安裝成 `$PATH` 下的全域指令:

```sh
npm install electron -g
```

## 客製化

如果你想要更改下載的架構 (例如在 `x64` 主機上跑 `ia32`)，可以使用 npm install 時使用 `--arch` 旗標，或是設定 `npm_config_arch` 環境變數:

```shell
npm install --arch=ia32 electron
```

除了更改架構外，你也可以透過 `--platform` 旗標指定平台 (例如 `win32`、 `linux` 等):

```shell
npm install --platform=win32 electron
```

## 代理伺服器

如果需要使用 HTTP 代理伺服器，可以[設定這些環境變數](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables)。

## 自訂鏡像及快取

安裝過程中，`electron` 模組會叫用 [`electron-download`](https://github.com/electron-userland/electron-download) 來下載符合你平台的 Electron 預建二進位檔。 它會連到 GitHub 的發行下載頁(`https://github.com/electron/electron/releases/tag/v$VERSION`，當中的 `$VERSION` 替換成 Electron 確切的版本) 下載。

如果你連不到 GitHub，或是需要使用客製化的版本，可以提供鏡像或是既有的快取目錄來安裝。

#### 鏡像

你可以使用環境變數蓋掉 Electron 尋找二位檔的根 URL 及檔名。 The url used by `electron-download` is composed as follows:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

例如使用位於中國的鏡像:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### 快取

Alternatively, you can override the local cache. `electron-download` will cache downloaded binaries in a local directory to not stress your network. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## 疑難排解

執行 `npm install electron` 時，有些人會遇到安裝錯誤。

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 最好的處理方式就是切換網路看看，或是晚點再重裝一次。

如果用 `npm` 怎樣都裝不起來的話，你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron。

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.