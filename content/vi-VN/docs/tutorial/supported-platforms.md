# Nền tảng hỗ trợ

Các nền tảng được hỗ trợ bởi Electron:

### macOS

Chỉ có duy nhất phiên bản 64bit được hỗ trợ cho macOS, và phiên bản tối thiểu của macOS là từ 10.9.

### Windows

Hỗ trợ Windows 7 và mới hơn, các hệ điều hành cũ hơn không được hỗ trợ (và không hoạt động).

Cả hai phiên bản `ia32`(`x86`) và `x64` (`amd64`) được hỗ trợ cho Windows. Nhưng lưu ý rằng, hiện tại, phiên bản `ARM` của Windows chưa được hỗ trợ.

### Linux

Các phiên bản `ia32` (`i686`) và `x64` (`amd64`) của Electron đã được xây dựng sẳn trên Ubuntu 12.04, phiên bản `arm` được xây dựng trên ARM v7 với hard-float ABI và NEON cho Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu phiên bản 12.04+
* Fedora 21
* Debian 8