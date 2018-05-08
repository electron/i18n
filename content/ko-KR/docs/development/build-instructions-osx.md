# 빌드 명령 (macOS)

이 가이드는 macOS 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구사양

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (external)

만약 Homebrew 를 이용해 파이썬을 설치했다면 다음 파이썬 모듈도 같이 설치해야 합니다:

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

## 코드 가져오기

```sh
$ git clone https://github.com/electron/electron
```

## 부트스트랩

부트스트랩 스크립트는 필수적인 빌드 의존성 라이브러리들을 모두 다운로드하고 프로젝트 파일을 생성합니다. Electron은 [ninja](https://ninja-build.org/) 를 빌드 툴체인으로 사용하므로 Xcode 프로젝트는 생성되지 않습니다.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## 빌드하기

`Release` 와 `Debug` 두 타겟 모두 빌드 합니다:

```sh
$ ./script/build.py
```

또는 `Debug` 타겟만 빌드 할 수 있습니다:

```sh
$ ./script/build.py -c D
```

빌드가 모두 끝나면 `out/D` 디렉터리에서 `Electron.app` 실행 파일을 찾을 수 있습니다.

## 32 비트 지원

Electron은 현재 macOS 64비트만 지원하고 있습니다. 그리고 앞으로도 macOS 32비트는 지원할 계획이 없습니다.

## 정리하기

빌드 파일들을 정리하려면:

```sh
$ npm run clean
```

`out`과 `dist` 폴더만 정리하려면:

```sh
$ npm run clean-build
```

참고: 두 정리 명령어는 빌드하기 전에 `bootstrap`을 재실행 해야 한다.

## 테스트

[빌드 시스템 개요: 테스트](build-system-overview.md#tests)를 보세요.