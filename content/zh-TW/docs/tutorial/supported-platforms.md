# 支援平臺

下列為 Electron 支援的平臺:

### macOS

只提供 64 位元的 macOS 二進位檔案，支援的最低 macOS 版本為 10.9。

### Windows

支援 Windows 7 及其後的版本，更舊的作業系統不受支援 (也無法運作)。

同時提供 `ia32` (`x86`) 和 `x64` (`amd64`) 兩種二進位檔。請注意，現在還不支援 `ARM` 版本的 Windows。

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

預先建置的二進位檔能否在特定發行版本上執行，取決於該發行版本是否包括 Electron 建置平台時連結連結的程式庫，因此只能保證在 Ubuntu 12.04 上能正常運作。但下列平臺中也都經過驗證，能執行 Electron 預先建置二進位檔:

* Ubuntu 12.04 或更新的版本
* Fedora 21
* Debian 8