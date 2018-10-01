# 测试

我们的目标是保持 Electron 代码的高覆盖率。 我们要求所有的拉取请求不仅要通过所有现有的测试，还要增加新的测试来覆盖改变的代码和新的场景。 确保我们尽可能多地捕获Electron的代码路径和用例，以确保我们所有的应用程序都能够运行更少的bug。

这个仓库为 JavaScript 和 C ++ 提供了linting 规则 - 以及单元和集成测试。 To learn more about Electron's coding style, please see the [coding-style](coding-style.md) document.

## 提示

为确保您的JavaScript符合Electron编码风格，请运行`npm run lint-js`，它将针对Electron本身以及单元运行`标准`测试。 如果您正在使用带有插件/插件系统的编辑器，则可能需要使用多个 [StandardJS插件](https://standardjs.com/#are-there-text-editor-plugins)之一来通知编码风格违规。

要用参数运行`标准测试`，运行`npm run lint-js --` 然后输入要传递给`标准测试`的参数。

要确保您的C ++符合Electron编码风格，请运行运行`cpplint`脚本的`npm run lint-cpp`。 我们建议您使用`clang-format`并准备[一个简短的教程](clang-format.md)。

这个版本库中没有太多的Python，但是它也受编码风格规则的支配。 `npm run lint-py`将使用`pylint`检查所有的Python。

## 单元测试

要运行所有单元测试，请运行 `npm run test`。 单元测试是一个 Electron 应用程序(惊喜！)，可以在`spec`文件夹中找到。 请注意，它有自己的 `package.json`，因此它的依赖关系没有在顶层`package.json`中定义。

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.