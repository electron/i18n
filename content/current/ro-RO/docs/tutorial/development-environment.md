# Mediu pentru dezvoltatori

Dezvoltarea Electron este în esență dezvoltarea Node.js. Pentru a transforma sistemul de operare într-un mediu capabil să construiască aplicații desktop cu Electron, vei avea nevoie doar de Node. s, npm, un editor de cod ales de tine și un înțelegere rudimentară a clientului de comandă al sistemului tău de operare.

## Configurarea macOS

> Electron suportă MacOS 10.10 (Yosemite) și mai nou. Apple nu permite rularea macOS în mașini virtuale, cu excepția cazului în care calculatorul gazdă este deja un calculator Apple, așa că dacă te simți nevoiașă de un Mac, Luaţi în considerare folosind un serviciu de cloud care închiriază accesul la Macs (cum ar fi [MacInCloud](https://www.macincloud.com/) sau [xcloud](https://xcloud.me)).

Mai întâi, instalați o versiune recentă a Node.js. Vă recomandăm să instalați fie ultima `LTS` sau `Versiunea curentă` este disponibilă. Vizitați [pagina de descărcare Node.js](https://nodejs.org/en/download/) și selectați `macOS Installer`. În timp ce Homebrew este o opţiune oferită, dar vă recomandăm împotriva sa - multe unelte vor fi incompatibile cu modul în care Homebrew instalează Node.js.

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



> Electron suportă Windows 7 și versiunile ulterioare – încercarea de a dezvolta aplicații Electron pe versiunile anterioare ale Windows nu va funcționa. Microsoft oferă gratuit [imagini virtuale cu Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) pentru dezvoltatori.

Mai întâi, instalați o versiune recentă a Node.js. Vă recomandăm să instalați fie ultima `LTS` sau `Versiunea curentă` este disponibilă. Vizitaţi [pagina de descărcare Node.js](https://nodejs.org/en/download/) şi selectaţi `Windows Installer`. Odată descărcat, executați instalatorul și lăsați ghidul de instalare prin instalare.

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

Mai întâi, instalați o versiune recentă a Node.js. În funcție de distribuția Linux, pașii de instalare pot diferi. Presupunând că în mod normal instalați software folosind un manager de pachete ca `apt` sau `pacman`, folosește Nodul oficial [. s Ghid pentru a instala pe Linux](https://nodejs.org/en/download/package-manager/).

Acum rulezi Linux, așa că este posibil să știi deja cum să operezi o linie de comandă client. Deschideți clientul dvs. preferat și confirmați că atât `nodul` cât și `npm` sunt disponibile la nivel global:



```sh
# Această comandă ar trebui să afișeze versiunea Node.js
node -v

# Această comandă ar trebui să afișeze versiunea npm
npm -v
```


Dacă ambele comenzi tipărite un număr de versiune, toate sunt setate! Înainte de a începe , poate doriţi să instalaţi un editor de cod</a> potrivit pentru dezvoltarea JavaScript.</p> 



## Un editor bun

Am putea sugera două editoare populare gratuite construite în Electron: GitHub's [Atom](https://atom.io/) și [Visual Studio Code](https://code.visualstudio.com/). Ambele au suport JavaScript excelent.

Dacă sunteţi unul dintre numeroşii dezvoltatori cu o preferinţă puternică, ştiţi că practic toţi editorii de cod şi IDE-urile din prezent suportă JavaScript.
