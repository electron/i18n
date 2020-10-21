# Распространение приложений

Чтобы распространять приложение с помощью Electron, вам нужно его перегруппировать и перегруппировать. Самый простой способ сделать это - использовать один из следующих инструментов упаковки:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Эти инструменты позаботятся обо всех шагах, которые вам нужно предпринять для того, чтобы в конечном итоге получить готовое к распространению приложения Electron, такие как упаковка вашего приложения, ребрендинг исполняемого файла, установка правильных значков и создание инсталляторов.

## Ручное распространение
Вы также можете вручную сделать приложение готовым к распространению. Ниже приводится информация о шагах, которые необходимо предпринять.

Для распространения вашего приложения с Electron, вам нужно скачать [предварительно собранные двоичные файлы](https://github.com/electron/electron/releases) Electron. Далее папку, содержащую ваше приложение следует назвать `app` и поместить в каталог ресурсов Electron, как показано в следующих примерах. Обратите внимание, что расположение двоичных файлов Electron в приведенных ниже примерах обозначается как `electron/`.

На macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

На Windows и Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Упаковка приложения в файл

Помимо доставки приложения путем копирования всех его исходных файлов, его также можно упаковать в архив ["asar"](https://github.com/electron/asar), что позволит не раскрывать пользователям исходный код.

Чтобы использовать архив `asar` для замены каталога `app`, необходимо переименовать архив в `app.asar` и положить его в каталог ресурсов Electron, как показано ниже, и Electron будет пытаться прочитать архив и начать с него.

На macOS:

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

На Windows и Linux:

```plaintext
electron/resources/
└── app.asar
```

Более подробную информацию можно найти в разделе [Упаковка приложения](application-packaging.md).

## Ребрендинг скачанных бинарных файлов

После построения вашего приложения в Electron и перед распространением вам следует провести его ребрендинг.

### Windows

Вы можете сменить имя файла `electron.exe` на любое понравившееся, отредактировать его значок и другую информацию такими инструментами, как [rcedit](https://github.com/electron/rcedit).

### macOS

Вы можете переименовать `Electron.app`, а также вы должны переименовать поля `CFBundleDisplayName`, `CFBundleIdentifier` и `CFBundleName` в следующих файлах:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Вы также можете переименовать helper приложения, чтобы избежать показа `Electron Helper` в Activity Monitor, но убедитесь, что вы переименовали имя исполняемого файла helper приложения.

Структура переименования app будет такая:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

`Electron` исполняемый файл можно переименовать на любое имя, которое вам нравится.

## Проведите ребрендинг, пересобрав Electron из исходных кодов

Можно изменить бренд Electron путем изменения имени продукта и сборки его из исходных кодов. Для этого вам надо установить аргумент, отвечающий за имя продукта (`electron_product_name = "YourProductName"`) в файле `args.gn` и пересобрать Electron.

### Создание пользовательских Electron форков

Создание пользовательского форка Electron это почти наверняка не то, что вам будет нужно сделать для того, чтобы построить приложение даже уровня "Production Level". Использование такого инструмента как `electron-packager` или `electron-forge` позволит вам совершить "Ребрендинг" Electron без необходимости делать эти шаги.

Вам нужно форкнуть Electron, когда у вас имеется собственный код C++, который вы примените в виде патча непосредственно в Electron, который не может быть upstreamed или были отклонения от официальной версии. Как сопровождающие Electron, мы очень многое хотели сделать по вашему сценарию работы, так что пожалуйста попробуйте как сложность и вы сможете получить ваши изменения в официальной версии Electron, это будет намного легче на вас, и мы оценим вашу помощь.

#### Создание surf-build пользовательского релиза

1. Установить [Surf](https://github.com/surf-build/surf), через npm: `npm install -g surf-build@latest`

2. Создайте новый S3 bucket и создайте следующую структуру пустых каталогов:

    ```sh
    - электронный/
      - символы/
      - расстояние/
    ```

3. Установите следующие переменные среды:

  * `ELECTRON_GITHUB_TOKEN` - токен, который может создавать релизы на GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - место, куда вы будете отправлять node.js заголовки, а также символы
  * `ELECTRON_RELEASE` - установите `true` и отправьте часть выполняться, оставить без изменений, `surf-build` просто будет делать проверки CI-типа, необходимо запускать для каждого pull request'а.
  * `CI` - установите в `true` или иначе произойдет сбой
  * `GITHUB_TOKEN` - установите его так же, как `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - установите в `C:\Temp` на Windows для предотвращения проблем слишком длинного пути
  * `TARGET_ARCH` - установить в `ia32` или `x64`

4. В `script/upload.py`, вы _должны_ установить `ELECTRON_REPO` к вашему форку (`MYORG/electron`), особенно если вы участник сопровождающий Electron.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Очень, очень долго ждать завершения сборки.
