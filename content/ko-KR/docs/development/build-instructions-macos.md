# 빌드 명령 (macOS)

이 가이드는 macOS 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구사양

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
* [node.js](https://nodejs.org) (external)
* TLS 1.2을 지원하는 Python 2.7

## Python

시스템과 Python 버전이 TLS 1.2를 지원하는지 확인하십시오. 이것은 macOS와 Python 버전에 따라 다릅니다. 빠른 테스트를 위해 다음을 실행하십시오.

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

* [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

Official Electron builds are built with [Xcode 8.3.3](http://adcdownload.apple.com/Developer_Tools/Xcode_8.3.3/Xcode_8.3.3.xip), and the MacOS 10.12 SDK. Building with a newer SDK works too, but the releases currently use the 10.12 SDK.

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).