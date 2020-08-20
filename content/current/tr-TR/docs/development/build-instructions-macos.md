# İnşaa Talimatları (macOS)

Electron'u macOS üzerinde kurmak için aşağıdaki yönergeleri takip edin.

## Ön gereklilikler

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (harici)
* Python 2.7, TLS 1.2 desteği ile

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

Eğer komut dosyası, yapılandırmanızın eski bir güvenlik protokolü kullandığını döndürürse, macOS'u High Sierra'ya güncelleyebilir veya Python'un yeni 2.7.x sürümünü indirebilirsiniz. Python'u yeni sürümüne güncellemek için [Homebrew](https://brew.sh/) kullanın:

```sh
$ brew install python@2 && brew link python@2 --force
```

Homebrew tarafından sağlanan Python kullanıyorsanız, ayrıca aşağıdaki Python modüllerini kurmanız gerekmektedir:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Yüklemek için `pip` kullanabilirsiniz:

```sh
$ pip install pyobjc
```

## macOS SDK

Electron geliştiriyor ve özel Electron derlemenizi dağıtmak gibi bir planınız yoksa bu bölümü atlayabilirsiniz.

Resmi Electron sürümleri [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), ve macOS 10.13 SDK ile yapılmıştır.  Building with a newer SDK works too, but the releases currently use the 10.13 SDK.

## Electron'u Derlemek

Bakmak [Derleme Komutları: GN](build-instructions-gn.md).
