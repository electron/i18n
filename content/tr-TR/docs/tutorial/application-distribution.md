# Uygulama Dağıtımı

Uygulamanızı Electron ile dağıtmak için, Electron'un [prebuiltbinaries](https://github.com/electron/electron/releases) önceden oluşturulmuş dosyalarını dosyalarını indireniz gerekir. Sonra, klasör `app` olarak adlandırılmalı ve Electron'un kaynaklarına yerleştirilmelidir aşağıdaki örneklerde gösterildiği gibi. Konumunu Electron'un önceden hazırlanmış ikili dosyaları örneklerde `electron /` ile altında gösterilir.

MacOS üzerinde:

```text
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Windows ve Linux üzerinde:

```text
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Uygulamanızı Bir Dosyaya Paketleme

Apart from shipping your app by copying all of its source files, you can also package your app into an [asar](https://github.com/electron/asar) archive to avoid exposing your app's source code to users.

To use an `asar` archive to replace the `app` folder, you need to rename the archive to `app.asar`, and put it under Electron's resources directory like below, and Electron will then try to read the archive and start from it.

MacOS üzerinde:

```text
electron/Electron.app/Contents/Resources/
└── app.asar
```

Windows ve Linux üzerinde:

```text
electron/resources/
└── app.asar
```

Daha fazla detay [Application packaging](application-packaging.md) içinde bulunabilir.

## Rebranding with Downloaded Binaries

Uygulamanızı Electron'da topladıktan sonra, Electron'u kullanıcılara dağıtmadan önce yeniden markalamak isteyeceksiniz.

### Windows

`electron.exe` adını istediğiniz herhangi bir adla yeniden adlandırabilir simgesini ve diğer simgelerini düzenleyebilirsiniz, araçlar hakkında bilgi [rcedit](https://github.com/atom/rcedit).

### macOS

`Electron.app` 'yi istediğiniz herhangi bir adla yeniden adlandırabilir ayrıca yeniden adlandırma alanındaki `CFBundleDisplayName`, `CFBundleIdentifier` ve `CFBundleName` dosyalar aşağıdadır:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

Yeniden adlandırılan bir uygulamanın yapısı aşağıdaki gibi olur:

```text
For Translation

MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    ├── MyApp Helper EH.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper EH
    ├── MyApp Helper NP.app
    |   ├── Info.plist
    |   └── MacOS/
    |       └── MyApp Helper NP
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

### Linux

`elektron` yürütülebilir dosyasını istediğiniz herhangi bir adla yeniden adlandırabilirsiniz.

## Paketleme araçları

Uygulamanızı manuel olarak paketlemenin yanı sıra, üçüncü parti aracıların sizin için paketleme araçları:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

## Elekctron'u Kaynaktan Yeniden Yapılandırma

Electron'u, ürün adını değiştirerek yeniden markalamak da mümkündür. onu kaynaktan inşa etmek için ` atom.gyp ` dosyasını değiştirmeniz ve temiz bir yeniden yapılandırma gerekir.

### Özel bir Electron Çatısı Oluşturma

Elektron'un özel bir çatalı yaratmak kesinlikle sizin yapmanız gereken bir şey değildir "Üretim Seviyesi" uygulamaları için bile, uygulamanızı oluşturmak için yapmanız gerekir. Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. Electron'un koruyucuları olarak, senaryonuzu çalışır hale getirmek çok isterim değişikliklerinizi elde etmek için mümkün olduğunca zor Electron'un resmi versiyonuna girerseniz, sizin için daha kolay olur. Yardımınız için teşekkür ederiz.

#### Creating a Custom Release with surf-build

1. Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Create a new S3 bucket and create the following empty directory structure:
    
    ```sh
- atom-shell/
  - symbols/
  - dist/
```

3. Aşağıdaki Ortam Değişkenlerini ayarlayın:

* `ELECTRON_GITHUB_TOKEN` - GitHub'da sürümler oluşturabilen bir simge
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - node.js başlıklarını ve sembolleri yükleyeceğiniz yer
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will just do CI-type checks, appropriate to run for every pull request.
* `CI` - Set to `true` or else it will fail
* `GITHUB_TOKEN` - aynı değerle ayarla `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - yolun çok uzun sürmesini önlemek için Windows'ta `C:\Temp` olarak ayarlayın
* `TARGET_ARCH` - set to `ia32` or `x64`

1. In `script/upload.py`, you *must* set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Yapılandırmanın tamamlanması için çok, çok uzun süre bekleyin.