# 빌드 명령 (macOS)

이 가이드는 macOS 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구사양

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (external)
- Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

핀치 줌과 같은 특정 기능을 제대로 사용하려면 macOS 10.10 SDK를 이용해야 합니다.

공식 일렉트론 빌드는 기본적으로 10.10 SDK를 포함하지 않는 [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip)로 구축됩니다. 먼저 [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG를 다운로드하여 마운트하세요.

Xcode 6.4 DMG 가 `/Volumes/Xcode` 에 마운트 되었다 가정하고, Xcode 8.2.1 설치가 `/Applications/Xcode.app`에 되었다 가정하고 실행합니다.

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

또한 10.10 SDK에 대해 빌드하려면 Xcode를 활성화 해야 합니다.

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- 파일 저장하기

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).