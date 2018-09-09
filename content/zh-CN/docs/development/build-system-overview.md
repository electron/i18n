# 构建系统概览

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## 构建组件

在 Chromium 还是一个相当大的项目的时候，最后链接阶段会花了好几分钟，这让开发变得很困难。 为了解决这个困难，Chromium 引入了 "component build" ，这让每个创建的组建都是分隔开的共享库，让链接更快，但是这浪费了文件大小和性能。

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## 测试

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

使用以下方式测试你的修改符合项目编码风格：

```sh
$ npm run lint
```

测试功能使用：

```sh
$ npm test
```

每当您更改Electron源代码时，都需要在测试之前重新运行构建：

```sh
$ npm run build && npm test
```

你可以通过分离特定的测试来让测试套件运行速度更快或阻止你目前正在使用摩卡的 [独占性测试](https://mochajs.org/#exclusive-tests)功能. 追加 `.only` 到任何 `describe` 或 `it` 函数调用：

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

或者，您可以使用 mocha 的 `grep` 选项来只运行与给定正则表达式模式匹配的测试

```sh
$ npm test -- --grep child_process
```

包含本地模块(例如`runas`)的测试无法在调试版本中执行 (查看 [#2558](https://github.com/electron/electron/issues/2558) 获取详情), 但它们将与发行版本一起使用。

要使用发行构建来运行测试：

```sh
$ npm test -- -R
```