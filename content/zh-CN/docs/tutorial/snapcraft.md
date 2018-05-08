# Snapcraft 指南 (Ubuntu 软件中心 & 更多)

本指南提供了有关如何包装你的 Electron 应用程序的任何 Snapcraft 环境, 包括 Ubuntu 软件中心的信息。

## 背景和要求

与更广泛的 Linux 社区一起, 规范旨在解决 [` snapcraft `](https://snapcraft.io/) 项目中的许多常见的软件安装问题。 Snaps 是容器化的软件包, 包括所需的依赖项、自动更新和对所有主要 Linux 发行版的工作, 而无需进行系统修改。

创建 `.snap` 文件有三种方法:

1) 使用 [`electron-forge`](https://github.com/electron-userland/electron-forge) 或 [`electron-builder`](https://github.com/electron-userland/electron-builder), 与 `snap` 支持的两个工具都不在该框中。 这是最简单的选择。 2) 使用 `electron-installer-snap`, 它采用 `electron-packager` 的输出。 3) 使用已经创建的 `.deb` 包。

在所有情况下, 都需要安装 `snapcraft` 工具。我们建议在 Ubuntu 16.04 (或当前的) 上建立。

```sh
snap install snapcraft --classic
```

虽然 * 可以 * 在使用自制程序的 macOS 上安装 ` snapcraft `, 但它无法生成 ` snap ` 包, 并且集中于管理存储中的包。

## 使用 `electron-installer-snap`

该模块的工作原理与[` electron-winstaller `](https://github.com/electron/windows-installer)类似 因为它的范围仅限于构建捕捉包。 你可以这样安装:

```sh
npm install --save-dev electron-installer-snap
```

### 步骤 1: 打包你的 Electron 应用程序

打包应用程序使用 [electron-packager](https://github.com/electron-userland/electron-packager) (或类似工具)。 Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

结构输出应该看起来大致像这样:

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

### 步骤 2: 运行 `electron-installer-snap`

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## 使用一个现有的 Debian 包

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### 步骤 1: 创建一个 Debian 包

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### 步骤 2: 创建一个 snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

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
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
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
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```