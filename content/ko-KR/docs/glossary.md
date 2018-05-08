# 용어 사전

이 페이지는 Electron 개발에 흔히 사용되는 용어를 정의합니다.

### ASAR

ASAR는 Atom Shell Archive Format의 약자입니다. [asar](https://github.com/electron/asar) 아카이브는 `tar`과 비슷한 포맷으로, 모든 리소스를 단일 파일로 만듭니다. 그리고 Electron은 압축해제 없이 임의로 모든 파일을 읽어들일 수 있습니다.

ASAR 포맷은 Windows에서의 성능 향상을 목적으로 만들어졌습니다... [작성 중]

### Brightray

Brightray는 애플리케이션에서 [libchromiumcontent](#libchromiumcontent)를 쉽게 사용하기 위해 만들어진 정적 라이브러리[였습니다.](https://github.com/electron-archive/brightray) 이제 더는 사용되지 않고, Electron의 기본 코드에 통합되었습니다.

### CRT

C 런타임 라이브러리 (CRT) 는 ISO C99 표준 라이브러리를 통합하는 C++ 표준 라이브러리의 한 부분입니다. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### DMG

Apple Disk Image는 macOS에서 사용되는 패키징 포맷입니다. DMG 파일은 애플리케이션 "인스톨러" 배포에 사용됩니다. [electron-builder](https://github.com/electron-userland/electron-builder)는 `dmg`를 빌드 대상으로 지원합니다.

### IME

입력 매서드 편집기. 키보드에서 찾을 수 없는 문자나 기호를 사용자가 입력할 수 있게 해주는 프로그램입니다. 예를 들어 사용자가 중국어, 일본어, 한국어와 인도어 문자를 라틴어 키보드로 입력할 수 있습니다.

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC는 프로세스 간 통신의 약자입니다. Electron은 [주 프로세스](#main-process)와 [렌더러 프로세스](#renderer-process) 사이에서 serialized 된 JSON 메시지를 보내기 위해 IPC를 사용합니다.

### libchromiumcontent

[Chromium 콘텐츠 모듈](https://www.chromium.org/developers/content-module)과 Blink, [V8](#v8) 등등 Chromium 콘텐츠 모듈의 종속성 모듈을 포함한 공유된 라이브러리입니다. "libcc"라고도 불립니다.

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### 주 프로세스

일반적으로 `main.js`라는 파일인 메인 프로세스는, 모든 Electron 앱의 진입점입니다. 열기에서 닫기까지 앱의 수명을 제어합니다. 또한 메뉴, 메뉴 막대, Dock, 트레이 같은 네이티브 요소를 관리합니다. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

모든 앱의 메인 프로세스 파일은 `package.json` 파일의 `main` 속성에서 지정됩니다. 이것이 `electron .` 명령어를 사용할 때, 시작 시 어떤 파일을 사용할지를 아는 이유입니다.

Chroimum 에서는, 이 프로세스가 "브라우저 프로세스"라고도 불립니다. Electron에서는 렌더러 프로세스와 혼동을 피하고자 이름을 변경했습니다.

[process](#process), [렌더러 프로세스](#renderer-process)를 참조하세요.

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### 프로세스

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

Node.js 와 Electron 에선, 각각의 실행 중인 프로세스들은 `process` 객체를 가지고 있습니다. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### 렌더러 프로세스

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

일반적인 브라우저에서 웹 페이지는 대개 샌드박스 환경에서 실행하고 네이티브 리소스에 액세스 할 수 없습니다. 그러나 Electron 유저들은 Node.js APIs 의 낮은 수준의 운영체제 상호 작용을 허용하는 웹 페이지에서 힘이 있다.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel은 Electron 앱에 새로운 버전이 적용되면 자동으로 업데이트할 수 있도록 하는 오픈 소스 프레임워크입니다. Squirrel로 시작하기 위해 [autoUpdater](api/auto-updater.md) API 에서 정보를 살펴보세요.

### 사용자 공간

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8은 Google의 오픈소스 자바스크립트 엔진입니다. 이것은 C++로 작성되었으며 구글 크롬에서 사용되고 있습니다. V8은 독립형으로 실행할 수 있으며 모든 C++ 응용프로그램에 임베디드 될 수 있습니다.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.