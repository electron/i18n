# Desteklenen Platformlar

Electron tarafından desteklenen platformlar:

### macOS

MacOS için sadece 64bit ve en az macOS 10.9 sürümü desteklenmektedir.

### Windows

Windows 7 ve sonraki sürümleri desteklenir, eski işletim sistemleri desteklenmez (ve çalışmaz).

Windows için `ia32` (`x86`) ve `x64` (`amd64`) sistemi desteklenmektedir. Lütfen aklınızda bulundurun; Windows'un `ARM` versiyonu şimdilik desteklenmemektedir.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 ve sonrası
* Fedora 21
* Debian 8