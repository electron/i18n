# Electron 和 NW.js 之间的技术差异 类似于NW.js，Electron提供了一个使用Web技术开发桌面应用程序的平台。它们都可以让开发者很便利地使用HTML、JavaScript以及Node.js进行开发。表面上，它们俩非常相似。、 然而，两个项目间依旧存在着一些本质的差异，这使得Electron是一个完全独立且不同于NW.js的项目。 1）应用程序的入口 NW.js中，应用程序的主入口是一个HTML网页。NW.js将会使用一个浏览器窗口打开给定的入口点（HTML网页）。 在Electron中，入口点是一个Javascript脚本文件。我们需要通过Javascript代码手动创建一个浏览器窗口并加载一个HTML文件，而不是直接提供一个URL的方法。当然我们也可以去监听窗口的事件来决定什么时候退出应用程序。 Electron的工作机制更像是Node.js的运行时。而且Electron的API实际上更为底层，所以我们可以使用它进行相应的浏览器测试并替代PhantomJS。 2）Node集成 在NW.js中，在Web页面中集成Node需要通过给Chromium打补丁的方式才能运行。而Electron采取了通过在集成libuv loop——不同的操作系统平台（Windows、Linux、MacOS）的消息循环来避免魔改Chromium。 3）Javascript上下文 如果你是一个熟练的NW.js开发者，你必须要非常熟悉Node上下文以及Web上下文的概念。这些概念的发明也是因为NW.js做了这样分离式的实现。 而Electron在Web页面中并没有引入新的Javascript上下文，这是借用了Node的多上下文（multi-context）特征实现的。 注意：NW.js在0.13版本后，也可选支持了多上下文特性。 4）旧版支持 NW.js依旧为了Window XP系统提供向下兼容的版本。而这个版本也不再支持相应的安全更新了。 由于相应的硬件厂商、微软、Chromium以及Node.js均不再对Windows XP系统发布重要安全更新。我们必须得警告你，使用Windows XP系统是极度不安全以及不负责的。 然而我们也能理解实际的情况和需求肯定会和理想的状态有差异。如果你需要找到一个类似于Electron的项目运行在Windows XP系统，那么NW.js的旧版支持将会是一个相对合适的选择。

Like [NW.js][nwjs], Electron provides a platform to write desktop applications with web technologies. Both platforms enable developers to utilize HTML, JavaScript, and Node.js. On the surface, they seem very similar.

There are however fundamental differences between the two projects that make Electron a completely separate product from NW.js.

## 1) Entry of Application

In NW.js, the main entry point of an application can be an HTML web page. In that case, NW.js will open the given entry point in a browser window.

In Electron, the entry point is always a JavaScript script. Instead of providing a URL directly, you manually create a browser window and load an HTML file using the API. You also need to listen to window events to decide when to quit the application.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](https://phantomjs.org/).

## 2) Node Integration

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the `libuv` loop with each platform's message loop to avoid hacking Chromium. 你可以查看 [`node_bindings`][node-bindings] 来了解这是如何完成的。

## 3) JavaScript Contexts

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

注意: 自从 0.13 以来，NW.js 选择性支持多上下文。

## 4) Legacy Support

NW.js still offers a "legacy release" that supports Windows XP. It doesn't receive security updates.

Given that hardware manufacturers, Microsoft, Chromium, and Node.js haven't released even critical security updates for that system, we have to warn you that using Windows XP is wildly insecure and outright irresponsible.

However, we understand that requirements outside our wildest imagination may exist, so if you're looking for something like Electron that runs on Windows XP, the NW.js legacy release might be the right fit for you.

## 5) Features

There are numerous differences in the amount of supported features. Electron has a bigger community, more production apps using it, and [a large amount of userland modules available on npm][electron-modules].

As an example, Electron has built-in support for automatic updates and countless tools that make the creation of installers easier. As an example in favor of NW.js, NW.js supports more `Chrome.*` APIs for the development of Chrome Apps.

Naturally, we believe that Electron is the better platform for polished production applications built with web technologies (like Visual Studio Code, Slack, or Facebook Messenger); however, we want to be fair to our web technology friends. If you have feature needs that Electron does not meet, you might want to try NW.js.

[nwjs]: https://nwjs.io/
[electron-modules]: https://www.npmjs.com/search?q=electron
[node-bindings]: https://github.com/electron/electron/tree/master/lib/common
