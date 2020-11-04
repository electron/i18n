---
title: Electron 3.0.0
author: codebytere
date: '2018-09-18'
---

Echipa Electron este încântată să anunțe că prima versiune stabilă de Electron 3 este acum disponibilă de la [electronjs. rg](https://electronjs.org/) și prin `npm instalați electron@latest`! Este plin cu upgrade, reparații și caracteristici noi, și nu așteptăm să vedem ce construim cu ei. Mai jos sunt detalii despre această versiune și salutăm feedback-ul dvs. în timp ce explorați.

---

## Procesul de lansare

Pe măsură ce am dezvoltat `v3.0.`, am încercat să definim mai empiric criteriile pentru o eliberare stabilă prin formalizarea progresului feedback-ului pentru versiunile beta progresive. `v3.0.` nu ar fi fost posibil fără partenerii noștri [de feedback al aplicației](https://github.com/electron/electron/blob/3-0-x/docs/tutorial/app-feedback-program.md) care a furnizat testare timpurie și feedback în timpul ciclului beta. Mulţumită lui Atlassian, Atom, Microsoft Teams, Oculus, OpenFin, Slack, Symphony, VS Code şi altor membri ai programului pentru munca lor. Dacă doriți să participați la beta viitoare, vă rugăm să ne trimiteți un e-mail la [info@electronjs.org](mailto:info@electronjs.org).

## Modificări / Caracteristici noi

Bule majore în mai multe părți importante din lanțul de instrumente al Electron, inclusiv Chrome `v66.0.3359.181`, Node `v10.2.0`, și V8 `v6.346.23.`

* [[#12656](https://github.com/electron/electron/pull/12656)] feat: `app.isPackaged`
* [[#12652](https://github.com/electron/electron/pull/12652)] feat: `app.whenReady()`
* [[#13183](https://github.com/electron/electron/pull/13183)] feat: `process.getHeapStatistics()`
* [[#12485](https://github.com/electron/electron/pull/12485)] feat: `win.moveTop()` pentru a muta fereastra z-order sus
* [[#13110](https://github.com/electron/electron/pull/13110)] feat: API-uri TextField și Buton
* [[#13068](https://github.com/electron/electron/pull/13068)] feat: netLog API pentru control dinamic logging logging
* [[#13539](https://github.com/electron/electron/pull/13539)] feat: activați `webview` în redare sandbox
* [[#14118](https://github.com/electron/electron/pull/14118)] remarcă: `fs.readSync` funcționează acum cu fișiere masive
* [[#14031](https://github.com/electron/electron/pull/14031)] feat: node `fs` wrappers pentru a face disponibil `fs.realpathSync.native` și `fs.realpath.native`

## Ruperea modificărilor API

* [[#12362](https://github.com/electron/electron/pull/12362)] feat: actualizări pentru meniul comenzii elementului de control
* [[#13050](https://github.com/electron/electron/pull/13050)] refactor: API-uri dezaprobată documentate
  * Vezi [documente](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#breaking-api-changes-30) pentru mai multe detalii
* [[#12477](https://github.com/electron/electron/pull/12477)] refactor: removed `did-get-response-details` and `did-get-redirect-request` events
* [[#12655](https://github.com/electron/electron/pull/12655)] remarcă: implicit la dezactivarea navigării pe drag/drop
* [[#12993](https://github.com/electron/electron/pull/12993)] feat: Node `v4.x` sau mai mare este necesară utilizarea modulului `electron` npm
* [[#12008](https://github.com/electron/electron/pull/12008) [#12140](https://github.com/electron/electron/pull/12140) [#12503](https://github.com/electron/electron/pull/12503) [#12514](https://github.com/electron/electron/pull/12514) [#12584](https://github.com/electron/electron/pull/12584) [#12596](https://github.com/electron/electron/pull/12596) [#12637](https://github.com/electron/electron/pull/12637) [#12660](https://github.com/electron/electron/pull/12660) [#12696](https://github.com/electron/electron/pull/12696) [#12716](https://github.com/electron/electron/pull/12716) [#12750](https://github.com/electron/electron/pull/12750) [#12787](https://github.com/electron/electron/pull/12787) [#12858](https://github.com/electron/electron/pull/12858)] refactor: `NativeWindow`
* [[#11968](https://github.com/electron/electron/pull/11968)] refactor: `menu.popup()`
* [[#8953](https://github.com/electron/electron/pull/8953)] feat: nu mai folosește JSON pentru a trimite rezultatul `ipcRenderer.sendSync`
* [[#13039](https://github.com/electron/electron/pull/13039)] feat: implicit pentru a ignora argumentele liniei de comandă în urma unei adrese URL
* [[#12004](https://github.com/electron/electron/pull/12004)] refactor: redenumește `api:Window` până la `api::BrowserWindow`
* [[#12679](https://github.com/electron/electron/pull/12679)] remarcă: zoom vizual este dezactivat în mod implicit
* [[#12408](https://github.com/electron/electron/pull/12408)] refactor: redenumește app-command `media-play_pause` către `media-play-pause`

### macOS

* [[#12093](https://github.com/electron/electron/pull/12093)] remarcă: suport pentru notificări în spațiul de lucru
* [[#12496](https://github.com/electron/electron/pull/12496)] feat: `tray.setIgnoreDoubleClickEvents(ignorare)` pentru a ignora evenimentele din tăviţă dublu click.
* [[#12281](https://github.com/electron/electron/pull/12281)] remarcă: funcționalitate avansată a mouse-ului pe macOS
* [[#12714](https://github.com/electron/electron/pull/12714)] feat: blocare ecran / deblocare evenimente

### Ferestre

* [[#12879](https://github.com/electron/electron/pull/12879)] remarcă: adăugat DIP la/de la conversia coordonatelor ecranului

**Nota Bene:** Trecerea la o versiune mai veche Electron după rularea acestei versiuni va necesita ștergerea dosarului de date al utilizatorului pentru a evita blocarea versiunilor mai vechi. Puteți obține directorul de date al utilizatorului pornind `console.log(app.getPath("userData"))` sau vedeți [docs](https://electronjs.org/docs/api/app#appgetpathname) pentru mai multe detalii.

## Probleme rezolvate

* [[#13397](https://github.com/electron/electron/pull/13397)] rezolvare: problemă cu `fs.statSyncNoException` cu excepții
* [[#13476](https://github.com/electron/electron/pull/13476), [#13452](https://github.com/electron/electron/pull/13452)] remediu: crash la locul de încărcare cu jquery
* [[#14092](https://github.com/electron/electron/pull/14092)] remediu: crash în `net:ClientSocketHandle` destructor
* [[#14453](https://github.com/electron/electron/pull/14453)] fix: notifică schimbarea focalizării imediat mai degrabă decât pe următorul tick

### MacOS

* [[#13220](https://github.com/electron/electron/pull/13220)] rezolvare: problemă ce permite ca pachetele să fie selectate în `<input file="type">` dialog deschidere fișier
* [[#12404](https://github.com/electron/electron/pull/12404)] rezolvare: procesul principal de blocare a problemei atunci când se utilizează dialog async
* [[#12043](https://github.com/electron/electron/pull/12043)] remediu: click pe callback în meniu
* [[#12527](https://github.com/electron/electron/pull/12527)] fix: scurgeri de eveniment la reutilizarea elementului din bară de atingere
* [[#12352](https://github.com/electron/electron/pull/12352)] rezolvare: bară crash titlu
* [[#12327](https://github.com/electron/electron/pull/12327)] fix: regiuni fără fir
* [[#12809](https://github.com/electron/electron/pull/12809)] remediat: pentru a preveni actualizarea meniului în timp ce este deschisă
* [[#13162](https://github.com/electron/electron/pull/13162)] fix: limite pictogramă tray care nu permite valori negative
* [[#13085](https://github.com/electron/electron/pull/13085)] fix: titlul tăviței nu este inversat când este subliniat
* [[#12196](https://github.com/electron/electron/pull/12196)] fix: Construcție Mac, atunci când `enable_run_as_node=false`
* [[#12157](https://github.com/electron/electron/pull/12157)] a rezolvat: probleme suplimentare pe ferestrele fără cadru cu vibrație
* [[#13326](https://github.com/electron/electron/pull/13326)] remediat: pentru a seta protocolul mac la nici una după ce ați apelat `app.removeAsDefaultProtocolClient`
* [[#13530](https://github.com/electron/electron/pull/13530)] corect: utilizarea incorectă a API-urilor private în construcția MAS
* [[#13517](https://github.com/electron/electron/pull/13517)] crash corect: `tray.setContextMenu`
* [[#14205](https://github.com/electron/electron/pull/14205)] rezolvă: apăsarea Ecran escape pe un dialog acum îl închide chiar dacă `Id implicit` este setat

### Linux

* [[#12507](https://github.com/electron/electron/pull/12507)] remediat: `BrowserWindow.focus()` pentru ferestrele offscreen

## Alte note

* PDF Viewer nu funcționează în prezent, dar este în curs de lucru și va fi funcțional din nou în curând
* `TextField` și `Buton` API sunt experimentale și, prin urmare, sunt dezactivate în mod implicit
  * Ei pot fi activați cu `enable_view_api` construiește steagul

# Ce urmează

Echipa Electron continuă să lucreze la definirea proceselor noastre pentru upgradări mai rapide şi mai lente pe măsură ce încercăm în cele din urmă să menţinem paritatea cu cadenţele în dezvoltare ale Chromium, Nod și V8.
