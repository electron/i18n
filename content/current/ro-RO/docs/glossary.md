# Glosar

Această pagină definește câtva din terminologia folosită în dezvoltarea Electron.

### ASAR

ASAR vine de la Atom Shell Archive Format(Format Arhivă în Coajă de Atom). O arhivă \[asar\](https://github. com/electron/asar), este defapt un format simplu de fișier `tar` care concateneaza fișierele într-un singur fișier. Electron poate citi fișierele arbitrare din acesta fără a despacheta întregul fișier.

Formatul ASAR a fost creat în principal pentru a îmbunătăți performanța pe Windows... TODO

### CRT

Biblioteca C Run-time (CRT, în engleză) este o parte a Bibliotecii Standard a C++ care încorporează Biblioteca Standard ISO C99. Bibliotecile Visual C ++ care implementează CRT acceptă dezvoltarea codului autohton, atât cod mixt nativ și gestionat, cât și cod gestionat pur pentru dezvoltare .NET.

### DMG

O imagine de disc Apple(Dmg, în engleză) este un format de ambalare folosit de macOS. Fișierele DMG sunt utilizate frecvent pentru distribuirea „instalatorilor” aplicației. [[electron-builder]](https://github.com/electron-userland/electron-builder) (https://github. com/electron-userland/electron-builder) acceptă``  `dmg` `` ca țintă de construire.

### IME

Editor metodă de intrare(Ime, în engleză). Un program care permite utilizatorilor să introducă caractere și simboluri care nu se găsesc pe tastatură. De exemplu, acest lucru permite utilizatorilor tastaturilor latine să introducă caractere chineze, japoneze, coreene și indicatoare.

### IDL

Limba descrierii interfeței. Scrie semnături de funcții și tipuri de date într-un format care poate fi folosit pentru a genera interfețe în Java, C++, JavaScript, etc.

### IPC

IPC reprezintă comunicarea interprocesuală. Electron folosește IPC pentru a trimite mesaje JSON serializate între procesele [principale](#main-process) și [redare](#renderer-process).

### libchromiumcontent

O împărtășire a bibliotecii care include [[Chromium Content module]](https://www.chromium.org/developers/content-module) și toate dependențele sale (e.g., Blink, [[V8]](#v8), etc.). De asemenea menționat ca "libcc".

- [- \[github.com/electron/libchromiumcontent\](https://github.com/electron/libchromiumcontent)](https://github.com/electron/libchromiumcontent)

### proces principal

Procesul principal, de obicei un fișier numit `` `main.js` ``, este punctul de intrare în fiecare aplicație Electron. Acesta controlează durata de viață a aplicației, de la deschis la închis. De asemenea, gestionează elemente autohtone, cum ar fi Meniul, Bara de meniu, Dock, Tava, etc. Procesul principal este responsabil pentru crearea fiecărui proces de redare din aplicație. API-ul complet al nodului este încorporat.

Fiecare fișier de proces principal al fiecărei aplicații este specificat în `proprietatea` principală din `pachete.json`. Așa `electronul .` știe ce fișier să se execute la pornire.

În Chromium, acest proces este denumit "procesul browserului". Este redenumit în Electron pentru a evita confuzia cu procesele de redare.

Vezi de asemenea: [[process]](#process),[ [renderer-process]](#renderer-process)

### MAS

Acronym pentru Apple Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

Un sistem IPC pentru comunicarea intra- sau inter-proces este important deoarece Chrome este dornic să-și poată împărți munca în procese separate sau nu, în funcție de presiunile de memorie etc.

Vezi: https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### module autohtone

Module autohtone (numite deasemenea- [[addons]](https://nodejs.org/api/addons.html) în Node.js) sunt module scrise în C sau C ++ care pot fi încărcate în Node.js sau Electron folosind funcția require () și utilizate ca și cum ar fi un modul Node.js obișnuit. Acestea sunt utilizate în principal pentru a oferi o interfață între JavaScript care rulează în bibliotecile Node.js și C / C ++.

Modulele Nod Native sunt acceptate de Electron, însă, deoarece Electron este foarte probabil să folosească o versiune V8 diferită de cea binară Node instalată în sistemul dvs., trebuie să specificați manual locația anteturilor Electron atunci când construiți module native.

Vezi:[ [Utilizând Native Node Modules]](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System este un instrument creat de un Instalator de script pentru Microsoft Windows. Este lansat sub o combinație de licențe de software gratuit și este o alternativă pe scară largă folosită pentru produse comerciale proprietare, cum ar fi InstallShield. [[electron-builder]](https://github.com/electron-userland/electron-builder) acceptă NSIS ca țintă de construire.

### OSR

OSR (Redare în afara ecranului) poate fi utilizat pentru încărcarea paginii grele în fundal şi apoi afişarea după (va fi mult mai rapid). Vă permite să redați pagina fără să o afișați pe ecran.

### proces

Un proces este o instanță a unui program de calculator care este executat. Aplicațiile Electron care utilizează procesul [[main-principal]](#main-process) și unul sau multe procese [[renderer]](#renderer-process) rulează de fapt mai multe programe simultan.

În Node.js și Electron, fiecare proces care rulează are un obiect `` `process` ``. Acest obiect este global și oferă informații despre și controlul asupra procesului curent. Ca global, acesta este întotdeauna disponibil pentru aplicații fără a utiliza require ().

Vezi: [[main process]](#main-process),[ [renderer process]](#renderer-process)

### proces de redare

Procesul de redare este o fereastră de browser în aplicație. Spre deosebire de procesul principal, pot fi mai multe dintre acestea și fiecare este rulat într-un proces separat. De asemenea, pot fi ascunse.

În browserele normale, paginile web rulează de obicei într-un mediu al cutiilor cu nisip și nu li se permite accesul la resurse native. Utilizatorii Electron au, însă, puterea de a utiliza API-urile Node.js în paginile web care permit interacțiuni cu un sistem de operare de nivel inferior.

Vezi: [[process]](#process),[ [main process]](#main-process)

### Veverița

Squirrel(Veverița) este un cadru open-source care permite aplicațiilor Electron să se actualizeze automat odată cu lansarea noilor versiuni. Vedeți API-ul [[autoUpdater]](api/auto-updater.md) pentru informații despre începerea cu Squirrel.

### userland

Acest termen provine din comunitatea Unix, unde „userland” sau „userpace” s-au referit la programe care rulează în afara nucleului sistemului de operare. Mai recent, termenul a fost popularizat în comunitatea Node și npm pentru a distinge între caracteristicile disponibile în „Node core” față de pachetele publicate în registrul npm de către comunitatea mult mai mare „user”.

La fel ca Node, Electron este concentrat pe faptul că are un set mic de API-uri care oferă toate elementele primitive necesare pentru dezvoltarea aplicațiilor multi-plataforme pentru desktop. Această filozofie de design permite Electron să rămână un instrument flexibil, fără a fi prea prescriptiv cu privire la modul în care ar trebui utilizat. Userland le permite utilizatorilor să creeze și să partajeze instrumente care oferă funcționalitate suplimentară pe partea de care este disponibil în „core”.

### V8

V8 este motorul open source Google JavaScript. Este scris în C++ și este folosit în Google Chrome. V8 poate fi administrat în mod individual sau poate fi încorporat în orice aplicație C++.

Electron construiește V8 ca parte a Chromium și apoi indică Node către acel V8 atunci când îl construiește.

Numerele versiunii V8 corespund întotdeauna cu cele de Google Chrome. Chrome 59 include V8 5.9, Chrome 58 include V8 5,8, etc.

- [- [developers.google.com/v8]](https://developers.google.com/v8)
- [- [nodejs.org/api/v8.html]](https://nodejs.org/api/v8.html)
- [- [docs/development/v8-development.md]](development/v8-development.md)

### vizionare web

Etichetele `` `webview` `` sunt utilizate pentru a încorpora conținutul „ guest-invitat”(cum ar fi paginile web externe) în aplicația Electron. Sunt similare cu `` `iframe`s ``, dar diferă prin faptul că fiecare vizionare web rulează într-un proces separat. Nu are aceleași permisiuni ca pagina web și toate interacțiunile între aplicația ta și conținutul încorporat nu se vor sincroniza. Acest lucru păstrează în siguranță aplicația ta de conținutul încorporat.
