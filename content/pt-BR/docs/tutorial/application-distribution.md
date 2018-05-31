# Distribuição de Aplicativos

Para distribuir seu aplicativo com Electron, você precisa baixar os [binários pré-compilados](https://github.com/electron/electron/releases) do Electron. Depois disso, a pasta contendo seu aplicativo deve ser renomeada para `app` e colocada dentro do diretório de recursos (resources) do Electron como mostrado nos seguintes exemplos. Note que a localização dos binários pré-compilados do Electron está indicada com `electron/` nos exemplos abaixo.

No macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

No Windows e Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Então, execute o `Electron.app` (ou `electron` no Linux, `electron.exe` no Windows), e o Electron vai iniciar seu aplicativo. O diretório `electron` será então a distribuição a ser entregue aos usuários finais.

## Distribuindo seu app como apenas um arquivo

Além de poder distribuir seu app copiando todo o seu código fonte, você também pode empacotar seu aplicativo em um arquivo [asar](https://github.com/electron/asar) para impedir que usuários possam ver o código fonte.

To use an `asar` archive to replace the `app` folder, you need to rename the archive to `app.asar`, and put it under Electron's resources directory like below, and Electron will then try to read the archive and start from it.

No macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

No Windows e Linux:

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
    
    ```sh
    - atom-shell/
      - symbols/
      - dist/
    ```

3. Set the following Environment Variables:

* `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
* `TARGET_ARCH` - set to `ia32` or `x64`

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Wait a very, very long time for the build to complete.