# Ilalabas

Ang Dokumentong ito ay nag papakita ng proseso ng pag papalabas ng bersyon ng Electron.

## Alamin kung aling sangay nagmula ang ilalabas

- **If releasing beta,** patakbuhin ang scrip sa ilalim ng `master`.
- **If releasing a stable version,** paganahin na ang script sa ilalim ng `1-7-x` ok kaya `1-6-x`, depende kung anung bersyon ang ilalabas.

## Hanapin kung aling bersyon ang nabago ito ay kinakailangan

Paganahin ang `npm run prepare-release -- --notesOnly` para makita ang kusang pag generate ng paglabas ng mga tala. Ang mga talang nabuo ay makakatulong upang matukoy kung ito ay major, minor, patch, o kaya beta na nabago ang bersyon. [Version Change Rules](../tutorial/electron-versioning.md#semver) para sa karagdagang impormasyon.

## Paganahing ang prepare-release script

Ang hanada ng ilabas na script ay gagawin ang mga sumusunod: 1. Tingnan ang nilabas kung nasa proseso na at kung ganon ito ay ihinto na. 2. Gumawa ng isang sangay na ilalabas. 3. Bump the version number in several files. Tingnan ang [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) para sa halimbawa. 4. Gumawa ng isang draft na I rerelease sa GitHub kasama ang auto-generated na release ng mga tala. 5. Itulak ang pag release ng mga sangay. 6. Tawagin ang API para paganahin ang release ng builds.

Kung natukoy mo na kung aling type ng bersyon ang kailangang baguhin. Patakbuhin ang `prepare-release` script sa argumento ayon sa iyong pangangailangan: - `[major|minor|patch|beta]` pagtaas sa isa sa mga numero ng bersyon. O - `--stable` upang ito ay ipahiwatin na matatag ang bersyon

Halimbawa:

### Pangunahing pagbabago ng bersyon

```sh
npm paganahin ang prepare-release -- major
```

### Minor ng bersyon ay nabago

```sh
npm paganahin ang prepare-release -- minor
```

### Patch ng bersyon ay nabago

```sh
npm paganahin ang prepare-release -- patch
```

### Patch ng bersyon ay nabago

```sh
npm paganahin ang prepare-release -- beta
```

### Pataasin ang beta para maging maayos

```sh
npm paganahin ang prepare-release -- stable
```

## Hintayin ang pagkabuo ng :hourglass_flowing_sand:

Ang `prepare-release` script ang nag-trigger ng pagkabuo ng via API calls. para masubaybayan ang pagbuo ng proseso. tingnan ang mga sumusunod na pahina:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) ito ay para sa Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) ito ay para sa OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) ito ay para sa Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) ito ay para sa Windows

## Tipunin ang mga talang na i-release na

Isulatang mga talang na ito ay mabuting paraan upang mapanatiling abala ang iyong sarili habang tumatakbo ang builds. Para sa naunang art, tingnan ung mga dating nailabas na sa [the releases page](https://github.com/electron/electron/releases).

Tips: - Ang bawat aytem na nakalista na ay kinakailangang isangguni sa PR sa electron/electron, hindi ito isyu, at hind rin PR na galing sa ibang repo katulad ng libcc. - Hindi na kailangang gamitin ang link markup kapag tinutukoy ay ang PRs. Ang mga string na kagaya ng `#123` ay awtomatikong na convert na sa links ng github.com. - para makita ang mga bersyon ng Chromioum, V8 at Node ang kada bersyon ng Electron, bisitahin ang [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Ang Patch ay nailabas na

Para sa `patch` na nilabas, gumamit ng mga sumusunod na format:

```sh
# # Bug fix 

* Naayos na ang bahagi ng cross-platform na ito. #123

### Linux

* Naayos na ang bahagi ng Linux. #123

### macOS

* Naayos na ang bahagi ng macOS. #123

###Windows

* Naayos na ang bahagi ng Windows. #1234
```

### Mga Minor na nailabas na

Para sa `minor` na nilabas, e.g. `1.8.0`, gamitin ang format na ito:

```sh
- Itinaas ang Node ' mula sa lumang bersyon' patungo sa 'bagong berston'. #123 

## Mga pagbabago sa ApI 

* Nabago ang isang bahagi. #123

### Linux

* Nabago ang isang bahagi ng Linux. #123

### macOS

* Nabago ang isang bahagi macOS. #123

### Windows

* Nabago ang isang bahagi Windows. #123
```

### Mga pangunahing nilabas

```sh
## Upgrades

- Upgraded na ang Chromium mula sa 'lumang bersyon' patungo sa 'bagong bersyon'. #123
- Itinaas ang Node ' mula sa lumang bersyon' patungo sa 'bagong bersyon'. #123 

## Mga paglabag sa ApI na nabago

* Nabago ang isang bahagi. #123

### Linux

* Nabago ang isang bahagi ng Linux. #123

### macOS

* Nabago ang isang bahagi macOS. #123

### Windows

* Nabago ang isang bahagi Windows. #123

## Iba pang pagbabago 

- yun iba ay nabago. #123
```

### Beta na release

Gumamit ng kaparehong format nanakatulad katulad ng naimungkahi na sa itaas. Ngunit dagdagan ang mga sumusunod na tala sa simula ng changelog:

```sh
**Note:** This is a beta release and most likely will have have some instability and/or regressions.

Mangyaring mag file ng bagong isyu para sa anumang bug na makikita mo dito.

Ang release na to ay nailathala sa [npm] (https://www.npmjs.com/package/electron) sa ilalim ng 'beta' I tag at maaring i-instal sa pamamagoitan ng `npm install electron@beta`.
```

## I-edit ang release draft

1. Bisitahin ang [the releases page](https://github.com/electron/electron/releases) at makikita mo ang bagong draft na narelease kasama ng placeholder release ng mga tala.
2. I-edit ang release at magdagdag ng mga release notes.
3. Tanggalan ng tsek ang `prerelease` checkbox kung kayo ay maglalathala ng isang matatag na release; iwanan itong naka tsek para sa beta release.
4. Ipindutin ang 'Save draft'. **Do not click 'Publish release'!**
5. Antayin ang lahat ng build na pumasa bago magpatuloy.
6. Maari mong paganahin ang `npm run release --validateRelease` para ma i-verify na ang lahat na kailangan files para makagawa ng para sa release.

## Pagsamahin ang mga sangay ng pansamantala

Kapag ang release builds ay tapus na. Pagsamahin ang `release` pabalik sa pinang galingang sangay ng release gamit ang `merge-release` script. Kung branch hindi maging matagumpay nagsanib muli ang script na ito ay awtomatikong rebase ang `release ng` branch at itulak ang mga pagbabago na kung saan ay mag-trigger ang release builds muli, na ibig sabihin ay kailangan mong maghintay para sa release build na gumana muli bago magpatuloy.

### Pagsamasamahin pabalik sa master

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