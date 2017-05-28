# Plateformes supportées

Les plateformes suivantes sont prises en charge par Electron :

### macOS

Seul le binaire 64bits sont fournis pour macOS, et la version macOS minimale prise en charge est macOS 10.9.

### Windows

Windows 7 et versions ultérieures sont pris en charge, les systèmes d’exploitation plus anciens ne sont pas pris en charge (et ne fonctionnent pas).

Les deux binaires `ia32` (`x86`) et `x64` (`amd64`) sont fournis pour Windows. Veuillez noter que la version `ARM` de Windows n’est pas pris en charge pour l’instant.

### Linux

Les binaires préconstruits `ia32` (`i686`) et `x64` (`amd64`) d’Electron sont construits sur Ubuntu 12.04, le binaire `ARM` est construit contre ARM v7 avec hard-float ABI et NEON pour Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 et versions ultérieur
* Fedora 21
* Debian 8