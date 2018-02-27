# Paglalabas

Ang dokumentong ito ay nagpapakita ng proseso ng pagpapalabas ng isang bagong bersyon ng Electron.

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

- Na-upgrade mula sa Node na`oldVersion' patungo sa 'newVersion'. #123 

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
## Mga Upgrade

- Na upgrade mula sa Chromium na 'oldVersion' patungo sa 'newVersion'. #123
- Na-upgrade mula sa Node na`oldVersion' patungo sa 'newVersion'. #123 

## Paghahati sa mga API na pagbabago

* Nabago ang isang bagay. #123

### Linux

* Nabago ang isang Linux na bagay. #123

### macOS

* Nabago ang isang macOS bagay. #123

### Windows

* Nabago ang isang Windows na bagay. #123

## Iba pang mga pagbabago 

- Ilang pang pagbabago. #123
```

### Beta na mga lathala

Gamitin ang kaparehong mga pormat katulad ng iminungkahi sa itaas, ngunit idagdag ang sumusunod na paalala sa simula ng changelog:

```sh
**Paalala:** Ito ay isang beta na lathala at malamang ay magkakaroon ng ilang kawalang katatagan o mga regresyon.

Mangyaring mag-file ng bagong isyu para sa anumang bug na makikita mo dito.

Ang lathalang to ay nailathala sa [npm] (https://www.npmjs.com/package/electron) sa ilalim ng `beta` na tag at maaring i-install sa pamamagitan ng `npm install electron@beta`.
```

## Baguhin ang draft ng lathala

1. Bisitahin ang [pahina ng mga lathala](https://github.com/electron/electron/releases) at makikita mo ang bagong draft na lathala kasama ng placeholder na lathala.
2. Baguhin ang lathala at magdagdag ng mga kopya ng lathala.
3. Tanggalin ng tsek sa `prerelease` na checkbox kung ikaw ay naglalathala ng isang matatag na lathala; pabayaan itong naka tsek para sa beta na mga lathala.
4. Pindutin ang 'Save draft'. **Huwag pindutin ang 'Publish release'!**
5. Hintayin ang lahat ng build na pumasa bago magpatuloy.
6. Maaari mong paganahin ang `npm run release -- --validateRelease` upang patunayan na ang lahat ng mga kinakailangang file ay nalikha na para sa lathala.

## Ilathala ang lathala

Kapag ang mga panlathalang build ay natapos na, paganahin ang `release` na skrip gamit ang `npm run release` upang matapos ang proseso ng paglathala. Ang iskrip na ito ay gagawin ang mga sumusunod: 1. Itayo ang proyekto para patunayan na tama ang numero ng bersyon na inilalabas. 2. I-download ang mga binary at lumikha ng mga node header at ang .lib na linker na ginamit sa Windows sa pamamagitan ng node-gyp para mabuo ang mga native na modyul. 3. Gumawa at i-upload ang SHASUMS na mga file na inipon sa S3 para sa mga node na file. 4. Gawin at i-upload ang SHASUMS256.txt file na inipon sa GitHub na lathala. 5. Patunayan na ang lahat ng kinakailangang mga file na ay nasa GitHub at S3 at may mga tamang checksum gaya ng tinutukoy sa SHASUMS na mga file. 6. Ilathala ang release sa GitHub 7. Tanggalin ang `panlathalang` sangay.

## Ilathala sa npm

Sa sandaling ang paglathala ay matagumpay, paganahin ang `npm run publish-to-npm` upang mailathala sa release sa npm.

## Ayusin ang mga nawawalang binary ng isang lathala nang mano-mano

Sa kaso ng isang nasirang release na may sirang CI na mga makina, maaari nating muling i-upload ang mga binary para sa isang nailathalang release.

Ang unang hakbang ay pumunta sa [Mga Lathala](https://github.com/electron/electron/releases) na pahina at tanggalin ang nasirang mga binary kasama ang `SHASUMS256.txt` na checksum file.

Pagkatapos ay manu-manong gawin ang distribusyon para sa bawat plataporma at i-upload ang mga ito:

```sh
# Tingnan ang bersyon na muling i-upload.
git checkout vTHE.RELEASE.VERSION

# Gawin ang release build, habang tinutukoy ang isang target sa arkitektura.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Lubos na payagan ang pag-overwrite ng nailathalang release.
./script/upload.py --overwrite
```

Matapos ng muling pag-upload ng lahat ng mga distribusyon, ilathala muli upang ma-upload ang checksum na file:

```sh
npm run release
```