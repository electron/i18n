# 性能

开发者经常询问优化 Electron 应用程序性能的策略。 软件工程师、用户和框架开发者并不总是就“性能”的含义达成单一定义。 此文档概述了Electron 维护者最喜欢的减少内存使用、 CPU 负载以及磁盘资源使用的方式。以确保您的应用程序能够响应用户输入并尽快完成操作。 此外，我们希望所有的性能策略都能保持您应用的高标准安全。

关于如何使用 JavaScript构建高性能网站的技巧和方法通常也适用于Electron 应用程序。 在某种程度上，讨论如何构建高性能 Node.js 应用的方法同样也适用。但是小心理解“性能”一词的含义对于 Node.js 后端和客户端程序并不相同。

文中的列表提供了一些方便，同时也需要注意，它和我们的[安全性检查列表][security]类似，并不详尽。 即使你参照了下面提到的所有步骤，依然有可能构建出来一个性能低的Electron应用。 Electron是一个强大的开发平台，可以让开发人员按照自己所想，做更多的或更少的事情。 而这种自由的代价就是开发者需要承担大部分性能上的责任。

## 再三权衡

以下列举了一些直截了当、易于实现的方式。 但是，如果你想构建性能最优秀的应用，仅仅这些是不够的。 你需要仔细检查应用中运行的所有代码，认真地进行分析和衡量。 瓶颈在哪里？ 当用户点击按钮时，哪些操作的执行占用了最多的时间？ 当应用程序被挂起时，哪些对象占用了最多的内存？

通过多次的尝试，我们发现，构建高性能的Electron应用程序，最成功的策略是分析正在运行的代码，查找其中最耗资源的部分，然后对其进行优化。 一遍又一遍地重复这个“搬砖”的过程，将极大地提高应用程序的性能。 在大型应用程序（例如Visual Studio Code、Slack）中的实践经验证明了这是目前最可靠的性能提升策略。

要了解更多关于如何分析应用程序代码的信息，请熟悉Chrome开发者工具。 若要高级分析查看多个进程，请使用 [Chrome Tracing](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool) 工具。

### 推荐阅读

* [从分析运行时性能开始][chrome-devtools-tutorial]
* [谈：“Visual Studio Code - 第一个一秒”][vscode-first-second]

## 检查列表

如果你尝试这些步骤，你的应用可能会略微简洁、快速，而且一般来说会更少出现资源不足的情况。

