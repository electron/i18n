# Ang Direktoryo ng Istraktura ng "Source Code"

Ang "source code" ng Elektron ay nakahiwalay sa ilang mga bahagi, kadalasan ay sinusundan nito ang magkahiwalay na mga kombensyon ng Chromium.

Kinakailangan mong maging pamilyar sa [Chromium's multi-process architecture](https://dev.chromium.org/developers/design-documents/multi-process-architecture) upang mas maunawaan ang "source code".

## Ang Istraktura ng "Source Code"

```sh
Electron
├── atom/ - C++ source code.
|   ├── app/ - System entry code.
|   ├── browser/ - Ang "frontend" kasama ang pangunahing window, UI, at ang lahat ng
|   |   mga bagay na pangunahing pinoproseso. Ito ang kumakausap sa "renderer" para pamahalaan ang mga pahina ng "web".
|   |   ├── ui/ - Pagpapatupad ng "UI stuff" para sa iba't-ibang "platform".
|   |   |   ├── cocoa/ - "Cocoa" espisipikong "source code".
|   |   |   ├── win/ - Windows GUI espisipikong: source code".
|   |   |   └── x/ - X11 espisipikong "source code".
|   |   ├── api/ - Ang pagpapatupad ng pangunahing proseso ng "APIs".
|   |   ├── net/ - Network na may kaugnayan sa "code".
|   |   ├── mac/ - Mac espesipikong "Objective-C source code".
|   |   └── resources/ - Icons, platform-dependent files, at iba pa.
|   ├── renderer/ - Ang "code" na pinapatakbo ng proseso ng "renderer".
|   |   └── api/ - Ang pagpapatupad ng proseso ng "renderer" ng "APIs".
|   └── common/ - Ang parehong pangunahin at mga proseso ng "renderer" ay gumamit ng "code", |       kasama ang ilang "utility functions" at "code" para maisama sa mensahe ng "node" |       umiikot sa loob ng "Chromium's message loop".
|       └── api/ - Ang pagpapatupad ng parehong APIs, ang mga pundasyon ng |           mga modyul na "built-in" sa Elektron.
├── chromium_src/ - Ang "source code" na kinokopya galing sa Chromium. Tingnan sa ibaba.
├── default_app/ - Ang pahina na "default" ay nagpapakita kapag ang Elektron ay nag-umpisa nang walang
|   binibigay na "app".
├── docs/ - Mga Dokumentasyon.
├── lib/ - Ang "source code" ng "JavaScript".
|   ├── browser/ - Ang pangunahing proseso ng inisyalisasyon ng "Javascript code".
|   |   └── api/ - Ang pagpapatupad ng Javascript API.
|   ├── common/ -Ang parehong pangunahin at "renderer processes" ay gumamit ng "JavaScript"
|   |   └── api/ - Ang pagpapatupad ng "Javascript API".
|   └── renderer/ - Ang "Javascript renderer" pinoproseso ang inisyalisasyon ng "code".
|       └── api/ - Ang pagpapatupad ng "Javascript API".
├── spec/ - Kusang pagsubok.
├── electron.gyp - Ang pagbuo ng mga panuntunan ng Elektron.
└── common.gypi - Ang tiyak na pagsasaayos ng kompayler at pagbuo ng mga panuntunan para sa ibang mga bahagi tulad `node` at `breakpad`.
```

## `/chromium_src`

Ang mga payl sa `/chromium_src` ay maaaring maging mga piraso ng Chromium na hindi kabilang sa "layer" nito. Halimbawa, upang maipatupad ang "Pepper API", tayo ay nangangailangan ng ilang "wiring" na pareho sa kung ano ang ginagawa sa opisyal na "Chrome". Maaari tayong magtayo ng mga mahahalagang "source" na may kinalaman bilang parte ng [libcc](../glossary.md#libchromiumcontent), ngunit kadalasan, hindi naman natin kailangan ang lahat ng mga tinatampok (maaaring ang iba ay sa nagmamay-ari nito, tulad ng mga bagay na analitiko) kaya kinukuha lang natin ang ilang bahagi ng "code". Ang mga ito ay madaling matatakpan sa "libcc", ngunit kapag dumating ang oras na ito'y nakasulat, ang layunin ng "libcc" ay mapanatili ang minimal na mga "patch" at ang mga pagbabago sa chromium_src ay marahil na lumaki. Tandaan din na ang mga "patch" ay 'di na maaari pang "i-upstream" 'di tulad ng ibang mga "libcc patch" na ating pinapanatili ngayon.

## Ang Istraktura ng Iba pang mga Direktoryo

* **iskrip** - Ang mga iskrip ay ginamit upang ang layunin ay mapaunlad tulad ng pagbuo, "packaging", "testing", at iba pa.
* **tools** - Katuwang ng mga iskrip na gamit ng "gyp files", di tulad ng `iskrip`, ang mga iskrip na inilagay dito ay di na dapat direktang gamitin pa ng mga gumagamit.
* **vendor** - Ang "source code" ng pangatlong partido ng mga dependency, tayo ay 'di gumagamit nito `third_party` bilang pangalan dahil ito'y nakakalito para sa kaparehong direktoryo sa "source code tree" ng "Chromium".
* **node_modules**, Ang pangatlong partido ng mga modyul ng "node" para sa pagbuo.
* **out** - Ang pansamantalang "output" ng direktoryo ng `ninja`.
* **dist** - Ang pansamantalang direktoryo na likha ng `script/create-dist.py` iskrip kapag gumagawa ng distribusyon.
* **external_binaries** - Ang "downloaded binaries" ng pangatlong partido ng mga balangkas ay di sinusuportahan ang pagbuo gamit ang `gyp`,.

## Pagpapanatili ng "Git Submodules" sa Tamang Oras

Ang Electron repository ay mayroon ilang "vendored dependencies", at matatagpuan sa direktoryo na [/vendor](https://github.com/electron/electron/tree/master/vendor). Paminsan-minsan, maaari mong makita ang mensahe tulad nito kapag tumatakbo ang `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

Upang "i-update" itong mga vendored dependencies, patakbuhin ang mga sumusunod na "command":

```sh
git submodule update --init --recursive
```

Kung ang "command" na ito ay iyong parating pinapatakbo, maaari kang lumikha ng "alias" para dito sa iyong payl na `~/.gitconfig`:

```sh
[alias]
    su = submodule update --init --recursive
```