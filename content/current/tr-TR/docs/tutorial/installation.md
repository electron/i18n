# Kurulum

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

Uygulamalarınızdaki Electron sürümlerini yönetme hakkında bilgi için [Electron sürüm belgelerine](./electron-versioning.md) bakın.

## Genel kurulum

`electron` komutunu global olarak `$PATH`'inize de yükleyebilirsiniz:

```sh
npm install electron -g
```

## Özelleştirme

Eğer bu makinedeki yüklenen mimariyi değiştirmek istiyorsanız (örneğin. `ia32` bir `x64` makinede), `--arch` kullanabilirsin npm yükle ile birlikte ayarla `npm_ayar_arch` çevre değeri ile:

```shell
npm install --arch=ia32 electron
```

Mimariyi değiştirmeye ek olarak, `--platform` işaretini kullanarak platformu da belirleyebilirsiniz (örneğin `win32`, `linux`, vb.):

```shell
npm install --platform=win32 electron
```

## Vekil Sunucular

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Özel Aynalar ve Önbellekler
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. Bu aynı zamanda GitHub'ın sürüm indirme sayfasına başvurarak da yapılabilir.(`https://github.com/electron/electron/releases/tag/v$VERSION`, `$VERSION` sürümü Elektron'un doğru sürümüdür).

Eğer GitHub'a erişemiyorsanız veya özel bir kurulum sağlamanız gerekiyorsa bunu bir ayna veya varolan bir önbellek dizini sağlayarak da yapabilirsiniz.

#### Ayna
Ana URL'i geçersiz saymak için çevre değişkenlerini kullanabilirsiniz, dosya yolu Electron binary'lerine ve binary dosya isimlerine bakmalıdır. The URL used by `@electron/get` is composed as follows:

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

#### Önbellek
Alternatif olarak yerel önbelleği geçersiz kılabilirsiniz. `@electron/get` will cache downloaded binaries in a local directory to not stress your network. Önbellek klasörünü Elektron'un özel kurulumlarını sağlamak veya ağ ile iletişimini tamamen kesmek için kullanabilirsiniz.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Electron'un daha eski sürümlerinin kullanıldığı çevrelerde önbelleği `~/.electron` içinde bulabilirsiniz.

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

## Arıza giderme

`npm yükle electron` bazen çalıştırılırken bazı kullanıcılar hatayla karşılaşmaktadırlar.

Genelde bütün durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilişkili olmayan hatalar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağıntı hatalarının belirtisidir. 가장 좋은 해결책은 네트워크를 전환하거나, 잠시 기다렸다가 다시 설치하는 것입니다.

Eğer `npm` ile yükleme başarısız oluyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases) ' den indirebilirsiniz.

Eğer yükleme bir `EACCESS` hatası ile başarısız olursa [npm izinlerini düzeltmeniz](https://docs.npmjs.com/getting-started/fixing-npm-permissions) gerekebilir.

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm= doğru
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm yükle --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.
