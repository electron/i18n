# Paglalabas

Ang dokumentong ito ay nag papakita ng proseso ng pagpapalabas ng isang bagong bersyon ng Electron.

## Alamin kung mula sa aling sangay maglalabas

- **Kapag naglalabas ng isang beta,** paganahin ang skrip sa ibaba mula sa `master`.
- **Kung naglalabas ng isang matatag na bersyon,** paganahin na ang skrip sa ibaba mula sa `1-7-x` o `1-6-x`, depende kung sa aling bersyon ka maglalabas.

## Alamin kung anong pagbabago sa bersyon ang kinakailangan

Paganahin ang `npm run prepare-release -- --notesOnly` para makita ang awtomatikong nalikhang mga kopya sa paglalabas. Ang mga kopyang nabuo ay makakatulong upang matukoy kung ito ay major, minor, patch, o kaya beta na pagbabago ng bersyon. Basahin ang [Mga Patakaran sa Pagbabago ng Bersyon](../tutorial/electron-versioning.md#semver) para sa karagdagang impormasyon.

## Paganahing ang prepare-release na skrip

Ang prepare release na skrip ay gagawin ang mga sumusunod: 1. Tingnan ang isang lathala kung nasa proseso na at kung ganon ito ay ihinto na. 2. Gumawa ng isang panglathalang sangay. 3. Ibangga ang numero ng bersyon sa maraming mga file. Tingnan ang [bump commit na ito](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) bilang isang halimbawa. 4. Gumawa ng isang draft na lathala sa GitHub kasama ang mga awtomatikong nalikhang mga kopya ng lathala. 5. Itulak ang panlathalang sangay. 6. Tawagin ang mga API para paganahin ang mga panlathalang build.

Kung natukoy mo na kung aling uri ng bersyon ang kailangang baguhin, paganahin ang `prepare-release` na skripkasama ang mga argumento ayon sa iyong pangangailangan: - `[major|minor|patch|beta]` upang iangat ang isa sa mga numero ng bersyon, o - `--stable` upang ipahiwatig na ito ay isang matatag ang bersyon

Halimbawa:

### Pangunahing pagbabago sa bersyon

```sh
npm run prepare-release -- major
```

### Menor na pagbabago sa bersyon

```sh
npm run prepare-release -- minor
```

### Patch na pagbabago sa bersyon

```sh
npm run prepare-release -- patch
```

### Beta na pagbabago sa bersyon

```sh
npm run prepare-release -- beta
```

### Iangat mula beta papuntang stable

```sh
npm run prepare-release -- --stable
```

## Hintayin ang mga build :hourglass_flowing_sand:

Ang `prepare-release` na skrip ay magti-trigger sa mga build sa pamamagitan ng mga API na tawag. Upang masubaybayan ang estado ng pagbubuo, tingnan ang mga sumusunod na pahina:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) para sa Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) para sa OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) para sa Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) para sa Windows

## Tipunin ang mga kopya ng lathala

Ang pagsulat ng mga panlathalang kopya ay isang paraan upang mapanatiling abala ang iyong sarili habang tumatakbo ang mga build. Para sa naunang sining, tingnan ang mga naunang lathala sa [pahina ng mga lathala](https://github.com/electron/electron/releases).

Mga Mungkahi: - Ang bawat aytem na nakalista na ay kinakailangang isangguni sa isang PR sa electron/electron, hindi isang isyu, at hind rin PR na galing sa ibang repo katulad ng libcc. - Hindi na kailangang gamitin ang link na markup nagsasangguni ng mga PR. Ang mga string na kagaya ng `#123` ay awtomatikong isasalin sa mga link sa github.com. - Upang tingnan ang bersyon ng Chromioum, V8 at Node sa kada bersyon ng Electron, bisitahin ang [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Ang mga Patch na lathala

Para sa isang `patch` na lathala, gumamit ng mga sumusunod na pormat:

```sh
# # Kaayusan sa Bug 

* Naayos na ang isang cross-platform na bagay. #123

### Linux

* Naayos na isang Linux na bagay. #123

### macOS

* Naayos na ang isang macOS na bagay. #123

###Windows

* Naayos na ang isang Windows na bagay. #1234
```

### Mga Menor na Lathala

Para sa `menor` na lathala, e.g. `1.8.0`, gamitin ang pormat na ito:

```sh
## Mga Upgrade

- I-upgrade mula sa Node na`oldVersion' patungo sa 'newVersion'. #123 

## Mga pagbabago sa API 

* Nabago ang isang bagay. #123

### Linux

* Nabago ang isang Linux na bagay. #123

### macOS

* Nabago ang isang macOS bagay. #123

### Windows

* Nabago ang isang Windows na bagay. #123
```

### Mga Pangunahing Lathala

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

## Ilathala ang release

Once the release builds have finished, run the `release` script via `npm run release` to finish the release process. Ang script nato ay gagawin ang mga sumusunod. Gumawa ng proyekto para patunayan na tama ang numero ng bersyon na nailabas na. 2. I download ang binaries at i-generate ang node ng headers at ang .lib linker gamitin sa window sa pamamagitan ng node-gyp para mabuo ang negatibong modyul. 3. Gumawa at i-upload ang SHASUMS files na nakatabi sa S3 para sa node files. 4. Gumawa at i-upload ang SHASUMS256.txt file na nakatabi sa GitHub release. 5. Patunayan na ang lahat ng kinakailangang mga file na prinisinta sa GitHub at S3 at magkaroon ng tamang checksums gaya ng tinutukoy sa SHASUMS files. 6. Ilathala ang release sa GitHub 7. Tanggalin ang `release` na sangay.

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