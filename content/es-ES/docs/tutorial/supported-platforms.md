# Plataformas soportadas

Las siguientes plataformas son apoyadas por Electron:

### macOS

Solo 64bits binarios son previstos para macOS, la versión mínima de macOS soportada es masOS 10.9.

### Windows

Windows 7 y posteriores son soportados, sistemas operativos más viejos no lo son (y no funcionan).

Ambos `ia32` (`x86`) y `x64` (`amd64`) binarios son previstos para Windows. Note que la versión de Windows de `ARM` no es soportada por ahora.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Si el compilado binario puede correr en una distribución depende de que la distribución incluye las librerías a las que está ligada Electron en la plataforma construida, así que solo hay garantía de que Ubuntu 12.04 trabaje, pero las siguientes plataformas también están verificadas para correr el precompilado binario de Electron:

* Ubuntu 12.04 y posteriores
* Fedora 21
* Debian 8