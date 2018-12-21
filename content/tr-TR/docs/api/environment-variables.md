# Ortam Değişkenleri

> Uygulama ayarlarını ve davranışını koda dokunmadan kontrol edin.

Bazı Electron davranışları, komut satırı parametreleri ve uygulamanın kendisinin kodundan daha önce başladığı için ortam değişkenleri tarafından kontrol edilir.

POSIX kabuk örneği:

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Windows konsol örneği:

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Canlı ortam değışkenleri

Aşağıdaki ortam değişkenleri, Electron uygulamalarının çalışma anında kulllanılır.

### `NODE_OPTIONS`

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Örneğin:

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Unsupported options are:

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

`NODE_OPTIONS` are explicitly disallowed in packaged apps.

### `GOOGLE_API_KEY`

Electron Google'ın geocoding servisine istek atarken kullanmak üzere kodun içine gömülmüş bir API anahtarı kullanır. Bu API anahtarı Electron'un her versiyonunda olduğu için, bu anahtara ait kota genelde aşılır. Bu durumdan kurtulmak için, Google API anahtarınızı ortam değişkeni olarak sağlayabilirsiniz. Tarayıcı geocoding istekleri atmadan önce ana sürece aşağıdakı kodu yerleştirin:

```javascript
process.env.GOOGLE_API_KEY = 'API_ANAHTARINIZI_BURAYA_YAZIN'
```

Google API anahtarını nasıl elde edeceğinizi öğrenmek için [bu](https://www.chromium.org/developers/how-tos/api-keys) sayfayı ziyaret edin.

Varsayılan olarak, yeni yaratılmış bir Google API anahtarı geocoding istekleri yapmaya müsait olmayabilir. Geocoding isteklerini açmak içinse [bu](https://console.developers.google.com/apis/api/geolocation/overview) sayfayı ziyaret edebilirsiniz.

### `ELECTRON_NO_ASAR`

ASAR desteğini iptal eder. Bu değişken sadece `ELECTRON_RUN_AS_NODE`'u kullanan çoklanmış alt (çocuk) süreçlerde veya yavrulayan çocuk süreçlerde desteklenir.

### `ELECTRON_RUN_AS_NODE`

Süreçi normal bir Node.js süreci olarak başlat.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

O anki konsol oturumuna kendini bağlama.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

Linux'taki global menu bar'ını kullanma.

### `ELECTRON_TRASH` *Linux*

Set the trash implementation on Linux. Default is `gio`.

Options:

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Geliştirme değişkenleri

Aşağıdaki ortam değişkenleri birincil olarak geliştirme ve hata ayıklama niyetiyle kullanılır.

### `ELECTRON_ENABLE_LOGGING`

Chrome'un kendi içindeki kayıtlarını konsola basar.

### `ELECTRON_LOG_ASAR_READS`

Electron ASAR dosyasından okuduğunda, okunanları `tmpdir` altına kaydeder. Ortaya çıkan dosya ASAR modülüne optimizasyon için sağlanabilir.

### `ELECTRON_ENABLE_STACK_DUMPING`

Electron çöktüğünde yığıt izlerini konsola basar.

Bu ortam değişkeni `crashReporter` başlamış durumdaysa çalışmaz.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Electron çöktüğünde windows'un çökme diyaloğunu gösterir.

Bu ortam değişkeni `crashReporter` başlamış durumdaysa çalışmaz.

### `ELECTRON_OVERRIDE_DIST_PATH`

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Kullanım:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```