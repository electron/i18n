# 测试

我们的目的是保持 Electron 代码的高覆盖率。 我们要求所有的pull request不仅要通过所有现有的测试，还要增加新的测试来覆盖变更的代码和新的场景。 我们要尽可能多地覆盖Electron应用中的代码路径和用例，以确保我们发布的应用程序都能拥有更少的bug。

这个仓库为 JavaScript 和 C ++ 提供了linting 规则 - 以及单元和集成测试。 通过 [coding-style](coding-style.md)文档来学习更多的Electron's编码风格

## 提示

为确保您的JavaScript符合Electron编码风格，请执行`npm run lint-js`，它将针对Electron本身以及单元测试运行`standard`测试。 如果您正在使用带有插件/插件系统的编辑器，那么可以使用[StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins)之类的插件在你提交代码前来检查编码规范。

若要用参数运行`standard`测试，首先执行`npm run lint-js --` 然后输入要传递给`standard`测试的参数。

要确保您的C ++代码符合Electron编码风格，请执行`npm run lint-cpp`，它将会执行`cpplint`脚本。 我们建议您使用`clang-format`并准备[一个简短的教程](clang-format.md)。

这个仓库中没有太多的Python代码，但是它也受编码风格规范的约束。使用`npm run lint-py`来检查Python的编码风格规范。当然你也可以使用`pylint`。

## 单元测试

要运行所有单元测试，请执行 `npm run test`。 单元测试其实也是一个Electron应用！你可以在`spec` 文件夹中找到它。 请注意，单元测试也有自己的 `package.json`，因此它的依赖没有在最顶层的`package.json`中定义。

若要通过匹配模式运行单个测试，可以执行 `npm run test --
-g=PATTERN`，把`PATTERN` 替换为匹配某个测试的正则表达式。 例：如果想运行IPC测试，你可以执行`npm run test -- -g ipc`。

### 在Windows10上测试

[一些 Windows 10 设备](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list)上没有默认安装Meriryo字体，这会导致字体回退测试的失败。 要安装Meiryo字体：

1. 按下Windows key并搜索 *管理可选功能*。
2. 单击*添加功能*
3. 选择*Japanese Supplemental Fonts*并单击 *安装*

由于浮点数精度误差，某些依赖于精确像素测量的测试可能无法正常在Hi-DPI屏幕的设备上工作。 为了使这些测试能正常运行，请确保设备的缩放比为100%。

要配置缩放比：

1. 按下Windows key并搜索*显示设置*.
2. 在*Scale and layout*下，确保缩放比为100%。