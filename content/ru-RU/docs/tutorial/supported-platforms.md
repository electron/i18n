# Поддерживаемые платформы

Следующие платформы поддерживаются Electron:

### macOS

Только 64-разрядные двоичные файлы предоставляются для macOS, и минимальный macOS версии поддерживается macOS 10.9. Для MacOS предусмотрены только 64-битные двоичные файлы, а минимальная поддерживаемая версия macOS - 10.9.

### Windows

Поддерживаются Windows 7 и более поздние версии, более старые операционные системы не поддерживаются (и не работают).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Please note, the `ARM` version of Windows is not supported for now.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 и позднее
* Fedora 21
* Debian 8