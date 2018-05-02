# İnşaa Talimatları (macOS)

Electron'u macOS üzerinde kurmak için aşağıdaki yönergeleri takip edin.

## Ön gereklilikler

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (harici)

Eğer, Homebrew üzerinden kurduğunuz Python'u kullanıyorsanız, aşağıdaki Python modüllerini de kurmanız gerekiyor:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Eğer basitçe Electron geliştiriyorsanız ve kendinize özel bir Electron inşaası dağıtmayacaksanız, bu kısmı atlayabilirsiniz.

Bazı özellikler için (pinch-zoom vb.) macOS 10.10 SDK'sını hedef almalısınız.

Resmi Electron inşaaları varsayılan olarak 10.10 SDK'yı içermeyen [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip) ile inşaa edilmekte. 10.10 SDK'ya sahip olmak için [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG'yi indirip, diskinize bağlayın.

Xcode 6.4'un diskinize `/Volumes/Xcode` üzerinde bağlandığını, Xcode 8.2.1 kurulumunun ise `/Applications/Xcode.app` üzerinde olduğunu varsayarak:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

Aynı zamanda Xcode'un 10.10 SDK ile inşaa hizmetini de aktifleştirmeniz gerekir:

- Açın `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- `MinimumSDKVersion` değerini `10.10`'a çekin
- Dosyayı kaydedin

## Kodu almak

```sh
$ git clone https://github.com/electron/electron
```

## İlk işleri halletmek

Ilk işleri halleden bootstrap betiği inşaa için gerekli olan bağımlılıkları indirir ve gerekli inşaa dosyalarını hazırlar. Electron'u inşaa etmek içın [ninja](https://ninja-build.org/) kullaniyoruz, böylece Xcode projesi yaratmaya gerek yok.

```sh
$ cd electron
$ ./script/bootstrap.py -v
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

## İnşaa

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## 32bit Desteği

Electron can only be built for a 64bit target on macOS and there is no plan to support 32bit macOS in the future.

## Temizlik

İnşaa dosyalarını temizlemek için:

```sh
$ npm run clean
```

Sadece `out` and `dist` dizinlerini temizlemek için:

```sh
$ npm run clean-build
```

**Not:** Her iki temizleme komutu inşaa öncesi `bootstrap` çalıştırılmasını şart koşar.

## Testler

Burayı ziyaret edin: [İnşaa Sistemi Genel Görünümü: Testler](build-system-overview.md#tests)