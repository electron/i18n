# Unterstützte Plattformen

Die folgenden Plattformen werden durch Electron unterstützt:

### macOS

Für macOS werden ausschließlich 64bit-Dateien zum Download angeboten. Sie benötigen mindestens macOS 10.9.

### Windows

Windows 7 und neuere Versionen werden unterstützt. Ältere Betriebssysteme werden nicht unterstützt (und funktionieren nicht zusammen mit Electron).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Please note, the `ARM` version of Windows is not supported for now.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `arm` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8