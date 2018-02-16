# Desteklenen Platformlar

Electron tarafından desteklenen platformlar:

### macOS

MacOS için sadece 64bit ve en az macOS 10.9 sürümü desteklenmektedir.

### Windows

Windows 7 ve sonraki sürümleri desteklenir, eski işletim sistemleri desteklenmez (ve çalışmaz).

Windows için `ia32` (`x86`) ve `x64` (`amd64`) sistemi desteklenmektedir. Lütfen aklınızda bulundurun; Windows'un `ARM` versiyonu şimdilik desteklenmemektedir.

### Linux

Electron'un önceden hazırlanmış `ia32` (`i686`) ve `x64` (`amd64`) ikilileri Ubuntu 12.04 üzerine kurulmuştur, `armv7l` ikili ARM v7'e karşı hard-float ABI ve NEON Debian Wheezy için yapılmıştır.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron, basit bir `arm` sonekiyle birlikte `armv7l` ikili sürümünü de serbest bırakmaya devam edecek. Her iki ikili de özdeştir.

Önceden derlenmiş sürümün normal olarak çalışıp çalışamayacağı, derleme platformunun bağlantı kitaplığının eklenip eklenmediğine bağlıdır. Dolayısıyla yalnızca Ubuntu 12.04'ün çalışması garanti edilir ve aşağıdaki platformların Electron'un önceden derlenmiş sürümleriyle çalıştığı kanıtlanmıştır:

* Ubuntu 12.04 ve sonrası
* Fedora 21
* Debian 8