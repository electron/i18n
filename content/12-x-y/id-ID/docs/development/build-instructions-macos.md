# Membangun petunjuk (macOS)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) untuk Linux)
* Python 2.7 dengan dukungan untuk TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/check-python-tls
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Jika Anda menggunakan Python seperti yang disediakan oleh Homebrew, Anda juga perlu memasang modul Python berikut:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Anda dapat menggunakan`pip` untuk memasangnya:

```sh
$ pip install pyobjc
```

## macos SDK

Jika Anda mengembangkan Electron dan tidak berencana untuk mendistribusikan custom Electron build anda, Anda dapat melewati bagian ini.

Build Electron Resmi dibuat dengan [ Xcode 9.4.1 ](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), dan macOS 10.13 SDK.  Pengembangan dengan SDK yang lebih baru juga berfungsi, tetapi rilisnya saat ini menggunakan SDK 10.13.

## Pengembangan Electron

Lihat [Build Instructions: GN](build-instructions-gn.md).
