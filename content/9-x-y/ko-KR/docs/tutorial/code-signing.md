# 코드 서명(Code Signing)

코드 서명(code signing)은 이 앱을 당신이 만들었다고 인증하는데 사용하는 보안 기술입니다.

MacOS는 원인이 개발자의 실수이든 악의적인 공격이든 상관 없이, 어플리케이션의 변화를 감지할 수 있습니다.

Windows에서 시스템은 코드 서명 인증서에 신뢰 수준을 할당합니다. 인증서가없는 경우 또는 신뢰 수준이 낮 으면 사용자가 응용 프로그램을 사용할 때 보안 대화 상자가 표시됩니다.  신뢰 수준은 시간이지나면서 만들어지므로, 가능한 한 빨리 코드 서명을 시작하는 것이 좋습니다.

서명 되지 않은 애플리케이션을 배포할 수 있지만 권장 되지 않습니다. Windows와 MacOS 모두 기본적으로 서명되지 않은 어플리케이션의 다운로드와 실행을 허용하지 않습니다. 심지어 MacOS 버전 10.15(Catalina)부터는 서명되지 않은 어플리케이션을 실행하기 위해서 사용자가 수많은 단계를 거쳐야만 합니다.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the developer cannot be verified](../images/gatekeeper.png)

위에 사진에서 볼 수 있듯이 사용자가 제공받는 옵션은 어플리케이션을 삭제해 버리거나 실행을 포기하는 것 뿐입니다. 사용자에게 보여주고 싶은 창은 아니죠.

작성 중인 Electron 어플리케이션을 패키징 및 배포하고 싶은 경우, 코드 서명하는 것이 좋습니다. Mac과 Windows 앱스토어는 서명 되지 않은 애플리케이션을 허용하지 않습니다.

# MacOS 빌드 서명(Signing MacOS builds)

MacO에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. (연회비 필요) [애플 개발자 프로그램][]에 등록
2. [Xcode][] 다운로드 및 설치
3. [signing certificates][] 생성, 다운로드, 및 설치

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. `electron-packager`를 사용하는 경우 `--osx-sign=true` 플래그를 전달하여 빌드에 서명하십시오.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. [electron.build/code-signing](https://www.electron.build/code-signing) 을 확인하세요.

## 공증(Notarization)

MacOS Catalina부터 애플은 어플리케이션에 공증을 요구합니다. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. 이 과정은 사용자에게 배포할 버전의 빌드에서만 적용하고, 모든 빌드에서 수행할 필요는 없습니다.

## Mac App Store

[Mac App Store Guide][]를 참고하세요.

# Signing Windows builds

Windows 에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Visual Studio 2015/2017 설치 (서명 유틸리티를 얻으려면)

You can get a code signing certificate from a lot of resellers. Prices vary, so it may be worth your time to shop around. Popular resellers include:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Amongst others, please shop around to find one that suits your needs, Google is your friend :)

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows 스토어

[Windows Store Guide][]를 확인하세요.

[애플 개발자 프로그램]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
