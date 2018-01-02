# Yayınlanma

Bu belgede, Electron 'un yeni bir sürümünün yayınlanma süreci açıklanmaktadır.

## Hangi dalın yayınlanacağını belirleyin

- **If releasing beta,** aşağıdaki komut dosyalarını `master` çalıştırın.
- **If releasing a stable version,** hangi sürüm için yayınladığınıza bağlı olarak `1-7 x` veya `1-6-x` arasındaki komut dosyalarını çalıştırın.

## Hangi sürüm değişikliğine ihtiyaç olduğunu bulun

Otomatik olarak oluşturulan sürüm notlarını görüntülemek için `npm run prepare-release -- --notesOnly` 'i çalıştırın. Oluşturulan notlar bunun büyük, küçük, düzeltme eki veya beta sürümü değişikliği olup olmadığını belirlemenize yardımcı olmalı. Daha fazla bilgi için [Version Change Rules](../tutorial/electron-versioning.md#semver) 'nı okuyun.

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
npm run prepare-release -- patch
```

### Beta sürümü değişikliği

```sh
npm run prepare-release -- beta
```

### Beta sürümünü sabit hale getirin

```sh
npm run prepare-release -- --stable
```

## Yapılanmalar için bekle :hourglass_flowing_sand:

`prepare-release` betiği, API çağrıları yoluyla yapıları tetikleyecektir. Yapı ilerlemesini izlemek için, aşağıdaki sayfalara bakın:

- Mac App Store için [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity)
- OS X için [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity)
- Linux için [circleci.com/gh/electron](https://circleci.com/gh/electron)
- Windows için [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron)

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

Yukarıda önerilenlerle aynı biçimleri kullanın, ancak değişiklik notunun başına aşağıdaki notu ekleyin:

```sh
**Not:** Bu bir beta sürümüdür ve muhtemelen biraz istikrarsızlık ve/veya gerileme yaşayacaktır.

Lütfen bulduğunuz hatalar için yeni sorunları dosyalayın.

Bu sürüm, 'beta' etiketinin altında [npm](https://www.npmjs.com/package/electron) burada yayınlanmıştır ve `npm install electron@beta` vasıtasıyla kurulabilir.
```

## Yayın taslağını düzenleme

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit the release and add release notes.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Click 'Save draft'. **Do not click 'Publish release'!**
5. Devam etmeden önce bütün yapılar geçene kadar bekleyin.
6. You can run `npm run release --validateRelease` to verify that all of the required files have been created for the release.

## Geçici şube birleştirme

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. Bölüm başarılı bir şekilde birleştirilemiyorsa bu yazı otomatik olarak `release` bölümünü rebase eder ve sürüm yapılarını tetikleyen yeniden oluşturma değişikliklerini uygular, tekrar oluşturur, tekrar devam etmeden önce bu da sürüm yapılarının çalışması için beklemek zorunda kalacağınız anlamına gelir.

### Merging back into master

```sh
npm run merge-release -- master
```

### Merging back into old release branch

```sh
npm run merge-release -- 1-7-x
```

## Sürümü yayınla

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## npm'e yayımla

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Fix missing binaries of a release manually

In the case of a corrupted release with broken CI machines, we might have to re-upload the binaries for an already published release.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

```sh
# Checkout the version to re-upload.
git checkout vTHE.RELEASE.VERSION

# Do release build, specifying one target architecture.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Explicitly allow overwritting a published release.
./script/upload.py --overwrite

```

After re-uploading all distributions, publish again to upload the checksum file:

```sh
npm run release
```