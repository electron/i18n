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

Apakah biner prebuilt dapat berjalan pada distribusi bergantung pada apakah distribusi mencakup perpustakaan yang terhubung dengan Elektron pada platform bangunan, jadi hanya Ubuntu 12.04 yang dijamin berhasil, namun mengikuti platform juga diverifikasi untuk dapat menjalankan binari prebuilt dari Elektron :

* Ubuntu 12.04 dan yang lebih baru
* Fedora 21
* Debian 8