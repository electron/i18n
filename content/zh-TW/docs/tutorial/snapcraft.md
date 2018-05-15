# Snapcraft 導引 (包含 Ubuntu 軟體中心)

This guide provides information on how to package your Electron application for any Snapcraft environment, including the Ubuntu Software Center.

## 背景及需求說明

Together with the broader Linux community, Canonical aims to fix many of the common software installation problems with the [`snapcraft`](https://snapcraft.io/) project. Snaps are containerized software packages that include required dependencies, auto-update, and work on all major Linux distributions without system modification.

有三種方式可以建立 `.snap` 檔:

1) Using [`electron-forge`](https://github.com/electron-userland/electron-forge) or [`electron-builder`](https://github.com/electron-userland/electron-builder), both tools that come with `snap` support out of the box. This is the easiest option. 2) Using `electron-installer-snap`, which takes `electron-packager`'s output. 3) Using an already created `.deb` package.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap install snapcraft --classic
```

While it *is possible* to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

## 使用 `electron-installer-snap`

The module works like [`electron-winstaller`](https://github.com/electron/windows-installer) and similar modules in that its scope is limited to building snap packages. You can install it with:

```sh
npm install --save-dev electron-installer-snap
```

### 第 1 步: 打包你的 Electron 應用程式

Package the application using [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

The output should look roughly like this:

```text
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── natives_blob.bin
        ├── resources
        ├── snapshot_blob.bin
        └── version
```

### 第 2 步: 執行 `electron-installer-snap`

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`已在 ${snapPath} 中建立 snap!`))
```

## 使用既有的 Debian 套件

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### 第 1 步: 建立 Debian 套件

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### 第 2 步: 建立 snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 你知道嗎? 這個 app 超讚的! 什麼事都幫你做好了。 有人說用了之後整個人都年輕了起來，好像也更快樂了呢。

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:

      - desktop-gtk3
    stage-packages:
      - libasound2
      - libgconf2-4
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # 將 Chromium Framework/Electron 的 TMPDIR 路徑改對，
    # 確保 libappindicator 可以讀到資源。
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # 將 Chromium Framework/Electron 的 TMPDIR 路徑改對，
    # 確保 libappindicator 可以讀到資源。
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```