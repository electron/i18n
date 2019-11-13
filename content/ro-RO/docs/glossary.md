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

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process-proces

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.