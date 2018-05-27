# Code Signing

코드 서명은 당신에 의해 만들어진 app을 인증하는데 사용하는 보안 기술입니다.

macOS 에서 시스템은 앱의 변경이 실수 또는 악성 코드에 의해 생긴 변경인지 아닌지 감지 할 수 있습니다.

Windows에서 시스템은 코드 서명 인증서에 신뢰 수준을 할당합니다. 인증서가없는 경우 또는 신뢰 수준이 낮 으면 사용자가 응용 프로그램을 사용할 때 보안 대화 상자가 표시됩니다. 신뢰 수준은 시간이지나면서 만들어지므로, 가능한 한 빨리 코드 서명을 시작하는 것이 좋습니다.

서명 되지 않은 애플리케이션을 배포할 수 있지만 권장 되지 않습니다. 예를 들어 macOS 사용자가 서명되지 않은 앱을 시작하려고 할 때 표시되는 내용은 다음과 같습니다:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

패키지 및 배포 하려는 Electron 애플리케이션을 작성 하는 경우 코드 서명 해야 합니다. Mac과 Windows 앱스토어는 서명 되지 않은 애플리케이션을 허용 하지 않습니다.

# Signing macOS builds

MacO에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. (연회비 필요) [애플 개발자 프로그램](Apple Developer Program)에 등록
2. 다운로드 하고 Xcode를 설치
3. [signing certificates](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates) 생성, 다운로드, 및 설치

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-osx-sign`] 은 macOS 패키지에 서명하기위한 독립형 도구입니다.
- [`electron-packager`] bundles `electron-osx-sign`. `electron-packager`를 사용하는 경우 `--osx-sign=true` 플래그를 전달하여 빌드에 서명하십시오. 
    - [`electron-forge`] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`] has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

For more info, see the [Mac App Store Submission Guide](mac-app-store-submission-guide.md).

# Signing Windows builds

Before signing Windows builds, you must do the following:

1. Get a Windows Authenticode code signing certificate
2. Install Visual Studio 2015/2017 (to get the signing utility)

You can get a code signing certificate from a lot of resellers, popular ones include:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Amongst others, please shop around to find one that suits your needs, Google is your friend :)

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-winstaller`] will generate an installer for windows and sign it for you
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] can sign some of its windows targets

## Windows 스토어

[Windows Store Guide](windows-store-guide.md)를 확인하세요.