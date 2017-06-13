# Plataformas soportadas

Siguientes plataformas son compatibles con electrones:

### MacOS

Binarios de 64 bits sólo para macOS, y la versión de macOS mínimo soportada macOS 10.9.

### Windows

Windows 7 y versiones posteriores son compatibles, no se admiten sistemas operativos anteriores (y funcionan).

Ambos `ia32` (`x86`) y `x64` (`amd64`) binarios se proporcionan para Windows. Tenga en cuenta que la versión `ARM` de Windows no es compatible por ahora.

### Linux

`ia32` precompilados (`i686`) y `x64` (`amd64`) binarios de electrón se basan en Ubuntu 12.04, el `arm` binario se construye contra ARM v7 con ABI y neón duro flotador para Debian Wheezy.

Si puede ejecutar el binario precompilado en una distribución depende de si la distribución incluye las librerías que electrón es en la plataforma de la construcción, tan sólo Ubuntu 12.04 es garantizado al trabajo, pero las plataformas siguientes también son verificados para poder ejecutar los binarios pre-compilados de electrón:

* Ubuntu 12.04 y posteriormente
* Fedora 21
* 8 Debian