# プロセスのサンドボックス化

Chromium の重要なセキュリティ機能の一つは、プロセスをサンドボックス内で実行できることです。 サンドボックスは、ほとんどのシステムリソースへのアクセスを制限することで悪意のあるコードが引き起こす被害を制限します。サンドボックスのプロセスは、CPU サイクルとメモリのみを自由に使用できます。 サンドボックス化したプロセスで追加の特権を必要とする操作を実行するには、専用の通信チャンネルを使用してより特権のあるプロセスにタスクを委譲します。

Chromium では、メインプロセス以外のほとんどのプロセスにサンドボックス化が適用されます。 これにはレンダラープロセスのほか、オーディオサービス、GPU サービス、ネットワークサービスなどのユーティリティプロセスも含まれます。

See Chromium's [Sandbox design document][sandbox] for more information.

## Electron's sandboxing policies

Electron comes with a mixed sandbox environment, meaning sandboxed processes can run alongside privileged ones. By default, renderer processes are not sandboxed, but utility processes are. Note that as in Chromium, the main (browser) process is privileged and cannot be sandboxed.

Historically, this mixed sandbox approach was established because having Node.js available in the renderer is an extremely powerful tool for app developers. Unfortunately, this feature is also an equally massive security vulnerability.

Theoretically, unsandboxed renderers are not a problem for desktop applications that only display trusted code, but they make Electron less secure than Chromium for displaying untrusted web content. However, even purportedly trusted code may be dangerous — there are countless attack vectors that malicious actors can use, from cross-site scripting to content injection to man-in-the-middle attacks on remotely loaded websites, just to name a few. For this reason, we recommend enabling renderer sandboxing for the vast majority of cases under an abundance of caution.

<!--TODO: update this guide when #28466 is either solved or closed -->
Note that there is an active discussion in the issue tracker to enable renderer sandboxing by default. See [#28466][issue-28466]) for details.

## Sandbox behaviour in Electron

Sandboxed processes in Electron behave _mostly_ in the same way as Chromium's do, but Electron has a few additional concepts to consider because it interfaces with Node.js.

### Renderer processes

When renderer processes in Electron are sandboxed, they behave in the same way as a regular Chrome renderer would. A sandboxed renderer won't have a Node.js environment initialized.

<!-- TODO(erickzhao): when we have a solid guide for IPC, link it here -->
Therefore, when the sandbox is enabled, renderer processes can only perform privileged tasks (such as interacting with the filesystem, making changes to the system, or spawning subprocesses) by delegating these tasks to the main process via inter-process communication (IPC).

### Preload scripts

In order to allow renderer processes to communicate with the main process, preload scripts attached to sandboxed renderers will still have a polyfilled subset of Node.js APIs available. A `require` function similar to Node's `require` module is exposed, but can only import a subset of Electron and Node's built-in modules:

* `electron` (only renderer process modules)
* [`イベント`](https://nodejs.org/api/events.html)
* [`timers`](https://nodejs.org/api/timers.html)
* [`url`](https://nodejs.org/api/url.html)

In addition, the preload script also polyfills certain Node.js primitives as globals:

* [`Buffer`](https://nodejs.org/api/Buffer.html)
* [`process`](../api/process.md)
* [`clearImmediate`](https://nodejs.org/api/timers.html#timers_clearimmediate_immediate)
* [`setImmediate`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args)

Because the `require` function is a polyfill with limited functionality, you will not be able to use [CommonJS modules][commonjs] to separate your preload script into multiple files. If you need to split your preload code, use a bundler such as [webpack][webpack] or [Parcel][parcel].

Note that because the environment presented to the `preload` script is substantially more privileged than that of a sandboxed renderer, it is still possible to leak privileged APIs to untrusted code running in the renderer process unless [`contextIsolation`][contextIsolation] is enabled.

## Configuring the sandbox

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

### Enabling the sandbox globally

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

### Disabling Chromium's sandbox (testing only)

You can also disable Chromium's sandbox entirely with the [`--no-sandbox`][no-sandbox] CLI flag, which will disable the sandbox for all processes (including utility processes). We highly recommend that you only use this flag for testing purposes, and **never** in production.

Note that the `sandbox: true` option will still disable the renderer's Node.js environment.

## A note on rendering untrusted content

Rendering untrusted content in Electron is still somewhat uncharted territory, though some apps are finding success (e.g. [Beaker Browser][beaker]). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

1. 私たちには Chromium 製品に適したセキュリティのリソースやノウハウがありません。 今あるものを活かして Chromium からできることはすべて継承し、セキュリティ上の問題にも迅速に対応できるようにしていますが、Electron は Chromium のようにリソースを割くことができず、Chromium のようなセキュリティは確保できません。
2. Chrome のセキュリティ機能 (セーフブラウジングや証明書の透過性など) の中には、中央集権化と専用サーバが必要なものがありますが、どちらも Electron プロジェクトの目的に反しています。 そのため、セキュリティ関連のコストが発生しないように、Electron では機能を無効にしています。
3. Chromium は 1 つだけですが Electron には何千ものアプリが存在しており、それぞれのアプリの動作は微妙に異なります。 これらの違いを考慮すると巨大な可能性の空間が生じ、通常とは異なるユースケースでのプラットフォームのセキュリティ確保に挑戦することになります。
4. セキュリティアップデートをユーザーに直接伝えることができないため、セキュリティアップデートをユーザーに届けるために、アプリベンダーに Electron のバージョンをアップグレードして頂いています。

Chromium のセキュリティ修正を古いバージョンの Electron にバックポートするよう最善の努力をしていますが、すべての修正のバックポートは保証できません。 堅牢性を確保するには、Electron の最新の安定版を使用することが最善の方法です。

[sandbox]: https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md
[issue-28466]: https://github.com/electron/electron/issues/28466
[browser-window]: ../api/browser-window.md
[enable-sandbox]: ../api/app.md#appenablesandbox
[no-sandbox]: ../api/command-line-switches.md#--no-sandbox
[commonjs]: https://nodejs.org/api/modules.html#modules_modules_commonjs_modules
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[beaker]: https://github.com/beakerbrowser/beaker
