# サポートされているプラットフォーム

Electronは以下のプラットフォームをサポートしています。

### macOS

macOS向けには64bitバイナリのみが提供されます。対応するmacOSのバージョンは10.9以降です。

### Windows

Windows 7以降に対応しています。Vista以前のOSはサポートされておらず、動作もしません。

Windows向けにはIA-32(x86)および64bit(AMD64)のいずれのバイナリも提供されます。現時点ではARM版のWindowsに対応していない点にご注意ください。

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `arm` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8