# Ghidul magazinului Windows

Cu Windows 10, vechiul executabil bun câştig32 a primit un nou frate: Platforma Universală de Windows Platformă. Noul `. formatul ppx` nu permite doar un număr de noi API puternice, cum ar fi Cortana sau Notificări Push, dar prin Windows Store, simplifică și instalarea și actualizarea.

Microsoft [a dezvoltat o unealtă care compilează aplicațiile Electron ca `. ppx` pachete](https://github.com/catalystcode/electron-windows-store), care permit dezvoltatorilor să utilizeze unele dintre binefacerile găsite în noul model . Acest ghid explică modul de utilizare - și care sunt capacitățile și limitările unui pachet Electron AppX.

## Context și Cerințe

Windows 10 "Actualizare aniversară" poate rula win32 `.exe` binare prin lansându-le împreună cu un sistem virtualizat de fișiere și registru. Ambele sunt create în timpul compilării prin rularea aplicației și instalarea în interiorul unui container Windows permite Windows să identifice exact ce modificări ale sistemului de operare se fac în timpul instalării. Asocierea executabilului cu un sistem virtual de fişiere şi un registru virtual permite Windows să activeze instalarea şi dezinstalarea.

În plus, exeul este lansat în interiorul modelului appx - ceea ce înseamnă că poate utiliza multe dintre API-uri disponibile pentru Platforma Universală Windows Pentru a câștiga și mai multe capabilități, o aplicație Electron se poate asocia cu o sarcină de fundal UWP invizibilă lansată împreună cu `exe` - un fel de lansare ca sidekick pentru a rula sarcini în fundal, primește notificări push sau comunică cu alte aplicații UWP .

Pentru a compila orice aplicație Electron existentă, asigurați-vă că aveți următoarele cerințe :

* Windows 10 cu actualizare aniversară (lansat pe 2 august 2016)
* SDK Windows 10, [poate fi descărcat aici](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Cel puțin Node 4 (pentru a verifica, executați `node -v`)

Apoi, du-te și instalează `electronon-windows-store` CLI:

```sh
npm instalare -g electron-windows-store
```

## Pasul 1: Împărtășește aplicația ta Electron

Pachează aplicația folosind [un pachet electronon](https://github.com/electron/electron-packager) (sau o unealtă similară). Asigură-te că elimini `node_module` de care nu ai nevoie în aplicația ta finală, de la orice modul de care nu aveți nevoie va crește dimensiunea aplicației.

Rezultatul ar trebui să arate cam așa:

```plaintext
• ─ Ghost.exe
• ─ LICENSE
• ─ content_resources_200_percent.pak
•─ content_shell.pak
<unk> ● ─ d3dcompiler_47. Va
<unk> ─ ffmpeg.dll
Ribavirin ─ icudtl.dat
<unk> ─ libEGL.dlll
• ─ libGLESv2.dll
<unk> ─ localnicii
<unk> ─ am. ak
<unk> <unk> ─ ar.pak
<unk> <unk> ─ [...]
<unk> • ─ nod. Te rog
Ribavirin ─ resurse
<unk> ─ aplicatie. sar
<unk> <unk> ─ v8_context_snapshot.bin
• ─ veveriț.exe
<unk> ─ ui_resources_200_percent.pak
```

## Pasul 2: Rularea unui magazin de electronon-windows-store

De la un PowerShell ridicat (rulați-l "ca Administrator"), rulați `electron-windows-store` cu parametrii necesari, pasând atât directoarele de intrare cât și cele de ieșire, numele și versiunea aplicației, și confirmând faptul că `node_modul` ar trebui să fie ajustate.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0 `
    --package-name myelectronapp
```

Odată executată, unealta merge la muncă: acceptă aplicația ta Electron ca o intrare, aplatizând `node_modules`. Apoi, arhivează aplicația ta ca `app.zip`. Folosind un installer și un Container Windows, instrumentul creează un pachet "extins" AppX - inclusiv Windows Application Manifest (`AppXManifest. ml`) precum și sistemul de fișiere virtuale și registrul virtual din interiorul dosarului de ieșire .

Odată ce fișierele AppX extinse sunt create, unealta folosește Windows App Packager (`MakeAppx. xe`) pentru a crea un pachet AppX cu un singur fișier din acele fișiere de pe disc. În cele din urmă, instrumentul poate fi folosit pentru a crea un certificat de încredere pe calculatorul dvs. pentru a semna noul pachet AppX. Cu pachetul AppX semnat, linia de comandă poate, de asemenea, instala automat pachetul pe calculatorul tău.

## Pasul 3: Utilizarea ambalajului de AppX

Pentru a rula pachetul, utilizatorii tăi vor avea nevoie de Windows 10 cu așa numita "Actualizare aniversară" - detalii despre cum să actualizezi Windows pot fi găsite [aici](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

Spre deosebire de aplicațiile UWP tradiționale, aplicațiile împachetate trebuie să parcurgă în prezent un proces de verificare manuală. pentru care puteți aplica [aici](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). Între timp, toți utilizatorii vor putea să instaleze pachetul apăsând de două ori pe el, astfel încât o prezentare la magazin ar putea să nu fie necesară dacă căutați o metodă de instalare mai ușoară. În medii gestionate (de obicei întreprinderi), `Add-AppxPackage` [PowerShell Cmdlet poate fi folosit pentru a instala opțiunea în mod automat,](https://technet.microsoft.com/en-us/library/hh856048.aspx).

O altă limitare importantă este că pachetul AppX compilat încă conține un executabil win32 - și, prin urmare, nu va rula pe Xbox, HoloLens, sau telefoane.

## Opțional: Adaugă caracteristici UWP folosind o activitate de fundal
Poți împerechea aplicația ta Electron cu o sarcină de fundal UWP invizibilă, care poate folosi pe deplin funcțiile Windows 10 - cum ar fi notificările push, Integrarea Cortana, sau dale live.

Pentru a afla cum o aplicație Electron care folosește o sarcină de fundal pentru a trimite notificări toast și dale live, [verifică eșantionul](https://github.com/felixrieseberg/electron-uwp-background) furnizat de Microsoft.

## Opțional: Convertește folosind Virtualizarea Container

Pentru a genera pachetul AppX, `electron-windows-store` CLI folosește un șablon care ar trebui să funcționeze pentru majoritatea aplicațiilor Electron. Cu toate acestea, dacă utilizați un instalator personalizat, sau dacă întâmpinați orice probleme cu pachetul generat, puteţi încerca să creaţi un pachet folosind compilarea cu un Container Windows - în acel mod, CLI va instala și rula aplicația în Windows Container gol pentru a determina ce modificări face aplicația ta exact sistemului de operare .

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". Acest lucru va dura câteva minute, dar nu vă faceți griji - trebuie doar să faceți asta o singură dată. Descarcă și Desktop App Converter de la [aici](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). Vei primi două fișiere: `DesktopAppConverter.zip` și `BaseImage-14316.wim`.

1. Dezarhivează `DesktopAppConverter.zip`. De la un PowerShell ridicat (deschis cu "run as Administrator", asigură-te că politica de execuție a sistemelor tale ne permite să rulăm tot ce intenționăm să rulăm apelând `Set-ExecutionPolicy bypass`.
2. Apoi, rulați instalarea Convertorului de aplicații pentru desktop, trecând prin locația a imaginii de bază Windows (descărcată ca `BaseImage-14316. im`), prin apelarea `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Dacă se execută comanda de mai sus te anunță pentru o repornire, te rugăm să repornești mașina și să rulezi comanda din nou după o repornire reușită.

Odată ce instalarea a reușit, poți trece la compilarea aplicației tale Electron.
