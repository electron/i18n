# アプリケーションの配布

Electronでアプリを配布する際は、[ビルド済みバイナリ](https://github.com/electron/electron/releases)をダウンロードする必要があります。 次に、アプリケーションが含まれたフォルダの名前を`app`に変更し、Electronのリソースディレクトリに、下に示すように配置します。 Electronのビルド済みバイナリは下記の例では`electron/`に配置されていることをご注意ください。

macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Windows および Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

配置が終わったら、`Electron.app` (Linuxでは`electron`, Windowsでは`electron.exe`)を実行すれば、アプリが開始されます。`electron`フォルダがアプリケーションの実際の使用者に配布されるフォルダになります。

## アプリのパッケージ化

すべてのソースコードをコピーすることでアプリケーションを提供する方法とは別に、アプリケーションのソースコードをユーザーに見えるのを避けるために、[asar](https://github.com/electron/asar) にアーカイブしてアプリケーションをパッケージ化することができます。

`app` フォルダの代わりに `asar` アーカイブを使用するためには、アーカイブファイルを `app.asar` という名前に変更し、Electron のリソースディレクトリに以下のように配置する必要があります。そうすれば、Electron はアーカイブを読み込みを試み、そこから起動します。

macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Windows および Linux:

```text
electron/resources/
└── app.asar
```

詳細については、[アプリケーションのパッケージ化](application-packaging.md) でご確認ください。

## ビルド済みバイナリのカスタマイゼーション

Electronにアプリバンドルした後、ユーザーに配布する前に、 Electronのカスタマイズを行いたいことと思います。

### Windows

`electron.exe` のファイル名は、任意の名前に変更することが出来ます。また、アイコンやその他の情報を [rcedit](https://github.com/atom/rcedit) のようなツールで編集出来ます。

### macOS

`Electron.app` のファイル名は、任意の名前に変更することが出来ます。また、下記ファイル中の`CFBundleDisplayName`, `CFBundleIdentifier`, `CFBundleName`も変更する必要があります。

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

* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Rebranding by Rebuilding Electron from Source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to modify the `atom.gyp` file and have a clean rebuild.

### grunt-build-atom-shell

Manually checking out Electron's code and rebuilding could be complicated, so a Grunt task has been created that will handle this automatically: [grunt-build-atom-shell](https://github.com/paulcbetts/grunt-build-atom-shell).

This task will automatically handle editing the `.gyp` file, building from source, then rebuilding your app's native Node modules to match the new executable name.

### Creating a Custom Electron Fork

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-builder` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### Creating a Custom Release with surf-build

1. Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
        - atom-shell/
          - symbols/
          - dist/
        

3. Set the following Environment Variables:

* `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will just do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64` 

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Wait a very, very long time for the build to complete.