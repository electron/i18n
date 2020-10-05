# 安裝

要安裝預建的 Electron 二進位檔案，請使用 [`npm`][npm]。 建議的方式是將其在你的應用程式中以開發相依套件安裝：

```sh
npm install electron --save-dev
```

請參考[Electron 版號規則][versioning]，了解該怎麼管理你應用程式中的 Electron 版本。

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

如果需要使用 HTTP 代理，則需要將 `ELECTRON_GET_USE_PROXY` 變數設置為任何值，其他環境變數則具體取決於主機系統的 Node 版本：

* [Node 10 及以上版本][proxy-env-10]
* [Node 10 之前版本][proxy-env]

## 自訂鏡像及快取
安裝過程中，`electron` 模組會呼叫並使用 [`electron-download`][electron-get] 來下載符合你平台的 Electron 預建二進位檔。 它會連到 GitHub 的發行下載頁(`https://github.com/electron/electron/releases/tag/v$VERSION`，當中的 `$VERSION` 替換成 Electron 確切的版本) 下載。

如果你連不到 GitHub，或是需要使用客製化的版本，可以提供鏡像或是既有的快取目錄來安裝。

#### 鏡像
你可以使用環境變數蓋掉 Electron 尋找二位檔的根 URL 及檔名。 `electron-download` 用來下載的 Url 是這樣組出來的:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

預設情況下， `ELECTRON_CUSTOM_DIR` 會設定為 `v$VERSION`。 若要更改格式，可使用 `{{ version }}` 字串。 例如，`version-{{ version }}` 會解析為 `version-5.0.0`，而 `{{ version }}` 解析為 `5.0.0`，`v{{ version }}` 則等於預設值。 As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

The above configuration will download from URLs such as `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### 快取
或是，你也可以蓋過本機快取。 `@electron/get` will cache downloaded binaries in a local directory to not stress your network. 你可以使用這個快取目錄來提供客製版的 Electron，或是在完全沒有網路的環境下執行。

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` 或 `~/AppData/Local/electron/Cache/`

在使用舊版 Electron 的環境中，快取可能放在 `~/.electron` 裡。

你也可以透過 `electron_config_cache` 環境變數來覆蓋本機快取位置的預設值。

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## 跳過二進位檔案下載
在安裝 `electron` NPM 套件時，也會自動下載 Electron 二進位檔案。

有些時候，例如在測試其他元件時的 CI 環境中在可能是不必要的。

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## 疑難排解

執行 `npm install electron` 時，有些人會遇到安裝錯誤。

大多數情況下，這些錯誤是來自於網路問題，而不是 `electron` npm 套件本身的問題。 諸如 `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` 及 `ETIMEDOUT` 全都是網路方面的問題。 turkısh

You can also attempt to download Electron directly from [electron/electron/releases][releases] if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions][npm-permissions].

If the above error persists, the [unsafe-perm][unsafe-perm] flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

如果你想要強制重新下載二進位檔案及 SHASUM 檔，可以將 `force_no_cache` 環境變數設為 `true`。

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
