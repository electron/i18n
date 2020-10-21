---
title: Electron 6.0.0
author:
  - sofianguie
  - ckerr
  - codebytere
date: '2019-07-30'
---

Echipa Electron este încântată să anunțe lansarea Electron 6.0.0! Îl puteți instala cu npm prin intermediul `npm instalați electron@latest` sau descărcat-o de pe [eliberează site-ul nostru](https://electronjs.org/releases/stable). Versiunea este împachetată cu upgrade-uri, reparaţii şi noi caracteristici. Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

---

## Ce este nou

Astăzi marchează o primă ediție a proiectului Electron: aceasta este prima dată când facem o versiune Electron stabilă **în aceeași zi** ca [Chrome stable release](https://www.chromestatus.com/features/schedule)! 🎉

O mare parte din funcţionalitatea Electron este asigurată de componentele centrale ale Cromiului, Node.js şi V8. Electron ține la curent cu aceste proiecte pentru a oferi utilizatorilor noștri noi caracteristici JavaScript, îmbunătățiri de performanță și soluții de securitate. Fiecare pachet are o versiune majoră în Electron 6:

- Crom `76.0.3809.88`
  - [Nou în 74](https://developers.google.com/web/updates/2019/04/nic74)
  - [Nou în 75](https://developers.google.com/web/updates/2019/06/nic75)
  - [Nou în 76](https://developers.google.com/web/updates/2019/07/nic76)
- Node.js `12.4.0`
  - [Postare pe blog Node 12.4.0](https://nodejs.org/en/blog/release/v12.4.0/)
- V8 `7.6.303.22`
    - [Postare pe blog V8 7.6](https://v8.dev/blog/v8-release-76)

Această versiune include, de asemenea, îmbunătățiri la API-urile Electron. [Notele de lansare](https://github.com/electron/electron/releases/tag/v6.0.0) au o listă mai completă, dar iată care sunt punctele:

### Promisification

Electron 6.0 continuă modernizarea [iniţiativa](https://github.com/electron/electron/blob/master/docs/api/modernization/promisification.md) începută în 5.0 pentru a îmbunătăţi suportul [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises).

Aceste funcții returnează acum promisiunile și susțin în continuare invocarea pe bază de callback:
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getCategories()` [#16583](https://github.com/electron/electron/pull/16583)
 * `contentTracing.getTraceBufferUsage()` [#16600](https://github.com/electron/electron/pull/16600)
 * `contents.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `cookies.flushStore()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.get()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.remove()` [#16464](https://github.com/electron/electron/pull/16464)
 * `cookies.set()` [#16464](https://github.com/electron/electron/pull/16464)
 * `dialog.showCertificateTrustDialog()` [#17181](https://github.com/electron/electron/pull/17181)
 * `inAppPurchase.getProducts()` [#17355](https://github.com/electron/electron/pull/17355)
 * `inAppPurchase.purchaseProduct()`[#17355](https://github.com/electron/electron/pull/17355)
 * `netLog.stopLogging()` [#16862](https://github.com/electron/electron/pull/16862)
 * `session.clearAuthCache()` [#17259](https://github.com/electron/electron/pull/17259)
 * `session.clearCache()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.clearHostResolverCache()` [#17229](https://github.com/electron/electron/pull/17229)
 * `session.clearStorageData()` [#17249](https://github.com/electron/electron/pull/17249)
 * `session.getBlobData()` [#17303](https://github.com/electron/electron/pull/17303)
 * `session.getCacheSize()`  [#17185](https://github.com/electron/electron/pull/17185)
 * `session.resolveProxy()` [#17222](https://github.com/electron/electron/pull/17222)
 * `session.setProxy()`  [#17222](https://github.com/electron/electron/pull/17222)
 * `webContents.hasServiceWorker()` [#16535](https://github.com/electron/electron/pull/16535)
 * `WebContents.printToPDF()` [#16795](https://github.com/electron/electron/pull/16795)
 * `webContents.savePage()` [#16742](https://github.com/electron/electron/pull/16742)
 * `webFrame.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webFrame.executeJavaScriptInsolatedWorld()` [#17312](https://github.com/electron/electron/pull/17312)
 * `webviewTag.executeJavaScript()` [#17312](https://github.com/electron/electron/pull/17312)

Aceste funcții au acum două forme, asincrone sincron și bazate pe promis:
 * `dialog.showMessageBox()`/`dialog.showMessageBoxSync()` [#17298](https://github.com/electron/electron/pull/17298)
 * `dialog.showOpenDialog()`/`dialog.showOpenDialogSync()` [#16973](https://github.com/electron/electron/pull/16973)
 * `dialog.showSaveDialog()`/`dialog.showSaveDialogSync()` [#17054](https://github.com/electron/electron/pull/17054)

Aceste funcții returnează acum promisiunile:
 * `app.dock.show()` [#16904](https://github.com/electron/electron/pull/16904)

### `Electron Helper (Renderer).app`, `Electron Helper (GPU).app` și `Electron Helper (Plugin).app`

Pentru a activa [timpul de execuție întărit](https://developer.apple.com/documentation/security/hardened_runtime_entitlements?language=objc), care restricționează lucruri cum ar fi memorie executabilă scriere și cod de încărcare semnate de un alt ID al Echipei , drepturile la semnarea unor coduri speciale care trebuiau acordate ajutorului.

menţinerea acestor drepturi încadrate la tipurile de procese care le necesită; Chromium [a adăugat](https://chromium-review.googlesource.com/c/chromium/src/+/1627456) trei variante noi ale aplicației Helper: una pentru redatori (`Electron Helper (Renderer). pp`), unul pentru procesul GPU (`Electron Helper (GPU). pp`) și unul pentru plugin-uri (`Electron Helper (Plugin).app`).

Oameni care folosesc `semnul-electron-osx` pentru a coproiecta aplicația lor Electron nu ar trebui să facă nicio schimbare în logica lor de construcție. Dacă vă confecționați aplicația cu scripturi personalizate, ar trebui să vă asigurați că cele trei noi aplicații Helper sunt corect proiectate.

Pentru a împacheta corect aplicația ta cu aceste noi ajutoare, trebuie să folosești `edon-packager@14.0.4` sau mai mult.  Dacă folosiți `electron-builder` ar trebui să urmați [această problemă](https://github.com/electron-userland/electron-builder/issues/4104) pentru a urmări suportul pentru aceste noi ajutoare.

## Ruperea modificărilor

 * Această versiune începe să stabilească terenul pentru o cerință viitoare ca modulele native Node încărcate în procesul de redare să fie [N-API](https://nodejs.org/api/n-api.html) sau [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Motivele acestei schimbări sunt performanţe mai rapide, o securitate mai mare şi reducerea volumului de muncă pentru întreţinere. Citește toate detaliile inclusiv cronologia propusă în [această problemă](https://github.com/electron/electron/issues/18397). Se preconizează că această modificare va fi finalizată în Electron v11.

 * `Net.IncomingMessage` antetele [s-au schimbat ușor](https://github.com/electron/electron/pull/17517#issue-263752903) pentru a se potrivi mai îndeaproape [Node. s comportament](https://nodejs.org/api/http.html#http_message_headers), în special cu valoarea `set-cookie` și cum sunt tratate antetele duplicat. [#17517](https://github.com/electron/electron/pull/17517).

 * `shell.showItemInFolder()` returnează acum anulat și este un apel asincron. [#17121](https://github.com/electron/electron/pull/17121)

 * Aplicațiile trebuie acum să stabilească în mod explicit o cale de jurnal apelând noua funcție `app.setAppLogPath()` înainte de a utiliza `app.getPath('log')`. [#17841](https://github.com/electron/electron/pull/17841)

## Sfârșitul suportului pentru 3.x.y

Per politica noastră de suport [](https://electronjs.org/docs/tutorial/support#supported-versions), 3.x.y a ajuns la sfârșitul vieții. Dezvoltatorii și aplicațiile sunt încurajate să actualizeze la o versiune mai nouă a Electron.

## Program de FeedBack a Aplicațiilor

Continuăm să folosim [Programul nostru de Feedback pentru aplicații](https://electronjs.org/blog/app-feedback-program) pentru testare. Proiecte care participă la acest program testează Electron betas pe aplicațiile lor; iar în schimb, noile erori descoperite de ei sunt prioritare pentru eliberarea stabilă. Dacă vrei să participi sau să înveți mai multe, [verifică postarea noastră pe blog despre program](https://electronjs.org/blog/app-feedback-program).

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. Programul [7.0.0 provizoriu](https://electronjs.org/docs/tutorial/electron-timelines) enumeră datele cheie din ciclul de viață de dezvoltare Electron 7. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