1. [谨慎地加载模块](#1-carelessly-including-modules)
2. [过早的加载和执行代码](#2-loading-and-running-code-too-soon)
3. [阻塞主进程](#3-blocking-the-main-process)
4. [阻塞渲染进程](#4-blocking-the-renderer-process)
5. [不必要的polyfills](#5-unnecessary-polyfills)
6. [不必要的或者阻塞的网络请求](#6-unnecessary-or-blocking-network-requests)
7. [打包你的代码](#7-bundle-your-code)

## 1) 谨慎地加载模块

在向你的应用程序添加一个 Node.js 模块之前，请检查这个模块。 这个模块包含了多少依赖？ 简单的一个a `require()`声明中包含了什么种类的资源？ 你可能发现NPM包注册的最多的或者Github上Star最多的模块实际上并不是最简单或者最小可用的模块。

### 为什么？

这一建议背后的理由最好用一个真实的例子来说明。 在Electron最开始的那些日子，可靠的检查网络连接是一个问题，导致很多应用公开的使用了一个简单的`isOnline()`方法。

该模块通过尝试访问多个众所周知的端点，检测到您的网络连接。 至于这些资源的列表，它取决于一个完全不同的模块，这个模块也包含一个众所周知的端口。 这个依赖本身又依赖一个包含超过 100 000行端口信息的JSON文件的模块。 每当模块加载时(通常用 `require('module')`)，它会加载所有依赖关系并最终读取并解析此 JSON 文件。 解析几千行的JSON是一个非常繁重的操作。 在性能差的机器上，它会占用整整几秒的时间。

在许多服务器环境中，启动时间几乎无关紧要。 一个Node.js 服务器要求所有端口的信息可能实际上是“性能更好” 如果服务器在启动时将所有需要的信息加载到内存，这样就能更快地为响应请求。 此示例中讨论的模块不是一个“坏”模块。 然而，Electron 应用不应该将实际上不需要的信息加载、解析和存储在内存中。

简而言之，一个主要为运行在Linux系统上的Node.js 服务器编写的模块，虽然看起来很好，但是对你的应用性能来说可能是个坏消息。 在这个特殊的示例中，正确的解决方案是根本不需要加载模块， 而是使用了一 个包含在以后版本的 Chromium 中的连接性检查。

### 怎么做？

当考虑一个模块时，我们建议你做以下检查：

1. 包含的依赖项的大小
2. 需要加载的(`require()`) 资源
3. 你所加载的资源能够执行你关心的操作

可以使用命令行上的单个命令生成用于加载模块的 CPU 配置文件和堆内存配置文件 在下面的示例中，我们看一下受欢迎的模块 `request`。

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

执行此命令将在您执行的目录下生成一个`.cpuprofile`和一个`.heapprofile` 文件。 这两个文件都可以使用 Chrome 开发者工具进行分析，分别使用 `Performance` 和 `Memory` 标签 进行分析。

![Performance CPU Profile][4]

![Performance Heap Memory Profile][5]

在这个例子里，我们看到在作者的机器上加载`request` 大概用了半秒钟，其中 `node-fetch`明显占用了极少的内存并且加载用时少于 50ms。

## 2) 过早的加载和执行代码

如果你有非常繁重的初始化操作，请考虑推迟进行。 程序启动立刻查看应用执行的全部工作。 考虑按照用户操作的顺序将它们错开执行，而不是立刻执行所有的操作。

在传统的Node.js开发中，我们习惯将所有的`require()`语句放在代码顶部。 如果你目前正在使用相同的策略_and_并且使用你不需要立即加载的大型模块编写你的 Electron 应用程序，使用相同的策略并推迟到更适当的时机加载。

### 为什么？

加载模块是令人吃惊的繁重的操作，尤其是在Windows上。 当你的应用开始，不应该让用户等待当时不需要的操作。

这似乎是显而易见的， 但许多应用程序在程序启动后可能会马上完成大量的 工作 - 如检查更新，正在下载稍后流程中使用的内容，或执行大型的磁盘I/O 操作。

让我们把Visual Studio 代码作为一个例子。 当你打开一个文件，它会立刻展示没有高亮任何代码的内容，优先实现和文本交互的功能。 一旦它完成了这项工作，它将继续让代码高亮。

### 怎么做？

让我们考虑一个示例，并假定您的应用程序正在以架空的`.foo`形式解析文件 。 为了做到这一点，它依赖同样架空的`foo-parserver` 模块。 在传统的 Node.js 开发中，你可以写代码热加载依赖：

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

在上面的例子中，我们做了很多工作，一旦文件加载，我们就会立即执行。 我们需要立即获取解析的文件吗？ 或许我们可以晚一点再做这件事，当`getParsedFiles()` 真正的执行到的时候？

```js
// "fs" is likely already being loaded, so the `require()` call is cheap
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk as soon as `getFiles` is called, not sooner.
    // 另外，请确保我们不会使用
    // 异步版本来阻止其他操作。
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // 既然`require()` 里有一个模块缓存， `require()`调用
    // 只会花费一次——其后的 `getParsedFiles()`
    // 将会更快。
    const fooParser = require('foo-parser')
    const files = required this.getFiles()

    return fooParser。 arse(files)
  }
}

// 此操作现在比我们以前的示例
const 解析器 = 新的 Parser()

模块便宜得多。 xports = { parser }
```

简而言之，只有当需要的时候才分配资源，而不是在你的应用启动时分配所有。

## 3) 阻塞主进程

Electron的主要进程(有时称为“浏览器进程”) 非常特殊：它是与你应用的所有其他进程的父进程，也是和操作系统交互的关键进程。 It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

在任何情况下你都不应阻塞此进程或者运行时间长的用户界面线程。 阻塞UI线程意味着您的整个应用程序将冻结直到主进程准备好继续处理。

### 为什么？

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. 如果您的窗口呈现黄色平滑动画， 它需要和 GPU 进程进行通信——再次穿越主进程。

Electron 和 Chromium 谨慎地将大型的磁盘I/O 和 CPU绑定的操作放入新线程，以避免阻塞UI 线程。 你也应该这样做。

### 怎么做？

Electron强大的多进程架构随时准备帮助你完成你的长期任务，但其中也包含少量性能陷阱。

1) 对于需要长期占用CPU繁重任务，使用 [worker threads][worker-threads]， 考虑将它们移动到 BrowserWindow, 或 (作为最后手段) 生成一个专用进程。

2) 尽可能避免使用同步IPC 和 `remote` 模块。 虽然有合法的使用案例，但使用`remote`模块的时候非常容易不知情地阻塞 UI线程。

3) 避免在主进程中使用阻止I/O操作。 简而言之，每当Node.js的核心模块 (如`fs` 或 `child_process`) 提供一个同步版本或 异步版本，你更应该使用异步和非阻塞式的变量。

## 4) 阻塞渲染进程

自从 Electron 使用了当前版本的 Chrome，你可以使用Web 平台提供的最新和最优秀的功能来推迟或卸载繁重的操作，以使你的应用保持流畅和迅速的反应。

### 为什么？

你的应用可能有很多JavaScript在渲染过程中运行。 有个技巧是尽快执行操作，而不占用保持滚动平滑、响应用户输入或60帧/秒动画所需的资源。

如果有用户抱怨你的应用“口吃”的时候在渲染的代码中编排操作流就显得尤其重要。

### 怎么做？

一般来说，所有用于构建现代浏览器的性能网络应用程序的建议，对于Electron 的渲染器也同样适用。 现在处理你的应用的主要两个方法是对于小的操作使用`requestIdleCallback()` 而长时间运行的操作使用 `Web Workers`。

*`requestIdleCallback()`*允许开发者将函数排队为在进程进入空闲期后立刻执行。 它使你能够在不影响用户体验的情况下执行低优先级或后台执行的工作。 想要了解如何使用它的更多信息，[请查看MDN上的文档][request-idle-callback]。

*Web Workers*是在单独线程上运行代码的一个好方式。 有一些注意事项需要考虑 - 请查阅 Electron 的 [多线程文档][multithreading] 和 [MDN 的 Web Workers文档][web-workers]。 对于长时间并且大量使用CPU的操作来说它们是一个理想的解析器。

## 5) 不必要的polyfills

Electron的一大好处是，你准确地知道哪个引擎将解析你的 JavaScript, HTML和CSS。 如果你重新设计的代码是为整个网页编写的，请确保不会polyfill包含在Electron 中的特性。

### 为什么？

现在互联网构建网页应用程序时，最老的环境决定了你能够和不能使用的功能。 尽管Electron支持性能良好的 CSS 选择器和动画，但是较早的浏览器可能不支持。 在你可以使用WebGL的场合，你的开发者可能选择了一个资源更加匮乏的解决方案来支持旧机器。

当它遇到JavaScript时， 你可能已经包含了工具包库，如DOM选择器 jQuery 或是 如`regenerator-runtime`支持`async/await` 的polyfills。

基于 JavaScript 的polyfill速度比Electron 中的原生特征要快一些。 不要通过发布你自己的网络平台标准来减慢你的 Electron 应用速度。

### 怎么做？

假定当前版本的 Electron不需要使用polyfills。 如果你有所疑虑，检查 [caniuse.com](https://caniuse.com/) 以确认 是否[在你的Electron版本中使用的Chromium版本](../api/process.md#processversionschrome-readonly) 已经支持了你需要的特性.

此外，仔细检查您使用的三方库。 它们是否真的必要？ 例如，`jQuery`非常成功，它的许多功能现在都是 [标准JavaScript功能设置的 的一部分][jquery-need]。

如果您正在使用 TypeScript 这样的编译器，检查它的配置并确保你的目标是Electron 支持的最新 ECMAScript 版本。

## 6) 不必要或阻塞的网络请求

避免从互联网中获取几乎不变化的资源，如果它可以轻松地与你的应用程序捆绑起来。

### 为什么？

许多开始使用基于Web的应用程序的Electron用户后来都使用了桌面应用。 作为网页开发者，我们习惯了从各种内容交付网站加载资源。 Now that you are shipping a proper desktop application, attempt to "cut the cord" where possible and avoid letting your users wait for resources that never change and could easily be included  in your app.

一个典型的例子是谷歌字体。 许多开发者使用谷歌令人印象深刻的免费字体集，这些字体通过内容交付网络获取。 方法显而易见：包括几行CSS 和谷歌将处理其余部分。

构建Electron应用程序时，如果你下载字体并将其包含在应用包中，你的用户将会得到更好的服务。

### 怎么做？

在理想情况下，你的应用程序不需要网络就可以运行。 要达到这个目标，你必须了解你的应用正在下载哪些资源以及这些资源的大小。

要做到这一点，请打开开发者工具。 导航到 `Network` 选项卡，然后检查 `Disable cache` 选项。 然后重新加载你的页面。 除非你的应用禁止重新加载， 你通常可以在使用开发者工具时点击`Cmd + R` 或`Ctrl + R`触发重新加载。

开发者工具将仔细记录所有网络请求。 第一步，评估正在下载的所有资源，首先侧重于较大的文件。 其中是否有任何图像、字体或媒体文件不会改变并且可以包含在你的包中？ 如果可以，把它们打包。

下一步，启用 `Network Throttling`。 查找当前读取`Online`的下拉列表，并选择较慢的速度，例如`Fast 3G`。 重新加载你的页面并查看你的应用程序是否有等待任何不必要的资源。 在大多数情况下，尽管实际上不需要相关的资源，应用还是会等待网络请求完成。

作为一个提示, 从互联网上加载你可能想要更改的而不发送应用程序更新是一个强有力的策略。 为了进一步控制如何加载资源，请考虑使用[Service Worker][service-workers]。

## 7) 打包你的代码

正如中已经指出的那样，"[加载和运行代码太早](#2-loading-and-running-code-too-soon)", 调用 `require()` 是一项繁重的操作。 如果你能够这样做，将你的应用程序的代码打包到单个文件中。

### 为什么？

现代JavaScript开发通常涉及许多文件和模块。 对于使用Electron开发的人来说这是非常好的事情，我们强烈建议你将你的代码打包到单个文件中以确保调用`require()` 时只在你的应用加载花费一次开销。

### 怎么做？

有许多JavaScript打包的方法可供使用，我们知道我们最好不要通过推荐一种工具来导致社区不满。 然而，我们的确建议您使用一个能够处理Electron独特的环境的打包程序，它需要处理Node.js 和浏览器两种环境。

在撰写这篇文章时，受欢迎的选择包括[Webpack][webpack], [Parcel][parcel]和[rollup.js][rollup]。

[4]: ../images/performance-cpu-prof.png
[5]: ../images/performance-heap-prof.png

[security]: ./security.md
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
