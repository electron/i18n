# Membangun petunjuk (macOS)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* macOS > = 10.11.6
* [@googlechrome](https://developer.apple.com/technologies/tools/) pada Twitter
* [node.js](https://nodejs.org) untuk Linux)
* Python 2.7 dengan dukungan untuk TLS 1.2

## Python

Harap pastikan juga bahwa sistem dan versi Python Anda mendukung setidaknya TLS 1.2. Ini tergantung pada versi macOS dan Python Anda. Untuk tes cepat, jalankan:

```sh
$ npm run check-tls
```

Jika skrip mengembalikan bahwa konfigurasi Anda menggunakan protokol keamanan yang sudah ketinggalan zaman, Anda dapat memperbarui macOS ke High Sierra atau memasang versi terbaru dari Python 2.7.x. Untuk meningkatkan Python, gunakan [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

* [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macos SDK

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

Official Electron builds are built with [Xcode 8.3.3](http://adcdownload.apple.com/Developer_Tools/Xcode_8.3.3/Xcode_8.3.3.xip), and the MacOS 10.12 SDK. Building with a newer SDK works too, but the releases currently use the 10.12 SDK.

## Building Electron

See [Build Instructions: GN](build-instructions-gn.md).