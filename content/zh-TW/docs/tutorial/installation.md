# 安裝

可以透過 [`npm`](https://docs.npmjs.com) 安裝預先建置好的 Electron 二進位檔。建議將 Electron 安裝成你應用程式開發相依套件:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](./electron-versioning.md) for info on how to manage Electron versions in your apps.

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

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. 它會連到 GitHub 的發行下載頁(`https://github.com/electron/electron/releases/tag/v$VERSION`，當中的 `$VERSION` 替換成 Electron 確切的版本) 下載。

如果你連不到 GitHub，或是需要使用客製化的版本，可以提供鏡像或是既有的快取目錄來安裝。

#### 鏡像

你可以使用環境變數蓋掉 Electron 尋找二位檔的根 URL 及檔名。 `electron-download` 用來下載的 Url 是這樣組出來的:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

假如我們要使用位於中國的鏡像站:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### 快取

或是，你也可以蓋過本機快取。 `electron-download` 會將下載的檔案放在本機目錄做為快取，以免浪費你的網路頻寬。 你可以使用這個快取目錄來提供客製版的 Electron，或是在完全沒有網路的環境下執行。

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` 或 `~/AppData/Local/electron/Cache/`

在使用舊版 Electron 的環境中，快取可能放在 `~/.electron` 裡。

你也可以透過 `ELECTRON_CACHE` 環境變數蓋過本機快取位置的預設值。

快取內容包含檔案官方的 Zip 檔及純文字檢查碼檔案，一般的快取看起來像這樣:

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

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 The best resolution is to try switching networks, or wait a bit and try installing again.

如果用 `npm` 怎樣都裝不起來的話，你也可以直接由 [electron/electron/releases](https://github.com/electron/electron/releases) 下載 Electron。

如果安裝過程遇到 `EACCESS` 錯誤而失敗，代表可能要 [修正你 npm 的權限](https://docs.npmjs.com/getting-started/fixing-npm-permissions)。

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

如果你想要強制重新下載二進位檔案及 SHASUM 檔，可以將 `force_no_cache` 環境變數設為 `true`。