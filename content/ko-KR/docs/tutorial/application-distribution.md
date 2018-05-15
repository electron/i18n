# 애플리케이션 배포

Electron으로 만든 우리의 앱을 베포하기 위해서는, Electron의 [prebuilt binaries](https://github.com/electron/electron/releases)를 다운로드 해야 합니다. 먼저, 예제에서 보이는것처럼 폴더 이름을 `app`로 지정한 후 Electron의 리소스 디렉터리에 폴더를 통째로 집어넣기만 하면 됩니다. 아래의 예제에서는 `electron/` 에서 가리키는 Electron's prebuilt binaries 위치를 언급해줍니다.

macOS 의 경우 : 

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html

```

Windows 와 Linux 의 경우 :

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

그리고 `Electron.app` 을 실행하면(Linux에선 `electron` Windows 에선 `electron.exe` 입니다), Electron 앱이 실행됩니다. 최종 사용자에겐 이 `electron` 폴더를 배포하면 됩니다.

## 파일로 앱을 패키징 하기

소스파일 전체를 복사해서 배포하는 것과는 별개로 [asar](https://github.com/electron/asar) 아카이브를 통해 애플리케이션의 소스 코드가 사용자에게 노출되는 것을 방지할 수 있습니다.

`asar` 아카이브를 사용할 땐 단순히 `app` 폴더 대신에 애플리케이션을 패키징한 `app.asar` 파일로 대체하면됩니다. Electron은 자동으로 app폴더 대신 asar 아카이브를 기반으로 애플리케이션을 실행합니다.

macOS 의 경우 : 

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Windows 와 Linux 의 경우 :

```text
electron/resources/
└── app.asar
```

자세한 내용은 [애플리케이션 패키징](application-packaging.md)에서 찾아볼 수 있습니다.

## Rebranding with Downloaded Binaries

애플리케이션을 Electron에 번들링한 후 해당 애플리케이션에 맞게 리브랜딩 할 수 있습니다.

### Windows

[rcedit](https://github.com/atom/rcedit)를 통해 `electron.exe`을 원하는 이름으로 변경할 수 있고, 또한 아이콘과 기타 정보도 변경할 수 있습니다.

### macOS

`Electron.app`을 원하는 이름으로 변경할 수 있습니다. 그리고 다음 표시된 애플리케이션 내부 파일에서 `CFBundleDisplayName`, `CFBundleIdentifier` 그리고 `CFBundleName` 필드를 원하는 이름으로 변경해야 합니다:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

또한 helper 앱이 프로세스 모니터에 `Electron Helper`로 나오지 않도록 이름을 변경할 수 있습니다. 하지만 반드시 내부 및 모든 helper 앱의 이름을 변경해야 합니다.

애플리케이션 이름을 원하는 이름으로 변경한 예시:

```text
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

실행파일 `electron`의 이름을 원하는 대로 바꿀 수 있습니다.

## 패키징 툴

애플리케이션을 일일이 수동으로 패키지로 만드는 대신, 서드 파티 패키징 툴을 사용하며 이러한 작업을 자동화 시킬 수 있습니다:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Electron 소스 코드를 다시 빌드하여 리소스 수정하기

또한 Electron 소스 코드를 다시 빌드할 때 애플리케이션 이름을 변경할 수 있습니다. `atom.gyp` 파일을 수정하여 다음과 같이 다시 빌드할 수 있습니다:

### Electron 커스텀 포크 만들기

Electron의 커스텀 포크를 만드는 것은 거의 확실히 앱을 만드는데 있어서 필요한 작업이 아닐 수 있으며, 심지어 "제품 등급"의 애플리케이션이라도 필요하지 않습니다. `electron-packager` 또는 `electron-builder`와 같은 도구를 사용하면 다른 특별한 과정 없이 Electron을 "Rebrand" 할 수 있습니다.

업스트림 단에서 추가될 수 없는 기능이나 이미 공식 버전에서 거부된 기능을 Electron에 직접적으로 패치하기 위해 커스텀 C++를 추가해야 한다면 Electron을 포크해야 합니다. Electron의 개발자로써, Electron을 매우 많은 시나리오에서도 작동하도록 만들려고 합니다. 따라서 가능한한 변경 사항을 공식 버전의 Electron에 추가할 수 있도록 시도해 주길 바라며, 당신에겐 아주 아주 쉬운 작업일 것이고 이러한 당신의 도움에 대해 감사하게 생각합니다. 

#### surf-build와 함께 커스텀 릴리즈 만들기

1. npm을 통해 [Surf](https://github.com/surf-build/surf)를 설치합니다: `npm install -g surf-build@latest`

2. 새로운 S3 bucket을 만들고 다음과 같은 빈 디렉토리 구조를 만듭니다:
    
    ```sh
    - atom-shell/
      - symbols/
      - dist/
    ```

3. 다음의 환경 변수들을 설정합니다:

* `ELECTRON_GITHUB_TOKEN` - GitHub에 릴리즈를 만들 수 있는 토큰.
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - node.js 헤더 뿐만 아니라 심볼을 업로드할 장소.
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` -`true`또는 다른 것을 지정하면 실패합니다.
* `GITHUB_TOKEN` - `ELECTRON_GITHUB_TOKEN`과 같게 설정
* `SURF_TEMP` - Windows에서는 `C:\Temp`로 설정하면 긴 경로 문제를 해결할 수 있습니다.
* `TARGET_ARCH` - `ia32` 또는 `x64`를 지정.

1. Electron에 기여를 하는 기여자라면, *반드시* `script/upload.py`에서 포크를 위해 `ELECTRON_REPO`를 설정해야 합니다. (`MYORG/electron`)

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. 빌드가 완료될 때까지 아주 아주 긴 시간을 기다립니다.