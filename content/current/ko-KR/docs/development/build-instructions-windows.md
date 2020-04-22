# 빌드 설명서 (Windows)

이 가이드는 Windows 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

* Windows 10 / Server 2012 R2 또는 최신 버전
* Visual Studio 2017 15.7.2 이상 - [무료로 VS 2019 Community Edition 다운로드](https://www.visualstudio.com/vs/)
  * See [the Chromium build documentation](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) for more details on which Visual Studio components are required.
  * If your Visual Studio is installed in a directory other than the default, you'll need to set a few environment variables to point the toolchains to your installation path.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, replacing `2019` and `Community` with your installed versions and replacing `DRIVE:` with the drive that Visual Studio is on. Often, this will be `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, replacing `DRIVE:` with the drive that Windows Kits is on. Often, this will be `C:`.
* [Python 2.7.10 이상](http://www.python.org/download/releases/2.7/)
  * Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in order to run the build process.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Different versions of the SDK can be installed side by side. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
  * The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

현재 사용하고 있는 Pc에 Windows를 설치하지 않았다면 [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)에서 사용 기한이 정해져있는 무료 가상머신 버전의 Windows를 받아 Electron을 빌드하는 방법도 있습니다.

Electron은 모든 빌드를 command-line 스크립트를 통해 빌드하며, Visual Studio를 사용할 수 없습니다. 하지만 여전히 Electron을 개발할 땐 어떤 에디터든 사용이 가능합니다. 그리고 빠른 시일내에 Visual Studio를 이용한 빌드도 지원할 계획입니다.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

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
$ gn gen out/Testing --ide=vs2017
```

## 문제 해결

### Command xxxx not found

만약 `Command xxxx not found`와 같은 형식의 에러가 발생했다면, `VS2015 Command Prompt` 콘솔로 빌드 스크립트를 실행해 보는게 좋습니다.

### Fatal internal compiler error: C1001

Visual Studio가 업데이트까지 완벽하게 설치된 최신버전인지 확인하세요.

### LNK1181: cannot open input file 'kernel32.lib'

32비트 Node.js를 다시 설치하세요.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

간단하게 해당 디렉터리를 생성하면 [문제가 해결될 겁니다](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp는 내부 또는 외부 명령, 실행할 수 있는 프로그램 또는 배치 파일이 아닙니다.

Git Bash로 빌드 했을 때 이러한 에러가 발생할 수 있습니다. 반드시 PowerShell이나 VS2015 Command Prompt에서 빌드를 진행해야 합니다.

### '...' 디렉토리를 만들 수 없습니다: 파일이름이 너무 깁니다

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: No module named win32file

`pywin32`이 설치되었는지 `pip install pywin32` 명령으로 확인해 보십시오.

### 키 입력 전까지 빌드 스크립트가 멈춤

이 버그는 Windows 명령 프롬프트의 "기능"입니다. 이는 명령 프롬프트에서 `빠른 편집 모드`를 활성화하고 창 안을 클릭할 때, 출력 결과물을 쉽게 선택하고 복사할 수 있도록 하기 위해 발생합니다. 실수로 창 안을 클릭하면 빌드 과정 전체가 멈추기 때문에, 이를 원하지 않으면 명령 프롬프트의 속성에서 기능을 비활성화할 수 있습니다.
