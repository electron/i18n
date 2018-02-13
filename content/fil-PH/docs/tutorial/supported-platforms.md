# Mga suportadong plataporma

Ang mga sumusunod na plataporma ay suportado ng Elektron:

### macOS

64bit binary lamang ang binigay para sa macOS, at ang minimum na bersyon ng macOS ay sinusuportahan ng macOS 10.9.

### Windows

Sinusuportahan ang Windows 7 at mas bago, ang mga mas lumang operating system ay hindi suportado (at hindi gumagana).

Ang parehong `ia32` (`x86`) at `x64` (`amd64`) binary ay ibinigay para sa Windows. Mangyaring tandaan, ang `ARM` at ang bersyon ng Bintana ay hindi suportado para sa ngayon.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Kung ang prebuilt binary ay maaaring tumakbo sa isang pamamahagi ito ay depende sa kung ang pamamahagi ay kasama ang mga aklatan na naka-link sa Elektron at sa gusali ng plataporma, kaya tanging ang Ubuntu 12.04 ang garantisadong gumagana, ngunit ang mga sumusunod na mga plataporma ay napatunayan na upang patakbuhin ang prebuilt binary ng Elektron:

* Ubuntu 12.04 at mamaya
* Fedora 21
* Debian 8