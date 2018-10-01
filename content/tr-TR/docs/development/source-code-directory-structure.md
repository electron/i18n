# Kaynak Kodu Dizin Yapısı

Elektron kaynak kodunu çoğunlukla krom ayrılık kurallarına göre aşağıdaki birkaç parçaya ayrılır.

Kaynak kodu daha iyi anlamak için [krom'ın çok süreç mimarisi](https://dev.chromium.org/developers/design-documents/multi-process-architecture) ile öğrenmeniz gerekebilir.

## Kaynak Kod Yapısı

```diff
├── atom/ - C++ kaynak kodu.
|   ├── app / - Sistem giriş kodu.
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   |          main process things. This talks to the renderer to manage web
|   |   |          pages.
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
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── brightray/ - Thin shim over libcc that makes it easier to use.
├── chromium_src / - kaynak kodu krom kopyalanır. Aşağıya bakınız.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── Dokümanlar / - belgeleri.
├── lib / - JavaScript kaynak kodu.
|   ├── tarayıcı / - Javascript ana süreç başlatma kodu.
|   |   └── API / - Javascript API uygulama.
|   ├── ortak / - JavaScript kullanılan ana ve işleyici işlemler tarafından |   |   └── API / - Javascript API uygulama.
|   └── Oluşturucu / - Javascript işleyici işlemi başlatma kodu.
|       └── API / - Javascript API uygulama.
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec / - otomatik testler.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Diğer Dizinlerin Yapısı

* **komut dosyası** - komut bina, ambalaj, test, vb gibi geliştirme amaç için kullanılır.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **satıcı** - Üçüncü kişi bağımlılıklarının kaynak kodu, biz kullanmadık `üçüncü_party` çünkü aynı dizinde onu şaşırtacak Chromium'un kaynak kodu ağacı.
* **düğüm_modülleri** - Bina için kullanılan üçüncü taraf düğüm modülleri.
* **dışarı** - Geçici çıktı dizini `ninja`.
* **dist** - Tarafından oluşturulan geçici dizin `script/create-dist.py` bir dağıtım oluştururken komut dosyası.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

## Git Submodules güncel tutma

Electron deposunda birkaç satıcı bağımlılığı vardır. [/satıcı](https://github.com/electron/electron/tree/master/vendor) rehber. Bazen böyle bir mesaj görebilirsiniz. Koşarken `git durumu`:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

Bu satılan bağımlılıkları güncellemek için aşağıdaki komutu çalıştırın:

```sh
git submodule update --init --recursive
```

Kendinizi bu komutu sık sık çalıştırıyorsa, onun için bir takma ad oluşturabilirsiniz senin içinde `~/.gitconfig` dosya:

```sh
[takma ad]
su = alt modül güncelleme - init - tekrar başlatma
```