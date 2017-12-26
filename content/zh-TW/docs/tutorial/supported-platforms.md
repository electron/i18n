# 支援平臺

下列為 Electron 支援的平臺:

### macOS

只提供 64 位元的 macOS 二進位檔案，支援的最低 macOS 版本為 10.9。

### Windows

支援 Windows 7 及其後的版本，更舊的作業系統不受支援 (也無法運作)。

同時提供 `ia32` (`x86`) 和 `x64` (`amd64`) 兩種二進位檔。請注意，現在還不支援 `ARM` 版本的 Windows。

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `arm` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 或更新的版本
* Fedora 21
* Debian 8