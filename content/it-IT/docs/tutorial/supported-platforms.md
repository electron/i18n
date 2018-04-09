# Piattaforme supportate

Le seguenti piattaforme sono supportate da Electron:

### macOS

Solo i binari a 64bit sono forniti per macOS e la versione minima supportata è macOS 10.9.

### Windows

Windows 7 e superiori sono supportati, sistemi operativi più vecchi non sono supportati (e non funzioneranno).

Entrambi i binari `ia32` (`x86`) e `x64` (`amd64`) sono forniti per Windows. Nota, la versione `ARM` di Windows non è supportata per ora.

### Linux

I binari `ia32` (`i686`) e `x64` (`amd64`) di Electron sono compilati su Ubuntu 12.04, i binari `armv7l` sono compilati tramite ARM v7 con hard-float ABI e NEON per Debian Wheezy.

[Fino alla release 2.0 di Electron](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron continuerà a rilasciare i binari `armv7l` con `arm` come semplice suffisso. Entrambi i binari sono identici.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8