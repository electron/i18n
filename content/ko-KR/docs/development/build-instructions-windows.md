# 빌드 명령 (윈도)

이 가이드는 Windows 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

* Windows 10 / Server 2012 R2 또는 최신 버전
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* `symstore.exe`는 `.pdb` 파일에서 심볼 저장소를 만드는 데 사용되므로 전체 배포판을 만들 계획이라면 [Debugging Tools for Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx)를 다운로드 합니다.

현재 사용하고 있는 Pc에 Windows를 설치하지 않았다면 [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)에서 사용 기한이 정해져있는 무료 가상머신 버전의 Windows를 받아 Electron을 빌드하는 방법도 있습니다.

Electron은 모든 빌드를 command-line 스크립트를 통해 빌드하며, Visual Studio를 사용할 수 없습니다. 하지만 여전히 Electron을 개발할 땐 어떤 에디터든 사용이 가능합니다. 그리고 빠른 시일내에 Visual Studio를 이용한 빌드도 지원할 계획입니다.

**참고:** Visual Studio가 직접 빌드에 사용되지 않더라도 Ide와 같이 제공된 빌드 툴체인이 빌드에 **반드시** 사용되므로 여전히 필요합니다.

## 빌드하기

See [Build Instructions: GN](build-instructions-gn.md)

## 32 비트 빌드

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

다른 빌드 단계도 정확하게 같습니다.

## Visual Studio 프로젝트

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## 문제 해결

### Command xxxx not found

만약 `Command xxxx not found`와 같은 형식의 에러가 발생했다면, `VS2015 Command Prompt` 콘솔로 빌드 스크립트를 실행해 보는게 좋습니다.

### Fatal internal compiler error: C1001

Visual Studio가 업데이트까지 완벽하게 설치된 최신버전인지 확인하세요.

### LNK1181: cannot open input file 'kernel32.lib'

32비트 Node.js를 다시 설치하세요.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

Git Bash로 빌드 했을 때 이러한 에러가 발생할 수 있습니다. 반드시 PowerShell이나 VS2015 Command Prompt에서 빌드를 진행해야 합니다.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```