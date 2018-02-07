# Paglalathala

Ang dokumentong ito ay naglalarawan sa proseso ng paglalathala ng bagong bersyon ng Electron.

## Tukuyin kung sa aling sangay maglalathala

- **Kung naglalathala mula sa beta,** paganahin ang mga skript sa baba mula sa `master`.
- **Kung naglalathala mula sa matatag na bersyon,** paganahin ang mga skript sa baba `1-7-x` o `1-6-x`, depende kung saang bersyon ka maglalathala

## Alamin kung anong bersyon ang kinakailangan

Paganahin ang `npm run prepare-release -- --notesOnly` upang tingnan ang mga awtomatikong nilikhang mga kopya sa paglalathala. Ang mga nailalathalang mga kopya ay dapat nakakatulong sa inyong tukuyin kung ito ba ay isang pangunahin, menor, patch o bersyong pagbabago na beta. Basahin ang [Mga Panuntunan sa Pagbabao ng Bersyon](../tutorial/electron-versioning.md#semver) para sa karagdagang impormasyon.

## Paganahin ang prepare-release na skript

Gagawin ng prepare release na skript ang mga sumusunod: 1. Tingnan kung ang isang paglalathala ay nakaproseso na at kung totoo, titigil ito. 2. Lumikha ng sangay ng paglalathala. 3. I-bump ang numero ng bersyon sa maraming mga file. Tingnan ang [bump commit na ito](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) bilang isang halimbawa. 4. Lumikha ng isang ilalabas na draft sa Github gamit ang awtomatikong nalilikhang mga panlathalang kopya. 5. Pindutin ang panlathalang sangay. 6. Tawagin ang mga API upang paganahin ang mga panlathalang mga build.

Kapag nalaman mo na kung aling uri ng bersyon ang kinakailangan, paganahin ang `prepare-release` na skript kasama ang mga argumentong umaayon sa iyong mga kinakailangan: - `[major|minor|patch|beta]` upang ibahin ang isa sa mga bilang ng bersyon, o - `--stable` upang ipaalam na ito ang matatag na bersyon.

Halimbawa:

### Pangunahing Pagbabago sa Bersyon

```sh
npm run prepare-release -- major
```

### Menor na Pagbabago sa Bersyon

```sh
npm run prepare-release -- minor
```

### Patch na Pagbabago sa Bersyon

```sh
npm run prepare-release -- patch
```

### Beta na Pagbabago sa Bersyon

```sh
npm run prepare-release -- beta
```

### Gawing Matatag ang Beta

```sh
npm run prepare-release -- --stable
```

## Maghintay ng mga build :hourglass_flowing_sand:

Ang `prepare-release` na skript ay magpapagana sa mga the build sa pamamagitan ng mga API na tawag. Upang subaybayan ang pagbi-build, tingnan ang mga sumusunod na mga pahina:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) para sa Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) para sa OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) para sa Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) para sa Windows

## Pagsama-samahin ang mga panlathalang kopya

