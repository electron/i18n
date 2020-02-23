# 性能

开发者经常询问优化 Electron 应用程序性能的策略。 软件工程师、用户和框架开发者并不总是就“性能”的含义达成单一定义。 此文档概述了Electron 维护者最喜欢的减少内存使用、 CPU 负载以及磁盘资源使用的方式。以确保您的应用程序能够响应用户输入并尽快完成操作。 此外，我们希望所有的性能策略都能保持您应用的高标准安全。

关于如何使用 JavaScript构建高性能网站的技巧和方法通常也适用于Electron 应用程序。 在某种程度上，讨论如何构建高性能 Node.js 应用的方法同样也适用。但是小心理解“性能”一词的含义对于 Node.js 后端和客户端程序并不相同。

文中的列表提供了一些方便，同时也需要注意，它和我们的[安全性检查列表](./security.md)类似，并不详尽。 即使你参照了下面提到的所有步骤，依然有可能构建出来一个性能低的Electron应用。 Electron是一个强大的开发平台，可以让开发人员按照自己所想，做更多的或更少的事情。 而这种自由的代价就是开发者需要承担大部分性能上的责任。

## 再三权衡

以下列举了一些直截了当、易于实现的方式。 但是，如果你想构建性能最优秀的应用，仅仅这些是不够的。 你需要仔细检查应用中运行的所有代码，认真地进行分析和衡量。 瓶颈在哪里？ 当用户点击按钮时，哪些操作的执行占用了最多的时间？ 当应用程序被挂起时，哪些对象占用了最多的内存？

通过多次的尝试，我们发现，构建高性能的Electron应用程序，最成功的策略是分析正在运行的代码，查找其中最耗资源的部分，然后对其进行优化。 一遍又一遍地重复这个“搬砖”的过程，将极大地提高应用程序的性能。 在大型应用程序（例如Visual Studio Code、Slack）中的实践经验证明了这是目前最可靠的性能提升策略。

要了解更多关于如何分析应用程序代码的信息，请熟悉Chrome开发者工具。 如果想同时对多个进程进行深入分析，请考虑使用[Chrome Tracing]工具。

