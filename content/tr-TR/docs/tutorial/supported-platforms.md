# Desteklenen Platformlar

Electron tarafından desteklenen platformlar:

### macOS

MacOS için sadece 64bit ve en az macOS 10.9 sürümü desteklenmektedir.

### Windows

Windows 7 ve sonraki sürümleri desteklenir, eski işletim sistemleri desteklenmez (ve çalışmaz).

Windows için `ia32` (`x86`) ve `x64` (`amd64`) sistemi desteklenmektedir. Lütfen aklınızda bulundurun; Windows'un `ARM` versiyonu şimdilik desteklenmemektedir.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `arm` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

Önceden derlenmiş sürümün normal olarak çalışıp çalışamayacağı, derleme platformunun bağlantı kitaplığının eklenip eklenmediğine bağlıdır. Dolayısıyla yalnızca Ubuntu 12.04'ün çalışması garanti edilir ve aşağıdaki platformların Electron'un önceden derlenmiş sürümleriyle çalıştığı kanıtlanmıştır:

* Ubuntu 12.04 ve sonrası
* Fedora 21
* Debian 8