# İnşaa Talimatları (macOS)

Electron'u macOS üzerinde kurmak için aşağıdaki yönergeleri takip edin.

## Ön gereklilikler

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](https://nodejs.org) (harici)
- Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

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

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).