# Sunucu ortamı

Electron geliştirmesi esasen Node.js geliştirmesidir. İşletim sisteminizi, Electron ile masaüstü uygulamaları inşa etme yetenekli bir ortama çevirmek için, sadece Nodejs, npm, bir kod düzenleme tercihinize ve basit bir işletim sisteminizin komut satırı istemci bilgisine ihtiyacınız olacak.

## MacOS İçin Kurulum

> Electron, macOS 10.10 (Yosemite) ve üstünü destekler. Apple, ev sahibi bilgisayar bir Apple bilgisayarı değilse sanal makinelerde macOS çalıştırılmasına izin vermez, bu yüzden bir Mac ihtiyacınız olursa, Macs ([MacInCloud](https://www.macincloud.com/) veya [xcloud](https://xcloud.me) gibi) Mac'lere erişimi kiralayan bir bulut hizmeti kullanmayı düşünün.

İlk olarak, Node.js'in son sürümünü yükleyin. `LTS` veya `Mevcut` sürümünü indirmenizi tavsiye ederiz. [Node.js indirme sayfas](https://nodejs.org/en/download/)ını ziyaret edin ve `macOS kurucusu`nu seçin. Homebrew sunulan bir seçenek olsa da, reddetmenizi öneririz - çoğu araç Homebrew'in Node.js'i yükleme biçimiyle uyumsuzluk gösterecektir.

İndirildiğinde, kurucuyu çalıştırın ve kurulum sihirbazının kurulum boyunca size rehberlik etmesine izin verin.

Yüklenince, her şeyin beklendiği gibi çalıştığını onaylayın. `/Applications/Utilities` dizininizdeki (veya Spotlight'da `Terminal` sözcüğünü aratarak) macOs `Terminal` uygulamasını bulun. `Terminal`'i veya diğer bir komut satırı istemci tercihinizi açın ve `node` ve `npm`'nin kullanılabilir olup olmadığını kontrol edin:

```sh
#Bu komut Node.js sürümünü yazdırır 
node -v
#Bu komut npm sürümünü yazdırır 
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Linux İçin Kurulum

> Electron Wndows 7 ve sonraki sürümlerini destekler - Windows'un önceki sürümlerinde Electron uygulaması geliştirmeyi denemek işe yaramayacaktır. Microsoft geliştiriciler için [Windows 10'lu sanal makine örnekleri](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) sağlar.

İlk olarak, Node.js'in son sürümünü yükleyin. `LTS` veya `Mevcut` sürümünü indirmenizi tavsiye ederiz. [Node.js indirme sayfasını](https://nodejs.org/en/download/) ziyaret edin ve `Windows Installers`'ı seçin. İndirildiğinde, kurucuyu çalıştırın ve kurulum sihirbazının kurulum boyunca size rehberlik etmesine izin verin.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Yüklenince, her şeyin beklendiği gibi çalıştığını onaylayın. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
#Bu komut Node.js versiyonunu yazdırır  
node -v
#Bu komut npm versiyonunu yazdırır 
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Linux İçin Kurulum

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

İlk olarak, Node.js'in son sürümünü yükleyin. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
#Bu komut Node.js sürümünü yazdırır 
node -v
#Bu komut npm sürümünü yazdırır 
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## İyi Bir Düzenleyici

Electron'da yerleşik iki ücretsiz popüler editör önerebiliriz: [GitHub'S Atom](https://atom.io/) ve Microsoft'un [Visual Studio Code](https://code.visualstudio.com/). Her ikisi de mükemmel JavaScript desteğine sahiptir.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.
