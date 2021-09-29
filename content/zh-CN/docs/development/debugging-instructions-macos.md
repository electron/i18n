# 在 macOS 中调试

如果你在 Electron 中遇到问题或者引起崩溃，你认为它不是由你的JavaScript应用程序引起的，而是由 Electron 本身引起的。调试可能有点棘手，特别是对于不习惯 native/C++ 调试的开发人员。 然而，使用 lldb 和 Electron 源代码，可以在 Electron 的源代码中使用断点启用逐步调试。 如果您希望用图形界面的开发工具，也可以使用[XCode for debugging](debugging-instructions-macos-xcode.md)。

## 要求

* **Electron 的调试版本**: 最简单的方法是自己构建它，使用 [macOS 的构建说明](build-instructions-macos.md) 中列出的工具和先决条件要求。 While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Xcode**: 除了 Xcode，还安装 Xcode 命令行工具. They include LLDB, the default debugger in Xcode on macOS. It supports debugging C, Objective-C and C++ on the desktop and iOS devices and simulator.

* **.lldbinit**: Create or edit `~/.lldbinit` to allow Chromium code to be properly source-mapped.

   ```text
   # e.g: ['~/electron/src/tools/lldb']
   script sys.path[:0] = ['<...path/to/electron/src/tools/lldb>']
   script import lldbinit
   ```

## 附加并调试 Electron

To start a debugging session, open up Terminal and start `lldb`, passing a non-release build of Electron as a parameter.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) target create "./out/Testing/Electron.app"
Current executable set to './out/Testing/Electron.app' (x86_64).
```

### 设置断点

LLDB是一个强大的工具，支持进行多种策略的代码检查。 在这做一个基本的介绍，让我们假设你从 JavaScript 调用一个不正常的命令 - 所以你想打断该命令的 C++ 对应的 Electron 源。

Relevant code files can be found in `./shell/`.

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
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/Testing/Electron.app/Contents/MacOS/Electron' (x86_64)
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118
   115  }
   116
   117  void Browser::SetName(const std::string& name) {
-> 118    name_override_ = name;
   119  }
   120
   121  int Browser::GetBadgeCount() {
(lldb)
```

显示当前帧的参数和局部变量, 运行 `frame variable` (或 `fr v`), 这将显示你的应用程序当前设置名称为 “Electron”.

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
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

**NOTE:** If you don't see source code when you think you should, you may not have added the `~/.lldbinit` file above.

要完成此时的调试，运行 `process continue`。 你也可以继续，直到这个线程中的某一行被命中(`线程直到100`)。 此命令将在当前帧中运行线程，直到它到达此帧中的行100，或者如果它离开当前帧，则停止。

现在，如果你打开 Electron 的开发工具并调用 `setName`，你将再次命中断点。

### 进一步阅读

LLDB是一个强大的工具，有一个庞大的文档。 To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference][lldb-command-structure] or the introduction to [Using LLDB as a Standalone Debugger][lldb-standalone].

You can also check out LLDB's fantastic [manual and tutorial][lldb-tutorial], which will explain more complex debugging scenarios.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
[lldb-tutorial]: https://lldb.llvm.org/tutorial.html
