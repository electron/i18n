# 성능(Performance) 향상

개발자들이 Electron application의 성능 향상 전략에대해 자주 묻습니다. 소프트웨어 공학자, 소비자, 그리고 프레임워크 개발자들은 단 한가지 "performance"의 정의에 대해 동의하지 않습니다. 이 문서는 몇몇 electron maintainer 들이 선호하는 메모리, cpu, 디스크 resource 사용에 대한 최적화와 최대한 빠르게 유저 입력에 응답하고, 작업을 수행하는 방법에대해 약간이나마 기술하고있습니다. 그리고 모든 성능 향상 전략은 개발 중인 어플리케이션의 보안을 해쳐서는 안 될 것입니다.

자바스크립트를 이용하여 웹사이트의 성능을 높일 때 사용했던 모든 지식과 정보는 대부분 Electron 어플리케이션에도 적용할 수 있습니다. Node.js 어플리케이션의 성능을 향상할 때 사용하는 방법도 어느 정도까지는 적용가능합니다. 하지만, "성능"이란 말이 Node.js 백엔드에서와 어플리케이션 client에서 가지는 의막 상당히 다를 수 있다는 점을 주의해야 합니다.

아래의 항목들을 참고하실 수 있지만, [보안 체크리스트][security]와 마찬가지로 많은 다른 방법이 존재할 것입니다. 아래의 항목들을 모두 적용한 Electron 어플리케이션도 느리게 동작할 수 있습니다. Electron은 개발자가 원하는 기능을 실현할 수 있게 해주는 강력한 개발 플랫폼입니다. 이는 동시에 성능 또한 개발자의 책임이라는 뜻이기도 합니다.

## 측정, 측정, 측정

아래 목록에는 구현하기 쉽고 매우 간단한 여려 단계가 포함되어 있습니다. 그러나, 가장 성능이 뛰어난 앱을 구축하여 여러 단계를 넘어서야 합니다. 대신에, 당신은 신중하게 프로파일링하여 앱에서 실행중인 모든 코드를 면밀히 검토해야 합니다. 장애물 현상은 어디에 있습니까? 사용자가 버튼을 클릭하면 작전은 시간의 잔인한 부분을 차지하게 됩니까? 앱이 유휴 상태인 동안 객체가 가장 많은 메모리를 차지합니까?

몇 번이고, 우리는 가장 성공적인 구축 전략을 해보았고, 고성능 Electron 앱을 실행 코드를 프로파일링하여 가장 많이 찾았고, 부족한 부분을 최적화하였습니다. 겉보기 반복을 계속해서 힘든 과정을 반복한다면 앱의 성능이 크게 향상됩니다. 비주얼 스튜디오 코드 또는 슬랙은 이 관행이 지금가지 가장 신뢰할 수 있는 전략이라는 것을 보여주고 있습니다.

앱 코드를 프로파일링하는 방법에 대해 자세히 알아 보려면 크롬 개발자 도구에 들어가야 합니다. 여러 프로세스를 살펴보는 고급 분석을 한번에 크롬 추척 도구를 사용하는 것을 고려하십시오.

### 권장 읽기

 * [시작해요, 런타임 성능 분석][chrome-devtools-tutorial]
 * [비주얼 스튜디오 코드 - 첫번째 두번째][vscode-first-second]

## 체크리스트

앱일 조금 더 빠르거나 일반적으로 더 느릴 수 있습니다. 또한 이 단계를. 시도하면 리소스가 부족합니다.

