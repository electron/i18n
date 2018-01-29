# Mga Suportadong Plataporma

Ang mga sumusunod na plataporma ay suportado ng Elektron:

### macOS

64bit binary lamang ang binigay para sa macOS, at ang minimum na bersyon ng macOS ay sinusuportahan ng macOS 10.9.

### Windows

Sinusuportahan ang Windows 7 at mas bago, ang mga mas lumang operating system ay hindi suportado (at hindi gumagana).

Ang parehong `ia32` (`x86`) at `x64` (`amd64`) binary ay ibinigay para sa Windows. Mangyaring tandaan, ang `ARM` at ang bersyon ng Bintana ay hindi suportado para sa ngayon.

### Linux

Ang prebuilt `ia32` (`i686`) at `x64` (`amd64`) binary ng Elektron ay binuo sa Ubuntu 12.04, ang `braso` binuo ang binary laban sa ARM v7 na may hard-float ABI at NEON para sa Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8