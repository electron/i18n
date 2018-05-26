# 개발자 환경

일렉트론 개발은 본질적으로 node.js 개발과 같습니다. 일렉트론(electron)을 사용해 데스크톱 응용 프로그램을 구축 할 수 있는 환경으로 전환하기 위해서, 여러분은 단지 node.js, npm, code editor(vs code와 같은 Ide)의 선택, 운영체제의 command 명령에 대한 기본적인 이해가 필요할 뿐입니다.

## macOS 설정

> Electron은 Mac OS X 10.9 (및 macOS의 모든 버전) 그리고 10.9 이상의 버전을 지원합니다. Apple은 호스트 컴퓨터가 이미 Apple 컴퓨터가 아니면 가상 머신에서 macOS의 동작을 허용하지 않으므로, Mac을 필요로하는 경우, Mac([MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)와 같은) 에 액세스 권한을 부여하는 클라우드 서비스를 사용해보십시오.

우선, node.js의 최신 버전을 설치합니다. 최신 `LTS` 버전 혹은 현재 버전(`Current` version) 을 설치하는 것을 권장합니다. Node.js 다운로드 페이지를 방문하여, macOS 인스톨러를 선택합니다. Homebrew가 제공되는 옵션이지만, 권장하지는 않습니다. 많은 도구는 Homebrew가 Node.js를 설치하는 방식과 호환되지 않습니다.

다운로드가 완료되면, 설치 프로그램을 실행하고 설치 마법사가 설치 과정을 안내하도록합니다.

일단 설치되면, 모든 것이 예상대로 작동하는지 확인하십시오. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Windows 설정

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

우선, node.js의 최신 버전을 설치합니다. 최신 `LTS` 버전 혹은 현재 버전(`Current` version) 을 설치하는 것을 권장합니다. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. 다운로드가 완료되면, 설치 프로그램을 실행하고 설치 마법사가 설치 과정을 안내하도록합니다.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

일단 설치되면, 모든 것이 예상대로 작동하는지 확인하십시오. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

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

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.