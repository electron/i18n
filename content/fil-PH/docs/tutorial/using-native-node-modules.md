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

### Manually building for a custom build of Electron

To compile native Node addons against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## Paghahanap ng ProblemaPaghahanap ng Problema

Kung naka-install ka ng isang native na modyul at nalamang hindi ito gumagana, kailangan mong tingnan ang mga sumusunod na mga bagay:

- Ang arkitektura ng modyul ay dapat tugma sa arkitektura ng Electron (ia32 o x64).
- `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Pagkatapos mong i-upgrade ang Electron, kadalasan kailangan mong i-rebuild ang mga modyul.
- Kung hindi sigurado, paganahin muna ang `electron-rebuild`.

### A note about `win_delay_load_hook`

On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Mga Modyul na nakadepende sa `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Kung ang mga modyul ay nagbibigay ng mga binary para sa paggamit nito sa Electron, siguraduhing wag isali ang `--build-from-source` at ang `--build-from-source` na varyabol pang-environment upang magamit nang husto ang mga binary na prebuilt.

## Mga modyul na nakadepende sa `node-pre-gyp`

Ang [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) ay nagbibigay ng paraan sa pag-deploy ng native na mga node modyul gamit ang mga prebuilt na mga binary, at maraming mga sikat na modyul ang gumagamit nito.

Kadalasan ang mga modyul na ito ay gumagana nang maayos sa ilalim ng Electron, pero minsan kapag gumagamit ang Electron ng mas bagong bersyon ng V8 kaysa Node, at may pagbabago sa ABI, maraming hindi magagandang mga bagay ang posibleng mangyari. Kaya sa pangkalahatan, inirerekomenda na palaging gamitin ang build native na mga module mula sa pinagmulang code.

Kung sinusunod mo ang paraang `npm` sa pag-iinstall ng mga modyul, magagawa ito nang naka-default, kung hindi, kailangan mong ipasa ang `--build-from-source` sa `npm`, o i-set ang `npm_config_build_from_source` na varyabol pag-environment.