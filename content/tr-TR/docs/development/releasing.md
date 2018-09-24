# Yayınlanma

Bu belgede, Electron 'un yeni bir sürümünün yayınlanma süreci açıklanmaktadır.

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts:

- `ELECTRON_GITHUB_TOKEN`: Create this by visiting https://github.com/settings/tokens/new?scopes=repo
- `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you.
- `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api
- `VSTS_TOKEN`: Create a Personal Access Token at https://github.visualstudio.com/_usersSettings/tokens or https://github.visualstudio.com/_details/security/tokens with the scope of `Build (read and execute)`.
- `ELECTRON_S3_BUCKET`:
- `ELECTRON_S3_ACCESS_KEY`:
- `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

## Hangi dalın yayınlanacağını belirleyin

- **If releasing beta,** aşağıdaki komut dosyalarını `master` çalıştırın.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Hangi sürüm değişikliğine ihtiyaç olduğunu bulun

Otomatik olarak oluşturulan sürüm notlarını görüntülemek için `npm run prepare-release -- --notesOnly` 'i çalıştırın. Oluşturulan notlar bunun büyük, küçük, düzeltme eki veya beta sürümü değişikliği olup olmadığını belirlemenize yardımcı olmalı. Daha fazla bilgi için [Version Change Rules](../tutorial/electron-versioning.md#semver) 'nı okuyun.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

## Hazırlama-yayımlama komut dosyasını çalıştırın

Hazırlama betiği aşağıdakileri yapar. 1. Sürümün halihazırda işlemde olup olmadığını kontrol eder ve işlemdeyse durur. 2. Serbest dal oluşturun. 3. Sürüm numarasını birkaç dosyaya atayın. Bir örnek için [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) bakın. 4. Otomatik oluşturulmuş sürüm notlarıyla GitHub'da bir taslak sürüm oluşturun. 5. Yayınlama koluna tıklayın. 6. Sürüm yapılarını çalıştırmak için API'ları çağırın.

Hangi sürüm değişikliğinin gerektiğini belirledikten sonra, ihtiyaçlarınıza göre bağımsız değişkenlerle birlikte `prepare-release` çalıştırın: bunun istikrarlı bir sürüm olduğunu belirtmek için - `[major|minor|patch|beta]` sürüm numaralarından birini artırın veya - `--stable`

Örneğin:

### Ana sürüm değişikliği

```sh
npm run prepare-release -- major
```

### Alt sürüm değişikliği

```sh
npm run prepare-release -- minor
```

### Yama sürümü değişikliği

```sh
npm run prepare-release -- patch --stable
```

### Beta sürümü değişikliği

```sh
npm run prepare-release -- beta
```

### Beta sürümünü sabit hale getirin

```sh
npm run prepare-release -- --stable
```

Tip: You can test the new version number before running `prepare-release` with a dry run of the `bump-version` script with the same major/minor/patch/beta arguments, e.g.:

```sh
$ ./script/bump-version.py --bump minor --dry-run
```

## Yapılanmalar için bekle :hourglass_flowing_sand:

`prepare-release` betiği, API çağrıları yoluyla yapıları tetikleyecektir. Yapı ilerlemesini izlemek için, aşağıdaki sayfalara bakın:

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

## Sürüm notlarını derleyin

Sürüm notları yazmak, yapılar çalışırken kendinizi meşgul etmek için iyi bir yoldur. Önceki oluşturulanlar için [the releases page](https://github.com/electron/electron/releases) mevcut sürümlere bakın.

İpuçları: - Listelenen her madde, elektron / elektron hakkında bir PR'ye, bir sorun değil, başka bir repo'ya, yani libcc gibi bir PR'ye atıfta bulunmalıdır. - PR'leri referans alırken bağlantı işaretlemesini kullanmanıza gerek yok. `#123` gibi dizeler, otomatik olarak github.com'daki bağlantılara dönüştürülecektir. Electron 'un her sürümünde Chromium, V8 ve Node sürümlerini görmek için,[atom.io/download/electron/index.json](https://atom.io/download/electron/index.json) adresini ziyaret edin.

### Yama sürümleri

Bir `patch` sürümü için aşağıdaki biçimi kullanın:

