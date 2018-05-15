# Kurulum

Önceden yapılandırılmış Electron ikilileri, kullan [`npm`](https://docs.npmjs.com). Tercih edilen Electronu geliştirme özgürlüğüyle sizin için kurmaktır:

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

Önbellek, sağlama toplamını barındırdığı gibi, sürümün resmi zip dosyasını da bir metin dosyası şeklinde barındırır. Tipik bir önbellek aşağıdaki gibidir:

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

## Arıza Giderme

`npm install electron` çalıştırılırken, bazı kullanıcılar bazen kurulum hatalarıyla karşılaşmaktadırlar.

Hemen hemen tüm durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilgili olmayan sorunlar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağlantı problemlerinin göstergesidir. The best resolution is to try switching networks, or wait a bit and try installing again.

Eğer `npm` ile kurulum hataya düşüyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases)' den indirmeyi deneyebilirsiniz.

Eğer yükleme bir `EACCESS` hatası ile başarısız olursa [npm izinlerini düzeltmeniz](https://docs.npmjs.com/getting-started/fixing-npm-permissions) gerekebilir.

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm yükle --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.