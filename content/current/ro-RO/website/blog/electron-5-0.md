---
title: Electron 5.0.0
author:
  - BinaryMuse
  - ckerr
  - jkleinsc
date: '2019-04-23'
---

Echipa Electron este încântată să anunțe lansarea Electron 5.0.0! Îl puteți instala cu npm prin `npm instalați electron@latest` sau descărcați tarballs din [pagina noastră de lansări](https://github.com/electron/electron/releases/tag/v5.0.0). Versiunea este împachetată cu upgrade-uri, reparaţii şi noi caracteristici. Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

---

## Ce este nou?

O mare parte din funcţionalitatea Electron este asigurată de componentele centrale ale Cromiului, Node.js şi V8. Electron ține la curent cu aceste proiecte pentru a oferi utilizatorilor noștri noi caracteristici JavaScript, îmbunătățiri de performanță și soluții de securitate. Fiecare pachet are o versiune majoră în Electron 5:

- Crom `73.0.3683.119`
  - [Nou în 70](https://developers.google.com/web/updates/2018/10/nic70)
  - [Nou în 71](https://developers.google.com/web/updates/2018/12/nic71)
  - [Nou în 72](https://developers.google.com/web/updates/2019/01/nic72)
  - [Nou în 73](https://developers.google.com/web/updates/2019/03/nic73)
- Node.js `12.0.0`
  - [Nod 12 postare pe blog](https://nodejs.org/en/blog/release/v12.0.0/)
- V8 `7.3.492.27`.
  - [Caracteristici JS noi](https://twitter.com/mathias/status/1120700101637353473)

Electron 5 include, de asemenea, îmbunătățiri ale API-urilor specifice Electron. Un rezumat al modificărilor majore este mai jos; pentru lista completă de modificări, verifică [Notele de lansare Electron v5.0.0](https://github.com/electron/electron/releases/tag/v5.0.0).

### Promisification

Electron 5 continuă [Iniţiativa de multiplicare](https://github.com/electron/electron/blob/5-0-x/docs/api/promisification.md) pentru a converti API-ul apelant al Electron pentru a utiliza Promises. Aceste API au fost convertite pentru Electron 5:
* `app.getFileIcon`
* `contentTracing.getCategorii`
* `contentTracing.startÎnregistrare`
* `contentTracing.stopÎnregistrare`
* `debugger.sendCommand`
* API Cookie-uri
* `shell.openExtern`
* `webContents.loadFile`
* `webContents.loadURL`
* `webContents.zoomLevel`
* `webContents.zoomFactor`
* `curs.capturePage`

### Acces culori sistem pentru macOS

Aceste funcții au fost modificate sau adăugate la `sistemul Preferințe` pentru a accesa culorile sistemelor macOS:
* `Preferințe sistem.getAccentColor`
* `Preferințe sistem.getColor`
* `Preferințe sistem.getSystemColor`

### Informații despre memorie

Funcţia `process.getProcessMemoryInfo` a fost adăugată pentru a obţine statistici de utilizare a memoriei despre procesul curent.

### Filtrare suplimentară pentru API-uri la distanță

Pentru a îmbunătăți securitatea în `API-ul la distanță` , noi evenimente izolate au fost adăugate astfel încât `telecomandă. etBuiltin`, `distant. Fereastra`, `remote.getCurrent WebContent` și `<webview>.getWebContent` pot fi [filtrate](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#13-disable-or-limit-creation-of-new-windows).

### Mai multe vizualizări pe BrowserFereastră

BrowserWindow acceptă acum gestionarea mai multor BrowserView-uri în cadrul aceleiași BrowserWindow.

## Ruperea modificărilor

### Implicit pentru aplicațiile împachetate

Aplicațiile ambalate se vor comporta acum la fel ca aplicația implicită: un meniu implicit va fi creat cu excepția cazului în care aplicația are unul și evenimentul `închis pentru toate ferestre` va fi gestionat automat cu excepția cazului în care aplicația se ocupă de eveniment.

### Cutie de nisip mixtă

Modul sandbox mixt este acum activat în mod implicit. Randatoare lansate cu `sandbox: adevărat` va fi acum sandbox, unde anterior vor fi inserate doar dacă modul cu sandbox mixt va fi activat.

### Îmbunătățiri de securitate
Valorile implicite ale `nodeIntegration` și `webviewTag` sunt acum `false` pentru a îmbunătăți securitatea.

### Spellchecker acum asincron

API-ul SpellCheck a fost schimbat pentru a oferi [rezultate asincrone](https://github.com/electron/electron/blob/5-0-x/docs/api/web-frame.md#webframesetspellcheckproviderlanguage-provider).

## Dezaprobată

Următoarele API sunt învechite de curând în Electron 5.0.0 și sunt planificate pentru eliminare la 6.0.0:

### Binare de Mksnapshot pentru braț și arm64
Binarele native de mksnapshot pentru braț și arm64 sunt învechite și vor fi eliminate în 6. .0. Pot fi create imagini pentru braț și arme64 folosind binarele x64.

### ServiceWorker API-uri pe WebContent
ServiceWorker API-uri învechite pe WebContent în pregătire pentru eliminarea lor.
* `webContents.hasServiceLucrător`
* `webContents.unregisterServiceLucrător`

### Module automate cu conținut web sandboxed
Pentru îmbunătățirea securității, următoarele module sunt depreciate pentru a fi utilizate direct prin intermediul `necesită` și în schimb va trebui să fie incluse prin `telecomandă. echipez` într-un conținut inserat web:
* `electron.screen`
* `copil_process`
* `fs`
* `o`
* `cale`

## webFrame API-urile lumii izolate
`webFrame.setIsolatedWorldContentSecurityPolicy`,`webFrame.setIsolatedWorldHumanReadableName`, `webFrame.setIsolatedWorldSecurityOrigin` au fost învechite în favoarea `webFrame.setIsolatedWorldInfo`.

### Cutie de nisip mixtă
`enableMixedSandbox` și comutatorul `--enable-mixed-sandbox` încă există pentru compatibilitate, dar sunt învechite și nu au niciun efect.

## Sfârșitul suportului pentru 2.0.x

Pe [politica noastră suportată în versiunile noastre](https://electronjs.org/docs/tutorial/support#supported-versions), 2.0.x a ajuns la sfârșitul vieții.

## Program de FeedBack a Aplicațiilor

Continuăm să folosim [Programul nostru de Feedback pentru aplicații](https://electronjs.org/blog/app-feedback-program) pentru testare. Proiecte care participă la acest program testează Electron betas pe aplicațiile lor; iar în schimb, noile erori descoperite de ei sunt prioritare pentru eliberarea stabilă. Dacă vrei să participi sau să înveți mai multe, [verifică postarea noastră pe blog despre program](https://electronjs.org/blog/app-feedback-program).

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. Programul [6.0.0 provizoriu](https://electronjs.org/docs/tutorial/electron-timelines#600-release-schedule) trasează datele cheie din ciclul de viață de dezvoltare Electron 6. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
