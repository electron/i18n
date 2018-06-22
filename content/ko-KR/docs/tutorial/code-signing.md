# Code Signing

Code signing is a security technology that you use to certify that an app was created by you.

macOS 에서 시스템은 앱의 변경이 실수 또는 악성 코드에 의해 생긴 변경인지 아닌지 감지 할 수 있습니다.

Windows에서 시스템은 코드 서명 인증서에 신뢰 수준을 할당합니다. 인증서가없는 경우 또는 신뢰 수준이 낮 으면 사용자가 응용 프로그램을 사용할 때 보안 대화 상자가 표시됩니다. 신뢰 수준은 시간이지나면서 만들어지므로, 가능한 한 빨리 코드 서명을 시작하는 것이 좋습니다.

서명 되지 않은 애플리케이션을 배포할 수 있지만 권장 되지 않습니다. 예를 들어 macOS 사용자가 서명되지 않은 앱을 시작하려고 할 때 표시되는 내용은 다음과 같습니다:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. The Mac and Windows app stores do not allow unsigned apps.

# Signing macOS builds

MacO에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. (연회비 필요) [애플 개발자 프로그램](https://developer.apple.com/programs/)에 등록
2. Download and install [Xcode](https://developer.apple.com/xcode)
3. [signing certificates](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates) 생성, 다운로드, 및 설치

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-osx-sign`] 은 macOS 패키지에 서명하기위한 독립형 도구입니다.
- [`electron-packager`] bundles `electron-osx-sign`. `electron-packager`를 사용하는 경우 `--osx-sign=true` 플래그를 전달하여 빌드에 서명하십시오. 
    - [<0 electron-forge</code>] 는 `electron-packager`를 내부적으로 사용하기 때문에, 위조 설정에서 `osxSign` 옵션을 설정할 수 있습니다.
- [`electron-builder`] 에는 코드 서명 기능이 내장되어 있습니다. [electron.build/code-signing](https://www.electron.build/code-signing) 을 확인하세요.

자세한 정보는 [Mac App Store Submission Guide](mac-app-store-submission-guide.md)을 참조하세요.

# Signing Windows builds

Windows 에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. Windows Authenticode 코드 서명 인증서 얻기
2. Visual Studio 2015/2017 설치 (서명 유틸리티를 얻으려면)

많은 리셀러로부터 코드 서명 인증서를 얻을 수 있으며 인기있는 인증서는 다음과 같습니다.

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Amongst others, please shop around to find one that suits your needs, Google is your friend :)

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-winstaller`] 는 윈도우 용 설치 프로그램을 생성하고 서명합니다.
- [`electron-forge`]는 Squirrel.Windows 또는 MSI 타켓을 통해 생성 한 설치 관리자에 서명 할 수 있습니다.
- [`electron-builder`] 는 Windows 타겟 중 일부에 서명 할 수 있습니다.

## Windows 스토어

[Windows Store Guide](windows-store-guide.md)를 확인하세요.