# 进程沙盒化

Chromium的一个关键安全特性是，进程可以在沙盒中执行。 沙盒通过限制对大多数系统资源的访问来减少恶意代码可能造成的伤害 — 沙盒化的进程只能自由使用CPU周期和内存。 为了执行需要额外权限的操作，沙盒处的进程通过专用通信渠道将任务下放给更大权限的进程。

在Chromium中，沙盒化应用于主进程以外的大多数进程。 其中包括渲染器进程，以及功能性进程，如音频服务、GPU 服务和网络服务。

查阅Chromium的 [沙箱设计文档][sandbox] 了解更多信息。

## Electron沙盒化策略

Electron带有一个混合的沙盒环境，意味着沙盒化进程可以和有权限的进程一起运行。 默认情况下，渲染器进程未被沙盒化，但功能性进程是被沙盒化的。 注意，就像在Chromium中一样，主 (浏览器) 进程是有特权的且无法被沙盒化。

从历史上看，这种混合沙盒方法之所以成立，是因为在渲染器中提供Node.js对于应用开发人员来说是一个非常强大的工具。 不幸的是，这一特性同时也是一个巨大的安全漏洞。

从理论上讲，对于只显示可信代码的桌面应用程序来说，未沙盒化的渲染器不是问题，但它们使 Electron 在显示不受信任的 Web 内容时的安全性低于 Chromium。 然而，即使据称可信的代码也可能是危险的 — 在远程加载的网站上有无数恶意行为者可以使用的攻击途径。稍微举几个例子：从跨站脚本到内容注入再到中间人攻击。 因此，我们建议在大多数非常谨慎的情况下启用渲染器沙盒化。

<!--TODO: update this guide when #28466 is either solved or closed -->
Note that there is an active discussion in the issue tracker to enable renderer sandboxing by default. See [#28466][issue-28466]) for details.

## Electron 中的沙盒行为

在 Electron 中沙盒进程 _大部分地_ 表现都与 Chromium 差不多， 但因为介面是 Node.js 的关系 Electron 有一些额外的概念需要考虑。

### 渲染器进程

当 Electron 中的渲染器进程被沙盒化时，它们的行为与常规 Chrome 渲染器一样。 一个沙盒化的渲染器不会有一个 Node.js 环境。

<!-- TODO(erickzhao): when we have a solid guide for IPC, link it here -->
因此，在沙盒中，渲染器进程只能透过 进程间通讯 ( inter-process communication, IPC ) 委派任务给主进程的方式， 来执行需权限的任务 ( 例如：操作档案系统，改变作业系统 或 生成子进程 ) 。

### 预加载脚本

In order to allow renderer processes to communicate with the main process, preload scripts attached to sandboxed renderers will still have a polyfilled subset of Node.js APIs available. A `require` function similar to Node's `require` module is exposed, but can only import a subset of Electron and Node's built-in modules:

* `electron` (only renderer process modules)
* [`事件`](https://nodejs.org/api/events.html)
* [`timers`](https://nodejs.org/api/timers.html)
* [`url`](https://nodejs.org/api/url.html)

In addition, the preload script also polyfills certain Node.js primitives as globals:

* [`Buffer`](https://nodejs.org/api/Buffer.html)
* [`进程`](../api/process.md)
* [`clearImmediate`](https://nodejs.org/api/timers.html#timers_clearimmediate_immediate)
* [`setImmediate`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args)

Because the `require` function is a polyfill with limited functionality, you will not be able to use [CommonJS modules][commonjs] to separate your preload script into multiple files. If you need to split your preload code, use a bundler such as [webpack][webpack] or [Parcel][parcel].

Note that because the environment presented to the `preload` script is substantially more privileged than that of a sandboxed renderer, it is still possible to leak privileged APIs to untrusted code running in the renderer process unless [`contextIsolation`][contextIsolation] is enabled.

## 配置沙盒

### Enabling the sandbox for a single process

In Electron, renderer sandboxing can be enabled on a per-process basis with the `sandbox: true` preference in the [`BrowserWindow`][browser-window] constructor.

```js
// main.js
app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('https://google.com')
})
```

### 全局启用沙盒

If you want to force sandboxing for all renderers, you can also use the [`app.enableSandbox`][enable-sandbox] API. Note that this API has to be called before the app's `ready` event.

```js
// main.js
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```

### 禁用 Chromium 的沙盒（仅测试）

You can also disable Chromium's sandbox entirely with the [`--no-sandbox`][no-sandbox] CLI flag, which will disable the sandbox for all processes (including utility processes). We highly recommend that you only use this flag for testing purposes, and **never** in production.

Note that the `sandbox: true` option will still disable the renderer's Node.js environment.

## A note on rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. [Beaker Browser][beaker]). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. We do not have the dedicated resources or expertise that Chromium has to apply to the security of its product. We do our best to make use of what we have, to inherit everything we can from Chromium, and to respond quickly to security issues, but Electron cannot be as secure as Chromium without the resources that Chromium is able to dedicate.
2. Some security features in Chrome (such as Safe Browsing and Certificate Transparency) require a centralized authority and dedicated servers, both of which run counter to the goals of the Electron project. As such, we disable those features in Electron, at the cost of the associated security they would otherwise bring.
3. There is only one Chromium, whereas there are many thousands of apps built on Electron, all of which behave slightly differently. Accounting for those differences can yield a huge possibility space, and make it challenging to ensure the security of the platform in unusual use cases.
4. We can't push security updates to users directly, so we rely on app vendors to upgrade the version of Electron underlying their app in order for security updates to reach users.

While we make our best effort to backport Chromium security fixes to older versions of Electron, we do not make a guarantee that every fix will be backported. Your best chance at staying secure is to be on the latest stable version of Electron.

[sandbox]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[issue-28466]: https://github.com/electron/electron/issues/28466
[browser-window]: ../api/browser-window.md
[enable-sandbox]: ../api/app.md#appenablesandbox
[no-sandbox]: ../api/command-line-switches.md#--no-sandbox
[commonjs]: https://nodejs.org/api/modules.html#modules_modules_commonjs_modules
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[beaker]: https://github.com/beakerbrowser/beaker
