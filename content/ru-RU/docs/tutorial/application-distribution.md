# Распространение приложений

Для распространения вашего приложения с Electron, вам нужно скачать [предварительно собранные двоичные файлы](https://github.com/electron/electron/releases) Electron. Далее папку, содержащую ваше приложение следует назвать `app` и поместить в каталог ресурсов Electron, как показано в следующих примерах. Обратите внимание, что расположение двоичных файлов Electron в приведенных ниже примерах обозначается как `electron/`.

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

Затем необходимо выполнить `Electron.app` (или `electron` на Linux, `electron.exe` на Windows), и Electron запустится в качестве приложения. Каталог `Electron` станет вашим дистрибутивом для доставки конечным пользователям.

## Упаковка приложения в файл

Помимо доставки приложения путем копирования всех его исходных файлов, его также можно упаковать в архив ["asar"](https://github.com/electron/asar), что позволит не раскрывать пользователям исходный код.

Чтобы использовать архив `asar` для замены каталога `app`, необходимо переименовать архив в `app.asar` и положить его в каталог ресурсов Electron, как показано ниже, и Electron будет пытаться прочитать архив и начать с него.

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

Более подробную информацию можно найти в разделе [Упаковка приложения](application-packaging.md).

## Ребрендинг скачанных бинарных файлов

После построения вашего приложения в Electron и перед распространением вам следует провести его ребрендинг.

### Windows

Вы можете сменить имя файла `electron.exe` на любое понравившееся, отедактировать его значок и другую информацию такими инструментами, как [rcedit](https://github.com/atom/rcedit).

### macOS

Вы можете переименовать `Electron.app`, а также вы должны переименовать поля `CFBundleDisplayName`, `CFBundleIdentifier` и `CFBundleName` в следующих файлах:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Вы также можете переименовать helper приложения, чтобы избежать показа `Electron Helper` в Activity Monitor, но убедитесь, что вы переименовали имя исполняемого файла helper приложения.

Структура переименования app будет такая:

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

Вам нужно форкнуть Electron, когда у вас имеется собственный код C++, который вы примените в виде патча непосредственно в Electron, который не может быть upstreamed или были отклонения от официальной версии. Как сопровождающие Electron, мы очень многое хотели сделать по вашему сценарию работы, так что пожалуйста попробуйте как сложность и вы сможете получить ваши изменения в официальной версии Electron, это будет намного легче на вас, и мы оценим вашу помощь.

#### Создание surf-build пользовательского релиза

1. Установить [Surf](https://github.com/surf-build/surf), через npm: `npm install -g surf-build@latest`

2. Создайте новый S3 bucket и создайте следующую структуру пустых каталогов:
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. Установите следующие переменные среды:

* `ELECTRON_GITHUB_TOKEN` - токен, который может создавать релизы на GitHub
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - место, куда вы будете отправлять node.js заголовки, а также символы
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` - установите в `true` или иначе произойдет сбой
* `GITHUB_TOKEN` - установите его так же, как `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - установите в `C:\Temp` на Windows для предотвращения проблем слишком длинного пути
* `TARGET_ARCH` - установить в `ia32` или `x64`

1. В `script/upload.py`, вы *должны* установить `ELECTRON_REPO` к вашему форку (`MYORG/electron`), особенно если вы участник сопровождающий Electron.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Ждать очень, очень долгое время для завершения построения.