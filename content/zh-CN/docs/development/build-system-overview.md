# 构建系统概述

Electron 使用 [gyp](https://gyp.gsrc.io/) 来生成项目 ，使用 [ninja](https://ninja-build.org/) 来构建项目. 项目配置可以在 `.gyp` 和 `.gypi` 文件中找到.

## Gyp 文件

下面的 `gyp` 文件包含了构建 Electron 的主要规则 :

<<<<<<< HEAD
* `atom.gyp` 定义了 Electron 它自己是怎样被构建的.
* `common.gypi` 调整 node 的构建配置，来让它结合 Chromium 一起构建.
* `vendor/brightray/brightray.gyp` 定义了 `brightray` 是如何被构建的，并且包含了默认配置来连接到 Chromium.
* `vendor/brightray/brightray.gypi` 包含了常用的创建配置.
=======
* `electron.gyp` defines how Electron itself is built.
* `common.gypi` adjusts the build configurations of Node to make it build together with Chromium.
* `brightray/brightray.gyp` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `brightray/brightray.gypi` includes general build configurations about building.
>>>>>>> electron/master

## 构建组件

在 Chromium 还是一个相当大的项目的时候，最后链接阶段会花了好几分钟，这让开发变得很困难. 为了解决这个困难，Chromium 引入了 "component build" ，这让每个创建的组建都是分隔开的共享库，让链接更快，但是这浪费了文件大小和性能.

在 Electron 中，我们采用了一个非常相似的方法 : 在创建 `Debug` , 二进制文件会被链接进入一个 Chromium 组件的共享版本库来达到快速链接; 在创建 `Release`, 二进制文件会被链接进入一个静态版本库, 所以我们可以有最小的二进制文件size和最佳的体验.

## 最小化引导

运行引导脚本时，将下载所有 Chromium 的预构建二进制文件（`libchromiumcontent`）。 默认情况下，将下载静态库和共享库，最终的大小应该在800MB到2GB之间，具体取决于平台。

默认的，`libchromiumcontent` 是从  Amazon Web Services 上下载下来的.如果设置了 `LIBCHROMIUMCONTENT_MIRROR` 环境变量，bootstrap脚本会从这里下载下来. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) 是 `libchromiumcontent` 的映射.如果你不能连接 AWS，你可以切换下载路径：`export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

如果只是想快速搭建一个 Electron 的测试或开发环境，可以通过 `--dev` 参数只下载共享版本的库:

```bash
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## 两阶段的项目生成

在 `Release` 和 `Debug` 构建的时候后，Electron 链接了不同配置的库 .然而 `gyp`不支持为不同的配置文件进行不同的链接设置.

为了规避这个问题，Electron 在运行 `gyp` 的时候，使用了一个 `gyp` 的变量 `libchromiumcontent_component`来控制应该使用哪个链接设置，并且只生成一个目标.

## 目标名称

与大多数的项目不同，它们使用 `Release` 和 `Debug` 作为目标名字，而 Electron 使用使用的是 `R` 和 `D`.这是因为如果只定义了一个 `Release` 或 `Debug` 构建配置，`gyp` 会随机崩溃，并且在同一时候，Electron 只生成一个目标，如上所述.

这只对开发者可用，如果想重新构建 Electron ，将不会成功.

## 测试

使用以下方式测试你的修改符合项目编码风格：

```bash
$ npm run lint
```

测试功能使用：

```bash
$ npm test
```

每当您更改Electron源代码时，都需要在测试之前重新运行构建：

```bash
$ npm run build && npm test
```

你可以通过分离特定的测试来让测试套件运行速度更快或阻止你目前正在使用摩卡的 [独占性测试](https://mochajs.org/#exclusive-tests) 功能. 只需将 `.only` 附加到任何 `describe` 或 `it` 函数调用中：

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

或者，您可以使用 mocha 的 `grep` 选项来只运行与给定正则表达式模式匹配的测试：

```sh
$ npm test -- --grep child_process
```

包含本地模块（例如`runas`）的测试无法在调试版本中执行 (查看 [#2558](https://github.com/electron/electron/issues/2558) 获取详情), 但它们将与发行版本一起使用。

要使用发行构建来运行测试：

```bash
$ npm test -- -R
```