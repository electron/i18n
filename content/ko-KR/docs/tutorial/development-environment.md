# 개발자 환경

일렉트론 개발은 본질적으로 node.js 개발과 같습니다. 일렉트론(electron)을 사용해 데스크톱 응용 프로그램을 구축 할 수 있는 환경으로 전환하기 위해서, 여러분은 단지 node.js, npm, code editor(vs code와 같은 Ide)의 선택, 운영체제의 명령행 클라이언트 대한 기본적인 이해가 필요할 뿐입니다.

## macOS 설정

> Electron은 Mac OS X 10.9 (및 macOS의 모든 버전) 그리고 10.9 이상의 버전을 지원합니다. Apple은 호스트 컴퓨터가 이미 Apple 컴퓨터가 아니면 가상 머신에서 macOS의 동작을 허용하지 않으므로, Mac을 필요로하는 경우, Mac([MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)와 같은) 에 액세스 권한을 부여하는 클라우드 서비스를 사용해보십시오.

우선, node.js의 최신 버전을 설치합니다. 최신 `LTS` 버전 혹은 현재 버전(`Current` version) 을 설치하는 것을 권장합니다. Node.js 다운로드 페이지를 방문하여, macOS 인스톨러를 선택합니다. Homebrew가 제공되는 옵션이지만, 권장하지는 않습니다. 많은 도구는 Homebrew가 Node.js를 설치하는 방식과 호환되지 않습니다.

다운로드가 완료되면, 설치 프로그램을 실행하고 설치 마법사가 설치 과정을 안내하도록합니다.

일단 설치되면, 모든 것이 예상대로 작동하는지 확인하십시오. MacOS에서 /Application/Utiles 폴더에서 Terminal 어플리케이션을 찾습니다.(혹은 Spotlight에서 Terminal이라는 단어를 검색합니다.) 원하는 `Terminal`이나 다른 명령 행 클라이언트를 열고 두 `node` 및 `npm`을 사용할 수 있습니다.

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

두 명령에 의해 모두 버전 번호를 출력하면 모든 설정이 끝났습니다! 시작하기 전에 JavaScript 개발을 위한 적절한 코드 편집기([code editor](#a-good-editor)) 를 설치하는 것이 좋습니다.

## Windows 설정

> Electron는 Windows 7 이상 버전을 지원합니다 - 이전 버전의 Windows에서 Electron 응용 프로그램을 개발하려고 시도하면 작동하지 않습니다. Microsoft는 개발자를 위해 Windows 10에서 무료 가상 컴퓨터 이미지([virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines)) 를 제공합니다.<0>

우선, node.js의 최신 버전을 설치합니다. 최신 `LTS` 버전 혹은 현재 버전(`Current` version) 을 설치하는 것을 권장합니다. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. 다운로드가 완료되면, 설치 프로그램을 실행하고 설치 마법사가 설치 과정을 안내하도록합니다.

설치를 구성 할 수있는 화면에서 node.js 런타임(`Node.js runtime`), npm 패키지 관리자(`npm package manager`) 및 PATH(`Add to PATH`) option들의 추가여부를 확인하세요.

일단 설치되면, 모든 것이 예상대로 작동하는지 확인하십시오. 시작메뉴를 열고 PowerShell(`PowerShell`) 이라고 타이핑하여 Windows PowerShell을 찾습니다. `PowerShell`또는 원하는 다른 command line client를 열고 `node`와 `npm` 모두 사용할 수 있습니다.

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

두 명령에 의해 모두 버전 번호를 출력하면 모든 설정이 끝났습니다! 시작하기 전에 JavaScript 개발을 위한 적절한 코드 편집기([code editor](#a-good-editor)) 를 설치하는 것이 좋습니다.

## Linux 설정

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

우선, node.js의 최신 버전을 설치합니다. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

두 명령에 의해 모두 버전 번호를 출력하면 모든 설정이 끝났습니다! 시작하기 전에 JavaScript 개발을 위한 적절한 코드 편집기([code editor](#a-good-editor)) 를 설치하는 것이 좋습니다.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.