# 빌드 설명서 (macOS)

이 가이드는 macOS 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (external)
* TLS 1.2을 지원하는 Python 2.7

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

만약 Homebrew 를 이용해 파이썬을 설치했다면 다음 파이썬 모듈도 같이 설치해야 합니다:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

`pip`를 사용하여 설치할 수 있습니다:

```sh
$ pip install pyobjc
```

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

공식 Electron은 [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip) 및 MacOS 10.13 SDK로 빌드됩니다.  Building with a newer SDK works too, but the releases currently use the 10.13 SDK.

## Electron 빌드하기

[GN 빌드 지침](build-instructions-gn.md)을 참조하세요.
