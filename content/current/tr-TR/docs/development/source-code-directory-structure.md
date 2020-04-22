# Kaynak Kodu Dizin Yapısı

Elektron kaynak kodunu çoğunlukla krom ayrılık kurallarına göre aşağıdaki birkaç parçaya ayrılır.

Kaynak kodu daha iyi anlamak için [krom'ın çok süreç mimarisi](https://dev.chromium.org/developers/design-documents/multi-process-architecture) ile öğrenmeniz gerekebilir.

## Kaynak Kod Yapısı

```diff
Electron
├── build/ - Build configuration files needed to build with GN.
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron's documentation.
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - Images used in documentation.
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript source code.
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   ├── remote/ - Logic that handes use of the remote module in
|   |   |             the main process.
|   |   └── web-view/ - Logic that handles the use of webviews in the
|   |                   renderer process.
|   ├── sandboxed_renderer/ - Logic that handles creation of sandboxed renderer
|   |   |                     processes.
|   |   └── api/ - API implementation for sandboxed renderer processes.
|   └── worker/ - Logic that handles proper functionality of Node.js
|                 environments in Web Workers.
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Patches applied to Google's fork of OpenSSL, BoringSSL.
|   ├── chromium/ - Patches applied to Chromium.
|   ├── node/ - Patches applied on top of Node.js.
|   └── v8/ - Patches applied on top of Google's V8 engine.
├── shell/ - C++ source code.
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
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Building rules of Electron.
```

## Diğer Dizinlerin Yapısı

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - Tarafından oluşturulan geçici dizin `script/create-dist.py` bir dağıtım oluştururken komut dosyası.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.
* **düğüm_modülleri** - Bina için kullanılan üçüncü taraf düğüm modülleri.
* **npm** - Logic for installation of Electron via npm.
* **dışarı** - Geçici çıktı dizini `ninja`.
* **komut dosyası** - komut bina, ambalaj, test, vb gibi geliştirme amaç için kullanılır.
```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```
* **tools** - Helper scripts used by GN files.
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

## Git Submodules güncel tutma

Electron deposunda birkaç satıcı bağımlılığı vardır. [/satıcı](https://github.com/electron/electron/tree/master/vendor) rehber. Bazen böyle bir mesaj görebilirsiniz. Koşarken `git durumu`:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
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
