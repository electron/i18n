# Desteklenen Platformlar

Electron tarafından desteklenen platformlar:

### macOS

MacOS için sadece 64bit ve en az macOS 10.9 sürümü desteklenmektedir.

### Windows

Windows 7 ve sonraki sürümleri desteklenir, eski işletim sistemleri desteklenmez (ve çalışmaz).

Windows için `ia32` (`x86`) ve `x64` (`amd64`) sistemi desteklenmektedir. Lütfen aklınızda bulundurun; Windows'un `ARM` versiyonu şimdilik desteklenmemektedir.

### Linux

Önceden kurulmuş `ia32` (`i686`) ve`x64` (`amd64`) Electron dilleri; Ubuntu 12.04, `arm` dili ARM v7 ile hard-float ABI ve Neon, Debian Wheezy için yapılmıştır.

Önceden derlenmiş sürümün normal olarak çalışıp çalışamayacağı, derleme platformunun bağlantı kitaplığının eklenip eklenmediğine bağlıdır. Dolayısıyla yalnızca Ubuntu 12.04'ün çalışması garanti edilir ve aşağıdaki platformların Electron'un önceden derlenmiş sürümleriyle çalıştığı kanıtlanmıştır:

* Ubuntu 12.04 ve sonrası
* Fedora 21
* Debian 8