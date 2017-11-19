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

To use an `asar` archive to replace the `app` folder, you need to rename the archive to `app.asar`, and put it under Electron's resources directory like below, and Electron will then try to read the archive and start from it.

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

More details can be found in [Application packaging](application-packaging.md).

## Rebranding with Downloaded Binaries

After bundling your app into Electron, you will want to rebrand Electron before distributing it to users.

### Windows

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

The structure of a renamed app would be like:

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
    

### Linux

You can rename the `electron` executable to any name you like.

## Packaging Tools

Apart from packaging your app manually, you can also choose to use third party packaging tools to do the work for you:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding by Rebuilding Electron from Source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to modify the `atom.gyp` file and have a clean rebuild.

### Creating a Custom Electron Fork

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Creating a Custom Release with surf-build

1. Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
        - atom-shell/
          - symbols/
          - dist/
        

3. 다음의 환경 변수들을 설정합니다:

* `ELECTRON_GITHUB_TOKEN` - GitHub에 릴리즈를 만들 수 있는 토큰.
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - node.js 헤더 뿐만 아니라 심볼을 업로드할 장소.
* `ELECTRON_RELEASE` - `true`로 지정하고 업로드 부분이 실행되면, 설정되지 않은 부분을 남기고 `surf-build`가 CI-type 확인을 실행합니다. 모든 pull request를 실행할 때 적합합니다.
* `CI` -`true`또는 다른 것을 지정하면 실패합니다.
* `GITHUB_TOKEN` - `ELECTRON_GITHUB_TOKEN`과 같게 설정
* `SURF_TEMP` - Windows에서는 `C:\Temp`로 설정하면 긴 경로 문제를 해결할 수 있습니다.
* `TARGET_ARCH` - `ia32` 또는 `x64`를 지정. 

1. Electron에 기여를 하는 기여자라면, *반드시* `script/upload.py`에서 포크를 위해 `ELECTRON_REPO`를 설정해야 합니다. (`MYORG/electron`)

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. 빌드가 완료될 때까지 아주 아주 긴 시간을 기다립니다.