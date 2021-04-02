# 在 macOS 中调试

如果你在 Electron 中遇到问题或者引起崩溃，你认为它不是由你的JavaScript应用程序引起的，而是由 Electron 本身引起的。调试可能有点棘手，特别是对于不习惯 native/C++ 调试的开发人员。 然而，使用 lldb 和 Electron 源代码，可以在 Electron 的源代码中使用断点启用逐步调试。 如果您希望用图形界面的开发工具，也可以使用[XCode for debugging](debugging-instructions-macos-xcode.md)。

## 要求

* **Electron 的调试版本**: 最简单的方法是自己构建它，使用 [macOS 的构建说明](build-instructions-macos.md) 中列出的工具和先决条件要求。 虽然您可以 连接到并调试电子，因为您可以直接下载它，但您 会发现它经过了大量优化，使得调试更加困难 ：调试器无法向您显示所有 变量的内容，执行路径可能因为内衬、 尾呼叫和其他编译器优化而显得很奇怪。

* **Xcode**: 除了 Xcode，还安装 Xcode 命令行工具. They include LLDB, the default debugger in Xcode on macOS. It supports debugging C, Objective-C and C++ on the desktop and iOS devices and simulator.

* **.lldbinit**：创建或编辑 `~/.lldbinit` ，以便正确绘制铬代码源。

   ```text
   命令脚本导入~/电子/src/工具/lldb/勒比尼特.py
   ```

## 附加并调试 Electron

要开始调试会话，打开终端并开始 `lldb`，通过一个非释放 电子作为参数构建。

```sh
$lldb ./出/测试/电子.app
（lldb）目标创建"。/出/测试/电子.app"
电流可执行设置为"。/出/测试/电子.app"（x86_64）。
```

### 设置断点

LLDB是一个强大的工具，支持进行多种策略的代码检查。 在这做一个基本的介绍，让我们假设你从 JavaScript 调用一个不正常的命令 - 所以你想打断该命令的 C++ 对应的 Electron 源。

相关代码文件可以在 `./shell/`中找到。

让我们假设你想调试 `app.setName()`, 在 `browser.cc` 中定义为 `Browser::SetName()`. 使用 `breakpoint` 命令进行断点，指定文件和断点位置:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

然后, 启动 Electron:

```sh
(lldb) run
```

应用程式会立即暂停，因为 Electron 会在启动时设定应用程序名称:

```sh
（lldb） 运行
过程 25244 启动： '/用户/fr/代码/电子/出/测试/电子.app/内容/MacOS/电子" （x86_64）
过程 25244 停止
* 线程#1： tid = 0x839a4c， 0x0000000100162db4电子框架原子：:Browser:： 设置名称 （0x0000000108b14f20， 名称 = "电子"） + 20 在 browser.cc:118， 队列 = "com. apple. 主线程"， 停止原因=断点1.1
    帧#0：0x0000000100162db4电子框架原子：:Browser:：设置名称（此=0x0000000108b14f20，名称="电子"）+20在 browser.cc:118
   115=
   116

   117 无效浏览器：：设置名称（续：：：字符串& 名称） [
-> 118 name_override_ = 名称; 119 =
   120
   121 int 浏览器*获取巴奇计数（）{
（lldb）
```

显示当前帧的参数和局部变量, 运行 `frame variable` (或 `fr v`), 这将显示你的应用程序当前设置名称为 “Electron”.

```sh
（lldb）帧变量
（原子：：浏览器*）此=0x0000000108b14f20
（续字符串 &）名称="电子"：{
    [...]
}
```

在当前选择的线程中执行源级单步执行, 执行 `step` (或 `s`). 这将带你进入 `name_override_.empty()`。 继续前进，步过，运行 `next` (或 `n`).

```sh
(lldb) step
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(
    this=0x0000000108b14f20, name="Electron"
) + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(
    this=0x0000000108b14f20, name="Electron"
) + 44 at browser.cc:119
   116
   117  void Browser::SetName(const std::string& name) {
   118    name_override_ = name;
-> 119  }
   120
   121  int Browser::GetBadgeCount() {
   122    return badge_count_;
```

**注意：** 如果您认为应该查看源代码，则可能没有添加上面的 `~/.lldbinit` 文件。

要完成此时的调试，运行 `process continue`。 你也可以继续，直到这个线程中的某一行被命中(`线程直到100`)。 此命令将在当前帧中运行线程，直到它到达此帧中的行100，或者如果它离开当前帧，则停止。

现在，如果你打开 Electron 的开发工具并调用 `setName`，你将再次命中断点。

### 进一步阅读

LLDB是一个强大的工具，有一个庞大的文档。 要了解更多，请考虑 Apple 的调试文档，例如 [LLDB 命令结构参考][lldb-command-structure] 或引入使用 LLDB 作为独立调试器</a>

。</p> 

你也可以查看LLDB的 [manual and tutorial][lldb-tutorial] 这将解释更复杂的调试场景.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-tutorial]: https://lldb.llvm.org/tutorial.html