### 推荐阅读

 * [从分析运行时性能开始](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
 * [谈：“Visual Studio Code - 第一个一秒”](https://www.youtube.com/watch?v=r0OeHRUCCb4)

## 检查列表

如果你尝试这些步骤，你的应用可能会略微简洁、快速，而且一般来说会更少出现资源不足的情况。

1. [谨慎的加载模块](#1-carelessly-including-modules)
2. [代码预加载和执行](#2-loading-and-running-code-too-soon)
3. [阻塞主进程](#3-blocking-the-main-process)
4. [阻塞渲染进程](#4-blocking-the-renderer-process)
5. [不必要的polyfills](#5-unnecessary-polyfills)
6. [不必要的或者阻塞的网络请求](#6-unnecessary-or-blocking-network-requests)
7. [代码进行分片](#7-bundle-your-code)

## 1) Carelessly including modules

在向你的应用程序添加一个 Node.js 模块之前，请检查这个模块。 这个模块包含了多少依赖？ 简单的一个a `require()`声明中包含了什么种类的资源？ 你可能发现NPM包注册的最多的或者Github上Star最多的模块实际上并不是最简单或者最小可用的模块。

### 为什么？

这一建议背后的理由最好用一个真实的例子来说明。 在Electron最开始的那些日子，可靠的检查网络连接是一个问题，导致很多应用公开的使用了一个简单的`isOnline()`方法。

该模块通过尝试访问多个众所周知的端点，检测到您的网络连接。 至于这些资源的列表，它取决于一个完全不同的模块，这个模块也包含一个众所周知的端口。 这个依赖本身又依赖一个包含超过 100 000行端口信息的JSON文件的模块。 每当模块加载时(通常用 `require('module')`)，它会加载所有依赖关系并最终读取并解析此 JSON 文件。 解析几千行的JSON是一个非常繁重的操作。 在性能差的机器上，它会占用整整几秒的时间。

在许多服务器环境中，启动时间几乎无关紧要。 一个Node.js 服务器要求所有端口的信息可能实际上是“性能更好” 如果服务器在启动时将所有需要的信息加载到内存，这样就能更快地为响应请求。 此示例中讨论的模块不是一个“坏”模块。 然而，Electron 应用不应该将实际上不需要的信息加载、解析和存储在内存中。

In short, a seemingly excellent module written primarily for Node.js servers running Linux might be bad news for your app's performance. In this particular example, the correct solution was to use no module at all, and to instead use connectivity checks included in later versions of Chromium.

### 怎么做？

When considering a module, we recommend that you check:

1. the size of dependencies included 2) the resources required to load (`require()`) it
3. the resources required to perform the action you're interested in

Generating a CPU profile and a heap memory profile for loading a module can be done with a single command on the command line. In the example below, we're looking at the popular module `request`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Executing this command results in a `.cpuprofile` file and a `.heapprofile` file in the directory you executed it in. Both files can be analyzed using the Chrome Developer Tools, using the `Performance` and `Memory` tabs respectively.

![performance-cpu-prof](../images/performance-cpu-prof.png)

![performance-heap-prof](../images/performance-heap-prof.png)

In this example, on the author's machine, we saw that loading `request` took almost half a second, whereas `node-fetch` took dramatically less memory and less than 50ms.

## 2) Loading and running code too soon

If you have expensive setup operations, consider deferring those. Inspect all the work being executed right after the application starts. Instead of firing off all operations right away, consider staggering them in a sequence more closely aligned with the user's journey.

In traditional Node.js development, we're used to putting all our `require()` statements at the top. If you're currently writing your Electron application using the same strategy _and_ are using sizable modules that you do not immediately need, apply the same strategy and defer loading to a more opportune time.

### 为什么？

Loading modules is a surprisingly expensive operation, especially on Windows. When your app starts, it should not make users wait for operations that are currently not necessary.

This might seem obvious, but many applications tend to do a large amount of work immediately after the app has launched - like checking for updates, downloading content used in a later flow, or performing heavy disk I/O operations.

Let's consider Visual Studio Code as an example. When you open a file, it will immediately display the file to you without any code highlighting, prioritizing your ability to interact with the text. Once it has done that work, it will move on to code highlighting.

### 怎么做？

Let's consider an example and assume that your application is parsing files in the fictitious `.foo` format. In order to do that, it relies on the equally fictitious `foo-parser` module. In traditional Node.js development, you might write code that eagerly loads dependencies:

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

In the above example, we're doing a lot of work that's being executed as soon as the file is loaded. Do we need to get parsed files right away? Could we do this work a little later, when `getParsedFiles()` is actually called?

```js
// "fs" is likely already being loaded, so the `require()` call is cheap
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk as soon as `getFiles` is called, not sooner.
    // Also, ensure that we're not blocking other operations by using
    // the asynchronous version.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Since `require()` comes with a module cache, the `require()` call
    // will only be expensive once - subsequent calls of `getParsedFiles()`
    // will be faster.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// This operation is now a lot cheaper than in our previous example
const parser = new Parser()

module.exports = { parser }
```

In short, allocate resources "just in time" rather than allocating them all when your app starts.

## 3) 阻塞主进程

Electron's main process (sometimes called "browser process") is special: It is the parent process to all your app's other processes and the primary process the operating system interacts with. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Under no circumstances should you block this process and the UI thread with long-running operations. Blocking the UI thread means that your entire app will freeze until the main process is ready to continue processing.

### 为什么？

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. If your window is rendering a buttery-smooth animation, it'll need to talk to the GPU process about that – once again going through the main process.

Electron and Chromium are careful to put heavy disk I/O and CPU-bound operations onto new threads to avoid blocking the UI thread. You should do the same.

### 怎么做？

Electron's powerful multi-process architecture stands ready to assist you with your long-running tasks, but also includes a small number of performance traps.

1) For long running CPU-heavy tasks, make use of [worker threads](https://nodejs.org/api/worker_threads.html), consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Avoid using the synchronous IPC and the `remote` module as much as possible. While there are legitimate use cases, it is far too easy to unknowingly block the UI thread using the `remote` module.

3) Avoid using blocking I/O operations in the main process. In short, whenever core Node.js modules (like `fs` or `child_process`) offer a synchronous or an asynchronous version, you should prefer the asynchronous and non-blocking variant.


## 4) Blocking the renderer process

Since Electron ships with a current version of Chrome, you can make use of the latest and greatest features the Web Platform offers to defer or offload heavy operations in a way that keeps your app smooth and responsive.

### 为什么？

Your app probably has a lot of JavaScript to run in the renderer process. The trick is to execute operations as quickly as possible without taking away resources needed to keep scrolling smooth, respond to user input, or animations at 60fps.

Orchestrating the flow of operations in your renderer's code is particularly useful if users complain about your app sometimes "stuttering".

### 怎么做？

Generally speaking, all advice for building performant web apps for modern browsers apply to Electron's renderers, too. The two primary tools at your disposal  are currently `requestIdleCallback()` for small operations and `Web Workers` for long-running operations.

*`requestIdleCallback()`* allows developers to queue up a function to be executed as soon as the process is entering an idle period. It enables you to perform low-priority or background work without impacting the user experience. For more information about how to use it, [check out its documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

*Web Workers* are a powerful tool to run code on a separate thread. There are some caveats to consider – consult Electron's [multithreading documentation](./multithreading.md) and the [MDN documentation for Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). They're an ideal solution for any operation that requires a lot of CPU power for an extended period of time.


## 5) 不必要的多边形

One of Electron's great benefits is that you know exactly which engine will parse your JavaScript, HTML, and CSS. If you're re-purposing code that was written for the web at large, make sure to not polyfill features included in Electron.

### 为什么？

When building a web application for today's Internet, the oldest environments dictate what features you can and cannot use. Even though Electron supports well-performing CSS filters and animations, an older browser might not. Where you could use WebGL, your developers may have chosen a more resource-hungry solution to support older phones.

When it comes to JavaScript, you may have included toolkit libraries like jQuery for DOM selectors or polyfills like the `regenerator-runtime` to support `async/await`.

It is rare for a JavaScript-based polyfill to be faster than the equivalent native feature in Electron. Do not slow down your Electron app by shipping your own version of standard web platform features.

### 怎么做？

Operate under the assumption that polyfills in current versions of Electron are unnecessary. If you have doubts, check [caniuse.com](https://caniuse.com/) and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

In addition, carefully examine the libraries you use. Are they really necessary? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available](http://youmightnotneedjquery.com/).

If you're using a transpiler/compiler like TypeScript, examine its configuration and ensure that you're targeting the latest ECMAScript version supported by Electron.


## 6) Unnecessary or blocking network requests

Avoid fetching rarely changing resources from the internet if they could easily be bundled with your application.

### 为什么？

Many users of Electron start with an entirely web-based app that they're turning into a desktop application. As web developers, we are used to loading resources from a variety of content delivery networks. Now that you are shipping a proper desktop application, attempt to "cut the cord" where possible
 - and avoid letting your users wait for resources that never change and could easily be included  in your app.

A typical example is Google Fonts. Many developers make use of Google's impressive collection of free fonts, which comes with a content delivery network. The pitch is straightforward: Include a few lines of CSS and Google will take care of the rest.

When building an Electron app, your users are better served if you download the fonts and include them in your app's bundle.

### 怎么做？

In an ideal world, your application wouldn't need the network to operate at all. To get there, you must understand what resources your app is downloading \- and how large those resources are.

To do so, open up the developer tools. Navigate to the `Network` tab and check the `Disable cache` option. Then, reload your renderer. Unless your app prohibits such reloads, you can usually trigger a reload by hitting `Cmd + R` or `Ctrl + R` with the developer tools in focus.

The tools will now meticulously record all network requests. In a first pass, take stock of all the resources being downloaded, focusing on the larger files first. Are any of them images, fonts, or media files that don't change and could be included with your bundle? If so, include them.

As a next step, enable `Network Throttling`. Find the drop-down that currently reads `Online` and select a slower speed such as `Fast 3G`. Reload your renderer and see if there are any resources that your app is unnecessarily waiting for. In many cases, an app will wait for a network request to complete despite not actually needing the involved resource.

As a tip, loading resources from the Internet that you might want to change without shipping an application update is a powerful strategy. For advanced control over how resources are being loaded, consider investing in [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## 7) Bundle your code

As already pointed out in "[Loading and running code too soon](#2-loading-and-running-code-too-soon)", calling `require()` is an expensive operation. If you are able to do so, bundle your application's code into a single file.

### 为什么？

Modern JavaScript development usually involves many files and modules. While that's perfectly fine for developing with Electron, we heavily recommend that you bundle all your code into one single file to ensure that the overhead included in calling `require()` is only paid once when your application loads.

### 怎么做？

There are numerous JavaScript bundlers out there and we know better than to anger the community by recommending one tool over another. We do however recommend that you use a bundler that is able to handle Electron's unique environment that needs to handle both Node.js and browser environments.

As of writing this article, the popular choices include [Webpack](https://webpack.js.org/), [Parcel](https://parceljs.org/), and [rollup.js](https://rollupjs.org/).
