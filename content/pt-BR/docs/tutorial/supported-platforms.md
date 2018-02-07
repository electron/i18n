# Plataformas Suportadas

Seguintes plataformas são suportadas pelo Electron:

### macOS

Somente binários 64bits são fornecidos para o macOS, e a versão mínima suportada do macOS é a 10.9.

### Windows

Windows 7 e versões posteriores têm suporte, sistemas operacionais mais antigos não são suportados (e não funcionam).

Tando o `ia32` (`x86`) e `x64` (`amd64`) binários são fornecidos para o Windows. Por favor note, a versão `ARM` do Windows não é suportada.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 e posterior
* Fedora 21
* Debian 8