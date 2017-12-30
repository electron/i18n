# Plataformas soportadas

Las siguientes plataformas son apoyadas por Electron:

### macOS

Solo 64bits binarios son previstos para macOS, la versión mínima de macOS soportada es masOS 10.9.

### Windows

Windows 7 y posteriores son soportados, sistemas operativos más viejos no lo son (y no funcionan).

Ambos `ia32` (`x86`) y `x64` (`amd64`) binarios son previstos para Windows. Note que la versión de Windows de `ARM` no es soportada por ahora.

### Linux

El precompilado `ia32` (`i686`) y `x64` (`amd64`) binarios de Electron son construidos en Ubuntu, y el `arm` binario es construido contra ARM v7 con el hard-float ABI y NEON para Debian Wheezy.

Si el compilado binario puede correr en una distribución depende de que la distribución incluye las librerías a las que está ligada Electron en la plataforma construida, así que solo hay garantía de que Ubuntu 12.04 trabaje, pero las siguientes plataformas también están verificadas para correr el precompilado binario de Electron:

* Ubuntu 12.04 y posteriores
* Fedora 21
* Debian 8