# Unterstützte Plattformen

Die folgenden Plattformen werden durch Electron unterstützt:

### macOS

Für macOS werden ausschließlich 64bit-Dateien zum Download angeboten. Sie benötigen mindestens macOS 10.9.

### Windows

Windows 7 und neuere Versionen werden unterstützt. Ältere Betriebssysteme werden nicht unterstützt (und funktionieren nicht zusammen mit Electron).

Sowohl `ia32` (`x86`) als auch `x64` (`amd64`)-Dateien werden zum Download angeboten. Die `ARM` Version von Windows wird aktuell nicht unterstützt.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 und neuer
* Fedora 21
* Debian 8