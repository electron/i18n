# Membangun petunjuk (macOS)

Ikuti panduan di bawah ini untuk membangun Elektron pada macOS.

## Prasyarat

- macOS >= 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) >= 8.2.1
- [node.js](http://nodejs.org) (external)

Jika Anda menggunakan Python yang didownload oleh Homebrew, Anda juga perlu menginstal modul Python berikut ini:

- [pyobjc](https://pythonhosted.org/pyobjc/install.html)

## macos SDK

Jika Anda hanya mengembangkan Elektron dan tidak berencana untuk mendistribusikan ulang custom Electron build, Anda bisa melewati bagian ini.

Untuk fitur tertentu (misalnya pinch-zoom) agar berfungsi dengan benar, Anda harus menargetkan SDK macos 10.10.

Official Electron builds are built with [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), which does not contain the 10.10 SDK by default. To obtain it, first download and mount the [Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Then, assuming that the Xcode 6.4 DMG has been mounted at `/Volumes/Xcode` and that your Xcode 8.2.1 install is at `/Applications/Xcode.app`, run:

```sh
cp -r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

You will also need to enable Xcode to build against the 10.10 SDK:

- Open `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- Set the `MinimumSDKVersion` to `10.10`
- Simpan file

## Mendapatkan kode

```sh
$ git klon https://github.com/electron/electron
```

## Bootstrap

Script bootstrap akan mendownload semua dependensi build yang diperlukan dan membuat file proyek build. Notice that we're using [ninja](https://ninja-build.org/) to build Electron so there is no Xcode project generated.

```sh
$ cd elektron
$ ./script/bootstrap.py -v
```

## Membangun

Build both `Release` and `Debug` targets:

```sh
$ ./script/build.py
```

You can also only build the `Debug` target:

```sh
$ ./script/build.py -c D
```

After building is done, you can find `Electron.app` under `out/D`.

## Dukungan 32bit

Elektron hanya bisa dibangun untuk target 64bit pada macOS dan tidak ada rencana untuk melakukannya dukung macos 32bit di masa depan.

## Pembersihan

Untuk membersihkan file build:

```sh
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm berjalan bersih-bangun
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Pengujian

See [Build System Overview: Tests](build-system-overview.md#tests)