# Process Sandboxing

L'une des principales fonctionnalités de sécurité de Chromium est que les processus peuvent être exécutés dans un bac à sable. The sandbox limits the harm that malicious code can cause by limiting access to most system resources — sandboxed processes can only freely use CPU cycles and memory. In order to perform operations requiring additional privilege, sandboxed processes use dedicated communication channels to delegate tasks to more privileged processes.

In Chromium, sandboxing is applied to most processes other than the main process. Cela inclut les processus de rendu, ainsi que les processus utilitaires tels que le service audio, le service GPU et le service réseau.

See Chromium's [Sandbox design document][sandbox] for more information.

## Electron's sandboxing policies

Electron comes with a mixed sandbox environment, meaning sandboxed processes can run alongside privileged ones. By default, renderer processes are not sandboxed, but utility processes are. Note that as in Chromium, the main (browser) process is privileged and cannot be sandboxed.

Historically, this mixed sandbox approach was established because having Node.js available in the renderer is an extremely powerful tool for app developers. Unfortunately, this feature is also an equally massive security vulnerability.

Theoretically, unsandboxed renderers are not a problem for desktop applications that only display trusted code, but they make Electron less secure than Chromium for displaying untrusted web content. However, even purportedly trusted code may be dangerous — there are countless attack vectors that malicious actors can use, from cross-site scripting to content injection to man-in-the-middle attacks on remotely loaded websites, just to name a few. For this reason, we recommend enabling renderer sandboxing for the vast majority of cases under an abundance of caution.

<!--TODO: update this guide when #28466 is either solved or closed -->
Note that there is an active discussion in the issue tracker to enable renderer sandboxing by default. Voir [#28466][issue-28466]) pour plus de détails.

## Sandbox behaviour in Electron

Sandboxed processes in Electron behave _mostly_ in the same way as Chromium's do, but Electron has a few additional concepts to consider because it interfaces with Node.js.

### Processus de rendu

When renderer processes in Electron are sandboxed, they behave in the same way as a regular Chrome renderer would. A sandboxed renderer won't have a Node.js environment initialized.

<!-- TODO(erickzhao): when we have a solid guide for IPC, link it here -->
Therefore, when the sandbox is enabled, renderer processes can only perform privileged tasks (such as interacting with the filesystem, making changes to the system, or spawning subprocesses) by delegating these tasks to the main process via inter-process communication (IPC).

### Précharger les scripts

In order to allow renderer processes to communicate with the main process, preload scripts attached to sandboxed renderers will still have a polyfilled subset of Node.js APIs available. A `require` function similar to Node's `require` module is exposed, but can only import a subset of Electron and Node's built-in modules:

* `electron` (uniquement les modules de processus de rendu)
* [`événements`](https://nodejs.org/api/events.html)
* [`timers`](https://nodejs.org/api/timers.html)
* [`url`](https://nodejs.org/api/url.html)

In addition, the preload script also polyfills certain Node.js primitives as globals:

* [`Tampon`](https://nodejs.org/api/Buffer.html)
* [`processus (process)`](../api/process.md)
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

## Une note sur le rendu du contenu non fiable

Rendre du contenu non fiable dans Electron est encore un territoire quelque peu inexploré, bien que certaines applications réussissent (par exemple [Beaker Browser][beaker]). Our goal is to get as close to Chrome as we can in terms of the security of sandboxed content, but ultimately we will always be behind due to a few fundamental issues:

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
