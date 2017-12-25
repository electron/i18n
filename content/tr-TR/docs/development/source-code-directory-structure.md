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
├── docs/ - Documentations.
├── lib/ - JavaScript source code.
|   ├── browser/ - Javascript main process initialization code.
|   |   └── api/ - Javascript API implementation.
|   ├── common/ - JavaScript used by both the main and renderer processes
|   |   └── api/ - Javascript API implementation.
|   └── renderer/ - Javascript renderer process initialization code.
|       └── api/ - Javascript API implementation.
├── spec/ - Automatic tests.
├── electron.gyp - Building rules of Electron.
└── common.gypi - Compiler specific settings and building rules for other
    components like `node` and `breakpad`.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we just took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Structure of Other Directories

* **script** - Scripts used for development purpose like building, packaging, testing, etc.
* **tools** - Helper scripts used by gyp files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
* **node_modules** - Third party node modules used for building.
* **out** - Temporary output directory of `ninja`.
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gyp`.

## Keeping Git Submodules Up to Date

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

To update these vendored dependencies, run the following command:

```sh
git submodule update --init --recursive
```

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

```sh
[alias]
    su = submodule update --init --recursive
```