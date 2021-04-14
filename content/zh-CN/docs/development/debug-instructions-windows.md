# 在 Windows 中调试

如果你在 Electron 中遇到问题或者引起崩溃，你认为它不是由你的JavaScript应用程序引起的，而是由 Electron 本身引起的。调试可能有点棘手，特别是对于不习惯 native/C++ 调试的开发人员。 但是，使用 Visual Studio、Electron 托管的符号服务器、 和电子源代码，您可以在电子源代码内使用断点实现分步调试 。

**另见**： 在铬开发者网站上，有大量有关调试铬的信息，其中大部分也适用于电子： [调试视窗上的铬](https://www.chromium.org/developers/how-tos/debugging-on-windows)。

## 要求

* **Electron 的调试版本**: 最简单的方法是自己构建它，使用 [Windows 的构建说明](build-instructions-windows.md)中列出的工具和先决条件要求。 虽然您可以 连接到并调试电子，因为您可以直接下载它，但您 会发现它经过了大量优化，使得调试更加困难 ：调试器无法向您显示所有 变量的内容，执行路径可能因为内衬、 尾呼叫和其他编译器优化而显得很奇怪。

* **Visual Studio 与 C++ 工具**: Visual Studio 2013 和 Visual Studio 2015 的免费社区版本都可以使用。 安装后， [配置视觉工作室，使用电子符号服务器](setting-up-symbol-server.md)。 它将使 Visual Studio 能够更好地理解 Electron 中发生的事情，从而更容易以人类可读的格式呈现变量。

* **ProcMon**: [免费的 SysInternals 工具][sys-internals]允许您检查进程参数，文件句柄和注册表操作。

## 附加并调试 Electron

要启动调试会话，请打开 PowerShell/CMD 并执行 Electron 的调试版本，使用应用程序作为参数打开。

```powershell
$。/出/测试/电子.exe~/我的电子应用程序/
```

### 设置断点

然后，打开 Visual Studio。 Electron 不是使用 Visual Studio 构建的，因此不包含项目文件 - 但是您可以打开源代码文件 "As File"，这意味着 Visual Studio 将自己打开它们。 您仍然可以设置断点 - Visual Studio 将自动确定源代码与附加过程中运行的代码相匹配，并相应地中断。

相关代码文件可以在 `./shell/`中找到。

### 附加

您可以将 Visual Studio 调试器附加到本地或远程计算机上正在运行的进程。 进程运行后，单击 调试 / 附加 到进程(或按下 `CTRL+ALT+P`) 打开“附加到进程”对话框。 您可以使用此功能调试在本地或远程计算机上运行的应用程序，同时调试多个进程。

如果Electron在不同的用户帐户下运行，请选中 `显示所有用户的进程` 复选框。 请注意，根据您的应用程序打开的浏览器窗口数量，您将看到多个进程。 典型的单窗口应用程序将导致 Visual Studio 向您提供两个 `Electron.exe` 条目 - 一个用于主进程，一个用于渲染器进程。 因为列表只给你的名字，目前没有可靠的方法来弄清楚哪个是。

### 我应该附加哪个进程?

主过程内执行的代码（即主 JavaScript 文件中找到的或最终运行 的代码）将在主过程内运行，而其他 代码将在其各自的渲染器过程中执行。

您可以在调试时附加到多个程序，但在任何时候只有一个程序在调试器中处于活动状态。 您可以在 `调试位置` 工具栏或 `进程窗口` 中设置活动程序。

## 使用 ProcMon 观察进程

虽然 Visual Studio 非常适合检查特定的代码路径，但 ProcMon 的优势在于它可以监视应用程序对操作系统的所有操作 - 捕获进程的文件，注册表，网络，进程和分析详细信息。 它试图记录发生的 **所有** 事件，并且可能是相当压倒性的，而且果你想了解你的应用程序对操作系统做什么和如何做，它则是一个很有价值的资源。

有关 ProcMon 的基本和高级调试功能的介绍，请查看Microsoft提供的 [视频教程][procmon-instructions].

[sys-internals]: https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx
[procmon-instructions]: https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor
