# 맥 앱스토어 제출 안내서

V0.34.0 이후, Electron는 패키지 앱을 Mac App Store(MAS) 에 제출할 수 있습니다. 이 가이드는 앱 제출 방법 및 MAS 빌드의 제약들에 관련 정보를 제공합니다.

**참고:**: Mac App Store에 앱을 제출하려면 [Apple Developer Program](https://developer.apple.com/support/compare-memberships/)에 등록해야합니다.

## 앱 제출 방법

다음 단계는 Mac App Store에 앱을 제출하는 간단한 방법을 소개합니다. 하지만, 이 단계들로 인해 여러분의 앱이 Apple에 의해 승인되는 것은 아닙니다. 당신 여전히 Mac App Store 요구 사항을 충족하는 방법에 대한 Apple의 [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) 가이드를 읽어야 합니다.

### 인증서 받기

Mac App Store에 앱을 제출하려면, 먼저 Apple로 부터 인증서를 받아야합니다. 웹에서 [기존 가이드](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps)를 따라할 수 있습니다.

### 팀 아이디 받기

앱에 서명하기 전에, 계정의 팀 ID를 알아야합니다. 팀 ID를 찾기위해서,[Apple Developer Center](https://developer.apple.com/account/)에 로그인하고, sidebar의 멤버십을 클릭하십시오. 여러분의 팀 ID는 팀 이름 아래 회원 정보 섹션에 표시됩니다.

### 앱 인증

사전 준비 작업을 마친 후, [Application Distribution](application-distribution.md)를 따라 애플리케이션을 패키지화하고, 애플리케이션에 서명 할 수 있습니다.

우선, 앱의 `Info.plist`에 `ElectronTeamID`키를 추가하고 Team ID값을 입력합니다.

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

그런 다음 세 가지 인 타이틀먼트 파일들(child.plist, parent.plist, loginhelper.plist) 을 준비해야합니다.

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <string>TEAM_ID.your.bundle.id</string>
  </dict>
</plist>
```

`loginhelper.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
  </dict>
</plist>
```

`TEAM_ID`를 Apple에 등록된 팀 ID로 대체하고, `your.bundle.id`를 앱의 번들 ID로 바꿔야합니다.

그리고, 다음 스크립트로 앱에 서명하십시오.

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# The path to the location you want to put the signed package.
RESULT_PATH="~/Desktop/$APP.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# The path of your plist files.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper EH.app/Contents/MacOS/$APP Helper EH"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper EH.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper NP.app/Contents/MacOS/$APP Helper NP"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper NP.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

MacOS에서 앱 샌드 박싱을 처음 사용한다면, Apple의 앱 샌드박스 활성화([Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html))를 읽어야만 합니다. 앱에서 필요로하는 권한에 대한 키를 인 타이틀먼트 파일(보통 plist 형태를 취함)에 추가하십시오.

수동으로 앱에 서명하는 것 외에도 [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) 모듈을 사용하여 작업을 수행 할 수도 있습니다.

#### 네이티브 모듈 서명

앱에서 사용되는 native 모듈도 서명이 필요합니다. 만약 electron-osx-sign을 사용하는 경우 argument list에 빌드 된 바이너리의 경로를 포함시켜야합니다.

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

또한 주목해야할 점은 네이티브 모듈이 intermediate files을 생성 할 수도 있기 때문에, 생성된 파일들은 포함되지 않아야합니다 (그것들 역시 서명이 필요하기 때문). 8.1.x 이전 버전에서 [electron-packager](https://github.com/electron-userland/electron-packager)를 사용하는 경우 빌드 단계에`--ignore=.+\.o$`를 추가하여이 파일들을 ignore 설정 합니다. 버전 8.1.0 이상에서는 기본적으로 해당 파일을 무시합니다.

### 업로드 앱

앱에 서명 한 후, iTunes Connect에서 처리를 위해 Application Loader를 사용하여 업로드 할할 수 있으며, 업로드 전에 생성 기록[created a record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html)을 확인하십시오.

### Review를 위한 앱 제출

이 단계가 완료되면 [submit your app for review](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html)할 수 있습니다.

## MAS 빌드의 제약

앱 샌드 박싱을위한 모든 요구 사항을 충족시키기 위해, 다음 모듈 MAS 빌드에서 사용 중지되었습니다.

* `crashReporter`
* `autoUpdater`

다음과 같은 동작이 변경되었습니다.

* 일부 컴퓨터에서는 비디오 캡처가 작동하지 않을 수 있습니다.
* 특정 접근성 기능이 작동하지 않을 수 있습니다.
* 어플리케이션들이 DNS 변경 사항을 인식하지 못할 수 있습니다.

또한, 앱 샌드 박스를 사용하는 동안, 앱은 엄격하게 제한되어 리소스에 접근하게 됩니다. 자세한 내용은 [App Sandboxing](https://developer.apple.com/app-sandboxing/)을 읽어 보십시오.

### Entitlements 추가

앱에서 사용하는 Electron API에 따라, app의 Mac App Store 빌드에서 이러한 API를 사용할 수 있으려면 `parent.plist` 파일에 추가적으로 권한을 추가해야 할 수도 있습니다.

#### 네트워크 접근

앱의 서버 연결을 허용하기 위해 outgoing(outbound) 네트워크 연결을 enable 시킵니다.

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Enable incoming network connections to allow your app to open a network listening socket:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

## Known issues

### `shell.openItem(filePath)`

This will fail when the app is signed for distribution in the Mac App Store. Subscribe to [#9005](https://github.com/electron/electron/issues/9005) for updates.

#### Workaround

`shell.openExternal('file://' + filePath)` will open the file in the default application as long as the extension is associated with an installed app.

## Cryptographic Algorithms Used by Electron

Depending on the country and region you are located, Mac App Store may require documenting the cryptographic algorithms used in your app, and even ask you to submit a copy of U.S. Encryption Registration (ERN) approval.

Electron uses following cryptographic algorithms:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

On how to get the ERN approval, you can reference the article: [How to legally submit an app to Apple’s App Store when it uses encryption (or how to obtain an ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).