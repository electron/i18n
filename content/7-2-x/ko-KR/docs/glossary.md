# 용어 사전

이 페이지는 Electron 개발에 흔히 사용되는 용어를 정의합니다.

### ASAR

ASAR는 Atom Shell Archive Format의 약자입니다. [asar](https://github.com/electron/asar) 아카이브는 `tar`과 비슷한 포맷으로, 모든 리소스를 단일 파일로 만듭니다. 그리고 Electron은 압축해제 없이 임의로 모든 파일을 읽어들일 수 있습니다.

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

C 런타임 라이브러리 (CRT) 는 ISO C99 표준 라이브러리를 통합하는 C++ 표준 라이브러리의 한 부분입니다. Visual C++ 라이브러리는 CRT를 네이티브 코드 개발 구현 및 네이티브코드와 관리되는 코드의 CRT를 구현하는 Visual C ++ 라이브러리는 네이티브 코드 개발, 네이티브 및 작성된 코드의 혼합, 순수하게 작성된 .NET 코드를 지원합니다.

### DMG

Apple Disk Image는 macOS에서 사용되는 패키징 포맷입니다. DMG 파일은 애플리케이션 "인스톨러" 배포에 사용됩니다. [electron-builder](https://github.com/electron-userland/electron-builder)는 `dmg`를 빌드 대상으로 지원합니다.

### IME

입력 매서드 편집기. 키보드에서 찾을 수 없는 문자나 기호를 사용자가 입력할 수 있게 해주는 프로그램입니다. 예를 들어 사용자가 중국어, 일본어, 한국어와 인도어 문자를 라틴어 키보드로 입력할 수 있습니다.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

[Chromium 콘텐츠 모듈](https://www.chromium.org/developers/content-module)과 Blink, [V8](#v8) 등등 Chromium 콘텐츠 모듈의 종속성 모듈을 포함한 공유된 라이브러리입니다. "libcc"라고도 불립니다.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### 주 프로세스

일반적으로 `main.js`라는 파일인 메인 프로세스는, 모든 Electron 앱의 진입점입니다. 열기에서 닫기까지 앱의 수명을 제어합니다. 또한 메뉴, 메뉴 막대, Dock, 트레이 같은 네이티브 요소를 관리합니다. 메인 프로세스는 앱에서 각각의 새로운 렌더러 프로세스를 생성합니다. 모든 Node API가 내장되어 있습니다.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

[process](#process), [렌더러 프로세스](#renderer-process)를 참조하세요.

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

프로세스 간 또는 프로세스 간 통신을위한 IPC 시스템이며, 이는 메모리 압박 등에 따라 작업을 별도의 프로세스로 분할 할 수 있는지 여부에 관심이 있기 때문에 중요합니다.

https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md 를 참조하세요.

### 네이티브 모듈

네이티브 모듈(Node.js에서 [애드온](https://nodejs.org/api/addons.html)이라고도 함)은 require() 함수를 사용하여 Node.js 또는 Electron에 로드 할 수 있는 C 또는 C ++로 작성된 모듈로 일반 Node.js 모듈처럼 사용됩니다. 이들은 Node.js에서 실행되는 JavaScript와 C/C++ 라이브러리 사이의 인터페이스를 제공하기 위해 주로 사용됩니다.

일랙트론은 노드의 네이티브 모듈을 지원하지만, 당신의 시스템에 설치된 노드와 다른 v8 버전을 사용해서 빌드할 가능성이 매우 높다. 따라서 네이티브 모듈을 빌드할 때는 반드시 수동으로 일랙트론의 헤더위치를 지정해야한다.

[네이티브 노드 모듈 사용하기](tutorial/using-native-node-modules.md) 를 참고하기 바란다.

### NSIS

Nullsoft Scriptable Install System은 Microsoft Windows 용 스크립트 기반 설치 프로그램 작성 도구입니다. 이 소프트웨어는 무료 소프트웨어 라이센스의 조합으로 배포되며 InstallShield와 같은 상업용 독점 제품에 대한 널리 사용되는 대안입니다. [electron-builder](https://github.com/electron-userland/electron-builder)는 빌드 대상으로 NSIS를 지원합니다.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### 프로세스

프로세스는 실행중인 컴퓨터 프로그램의 인스턴스입니다. [메인](#main-process) 및 하나 이상의 [렌더러](#renderer-process) 프로세스를 사용하는 전자 앱은 실제로 여러 프로그램을 동시에 실행하고 있습니다.

Node.js 와 Electron 에선, 각각의 실행 중인 프로세스들은 `process` 객체를 가지고 있습니다. 이 객체는 현재 프로세스에 대한 정보를 제공하고 현재 프로세스를 제어하는 전역입니다. 전역으로 require()를 사용하지 않고도 응용 프로그램에서 항상 사용할 수 있습니다.

참고: [메인 프로세스](#main-process), [렌더러 프로세스](#renderer-process)

### 렌더러 프로세스

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

일반적인 브라우저에서 웹 페이지는 대개 샌드박스 환경에서 실행하고 네이티브 리소스에 액세스 할 수 없습니다. 그러나 Electron 유저들은 Node.js APIs 의 낮은 수준의 운영체제 상호 작용을 허용하는 웹 페이지에서 힘이 있다.

참고: [프로세스](#process), [메인 프로세스](#main-process)

### Squirrel

Squirrel은 Electron 앱에 새로운 버전이 적용되면 자동으로 업데이트할 수 있도록 하는 오픈 소스 프레임워크입니다. Squirrel로 시작하기 위해 [autoUpdater](api/auto-updater.md) API 에서 정보를 살펴보세요.

### 사용자 공간

774/5000 이 용어는 "userland"또는 "userspace"가 운영 체제 커널 외부에서 실행되는 프로그램을 나타내는 Unix 커뮤니티에서 유래했습니다. 보다 최근에는 "노드 코어"에서 사용 가능한 기능과 훨씬 더 큰 "사용자"커뮤니티에서 npm 레지스트리에 게시 한 패키지를 구별하기 위해이 용어가 노드 및 npm 커뮤니티에서 널리 사용되었습니다.

Node와 마찬가지로 Electron은 다중 플랫폼 데스크톱 응용 프로그램 개발에 필요한 모든 기본 요소를 제공하는 작은 API 집합에 중점을 둡니다. 이 디자인 철학을 통해 Electron은 어떻게 사용해야 하는지에 대해 지나치게 규정하지 않고도 유연한 도구를 유지할 수 있습니다. 사용자 공간을 통해 사용자는 "핵심"에서 제공되는 기능 외에 추가 기능을 제공하는 도구를 작성하고 공유 할 수 있습니다.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron은 Chromium의 일부로 V8을 빌드한 다음 V8을 빌드할 때 노드가 해당 V8을 가리킵니다.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` 태그는 Electron 앱에 '게스트'컨텐츠 (예: 외부 웹 페이지)를 포함시키는 데 사용됩니다. `iframe`과 비슷하지만 각 웹뷰가 별도의 프로세스에서 실행된다는 점이 다릅니다. 웹 페이지와 동일한 권한이 없으며 앱과 포함 된 콘텐츠 간의 모든 상호 작용이 비동기식입니다. 이렇게하면 내장된 콘텐츠로부터 앱을 안전하게 보호할 수 있습니다.
