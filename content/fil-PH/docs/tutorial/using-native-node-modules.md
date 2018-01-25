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

## Paghahanap ng Problema

If you installed a native module and found it was not working, you need to check following things:

* The architecture of the module has to match Electron's architecture (ia32 or x64).
* After you upgrade Electron, you usually need to rebuild the modules.
* When in doubt, run `electron-rebuild` first.

## Modules that rely on `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to easily publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.