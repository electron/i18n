# 安裝

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

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

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## 自訂鏡像及快取
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. 它會連到 GitHub 的發行下載頁(`https://github.com/electron/electron/releases/tag/v$VERSION`，當中的 `$VERSION` 替換成 Electron 確切的版本) 下載。

如果你連不到 GitHub，或是需要使用客製化的版本，可以提供鏡像或是既有的快取目錄來安裝。

#### 鏡像
你可以使用環境變數蓋掉 Electron 尋找二位檔的根 URL 及檔名。 The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

By default, `ELECTRON_CUSTOM_DIR` is set to `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

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

You can also override the local cache location by providing a `electron_config_cache` environment variable.

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

## Skip binary download
When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
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
