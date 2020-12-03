# 애플리케이션 배포

## 개요

To distribute your app with Electron, you need to package and rebrand it. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## 수동 배포

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). 먼저, 예제에서 보이는것처럼 폴더 이름을 `app`로 지정한 후 Electron의 리소스 디렉터리에 폴더를 통째로 집어넣기만 하면 됩니다.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*macOS 의 경우 : *

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html

```

*Windows 와 Linux 의 경우 :*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

`asar` 아카이브를 사용할 땐 단순히 `app` 폴더 대신에 애플리케이션을 패키징한 `app.asar` 파일로 대체하면됩니다. Electron은 자동으로 app폴더 대신 asar 아카이브를 기반으로 애플리케이션을 실행합니다.

*macOS 의 경우 : *

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Windows 와 Linux 의 경우 :*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

애플리케이션을 Electron에 번들링한 후 해당 애플리케이션에 맞게 리브랜딩 할 수 있습니다.

#### macOS

`Electron.app`을 원하는 이름으로 변경할 수 있습니다. 그리고 다음 표시된 애플리케이션 내부 파일에서 `CFBundleDisplayName`, `CFBundleIdentifier` 그리고 `CFBundleName` 필드를 원하는 이름으로 변경해야 합니다:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

또한 helper 앱이 프로세스 모니터에 `Electron Helper`로 나오지 않도록 이름을 변경할 수 있습니다. 하지만 반드시 내부 및 모든 helper 앱의 이름을 변경해야 합니다.

애플리케이션 이름을 원하는 이름으로 변경한 예시:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

[rcedit](https://github.com/electron/rcedit)를 통해 `electron.exe`을 원하는 이름으로 변경할 수 있고, 또한 아이콘과 기타 정보도 변경할 수 있습니다.

#### Linux

실행파일 `electron`의 이름을 원하는 대로 바꿀 수 있습니다.

### Rebranding by rebuilding Electron from source

제품 이름을 변경하고 소스에서 빌드하여 Electron의 브랜드를 변경할 수도 있습니다. 이렇게 하려면 `args.gn` 파일에서 제품 이름 (`electron_product_name = "YourProductName"`)에 해당하는 빌드 인수를 설정하고 다시 빌드해야합니다.
