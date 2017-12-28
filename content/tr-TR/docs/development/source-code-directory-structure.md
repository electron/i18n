# Kaynak Kodu Dizin Yapısı

Elektron kaynak kodunu çoğunlukla krom ayrılık kurallarına göre aşağıdaki birkaç parçaya ayrılır.

Kaynak kodu daha iyi anlamak için [krom'ın çok süreç mimarisi](http://dev.chromium.org/developers/design-documents/multi-process-architecture) ile öğrenmeniz gerekebilir.

## Kaynak Kod Yapısı

```sh
├── atom/ - C++ kaynak kodu.
|   ├── app / - Sistem giriş kodu.
|   ├── tarayıcı / - ana penceresinde, kullanıcı Arabirimi ve tüm dahil önyüz |   |   ana süreç işler. Bu web sayfaları yönetmek için Oluşturucu için görüşmeler.
|   |   ├── UI / - UI uygulama şeyler farklı platformlar için.
|   |   |   ├── kakao / - kakao özel kaynak kodu.
|   |   |   ├── win/ - Windows GUI özel kaynak kodu.
|   |   |   └── x/ - X11 özel kaynak kodu.
|   |   ├── API / - ana uygulama süreç API'leri.
|   |   ├── net / - ilgili kod ağ.
|   |   ├── mac / - Mac belirli Objective-C kaynak kodu.
|   |   └── kaynakları / - simgeler, platforma bağımlı dosyaları, vb.
|   ├── Oluşturucu / - kod Oluşturucu işlemi o çalışır.
|   |   └── API / - işleyici uygulanması süreç API'leri.
|   └── ortak / - ana ve işleyici işlemler tarafından kullanılan kod |       bazı yardımcı programı işlevleri ve düğümün mesaj tümleştirmek için kod da dahil olmak üzere |       Krom'ın ileti döngüsü döngüsü.
|       └── API / - ortak API'leri ve temelleri |           Elektron'ın dahili modülleri.
├── chromium_src / - kaynak kodu krom kopyalanır. Aşağıya bakınız.
├── default_app / - varsayılan sayfa olmadan elektron başladığında göstermek için |   bir app-mek şartıyla.
├── Dokümanlar / - belgeleri.
├── lib / - JavaScript kaynak kodu.
|   ├── tarayıcı / - Javascript ana süreç başlatma kodu.
|   |   └── API / - Javascript API uygulama.
|   ├── ortak / - JavaScript kullanılan ana ve işleyici işlemler tarafından |   |   └── API / - Javascript API uygulama.
|   └── Oluşturucu / - Javascript işleyici işlemi başlatma kodu.
|       └── API / - Javascript API uygulama.
├── spec / - otomatik testler.
├── electron.gyp - elektron yapı kuralları.
└── common.gypi - derleyici belirli ayarları ve diğer bileşenlerle 'düğümü' ve 'breakpad' gibi binanın kuralları.
```

## `/chromium_src`

Belgili tanımlık eğe içinde `/ chromium_src` içerik katman yer almayan adet krom olma eğilimindedirler. Örneğin, biber API uygulamak için bazı kablolama benzer resmi krom ne için ihtiyacımız var. Biz [libcc](../glossary.md#libchromiumcontent) bir parçası olarak ilgili kaynaklar inşa ancak en sık tüm özellikleri gerektirmeyen (bazı özel mülk, olma eğilimi analytics in) sadece kod parçaları aldım. Bunlar kolay libcc, yamalarındaki olabilirdi ama bunlar ne zaman yazılmıştı zaman libcc amacı çok az yamalar korumak için ve chromium_src değişiklikleri büyük olanlar olma eğilimindedirler. Ayrıca, bu düzeltme ekleri upstreamed biz şimdi korumak diğer libcc yamalar aksine hiç olabileceğine dikkat edin.

## Diğer Dizinlerin Yapısı

* **komut dosyası** - komut bina, ambalaj, test, vb gibi geliştirme amaç için kullanılır.
* **araçlar** - Gyp dosyaları tarafından kullanılan yardımcı komut dosyaları aksine `script`, komut dosyaları koy burada asla doğrudan kullanıcılar tarafından çağrılmamalıdır.
* **satıcı** - Üçüncü kişi bağımlılıklarının kaynak kodu, biz kullanmadık `üçüncü_party` çünkü aynı dizinde onu şaşırtacak Chromium'un kaynak kodu ağacı.
* **düğüm_modülleri** - Bina için kullanılan üçüncü taraf düğüm modülleri.
* **dışarı** - Geçici çıktı dizini `ninja`.
* **dist** - Tarafından oluşturulan geçici dizin `script/create-dist.py` bir dağıtım oluştururken komut dosyası.
* **harici_ikili** - Üçüncü parti çerçevelerin indirilen ikili dosyaları ile bina desteklemez `gyp`.

## Git Submodules güncel tutma

Electron deposunda birkaç satıcı bağımlılığı vardır. [/satıcı](https://github.com/electron/electron/tree/master/vendor) rehber. Bazen böyle bir mesaj görebilirsiniz. Koşarken `git durumu`:

```sh
$ git durumu
    değiştirilmiş:   satıcı/libchromium content (yeni taahhütler)
    değiştirilmiş:   satıcı/düğüm (yeni taahhütler)
```

Bu satılan bağımlılıkları güncellemek için aşağıdaki komutu çalıştırın:

```sh
git submodule güncelleme --init - tekrar başlatma
```

Kendinizi bu komutu sık sık çalıştırıyorsa, onun için bir takma ad oluşturabilirsiniz senin içinde `~/.gitconfig` dosya:

```sh
[takma ad]
su = alt modül güncelleme - init - tekrar başlatma
```