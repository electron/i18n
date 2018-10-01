# Sistem Genel Bakışı Oluşturma

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Eleman Oluşturma

Chromium oldukça büyük bir proje olduğu için son bağlama aşaması ilerlemeyi zorlaştıran bir kaç dakika alabilir. Bunu gidermek için, Chromium her elemanı ortak kitaplıkta ayıran, bağlantıları çok hızlandıran ama dosya boyut ve performansını feda eden '' eleman oluştur'' u sundu.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Testler

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

Değişikliklerinizin proje kodlama stiline uyumunu test etmek için kullandığı:

```sh
$ npm run lint
```

İşlevselleği test etmek için:

```sh
$ npm testi
```

Electron kaynak kodunda ne zaman değişiklik yaparsanız, şu testten önce inşa etmeyi yeniden çalıştırmalısınız:

```sh
$ npm run build && npm test
```

Test paketini belirli testi izole ederek veya hali hazırda kullandığınız Mocha' nın </a> özellikli  özel testlerini engelleyerek daha hızlı çalıştırabilirsiniz. Append `.only` to any `describe` or `it` function call:</p> 

```js
describe.only('some feature', function () {
  // ... sadece bu blok içindeki testler çalıştırılacak })
```

Alternatif olarak, mocha'nın `grep` seçeneğini sadece verilen normal ifade modeliyle eşleşen testleri çalıştırmak için kullanabilirsiniz:

```sh
$ npm test -- --grep child_process
```

Yerel modülleri içeren testler ( ör. `runas`) hata ayıklama yapısı ile çalıştırılamaz ( ayrıntılar için bkz. [#2558](https://github.com/electron/electron/issues/2558)), ama sürüm yapılarıyla birlikte çalışacaklardır.

Sürüm yapısıyla testleri çalıştırmak için kullanacağınız:

```sh
$ npm test -- -R
```