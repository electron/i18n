# 在 C++ 代码中使用clang-tidy

[`叮当`](https://clang.llvm.org/extra/clang-tidy/) 是自动检查 C/C++/Objective-C 代码的样式冲突、编程 错误和最佳实践的工具。

电子的 `clang-tidy` 集成是作为一个绒毛脚本，可以 运行与 `npm run lint:clang-tidy`。 当 `clang-tidy` 检查您的磁盘 文件时，您需要构建 Electron，以便它知道使用了哪个编译器标志 。 脚本 `--output-dir`有一个必需选项，该选项 告诉构建目录的脚本，以提取编译信息 。 典型的用法是： `npm run lint:clang-tiy --out-dir ../out/Testing`

在没有提供文件名后，将检查所有 C/C++/目标 C 文件。 您可以在 选项后通过文件名来提供要检查的文件列表： `npm run lint:clang-tiy --out-dir ../out/Testing shell/browser/api/electron_api_app.cc`

虽然 `clang-tidy` 有一个 [长列表](https://clang.llvm.org/extra/clang-tidy/checks/list.html) 可能的检查，在电子只有少数在默认情况下启用。 在 时刻，电子没有 `.clang-tidy` 配置，因此 `clang-tidy` 在 `src/.clang-tidy` 找到铬的配置，并使用 铬启用的检查。 您可以使用 `--checks=` 选项更改哪些支票运行。 这是直接传递到 `clang-tidy`，所以请参阅 其文档的全部细节。 通配符可以使用，支票可以通过预缀 `-` 禁用。 默认情况下，列出的任何支票都添加到 那些在 `.clang-tidy`，所以如果你想限制在特定的 ，你应该首先排除所有的支票，然后添加回你想要的，像 `--checks=-*,performance*`。

运行 `clang-tidy` 是相当缓慢的 - 内部它编译每个文件，然后 运行检查，所以它总是比编译慢一些因素。 虽然您可以使用并行运行来加速使用 `--jobs|-j` 选项，但 `clang-tidy` 在检查过程中也使用了大量内存，因此它很容易 遇到内存外错误。 因此，默认作业数是其中之一。
