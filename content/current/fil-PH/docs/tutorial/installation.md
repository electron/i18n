# Pag-install

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm instol elektron -- isave-dev
```

See the [Electron versioning doc](./electron-versioning.md) for info on how to manage Electron versions in your apps.

## Global Installation

Maaari mo ring i-install ang utos ng ` electron ` globally sa iyong ` $PATH `:

```sh
npm install electron -g
```

## Pag-customize

Kung gusto mong baguhin ang arkitektura na na-download (hal., ` ia32 ` sa isang ` x64 ` machine), maaari mong gamitin ang flag ng ` --arko ` sa pag-install ng npm o itakda ang Variable na ` npm_config_arch `:

```shell
npm install --arch=ia32 electron
```

Bilang karagdagan sa pagpapalit ng arkitektura, maaari mo ring tukuyin ang platform (hal., ` win32 `, ` linux `, atbp.) gamit ang flag ng `--platform `:

```shell
npm install --platform=win32 electron
```

## Proxies

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Custom Mirrors and Caches
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. Magagawa ito sa pamamagitan ng pakikipag-ugnay sa GitHub release ang pahina ng pag-download (` https://github.com/electron/electron/releases/tag/v$VERSION `, kung saan ` $VERSION ` ay ang eksaktong bersyon ng Electron).

Kung hindi mo ma-access ang GitHub o kailangan mong magbigay ng custom build, ay maaaring gawin mo ito sa alinman sa pagbibigay ng salamin o isang umiiral na direktoryo ng cache.

#### Mirror
Maaari mong gamitin ang mga variable ng kapaligiran upang i-override ang base URL, ang landas kung saan hahanapin ang mga binary ng Electron, at ang binary filename. The URL used by `@electron/get` is composed as follows:

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

#### Cache
Bilang kahalili, maaari mong i-override ang cache ng lokal. `@electron/get` will cache downloaded binaries in a local directory to not stress your network. Pwede mong gamitin ang folder ng cache upang magbigay ng custom builds ng Electron o upang maiwasan ang paggawa ng contact kasama ang network sa lahat.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Sa mga kapaligiran na gumagamit ng mga mas lumang bersyon ng Electron, maaari mong makita ang cache din sa ` ~/.electron `.

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

## "Troubleshooting"

Habang pinatatakbo and `npm install electron`, ang ibang user ay kadalasang nakakasalubong ng error sa pag-install.

Sa maraming pagkakataon, ang mga problemang ito ay resulta ng problema sa network at hindit talaga aktwal na isyu ng `electron` npm package. Ang problema gaya ng `ELIFECYCLE`,`EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` ay mga indikasyon na mayroon problema sa iyong network. The best resolution is to try switching networks, or wait a bit and try installing again.

Maari mo ring subukan i download ang Electron ng direkta mula sa [electron/electron/releases](https://github.com/electron/electron/releases)kung ang pag-iinstall sa pamamagitan ng `npm` ay hindi nagtatagumpay.

Kung nabigo ang pag-install sa isang error na ` EACCESS ` maaaring kailanganin mo [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

Kung kailangan mo upang pilitin ang muling pag-download ng asset at ang SHASUM na file ay magtakda ng ` force_no_cache ` variable na kapaligiran sa ` true`.
