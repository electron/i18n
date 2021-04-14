# Snapcraft 指南 (Ubuntu 软件中心 & 更多)

本指南提供了有关如何包装你的 Electron 应用程序的任何 Snapcraft 环境, 包括 Ubuntu 软件中心的信息。

## 背景和要求

与更广泛的 Linux 社区一起, 规范旨在解决 [` snapcraft `](https://snapcraft.io/) 项目中的许多常见的软件安装问题。 Snaps 是容器化的软件包, 包括所需的依赖项、自动更新和对所有主要 Linux 发行版的工作, 而无需进行系统修改。

创建 `.snap` 文件有三种方法:

1) 使用 [`electron-forge`][electron-forge] 或 [`electron-builder`][electron-builder], 与 `snap` 支持的两个工具都不在该框中。 这是最简单的选择。 2) 使用 `electron-installer-snap`, 它采用 `electron-packager` 的输出。 3) 使用已经创建的 `.deb` 包。

在某些情况下，您需要安装 `snapcraft` 工具。 安装特定发行版的 `snapcraft` 的指南[在这里](https://snapcraft.io/docs/installing-snapcraft)能看到。

## 使用 `electron-installer-snap`

该模块的工作原理与[` electron-winstaller `][electron-winstaller]类似 因为它的范围仅限于构建捕捉包。 你可以这样安装:

```sh
npm install --save-dev electron-installer-snap
```

### 步骤 1: 打包你的 Electron 应用程序

打包应用程序使用 [electron-packager][electron-packager] (或类似工具)。 请务必删除 `node_modules` 您在您的 最后应用程序中不需要 因为您不需要任何模块，您将会增加 您的应用程序的大小。

结构输出应该看起来大致像这样:

```plaintext
.
└---dist
    └--应用程序-linux-x64
        ├--许可证
        ├--许可证。-铬.html
        ├---content_shell.pak
        ├---应用程序 ├
        ├----冰.dat
        ├----自由-所以.11
        ├----libnode.so
        ├----将资源
        ├-资源
        ├----v8_context_snapshot.bin
        └--版本
```

### 步骤 2: 运行 `electron-installer-snap`

从一个在 `PATH`中有 `快照` 的终端， 运行 `electron-installer-snap` 带唯一需要的参数 `--src`, 这是你打包的位置 Electron 应用程序创建在第一步。

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

如果您有一个现有的构建管道，您可以程序性地使用 `electron-installer-snap` 欲了解更多信息，请参阅 [快照工艺 API 文档][snapcraft-syntax]。

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## 使用 `snapcraft` 与 `electron-packager`

### 第 1 步：创建示例 Snapcraft 项目

创建你的项目目录并将以下内容添加到 `snap/snapcraft.yaml`：

```yaml
名称： 电子包装机 - 你好世界
版本： '0.1'
摘要： 你好世界电子应用程序
描述： |
  个简单的你好世界电子应用程序作为一个例子
基地： 核心 18
限制： 严格的
等级： 稳定的

应用程序：
  电子包装机 - 你好世界：
    命令： 电子快速启动 / 电子快速启动 - 无沙盒
    扩展： [gnome-3-34]
    插头：
    - 浏览器支持
    - 网络
    - 网络绑定
    环境：
      # 纠正铬框架/电子的 TMPDIR 路径，以确保
      # libappinator 具有可读资源。
      TMPDIR： $XDG_RUNTIME_DIR

部件：
  电子快速启动：
    插件：零
    源：https://github.com/electron/electron-quick-start.git
    覆盖生成：|
        npm安装电子包装器
        npx电子包装机。 -覆盖 - 平台=linux - 输出=释放-生成 - 修剪]真实
        cp-rv./电子-快速启动-linux-* $SNAPCRAFT_PART_INSTALL/电子-快速启动
    生成快照
    - 节点/14/稳定
    构建包：
    - 解齐
    阶段包：
    - libns3
    - libnspr4
```

如果要将此示例应用于现有项目：

- 替代 `source: https://github.com/electron/electron-quick-start.git</0 > 为 <code>source: ..`.
- 替代所有的 `electron-quick-start` 为你的项目名称。

### 第 2 步：构建 snap

```sh
$捕捉工艺

<output snipped>
捕捉电子包装机 - 你好 - world_0. 1_amd64. 快照
```

### 第 3 步：安装 snap

```sh
苏多捕捉安装电子包装机-你好-world_0.1_amd64.快照-危险
```

### 第 4 步：运行 snap

```sh
电子包装机 - 你好世界
```

## 使用一个现有的 Debian 包

Snapcraft 能够拿起现有的 `.deb` 文件并将其转换为 一个 `.snap` 文件。 创建吸附器使用 `快照配器。 aml` 文件描述了源、依赖、描述和其他核心 基础块。

### 步骤 1: 创建一个 Debian 包

如果您还没有一个 `.deb` 包，使用 `electron-installer-snap` 可能是一个更容易创建吸附包的路径。 然而，创建 Debian 包的多种解决方案 存在，包括 [`electron-forge`][electron-forge]、 [`electron-builder`][electron-builder] 或 [`electron-installer-debian`][electron-installer-debian]。

### 步骤 2: 创建一个 snapcraft.yaml

有关可用配置选项的更多信息，请参阅快照工艺语法</a>上的文档。 让我们来看看一个例子：</p> 



```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

等级：稳定的
禁闭：经典

部分：
  松弛：
    插件：转储
    源：我的dib.deb
    源类型：deb
    后：
      -桌面-gtk3
    阶段包：
      -libasound2
      - linot
      4 - libnspr4
      - libns3
      - libpcre3
      - libpulse0
      - libxs1
      - libxtst6
  电子发射：
    插件： 转储
    来源： 文件 /
    准备： |
      chmod +x bin/电子发射

应用程序：
  我的应用程序：
    命令： 垃圾箱/电子发射 $SNAP/usr/lib/myApp/myApp
    桌面： usr/共享/应用程序/myApp.桌面
    # 纠正铬框架/电子的 TMPDIR 路径，以确保
    # 图书馆具有可读资源。
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```


正如你所看到的， `snapcraft.yaml` 指示系统启动一个名为 `electron-launch`的文件 。 在此示例中，它将信息传递到 应用的二进制文件：



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

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
