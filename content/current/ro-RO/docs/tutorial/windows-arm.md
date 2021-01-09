# Windows 10 pe Arme

Dacă aplicația ta rulează cu Electron 6.0.8 sau mai târziu, o poți construi acum pentru Windows 10 pe Arm. Acest lucru îmbunătățește considerabil performanța, dar necesită recompilarea oricăror module native folosite în aplicația dvs. De asemenea, ar putea avea nevoie de mici reparații pentru construcția ta și scripturile de ambalare.

## Rularea unei aplicații de bază

Dacă aplicația ta nu folosește niciun modul nativ, atunci este foarte ușor să creezi o versiune Arm a aplicației tale.

1. Asigurați-vă că directorul `node_module` al aplicației dvs. este gol.
2. Folosind _Prompt de comandă_, execută `setează npm_config_arch=arm64` înainte de a rula `npm install`/`yarn install` ca de obicei.
3. [Dacă aveți Electron instalat ca o dependență de dezvoltare](quick-start.md#prerequisites), npm va descărca și dezpacheta versiunea arm64. Poți apoi să ambalezi și să distribui aplicația ca de obicei.

## Consideraţii generale

### Cod specific arhitecturii

Multe coduri specifice ferestrei conțin dacă... altă logică care selectează între arhitecturile x64 sau x86.

```js
if (process.arch === 'x64') {
  // Do 64-bit...
} altceva {
  // Fă lucru de 32 biți...
}
```

Daca doriti sa tintiti arm64, logica de genul acesta va selecta arhitectura gresita, așa verificați cu atenție aplicația și construiți scripturi pentru astfel de condiții. În scripturi personalizate pentru construcții și ambalaje, ar trebui să verifici întotdeauna valoarea arch-ului `npm_config_` în mediu, în loc să se bazeze pe arcul actual al procesului.

### Module native

Dacă utilizați module native, trebuie să vă asigurați că acestea se compilează împotriva v142 al compilatorului MSVC (furnizat în studiul vizual 2017). De asemenea, trebuie să verificați dacă orice versiune pre-construită `.dll` sau `. ib` fişiere furnizate sau citate de modulul nativ sunt disponibile pentru Windows pe Arm.

### Testarea aplicației tale

Pentru a testa aplicația, folosiți Windows pe un dispozitiv Arm care rulează Windows 10 (versiunea 1903 sau mai târziu). Asigurați-vă că copiați aplicația pe dispozitivul țintă - sandbox-ul Chromium nu va funcționa corect la încărcarea activelor aplicației dintr-o locație a rețelei.

## Cerințe privind dezvoltarea

### Node.js/gyp

[Se recomandă Node.js v12.9.0 sau mai târziu.](https://nodejs.org/en/) Dacă actualizarea la o nouă versiune de nod nu este de dorit, poți [actualiza npm copia node-gyp manual](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) la versiunea 5. .2 sau mai târziu, care conține modificările necesare pentru a compila module native pentru Arm.

### Studio vizual 2017

Studioul vizual 2017 (orice ediție) este necesar pentru compilarea modulelor native. Poți descărca Visual Studio Community 2017 prin intermediul Microsoft [Programul Visual Studio Dev Essentials](https://visualstudio.microsoft.com/dev-essentials/). După instalare, puteți adăuga componentele specifice Arm-ului, executând următoarele de la un _Prompt de Comandă_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

#### Crearea unei comenzi de compilare încrucișată

Setarea `npm_config_arch=arm64` în mediu creează brațul corect 64 `. bj` fișiere, dar versiunea standard _pentru comanda dezvoltatorului pentru VS 2017_ va utiliza linkerul x64. Pentru a remedia acest lucru:

1. Duplică comanda rapidă _x64_x86 Cross Tools Command Prompt pentru VS 2017_ (de ex. localizându-l în meniul de pornire, apăsând pe _Deschide Locația Fișierelor_, copiind și lipind-o undeva convenabil.
2. Faceți clic dreapta pe noua scurtătură și alegeți _Proprietăți_.
3. Schimbă câmpul _Ținte_ pentru a citi `vcvarsamd64_arm64.bat` la sfârșit în loc de `vcvarsamd64_x86.bat`.

Dacă ați reușit cu succes, solicitarea comenzii ar trebui să afișeze ceva similar cu acesta la pornire:

```bat
**************************************************************************
** Comanda Dezvoltatorului Studio 2017 Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**************************************************************************************************
[vcvarsall.bat] Mediu inițiat pentru: 'x64_arm64'
```

Dacă doriți să vă dezvoltați aplicația direct pe un dispozitiv Arm, înlocuiți `vcvarsx86_arm64. la` în _Ținta_ astfel încât compilarea încrucișată să se întâmple cu emulația x86 a dispozitivului.

### Conectare împotriva `node.lib` corect

În mod implicit, `node-gyp` dezpachetează antetele nodului Electron și descarcă versiunile x86 și x64 ale `nodului. ib` în `%APPDATA%\. \Local\node-gyp\Cache`, dar nu descarca versiunea arm64 ([este in dezvoltare](https://github.com/nodejs/node-gyp/pull/1875). Pentru a remedia acest lucru:

1. Descarcă arm64 `node.lib` de la https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Mută-l în `%APPDATA%\..\Local\node-gyp\6.0.0.9\arm64\node.lib`

Substituie `6.0.9` pentru versiunea pe care o folosești.

## Colectare module native

După completarea celor de mai sus, deschideți fereastra de comenzi de compilare încrucișată și executați `setați npm_config_arch=arm64`. Apoi folosește `npm install` pentru a construi proiectul tău ca de obicei. La fel ca în cazul compilării modulelor x86, poate fi necesar să eliminați `node_module` pentru a forța recompilarea modulelor native dacă acestea au fost compilate anterior pentru o altă arhitectură.

## Depanare module native

Modulele native de depanare pot fi realizate cu Visual Studio 2017 (rulând pe calculatorul de dezvoltare) și cu [Depanare Vizuală de Telecomanda Studio](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) rulând pe dispozitivul țintă. Pentru a depana:

1. Lansează aplicația ta `. xe` pe dispozitivul ţintă prin _Comandă_ (pasând `--inspect-brk` pentru a-l întrerupe înainte ca orice module native să fie încărcate).
2. Lansați Visual Studio 2017 pe calculatorul dvs. de dezvoltare.
3. Conectează-te la dispozitivul țintă selectând _Depanare > Atașează la Proces..._ și introduceți adresa IP a dispozitivului și numărul de port afișat de instrumentul de depanare Visual Studio Remote Debugger.
4. Faceți clic pe _Reîmprospătare_ și selectați [procesul Electron corespunzător pentru a atașa](../development/debug-instructions-windows.md).
5. Este posibil să fie necesar să vă asigurați că orice simboluri pentru modulele native din aplicație sunt încărcate corect. Pentru a configura acest lucru, mergeți la _Depanare > Opțiuni..._ în Visual Studio 2017 și adăugați folderele care conțin `. db` simboluri sub _Depanare > Simboluri_.
6. Odată atașat, setați orice puncte de întrerupere corespunzătoare și reluați execuția JavaScript folosind [uneltele la distanță pentru Node](debugging-main-process.md).

## Obținerea de ajutor suplimentar

Dacă întâmpinați o problemă cu această documentație sau dacă aplicația dvs. funcționează atunci când este compilată pentru x86 dar nu pentru arm64, vă rugăm să [înregistrați o problemă](../development/issues.md) cu "Windows on Arme" în titlu.
