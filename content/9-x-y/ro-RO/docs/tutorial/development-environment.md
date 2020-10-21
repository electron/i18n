# Mediu pentru dezvoltatori

Dezvoltarea Electron este în esență dezvoltarea Node.js. Pentru a transforma sistemul de operare într-un mediu capabil să construiască aplicații desktop cu Electron, vei avea nevoie doar de Node. s, npm, un editor de cod ales de tine și un înțelegere rudimentară a clientului de comandă al sistemului tău de operare.

## Configurarea macOS

> Electron suportă MacOS 10.10 (Yosemite) și mai nou. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud][macincloud] or [xcloud](https://xcloud.me)).

Mai întâi, instalați o versiune recentă a Node.js. Vă recomandăm să instalați fie ultima `LTS` sau `Versiunea curentă` este disponibilă. Visit [the Node.js download page][node-download] and select the `macOS Installer`. În timp ce Homebrew este o opţiune oferită, dar vă recomandăm împotriva sa - multe unelte vor fi incompatibile cu modul în care Homebrew instalează Node.js.

Odată descărcat, executați instalatorul și lăsați ghidul de instalare prin instalare.

Odată instalat, confirmă că totul funcționează conform așteptărilor. Găsiți aplicația macOS `Terminal` în dosarul `/Aplicații/Utilități` (sau prin căutarea cuvântului `Terminal` în Spotlight). Deschideți `Terminal` sau un alt client de linie de comandă ales de dvs. și confirmați că ambele `node` și `npm` sunt disponibile:

```sh
# Această comandă ar trebui să afișeze versiunea Node.js
node -v

# Această comandă ar trebui să afișeze versiunea npm
npm -v
```

Dacă ambele comenzi tipărite un număr de versiune, toate sunt setate! Înainte de a începe , poate doriţi să instalaţi un editor de cod</a>

potrivit pentru dezvoltarea JavaScript.</p> 



## Configurarea Windows



> Electron suportă Windows 7 și versiunile ulterioare – încercarea de a dezvolta aplicații Electron pe versiunile anterioare ale Windows nu va funcționa. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

Mai întâi, instalați o versiune recentă a Node.js. Vă recomandăm să instalați fie ultima `LTS` sau `Versiunea curentă` este disponibilă. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Odată descărcat, executați instalatorul și lăsați ghidul de instalare prin instalare.

Pe ecran care vă permite să configuraţi instalarea, asiguraţi-vă că selectaţi modulul `. s runtime`, `npm package manager`și `Adaugă la PATH` .

Odată instalat, confirmă că totul funcționează conform așteptărilor. Găsește Windows PowerShell deschizând Meniul Start și tastând `PowerShell`. Deschideți până `PowerShell` sau un alt client de linie de comandă ales de dvs. și confirmați că ambele `node` și `npm` sunt disponibile:



```powershell
# Această comandă ar trebui să afișeze versiunea Node.js
node -v

# Această comandă ar trebui să afișeze versiunea npm
npm -v
```


Dacă ambele comenzi tipărite un număr de versiune, toate sunt setate! Înainte de a începe , poate doriţi să instalaţi un editor de cod</a> potrivit pentru dezvoltarea JavaScript.</p> 



## Configurarea Linux



> În general, Electron suportă Ubuntu 12.04, Fedora 21, Debian 8 și mai târziu.

Mai întâi, instalați o versiune recentă a Node.js. În funcție de distribuția Linux, pașii de instalare pot diferi. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

Acum rulezi Linux, așa că este posibil să știi deja cum să operezi o linie de comandă client. Deschideți clientul dvs. preferat și confirmați că atât `nodul` cât și `npm` sunt disponibile la nivel global:



```sh
# Această comandă ar trebui să afișeze versiunea Node.js
node -v

# Această comandă ar trebui să afișeze versiunea npm
npm -v
```


Dacă ambele comenzi tipărite un număr de versiune, toate sunt setate! Înainte de a începe , poate doriţi să instalaţi un editor de cod</a> potrivit pentru dezvoltarea JavaScript.</p> 



## Un editor bun

We might suggest two free popular editors built in Electron: GitHub's [Atom][atom] and Microsoft's [Visual Studio Code][code]. Ambele au suport JavaScript excelent.

Dacă sunteţi unul dintre numeroşii dezvoltatori cu o preferinţă puternică, ştiţi că practic toţi editorii de cod şi IDE-urile din prezent suportă JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
