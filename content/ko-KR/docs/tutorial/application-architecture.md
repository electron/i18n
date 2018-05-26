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

모든 Electron API들은 프로세스 타입에 따라 사용됩니다. 대부분의 API 는 메인 프로세스에서만 사용할 수 있고, 일부는 렌더러프로세스에서만, 또 일부는 양쪽 모두에서 사용할 수 있습니다. 각 개별 API에 대한 문서는 해당 프로세스에서 사용할 수 있는지 명시합니다.

예를 들면, Electron 에서 Window는 `BrowserWindow` 클래스를 사용하여 만들어집니다. 그것은 메인 프로세스 에서만 사용할 수 있습니다.

```javascript
// This will work in the main process, but be `undefined` in a
// renderer process:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

프로세스 간의 통신 가능하기 때문에, 렌더러 프로세스는 작업을 수행하기위해 메인 프로세스를 호출할 수 있습니다. Electron 은보통 메인 프로세스에서만 사용가능한 API들을 노출시키는 `remote` 라는 모듈을 함께 제공합니다. 렌더러 프로세스에서 `BrowserWindow`를 만들기 위해 remote 모듈을 중간자(middle-man) 로 사용:

```javascript
// This will work in a renderer process, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Node.js API 사용하기

Electron은 메인과 렌더러 프로세스 모두에서 Node.js에 대한 전체 액세스를 제공합니다. 이것은 두가지 중요한 의미를 가집니다.

1) Node.js에서 사용할 수 있는 모든 Api 들은 Electron에서 사용할 수 있습니다. Electron 응용 프로그램에서 호출 하는 다음 코드는 작동:

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// This will print all files at the root-level of the disk,
// either '/' or 'C:\'.
console.log(root)
```

이미 추측 할 수 있듯이, 원격 콘텐츠를로드하려고 시도한 경우 이것은 보안에 중요한 영향을 미칩니다. 원격 콘텐츠 로드에 대한 더 많은 정보와 지침을 [security documentation](./security.md)에서 찾을 수 있습니다.

2) 응용 프로그램에서 Node.js 모듈을 사용할 수 있습니다. 당신의 사용하고자 하는 npm 모듈을 선택하십시오. npm은 현재 가장 큰 오픈소스 저장소를 제공한다. - 서버 프로그램에서 사용되는 잘 관리되고, 테스트된 코드들을 사용할 수 있는것은 Electron의 주요 기능 중 하나이다.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

```sh
npm install --save aws-sdk
```

그런 다음, Electron 응용 프로그램에서, Node.js 응용 프로그램을 빌드하는것 처럼 모듈을 require 하고 사용합니다.

```javascript
// A ready-to-use S3 Client
const S3 = require('aws-sdk/clients/s3')
```

1 개의 중요 한 경고는: 네이티브 Node.js 모듈 (즉, 사용 하기 전에 네이티브 코드의 컴파일 해야 하는 모듈)은 Electron에서 사용하기위해 컴파일해야합니다. 

Node.js 모듈의 대부분은 네이티브가 *아닙니다*. ~650.000 모듈중 400모듈만 네이티브입니다. 그러나, 네이티브 모듈을 사용해야하면, [this guide on how to recompile them for Electron](./using-native-node-modules.md)를 참조 하십시오.