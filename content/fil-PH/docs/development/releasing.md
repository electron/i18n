# Ilalabas

Ang Dokumentong ito ay nag papakita ng proseso ng pag papalabas ng bersyon ng Electron.

## Alamin kung aling sangay nagmula ang ilalabas

- **If releasing beta,** paganahin ang scrip sa ilalim ng `master`.
- **If releasing a stable version,** paganahin na ang script sa ilalim ng `1-7-x` ok kaya `1-6-x`, depende kung anung bersyon ang ilalabas.

## Alamin kung alung bersyon ang nabago ito ay kinakailangan

Paganahin ang `npm run prepare-release -- --notesOnly` para makita ang kusang pag generate ng paglabas ng mga tala. Ang mga talang nabuo ay makakatulong upang matukoy kung ito ay major, minor, patch, o kaya beta na nabago ang bersyon. Read the [Version Change Rules](../tutorial/electron-versioning.md#semver) para sa karagdagang impormasyon.

## Paganahing ang prepare-release script

Ang hanada ng ilabas na script ay gagawin ang mga sumusunod: 1. Tingnan ang nilabas kung nasa proseso na at kung ganon ito ay ihinto na. 2. Gumawa ng isang sangay na ilalabas. 3. I-Bump ang numero ng bersyon ng ilang files. Tingnan ang [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) isang halimbawa. 4. Gumawa ng isang draft na I rerelease sa GitHub kasama ang auto-generated na release ng mga tala. 5. Itulak ang paglabas ng sangay. 6. Tawagin ang API para paganahin ang release builds.

Kung natukoy mo na kung aling type ng bersyon ang kailangang baguhin. paganahin ang `prepare-release` script sa argumento ayon sa iyong pangangailangan: - `[major|minor|patch|beta]` pagtaas ng isa sa mga numero ng bersyon. O - `--stable` upang ito ay ipahiwatig na matatag ang bersyon

Halimbawa:

### Major ng bersyon ay nabago

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

## Hintayin ang builds :hourglass_flowing_sand:

Ang `prepare-release` script ay nag-trigger sa builds sa pamamagitan ng API calls. para masubaybayan ang pagbuo ng proseso. tingnan ang mga sumusunod na pahina:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) ito ay para sa Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) ito ay para sa OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) ito ay para sa Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) ito ay para sa Windows

## Tipunin ang mga tala ng release

Isulat ang mga tala ng release ito ay mabuting paraan upang mapanatiling abala ang iyong sarili habang tumatakbo ang builds. Para sa bagong art, tingnan kung merong releases sa [the releases page](https://github.com/electron/electron/releases).

Tips: - Ang bawat aytem na nakalista na ay kinakailangang isangguni sa PR sa electron/electron, hindi ito isyu, at hind rin PR na galing sa ibang repo katulad ng libcc. - Hindi na kailangang gamitin ang link na markup kapag tinutukoy ay ang PRs. Ang mga string na kagaya ng `#123` ay awtomatikong na convert na sa links ng github.com. - Maaaring tingnan ang mga bersyon ng Chromioum, V8 at Node ang kada bersyon ng Electron, bisitahin ang [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Ang Patch releases

Para sa `patch` release, gumamit ng mga sumusunod na format:

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

Para sa `minor` release, e.g. `1.8.0`, gamitin ang format na ito:

```sh
## Upgrades

- I-upgrade ang Node ' mula sa lumang bersyon' patungo sa 'bagong berston'. #123 

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
**Paalala:** eto ay beta release at malamang na magkakaroon ng ilang kawalang katatagan o regressions.

Mangyaring mag file ng bagong isyu para sa anumang bug na makikita mo dito.

Ang release na to ay nailathala sa [npm] (https://www.npmjs.com/package/electron) sa ilalim ng 'beta' I tag at maaring i-instal sa pamamagoitan ng `npm install electron@beta`.
```

## I-edit ang release draft

1. Bisitahin ang [the releases page](https://github.com/electron/electron/releases) at makikita mo ang bagong draft na narelease kasama ng placeholder release ng mga tala.
2. I-edit ang release at magdagdag ng mga release notes.
3. Tanggalan ng tsek ang `prerelease` checkbox kung kayo ay maglalathala ng isang matatag na release; iwanan itong naka tsek para sa beta release.
4. Ipindutin ang 'Save draft'. **Do not click 'Publish release'!**
5. Antayin ang lahat ng build na pumasa bago magpatuloy.
6. You can run `npm run release -- --validateRelease` to verify that all of the required files have been created for the release.

## Pagsamahin ang mga sangay ng pansamantala

Kapag ang release builds ay tapus na. Pagsamahin ang `release` pabalik sa pinang galingang sangay ng release gamit ang `merge-release` script. Kung branch hindi maging matagumpay nagsanib muli ang script na ito ay awtomatikong rebase ang `release ng` branch at itulak ang mga pagbabago na kung saan ay mag-trigger ang release builds muli, na ibig sabihin ay kailangan mong maghintay para sa release build na gumana muli bago magpatuloy.

### Pagsamasamahin pabalik sa master

```sh
npm paganahin ang merge-release -- master
```

### Pagsamasamahin pabalik sa lumang sangay ng release

```sh
npm paganahin ang merge-release -- 1-7-x
```

## Ilathala ang release

Kapag ang pagsasama ay matagumpay na natapos. paganahin ang `release` script sa pamamagitan ng `npm run release` upang tapusin ang proseso ng release. Ang script nato ay gagawin ang mga sumusunod. Gumawa ng proyekto para patunayan na tama ang numero ng bersyon na nailabas na. 2. I download ang binaries at i-generate ang node ng headers at ang .lib linker gamitin sa window sa pamamagitan ng node-gyp para mabuo ang negatibong modyul. 3. Gumawa at i-upload ang SHASUMS files na nakatabi sa S3 para sa node files. 4. Gumawa at i-upload ang SHASUMS256.txt file na nakatabi sa GitHub release. 5. Patunayan na ang lahat ng kinakailangang mga file na prinisinta sa GitHub at S3 at magkaroon ng tamang checksums gaya ng tinutukoy sa SHASUMS files. 6. Ilathala ang release sa GitHub 7. Tanggalin ang `release` na sangay.

## Ilathala sa npm

Sa sandaling ang paglathala ay matagumpay, tumakbo `npm patakbuhin ang paglathala sa npm` mailathala sa release sa npm. mailathaka sa release sa npm.

## Ayusin ang mga nawawalang binary ng release ng mano-mano

Sa kaso ng isang nasirang release na may sirang CI machines, maaari nating muling i-upload ang binary para sa isang nailathalang release.

Ang unang hakbang ay pumunta sa [Releases](https://github.com/electron/electron/releases) pahina at tanggalin ang nasirang binary kasama ang `SHASUMS256.txt` checksum file.

Pagkatapos ay imanu-manong gawin ang pag-distribusyon para sa bawat platform at i-upload ang mga ito:

```sh
# Tingnan ang bersyon na muling i-upload.
git checkout vTHE.RELEASE.VERSION # gawin ang release build, pagtukoy ng isang target sa arkitektura.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

#Malinaw na pinayagan i-overwriting ang nailathala na release.
./script/upload.py --overwrite
```

Matapos muling pag-upload ang lahat distribusyon, ilathala muli upang mag-upload ang checksum:

```sh
npm paganahin ang release
```