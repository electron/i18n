# Paggamit sa Native Node na mga Modyul

Ang native Node na mga modyul ay sinusuportahan ng Electron, pero dahil ang Electron ay madalas gumagamit ng ibang V8 na bersyon mula sa binary ng Node na naka-install sa iyong system, kailangang manu-mano mong tukuyin ang kinalalagyan ng mga header ng Electron kapag gumagawa ng native na modyul.

## Paano mag-install ng native na mga modyul

May tatlong mga paraan sa pag-install ng native na mga modyul:

### Paggamit ng `npm`

Sa pagtatakda ng ilang mga varyabol na pang-environment, maaari kang gumamit ng `npm` sa direktang pag-iinstall ng modyul.

Isang halimbawa ng pag-iinstall ng lahat ng mga dependency para sa Electron:

```sh
# Bersyon ng Electron.
export npm_config_target=1.2.3
# Ang arkitektura ng Electron, pwedeng ia32 o x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# I-download ang mga header para sa Electron.
export npm_config_disturl=https://atom.io/download/electron
# Sinasabihan ang node-pre-gyp na naglilikha tayo para sa Electron.
export npm_config_runtime=electron
# Sinasabihan ang node-pre-gyp to gumawa ng module mula sa pinagmulang code.
export npm_config_build_from_source=true
# I-install ang lahat ng mga dependency, at iponin ang cache sa ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Pag-iinstall ng mga modyul at pagre-rebuild para sa Electron

Pwede mong piliing i-install ang mga modyul katulad ng ibang mga Node na proyekto, at pagkatapos ay i-rebuild ang mga modyul para sa Electron gamit ang paketeng [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Ang modyul na ito ay makakakuha ng bersyon ng Electron at makakahawak ng mga manu-manong hakbang sa pagda-download ng mga header at paggawa ng native na modyul para sa iyong app.

Isang halimbawa ng pag-iinstall ng `electron-rebuild` at pagkatapos, gumawa ng mga modyul kasama ito:

```sh
npm install --save-dev electron-rebuild

# kapag pinapatakbo mo ang "npm install", paganahin ito:
./node_modules/.bin/electron-rebuild

# Sa Windows kung may problema, subukan ito:
.\node_modules\.bin\electron-rebuild.cmd
```

### Manu-manong pagtatayo para sa Electron

Kung ikaw ay isang tagabuo na gumagawa ng native na modyul at gustong suriin ito kontra Electron, baka gusto mong manu-manong mag-rebuild ng modyul para sa Electron. Pwede mong direktang gamitin ang `node-gyp` upang maglikha para sa Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

Ang `HOME=~/.electron-gyp` ay nagbabago sa lokasyon ng mga development header. Ang `--target=1.2.3` ay bersyon ng Electron. Ang `--dist-url=...` ay nagtutukoy kung saan ida-download ang mga header. Ang `--arch=x64` ay nagsasabing ang modyul ay ginawa para sa 64bit na sistema.

## Paghahanap ng ProblemaPaghahanap ng Problema

Kung naka-install ka ng isang native na modyul at nalamang hindi ito gumagana, kailangan mong tingnan ang mga sumusunod na mga bagay:

* Ang arkitektura ng modyul ay dapat tugma sa arkitektura ng Electron (ia32 o x64).
* Pagkatapos mong i-upgrade ang Electron, kadalasan kailangan mong i-rebuild ang mga modyul.
* Kung hindi sigurado, paganahin muna ang `electron-rebuild`.

## Mga Modyul na nakadepende sa `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Kung ang mga modyul ay nagbibigay ng mga binary para sa paggamit nito sa Electron, siguraduhing wag isali ang `--build-from-source` at ang `--build-from-source` na varyabol pang-environment upang magamit nang husto ang mga binary na prebuilt.

## Mga modyul na nakadepende sa `node-pre-gyp`

Ang [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) ay nagbibigay ng paraan sa pag-deploy ng native na mga node modyul gamit ang mga prebuilt na mga binary, at maraming mga sikat na modyul ang gumagamit nito.

Kadalasan ang mga modyul na ito ay gumagana nang maayos sa ilalim ng Electron, pero minsan kapag gumagamit ang Electron ng mas bagong bersyon ng V8 kaysa Node, at may pagbabago sa ABI, maraming hindi magagandang mga bagay ang posibleng mangyari. Kaya sa pangkalahatan, inirerekomenda na palaging gamitin ang build native na mga module mula sa pinagmulang code.

Kung sinusunod mo ang paraang `npm` sa pag-iinstall ng mga modyul, magagawa ito nang naka-default, kung hindi, kailangan mong ipasa ang `--build-from-source` sa `npm`, o i-set ang `npm_config_build_from_source` na varyabol pag-environment.