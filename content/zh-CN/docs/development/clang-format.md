# 在 C++ 代码中使用clang-tidy

[`clang-format`](https://clang.llvm.org/docs/ClangFormat.html)是一个自动格式化 C/C++/Objective-C 代码的工具, 可以让开发人员不需要担心代码审查期间的样式问题.

强烈建议在发起请求之前格式化已更改的 C++ 代码，这将节省您和审阅者的时间.

你可以通过 `npm install -g clang-format` 安装 `clang-format` 和 `git-clang-format`.

要根据电子C++代码样式自动格式化文件，请运行 `clang-format -i path/to/electron/file.cc`。 它应该适用于马科斯/Linux/视窗。

格式化已更改代码的工作流:

1. 在 Electron 存储库中更改代码.
2. 运行 `git add your_changed_file.cc`.
3. 运行 `git-clang-format`, 然后你将可能会看到修改后的 `your_changed_file.cc`, 这些修改是从 `clang-format` 生成的.
4. 运行 `git add your_changed_file.cc`, 并提交你的修改.
5. 现在准备好的分支推送请求已经被打开.

如果你想在最新的 git 提交 （HEAD） 上格式化更改的代码，您可以 运行 `git-clang-format HEAD~1`。 有关详细信息，请参阅 `git-clang-format -h` 。

## 编辑器集成

您还可以将 `clang-format` 直接集成到您最喜爱的编辑器中。 有关设置编辑器集成的进一步指导，请参阅以下页面：

* [Atom](https://atom.io/packages/clang-format)
* [Vim & Emacs](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
* [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
