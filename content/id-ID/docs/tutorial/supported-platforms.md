# Platform yang Didukung

Platform berikut didukung oleh Electron :

### macOS

Hanya binari 64bit yang disediakan untuk macOS , dan versi maco minimum yang didukung adalah macos 10.9.

### Windows

Windows 7 dan yang lebih baru didukung, sistem operasi yang lama tidak didukung (dan tidak berfungsi).

Kedua ` ia32 </ 0> ( <code> x86 </ 0> ) dan <code> x64 </ 0> ( <code> amd64 </ 0> ) binari yang disediakan untuk Windows . Harap dicatat, versi Windows <code> ARM </ 0> tidak didukung untuk saat ini.</p>

<h3>Linux</h3>

<p>The prebuilt <code>ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 dan yang lebih baru
* Fedora 21
* Debian 8