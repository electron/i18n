# Debugg Main Process trong node-inspector

[`node-inspector`](https://github.com/node-inspector/node-inspector) provides a familiar DevTools GUI that can be used in Chrome to debug Electron's main process, however, because `node-inspector` relies on some native Node modules they must be rebuilt to target the version of Electron you wish to debug. You can either rebuild the `node-inspector` dependencies yourself, or let [`electron-inspector`](https://github.com/enlight/electron-inspector) do it for you, both approaches are covered in this document.

**Note**: At the time of writing the latest release of `node-inspector` (0.12.8) can't be rebuilt to target Electron 1.3.0 or later without patching one of its dependencies. If you use `electron-inspector` it will take care of this for you.

## Sử dụng `electron-inspector` cho việc Debug

### 1. Đầu tiên phải cài đặt công cụ [node-gyp](https://github.com/nodejs/node-gyp#installation)

### 2. Cài đặt [`electron-rebuild`](https://github.com/electron/electron-rebuild).

```shell
npm install electron-rebuild --save-dev
```

### 3. Cài đặt [`electron-inspector`](https://github.com/enlight/electron-inspector)

```shell
npm install electron-inspector --save-dev
```

### 4. Chạy Electron

Chạy Electron với chế độ `--debug`:

```shell
electron --debug=5858 your/app
```

or, to pause execution on the first line of JavaScript:

```shell
electron --debug-brk=5858 your/app
```

### 5. chạy electron-inspector

Trên macOS / Linux:

```shell
node_modules/.bin/electron-inspector
```

Trên Windows:

```shell
node_modules\\.bin\\electron-inspector
```

`electron-inspector` will need to rebuild `node-inspector` dependencies on the first run, and any time you change your Electron version. The rebuild process may require an internet connection to download Node headers and libs, and may take a few minutes.

### 6. Tải giao diện debugger

Open http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 in the Chrome browser. You may have to click pause if starting with `--debug-brk` to force the UI to update.

## Sử dụng `node-inspector` cho việc Debug

### 1. Đầu tiên phải cài đặt công cụ [node-gyp](https://github.com/nodejs/node-gyp#installation)

### 2. Cài đặt [`node-inspector`](https://github.com/node-inspector/node-inspector)

```bash
$ npm install node-inspector
```

### 3. Cài đặt [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)

```bash
$ npm install node-pre-gyp
```

### 4. Recompile the `node-inspector` `v8` modules for Electron

**Note:** Update the target argument to be your Electron version number

```bash
$ node_modules/.bin/node-pre-gyp --target=1.2.5 --runtime=electron --fallback-to-build --directory node_modules/v8-debug/ --dist-url=https://atom.io/download/atom-shell reinstall
$ node_modules/.bin/node-pre-gyp --target=1.2.5 --runtime=electron --fallback-to-build --directory node_modules/v8-profiler/ --dist-url=https://atom.io/download/atom-shell reinstall
```

See also [How to install native modules](using-native-node-modules.md#how-to-install-native-modules).

### 5. Enable debug mode for Electron

You can either start Electron with a debug flag like:

```bash
$ electron --debug=5858 your/app
```

or, to pause your script on the first line:

```bash
$ electron --debug-brk=5858 your/app
```

### 6. Chạy server [`node-inspector`](https://github.com/node-inspector/node-inspector) đang sử dụng Electron

```bash
$ ELECTRON_RUN_AS_NODE=true path/to/electron.exe node_modules/node-inspector/bin/inspector.js
```

### 7. Load the debugger UI

Open http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 in the Chrome browser. You may have to click pause if starting with `--debug-brk` to see the entry line.