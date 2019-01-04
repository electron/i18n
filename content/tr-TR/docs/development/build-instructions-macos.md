# İnşaa Talimatları (macOS)

Electron'u macOS üzerinde kurmak için aşağıdaki yönergeleri takip edin.

## Ön gereklilikler

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
* [node.js](https://nodejs.org) (harici)
* Python 2.7, TLS 1.2 desteği ile

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Homebrew tarafından sağlanan Python kullanıyorsanız, ayrıca aşağıdaki Python modüllerini kurmanız gerekmektedir:

* [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macOS SDK

Electron geliştiriyor ve özel Electron derlemenizi dağıtmak gibi bir planınız yoksa bu bölümü atlayabilirsiniz.

Resmi Electron derlemeleri, [Xcode 8.3.3](http://adcdownload.apple.com/Developer_Tools/Xcode_8.3.3/Xcode_8.3.3.xip) ve MacOS 10.12 SDK ile derlenir. Building with a newer SDK works too, but the releases currently use the 10.12 SDK.

## Electron'u Derlemek

Bakmak [Derleme Komutları: GN](build-instructions-gn.md).