# Membangun petunjuk (Linux)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) untuk Linux)
* Python 2.7 dengan dukungan untuk TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

Jika skrip mengembalikan bahwa konfigurasi Anda menggunakan protokol keamanan yang sudah ketinggalan zaman, Anda dapat memperbarui macOS ke High Sierra atau memasang versi terbaru dari Python 2.7.x. Untuk meningkatkan Python, gunakan [Homebrew](https://brew.sh/):

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

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the MacOS 10.13 SDK.  Pengembangan dengan SDK yang lebih baru juga berfungsi, tetapi rilisnya saat ini menggunakan SDK 10.13.

## Pengembangan Electron

Lihat [Build Instructions: GN](build-instructions-gn.md).
