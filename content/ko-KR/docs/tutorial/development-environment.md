# 개발자 환경

일렉트론 개발은 본질적으로 node.js 개발과 같습니다. 일렉트론(electron)을 사용해 데스크톱 응용 프로그램을 구축 할 수 있는 환경으로 전환하기 위해서, 여러분은 단지 node.js, npm, 코드 편집기(vs code와 같은 Ide)의 선택, 운영체제의 명령 창 클라이언트 대한 기본적인 이해가 필요할 뿐입니다.

## macOS 설정

> Electron은 Mac OS X 10.9 (및 macOS로 이름이 바꾸어진 후의 모든 버전) 그리고 10.9 이상의 버전을 지원합니다. Apple은 호스트 컴퓨터가 이미 Apple 컴퓨터가 아니면 가상 머신에서 macOS의 동작을 허용하지 않으므로, Mac을 필요로하는 경우, Mac([MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)와 같은) 에 액세스 권한을 부여하는 클라우드 서비스를 사용해보십시오.

우선, node.js의 최신 버전을 설치합니다. 최신 `LTS` 버전 혹은 현재 버전(`Current` version) 을 설치하는 것을 권장합니다. [Node.js 다운로드 페이지](https://nodejs.org/en/download/)를 방문하여, `macOS 인스톨러를` 선택합니다. Homebrew로 설치 할 수도 있지만, 권장하지는 않습니다. 많은 도구는 Homebrew가 Node.js를 설치하는 방식과 호환되지 않습니다.

다운로드가 완료되면, 설치 프로그램을 실행하고 설치 마법사가 알려주는 설치 과정대로 설치를 진행합니다.

일단 설치되면, 모든 것이 예상대로 작동하는지 확인하십시오. MacOS에서 `/Application/Utilities` 폴더에서 `터미널(Terminal)` 어플리케이션을 찾습니다.(혹은 Spotlight에서 `터미널`이라는 단어를 검색합니다.) `터미널` 프로그램이나 다른 명령 창 클라이언트를 열면 `node` 및 `npm`을 사용할 수 있습니다.

```sh
# 이 명령어는 Node.js의 버전을 표시 할 것입니다
node -v

# 이 명령어는 npm의 버전을 표시 할 것입니다
npm -v
```

두 명령어를 실행하여 버전 값이 출력 되었다면, 여러분들은 모두 설정 한 것입니다! 시작하기 전에 JavaScript 개발을 위한 적절한 코드 편집기([code editor](#a-good-editor)) 를 설치하는 것이 좋습니다.

## Windows 설정

> Electron는 Windows 7 이상 버전을 지원합니다 - 이전 버전의 Windows에서 Electron 응용 프로그램을 개발하려고 시도하면 작동하지 않습니다. Microsoft는 개발자를 위해 Windows 10에서 무료 가상 컴퓨터 이미지([virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines)) 를 제공합니다.<0>

우선, node.js의 최신 버전을 설치합니다. 최신 `LTS` 버전 혹은 현재 버전(`Current` version) 을 설치하는 것을 권장합니다. [Node.js 다운로드 페이지](https://nodejs.org/en/download/)를 방문하여, `Windows 인스톨러를` 선택합니다. 다운로드가 완료되면, 설치 프로그램을 실행하고 설치 마법사가 알려주는 설치 과정대로 설치를 진행합니다.

설치 할 것을 선택하는 화면에서 node.js 런타임(`Node.js runtime`), npm 패키지 관리자(`npm package manager`) 및 PATH(`Add to PATH`) option들을 활성화 하였는지 확인하세요.

일단 설치되면, 모든 것이 예상대로 작동하는지 확인하십시오. 시작메뉴를 열고 PowerShell(또는 명령 프롬프트) 이라고 입력하여 Windows PowerShell(또는 명령 프롬프트)을 찾습니다. `PowerShell`또는 다른 명령 창 클라이언트를 열면 `node`및`npm` 모두 사용할 수 있습니다.

```powershell
# 이 명령어는 Node.js의 버전을 표시 할 것입니다
node -v

# 이 명령어는 npm의 버전을 표시 할 것입니다
npm -v
```

두 명령어를 실행하여 버전 값이 출력 되었다면, 여러분들은 모두 설정 한 것입니다! 시작하기 전에 JavaScript 개발을 위한 적절한 코드 편집기([code editor](#a-good-editor)) 를 설치하는 것이 좋습니다.

## Linux 설정

> Electron은 Ubuntu 12.04, Fedora 21, Debian 8 이상을 지원 합니다.

우선, node.js의 최신 버전을 설치합니다. 당신이 쓰는 리눅스 배포판에 따라, 설치 과정이 달라질 수 있습니다. 대부분의 리눅스 배포판에선 `apt` 또는 `pacman` 같은 패키지 매니저를 사용하면 되니, 공식 [Node.js를 리눅스에 설치 하는 법](https://nodejs.org/en/download/package-manager/) 을 보면서 하시면 됩니다.

당신은 리눅스 배포판을 사용하고 있으니, 아마도 명령 창 클라이언트를 사용하는 방법을 아실껍니다. 당신이 원하는 명령 창 클라이언트를 실행 한 후 `node` 와 `npm` 이 이미 클로벌한지(모든 디렉토리에서 사용 할 수 있는지) 확인 해봅시다:

```sh
# 이 명령어는 Node.js의 버전을 표시 할 것입니다
node -v

# 이 명령어는 npm의 버전을 표시 할 것입니다
npm -v
```

두 명령어를 실행하여 버전 값이 출력 되었다면, 여러분들은 모두 설정 한 것입니다! 시작하기 전에 JavaScript 개발을 위한 적절한 코드 편집기([code editor](#a-good-editor)) 를 설치하는 것이 좋습니다.

## 좋은 코드 편집기

저희는 Electron으로 만들어진 두 개의 유명한 무료 편집기를 추천 드립니다: GitHub의 [Atom](https://atom.io/) 그리고 Microsoft의 [Visual Studio Code](https://code.visualstudio.com/). 두 편집기 모두 JavaScript를 완벽하게 지원 합니다.

만약 여러분들이 강한 선호를 받고있는 많은 개발자들 중 하나라면, 요즘 유행하는 모든 코드 편집기 또는 IDE들은 JavaScript를 지원 한다는 것을 명심하세요.