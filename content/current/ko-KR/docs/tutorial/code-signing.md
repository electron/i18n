# 코드 서명(Code Signing)

코드 서명(code signing)은 이 앱을 당신이 만들었다고 인증하는데 사용하는 보안 기술입니다.

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

Windows에서 시스템은 코드 서명 인증서에 신뢰 수준을 할당합니다. 인증서가없는 경우 또는 신뢰 수준이 낮 으면 사용자가 응용 프로그램을 사용할 때 보안 대화 상자가 표시됩니다. 신뢰 수준은 시간이지나면서 만들어지므로, 가능한 한 빨리 코드 서명을 시작하는 것이 좋습니다.

서명 되지 않은 애플리케이션을 배포할 수 있지만 권장 되지 않습니다. Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Starting with macOS Catalina (version 10.15), users have to go through multiple manual steps to open unsigned applications.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the developer cannot be verified](../images/gatekeeper.png)

As you can see, users get two options: Move the app straight to the trash or cancel running it. You don't want your users to see that dialog.

If you are building an Electron app that you intend to package and distribute, it should be code-signed. The Mac and Windows app stores do not allow unsigned apps.

# Signing macOS builds

MacO에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. (연회비 필요) [애플 개발자 프로그램](https://developer.apple.com/programs/)에 등록
2. Download and install [Xcode](https://developer.apple.com/xcode)
3. [signing certificates](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates) 생성, 다운로드, 및 설치

패키지 된 응용 프로그램 서명을 위한 도구가 몇개 있습니다:

- [`electron-osx-sign`] 은 macOS 패키지에 서명하기위한 독립형 도구입니다.
- [`electron-packager`] bundles `electron-osx-sign`. `electron-packager`를 사용하는 경우 `--osx-sign=true` 플래그를 전달하여 빌드에 서명하십시오. 
    - [<0 electron-forge</code>] 는 `electron-packager`를 내부적으로 사용하기 때문에, 위조 설정에서 `osxSign` 옵션을 설정할 수 있습니다.
- [`electron-builder`] 에는 코드 서명 기능이 내장되어 있습니다. [electron.build/code-signing](https://www.electron.build/code-signing) 을 확인하세요.

## Notarization

Starting with macOS Catalina, Apple requires applications to be notarized. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification *before* distributing the app to your users.

To automate this process, you can use the [`electron-notarize`] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide](mac-app-store-submission-guide.md).

# Signing Windows builds

Windows 에서 빌드를 서명 하기 전에 다음을 수행 해야 합니다.

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Visual Studio 2015/2017 설치 (서명 유틸리티를 얻으려면)

You can get a code signing certificate from a lot of resellers. Prices vary, so it may be worth your time to shop around. Popular resellers include:

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