Ang pagsulat ng mga panlathalang mga kopya ay isang paraan upang panatilihing abala ang iyong sarili habang ang mga build ay gumagana pa. Para sa paunang sining, tingnan ang mga lathala sa [pahina ng mga lathala](https://github.com/electron/electron/releases).

Mga Mungkahi: - Ang bawat nailistang item ay dapat nakabatay sa isang PR sa electron/electron, hindi isang issue, o isang PR mula sa ibang repo katulad ng libcc. - Hindi na kailangan gumamit ng link markup kapag binabatayan ang mga PR. Ang mga string katulad ng `#123` ay awtomatikong sinasalin ang mga link sa github.com. - Upang tingnan ang bersyon ng Chromium, V8, at Node sa bawat bersyon ng Electron, bisitahin ang [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Mga patch na lathala

Para sa isang `patch` na lathala, gamitin ang sumusunod na format:

```sh
## Mga Kaayusan sa Bug

* Naayos ang isang cross-platform na bagay. #123

### Linux

* Naayos ang isang Linux na bagay. #123

### macOS

* Naayos ang isang macOS na bagay. #123

### Windows

* Naayos ang isang Windows na bagay. #1234
```

### Menor na mga lathala

Para sa isang `minor` na lathala, e.g. `1.8.0`, gamitin ang format na ito:

```sh
## Mga Upgrade

- Na-upgrade mula sa Node `oldVersion` papuntang `newVersion`. #123

## API na mga Pagbabago

* Binago ang isang bagay. #123

### Linux

* Binago ang isang Linux na bagay. #123

### macOS

* Binago ang isang macOS na bagay. #123

### Windows

* Binago ang isang Windows na bagay. #123
```

### Pangunahing mga Lathala

```sh
## Mga Upgrade

- Na-upgrade mula Chromium `oldVersion` papuntang `newVersion`. #123
- Na-upgrade mula Node `oldVersion` papuntang `newVersion`. #123

## Pag-iisa-isa sa mga API na pagbabago

* Binago ang isang bagay. #123

### Linux

* Binago ang isang Linux na bagay. #123

### macOS

* Binago ang isang macOS na bagay. #123

### Windows

* Binago ang isang Windows na bagay. #123

## Iba pang mga pagbabago

- Ilan pang mga pagbabao. #123
```

### Mga Beta na Lathala

Gamitin ang kaparehong format gaya ng iminungkahi sa itaas, pero idagdag ang sumusunod na paalala sa simula ng changelog:

```sh
**Tandaan:** Ito ay isang beta na lathala at hindi maiiwasang magkaroon ng ilang mga hindi pagkatatag at/o mga regresyon.

Mangyaring maglabas ng mga bagong issue para sa mga bug na makikita ninyo dito.

Ang lathalang ito ay inilathala sa [npm](https://www.npmjs.com/package/electron) sa ilalim ng `beta` na tag at pwedeng i-install sa pamamagitan ng `npm install electron@beta`.
```

## Baguhin ang panlathalang draft

1. Bisitahin ang [pahina ng mga lathala](https://github.com/electron/electron/releases) at makikita mo ang isang bagong draft na lathala na may placeholder na mga kopyang panlathala.
2. Baguhin ang lathala at idagdag ang mga kopyang panlathala.
3. Tanggalin ang tsek sa `prerelease` na checkbox kapag naglalabas ka ng matatag na lathala; pabayaan itong naka-tsek sa mga beta na lathala.
4. I-click ang 'Save draft'. **Wag i-click ang 'Publish release'!**
5. Hintaying dumaan ang lahat ng mga build bago magpatuloy.
6. Pwede mong paganahin ang `npm run release --validateRelease` upang patunayan na ang lahat ng iyong mga kinakailangang file ay nalikha na para sa paglathala

## Pag-isahin ang temporaryong sangay

Kapag natapos na ang mga release build, pag-isahin ang `release` na sangay pabalik sa pinagmulang sangay panlathala gamit ang `merge-release` na skript. Kapag ang sangay ay hindi kayang pag-isahin pabalik, ang skript na ito ay awtomatikong nire-rebase ang `release' na sangay at pinipilit ang mga pagbabago na nagpapagana ulit sa mga release build, ibig sabihin nito kailangan mong maghintay sa mga release build na gumana ulit bago ka makapagpatuloy.

### Pag-iisa pabalik sa master

```sh
npm run merge-release -- master
```

### Pag-iisa pabalik sa dating panlathalang sangay

```sh
npm run merge-release -- 1-7-x
```

## I-publish ang lathala

Kapag matagumpay ang pag-iisa, paganahin ang `release` na skript gamit ang `npm run release` upang tapusin ang proseso ng paglathala. Gagawin ng script ang mga sumusunod: 1. I-build ang proyekto upang patunayan ang tamang numero ng bersyon na inilathala. 2. I-download ang mga binary at lumikha ng mga node header at ng .lib linker na ginagamit sa Windows sa pamamagitan ng node-gyp upang gumawa ng mga native na modyul. 3. Lumikha at mag-upload ng mga SHASUMS na file na naiimbak sa S3 para sa mga node file. 4. Lumikha at mag-upload ng SHASUMS256.txt na file na naiimbak sa GitHub na lathala. 5. Patunayan na lahat ng kinakailangang file ay naroon sa GitHub at S3 at may tamang mga checksum na tinutukoy sa SHASUMS na mga file. 6. I-publish ang lathala sa GitHub 7. Tanggalin ang `release` na sangay.

## I-publish sa npm

Kapag matagumpay ang paglathala, paganahin ang `npm run publish-to-npm` upang i-publish ang lathala sa npm.

## Manu-manong ayusin ang mga nawawalang mga binary ng isang lathala

Sa kaso ng isang nasirang lathala dahil sa mga sirang CI machine, baka kakailanganin nating i-upload ulit ang mga binary para sa isang na-publish na lathala.

Ang unang hakbang ay pumunta sa [Mga Lathala](https://github.com/electron/electron/releases) na pahina at tanggalin ang mga nasirang binary gamit ang `SHASUMS256.txt` na checksum file.

Pagkatapos, manu-manong gumawa ng mga distribusyon para sa bawat plataporma at i-upload ang mga ito:

```sh
# Suriin ang bersyon na i-upload ulit.
git checkout vTHE.RELEASE.VERSION

# Gawin ang release build, habang tinutukoy ang isang target na arkitektura.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Payagan ang pag-o-overwrite ng isang na-publish na lathala.
./script/upload.py --overwrite
```

Pagkatapos ng pag-upload muli ng lahat ng mga distribusyon, i-publish muli ito upang ma-upload ang checksum file:

```sh
npm run release
```
