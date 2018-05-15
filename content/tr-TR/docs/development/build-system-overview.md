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

If you only want to build Electron quickly for testing or development, you can download the shared library versions by passing the `--dev` parameter:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## İki Aşamalı Proje Üretimi

Electron `Release` ve `Debug` yapılarındaki farklı kitaplık kurulumları ile bağlantı sağlar. Ancak, `gyp`, farklı yapılandırmalar için farklı bağlantı kurulumlarının yapılandırmalarını desteklemez.

Bunun etrafında çalışmak amacıyla Electron hangi bağlantı ayarlarını kullanacağını kontrol etmek için `libchromiumcontent_component` değişkeni bir `gyp` kullanır ve `gyp`'i çalıştırırken sadece bir hedef üretir.

## Hedef İsimler

`Release` ve `Debug` 'ı hedef isim olarak kullanan çoğu projenin aksine, Electron hedef isim olarak `R` ve `D` 'ı kullanır. Bunun sebebi, eğer sadece bir `Release` veya `Debug` inşa yapılandırması tanımlı ise `gyp` rastgele çöker ve Electron yukarıda belirtildiği gibi belli bir zamanda sadece bir hedef üretir.

This only affects developers, if you are building Electron for rebranding you are not affected.

## Testler

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