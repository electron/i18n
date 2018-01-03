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
2. Yayımı düzenle ve yayım notları ekle.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. 'Save draft' a tıklayın. **'Publish release'e tıklamayın!**
5. Devam etmeden önce bütün yapılar geçene kadar bekleyin.
6. `npm run release --validateRelease` komutunu çalıştırarak yayımlama için gerekli bütün dosyaların oluşturulduğundan emin olabilirsiniz.

## Geçici şube birleştirme

Yayımlama sürümleri bittikten sonra `release` bölümünü asıl kaynak yayım bölümüne `merge-release` kullanarak birleştirin. Bölüm başarılı bir şekilde birleştirilemiyorsa bu yazı otomatik olarak `release` bölümünü rebase eder ve sürüm yapılarını tetikleyen yeniden oluşturma değişikliklerini uygular, tekrar oluşturur, tekrar devam etmeden önce bu da sürüm yapılarının çalışması için beklemek zorunda kalacağınız anlamına gelir.

### master ile tekrar birleştirmek

```sh
npm run merge-release -- master
```

### Eski yayım sürümüne birleştirme

```sh
npm run merge-release -- 1-7-x
```

## Sürümü yayınla

Birleştirme tamamen tamamlandığında `release` yazılımını `npm run release` komutu ile çalıştırarak yayımlanma sürecini bitirebilirsiniz. Bu yazılım şunu yapacaktır: 1. Yayınlanan sürüm numarasının doğruluğunu onaylamak için projeyi oluşturun. 2. Çiftleri indirin ve yerel modülleri oluşturmak için düğüm üstbilgilerini ve Windows'ta kullanılan .lib bağlayıcıyı node-gyp ile oluşturun. 3. SHASUMS'ları oluştur ve node dosyaları için S3'e yükle. 4. SHASUMS256.txt dosyasını oluştur ve GitHub yayımına yükle. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Yayımı GitHub'da yayınla 7. `release` bölümünü sil.

## npm'e yayımla

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Bir sürümün eksik ikili dosyalarını manuel olarak düzeltin

Bozulmuş CI makineleri ile bozuk bir yayınlama söz konusu olduğunda, zaten yayımlanmış bir sürüm için ikili dosyaları yeniden yükleyin.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

```sh
# Checkout the version to re-upload.
git checkout vYAYIMIN.VERSIYON.NUMARASI

# Versiyonu ve altyapısı belirtilmiş yayımı indir.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Çoktan yayımlanmış bir sürümün üstüne yazmaya izin verir.
./script/upload.py --overwrite

```

After re-uploading all distributions, publish again to upload the checksum file:

```sh
npm run release
```