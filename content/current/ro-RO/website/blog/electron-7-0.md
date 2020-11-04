---
title: Electron 7.0.0
author:
  - sofianguie
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 a fost eliberat! Acesta include upgradări la Chromium 78, V8 7,8 şi Node.js 12.8.1. Am adăugat o fereastră cu o versiune de Arm 64, metode IPC mai rapide, o nouă `Temă nativă` API și multe altele!

---

Echipa Electron este încântată să anunțe lansarea Electron 7.0.0! Îl puteți instala cu npm prin intermediul `npm instalați electron@latest` sau descărcat-o de pe [eliberează site-ul nostru](https://electronjs.org/releases/stable). Versiunea este împachetată cu upgrade-uri, reparaţii şi noi caracteristici. Abia așteptăm să vedem ce construiești cu ei! Continuă să citești pentru detalii despre această lansare și împărtășește-ți feedback-ul pe care îl ai!

## Modificări notabile
 * Upgrade-uri Stack:

   | Stivă   | Versiunea în Electron 6 | Versiunea în Electron 7 | Ce este nou                                                                                                                                                                                                                                                               |
   |:------- |:----------------------- |:----------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Crom    | 76.0.3809.146           | **78.0.3905.1**         | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8      | 7.6                     | **7.8**                 | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js | 12.4.0                  | **12.8.1**              | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * S-a adăugat Windows pe Arm (64 biți). [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * `ipcRenderer.invoke()` și `ipcMain.handle()` pentru IPC asincron request/response-style Acestea sunt recomandate cu tărie pentru modulul `la distanță`. Vezi acest ""[modulul "telecomandă" al Electron considerat ca fiind dăunător](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" postare pe blog pentru mai multe informaţii. [#18449](https://github.com/electron/electron/pull/18449)
 * A adăugat `Temă native` API pentru a citi și a răspunde la modificările din tema sistemului de operare și schema de culori. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * S-a trecut la o nouă definiție TypeScript [generator](https://github.com/electron/docs-parser). Definițiile rezultate sunt mai precise; deci dacă construcția ta TypeScript eșuează, aceasta este cauza probabilă. [#18103](https://github.com/electron/electron/pull/18103)

Vezi [notele de lansare 7.0.0](https://github.com/electron/electron/releases/tag/v7.0.0) pentru o listă mai lungă de modificări.

## Ruperea modificărilor

Mai multe informații despre acestea și schimbările viitoare pot fi găsite pe pagina [Schimbări de rupere planificate](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).

 * API învechite eliminate:
     * Versiuni bazate pe apelare ale funcțiilor care folosesc acum Promises. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` nu mai permite filtrarea intrărilor de cache șterse. [#17970](https://github.com/electron/electron/pull/17970)
 * Interfețele native pe macOS (meniuri, dialoguri, etc.) se potrivesc automat setarea de mod întunecat de pe mașina utilizatorului. [#19226](https://github.com/electron/electron/pull/19226)
 * S-a actualizat modulul `electron` pentru a utiliza `@electron/get`.  Versiunea minimă de nod suportată este acum Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Fișierul `electron.asar` nu mai există. Orice script-uri de ambalaj care depind de existența sa ar trebui actualizate. [#18577](https://github.com/electron/electron/pull/18577)

## Sfârșitul suportului pentru 4.x.y

Electron 4.x.y a ajuns la finalul suportului conform politicii [a proiectului,](https://electronjs.org/docs/tutorial/support#supported-versions). Dezvoltatorii și aplicațiile sunt încurajate să actualizeze la o versiune mai nouă a Electron.

## Program de FeedBack a Aplicațiilor

Continuăm să folosim [Programul nostru de Feedback pentru aplicații](https://electronjs.org/blog/app-feedback-program) pentru testare. Proiecte care participă la acest program testează Electron betas pe aplicațiile lor; și în schimb, noile erori pe care le găsesc sunt prioritizate pentru versiunea stabilă. Dacă doriți să participați sau să aflați mai multe, [vedeți postarea noastră pe blog despre program](https://electronjs.org/blog/app-feedback-program).

## Ce urmează

Pe termen scurt, vă puteţi aştepta ca echipa să continue să se concentreze pe a ţine pasul cu dezvoltarea componentelor majore care formează Electron, inclusiv crom, nod și V8. Deşi suntem atenţi să nu facem promisiuni cu privire la data eliberării, planul nostru este să lansăm noi versiuni majore ale Electron cu versiuni noi ale acestor componente aproximativ trimestrial. Programul [8.0.0 provizoriu](https://electronjs.org/docs/tutorial/electron-timelines) trasează datele cheie din ciclul de viață de dezvoltare Electron 8. De asemenea, [consultaţi documentul nostru de versionare](https://electronjs.org/docs/tutorial/electron-versioning) pentru informaţii mai detaliate despre versionare în Electron.

Pentru informații despre schimbările planificate de rupere în versiunile viitoare de Electron, [a se vedea documentul nostru Planificat Breaking Change](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
