# Arhitectura aplicaţiei Electron

Înainte de a ne scufunda în API-urile Electron, trebuie să discutăm cele două procese disponibile în Electron. Ele sunt fundamental diferite și importante pentru înțelege.

## Procese principale și de redare

În Electron, procesul care rulează `package.json`al lui `script` principal se numește __procesul principal__. Scriptul care rulează în procesul principal poate afișa un GUI prin crearea de pagini web. O aplicație Electron are întotdeauna un proces principal, dar nu mai mult.

Deoarece Electron folosește Chromium pentru afișarea paginilor web, se folosește și arhitectura de multi-proces a Chromium. Fiecare pagină web din Electron rulează în propriul proces, care se numește __procesul de redare__.

În browserele normale, paginile web rulează de obicei într-un mediu al cutiilor cu nisip și nu li se permite accesul la resurse native. Utilizatorii Electron au, însă, puterea de a utiliza API-urile Node.js în paginile web care permit interacțiuni cu un sistem de operare de nivel inferior.

### Diferențe între procesul principal și procesul de randare

Procesul principal creează pagini web prin crearea instanțelor `BrowserWindow`. Fiecare `instanță BrowserWindow` rulează pagina web în propriul proces de redare. Atunci când o instanță `BrowserWindow` este distrusă, procesul corespunzător de redare este, de asemenea, terminat.

Procesul principal gestionează toate paginile web și procesele de redare corespunzătoare. Fiecare proces de redare este izolat și are doar grijă de pagina de web care rulează în ea.

În paginile web, apelarea de API-uri legate de GUI nativ nu este permisă deoarece gestionarea resurselor GUI native în paginile web este foarte periculoasă și este ușor de scurs resurse. Dacă doriţi să efectuaţi operaţiunile GUI într-o pagină web, procesul de randare a paginii web trebuie să comunice cu procesul principal pentru a solicita ca procesul principal să efectueze aceste operațiuni.

> #### Asia: Comunicarea între procese
> 
> În Electron, avem mai multe modalități de a comunica între procesul principal și procesele de redare, ca [`ipcRenderer`](../api/ipc-renderer.md) și [`ipcMain`](../api/ipc-main.md) module pentru trimiterea mesajelor, și modulul [la distanță](../api/remote.md) pentru comunicarea în stilul RPC. There is also an FAQ entry on [how to share data between web pages][share-data].

## Folosind API-uri Electron

Electron oferă un număr de API-uri care sprijină dezvoltarea unei aplicații pentru desktop atât în procesul principal, cât și în procesul de redare. În ambele procese ai accesa API-urile Electron solicitând modulul inclus:

```javascript
const electron = require('electron')
```

Toate API-urile Electron sunt atribuite unui tip de proces. Multe dintre ele pot fi folosite doar din procesul principal, unele dintre ele doar dintr-un proces de redare, unele din ambele. Documentația pentru fiecare API individual va indica din care proces poate fi utilizat.

O fereastră în Electron este creată de exemplu folosind clasa `BrowserWindow` . Acesta este disponibil numai în cadrul procesului principal.

```javascript
// Aceasta va functiona in procesul principal, and be `undefined` in a
// derer proces:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Deoarece comunicarea dintre procese este posibilă, un proces de redare poate apela la procesul principal pentru a efectua sarcini. Electron vine cu un modul numit `distant` care expune API-uri de obicei disponibile doar pe procesul principal . Pentru a crea o `BrowserWindow` dintr-un proces de redare, am folosi telecomanda ca mijloc:

```javascript
// Aceasta va funcţiona într-un proces de redare, but be `undefined` in the
// main process:
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Utilizarea API-ului Node.js

Electron expune accesul complet la Node.js atât în procesul principal, cât şi în cel de redare . Acest lucru are două implicații importante:

1) Toate API-urile disponibile în Node.js sunt disponibile în Electron. Calling the following code from an Electron app works:

```javascript
const fs = require('fs')

const root = fs. eaddirSync('/')

// Aceasta va imprima toate fișierele la nivelul de rădăcină al discului,
// fie '/' fie 'C:\'.
console.log(root)
```

După cum ați putea deja să ghiciți, acest lucru are implicații importante asupra securității dacă încercați vreodată să încărcați conținut de la distanță. You can find more information and guidance on loading remote content in our [security documentation][security].

2) Puteți utiliza module Node.js în aplicația dvs. Alege modulul favorit. npm oferă în prezent cel mai mare depozit din lume de cod open-source – abilitatea de a utiliza cod bine întreținut și testat care a fost rezervat pentru aplicațiile serverului este una dintre funcțiile cheie ale Electron.

Ca exemplu, pentru a folosi AWS SDK oficial în aplicația ta, ai instala-o mai întâi ca o dependență:

```sh
npm instalare --save aws-sdk
```

Apoi, în aplicația ta Electron, necesită și folosește modulul ca și cum ai construi o aplicație Node.js:

```javascript
// Un client S3 gata de utilizare
const S3 = require('aws-sdk/clients/s3')
```

Există un avertisment important: Native Node. s module (adică, modulele care necesită compilarea codului nativ înainte ca acestea să poată fi utilizate) vor trebui să fie compilate pentru a fi folosite cu Electron.

The vast majority of Node.js modules are _not_ native. Doar 400 din ~650.000 de module sunt native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron][native-node].

[security]: ./security.md
[native-node]: ./using-native-node-modules.md
[share-data]: ../faq.md#how-to-share-data-between-web-pages
