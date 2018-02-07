# サポートされているプラットフォーム

Electronは以下のプラットフォームをサポートしています。

### macOS

macOS向けには64bitバイナリのみが提供されます。対応するmacOSのバージョンは10.9以降です。

### Windows

Windows 7以降に対応しています。Vista以前のOSはサポートされておらず、動作もしません。

Windows向けにはIA-32(x86)および64bit(AMD64)のいずれのバイナリも提供されます。現時点ではARM版のWindowsに対応していない点にご注意ください。

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Electronがどのディストリビューションで動作するかどうかは、ビルドプラットフォームでリンクされたライブラリが存在するかによりますので、Ubuntu 12.04 のみを動作保証していますが、次のプラットフォームについてもビルド済みのElectronバイナリを実行できるか検証しています：

* Ubuntu 12.04 以降
* Fedora 21
* Debian 8