# Yayınlanma

Bu belgede, Electron'un yeni bir sürümünün yayınlanma süreci açıklanmaktadır.

## Hangi dalın yayınlanacağını belirleyin

- **Beta sürümünü yayımlarsanız,** aşağıdaki komut dosyalarını `ana sunucudan` çalıştırın.
- **Sabit bir sürümü yayınlarsanız,** hangi sürüm için yayınladığınıza bağlı olarak `1-7 x` veya `1-6-x` arasındaki komut dosyalarını çalıştırın.

## Hangi sürüm değişikliğine ihtiyaç olduğunu bulun

Otomatik olarak oluşturulan sürüm notlarını görüntülemek için `npm run prepare-release -- --notesOnly` 'i çalıştırın. Oluşturulan notlar bunun büyük, küçük, düzeltme eki veya beta sürümü değişikliği olup olmadığını belirlemenize yardımcı olmalı. Daha fazla bilgi için [Sürüm Değiştirme Kuralları](../tutorial/electron-versioning.md#semver) 'nı okuyun.

## Hazırlama-yayımlama komut dosyasını çalıştırın

Hazırlama betiği aşağıdakileri yapar. 1. Sürümün halihazırda işlemde olup olmadığını kontrol eder ve işlemdeyse durur. 2. Serbest dal oluşturun. 3. Sürüm numarasını birkaç dosyaya atayın. Bir örnek için [bu atama işine](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) bakın. 4. Otomatik oluşturulmuş sürüm notlarıyla GitHub'da bir taslak sürüm oluşturun. 5. Yayınlama koluna tıklayın. 6. Sürüm yapılarını çalıştırmak için API'ları çağırın.

Hangi sürüm değişikliğinin gerektiğini belirledikten sonra, ihtiyaçlarınıza göre bağımsız değişkenlerle birlikte `hazırlama sürümünü` çalıştırın: bunun istikrarlı bir sürüm olduğunu belirtmek için - `[major | minor | patch beta]` sürüm numaralarından birini artırın veya - `--sabit`

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

`hazırlama-sürümü` betiği, API çağrıları yoluyla yapıları tetikleyecektir. Yapı ilerlemesini izlemek için, aşağıdaki sayfalara bakın:

- Mac App Store için [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity)
- OS X için [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity)
- Linux için [circleci.com/gh/electron](https://circleci.com/gh/electron)
- Windows için [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron)

## Sürüm notlarını derleyin

Sürüm notları yazmak, yapılar çalışırken kendinizi meşgul etmek için iyi bir yoldur. Önceki oluşturulanlar için [bülten sayfasında](https://github.com/electron/electron/releases) mevcut sürümlere bakın.

İpuçları: - Listelenen her madde, elektron / elektron hakkında bir PR'ye, bir sorun değil, başka bir repo'ya, yani libcc gibi bir PR'ye atıfta bulunmalıdır. - PR'leri referans alırken bağlantı işaretlemesini kullanmanıza gerek yok. `# 123` gibi dizeler, otomatik olarak github.com'daki bağlantılara dönüştürülecektir. Electron'un her sürümünde Chromium, V8 ve Düğüm sürümlerini görmek için,[atom.io/download/electron/index.json](https://atom.io/download/electron/index.json) adresini ziyaret edin.

### Yama sürümleri

Bir `yama` sürümü için aşağıdaki biçimi kullanın:

```sh
## Hata düzeltmeleri

*Platformlar arası bir olay düzeltildi. #123

###Linux

*Bir Linux olayı düzeltildi. #123

###macOS

*Bir macOS olayı düzeltildi. #123

###Windows

*Bir Windows olayı düzeltildi. #1234
```

### Alt sürümler

`Alt` sürümler için, örn. `1.8.0`, bu biçimi kullanın:

```sh
##Yükseltmeler

-'eskiSürüm' Node 'dan 'yeniSürüm' e yükseltildi. #123

## API Değişiklikleri

*Bir şey değiştirildi. #123

## Linux

* Bir Linux olayı değiştirildi. #123

### macOS

* Bir macOS olayı değiştirildi. #123

### Windows

* Bir Windows olayı değiştirildi. #123
```

### Üst sürümler

```sh
## Yükseltmeler

-'eskiSürüm' Chromium 'dan 'yeniSürüm' e yükseltildi. #123
-'eskiSürüm' Node 'dan 'yeniSürüm' e yükseltildi. #123

## API değişiklikleri kırılıyor

* Bir şey değiştirildi. #123

## Linux

* Bir Linux olayı değiştirildi. #123

### macOS

* Bir macOS olayı değiştirildi. #123

### Windows

* Bir Windows olayı değiştirildi. #123

## Diğer Değişiklikler

- Başka bir değişiklik daha var. #123
```

### Beta sürümleri

Yukarıda önerilenlerle aynı biçimleri kullanın, ancak değişiklik notunun başına aşağıdaki notu ekleyin:

```sh
**Not:** Bu bir beta sürümüdür ve muhtemelen biraz istikrarsızlık ve/veya gerileme yaşayacaktır.

Please file new issues for any bugs you find in it.

This release is published to [npm](https://www.npmjs.com/package/electron) under the `beta` tag and can be installed via `npm install electron@beta`.
```

## Edit the release draft

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit the release and add release notes.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Click 'Save draft'. **Do not click 'Publish release'!**
5. Wait for all builds to pass before proceeding.
6. You can run `npm run release --validateRelease` to verify that all of the required files have been created for the release.

## Merge temporary branch

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. If the branch cannot be successfully merged back this script will automatically rebase the `release` branch and push the changes which will trigger the release builds again, which means you will need to wait for the release builds to run again before proceeding.

### Merging back into master

```sh
npm run merge-release -- master
```

### Merging back into old release branch

```sh
npm run merge-release -- 1-7-x
```

## Publish the release

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## Publish to npm

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