# Electron Application Architecture

Electron의 API를 살펴보기에 앞서 Electron 에서 사용할 수 있는 두 가지 프로세스 타입에 대해서 논의해 보아야 합니다. 이 둘은 근본적으로 다르기 때문에 자세히 이해할 필요가 있습니다.

## 메인과 렌더러 프로세스

Electron에서 `package.json`의 `main` 스크립트를 실행하는 프로세스를 **메인 프로세스**라고 부릅니다. 메인 프로세스에서 실행되는 스크립트는 웹 페이지들을 GUI 로 표시합니다. Electron 앱은 항상 하나의 메인 프로세스를 가지며, 둘 이상이 되는 경우는 없습니다.

Electron은 웹페이지를 보여주기 위해 Chromium을 사용하고 있기 때문에 Chromium의 멀티 프로세스 아키텍쳐 가 그대로 이용되고 있습니다. Electron 안에서 보여지는 각각의 웹페이지는 자신의 프로세스 안에서 동작하는데, 이 프로세스를 ** 렌더러 (renderer) 프로세스**라고 부릅니다.

일반적인 브라우저에서 웹 페이지는 대개 샌드박스 환경에서 실행되고 네이티브 리소스에는 액세스 할 수 없습니다. 그러나 Electron 을 사용하는 유저는 웹페이지가 Node.js APIs 를 이용할 수 있기 때문에, 보다 낮은 수준에서 운영체제와 상호작용하는 것이 허용되어 있습니다.

### 메인 프로세스와 렌더러 프로세스의 차이점

메인 프로세스는 `BrowserWindow` 인스턴스를 생성하여 웹페이지를 만듭니다. 각각의 `BrowserWindow` 인스턴스는 자체 렌더러 프로세스에서 웹 페이지를 실행합니다. `BrowserWindow` 인스턴스가 소멸되면, 해당 렌더러 프로세스도 종료됩니다.

메인 프로세스는 모든 웹 페이지와 각 페이지들이 소유한 렌더러 프로세스들을 관리합니다. 각각의 렌더러 프로세스는 서로 독립적으로 동작하고 그들이 실행된 웹페이지 내에서만 관여를 합니다.

웹 페이지에서 네이티브 GUI 관련 API를 호출하는 허용되지 않습니다. 왜냐하면 이것은 매우 위험한 일이고, 리소스 릭을 발생시키기 쉽기 때문입니다. 웹페이지에서 GUI작업을 수행하려면, 웹 페이지의 렌더러 프로세스가 메인 프로세스에게 이러한 작업을 수행하도록 요청해야 합니다.

> #### Aside : 프로세스 간 통신
> 
> Electron에는 메인 프로세스와 렌더러 프로세스 사이에 통신할 수 있는 몇 가지 방법이 있습니다. 예로, 메시지를 보내는 [`ipcRenderer`](../api/ipc-renderer.md) 와 [`ipcMain`](../api/ipc-main.md) 모듈과, RPC 스타일 통신인 [remote](../api/remote.md)모듈이 있습니다. FAQ에 [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages)를 참고하세요.

## Electron API 사용하기

Electron은 메인 프로세스와 렌더러 프로세스에서 데스크톱 응용 프로그램의 개발을 지원하는 Api들을 제공 합니다. 두 프로세스 모두에서 아래와 같이 모듈을 포함함으로 Electron의 Api를 액세스 함 :

```javascript
const electron = require('electron')
```

All Electron APIs are assigned a process type. Many of them can only be used from the main process, some of them only from a renderer process, some from both. The documentation for each individual API will state which process it can be used from.

A window in Electron is for instance created using the `BrowserWindow` class. It is only available in the main process.

```javascript
// This will work in the main process, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks. Electron comes with a module called `remote` that exposes APIs usually only available on the main process. In order to create a `BrowserWindow` from a renderer process, we'd use the remote as a middle-man:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Node.js API 사용하기

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) All APIs available in Node.js are available in Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](./security.md).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are *not* native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).