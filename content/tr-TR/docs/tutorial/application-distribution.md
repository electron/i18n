# Uygulama Dağıtımı

To distribute your app with Electron, you need to package and rebrand it. The easiest way to do this is to use one of the following third party packaging tools:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron-userland/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron applications, such as packaging your application, rebranding the executable, setting the right icons and optionally creating installers.

## Manual distribution

You can also choose to manually get your app ready for distribution. The steps needed to do this are outlined below.

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

Sonra `Electron.app` (veya Windows üzerinde `electron.exe`, Linux üzerinde `electron`) çalıştırın ve Electron uygulamanız olarak çalışacaktır. Böylece, `electron` dizini, son kullanıcılara sunmak için dağıtımınız olur.

## Uygulamanızı Bir Dosyaya Paketleme

Tüm kaynak dosyalarını kopyalayarak uygulamanızın taşınmasından ayrı olarak, ayrıca önlemek için uygulamanızı bir  asar </ 0> arşivine paketleyin uygulamanızın kaynak kodunu kullanıcılara açıklayın.</p> 

`asar` arşivini `app` klasörünü değiştirmek için kullanmak için, arşivi `app.asar` olarak yeniden adlandırmanız ve aşağıda olduğu gibi Electron'un resources dizini altına koymanız gerekir, Electron da arşivi okumaya çalışacaktır ve ondan başlayacaktır.

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

## İndirilen ikili değerler ile yeniden markalaştırmak

Uygulamanızı Electron'da topladıktan sonra, Electron'u kullanıcılara dağıtmadan önce yeniden markalamak isteyeceksiniz.

### Windows

`electron.exe` adını istediğiniz herhangi bir adla yeniden adlandırabilir simgesini ve diğer simgelerini düzenleyebilirsiniz, araçlar hakkında bilgi [rcedit](https://github.com/atom/rcedit).

### macOS

`Electron.app` 'yi istediğiniz herhangi bir adla yeniden adlandırabilir ayrıca yeniden adlandırma alanındaki `CFBundleDisplayName`, `CFBundleIdentifier` ve `CFBundleName` dosyalar aşağıdadır:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Etkinlik İzleyicisinde `Electron Helper`'in görüntülenmesini engellemek için yardımcı uygulamasının adını da değiştirebilirsiniz fakat yardımcı uygulamasının yürütülebilir dosyasının adını değiştirdiğinizden emin olun.

Yeniden adlandırılan bir uygulamanın yapısı aşağıdaki gibi olur:

```text
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

### Linux

`electron` yürütülebilir dosyasını istediğiniz herhangi bir adla yeniden adlandırabilirsiniz.

## Electron'u Kaynaktan Yeniden Yapılandırma

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.

### Özel bir Electron Çatısı Oluşturma

Electron'un özel bir çatalı yaratmak kesinlikle sizin yapmanız gereken bir şey değildir "Üretim Seviyesi" uygulamaları için bile, uygulamanızı oluşturmak için yapmanız gerekir. "Markalaştırma" işlemini bu adımlar olmadan,`electron-paketleyici` yada` electron-sahteciliği` gibi araçları kullanarak yapmanıza izin veriri.

Doğrudan Electron'a yamaladığınız özel C ++ kodunuz olduğunda, ya yukarı doğru akışlanamayan ya da resmi sürümden reddedilen Electron'u çatallamanız gerekir. Electron'un koruyucuları olarak, senaryonuzu çalışır hale getirmek çok isterim değişikliklerinizi elde etmek için mümkün olduğunca zor Electron'un resmi versiyonuna girerseniz, sizin için daha kolay olur. Yardımınız için teşekkür ederiz.

#### Sörf-derleme ile özel bir sürüm oluşturma

1. Npm: `npm install -g surf-build@latest` üzerinden [Surf](https://github.com/surf-build/surf) ' ı kurun

2. Yeni bir S3 kovası oluşturun ve boş dizin yapısını izleyin:
    
    ```sh
    - electron/
      - symbols/
      - dist/
    ```

3. Aşağıdaki Ortam Değişkenlerini ayarlayın:

* `ELECTRON_GITHUB_TOKEN` - GitHub'da sürümler oluşturabilen bir simge
* `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload Node.js headers as well as symbols
* `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
* `CI` ' ı `true` olarak değiştirin yoksa başarısız olur
* `GITHUB_TOKEN` - aynı değerle ayarla `ELECTRON_GITHUB_TOKEN`
* `SURF_TEMP` - yolun çok uzun sürmesini önlemek için Windows'ta `C:\Temp` olarak ayarlayın
* `TARGET_ARCH` - set to `ia32` or `x64`

1. Özellikle elektron katkıda bulunan biriyseniz `script/upload.py` içinde *gerekir* `ELECTRON_REPO` çatal (`MYORG/elektron`) ayarlayın.

2. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

3. Yapılandırmanın tamamlanması için çok, çok uzun süre bekleyin.