```sh
## Bug Fixes

* Fixed a cross-platform thing. #123

### Linux

* Fixed a Linux thing. #123

### macOS

* Fixed a macOS thing. #123

### Windows

* Fixed a Windows thing. #1234
```

### Alt sürümler

`minor` sürümler için, örn. `1.8.0`, bu biçimi kullanın:

```sh
## Upgrades

- Upgraded from Node `oldVersion` to `newVersion`. #123

## API Changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123
```

### Üst sürümler

```sh
## Upgrades

- Upgraded from Chromium `oldVersion` to `newVersion`. #123
- Upgraded from Node `oldVersion` to `newVersion`. #123

## Breaking API changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123

## Other Changes

- Some other change. #123
```

### Beta sürümleri

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

Lütfen bulduğunuz hatalar için yeni sorunları dosyalayın.

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Yayın taslağını düzenleme

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Yayımı düzenle ve yayım notları ekle.
3. 'Save draft' a tıklayın. **'Publish release'e tıklamayın!**
4. Devam etmeden önce bütün yapılar geçene kadar bekleyin.
5. In the branch, verify that the release's files have been created:

```sh
$ npm run release -- --validateRelease
```

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

## Sürümü yayınla

Birleştirme tamamen tamamlandığında `release` yazılımını `npm run release` komutu ile çalıştırarak yayımlanma sürecini bitirebilirsiniz. Bu yazılım şunu yapacaktır: 1. Yayınlanan sürüm numarasının doğruluğunu onaylamak için projeyi oluşturun. 2. Çiftleri indirin ve yerel modülleri oluşturmak için düğüm üstbilgilerini ve Windows'ta kullanılan .lib bağlayıcıyı node-gyp ile oluşturun. 3. SHASUMS'ları oluştur ve node dosyaları için S3'e yükle. 4. SHASUMS256.txt dosyasını oluştur ve GitHub yayımına yükle. 5. Gerekli dosyaların hepsinin GitHub ve S3'te bulundğunu doğrulayın ve SHASUMS dosyalarında olduğu gibi doğru sağlama vardır. 6. Yayımı GitHub'da yayınla

## npm'e yayımla

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub in a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.

```sh
$ npm login
Username: electron-nightly
Password: <This can be found under NPM Electron Nightly on LastPass>
Email: (this IS public) electron@github.com
```

Publish the release to npm. Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.

```sh
$ npm whoami
electron-nightly
$ npm run publish-to-npm
```

After publishing, you can check the `latest` release:

```sh
$ npm dist-tag ls electron
```

If for some reason `npm run publish-to-npm` fails, you can tag the release manually:

```sh
$ npm dist-tag add electron@<version> <tag>
```

e.g.:

```sh
$ npm dist-tag add electron@2.0.0 latest
```

# Arıza giderme

## Rerun broken builds

If a release build fails for some reason, you can use `script/ci-release-build.js` to rerun a release build:

### Rerun all linux builds:

```sh
node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all macOS builds:

```sh
node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all Windows builds:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

Additionally you can pass a job name to the script to run an individual job, eg:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease --job=electron-x64 TARGET_BRANCH
```

## Bir sürümün eksik ikili dosyalarını manuel olarak düzeltin

Bozulmuş CI makineleri ile bozuk bir yayınlama söz konusu olduğunda, zaten yayımlanmış bir sürüm için ikili dosyaları yeniden yükleyin.

İlk adım, [Releases](https://github.com/electron/electron/releases) sayfasına gidip, `SHASUMS256.txt` checksum dosyası ile bozuk ikili dosyaları silmektir.

Daha sonra elle her platform için dağıtımlar oluşturun ve yükleyin:

```sh
# Yeniden yüklenecek sürümü kontrol edin.
git checkout vX.Y.Z

# Create release build
gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

# To compile for specific arch, instead set
gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'

# Build by running ninja with the electron target
ninja -C out/Release electron
ninja -C out/Release electron:dist_zip

# Explicitly allow overwriting a published release.
./script/upload.py --overwrite

```

Allowable values for [target_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) and [target_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values).

Tüm dağıtımları yeniden yükledikten sonra, checksum dosyasını yüklemek için tekrar yayınlayın:

```sh
npm run release
```