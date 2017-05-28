# Plateformes supportées

Les plateformes suivantes sont prises en charge par Electron :

### macOS

Seul le binaire 64bits sont fournis pour macOS, et la version macOS minimale prise en charge est macOS 10.9.

### Windows

Windows 7 et versions ultérieures sont pris en charge, les systèmes d’exploitation plus anciens ne sont pas pris en charge (et ne fonctionnent pas).

Les deux binaires `ia32` (`x86`) et `x64` (`amd64`) sont fournis pour Windows. Veuillez noter que la version `ARM` de Windows n’est pas pris en charge pour l’instant.

### Linux

Les binaires pré-compilés `ia32` (`i686`) et `x64` (`amd64`) d’Electron sont compilés sur Ubuntu 12.04, le binaire `ARM` est compilé sur ARM v7 avec hard-float ABI et NEON pour Debian Wheezy.

Le fait qu'un binaire pré-compilé peut ou non s'exécuter sur une distribution dépend si la distribution inclut ou non les librairies qu'Electron utilise pour compiler l'application. Du coup, seulement Ubuntu 12.04 est garanti de fonctionner, ainsi que les distributions suivantes pour faire fonctionner les binaires pré-compilés d'Electron :

* Ubuntu 12.04 et versions ultérieur
* Fedora 21
* Debian 8