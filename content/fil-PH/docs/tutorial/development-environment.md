# Environment ng Developer

Ang development ng Electron ay ang Node.js development. Upang mabago ang iyong operating system sa isang environment na pwedeng gumawa ng aplikasyon na pang desktop gamit ang Electron, kinakailangan mo ng Node.js, npm, isang code editor na iyong gusto at isang malalim na kaalaman tungkol sa pagoperate ng command line client ng system.

## Pagsetup ng macOS

> Pagsuporta ng Electron sa Mac OS X 10.9 (at ang lahat ng bersyon ng macOS) at pataas. Hindi hinahayaan ng Apple na umandar ang macOS sa isang virtual machine kung hindi rin Apple ang host na kompyuter, kaya if kaylangan mo ng Mac, siguraduhing mayroon kang cloud service kung saan pwede kang mag renta ng access sa ibang Macs (tulad ng[MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

Una, i-install ang bagong bersyon ng Node.js. Nirerekomenda namin na i-install nyo alin man sa mga bagong `LTS` or `Current` na bersyon na meron. Bisitahin ang [the Node.js download page](https://nodejs.org/en/download/) at piliin ang `macOS Installer`. Habang Homebrew ay isang inaalok na opsyon, nirerekomenda namin ng wag gamitin to - maraming iba pang kagamitan na pwedeng angkop sa kung paano ang Homebrew ay makakainstall ng Node.js.

Kung na download muna, i-execute ang installer at hayaang ang installation wizard ang mag gabay hanggang matapos ang installation.

Kung natapos na ang pag install, isiguro kung gumagana na ang lahat sa inaasahan. Hanapin ang macOS `Terminal` na aplikasyon sa iyong `/Applications/Utilities` folder (o sa paghahanap gamit ang salita `Terminal` sa spotlight). Buksan ang `Terminal` o ibang command line client na iyong gusto at isiguro na ang dalawa `node` at `npm` ay pwedeng magamit:

```sh
# Ang utos na ito ay dapat maipakita sa bersyon ng Node.js
node -v

# Ang utos na ito ay dapat maipakita sa bersyon ng npm
npm -v
```

Kung ang dalawang utos ay naipakita sa bersyon bilang numero, ikaw ay handa na! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Setting up Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

Una, i-install ang bagong bersyon ng Node.js. Nirerekomenda namin na i-install nyo alin man sa mga bagong `LTS` or `Current` na bersyon na meron. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Kung na download muna, i-execute ang installer at hayaang ang installation wizard ang mag gabay hanggang matapos ang installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Kung natapos na ang pag install, isiguro kung gumagana na ang lahat sa inaasahan. Find the Windows PowerShell by simply opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# Ang utos na ito ay dapat maipakita sa bersyon ng Node.js
node -v

# Ang utos na ito ay dapat maipakita sa bersyon ng npm
npm -v
```

Kung ang dalawang utos ay naipakita sa bersyon bilang numero, ikaw ay handa na! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Setting up Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Una, i-install ang bagong bersyon ng Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# Ang utos na ito ay dapat maipakita sa bersyon ng Node.js
node -v

# Ang utos na ito ay dapat maipakita sa bersyon ng npm
npm -v
```

Kung ang dalawang utos ay naipakita sa bersyon bilang numero, ikaw ay handa na! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.