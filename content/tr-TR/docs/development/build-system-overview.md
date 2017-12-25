# Sistem Genel Bakışı Oluşturma

Electron proje üretimi için [gyp](https://gyp.gsrc.io/) ve inşa etmek için [ninja](https://ninja-build.org/) kullanır. Proje yapılandırmaları `.gyp` ve `.gypi` dosyaları içinde bulunabilir.

## Gyp Dosyaları

Aşağıdaki `gyp` dosyaları Electron oluşturmanın ana kurallarını içerir:

* `electron.gyp` Electron 'un kendisinin nasıl inşa edildiğini tanımlar.
* `common.gypi` Node yapılandırmalarının oluşumunu Chromium ile birlikte oluşmasını ayarlar.
* `brightray/brightray.gyp` `brightray` 'nin nasıl oluştuğunu ve Chromium ile bağlanmak için varsayılan yapılandırmaları nasıl içerdiğini tanımlar.
* `brightray/brightray.gypi` inşa etmekle ilgili genel yapı konfigürasyonlarını içerir.

## Eleman Oluşturma

Chromium oldukça büyük bir proje olduğu için son bağlama aşaması ilerlemeyi zorlaştıran bir kaç dakika alabilir. Bunu gidermek için, Chromium her elemanı ortak kitaplıkta ayıran, bağlantıları çok hızlandıran ama dosya boyut ve performansını feda eden '' eleman oluştur'' u sundu.

Electron'da çok benzer bir yaklaşım izledik: `Debug` için, ikili hızlı bağlanma süresine ulaşmak için, bir Chromium bileşenlerinin paylaşılan kitaplık versiyonuna bağlantı oluşturur, `Release` için, ikili statik kitaplık versiyonuna bağlanır, ki böylece olası en iyi ikili boyutu ve performansına sahip olabiliriz.

## Kısa Ön yükleme

Chromium'un önceden oluşturulmuş ikili dosyalarının tümü (`libchromiumcontent`) önyükleme komut dosyası çalışıyorken indirilir. Varsayılan olarak, Statik kitaplık ve paylaşılan kitaplığın ikisi de yüklenir, ve son boyut platforma bağlı olarak 800 Mb ve 2 Gb arasında olmalı.

Varsayılan olarak, `libchromiumcontent` Amazon Web Servisleri'nden yüklenir. Eğer `LIBCHROMIUMCONTENT_MIRROR` ortamı değişken olarak ayarlanırsa, önyükleme komut dosyası oradan yüklenir. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) `libchromiumcontent` için bir yansımadır. Eğer AWS erişiminde sorun yaşıyorsanız, indirme adresini `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/` üzerinden değiştirebilisiniz

Eğer sadece Electron'u sadece hızlıca denemek veya geliştirmek için oluşturuyorsanız, sadece paylaşılan kitaplık versiyonunu `--dev` parametresini atlayarak indirebilirsiniz:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## İki Aşamalı Proje Üretimi

Electron `Release` ve `Debug` yapılarındaki farklı kitaplık kurulumları ile bağlantı sağlar. Ancak, `gyp`, farklı yapılandırmalar için farklı bağlantı kurulumlarının yapılandırmalarını desteklemez.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Hedef İsimler

`Release` ve `Debug` 'ı hedef isim olarak kullanan çoğu projenin aksine, Electron hedef isim olarak `R` ve `D` 'ı kullanır. Bunun sebebi, eğer sadece bir `Release` veya `Debug` inşa yapılandırması tanımlı ise `gyp` rastgele çöker ve Electron yukarıda belirtildiği gibi belli bir zamanda sadece bir hedef üretir.

Bu sadece geliştiricileri etkiler, eğer Electron'u sadece tekrar işlemek için kullanıyorsanız bu durum sizi etkilemez.

## Testler

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm testi
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Just append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```sh
$ npm testi -- -R
```