# Nền tảng hỗ trợ

Các nền tảng được hỗ trợ bởi Electron:

### macOS

Chỉ có duy nhất phiên bản 64bit được hỗ trợ cho macOS, và phiên bản tối thiểu của macOS là từ 10.9.

### Windows

Hỗ trợ Windows 7 và mới hơn, các hệ điều hành cũ hơn không được hỗ trợ (và không hoạt động).

Cả hai phiên bản `ia32`(`x86`) và `x64` (`amd64`) được hỗ trợ cho Windows. Nhưng lưu ý rằng, hiện tại, phiên bản `ARM` của Windows chưa được hỗ trợ.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu phiên bản 12.04+
* Fedora 21
* Debian 8