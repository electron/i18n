# Kurulum

> Electron'u yüklemek için ipuçları

Önceden yapılandırılmış Electron ikilileri, kullan [`npm`](https://docs.npmjs.com/). Tercih edilen Electronu geliştirme özgürlüğüyle sizin için kurmaktır:

```sh
npm yükle electron --kaydet-dev
```

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

## Genel kurulum

`electron` komutunu genel `$PATH` 'nıza da yükleyebilirsiniz:

```sh
npm yükle electron -g
```

## Özelleştirme

Eğer bu makinedeki yüklenen mimariyi değiştirmek istiyorsanız (örneğin. `ia32` bir `x64` makinede), `--arch` kullanabilirsin npm yükle ile birlikte ayarla `npm_ayar_arch` çevre değeri ile:

```shell
npm yükle --arch=ia32 electron
```

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

```shell
npm yükle --platform=win32 electron
```

## Vekil sunucular

Bir vekil sunucu kullanmaya ihtiyacınız varsa [ bu çevre değişkenleri ayarlayabilirsiniz](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Custom Mirrors and Caches

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

If you are unable to access GitHub or you need to provide a custom build, you can do so by either providing a mirror or an existing cache directory.

#### Mirror

You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The url used by `electron-download` is composed as follows:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

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

## Arıza giderme

`npm install electron` çalıştırılırken, bazı kullanıcılar bazen kurulum hatalarıyla karşılaşmaktadırlar.

Hemen hemen tüm durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilgili olmayan sorunlar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağlantı problemlerinin göstergesidir. En iyi çözüm ağ bağlantılarını değiştirmek ya da biraz bekleyip tekrar kurmayı denemektir.

Eğer `npm` ile kurulum hataya düşüyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases)' den indirmeyi deneyebilirsiniz.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Üstteki devam ediyorsa, [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) bayrağının Doğru olarak ayarlanması gerekebilir:

```sh
sudo npm install electron --unsafe-perm= doğru
```

İnternet erişiminiz yavaşsa `--verbose` indirme sürecinizde tavsiye edilir:

```sh
npm yükle --verbose electron
```

SHASUM ve öğeyi yeniden indirmeye zorlamak istiyorsanız `force_no_cache` değişkenini `true` olarak ayarlayın.