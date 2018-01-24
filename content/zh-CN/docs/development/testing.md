# 测试

我们的目标是保持 Electron 代码的高覆盖率。 我们要求所有的拉取请求不仅要通过所有现有的测试，还要增加新的测试来覆盖改变的代码和新的场景。 确保我们尽可能多地捕获Electron的代码路径和用例，以确保我们所有的应用程序都能够运行更少的bug。

这个仓库为 JavaScript 和 C ++ 提供了linting 规则 - 以及单元和集成测试。 要了解有关Electron编码风格的更多信息，请参阅[coding-style(coding-style.md)文档。

## Linting

To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

这个版本库中没有太多的Python，但是它也受编码风格规则的支配。 `npm run lint-py`将使用`pylint`检查所有的Python。

## 单元测试

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only a selected number of tests, run `npm run test -match=NAME`, replacing the `NAME` with the file name of the test suite you would like to run. As an example: If you want to run only IPC suites, you would run `npm run test -match=ipc`.