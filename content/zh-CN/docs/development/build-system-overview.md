# 构建系统概览

Electron 使用 [GN](https://gn.googlesource.com/gn) 生成项目，并用 [Ninja](https://ninja-build.org/) 完成构建。 项目配置位于 `.gn` 和 `.gni` 文件中。

## GN 文件

下面的 `gn` 文件包含了构建 Electron 的核心规则:

* `BUILD.gn` 指明了如何构建 Electron，还包括与 Chromium 相关的默认配置。
* `build/args/{debug,release,all}.gn` 包含 Electron 的默认构建参数。

## 分块构建

由于 Chromium 项目及其庞大，最终的链接阶段往往需要数分钟，加大了开发难度。 为此，Chromium 采用了“分块构建”方式，将每个模块作为单独的动态库构建，虽然影响了文件大小和性能，但加快了链接速度，

Electron 也继承了 Chromium 这一构建方式。 在 `Debug` 模式下构建时，程序将与 Chromium 的动态库链接，以加快链接速度；而 `Release` 模式下程序则会与静态库链接，以优化程序大小和性能。

## 测试

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

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
describe.only('some feature', () => {
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
