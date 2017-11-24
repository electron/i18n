# Распространение приложения

Для распространения вашего приложения с электроном, вам нужно скачать электронов [Готовые двоичные файлы](https://github.com/electron/electron/releases). Далее в папку, содержащую ваше приложение следует именовать `app` и помещать в каталог ресурсов Electron, как показано в следующих примерах. Обратите внимание, что расположение Electron предсобранных бинарных файлов, обозначается `electron/` в приведенных ниже примерах.

На macOS:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

На Windows и Linux:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Затем выполнить `Electron.app` (или `electron` на Linux, `electron.exe` на Windows), и Electron будет запускаться в качестве приложения. `Electron` каталог будет вашим дистрибутивом для доставки конечным пользователям.

## Упаковка приложения в файл

Помимо доставки вашего приложения путем копирование всех его исходных файлов, можно также упаковать приложение в архив ["Асар"](https://github.com/electron/asar) чтобы не подвергать исходный код вашего приложения для пользователей.

Чтобы использовать архив `asar` для замены папки `app`, необходимо переименовать архив к `app.asar` и положить его под каталог ресурсов Electron как ниже, и Electron будет пытаться прочитать архив и начать с него.

На macOS:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

На Windows и Linux:

```text
electron/resources/
└── app.asar
```

Более подробную информацию можно найти в [Application packaging](application-packaging.md).

## Ребрендинг из скачанных бинарных файлов

После построения вашего приложения в Electron, вы хотите ребрендинга Electron перед распространением пользователям.

### Windows

Вы можете переименовать `electron.exe` на любое имя, которое вам нравится и редактировать его значок и другой информации инструментами, как [rcedit](https://github.com/atom/rcedit).

### macOS

Вы можете переименовать `Electron.app` на любое имя, которое вы хотите, и вы также должны переименовать поля `CFBundleDisplayName`, `CFBundleIdentifier` и `CFBundleName` в следующих файлах:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Вы также можете переименовать helper приложения, чтобы избежать показа `Electron Helper` в Activity Monitor, но убедитесь, что вы переименовали имя исполняемого файла helper приложения.

Структура переименования app будет такая:

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

`Electron` исполняемый файл можно переименовать на любое имя, которое вам нравится.

## Упаковочные инструменты

Помимо упаковки приложения вручную, вы также можете использовать инструменты сторонних производителей инструментов упаковки, которые сделают эту работу для вас:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Ребрендинг, перестроив Electron из источника

Это также возможно для ребрендинга Electron, изменив название продукта и построение из источника. Для этого вам нужно изменить файл `atom.gyp` и иметь чистую среду ребилда.

### Создание пользовательских Electron форков

Создание пользовательского форка Electron это почти наверняка не то, что вам будет нужно сделать для того, чтобы построить приложение даже уровня "Production Level". С помощью такого инструмента как `electron-packager` или `electron-forge` позволит вам совершить "Ребрендинг" Electron без необходимости делать эти шаги.

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