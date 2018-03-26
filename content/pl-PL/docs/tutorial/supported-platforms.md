# Wspierane Platformy

Następujące platformy są obsługiwane przez Electron:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.9.

### Windows

Windows 7 i nowsze są obsługiwane, starsze systemy operacyjne nie są obsługiwane (i nie działają).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Please note, the `ARM` version of Windows is not supported for now.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Aż do wydania Electrona 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets) Electron będzie również kontynuował wydanie pliku binarnego dla `armv7l` z przyrostek `arm`. Obywa pliki binarne są identyczne.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 i nowsze
* Fedora 21
* Debian 8