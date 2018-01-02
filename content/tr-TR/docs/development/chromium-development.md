# Chromium Geliştirme

> Krom hakkında öğrenme ve gelişimi izleme için kaynak topluluğu

- Slack üzerinde [chromiumdev](https://chromiumdev-slack.herokuapp.com)
- Twitter üzerinde [@ChromiumDev](https://twitter.com/ChromiumDev)
- Twitter üzerinde [@googlechrome](https://twitter.com/googlechrome)
- [Blog](https://blog.chromium.org)
- [Kod Arama](https://cs.chromium.org/)
- [Kaynak Kodu](https://cs.chromium.org/chromium/src/)
- [Geliştirme Takvimi ve Yayın Bilgisi](https://www.chromium.org/developers/calendar)
- [Tartışma grupları](http://www.chromium.org/developers/discussion-groups)

Ayrıca bkz: [V8 geliştirme](v8-development.md)

# Elektron ile krom geliştirme

Krom elektron ile ileterek hata ayıklamak mümkündür `--build_debug_libcc` önyükleme komut dosyası:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

Bu, libchromium içeriğini yerel olarak `-build_release_libcc` 'e benzer şekilde indirir ve oluşturur, ancak libchromiumcontent'in paylaşılan bir kütüphane derlemesi oluşturur ve hata ayıklama için ideal hale getiren herhangi bir sembolü çıkarmaz.

Bu şekilde oluşturulduğunda, `vendor/libchromiumcontent/src` dosyalarındaki değişiklikleri yapabilir ve hızlıca yeniden yapılandırabilirsiniz:

```sh
$ ./script/build.py -c D --libcc
```

Gdb ile linux üzerinde geliştirirken, simgeleri yüklemeyi hızlandırmak için bir gdb dizini eklenmesi önerilir. Her dosya üzerinde çalıştırılmasına gerek yoktur, ancak en çok paylaşılan kütüphaneleri dizinlemek için bunu en az bir kez yapmak önerilir:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Libchromiumcontent oluşturmak güçlü bir makineye ihtiyaç duyar ve uzun sürer (ancak artan paylaşımlı kütüphane bileşeninin yeniden oluşturulması hızlıdır). 3ghz, hızlı SSD ve 32GB RAM bulunan 8-core/16-thread Ryzen 1700 CPU ile yaklaşık 40 dakika sürüyor. 16GB'dan daha az RAM ile oluşturulması önerilmez.

## Krom git önbellek

`depot_tools`, geliştiricinin Chromium + bağımlılıklarının tüm git nesneleri için genel bir önbellek ayarlamasına izin veren belgelenmemiş bir seçeneğe sahiptir. Bu seçenek, aynı depoların birden fazla klonunda bant genişliğini/alanı korumak için `git clone --shared` kullanır.

Elektron/libchromiumcontent üzerinde, bu seçenek `LIBCHROMIUMCONTENT_GIT_CACHE` çevre değişkeniyle gösterilir. Aynı makinede birkaç libchromiumcontent ağacı inşa etmeyi düşünüyorsanız (örneğin farklı dallarda çalışmak için), Chromium kaynağının indirilmesini hızlandırmak için değişken ayarlamanız önerilir. Örneğin:

```sh
$ mkdir ~/.chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE=~/.chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

Git önbelleğini kullanırken önyükleme komut dosyası kesilirse, önbelleği kilitli bırakır. Kilidi kaldırmak için `.lock` ile biten dosyaları silin:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

Bu dizini linux'te SMB paylaşımı olarak dışa aktararak diğer makinelerle paylaşmak mümkündür, ancak tek seferde sadece bir işlem/makine önbellek kullanabilir. Git-cache komut dosyası tarafından oluşturulan kilitler bunu önlemeye çalışacaktır, ancak ağda mükemmel çalışmayabilir.

Windows'ta, SMBv2'de git ile ilgili sorunlara neden olacak bir dizin önbellek vardır Önbellek komut dosyası, bu nedenle kayıt defteri anahtarını ayarlayarak devre dışı bırakmak gerekir

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

0'a. Daha fazla bilgi için: https://stackoverflow.com/a/9935126