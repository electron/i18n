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

Bir vekil sunucu kullanmaya ihtiyacınız varsa [ bu çevre değişkenleri ayarlayabilirsiniz](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Özel Aynalar ve Önbellekler
During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. Bu aynı zamanda GitHub'ın sürüm indirme sayfasına başvurarak da yapılabilir.(`https://github.com/electron/electron/releases/tag/v$VERSION`, `$VERSION` sürümü Elektron'un doğru sürümüdür).

Eğer GitHub'a erişemiyorsanız veya özel bir kurulum sağlamanız gerekiyorsa bunu bir ayna veya varolan bir önbellek dizini sağlayarak da yapabilirsiniz.

#### Ayna
Ana URL'i geçersiz saymak için çevre değişkenlerini kullanabilirsiniz, dosya yolu Electron binary'lerine ve binary dosya isimlerine bakmalıdır. `electron-download` tarafından kullanılan url aşağıdaki gibi oluşturulur:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Örneğin, Çin aynası kullanmak için:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Önbellek
Alternatif olarak yerel önbelleği geçersiz kılabilirsiniz. `electron-download` indirilmiş binary'leri yerel bir klasör içine ağınızı zorlamamak için önbelleyecektir. Önbellek klasörünü Elektron'un özel kurulumlarını sağlamak veya ağ ile iletişimini tamamen kesmek için kullanabilirsiniz.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

Electron'un daha eski sürümlerinin kullanıldığı çevrelerde önbelleği `~/.electron` içinde bulabilirsiniz.

Yerel önbellek konumunu `ELECTRON_CACHE` çevre değişkenini sağlayarak değiştirebilirsiniz.

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
