# Ang Direktoryo ng Istraktura ng "Source Code"

Ang "source code" ng Elektron ay nakahiwalay sa ilang mga bahagi, kadalasan ay sinusundan nito ang magkahiwalay na mga kombensyon ng Chromium.

Kinakailangan mong maging pamilyar sa [Chromium's multi-process architecture](https://dev.chromium.org/developers/design-documents/multi-process-architecture) upang mas maunawaan ang "source code".

## Ang Istraktura ng "Source Code"

```diff
Electron
├── atom/ - C++ source code.
|   ├── app/ - System entry code.
|   ├── browser/ - The frontend including the main window, UI, and all of the
|   |   |          main process things. This talks to the renderer to manage web
|   |   |          pages.
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
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── brightray/ - Thin shim over libcc that makes it easier to use.
├── chromium_src/ - Ang "source code" na kinokopya galing sa Chromium. Tingnan sa ibaba.
├── default_app/ - The default page to show when Electron is started without
|                  providing an app.
├── docs/ - Mga Dokumentasyon.
├── lib/ - Ang "source code" ng "JavaScript".
|   ├── browser/ - Ang pangunahing proseso ng inisyalisasyon ng "Javascript code".
|   |   └── api/ - Ang pagpapatupad ng Javascript API.
|   ├── common/ -Ang parehong pangunahin at "renderer processes" ay gumamit ng "JavaScript"
|   |   └── api/ - Ang pagpapatupad ng "Javascript API".
|   └── renderer/ - Ang "Javascript renderer" pinoproseso ang inisyalisasyon ng "code".
|       └── api/ - Ang pagpapatupad ng "Javascript API".
├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
|                  types between C++ and JavaScript.
├── spec/ - Kusang pagsubok.
└── BUILD.gn - Building rules of Electron.
```

## `/chromium_src`

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](../glossary.md#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

## Ang Istraktura ng Iba pang mga Direktoryo

* **iskrip** - Ang mga iskrip ay ginamit upang ang layunin ay mapaunlad tulad ng pagbuo, "packaging", "testing", at iba pa.
* **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
* **vendor** - Ang "source code" ng pangatlong partido ng mga dependency, tayo ay 'di gumagamit nito `third_party` bilang pangalan dahil ito'y nakakalito para sa kaparehong direktoryo sa "source code tree" ng "Chromium".
* **node_modules**, Ang pangatlong partido ng mga modyul ng "node" para sa pagbuo.
* **out** - Ang pansamantalang "output" ng direktoryo ng `ninja`.
* **dist** - Ang pansamantalang direktoryo na likha ng `script/create-dist.py` iskrip kapag gumagawa ng distribusyon.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

## Pagpapanatili ng "Git Submodules" sa Tamang Oras

Ang Electron repository ay mayroon ilang "vendored dependencies", at matatagpuan sa direktoryo na [/vendor](https://github.com/electron/electron/tree/master/vendor). Paminsan-minsan, maaari mong makita ang mensahe tulad nito kapag tumatakbo ang `git status`:

```sh
$ git status

    modified:   vendor/depot_tools (new commits)
    modified:   vendor/boto (new commits)
```

Upang hindi mahuli ang mga "vendored dependency", patakbuhin ang mga sumusunod na "command":

```sh
git submodule update --init --recursive
```

Kung ang "command" na ito ay iyong parating pinapatakbo, maaari kang lumikha ng "alias" para dito sa iyong payl na `~/.gitconfig`:

```sh
[alias]
    su = submodule update --init --recursive
```