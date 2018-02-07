# 支持平台

目前 Electron 支持以下平台：

### macOS

对于 macOS 仅提供64位版本，并且只支持 macOS 10.9 或更高版本。

### Windows

仅支持 Windows 7 或更高版本, 旧版操作系统已不再支持(并且无法运行).

对于 Windows 提供 `ia32` (`x86`) 和 `amd64` (`x64`) 版本。需要注意的是 `ARM` 版本的 Windows 目前尚不支持。

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 或更高版本
* Fedora 21
* Debian 8