1. [부주의한 모듈을 포함](#1-carelessly-including-modules)
2. [빠른 코드 로드 및 실행](#2-loading-and-running-code-too-soon)
3. [메인 프로세스에서의 차단](#3-blocking-the-main-process)
4. [렌더러 프로세스에서의 차단](#4-blocking-the-renderer-process)
5. [불필요한 폴리필](#5-unnecessary-polyfills)
6. [네트워크 요청 및 불필요한 차단](#6-unnecessary-or-blocking-network-requests)
7. [코드 번들](#7-bundle-your-code)

## 1) 부주의한 모듈 포함

Node.js 모듈을 애플리케이션에 추가하기 전에 해당 모듈을 검사하세요. 해당 모듈에 얼마나 많은 종속성이 포함되어 있습니까? 어떤 종류의 자원 <요청>문에서 간단히 호출해야 합니까? NPM 패키지 레지스트리에서 가장 많이 다운로드되거나 깃허브에서 가장 많은 별표가 있는 모듈을 실제로 가장 가볍거나 작은 것을 찾을 수 있습니다.

### 왜냐구요?

이 권장 사항에 대한 이유는 실제 세계에서 가장 잘 설명된 예입니다. 전자의 초기, 네트워크의 안정적인 감시와 연결 문제가 발생하여 많은 앱이 모듈을 사용하여 간단한 isOnline() 메서드입니다.

해당 모듈은 잘 알려진 여러 엔드 포인터에 접근하여 네트워크 연결을 감지하였습니다. 엔드 포인트 목록의 경우 잘 알려진 포트 목록을 포함하는 다른 모듈에 의존합니다. 이 의존성 자체는 포트에 대한 정보를 포함하는 모듈에 의존했으며, 10만 줄 이상의 컨텐츠를 가진 JSON 파일 형식으로 제공되었습니다. 모듈이 로드 될 때 마다 (보통 require ('module')문에서) 모든 종속성을 로드하고 결국 JSON 파일을 읽고 구문 분석을 합니다. 수 천 줄의 JSON을 파싱하는 것은 비용이 많이 드는 작업입니다. 느린 기계에서 시간이 오래 걸릴 수 있습니다.

많은 서버 컨텍스트에서 시작 시간은 사실상 관련이 없습니다. 모든 포트에 대한 정보가 필요한 Node.js 서버는 서버가 부팅할 때마다 필요한 모든 정보를 메모리에 로드할 경우 실제로 "성능이 우수" 할 수 있습니다. 이 예제에서 논의된 모듈은 "나쁜" 모듈이 아닙니다. 그러나 Electron 앱은 실제로 필요하지 않은 메모리 정보를 로드, 파싱 및 저장해서는 안됩니다.

간단하게 말해, Linux를 실행하는 Node.js 서버용으로 작성된 훌륭한 모듈은 앱 성능에 나쁜 소식일 수 있습니다. 특정적인 예시에서, 올바른 솔류션은 모듈을 전혀 사용하지 않고 대신 Chromium 최신 버전에 포함된 연결 확인을 사용하는 것입니다.

### 어떻게 하나요?

모듈을 고려할 때 다음을 확인하는 것이 좋습니다.

1. 포함된 종속성의 크기 2) 로드하는데 필요한 자원 (require)))
3. 관심있는 작업을 수행하는데 필요한 리소스

명령 행에서 단일 명령으로 모듈을 로드하기 위한 CPU 프로 파일 및 힙 메모리 프로 파일을 생성할 수 있습니다. 아래 예시에서는 널리 사용되는 모듈 요청을 살펴볼 수 있습니다.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

이 명령을 실행하면 실행한 디렉토리에서 .cpuprofile 파일과 .heapprofile 파일이 생성됩니다. 두 파일 모두를 사용하여 분석할 수 있으면, 성능 과 메모리 탭을 사용하는 Chrome 개발자 도구를 사용할 수 있습니다.

![performance-cpu-prof][]

![performance-heap-prof][]

이 예시에서 저자의 컴퓨터에서 로딩 요청에 노드 반입은 메모리를 50ms미만으로 크게 줄였습니다.

## 2) 빠른 코드 로드 및 실행

리소스가 많이 소요되는 설치 작업이 있는 경우, 이 작업을 연기하는 것이 좋습니다. 해당 애플리케이션이 시작된 직후에 실행중인 모든 작업을 검사하세요. 모든 작업을 급하게 수행하는 대신,  사용자의 이동 경로와 더 밀접하게 일치하는 순서로 작업에 시차를 두는 것을 고려해보세요.

기존의 Node.js 개발에서, 우리는 모든 `require()` 문을 위에 작성하곤 했습니다. 만약 현재 동일한 전략을 사용한 Electron 애플리케이션을 작성하고 있고, 즉시 필요하지 않은 상당한 규모의 모듈을 사용하고 있다면 동일한 전략을 적용하고 적절한 때에 로딩을 연기하세요.

### 왜냐구요?

모듈을 로딩하는 것은 놀라울 정도로 리소스가 많이 필요한 작업입니다. 특히 Windows에서요. App이 시작될 때, 지금 당장 필요하지 않은 작업을 위해 유저들을 기다리게 하면 안됩니다.

이는 당연하게 보일 수 있지만, 많은 애플리케이션은 app이 실행된 직후에 많은 양의 작업을 수행하는 경향이 있습니다. 업데이트 확인, 이후 흐름에서 사용되는 컨텐츠 다운로드 또는 대용량 디스크 I/O 작업 수행과 같은 것들이요.

비주얼 스튜디오 코드를 예로 들어 보겠습니다. 파일을 열면, 코드 강조 표시 없이 즉시 파일을 display하여 텍스트와 상호작용하는 것을 우선 순위로 둡니다. 그 일을 끝내면, 코드 강조 표시로 이동합니다.

### 어떻게 하나요?

예를 들어 애플리케이션이 가상의 `.foo` 형식으로 파일을 구문 분석한다고 가정해 봅시다. 이를 위해, 똑같이 가상의 `foo-parser`모듈에 의존합니다. 전통적인 Node.js 개발에서, 종속성을 최대한 로드하려는 코드를 작성할지도 모릅니다.

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

위의 예시에서, 파일이 로드되자마자 많은 작업을 수행하고 있습니다. 당장 파일들을 파싱해야 할까요? 이 작업을 좀 나중에 해도 될까요?  `getParsedFiles()`이 실제로 호출될 때요.

```js
// "fs"는 이미 로드중일 가능성이 높아 'require()' 호출은 리소스가 덜 소요되는 const fs = require('fs') 입니다.
    // 또한, 비동기 버전을 사용함으로써 다른 작업을 차단하고 있지는 않은지 확인합니다.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // 'require()'은 모듈 캐시와 함께 제공되므로
// 'require()' 호출은 한 번만 많은 리소스를 요구할 것입니다.
// 이후 호출되는 `getParsedFiles()`는 더 빠를 것입니다.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// 이 작업은 이전 예시인 const parser = new Parser()보다 훨씬 덜 리소스를 필요로 합니다.

module.exports = { parser }
```

즉, app이 시작될 때 리소스를 모두 할당하는 대신 "적시에" 리소스를 할당합니다.

## 3) main process 차단

Electron의 main process (때로는 "browser process"라고도 불림) 는 특별합니다. 이는 앱의 다른 모든 process들, 운영 체제와 상호 작용하는 기본 process에 대한 상위 process이기 때문이죠. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

어떤 경우에도 이 process와 UI 스레드를 장시간 실행되는 작업으로 차단해서는 안됩니다. UI 스레드를 차단하는 것은 app 전체가 main process가 처리를 계속할 준비가 될 때까지 멈춘다는 의미입니다.

### 왜냐구요?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. 만약 윈도우가 매우 원활한 애니메이션을 렌더링하고 있다면, 이 작업은 GPU process와 상의할 필요가 있을 것입니다. 그럼 다시 main process를 거치게 될 것입니다.

Electron과 크롬은 UI 스레드가 차단되지 않도록 무거운 디스크 I/O와 CPU 바인딩 작업을 새 스레드에 넣도록 주의합니다. 당신도 똑같이 해야합니다.

### 어떻게 하나요?

Electron의 강력한 multi-process 아키텍처는 장시간 실행되는 task들 뿐만 아니라 적은 수의 성능 트랩들도 지원할 준비가 되어있습니다.

1) 장시간 실행되는 CPU의 무거운 task의 경우, [worker threads][worker-threads]을 사용하고 BrowserWindow로 이동시키는 것을 고려하거나, (마지막 수단으로) 전용 process를 생성하세요.

2) 동기식 IPC와 `remote` 모듈의 사용을 가급적 피하세요. 합법적인 사용 사례가 있긴 하지만, `remote` 모듈을 사용하여 자신도 모르게 UI 스레드를 차단하는 것은 너무 쉽습니다.

3) main process에서 I/O 차단 작업을 사용하지 않도록 하세요. 즉, 핵심 Node.js 모듈(`fs`나 `child_process`)이 동기식 또는 비동기식 버전을 제공할 때마다, 비동기식 및 비차단식 변수를 선택해야 합니다.


## 4) renderer process 차단

Electron은 현재 버전의 크롬과 함께 제공되기 때문에, 당신은 웹 플랫폼이 제공하는 가장 최신의 훌륭한 기능을 이용할 수 있습니다. 무거운 작업을 미루거나 오프로드하여 앱을 원활하고 반응성있게 유지할 수 있습니다.

### 왜냐구요?

App에는 renderer process를 실행하기 위해 많은 자바스크립트가 있을 것입니다. 스크롤링을 원활하게 유지하거나, 사용자 입력이나 60fps의 애니메이션에 응답하기 위해 필요한 리소스를 빼앗지 않고 최대한 신속하게 작업을 실행하는 것이 요령입니다.

Renderer 코드의 작업 흐름을 조정하는 것은 사용자들이 app의 가끔의 "끊김"에 대해 불평할 때 특히 유용합니다.

### 어떻게 하나요?

일반적으로, 현대 브라우저에 적용되는 성능 기준에 맞는 웹 애플리케이션을 구축하기 위한 모든 조언은 Electron의 렌더러에도 적용됩니다. 현재 원하는 대로 쓸 수 있는 두 가지 기본 도구는 작은 작업에서 사용할 수 있는 `requestIdleCallback()` 과 장시간 실행되는 작업을 위한 `Web Workers` 가 있습니다.

*`requestIdleCallback()`* 는 process가 유휴 기간에 진입하는 즉시 실행할 function을 개발자가 대기열에 넣을 수 있도록 합니다. 사용자 경험에 영향을 주지 않고 우선 순위가 낮거나 배경 작업을 수행할 수 있게 합니다. 사용 방법에 대한 자세한 내용은 [MDN에 대한 설명서를 확인하세요.][request-idle-callback]

*Web Workers*는 별도의 스레드에서 코드를 실행할 수 있는 강력한 도구입니다. 그러나 고려해야 할 몇 가지 주의사항이 있습니다. - Electron의 [멀티스레딩 문서][multithreading]와 [Web Workers를 위한 MDN 문서][web-workers]를 참고하세요. 이들은 오랜 시간 동안 많은 CPU 전력이 필요한 모든 작업에 이상적인 해결책입니다.


## 5) 불필요한 polyfills

Electron의 가장 큰 장점 중 하나는 어떤 엔진이 JavaScript, HTML, 그리고 CSS를 분석할지는 정확하게 알 수 있다는 점입니다. 큰 웹을 위한 코드의 용도를 변경하는 경우, Electron에 polyfill 기능이 포함되지 않도록 하세요.

### 왜냐구요?

오늘 날의 인터넷을 위한 웹 응용 프로그램을 구축할 때, 가장 오랜된 환경이 사용할 수 있는 기능과 사용할 수 없는 기능을 좌우합니다. 그럼에도 Electron은 잘 수행되는 CSS 필터와 애니메이션 등을 지원한다-오래된 브라우저들은 그렇지 못 할 것이다-. WebGL을 사용할 수 있는 경우 개발자는 구형 전화를 지원하기 위해 더 많은 리소스가 필요한 솔루션을 선택했을 수 있습니다.

JavaScript에 관해서, DOM selector을 위해 jQuery같은 툴킷 라이브러리나 `async/await`을 지원하기 위해`regenerator-runtime`같은 polyfill을 포함시켰을 수도 있습니다.

JacaScript 기반의 polyfill이 동등한 Electron의 기본 기능보다 빠른 것은 드문 일입니다. 다른 버전의 표준 웹 플랫폼 기능을 이용해서 Electron 앱의 속도를 저하시키지 마세요.

### 어떻게 하나요?

Polyfill이 최근 버전의 Electron에서 불필요하다는 가정하에 실행하세요. If you have doubts, check \[caniuse.com\]\[https://caniuse.com/\] and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

또한, 사용한 라이브러리를 주의 깊게 검토하세요. 정말로 필요한 것들입니까? 예를 들면, `jQuery`는 매우 성공적이서 현재는 대부분의 기능이 [(standard JavaScript feature set available)][jquery-need] 표준 JavaScript에서 가능하다.

TypeScript와 같은 트랜스필러/컴파일러를 사용하는 경우, 해당 구성을 검사하고 Electron이 지원하는 가장 최신의 ECMAScript 버전을 대상으로 하고 있는지 확인하세요.


## 6) 불필요하거나 차단된 네트워크 요청

애플리케이션과 쉽게 묶어질 수 있는 경우, 인터넷에서 리소스를 거의 변경하지 않도록 하십시오.

### 왜냐구요?

대부분의 Electron 사용자는 데스크톱 애플리케이션로 전환하고자 하는 웹 기반의 애플리케이션으로 시작을 합니다. 웹 개발자들에게 Electron은 다양한 콘텐츠 전송 네트워크의 리소스를 로딩하는 데에 사용됩니다. Now that you are shipping a proper desktop application, attempt to "cut the cord" where possible
 - and avoid letting your users wait for resources that never change and could easily be included  in your app.

대표적인 예로 구글 글꼴이 있습니다. 많은 개발자들이 구글의 콘텐츠전송네트워크와 함께 제공되는 인상적인 무료 글꼴 컬렉션을 사용합니다. The pitch is straightforward: 몇 줄의 CSS를 포함하면 나머지는 구글이 알아서 할 것입니다.

Elctron 앱을 만들 때, 글꼴을 다운로드하여 앱에 포함시키면 사용자에게 더 좋은 서비스를 제공할 수 있을 것입니다.

### 어떻게 하나요?

이상적인 환경에서 당신의 애플리케이션은 실행하기 위한 네트워크가 필요하지 않을 것입니다. 그렇게 하기 위해서는, 당신의 앱이 다운로드하는 리소스들을 이해하고\-리소스들이 얼마나 큰 지 알아야 합니다.

그렇게 하려면 개발자 도구를 여세요. `Network`탭으로 이동하여 `Disable cache`옵션을 선택하세요. 그런 다음 렌더러(renderer) 를 다시 로드합니다. 당신의 앱이 재로드(reload) 를 금지하지 않았다면, 일반적으로는 개발자 도구를 포커스로 둔 채로`Cmd + R`이나 `Ctrl + R`를 누르면 작동시킬 수 있을 것입니다.

이제 툴(tool) 이 꼼꼼하게 모든 네트워크 요청을 기록합니다. 첫번째 단계로, 더 큰 파일에 우선적으로 집중하여 다운로드 중인 모든 리소스를 점검하세요. 변하지 않는 이미지, 글꼴, 미디어 파일이 묶음(bundle) 에 포함 될 수 있나요? 그럴 수 있다면 하나로 묶으세요.

다음 단계로, `Network Throttling`을 활성화하세요. 최근에 `Online`을 읽은 드롭다운(drop-down) 을 찾고 `Fast 3G`와 같은 느린 속도를 선택하세요. 랜더러(renderer) 를 다시 로드 한 후 앱이 불필요하게 대기하는 리소스가 있는지 확인하세요. 대부분의 경우 앱은 실제로 관련 리소스가 필요하지 않음에도 불구하고 네트워크 요청이 완료될 때까지 기다립니다.

팁으로, 애플리케이션 업데이트를 발송하지 않고 인터넷에서 변경하려는 리소스를 로딩하는 것은 좋은 방법입니다. 리소스가 로드되는 방식을 고급 방식으로 제어하고 싶다면, [Service Workers][service-workers]에 투자하는 것을 고려하세요.

## 7) 코드를 묶으세요

이미 [Loading and running code too soon(빠른 코드 로드 및 실행)](#2-loading-and-running-code-too-soon)에서 언급한 바와 같이 `require`를 호출하는 것은 비용이 많이 드는 작업입니다. 그렇게 할 수 있다면, 애플리케이션의 코드를 단일 파일로 묶으세요.

### 왜냐구요?

일반적으로 최신의 JavaScript 개발에는 많은 파일과 모듈이 포함됩니다. 이는 Electron으로 개발하는데에 있어서 문제가 없으나, 우리는 `require()`호출에 포함된 오버헤드가 애플리케이션 로드할 때 한 번만 사용되는 것을 보장하기 위해서 모든 코드를 하나의 단일 파일로 묶을 것을 강력하게 권고합니다.

### 어떻게 하나요?

수 많은 JavaScript bundler가 있으며 우리는 어느 하나가 다른 것보다 낫다고 말하는 것이 커뮤니티를 화나게 한다는 것을 알고 있습니다. 그러나 우리는 Node.js와 브라우저 환경을 다루는 Electron의 독특한 특성을 다룰 수 있는 bundler를 사용하기를 권합니다.

이 문서를 쓰는 시점에서, 인기있는 선택에는 [Webpack][webpack], [Parcel][parcel], [rollup.js][rollup]가 포함됩니다.

[security]: ./security.md
[performance-cpu-prof]: ../images/performance-cpu-prof.png
[performance-heap-prof]: ../images/performance-heap-prof.png
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
