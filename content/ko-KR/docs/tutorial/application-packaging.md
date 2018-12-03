# 응용 프로그램 패키징

Windows에서 일어나는 긴 경로 이름에 대한 [issues](https://github.com/joyent/node/issues/6960)를 완화하고 `require` 속도를 약간 빠르게 하며 애플리케이션의 리소스와 소스 코드를 좋지 않은 사용자로부터 보호하기 위해 애플리케이션을 [asar](https://github.com/electron/asar) 아카이브로 패키징 할 수 있습니다.

[`electron-packager`](https://github.com/electron-userland/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), and [`electron-builder`](https://github.com/electron-userland/electron-builder) 에서 지원하기 때문에, 대부분의 사용자들은 무료로 이 기능을 사용할 수 있습니다. 이 도구들을 사용하지 않는다면, 계속 읽어보십시오.

## `asar` 아카이브 생성하기

[asar](https://github.com/electron/asar) 아카이브는 tar과 비슷한 간단한 포맷으로 모든 리소스를 하나의 파일로 만듭니다. 그리고 Electron은 압축해제 없이 임의로 모든 파일을 읽어들일 수 있습니다.

간단한 작업을 통해 애플리케이션을 `asar` 아카이브로 압축할 수 있습니다:

### 1. asar 유틸리티 설치

```sh
$ npm install -g asar
```

### 2. `asar pack` 커맨드로 앱 패키징

```sh
$ asar pack your-app app.asar
```

## `asar` 아카이브 사용하기

Electron은 Node.js로부터 제공된 Node API와 Chromium으로부터 제공된 Web API 두 가지 API를 가지고 있습니다. 따라서 `asar` 아카이브는 두 API 모두 사용할 수 있도록 지원합니다.

### Node API

Electron에선 `fs.readFile`과 `require` 같은 Node API들을 지원하기 위해 `asar` 아카이브가 가상의 디렉터리 구조를 가지도록 패치했습니다. 그래서 아카이브 내부 리소스들을 정상적인 파일 시스템처럼 접근할 수 있습니다.

예를 들어 `/path/to`라는 경로에 `example.asar`라는 아카이브가 있다고 가정하면:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

`asar` 아카이브에선 다음과 같이 파일을 읽을 수 있습니다:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

아카이브 내의 루트 디렉터리를 리스팅합니다:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

아카이브 안의 모듈 사용하기:

```javascript
require('/path/to/example.asar/dir/module.js')
```

`asar`아카이브의`BrowserWindow` 클래스를 이용해 원하는 웹 페이지도 표시할 수 있습니다

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

웹 페이지 내에선 아카이브 내의 파일을 `file:` 프로토콜을 사용하여 요청할 수 있습니다. 이 또한 `Node API`와 같이 가상 디렉터리 구조를 가집니다.

예를 들어 jQuery의 `$.get`을 사용하여 파일을 가져올 수 있습니다:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### `asar` 아카이브를 일반 파일로 취급하기

`asar` 아카이브의 체크섬(checksum) 을 검사하는 작업등을 하기 위해선 `asar` 아카이브를 파일 그대로 읽어야 합니다. 이러한 작업을 하기 위해 `original-fs` 빌트인 모듈을 `fs` 모듈 대신에 사용할 수 있습니다. 이 모듈은 `asar` 지원이 빠져있습니다. 즉 파일 그대로를 읽어들입니다:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

또한 `process.noAsar`를 `true`로 지정하면 `fs` 모듈의 `asar` 지원을 비활성화 시킬 수 있습니다.

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Node API의 한계

`asar` 아카이브를 Node API가 최대한 디렉터리 구조로 작동하도록 노력해왔지만, 여전히 저수준(low-level nature) Node API 때문에 한계가 있습니다.

### 아카이브는 읽기 전용입니다

아카이브는 수정할 수 없으며 기본적으로는 Node API로 파일을 수정할 수 있지만 `asar` 아카이브에선 작동하지 않습니다.

### 아카이브 안의 디렉터리를 작업 경로로 설정하면 안됩니다

`asar/0>아카이브는 디렉터리처럼 사용할 수 있도록 구현되었지만 그것은 실제 파일시스템의 디렉터리가 아닌 가상의 디렉터리이고, 그런 이유로 <code>asar` 아카이브 안의 디렉터리 경로로 작업할 수 없다. 따라서 몇몇 API에서 지원하는 `cwd` 옵션 또한 문제를 야기한다. 

### 특정 API로 인한 예외적인 아카이브 압축 해제

많은 `fs` API가 `asar` 아카이브의 압축을 해제하지 않고 바로 아카이브를 읽거나 정보를 가져올 수 있으나 몇몇 API는 시스템의 실제 파일의 경로를 기반으로 작동하므로 Electron은 API가 원할하게 작동할 수 있도록 임시 경로에 해당되는 파일의 압축을 해제합니다. API들을 위한 이 작업은 약간의 오버헤드를 불러 일으킬 수 있습니다.

위 예외에 해당하는 API 메서드는 다음과 같습니다:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Used by `require` on native modules

### `fs.stat`의 예측 스테이터스 정보

`fs.stat` 로부터 반환되는 `Stats` 객체와 비슷한 Api들은 `asar` 아카이브를 타겟으로 할 경우 예측된 디렉터리 파일 정보를 가집니다. 왜냐하면 아카이브의 디렉터리 경로는 실제 파일 시스템에 존재하지 않기 때문입니다. 그러한 이유로 파일 크기와 파일 타입 등을 확인할 때 `Stats` 객체를 신뢰해선 안됩니다.

### `asar` 아카이브 내부의 바이너리 실행

Node API에는 `child_process.exec`, `child_process.spawn` 그리고 `child_process.execFile`와 같은 바이너리를 실행시킬 수 있는 API가 있습니다. 하지만 `asar` 아카이브 내에선 `execFile` API만 사용할 수 있습니다.

이 한계가 존재하는 이유는 `exec`와 `spawn`은 `file` 대신 `command`를 인수로 허용하고 있고 `command`는 shell에서 작동하기 때문입니다. 그리고 asar 아카이브 내의 파일을 사용하는지 결정하는데 적절한 방법을 가지고 있지 않으며, 심지어 그게 가능하다고 해도 부작용 없이 명령 경로를 대체할 수 있는지에 대해 확실히 알 수 있는 방법이 없습니다.

## `asar` 아카이브에 압축 해제된 파일 추가하기

위에서 언급했듯이, 일부 Node API는 호출시 파일을 파일 시스템에 압축을 풉니다. 성능 문제 외에도 다양한 안티 바이러스 프로그램이 이 동작에 의해 트리거 될 수 있습니다.

이 문제를 해결하기 위해 ` -unpack ` 옵션을 사용하여 여러 파일을 압축 해제 된 상태로 둘 수 있습니다. 다음 예제에서 기본 Node.js 모듈의 공유 라이브러리는 압축되지 않습니다.

```sh
$ asar pack app app.asar --unpack *.node
```

명령을 실행하면 ` app.asar.unpacked ` 폴더가 ` app.asar ` 파일과 함께 만들어 졌음을 알 수 있습니다. 이 폴더에는 압축을 푼 파일이 들어 있고, ` app.asar ` 아카이브와 함께 제공해야합니다.