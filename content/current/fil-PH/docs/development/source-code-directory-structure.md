# Ang Direktoryo ng Istraktura ng "Source Code"

Ang "source code" ng Elektron ay nakahiwalay sa ilang mga bahagi, kadalasan ay sinusundan nito ang magkahiwalay na mga kombensyon ng Chromium.

Kinakailangan mong maging pamilyar sa [Chromium's multi-process architecture](https://dev.chromium.org/developers/design-documents/multi-process-architecture) upang mas maunawaan ang "source code".

## Ang Istraktura ng "Source Code"

```diff
Electron
├── build/ - Build configuration files needed to build with GN.
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron's documentation.
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - Images used in documentation.
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript source code.
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   ├── remote/ - Logic that handes use of the remote module in
|   |   |             the main process.
|   |   └── web-view/ - Logic that handles the use of webviews in the
|   |                   renderer process.
|   ├── sandboxed_renderer/ - Logic that handles creation of sandboxed renderer
|   |   |                     processes.
|   |   └── api/ - API implementation for sandboxed renderer processes.
|   └── worker/ - Logic that handles proper functionality of Node.js
|                 environments in Web Workers.
├── patches/ - Patches applied on top of Electron's core dependencies
|   |          in order to handle differences between our use cases and
|   |          default functionality.
|   ├── boringssl/ - Patches applied to Google's fork of OpenSSL, BoringSSL.
|   ├── chromium/ - Patches applied to Chromium.
|   ├── node/ - Patches applied on top of Node.js.
|   └── v8/ - Patches applied on top of Google's V8 engine.
├── shell/ - C++ source code.
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
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Building rules of Electron.
```

## Ang Istraktura ng Iba pang mga Direktoryo

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - Ang pansamantalang direktoryo na likha ng `script/create-dist.py` iskrip kapag gumagawa ng distribusyon.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.
* **node_modules**, Ang pangatlong partido ng mga modyul ng "node" para sa pagbuo.
* **npm** - Logic for installation of Electron via npm.
* **out** - Ang pansamantalang "output" ng direktoryo ng `ninja`.
* **iskrip** - Ang mga iskrip ay ginamit upang ang layunin ay mapaunlad tulad ng pagbuo, "packaging", "testing", at iba pa.
```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```
* **tools** - Helper scripts used by GN files.
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies, including `boto` and `requests`.

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
