# `sandbox` Option

> Create a browser window with a sandboxed renderer. With this
option enabled, the renderer must communicate via IPC to the main process in order to access node APIs.

One of the key security features of Chromium is that all blink rendering/JavaScript
code is executed within a sandbox. This sandbox uses OS-specific features to ensure
that exploits in the renderer process cannot harm the system.

In other words, when the sandbox is enabled, the renderers can only make changes
to the system by delegating tasks to the main process via IPC.
[Here's](https://www.chromium.org/developers/design-documents/sandbox) more
information about the sandbox.

Since a major feature in Electron is the ability to run Node.js in the
renderer process (making it easier to develop desktop applications using web
technologies), the sandbox is disabled by electron. This is because
most Node.js APIs require system access. `require()` for example, is not
possible without file system permissions, which are not available in a sandboxed
environment.

Usually this is not a problem for desktop applications since the code is always
trusted, but it makes Electron less secure than Chromium for displaying
untrusted web content. For applications that require more security, the
`sandbox` flag will force Electron to spawn a classic Chromium renderer that is
compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't
expose Node.js JavaScript APIs to client code. The only exception is the preload script,
which has access to a subset of the Electron renderer API.

Another difference is that sandboxed renderers don't modify any of the default
JavaScript APIs. Consequently, some APIs such as `window.open` will work as they
do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Example

To create a sandboxed window, pass `sandbox: true` to `webPreferences`:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has Node.js disabled and can communicate
only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also,
within this new window `window.open` follows the native behavior (by default Electron creates a [`BrowserWindow`](browser-window.md)
and returns a proxy to this via `window.open`).

[`app.enableSandbox`](app.md#appenablesandbox-experimental) can be used to force `sandbox: true` for all `BrowserWindow` instances.

```js
let win
app.enableSandbox()
app.whenReady().then(() => {
  // no need to pass `sandbox: true` since `app.enableSandbox()` was called.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

## Preload

An app can make customizations to sandboxed renderers using a preload script.
Here's an example:

```js
let win
app.whenReady().then(() => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: path.join(app.getAppPath(), 'preload.js')
    }
  })
  win.loadURL('http://google.com')
})
```

and preload.js:

```js
// This file is loaded whenever a javascript context is created. It runs in a
// private scope that can access a subset of Electron renderer APIs. We must be
// careful to not leak any objects into the global scope!
const { ipcRenderer, remote } = require('electron')
const fs = remote.require('fs')

// read a configuration file using the `fs` module
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Important things to notice in the preload script:

- Even though the sandboxed renderer doesn't have Node.js running, it still has
  access to a limited node-like environment: `Buffer`, `process`, `setImmediate`,
  `clearImmediate` and `require` are available.
- The preload script can indirectly access all APIs from the main process through the
  `remote` and `ipcRenderer` modules.
- The preload script must be contained in a single script, but it is possible to have
  complex preload code composed with multiple modules by using a tool like
  webpack or browserify. An example of using browserify is below.

To create a browserify bundle and use it as a preload script, something like
the following should be used:

```sh
  browserify preload/index.js \
    -x electron \
    --insert-global-vars=__filename,__dirname -o preload.js
```

The `-x` flag should be used with any required module that is already exposed in
the preload scope, and tells browserify to use the enclosing `require` function
for it. `--insert-global-vars` will ensure that `process`, `Buffer` and
`setImmediate` are also taken from the enclosing scope(normally browserify
injects code for those).

Currently the `require` function provided in the preload scope exposes the
following modules:

- `electron`
  - `crashReporter`
  - `desktopCapturer`
  - `ipcRenderer`
  - `nativeImage`
  - `remote`
  - `webFrame`
- `events`
- `timers`
- `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any
module in the main process can already be used through
`electron.remote.require`.

## Status

Please use the `sandbox` option with care, as it is still an experimental
feature. We are still not aware of the security implications of exposing some
Electron renderer APIs to the preload script, but here are some things to
consider before rendering untrusted content:

- A preload script can accidentally leak privileged APIs to untrusted code,
  unless [`contextIsolation`](../tutorial/security.md#3-enable-context-isolation-for-remote-content)
  is also enabled.
- Some bug in V8 engine may allow malicious code to access the renderer preload
  APIs, effectively granting full access to the system through the `remote`
  module. Therefore, it is highly recommended to
  [disable the `remote` module](../tutorial/security.md#15-disable-the-remote-module).
  If disabling is not feasible, you should selectively
  [filter the `remote` module](../tutorial/security.md#16-filter-the-remote-module).

Since rendering untrusted content in Electron is still uncharted territory,
the APIs exposed to the sandbox preload script should be considered more
unstable than the rest of Electron APIs, and may have breaking changes to fix
security issues.
