# Environment ng Developer

Ang development ng Electron ay ang Node.js development. Upang mabago ang iyong operating system sa isang environment na pwedeng gumawa ng aplikasyon na pang desktop gamit ang Electron, kinakailangan mo ng Node.js, npm, isang code editor na iyong gusto at isang malalim na kaalaman tungkol sa pagoperate ng command line client ng system.

## Setting ng macOS

> Pagsuporta ng Electron sa Mac OS X 10.9 (at ang lahat ng bersyon ng macOS) at pataas. Hindi hinahayaan ng Apple na umandar ang macOS sa isang virtual machine kung hindi rin Apple ang host na kompyuter, kaya if kaylangan mo ng Mac, siguraduhing mayroon kang cloud service kung saan pwede kang mag renta ng access sa ibang Macs (tulad ng[MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

Una, i-install ang bagong bersyon ng Node.js. Nirerekomenda namin na i-install nyo alin man sa mga bagong `LTS` or `Current` na bersyon na meron. Bisitahin ang [the Node.js download page](https://nodejs.org/en/download/) at piliin ang `macOS Installer`. Habang Homebrew ay isang inaalok na opsyon, nirerekomenda namin ng wag gamitin to - maraming iba pang kagamitan na pwedeng angkop sa kung paano ang Homebrew ay makakainstall ng Node.js.

Kung na download muna, i-execute ang installer at hayaang ang installation wizard ang mag gabay hanggang matapos ang installation.

Kung natapos na ang pag install, isiguro kung gumagana na ang lahat sa inaasahan. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Buksan ang `Terminal` o ibang command line client na iyong gusto at isiguro na ang dalawa `node` at `npm` ay pwedeng magamit:

```sh
# Ang utos na ito ay dapat maipakita sa bersyon ng Node.js
node -v

# Ang utos na ito ay dapat maipakita sa bersyon ng npm
npm -v
```

Kung ang dalawang utos ay naipakita sa bersyon bilang numero, ikaw ay handa na! Sa hindi kapa magsimula, kung gusto mong mag install ng isang [code editor](#a-good-editor) na angkop para sa javaScript development.

## Setting ng Windows

> Sinusuporta ng Electron ang Windows 7 ang mga bagong bersyon nito -layunin nitong i develop ang mga aplikasyon ng Electron sa mga bagong bersion ng Windows na hindi gumagana. Ang Microsoft ay nagbibigay ng libreng [virtual machine images sa Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) para sa mga developers.

Una, i-install ang bagong bersyon ng Node.js. Nirerekomenda namin na i-install nyo alin man sa mga bagong `LTS` or `Current` na bersyon na meron. Bisitahin ang [the Node.js download page](https://nodejs.org/en/download/) at piliin ang `Windows Installer`. Kung na download muna, i-execute ang installer at hayaang ang installation wizard ang mag gabay hanggang matapos ang installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Kung natapos na ang pag install, isiguro kung gumagana na ang lahat sa inaasahan. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Buksan sa itaas `PowerShell` o ibang command line client na iyong gusto at siguraduhin na ang dalawang `node` at `npm` ay pwedeng magamit:

```powershell
# Ang utos na ito ay dapat maipakita sa bersyon ng Node.js
node -v

# Ang utos na ito ay dapat maipakita sa bersyon ng npm
npm -v
```

Kung ang dalawang utos ay naipakita sa bersyon bilang numero, ikaw ay handa na! Sa hindi kapa magsimula, kung gusto mong mag install ng isang [code editor](#a-good-editor) na angkop para sa javaScript development.

## Setting ng Linux

> Sa madaling salita, ang Electron ay sumosuporta sa Ubuntu 12.04, Fedora 21, Debian 8 at ang mga bago pa.

Una, i-install ang bagong bersyon ng Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# Ang utos na ito ay dapat maipakita sa bersyon ng Node.js
node -v

# Ang utos na ito ay dapat maipakita sa bersyon ng npm
npm -v
```

Kung ang dalawang utos ay naipakita sa bersyon bilang numero, ikaw ay handa na! Sa hindi kapa magsimula, kung gusto mong mag install ng isang [code editor](#a-good-editor) na angkop para sa javaScript development.

## Isang magaling na editor

Sinasuggest namin na dalawang libre na popular na editor na builtin sa Electron: GitHub's [Atom](https://atom.io/) at Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Ang dalawang ito ay magaling sa Javascript support.

Kung ikaw ay isa samga nagdevelop na mayroong malakas na kaalaman sa pagpili, alamin na virtually ang lahat ng mga code editors at mga IDEs sa mga araw na ito ay sumusuporta sa JavaScript.