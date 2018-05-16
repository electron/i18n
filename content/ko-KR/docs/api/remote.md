# remote

> 메인 프로세스 모듈을 렌더러 프로세스에서 사용합니다.

프로세스: [Renderer](../glossary.md#renderer-process)

`remote` 모듈은 메인 프로세스와 렌더러 프로세스(웹 페이지) 사이의 inter-process (IPC) 통신을 간단하게 추상화 한 모듈입니다.

Electron의 메인 프로세스에선 GUI와 관련 있는(`dialog`, `menu`등) 모듈만 사용할 수 있습니다. 렌더러 프로세스에서 이러한 모듈들을 사용하려면 `ipc` 모듈을 통해 메인 프로세스와 inter-process 통신을 해야 합니다. With the `remote` module, you can invoke methods of the main process object without explicitly sending inter-process messages, similar to Java's [RMI](http://en.wikipedia.org/wiki/Java_remote_method_invocation). 다음 예시는 렌더러 프로세스에서 브라우저 창을 만드는 예시입니다:

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**Note:** For the reverse (access the renderer process from the main process), you can use [webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback).

## Remote 객체

`remote` 모듈로부터 반환된 각 객체(메서드 포함)는 메인 프로세스의 객체를 추상화 한 객체입니다. (우리는 그것을 remote 객체 또는 remote 함수라고 부릅니다) When you invoke methods of a remote object, call a remote function, or create a new object with the remote constructor (function), you are actually sending synchronous inter-process messages.

In the example above, both `BrowserWindow` and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. Instead, it created a `BrowserWindow` object in the main process and returned the corresponding remote object in the renderer process, namely the `win` object.

**Note:** Only [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) which are present when the remote object is first referenced are accessible via remote.

**Note:** Arrays and Buffers are copied over IPC when accessed via the `remote` module. Modifying them in the renderer process does not modify them in the main process and vice versa.

## Lifetime of Remote Objects

Electron makes sure that as long as the remote object in the renderer process lives (in other words, has not been garbage collected), the corresponding object in the main process will not be released. When the remote object has been garbage collected, the corresponding object in the main process will be dereferenced.

If the remote object is leaked in the renderer process (e.g. stored in a map but never freed), the corresponding object in the main process will also be leaked, so you should be very careful not to leak remote objects.

Primary value types like strings and numbers, however, are sent by copy.

## Passing callbacks to the main process

Code in the main process can accept callbacks from the renderer - for instance the `remote` module - but you should be extremely careful when using this feature.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

For instance you can't use a function from the renderer process in an `Array.map` called in the main process:

```javascript
// main process mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// renderer process
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

As you can see, the renderer callback's synchronous return value was not as expected, and didn't match the return value of an identical callback that lives in the main process.

Second, the callbacks passed to the main process will persist until the main process garbage-collects them.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

But remember the callback is referenced by the main process until you explicitly uninstall it. If you do not, each time you reload your window the callback will be installed again, leaking one callback for each restart.

To make things worse, since the context of previously installed callbacks has been released, exceptions will be raised in the main process when the `close` event is emitted.

To avoid this problem, ensure you clean up any references to renderer callbacks passed to the main process. This involves cleaning up event handlers, or ensuring the main process is explicitly told to deference callbacks that came from a renderer process that is exiting.

## Accessing built-in modules in the main process

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## 메소드

The `remote` module has the following methods:

### `remote.require(module)`

* `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

    project/
    ├── main
    │   ├── foo.js
    │   └── index.js
    ├── package.json
    └── renderer
        └── index.js
    

```js
// main process: main/index.js
const {app} = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.getCurrentWindow()`

Returns [`BrowserWindow`](browser-window.md) - The window to which this web page belongs.

### `remote.getCurrentWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents of this web page.

### `remote.getGlobal(name)`

* PrinterInfo Object

Returns `any` - The global variable of `name` (e.g. `global[name]`) in the main process.

## 속성

### `remote.process`

The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.