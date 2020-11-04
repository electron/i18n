---
title: Electron 8.0.0
author:
  - jkleinsc
  - sofianguie
date: '2020-02-04'
---

Electron 8.0.0 a fost eliberat! Acesta include upgrade-uri la Chromium `80`, V8 `8.0`, şi Node.js `12.13.0`. Am adăugat vânzătorul de vale încorporat al lui Chrome, şi multe altele!

---

Echipa Electron este încântată să anunțe lansarea Electron 8.0.0! Îl puteți instala cu npm prin intermediul `npm instalați electron@latest` sau descărcat-o de pe [eliberează site-ul nostru](https://electronjs.org/releases/stable). Versiunea este împachetată cu upgrade-uri, reparaţii şi noi caracteristici. Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

## Modificări notabile

### Schimbări stivă
* Crom `80.3987.86`
    * [Nou în Chrome 79](https://developers.google.com/web/updates/2019/12/nic79)
    * [Nou în Chrome 80](https://chromereleases.googleblog.com/2020/02/stable-channel-update-for-desktop.html)
* Node.js `12.13.0`
    * [Postare blog nod 12.13.0](https://nodejs.org/en/blog/release/v12.13.0/)
* V8 `8.0`
    * [Postare pe blog V8 7.9](https://v8.dev/blog/v8-release-79)
    * [Blog V8 8.0](https://v8.dev/blog/v8-release-80)

### Evidențiere caracteristici
* Utilizare implementată a funcției de verificare a ortograficului încorporată de Chrome. Vezi mai multe detalii în [#20692](https://github.com/electron/electron/pull/20692) și [#21266](https://github.com/electron/electron/pull/21266).
* Comunicarea IPC folosește acum algoritmul structurat al v8. Acest lucru este mai rapid, mai caracteristic şi mai puţin surprinzător decât logica existentă, şi aduce un impuls de 2x al performanţei pentru tampoane mari şi obiecte complexe. Latența pentru mesajele mici nu este afectată în mod semnificativ. Vezi mai multe detalii în [#20214](https://github.com/electron/electron/pull/20214).

Vedeți [notele de lansare 8.0.0](https://github.com/electron/electron/releases/tag/v8.0.0) pentru o listă completă de caracteristici noi și modificări.

## Ruperea modificărilor

* Arată numele modulului în avertisment de dezaprobare pentru modulele cu conștientizare a contextului. [#21952](https://github.com/electron/electron/pull/21952)
    * Acest lucru este în continuare de lucru pentru o cerință viitoare ca modulele native Node încărcate în procesul de redare să fie [N-API](https://nodejs.org/api/n-api.html) sau [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Informațiile complete și calendarul propus sunt detaliate în [această problemă](https://github.com/electron/electron/issues/18397).
* Valorile trimise prin IPC sunt acum serializate cu Algoritm Clone Structurate.  [#20214](https://github.com/electron/electron/pull/20214)
* Redarea în afara ecranului este în prezent dezactivată din cauza lipsei unui operator de întreținere pentru a lucra la această funcție.  Acesta s-a rupt în timpul modernizării cromului şi a fost ulterior dezactivat. [#20772](https://github.com/electron/electron/issues/20772)

Mai multe informații despre acestea și schimbările viitoare pot fi găsite pe pagina [Schimbări de rupere planificate](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

## Modificări API
* `app` API modificări:
    * S-a adăugat `app.getApplicationNameForProtocol(url)`. [#20399](https://github.com/electron/electron/pull/20399)
    * Adăugat `app.showAboutPanel()` și `app.setAboutPanelOptions(opțiuni)` suport pentru Windows. [#19420](https://github.com/electron/electron/pull/19420)
* `BrowserWindow` se modifică API:
    * Documente actualizate pentru a observa că opțiunile BrowserWindow `hasShadow` sunt disponibile pe toate platformele [#20038](https://github.com/electron/electron/pull/20038)
    * S-a adăugat opțiunea `pentru luminozitate` la opțiunile BrowserWindow pentru a permite poziționarea personalizată pentru butoanele de semafor. [#21781](https://github.com/electron/electron/pull/21781)
    * S-a adăugat opțiunea `accessibileTitle` la BrowserWindow pentru setarea titlului ferestrei accesibile [#19698](https://github.com/electron/electron/pull/19698)
    * `BrowserWindow.fromWebContents()` se poate întoarce null [#19983](https://github.com/electron/electron/pull/19983)
    * Adăugat `BrowserWindow.getMediaSourceId()` și `BrowserWindow.moveAbove(mediaSourceId)`. [#18926](https://github.com/electron/electron/pull/18926)
    * Adăugat suport pentru `va muta` eveniment pe macOS. [#19641](https://github.com/electron/electron/pull/19641)
* Document documentat anterior `crashReporter.getCrashesDirectory()`. [#20417](https://github.com/electron/electron/pull/20417)
* `dialog` Se schimbă API:
    * `dontAddToRecent` proprietate a fost adăugată la `dialog.showOpenDialog` și `dialog. howOpenDialogSync` pentru a preveni adăugarea documentelor la documentele recente pe Windows în dialogurile deschise. [#19669](https://github.com/electron/electron/pull/19669)
    * Personalizare proprietăți adăugată la `dialog.showSaveDialog` și `dialog.showSaveDialogSync`. [#19672](https://github.com/electron/electron/pull/19672)
* `Notificare` modificări API:
    * S-a adăugat opțiunea `timeoutType` pentru a permite utilizatorilor Linux/Windows să seteze tipul de timeout al notificării. [#20153](https://github.com/electron/electron/pull/20153)
    * A adăugat opțiunea `urgență`  pentru a seta urgența notificărilor Linux. [#20152](https://github.com/electron/electron/pull/20152)
* `Sesiunea` Se schimbă API:
    * S-a actualizat documentaţia pe `session.setProxy(config)` şi `session.setCertificateVerifyProc(proc)` pentru a nota opţiunile opţionale. [#19604](https://github.com/electron/electron/pull/19604)
    * Adăugat `session.downloadURL(url)` pentru a putea declanșa descărcări fără BrowserWindow. [#19889](https://github.com/electron/electron/pull/19889)
    * Suport adăugat pentru HTTP preconectează indicii de resurse prin `session.preconnect(options)` și `preconectare` eveniment. [#18671](http://github.com/electron/electron/pull/18671)
    * Adăugat `session.addWordToSpellCheckerDictionary` pentru a permite cuvinte personalizate în dicționar [#21297](http://github.com/electron/electron/pull/21297)
* A fost adăugată la `shell.moveItemToTrash(fullPath[, deleteOnFail])` pe macOS pentru a specifica ce se întâmplă atunci când moveItemToTrash eșuează. [#19700](https://github.com/electron/electron/pull/19700)
* `systemPreferences` Modificări API:
    * S-a actualizat `sistemul Preferences.getColor(color)` documentație pentru macOS. [#20611](https://github.com/electron/electron/pull/20611)
    * Adăugat `ecran` tip media la `de sistem Preferences.getMediaAccessStatus()`. [#20764](https://github.com/electron/electron/pull/20764)
* Adăugat `nativeTheme.themeSource` pentru a permite aplicațiilor să suprascrie Chromium și alegerea temei OS. [#19960](https://github.com/electron/electron/pull/19960)
* TouchBar API modifică:
    * A adăugat `accesibilitateEtichetă` proprietate la `Buton TouchBarton` și `TouchBarLabel` pentru a îmbunătăți accesibilitatea TouchBarButton/TouchBarLabel. [#20454](https://github.com/electron/electron/pull/20454)
    * Documentație actualizată legată de TouchBar [#19444](https://github.com/electron/electron/pull/19444)
* `tăviță` Se schimbă API:
    * Noi opțiuni adăugate la `tray.displayBalloon()`: `iconType`, `largeIcon`, `noSound` și `respectQuiettime`. [#19544](https://github.com/electron/electron/pull/19544)
    * Adăugat tray.removeBalloon(), care elimină o notificare balon deja afișată. [#19547](https://github.com/electron/electron/pull/19547)
    * A adăugat tray.focus(), care se întoarce se concentrează asupra zonei de notificare din bara de sarcini. fees: add tray.focus() [#19548](https://github.com/electron/electron/pull/19548)
* `webContent` Se modifică API:
    * Added `contents.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture])` to expose executeJavaScriptInIsolatedWorld on the webContents API. [#21190](https://github.com/electron/electron/pull/21190)
    * Metode adăugate pentru a capta conținut web ascuns. [#21679](https://github.com/electron/electron/pull/21679)
    * Opţiuni adăugate la `webContents.print([options], [callback])` pentru a permite personalizarea anteturilor şi subsolurilor paginii de printare. [#19688](https://github.com/electron/electron/pull/19688)
    * Abilitate adăugată pentru a inspecta anumiți lucrători partajați prin intermediul `webContents.getAllSharedWorkers()` și `webContents.inspectSharedWorkerById(workerId)`. [#20389](https://github.com/electron/electron/pull/20389)
    * S-a adăugat suportul opțiunilor `fitToPageActivat` și `scaleFactor` în WebContents.printToPDF(). [#20436](https://github.com/electron/electron/pull/20436)
* Documentația `webview.printToPDF` actualizată pentru a indica tipul returnării este acum Uint8Array. [#20505](https://github.com/electron/electron/pull/20505)

### API învechite
Următoarele API sunt acum învechite:
* Dezaprobata opţiunea `visibleOnFullScreen` din `BrowserWindow.setVisibleOnAllWorkspaţii` înainte de îndepărtarea sa în următoarea versiune majoră de lansare. [#21732](https://github.com/electron/electron/pull/21732)
* Dezaprobată `alternate-selected-control-text` pe `systemPreferences.getColor(color)` pentru macOS. [#20611](https://github.com/electron/electron/pull/20611)
* Dezaprobată `setLayoutZoomLevelLimits` pe `webContent`, `webFrame`, şi `<webview> Etichetă` deoarece Chromium a eliminat această capacitate. [#21296](https://github.com/electron/electron/pull/21296)
* Valoarea implicită a `false` pentru `app.allowRendererProcessReuse` este acum învechită. [#21287](https://github.com/electron/electron/pull/21287)
* Dezaprobată `<webview>.getWebContents()` deoarece depinde de modulul de la distanță. [#20726](https://github.com/electron/electron/pull/20726)

## Sfârșitul suportului pentru 5.x.y

Electron 5.x.y a ajuns la finalul suportului conform politicii [a proiectului,](https://electronjs.org/docs/tutorial/support#supported-versions). Dezvoltatorii și aplicațiile sunt încurajate să actualizeze la o versiune mai nouă a Electron.

## Program de FeedBack a Aplicațiilor

Continuăm să folosim [Programul nostru de Feedback pentru aplicații](https://electronjs.org/blog/app-feedback-program) pentru testare. Proiecte care participă la acest program testează Electron betas pe aplicațiile lor; iar în schimb, noile erori descoperite de ei sunt prioritare pentru eliberarea stabilă. Dacă vrei să participi sau să înveți mai multe, [verifică postarea noastră pe blog despre program](https://electronjs.org/blog/app-feedback-program).

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. Programul [9.0.0 provizoriu](https://electronjs.org/docs/tutorial/electron-timelines) enumeră datele-cheie din ciclul de viață de dezvoltare Electron 9. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Dezaprobată `remote` Modulul (Pornire în Electron 9)
Din cauza pasivelor serioase de securitate, începem să descurajăm [`modulul remote`](https://www.electronjs.org/docs/api/remote) începând cu Electron 9. Puteți citi și urmări [această problemă](https://github.com/electron/electron/issues/21408) care detaliază motivele noastre pentru acest lucru și include o propunere de cronologie pentru descurajare.
