# 支援平臺

下列為 Electron 支援的平臺:

### macOS

只提供 64 位元的 macOS 二進位檔案，支援的最低 macOS 版本為 10.9。

### Windows

支援 Windows 7 及其後的版本，更舊的作業系統不受支援 (也無法運作)。

同時提供 `ia32` (`x86`) 和 `x64` (`amd64`) 兩種二進位檔。請注意，現在還不支援 `ARM` 版本的 Windows。

### Linux

提供的 `ia32` (`i686`) 和 `x64` (`amd64`) Electron 二進位檔是在 Ubuntu 12.04 上預先建置，而 `arm` 二進位檔則是以 ARM v7 啟用硬體浮點 ABI 和 NEON 指令集在 Debian Wheezy 上建置。

預先建置的二進位檔能否在特定發行版本上執行，取決於該發行版本是否包括 Electron 建置平台時連結連結的程式庫，因此只能保證在 Ubuntu 12.04 上能正常運作。但下列平臺中也都經過驗證，能執行 Electron 預先建置二進位檔:

* Ubuntu 12.04 或更新的版本
* Fedora 21
* Debian 8