# Glosar

Această pagină definește câtva din terminologia folosită în dezvoltarea Electron.

### ASAR

ASAR vine de la Atom Shell Archive Format(Format Arhivă în Coajă de Atom). O arhivă \[asar\](https://github. com/electron/asar), este defapt un format simplu de fișier `tar` care concateneaza fișierele într-un singur fișier. Electron poate citi fișierele arbitrare din acesta fără a despacheta întregul fișier.

Formatul ASAR a fost creat în principiu pentru a îmbunătăți performanțele în Windows... TODO

### CRT

Biblioteca C Run-time (CRT, în engleză) este o parte a Bibliotecii Standard a C++ care încorporează Biblioteca Standard ISO C99. Bibliotecile Visual C ++ care implementează CRT acceptă dezvoltarea codului autohton, atât cod mixt nativ și gestionat, cât și cod gestionat pur pentru dezvoltare .NET.

### DMG

O imagine de disc Apple(Dmg, în engleză) este un format de ambalare folosit de macOS. Fișierele DMG sunt utilizate frecvent pentru distribuirea „instalatorilor” aplicației. [[electron-builder]](https://github.com/electron-userland/electron-builder) (https://github. com/electron-userland/electron-builder) acceptă``  `dmg` `` ca țintă de construire.

### IME

Editor metodă de intrare(Ime, în engleză). Un program care permite utilizatorilor să introducă caractere și simboluri care nu se găsesc pe tastatură. De exemplu, acest lucru permite utilizatorilor tastaturilor latine să introducă caractere chineze, japoneze, coreene și indicatoare.

### IDL

Limbajul descrierii interfeței(Idl, în engleză). Scrie semnături funcționale și tipuri de date într-un format care poate fi utilizat pentru a genera interfețe în Java, C ++, JavaScript etc.

### IPC

IPC reprezintă o Comunicare inter-proces. Electron utilizează IPC pentru a trimite mesaje JSON serializate între procesele[ [main-principal] ](#main-process) și [[renderer]](#renderer-process).

### libchromiumcontent

O împărtășire a bibliotecii care include [[Chromium Content module]](https://www.chromium.org/developers/content-module) și toate dependențele sale (e.g., Blink, [[V8]](#v8), etc.). De asemenea menționat ca "libcc".

- [- \[github.com/electron/libchromiumcontent\](https://github.com/electron/libchromiumcontent)](https://github.com/electron/libchromiumcontent)

### proces principal

Procesul principal, de obicei un fișier numit `` `main.js` ``, este punctul de intrare în fiecare aplicație Electron. Acesta controlează durata de viață a aplicației, de la deschis la închis. De asemenea, gestionează elemente autohtone, cum ar fi Meniul, Bara de meniu, Dock, Tava, etc. Procesul principal este responsabil pentru crearea fiecărui proces de redare din aplicație. API-ul complet al nodului este încorporat.

Fișierul principal de proces al fiecărei aplicații este specificat în proprietatea `` `main-principal` `` din `` `pachet-package.json` ``. Acesta este modul în care `` `electron` `` știe ce fișier trebuie executat la pornire.

În Chromium, acest proces este denumit `browser-process-proces browser`. Este redenumit în Electron pentru a evita confuziile cu procesele de randare.

Vezi de asemenea: [[process]](#process),[ [renderer-process]](#renderer-process)

### MAS

Acronim pentru Apple App Store Mac. Pentru detalii despre trimiterea aplicației la MAS, consultați [[Mac App Store Submission Guide-Ghidul de trimitere a App App pentru Mac]](tutorial/mac-app-store-submission-guide.md).

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

OSR (interpretare în afara ecranului) poate fi utilizat pentru încărcarea paginii grele în fundal și apoi afișarea ei după (va fi mult mai rapid). Permite să redați pagina fără a o afișa pe ecran.

### proces

Un proces este o instanță a unui program de calculator care este executat. Aplicațiile Electron care utilizează procesul [[main-principal]](#main-process) și unul sau multe procese [[renderer]](#renderer-process) rulează de fapt mai multe programe simultan.

În Node.js și Electron, fiecare proces care rulează are un obiect `` `process` ``. Acest obiect este global și oferă informații despre și controlul asupra procesului curent. Ca global, acesta este întotdeauna disponibil pentru aplicații fără a utiliza require ().

Vezi: [[main process]](#main-process),[ [renderer process]](#renderer-process)

### proces de redare

Procesul de redare este o fereastră de browser din aplicația dvs. Spre deosebire de procesul principal, pot exista mai multe dintre acestea și fiecare este rulat într-un proces separat. Ele pot fi, de asemenea, ascunse.

În browserele normale, paginile web rulează de obicei într-un mediu al cutiilor cu nisip și nu li se permite accesul la resurse native. Utilizatorii Electron au, însă, puterea de a utiliza API-urile Node.js în paginile web care permit interacțiuni cu un sistem de operare de nivel inferior.

Vezi: [[process]](#process),[ [main process]](#main-process)

### Veverița

Squirrel(Veverița) este un cadru open-source care permite aplicațiilor Electron să se actualizeze automat odată cu lansarea noilor versiuni. Vedeți API-ul [[autoUpdater]](api/auto-updater.md) pentru informații despre începerea cu Squirrel.

### userland

Acest termen provine din comunitatea Unix, unde „userland” sau „userpace” s-au referit la programe care rulează în afara nucleului sistemului de operare. Mai recent, termenul a fost popularizat în comunitatea Node și npm pentru a distinge între caracteristicile disponibile în „Node core” față de pachetele publicate în registrul npm de către comunitatea mult mai mare „user”.

La fel ca Node, Electron este concentrat pe faptul că are un set mic de API-uri care oferă toate elementele primitive necesare pentru dezvoltarea aplicațiilor multi-plataforme pentru desktop. Această filozofie de design permite Electron să rămână un instrument flexibil, fără a fi prea prescriptiv cu privire la modul în care ar trebui utilizat. Userland le permite utilizatorilor să creeze și să partajeze instrumente care oferă funcționalitate suplimentară pe partea de care este disponibil în „core”.

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.