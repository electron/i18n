# 빌드 설명서 (macOS)

이 가이드는 macOS 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](http://nodejs.org) (external)

만약 Homebrew 를 이용해 파이썬을 설치했다면 다음 파이썬 모듈도 같이 설치해야 합니다:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

단순히 일렉트론을 개발 중이고, 사용자 지정 일렉트론 빌드를 재배포하지 않으려는 경우, 이 섹션을 건너 뛰어도 됩니다.

핀치 줌과 같은 특정 기능을 제대로 사용하려면 macOS 10.10 SDK를 이용해야 합니다.

Official Electron builds are built with [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), which does not contain the 10.10 SDK by default. To obtain it, first download and mount the [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Then, assuming that the Xcode 6.4 DMG has been mounted at `/Volumes/Xcode` and that your Xcode 8.2.1 install is at `/Applications/Xcode.app`, run:

```bash
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

You will also need to enable Xcode to build against the 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Save the file

## 코드 가져오기

```bash
$ git clone https://github.com/electron/electron
```

## 부트스트랩

부트스트랩 스크립트는 필수적인 빌드 의존성 라이브러리들을 모두 다운로드하고 프로젝트 파일을 생성합니다. Notice that we're using [ninja](https://ninja-build.org/) to build Electron so there is no Xcode project generated.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

## 빌드하기

Build both `Release` and `Debug` targets:

```bash
$ ./script/build.py
```

You can also only build the `Debug` target:

```bash
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## 32bit Support

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## 정리하기

빌드 파일들을 정리하려면:

```bash
$ npm run clean
```

`out`과 `dist` 폴더만 정리하려면:

```bash
$ npm run clean-build
```

참고: 두 정리 명령어는 빌드하기 전에 `bootstrap`을 재실행 해야 한다.

## 테스트

[빌드 시스템 개요: 테스트](build-system-overview.md#tests)를 보세요.