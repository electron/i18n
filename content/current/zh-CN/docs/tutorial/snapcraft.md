# Snapcraft 指南 (Ubuntu 软件中心 & 更多)

本指南提供了有关如何包装你的 Electron 应用程序的任何 Snapcraft 环境, 包括 Ubuntu 软件中心的信息。

## 背景和要求

与更广泛的 Linux 社区一起, 规范旨在解决 [` snapcraft `](https://snapcraft.io/) 项目中的许多常见的软件安装问题。 Snaps 是容器化的软件包, 包括所需的依赖项、自动更新和对所有主要 Linux 发行版的工作, 而无需进行系统修改。

创建 `.snap` 文件有三种方法:

1) 使用 [`electron-forge`](https://github.com/electron-userland/electron-forge) 或 [`electron-builder`](https://github.com/electron-userland/electron-builder), 与 `snap` 支持的两个工具都不在该框中。 这是最简单的选择。 2) 使用 `electron-installer-snap`, 它采用 `electron-packager` 的输出。 3) 使用已经创建的 `.deb` 包。

在某些情况下，您需要安装 `快照` 工具。 Instructions to install `snapcraft` for your particular distribution are available [here](https://snapcraft.io/docs/installing-snapcraft).

## 使用 `electron-installer-snap`

该模块的工作原理与[` electron-winstaller `](https://github.com/electron/windows-installer)类似 因为它的范围仅限于构建捕捉包。 你可以这样安装:

```sh
npm install --save-dev electron-installer-snap
```

### 步骤 1: 打包你的 Electron 应用程序

打包应用程序使用 [electron-packager](https://github.com/electron/electron-packager) (或类似工具)。 请务必删除 `node_modules` 您在您的 最后应用程序中不需要 因为您不需要任何模块，您将会增加 您的应用程序的大小。

结构输出应该看起来大致像这样:

```plaintext
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
        ├── resources
        ├── v8_context_snapshot.bin
        └── version
```

### 步骤 2: 运行 `electron-installer-snap`

从一个在 `PATH`中有 `快照` 的终端， 运行 `electron-installer-snap` 带唯一需要的参数 `--src`, 这是你打包的位置 Electron 应用程序创建在第一步。

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

如果您有一个现有的构建管道，您可以程序性地使用 `electron-installer-snap` 欲了解更多信息，请参阅 [Snapcraft API 文档](https://docs.snapcraft.io/build-snaps/syntax)。

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## 使用一个现有的 Debian 包

Snapcraft 能够拿起现有的 `.deb` 文件并将其转换为 一个 `.snap` 文件。 创建吸附器使用 `快照配器。 aml` 文件描述了源、依赖、描述和其他核心 基础块。

### 步骤 1: 创建一个 Debian 包

如果您还没有一个 `.deb` 包，使用 `electron-installer-snap` 可能是一个更容易创建吸附包的路径。 然而，存在多个创建 Debian 软件包的解决方案 ，包括 [`Electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### 步骤 2: 创建一个 snapcraft.yaml

关于可用配置选项的更多信息，请在快照语法</a> 上查看文档。 Let's look at an example:</p> 



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


或者，如果您正在构建您的 `吸附` 带有 `严格的` 封装，您 可以使用 `桌面启动` 命令：



```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```
